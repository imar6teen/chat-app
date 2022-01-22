import React, { useContext } from "react";
import { ToUserContext } from "../pages/Chat";

function SendChat(props) {
  const toUserContext = useContext(ToUserContext);

  const handleSubmit = (e) => {
    const obj = {
      isSelf: true,
      to: props.toUser,
      text: e.target["input-chat"].value,
    };
    e.preventDefault();
    toUserContext.addMessage(obj);
    toUserContext.sendMsg.sendMessage(obj);
  };
  return (
    <div id="send-chat">
      <form onSubmit={handleSubmit}>
        <input type="text" name="input-chat" id="input-chat" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default SendChat;
