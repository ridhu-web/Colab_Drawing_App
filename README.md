# 🎨 Real-Time Collaborative Drawing App  

# Video Link : 
https://drive.google.com/file/d/1O9XccYEv_OezMcjPjBGtYIlNG9mp4RLF/view?usp=drive_link

# Webpage Link :
https://colab-drawing-app.onrender.com
## 🚀 Overview  
This is a **real-time** collaborative drawing application where multiple users can **draw on the same canvas simultaneously**. Built with **WebSockets**, it ensures instant updates across all clients.  

## ✨ Features  
✅ Real-time live drawing  
✅ Brush size & color selection  
✅ Users notified when someone joins or leaves  
✅ Persistent drawing history  
✅ Reset canvas feature for all users  
✅ Scalable WebSocket server  

## 📌 Tech Stack  
- **Frontend**: HTML5 Canvas, JavaScript, WebSockets  
- **Backend**: Node.js, Express, WebSocket (`ws`)  

## ⚠️ Deployment Note  
To deploy on **Render/Heroku**, update **`public/index.html`**:  
- **Comment out Line 56** and **uncomment Line 58**:
  ```js
  // const socket = new WebSocket('ws://localhost:8080'); // Comment this
  const socket = new WebSocket(location.origin.replace(/^http/, 'ws')); // Uncomment this
  ```
- For local development, **do the reverse**.

---

## 🔧 Setup & Installation  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/ridhu-web/Colab_Drawing_App.git
cd Colab_Drawing_App
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Run the Server**  
```sh
node server.js
```

### **4️⃣ Open the App**  
- Open `public/index.html` using **Live Server** (if using VS Code).  
- OR manually open it in your browser.  

---

## 🔥 Future Enhancements  
🚀 Add user avatars & usernames  
🚀 Implement drawing layers  
🚀 Add mobile touch support  
