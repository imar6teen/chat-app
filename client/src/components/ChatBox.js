import React, { useContext, useEffect, useState } from "react";
import { ToUserContext } from "../pages/Chat";

function ChatBox(props) {
  const toUserContext = useContext(ToUserContext);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    for (let i = 0; i < toUserContext.users.length; i++) {
      if (toUserContext.users[i].id === props.toUser) {
        setMessage(toUserContext.users[i].message);
      }
    }
  }, [toUserContext.users, props.toUser]);
  return (
    <div id="chat-box">
      {message.map((msg) => {
        const timeStamp = new Date();
        return (
          <div className={msg.isSelf ? "my-chat" : "your-chat"}>
            <div className="chat">
              <p>{msg.text}</p>
              <small>
                {timeStamp.toLocaleTimeString(navigator.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBox;
