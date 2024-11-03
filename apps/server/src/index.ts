import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

// In-memory store for messages
const messageHistory: { username: string; text: string; timestamp: string }[] =
  [];

const clients: WSContext<ServerWebSocket<undefined>>[] = []; // Store connected clients

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onOpen(event, ws) {
        clients.push(ws); // Add the new client to the list

        // Send the message history to the newly connected client
        ws.send(JSON.stringify(messageHistory));
        // Send the message history to the newly connected client
        ws.send(JSON.stringify(messageHistory));
      },
      onMessage(event, ws) {
        const messageData = JSON.parse(event.data as string);
        console.log(
          `Message from client: ${messageData.text} (from ${messageData.username})`
        );

        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Store the message in memory
        const newMessage = {
          username: messageData.username,
          text: messageData.text,
          timestamp,
        };
        messageHistory.push(newMessage);

        // Broadcast the new message to all connected clients
        clients.forEach((client) => {
          client.send(JSON.stringify(messageHistory)); // Send the new message to all clients
        });
      },
      onClose(event, ws) {
        console.log("Connection closed");
        const index = clients.indexOf(ws);
        if (index > -1) {
          clients.splice(index, 1);
        }
      },
      onError(error) {
        console.error("WebSocket error:", error);
      },
    };
  })
);

export default {
  port: 8080,
  fetch: app.fetch,
  websocket,
};
