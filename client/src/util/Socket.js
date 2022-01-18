import io from "socket.io-client";

//trying to do more OOP
// class ConnectStatus {
//   constructor(connect, error) {
//     this.isConnect = connect;
//     this.error = error;
//   }
// }
class Sockets {
  constructor() {
    //do singleton for socket so can share each
    //other file in (useContext do the same)
    if (!Sockets.instance) {
      this.socket = io("http://localhost:8080/", {
        autoConnect: false,
        timeout: 5000,
        //agar cookie di send ke server
        withCredentials: true,
      });
      Sockets.instance = this; //this === class Socket
    }
    return Sockets.instance;
  }
  connectWoCredential(cb) {
    this.socket.connect();
    this.socket.on("connect", () => {
      cb({ isConnect: true, error: false });
    });
    this.socket.on("connect_error", (err) => {
      cb({ isConnect: false, error: err });
    });
  }
  //trying to do more OOP
  // connectWoCredential(cb) {
  //   this.socket.connect();
  //   this.socket.on("connect", () => {
  //     cb(new ConnectStatus(this.socket.connected, false));
  //   });
  //   this.socket.on("connect_error", (err) => {
  //     cb(new ConnectStatus(this.socket.connected, err));
  //   });
  // }
  connectWithCredential(username, password) {
    this.socket.auth.username = username;
    this.socket.auth.password = password;
    this.socket.connect();
  }
}

export default Sockets;
