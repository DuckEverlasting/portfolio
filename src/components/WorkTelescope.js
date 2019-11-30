import React from "react";
import { useSpring, animated } from "react-spring";

import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function WorkTelescope({ isOn }) {
  const telescope1Spr = useSpring({
    transform:
      isOn
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2Spr = useSpring({
    transform:
      isOn
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3Spr = useSpring({
    transform:
      isOn
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescopeBarSpr = useSpring({
    transform:
      isOn
        ? "translate(190%, 0)"
        : "translate(-100%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });

  // NOTE: GAH ENOUGH OF THIS FLIP THE DARN PICTURES AND REDO THE POSITIONING

  return (
    <>
      <div className="telescope-container">
          <animated.div className="telescope-bar" style={telescopeBarSpr} />
          <animated.img className="telescope-3" style={telescope3Spr} src={telescope3} alt=""/>
          <animated.img className="telescope-2" style={telescope2Spr} src={telescope2} alt=""/>
          <animated.img className="telescope-1" style={telescope1Spr} src={telescope1} alt=""/>
      </div>
    </>
  );
}

export default React.memo(WorkTelescope)
