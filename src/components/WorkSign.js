import React from "react";
import { useSpring, animated } from "react-spring";

import colors from "../styles/Colors.scss"; 

function WorkSign({ isOn }) {
  const workTitleSpr = useSpring({
    transform:
      isOn
        ? "rotateY(0turn)"
        : "rotateY(0.5turn)",
    config: { mass: 1, tension: 250, friction: 8 },
    delay: isOn ? 200 : 0
  });
  const workTitleBackSpr = useSpring({
    background:
      isOn
        ? colors.darkGreyBlue
        : colors.greyBlue,
    config:
      isOn
        ? { mass: 1, tension: 150, friction: 8 }
        : { mass: 1, tension: 350, friction: 18 },
  });

  return (
    <div className="work-sign-container">
      <div className="work-sign-box">
        <animated.div className="work-sign" style={workTitleSpr}>
          <div className="work-sign-front">
            <p className="title">Work</p>
          </div>
          <animated.div className="work-sign-back" style={workTitleBackSpr}/>
        </animated.div>
      </div>
    </div>
  );
}

export default React.memo(WorkSign)