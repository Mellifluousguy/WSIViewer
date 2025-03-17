# 🩸 WSI Viewer - Whole Slide Image Detection

This project is a **React-based Whole Slide Image (WSI) Viewer** with **zoom, pan, bounding boxes, and a mini-map**.  
It processes **medical images**, detects **blood types**, and provides **detailed patient insights**.  

---

## 🚀 **Features**
✅ View **Whole Slide Images (WSI)** with **Zoom & Pan**  
✅ **Bounding Boxes** for detected objects (Blood Cells, RBCs, etc.)  
✅ **Mini-map (Thumbnail)** with a **red viewport indicator**  
✅ **Real-time Execution Speed Indicator** (Fast / Moderate / Slow)  
✅ **Filters & Displays Unique Blood Types**  
✅ **Fully Responsive UI** (Works on all screen sizes)  

---

## 🛠 **Technologies Used**
- ⚛️ **React.js** - Frontend UI  
- 🎨 **Tailwind CSS** - Styling  
- 📦 **react-zoom-pan-pinch** - Zoom & Pan functionality  
- 🛠 **React Tooltip** - Tooltips for bounding boxes  

---

## 📂 **Project Structure**
```
📦 WSI-Viewer
│── 📂 public/          # Contains static assets (WSI images, JSON)
│── 📂 src/             # Main source code
│   ├── 📜 App.js       # Main component
│   ├── 📜 WSIViewer.js # Image viewer with zoom & bounding boxes
│   ├── 📜 index.js     # Entry file
│── 📜 package.json     # Dependencies & scripts
│── 📜 README.md        # Project documentation
```

---

## 🔧 **Setup & Installation**
### 1️⃣ **Clone the repository**
```sh
git clone https://github.com/yourusername/WSI-Viewer.git
cd WSI-Viewer
```

### 2️⃣ **Install dependencies**
```sh
npm install
```

### 3️⃣ **Run the development server**
```sh
npm start
```
The project will be live at: **`http://localhost:5173/`**

---

## 📊 **JSON Structure (`output.json`)**
The project reads detection data from a JSON file.  
Example **`output.json`**:
```json
{
  "patient_id": "123",
  "inference_results": {
    "sample_type": "Blood",
    "date": "2025-03-17",
    "celery_status": "completed",
    "output": {
      "delayTime": 950,
      "executionTime": 7223,
      "detection_results": [
        [121, 4, 163, 45, "Circular_RBC"],
        [396, 312, 433, 353, "Sickle_Cell"]
      ]
    }
  }
}
```

---

## 🩸 **How Blood Type is Displayed**
- The app **extracts blood types** from detection results.  
- **Removes duplicates** and shows a single, **comma-separated list**.  

📌 **Example Output:**  
```
Blood Type: Circular_RBC, Sickle_Cell
```

---

## 📦 **Deployment**
For **production**, deploy it to **Vercel** or **Netlify**:
```sh
npm run build
```
Then upload the **`build/`** folder to **Vercel / Netlify / GitHub Pages**.

---

## 🤝 **Contributing**
Feel free to **fork, contribute, and improve** this project!  
To contribute:
1. Fork the repo  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to your fork (`git push origin feature-name`)  
5. Open a Pull Request  

---

## 📜 **License**
This project is licensed under the **MIT License**.

---

## 💡 **Author**
👤 **Mohit Gupta**  
🔗 [GitHub](https://github.com/mellifluouosguy) | [LinkedIn](https://linkedin.com/in/mellifluousguy)  

---

🚀 **Hope you like this project! Star ⭐ the repo if you find it useful!**
