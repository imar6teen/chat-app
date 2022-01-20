import ConnectSocket from "../util/Socket.js";
const socket = new ConnectSocket();

describe("Testing Socket Class (Socket and ConnectSocket)", () => {
  test("should get response bool", () => {
    socket.connectWoCredential(({ isConnect, error }) => {
      expect(isConnect).toBeTruthy();
    });
  });

  test("should get response bool from connect with credential", () => {
    socket.connectWithCredential("aimar", "121", ({ isConnect, error }) => {
      expect(isConnect).toBeTruthy();
    });
  });

  test("should get socket instance", () => {
    expect(socket.socket).toBe(socket.socket);
  });
});
