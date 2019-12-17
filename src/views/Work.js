import React from "react";

import WorkSign from "../components/WorkSign.js"
import WorkTelescope from "../components/WorkTelescope.js";

function Work({ scrollPosition, skip, triggerModal, modalState }) {
  return (
    <div className="work-page">
      <WorkSign isOn={!skip && 52 < scrollPosition && scrollPosition < 71} />
      <WorkTelescope isOn={!skip && 57 < scrollPosition && scrollPosition < 68} triggerModal={triggerModal} modalState={modalState}/>
    </div>
  );
}

export default Work;
