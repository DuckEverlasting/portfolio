import React from "react";

import WorkSign from "../components/WorkSign.js"
import WorkPanelBox from "../components/WorkPanelBox.js";
import WorkTelescope from "../components/WorkTelescope.js";

function Work({ scrollPosition, triggerModal }) {
  return (
    <div className="work-page">
      <WorkSign isOn={57 < scrollPosition && scrollPosition < 71} />
      <WorkTelescope isOn={60 < scrollPosition && scrollPosition < 68} />
      <WorkPanelBox isOn={60 < scrollPosition && scrollPosition < 68} triggerModal={triggerModal}/>
    </div>
  );
}

export default Work;
