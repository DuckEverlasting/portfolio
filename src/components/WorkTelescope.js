import React from "react";
import { useSpring, animated } from "react-spring";

import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function WorkTelescope({ isOn }) {
  const telescope1Spr = useSpring({
    transform:
      isOn
        ? "translate(50%, 0)"
        : "translate(150%, 0)",
    config: { mass: 5, tension: 400, friction: 120 },
    delay: isOn ? 0 : 330
  });
  const telescope2Spr = useSpring({
    transform:
      isOn
        ? "translate(0%, 0)"
        : "translate(150%, 0)",
    config: { mass: 5, tension: 400, friction: 120 },
    delay: isOn ? 0 : 330
  });
  const telescope3Spr = useSpring({
    transform:
      isOn
        ? "translate(-50%, 0)"
        : "translate(150%, 0)",
    config: { mass: 5, tension: 400, friction: 120 },
    delay: isOn ? 0 : 330
  });
  const telescopeBarSpr = useSpring({
    transform:
      isOn
        ? "translate(0, 0)"
        : "translate(200%, 0)",
    config: 
      isOn
        ? { mass: 1, tension: 250, friction: 50 }
        : { mass: 1, tension: 150, friction: 50 },
    delay: isOn ? 300 : 330
  });

  return (
    <>
      <div className="telescope-container">
          <animated.div className="telescope-bar" style={{...telescopeBarSpr, zIndex: isOn ? 0 : 1}}>
            <div className="bar" style={{zIndex: isOn ? 0 : 1}}/>
            <div className="ball"/>
          </animated.div>
          <animated.img className="telescope-3" style={telescope3Spr} src={telescope3} alt=""/>
          <animated.img className="telescope-2" style={telescope2Spr} src={telescope2} alt=""/>
          <animated.img className="telescope-1" style={telescope1Spr} src={telescope1} alt=""/>
      </div>
    </>
  );
}

export default React.memo(WorkTelescope)
