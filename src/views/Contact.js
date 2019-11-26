import React from "react";
import { useSpring, animated } from "react-spring";

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
        ? "rgb(77, 77, 77)"
        : "rgb(117, 117, 117)",
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
