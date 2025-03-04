const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let drawingHistory = []; 

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", ws => {
    console.log(`New client connected. Total Clients: ${wss.clients.size}`);

    // Send drawing history to new client
    ws.send(JSON.stringify({ type: "history", data: drawingHistory }));

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "start" || data.type === "draw") {
            drawingHistory.push(data); 
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } else if (data.type === "clear") {
            drawingHistory = [];
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "clear" }));
                }
            });
        }
    });

    ws.on("close", () => console.log(`Client disconnected. Total Clients: ${wss.clients.size}`));
});

// Use PORT from Render or default to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));