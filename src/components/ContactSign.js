import React from "react";
import { useSpring, animated } from "react-spring";

function ContactSign({ isOn }) {
  const contactTitleSpr = useSpring({
    transform:
      isOn
        ? "rotateZ(0turn)"
        : "rotateZ(0.5turn)",
    config: { mass: 1, tension: 55, friction: 6 }
  });

  return (
    <div className="contact-sign">
      <animated.div className="contact-sign-box" style={contactTitleSpr}>
        <div className="contact-title-stem" />
        <div className="contact-text-box">
          <p className="title">Contact</p>
        </div>
      </animated.div>
    </div>
  );
}

export default React.memo(ContactSign)