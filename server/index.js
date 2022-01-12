require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //agar cookie bisa di pass ke server
    credentials: true,
  },
});

io.use((socket, next) => {});

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log(
      `User with ID : ${socket.id} has been disconnected due to ${reason}`
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
