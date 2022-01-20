import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import Main from "./Main";
import Loading from "./Loading";
import ConnectSocket from "../util/Socket";

const socket = new ConnectSocket(); //connect socket from Socket.js ConnectSocket class

function Chat() {
  //state for connected or not just for UI
  const [isConnected, setIsConnected] = useState(false);
  //loading or not page
  const [isLoading, setIsLoading] = useState(true);
  //cancel subscription ref
  const isCancelSubscription = useRef(true);

  const handleLogin = (e) => {
    const { username, password } = e;
    socket.connectWithCredential(username, password, ({ isConnect, error }) => {
      if (error instanceof Error) {
        setIsLoading(false);
        console.error(error.message);
      } else if (isConnect) {
        setIsConnected(true);
        setIsLoading(false);
        console.error(socket.socket.auth.cookie);
      }
    });
  };

  useEffect(() => {
    //READ THIS
    //NANTI UBAH KONEKSI PERTAMA DENGAN
    //MENGECEK CLIENT PUNYA COOKIE DI CLIENT
    //ITU SENDIRI... TIDAK PERLU KE SERVER
    //trying to do more OOP
    //connect socket w/o credential (username, password)
    // socket.connectWoCredential((connectStatus) => {
    //   //after connect do....
    //   if (connectStatus.error instanceof Error) {
    //     setIsLoading(false);

    //     return console.log(connectStatus.error.message);
    //   }
    //   if (connectStatus.isConnect) {
    //     setIsConnected(true);
    //     setIsLoading(false);
    //     return;
    //   }
    // });
    //connect socket w/o credential (username, password)
    socket.connectWoCredential(({ isConnect, error }) => {
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
