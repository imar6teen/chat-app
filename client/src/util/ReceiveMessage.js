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
}

export default ReceiveMessage;
