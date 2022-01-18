const fs = require("fs");
const jwt = require("jsonwebtoken");

class JsonWebToken {
  constructor() {
    this.privateKey = fs.readFileSync(
      __dirname + "/../" + "config/" + "private.key",
      "utf-8"
    );
    this.algorithm = "RS256";
    this.payload = null;
    this.expire = 600000;
  }
}

class VerifyJsonWebToken extends JsonWebToken {
  constructor() {
    super();
  }
  verify(token) {
    return new Promise((res, rej) => {
      jwt.verify(
        token,
        this.privateKey,
        { algorithms: this.algorithm },
        (err, decoded) => {
          if (err) {
            rej(err);
          }
          res(decoded);
        }
      );
    });
  }
}

class SignJsonWebToken extends JsonWebToken {
  constructor() {
    super();
  }
  setPayload(payload) {
    this.payload = payload;
    return;
  }
  sign() {
    if (
      this.payload === "" ||
      this.payload === null ||
      this.payload === undefined
    ) {
      return new Error("Payload is Empty");
    }
    return new Promise((res, rej) => {
      jwt.sign(
        this.payload,
        this.privateKey,
        { algorithm: "RS256", expiresIn: this.expire },
        (err, encoded) => {
          if (err) {
            rej(err);
          }
          res(encoded);
        }
      );
    });
  }
}

module.exports = {
  SignJsonWebToken,
  VerifyJsonWebToken,
};
