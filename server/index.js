require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
const cookie = require("./util/Cookie.js");
const {
  VerifyJsonWebToken,
  SignJsonWebToken,
} = require("./util/JsonWebToken.js");
const verifyJWT = new VerifyJsonWebToken();
const signJWT = new SignJsonWebToken();

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //agar cookie bisa di pass ke server
    credentials: true,
  },
});

//middleware for auth jwt
io.use(async (socket, next) => {
  try {
    const tokenFromCookie = cookie.getCookie(
      "jwt",
      socket.handshake.headers.cookie
    );
    if (tokenFromCookie === undefined) {
      const username = socket.handshake.auth.username;
      const password = socket.handshake.auth.password;
      if (username === undefined && password === undefined)
        return next(new Error("Cookie is undefined"));
      signJWT.setPayload({ username: username, password: password });
      const token = await signJWT.sign();
      console.log(token);
    }
    next();
  } catch (err) {
    console.error(err);
  }
});

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
