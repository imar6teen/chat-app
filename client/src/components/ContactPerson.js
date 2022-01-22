import React from "react";

function ContactPerson(props) {
  const handleClick = () => {
    props.setToUser(props.id);
  };
  return (
    <div id="contact-person" onClick={handleClick}>
      <div id="name">
        <p>{props.name}</p>
      </div>
      <div id="status">
        <small>{props.status ? "Online" : "Offline"}</small>
      </div>
    </div>
  );
}

export default ContactPerson;
