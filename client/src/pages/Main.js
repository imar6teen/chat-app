import React from "react";
import Contact from "../components/Contact.js";
import SendChat from "../components/SendChat.js";
import ChatBox from "../components/ChatBox.js";

function Main(props) {
  return (
    <div id="main">
      <div className="col contact">
        <Contact setToUser={props.setToUser} />
      </div>
      <div className="col chatting">
        <ChatBox toUser={props.toUser} />
        <SendChat toUser={props.toUser} />
      </div>
    </div>
  );
}

export default Main;
