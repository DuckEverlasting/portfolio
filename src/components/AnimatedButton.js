import React from "react";
import { useSpring, animated } from "react-spring";

function AnimatedButton(props) {
  const {children, ...other} = props
  const [buttonSpring, setButtonSpring] = useSpring(i => ({
    transform: "scale(0)"
  }))

  setButtonSpring(i => ({
    transform: "scale(1)",
    delay: 1500 + (props.delay || 0),
    config: props.config || {tension: 200, friction: 10}
  }))

  return (
    <animated.button {...other} style={buttonSpring}>
      {children}
    </animated.button>
  );
}

export default AnimatedButton