import React from "react";
import { useSpring, animated } from "react-spring";

import springImg from "../assets/spring.png";

function AboutSign({ isOn }) {
  const aboutTitleSpr = useSpring({
    transform:
      isOn
        ? "translate(0, 100%)"
        : "translate(0, -200%)",
    config: { mass: 1, tension: 250, friction: 8 }
  });
  const aboutTitleSpringsSpr = useSpring({
    to: 
      isOn
        ? {height: "170px", transform: "translate(0, 0)"}
        : {height: "0px", transform: "translate(0, -20%)"},
    config: { mass: 1, tension: 250, friction: 8 }
  });

  return (
    <div className="about-sign">
      <animated.div className="spring-box" style={aboutTitleSpringsSpr}>
        <img className="left-spring" src={springImg} alt="" />
        <img className="right-spring" src={springImg} alt="" />
      </animated.div>
      <animated.h1 className="title" style={aboutTitleSpr}>
        About
      </animated.h1>
    </div>
  );
}

export default React.memo(AboutSign)