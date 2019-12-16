import React from "react";
import { useSpring, animated } from "react-spring";

function StarfieldModal({ isVisible, trigger }) {
  const starfieldModalSpring = useSpring({
    from: {transform: "scale(0)"}, 
    transform: isVisible ? "scale(1)" : "scale(0)",
    config: isVisible ?
      { mass: 1, tension: 200, friction: 15 }
      :
      { mass: 1, tension: 100, friction: 15 },
    delay: isVisible ? 1800 : 0
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
        <p className="starfield-modal-text">EXPLANATION TEXT GOES HERE! LA DI DA DI DA</p>
      </animated.div>
    </div>
  );
}

export default React.memo(StarfieldModal);
