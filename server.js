const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let drawingHistory = [];
let usersConnected = 0; // Track number of connected users

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", ws => {
    usersConnected++; // Increment user count
    console.log(`New client connected. Total Clients: ${usersConnected}`);

    // Notify all users that someone joined
    broadcast({
        type: "notification",
        message: `A new user has joined. ${usersConnected} users online.`,
        usersConnected
    });

    // Send drawing history to new client
    ws.send(JSON.stringify({ type: "history", data: drawingHistory }));

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "start" || data.type === "draw") {
            drawingHistory.push(data);
            broadcast(data, ws); // Broadcast drawing data except to sender
        } else if (data.type === "clear") {
            drawingHistory = [];
            broadcast({ type: "clear" }); // Broadcast clear event
        }
    });

    ws.on("close", () => {
        usersConnected--; // Decrement user count
        console.log(`Client disconnected. Total Clients: ${usersConnected}`);

        // Notify all users that someone left
        broadcast({
            type: "notification",
            message: `A user has left. ${usersConnected} users online.`,
            usersConnected
        });
    });
});

// Function to broadcast message to all clients except sender (optional)
function broadcast(data, sender = null) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client !== sender) {
            client.send(JSON.stringify(data));
        }
    });
}

// Use PORT from Render or default to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));