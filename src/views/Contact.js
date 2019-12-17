import React from "react";

import ContactSign from "../components/ContactSign.js";
import ContactUnfold from "../components/ContactUnfold.js";

function Contact({ scrollPosition, skip }) {

  return (
    <div className="contact-page">
      <ContactSign isOn={!skip && 80 < scrollPosition}/>
      <ContactUnfold isOn={!skip && 85 < scrollPosition}/>
    </div>
  );
}

export default Contact;
