require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const AuthMiddleware = require("./controller/AuthMiddleware.js");
const PORT = process.env.PORT || 8080;
const DisconnectUser = require("./util/DisconnectUser.js");
const Sender = require("./util/Sender.js");
const User = require("./util/User.js");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //agar cookie bisa di pass ke server
    credentials: true,
  },
});

let users = [
  //isinya instance User.js
];

//middleware for auth jwt
io.use((socket, next) => AuthMiddleware(socket, next));

io.on("connection", async (socket) => {
  try {
    //instance sender class
    const sender = new Sender(io, socket);
    //instance disconnect user class
    const disconnectUser = new DisconnectUser(socket);
    //find user for new object inside users variable
    const findUser = users.find((element) => element.id === socket.id);
    if (findUser === undefined) users.push(new User(socket));
    //setStatus if online
    users.forEach((element) => {
      if (element.id === socket.id) {
        element.setStatus(true);
      }
    });
    //send remain user to all client
    sender.sendRemainUser(users);
    disconnectUser.disconnect(() => {
      //setStatus if offline
      users.forEach((element) => {
        if (element.id === socket.id) {
          element.setStatus(false);
        }
      });
      //send remain user to all client
      sender.sendRemainUser(users);
    });
  } catch (err) {
    console.log(err);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
