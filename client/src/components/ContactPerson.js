import React from "react";

function ContactPerson(props) {
  return (
    <div id="contact-person">
      <div id="name">
        <p>{props.name}</p>
      </div>
      <div id="status">
        <small>{props.status}</small>
      </div>
    </div>
  );
}

export default ContactPerson;
