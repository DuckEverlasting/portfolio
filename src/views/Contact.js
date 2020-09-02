import React from "react";

import ContactSign from "../components/ContactSign.js";
import ContactUnfold from "../components/ContactUnfold.js";

function Contact({ scrollPosition, skip, isLoaded }) {
  return (
    <div className="contact-page">
      <ContactSign isOn={!skip && 80 < scrollPosition} isLoaded={isLoaded}/>
      <ContactUnfold isOn={!skip && 85 < scrollPosition} isLoaded={isLoaded}/>
    </div>
  );
}

export default Contact;
