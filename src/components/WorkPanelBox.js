import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

function Work({ isOn }) {
  const workPanelBoxSpring = useSpring({
    transform:
      isOn
        ? "rotateX(0)"
        : "rotateX(-0.25turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 2 }
        : { mass: 1, tension: 180, friction: 28 },
  });

  return (
    <div className="perspective-box">
      <div className="adjustment-box">
        <animated.div className="panel-box" style={workPanelBoxSpring}>
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
          <WorkPanel isOn={isOn} />
        </animated.div>
      </div>
    </div>
  );
}

export default Work;
