import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

function Work({ isOn }) {
  const workPanelBoxSpring = useSpring({
    transform:
      isOn
        ? "perspective(2500px) rotateX(0)"
        : "perspective(2500px) rotateX(-0.25turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 2 }
        : { mass: 1, tension: 180, friction: 28 },
  });

  return (
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
  );
}

export default Work;
