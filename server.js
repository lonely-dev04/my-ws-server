const express = require("express");
const { WebSocketServer } = require("ws");

const PORT = process.env.PORT || 3000;
const app = express();

// Basic HTTP endpoint (to confirm server is running)
app.get("/", (req, res) => {
  res.send("✅ WebSocket Server is running");
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`HTTP/WebSocket server running on port ${PORT}`);
});

// Attach WebSocket server
const wss = new WebSocketServer({ server });

// When a client connects
wss.on("connection", (ws) => {
  console.log("🔌 Client connected");

  ws.send("Welcome ESP32! 🎉");

  ws.on("message", (msg) => {
  console.log(`📩 Received: ${msg}`);
  
  // Broadcast to all connected clients
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(`Server got: ${msg}`);
    }
  });
});


  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});
