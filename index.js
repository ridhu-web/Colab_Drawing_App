const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let drawingHistory = []; 

wss.on("connection", ws => {
    console.log(`New client connected. Total Clients: ${wss.clients.size}`);

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

console.log("WebSocket server running on ws://localhost:8080");
