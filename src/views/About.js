import React from "react";

import AboutSign from "../components/AboutSign.js";
import AboutTextBox from "../components/AboutTextBox.js";

export default function About({ scrollPosition, skip }) {
  return (
    <div className="about-page">
      <AboutSign isOn={!skip && 22 < scrollPosition && scrollPosition < 38} />
      <AboutTextBox isOn={!skip && 26 < scrollPosition && scrollPosition < 35} />
    </div>
  );
}