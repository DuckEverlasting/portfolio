import React from "react";
import { useSpring, animated } from "react-spring";

function StarfieldModal({ isVisible, trigger }) {
  const starfieldModalSpring = useSpring({
    transform: isVisible ? "scale(1)" : "scale(0)",
    config: { mass: 1, tension: 200, friction: 15 },
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
