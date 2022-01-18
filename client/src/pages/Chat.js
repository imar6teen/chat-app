import React, { useEffect, useState } from "react";
import Login from "./Login";
import Main from "./Main";
import Loading from "./Loading";
import Sockets from "../util/Socket";

const socket = new Sockets(); //connect socket from ConnectSocket.js

function Chat() {
  //state for connected or not just for UI
  const [isConnected, setIsConnected] = useState(false);
  //loading or not page
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      if (error instanceof Error) {
        setIsLoading(false);
        return console.log(error.message);
      }
      if (isConnect) {
        setIsConnected(true);
        setIsLoading(false);
        return;
      }
    });
  }, []);

  return (
    <div id="chat">
      {isLoading ? <Loading /> : isConnected ? <Main /> : <Login />}
    </div>
  );
}

export default Chat;
