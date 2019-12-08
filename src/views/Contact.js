import React from "react";

import ContactSign from "../components/ContactSign.js";
import ContactUnfold from "../components/ContactUnfold.js";

function Contact({ scrollPosition }) {

  return (
    <div className="contact-page">
      <ContactSign isOn={85 < scrollPosition}/>
      <ContactUnfold isOn={90 < scrollPosition}/>
    </div>
  );
}

export default Contact;
