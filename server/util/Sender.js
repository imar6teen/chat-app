class Sender {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }
  sendRemainUser(users) {
    this.io.emit("users", users);
  }

  sendMessage(from, to, text) {
    //pass
  }
}

module.exports = Sender;
