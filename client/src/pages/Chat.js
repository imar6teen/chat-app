import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import Main from "./Main";
import Loading from "./Loading";
import { ConnectSocket } from "../util/Socket";
// import { Sockets } from "../util/Socket";
import ReceiveMessage from "../util/ReceiveMessage";
import SendMessage from "../util/SendMessage";

const connectSocket = new ConnectSocket(); //connect socket from Socket.js ConnectSocket class
const receiveMsg = new ReceiveMessage(); //for receive message from server
// const socket = new Sockets().socket;
const sendMsg = new SendMessage();

export const ToUserContext = React.createContext();

function Chat() {
  const [users, setUsers] = useState([]);

  //state for connected or not just for UI
  const [isConnected, setIsConnected] = useState(false);
  //loading or not page
  const [isLoading, setIsLoading] = useState(true);
  //cancel subscription ref
  const isCancelSubscription = useRef(true);
  const isCancelSubscriptionSocket = useRef(true);

  const [toUser, setToUser] = useState("");

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
      if (isCancelSubscriptionSocket.current) setUsers(users);
    });
    receiveMsg.getPrivateMessage((data) => {
      if (isCancelSubscriptionSocket.current)
        setUsers((users) => {
          users.forEach((user) => {
            if (user.id === data.from) {
              user.message.push({
                isSelf: false,
                to: data.to,
                text: data.text,
              });
            }
          });
          return [...users];
        });
    });
    receiveMsg.getDisconnectUser((usersServer) => {
      if (isCancelSubscriptionSocket.current)
        setUsers((users) => {
          for (let i = 0; i < users.length; i++) {
            if (usersServer[i].status !== users[i].status) {
              users[i].status = false;
              break;
            }
          }
          return [...users];
        });
    });
    receiveMsg.getConnectUser((usersServer) => {
      if (isCancelSubscriptionSocket.current)
        setUsers((users) => {
          for (let i = 0; i < users.length; i++) {
            if (usersServer[i].status !== users[i].status) {
              users[i].status = true;
              break;
            }
          }
          return [...users];
        });
    });

    return function cleanup() {
      isCancelSubscription.current = false;
      isCancelSubscriptionSocket.current = false;
    };
  }, []);

  const addMessage = (obj) => {
    setUsers((users) => {
      users.forEach((user) => {
        if (user.id === obj.to) {
          user.message.push(obj);
        }
      });
      return [...users];
    });
  };

  return (
    <div id="chat">
      {isLoading ? (
        <Loading />
      ) : isConnected ? (
        <ToUserContext.Provider value={{ users, addMessage, sendMsg }}>
          <Main setToUser={setToUser} toUser={toUser} />
        </ToUserContext.Provider>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default Chat;
