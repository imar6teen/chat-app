import React from "react";

function ChatBox() {
  return (
    <div id="chat-box">
      <div className="my-chat">
        <div className="chat">
          <p>
            Kau bodo Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dolore autem obcaecati quis? Amet quasi est repellat magni odit
            commodi debitis dolorem sunt nihil recusandae iste facere, aperiam
            id architecto corrupti.
          </p>
          <small>10.30</small>
        </div>
      </div>
      <div className="your-chat">
        <p>Kau yang bodo</p>
        <small>10.31</small>
      </div>
      <div className="my-chat">
        <p>Kau bodo</p>
        <small>10.32</small>
      </div>
      <div className="your-chat">
        <p>Kau yang bodo</p>
        <small>10.33</small>
      </div>
    </div>
  );
}

export default ChatBox;
