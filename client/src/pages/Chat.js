import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import Main from "./Main";
import Loading from "./Loading";
import { ConnectSocket } from "../util/Socket";
// import { Sockets } from "../util/Socket";
import ReceiveMessage from "../util/ReceiveMessage";

const connectSocket = new ConnectSocket(); //connect socket from Socket.js ConnectSocket class
const receiveMsg = new ReceiveMessage(); //for receive message from server
// const socket = new Sockets().socket;

function Chat() {
  const [users, setUsers] = useState([]);

  //state for connected or not just for UI
  const [isConnected, setIsConnected] = useState(false);
  //loading or not page
  const [isLoading, setIsLoading] = useState(true);
  //cancel subscription ref
  const isCancelSubscription = useRef(true);

  const handleLogin = (e) => {
    const { username, password } = e;
    connectSocket.connectWithCredential(
      username,
      password,
      ({ isConnect, error }) => {
        if (error instanceof Error) {
          setIsLoading(false);
          console.error(error.message);
        } else if (isConnect) {
          setIsConnected(true);
          setIsLoading(false);
          // console.error(socket.socket.auth.cookie);
        }
      }
    );
  };

  useEffect(() => {
    //READ THIS
    //NANTI UBAH KONEKSI PERTAMA DENGAN
    //MENGECEK CLIENT PUNYA COOKIE DI CLIENT
    //ITU SENDIRI... TIDAK PERLU KE SERVER
    connectSocket.connectWoCredential(({ isConnect, error }) => {
      //after connect do....
      if (isCancelSubscription.current) {
        if (error instanceof Error) {
          setIsLoading(false);
          console.error(error.message);
        } else if (isConnect) {
          setIsConnected(true);
          setIsLoading(false);
        }
      }
    });

    receiveMsg.getUsers((users) => {
      setUsers(users);
    });

    return function cleanup() {
      isCancelSubscription.current = false;
    };
  }, []);

  return (
    <div id="chat">
      {isLoading ? (
        <Loading />
      ) : isConnected ? (
        <Main />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default Chat;
