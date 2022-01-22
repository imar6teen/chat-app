import { Sockets } from "./Socket";

class ReceiveMessage {
  constructor() {
    this.socket = new Sockets().socket;
  }
  getUsers(cb) {
    this.socket.on("users", (users) => {
      cb(users);
    });
  }
  getPrivateMessage(cb) {
    this.socket.on("private message", (data) => {
      cb(data);
    });
  }
  getDisconnectUser(cb) {
    this.socket.on("disconnect user", (users) => {
      cb(users);
    });
  }
  getConnectUser(cb) {
    this.socket.on("connect user", (users) => {
      cb(users);
    });
  }
}

export default ReceiveMessage;
