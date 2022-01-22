class Sender {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }
  sendRemainUser(users) {
    this.socket.emit("users", users);
  }

  sendMessage(from, to, text) {
    //pass
  }

  sendDisconnectUser(users) {
    this.socket.broadcast.emit("disconnect user", users);
  }

  sendConnectUser(users) {
    this.socket.broadcast.emit("connect user", users);
  }
}

module.exports = Sender;
