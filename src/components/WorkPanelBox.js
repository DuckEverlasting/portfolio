import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

function WorkPanelBox({ isOn }) {
  const workPanelBoxSpring = useSpring({
    transform:
      isOn
        ? "rotateX(0)"
        : "rotateX(-0.25turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 2 }
        : { mass: 1, tension: 480, friction: 38 },
    delay: isOn ? 1000 : 0
  });

  // NOTE TO SELF: MAKE PANEL CONTENT VIDEOS THAT PLAY ON HOVER

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

export default React.memo(WorkPanelBox)
