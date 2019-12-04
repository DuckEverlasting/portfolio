import React from "react";
import { useSpring, animated } from "react-spring";

import ContactSign from "../components/ContactSign.js";
import ContactUnfold from "../components/ContactUnfold.js";

import colors from "../styles/Colors.scss"; 

function Contact({ scrollPosition }) {
  const contactPanelSpr = useSpring({
    transform:
      100 === scrollPosition
        ? "perspective(1500px) rotateY(0)"
        : "perspective(1500px) rotateY(0.5turn)",
    config: { mass: 2, tension: 170, friction: 34 }
  });
  const contactPanelBgSpr = useSpring({
    background:
      97 < scrollPosition
        ? colors.darkGreyBlue
        : colors.greyBlue,
    config: { mass: 1, tension: 210, friction: 20 }
  });
  const pixelMaskSpr = useSpring({
    width:
      100 === scrollPosition
        ? "100%"
        : "100.2%",
    config: { mass: 2, tension: 170, friction: 34 }
  });

  return (
    <div className="contact-page">
      <ContactSign isOn={85 < scrollPosition}/>
      <ContactUnfold isOn={90 < scrollPosition}/>
    </div>
  );
}

export default Contact;
