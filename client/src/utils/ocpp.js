import WebSocket, { connection } from "websocket";

const client = new WebSocket.client();

client.on("connectFailed", (error) => {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", (connection) => {
  console.log("WebSocket Client Connected");
  connection.on("error", (error) => {
    console.log("Connection Error: ", +error.toString());
  });
  connection.on("close", () => {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", (message) => {
    if (message.type === "utf8") {
      console.log("Received: ", +message.utf8Data + "'");
    }
  });
});

const ocuppURL = "ws://www.ecarup.com/api/Ocpp16/65C48CA26C75CG83/station1";

client.connect(ocuppURL, "ocpp1.6");
