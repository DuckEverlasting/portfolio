import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanelBox from "../components/WorkPanelBox.js";

function Work({ scrollPosition }) {

  return (
    <div className="work-page">
      <WorkPanelBox isOn={60 < scrollPosition && scrollPosition < 68} />
    </div>
  );
}

export default Work;
