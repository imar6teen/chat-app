import React from "react";
import ContactPerson from "./ContactPerson";

function Contact() {
  return (
    <div id="contact">
      <div id="header">
        <h3>Contact</h3>
        <h3>Person</h3>
      </div>
      <ContactPerson name="Marguera Pantetos" status="Online" />
      <ContactPerson name="Wilona Guatemala" status="Busy" />
      <ContactPerson name="Robert Christamini" status="Offline" />
      <ContactPerson name="Valentina Margaret" status="Offline" />
      <ContactPerson name="Ryuhitohang Cememuah" status="Online" />
    </div>
  );
}

export default Contact;
