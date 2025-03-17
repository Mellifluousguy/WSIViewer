import React, { useState, useEffect, useRef } from "react";

import { Tooltip } from "react-tooltip";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const WSIViewer = () => {
  const [imageData, setImageData] = useState(null);
  const [detectedRegions, setDetectedRegions] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 800, height: 500 });
  const [viewArea, setViewArea] = useState({ x: 0, y: 0, width: 800, height: 500, zoom: 1 });
  const [uniqueBloodTypes, setUniqueBloodTypes] = useState([]);

  const imageRef = useRef(null);

  useEffect(() => {
    fetch("./output.json")
      .then((response) => response.json())
      .then((data) => {
        setImageData(data);
        setDetectedRegions(data.inference_results.output.detection_results);
        const bloodTypes = [...new Set(data.inference_results.output.detection_results.map(region => region[4]))];
        setUniqueBloodTypes(bloodTypes);
      });
  }, []);

  console.log(imageData);
  const onImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  const executionTime = imageData?.inference_results?.output?.executionTime;
  const speedIndicator = executionTime < 3000 ? "Fast" : executionTime < 7000 ? "Moderate" : "Slow";

  // Dynamically adjust scaling factors
  const displayedWidth = imageRef.current ? imageRef.current.clientWidth : 800;
  const displayedHeight = imageRef.current ? imageRef.current.clientHeight : 500;
  const scaleX = displayedWidth / imageSize.width;
  const scaleY = displayedHeight / imageSize.height;

  // Mini-map dimensions
  const miniMapW = 200;
  const miniMapH = 125;

  // Viewport position calculations
  const viewportX = Math.max(0, Math.min((-viewArea.x / (displayedWidth * viewArea.zoom)) * miniMapW, miniMapW - (viewArea.width / displayedWidth) * miniMapW));
  const viewportY = Math.max(0, Math.min((-viewArea.y / (displayedHeight * viewArea.zoom)) * miniMapH, miniMapH - (viewArea.height / displayedHeight) * miniMapH));
  const viewportWidth = Math.min(miniMapW, Math.max(50, (viewArea.width / displayedWidth) * miniMapW));
  const viewportHeight = Math.min(miniMapH, Math.max(30, (viewArea.height / displayedHeight) * miniMapH));

  return (
    <>
      <p className="w-full border border-b-black text-center font-semibold tracking-wide">{imageData?.inference_results?.date}</p>
      <div className="flex flex-col md:flex-row items-center gap-4 min-h-screen">

        {/* Left Sidebar */}
        <div className="md:w-[250px] h-screen w-full p-4 flex flex-col gap-4 border-r-2 border-gray-500">
          <h3 className="text-lg font-semibold">Patient Info</h3>
          <p><strong>ID:</strong> {imageData?.patient_id}</p>
          <p><strong>Sample:</strong> {imageData?.inference_results?.sample_type}</p>
          <p><strong>Status:</strong> {imageData?.inference_results?.celery_status}</p>

          <p className="flex gap-2 items-center">

            <strong>Speed:</strong>
            <div className={`px-2 py-1 rounded w-full text-white ${speedIndicator === "Fast" ? "bg-green-500" : speedIndicator === "Moderate" ? "bg-yellow-500" : "bg-red-500"}`}>
              {speedIndicator}
            </div>
          </p>
        </div>

        {/* Image Viewer */}
        <TransformWrapper
          onZoomStop={(ctx) => {
            const { positionX, positionY, scale } = ctx.state;
            setViewArea({
              x: positionX,
              y: positionY,
              width: 800 / scale,
              height: 500 / scale,
              zoom: scale,
            });
          }}
          onPanningStop={(ctx) => {
            const { positionX, positionY, scale } = ctx.state;
            setViewArea({
              x: positionX,
              y: positionY,
              width: 800 / scale,
              height: 500 / scale,
              zoom: scale,
            });
          }}
        >
          <TransformComponent>
            <div className="relative border-2 border-black">
              <img
                ref={imageRef}
                src={`./${imageData?.inference_results?.filename}`}
                alt="WSI"
                loading="lazy"
                className="w-full md:w-[800px] h-auto md:h-[500px]"
                onLoad={onImageLoad}
              />
              {/* Render bounding boxes dynamically */}
              {detectedRegions.map((region, idx) => {
                const regionLabel = region[4] || `Region ${idx + 1}`;

                return (
                  <div
                    key={idx}
                    className="absolute border-2 border-blue-500"
                    style={{
                      left: `${region[0] * scaleX}px`,
                      top: `${region[1] * scaleY}px`,
                      width: `${(region[2] - region[0]) * scaleX}px`,
                      height: `${(region[3] - region[1]) * scaleY}px`,
                    }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={regionLabel}
                  ></div>
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>

        {/* Mini-Map (Hub View) */}
        <div className="h-screen flex flex-col items-center w-[300px] justify-center border-l-2 border-l-gray-500">

          <div className="relative w-[150px] md:w-[200px] h-[100px] md:h-[125px] border-2 border-gray-400 bg-gray-200">
            <img
              src={`/${imageData?.inference_results?.filename}`}
              alt="WSI Thumbnail"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Viewport Indicator */}
            <div
              className="absolute border-2 border-red-500"
              style={{
                left: `${viewportX}px`,
                top: `${viewportY}px`,
                width: `${viewportWidth}px`,
                height: `${viewportHeight}px`,
              }}
            ></div>

          </div>
          <p><strong>Patient Id: </strong>{imageData?.patient_id}</p>
          <p><strong>Blood Type: </strong>{uniqueBloodTypes.join(", ")}</p>

        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default WSIViewer;
