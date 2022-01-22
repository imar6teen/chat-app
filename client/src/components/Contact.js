import React, { useContext } from "react";
import { ToUserContext } from "../pages/Chat";
import ContactPerson from "./ContactPerson";

function Contact(props) {
  const toUserContext = useContext(ToUserContext);

  return (
    <div id="contact">
      <div id="header">
        <h3>Contact</h3>
        <h3>Person</h3>
      </div>
      {toUserContext.users.map((user) => {
        return (
          <ContactPerson
            setToUser={props.setToUser}
            name={user.username}
            status={user.status}
            key={user.id}
            id={user.id}
          />
        );
      })}
    </div>
  );
}

export default Contact;
