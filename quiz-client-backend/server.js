const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { port } = require("./config/env");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  
});
app.set("io", io);

// ✅ Make sure this points to the correct file
require("./socket/socket.handler")(io); // or "./socket/quiz.socket"


server.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
