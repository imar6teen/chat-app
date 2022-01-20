import React from "react";

function SendChat() {
  return (
    <div id="send-chat">
      <form>
        <input type="text" name="input-chat" id="input-chat" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default SendChat;
