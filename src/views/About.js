import React from "react";

import AboutSign from "../components/AboutSign.js";
import AboutTextBox from "../components/AboutTextBox.js";

export default function About({scrollPosition, scrollDirection}) {
  return (
    <div className="about-page">
      <AboutSign isOn={22 < scrollPosition && scrollPosition < 38} />
      <AboutTextBox isOn={26 < scrollPosition && scrollPosition < 35} />
    </div>
  );
}