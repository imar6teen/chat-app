const cookie = require("../util/Cookie.js");
const GetUser = require("../util/GetUser.js");
const {
  VerifyJsonWebToken,
  SignJsonWebToken,
} = require("../util/JsonWebToken.js");

const verifyJWT = new VerifyJsonWebToken();
const signJWT = new SignJsonWebToken();
const getUser = new GetUser();

async function AuthMiddleware(socket, next) {
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
      const dataFromRedis = await getUser.getUserRedisByName(username);
      if (password !== dataFromRedis.password) {
        return next(new Error("Data mu salah bos"));
      }
      signJWT.setPayload({
        username: username,
        password: password,
        id: dataFromRedis.id,
      });
      const token = await signJWT.sign();
      const setCookie = cookie.setCookie({
        key: "jwt",
        value: token,
        path: "/",
        expire: "6000000000",
      });
      socket.emit("set cookie", setCookie);
      socket.username = username;
      socket.password = password;
      socket.id = dataFromRedis.id;
    } else {
      const decodeCookie = await verifyJWT.verify(tokenFromCookie);
      if (!decodeCookie) socket.emit("set cookie", "");
      socket.username = decodeCookie.username;
      socket.password = decodeCookie.password;
      socket.id = decodeCookie.id;
    }
    next();
  } catch (err) {
    console.error(err);
  }
}

module.exports = AuthMiddleware;
