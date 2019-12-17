import React from "react";
import { useSpring, animated, config } from "react-spring";

function GradientWipe({ isVisible, trigger }) {
  const gradientWipeSpring = useSpring({
    from: {transform: "translateX(0%)"}, 
    transform: isVisible ? "translateX(0)" : "translateX(110%)",
    config: {tension: 70, friction: 50},
    onRest: () => trigger(false)
  });

  return (
    <animated.div className="gradient-wipe" style={gradientWipeSpring}/>
  );
}

export default GradientWipe;
