class DisconnectUser {
  constructor(socket) {
    this.socket = socket;
  }
  disconnect(cb) {
    this.socket.on("disconnect", (reason) => {
      console.log(
        `User with ID : ${this.socket.id} has been disconnected due to ${reason}`
      );
      cb();
    });
  }
}

module.exports = DisconnectUser;
