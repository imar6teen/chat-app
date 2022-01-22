import { Sockets } from "./Socket";

class SendMessage {
  constructor() {
    this.socket = new Sockets().socket;
  }
  sendMessage({ isSelf, to, text }) {
    this.socket.emit("private message", {
      to,
      text,
    });
  }
}

export default SendMessage;
