import Ably from "ably";

// Initialize Ably with your backend token endpoint
const ablyClient = new Ably.Realtime({
  authUrl: "http://localhost:5000/api/ably/token", // your backend token endpoint
});

// Listen to connection state changes
ablyClient.connection.on((stateChange) => {
  console.log("Ably connection state:", stateChange.current);
});

ablyClient.connection.on("failed", (err) => {
  console.error("Ably connection failed:", err);
});

// Get a channel
const channel = ablyClient.channels.get("test-channel");

// Subscribe to messages
channel.subscribe("test-event", (msg) => {
  console.log("Message received:", msg.data);
});

// Publish a test message after 2 seconds
setTimeout(() => {
  channel.publish("test-event", { text: "Hello from frontend!" });
}, 2000);
