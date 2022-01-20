import React from "react";
import Contact from "../components/Contact.js";
import SendChat from "../components/SendChat.js";
import ChatBox from "../components/ChatBox.js";

function Main() {
  return (
    <div id="main">
      <div className="col contact">
        <Contact />
      </div>
      <div className="col chatting">
        <ChatBox />
        <SendChat />
      </div>
    </div>
  );
}

export default Main;
