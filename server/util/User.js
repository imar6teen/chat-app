class User {
  constructor(socket) {
    this.username = socket.username;
    this.id = socket.id;
    this.status = true;
  }
  setStatus(isConnect) {
    this.status = isConnect;
  }
}

module.exports = User;
