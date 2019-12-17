import React from "react";
import { useSpring, animated, config } from "react-spring";

function StarfieldModal({ isVisible, trigger }) {
  const starfieldModalSpring = useSpring({
    from: {transform: "scale(0)"}, 
    transform: isVisible ? "scale(1)" : "scale(0)",
    config: isVisible ?
      { mass: 1, tension: 200, friction: 15 }
      :
      config.default,
    delay: isVisible ? 3500 : 0
  });

  const handleOffButton = ev => {
    ev.preventDefault();
    trigger();
  };

  return (
    <div className="starfield-modal-container">
      <animated.div
        className="starfield-modal"
        style={starfieldModalSpring}
      >
        <button className="modal-off-button" onClick={handleOffButton}>
          X
        </button>
        <p className="starfield-modal-text">Welcome! This is an interactive website. Feel free to play around with the floating lights, or press ENTER if you're ready to move{'\u00A0'}on.</p>
      </animated.div>
    </div>
  );
}

export default React.memo(StarfieldModal);
