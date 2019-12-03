import React from "react";
import { useSpring, animated } from "react-spring";

import ContactSign from "../components/ContactSign.js";

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
      <div className="flipbook">
        <animated.div className="flip-panel" style={contactPanelSpr}>
          <div className="frontside">
            <h2 className="project-title">Title of Work</h2>
            <div className="project-window">
              
            </div>
          </div>
          <animated.div className="backside" style={{...contactPanelBgSpr, ...pixelMaskSpr}}/>
        </animated.div>
        <div className="flipbook-back" />
      </div>
    </div>
  );
}

export default Contact;
