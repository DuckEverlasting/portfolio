import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanelBox from "../components/WorkPanelBox.js";

import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function WorkTelescope({ isOn, triggerModal, modalState }) {
  const { val } = useSpring({
    val: isOn ? 0 : 100,
    config: { mass: 5, tension: 400, friction: 120 },
    delay: isOn ? 0 : 300
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
    delay: isOn ? 300 : 300
  });
  console.log(val);

  return (
    <>
      <div className="telescope-container">
        <animated.div className="telescope-bar" style={{...telescopeBarSpr, zIndex: isOn ? 0 : 1}}>
          <WorkPanelBox isOn={isOn} triggerModal={triggerModal} modalState={modalState}/>
          <div className="bar" style={{zIndex: isOn ? 0 : 1}}/>
          <div className="ball"/>
        </animated.div>
        {val && <>
          <animated.img className="telescope-3" style={{
            transform: val.interpolate(val => `translate(${val * 2 - 50}%, 0)`)
          }} src={telescope3} alt=""/>
          <animated.img className="telescope-2" style={{
            transform: val.interpolate(val => `translate(${val * 1.5}%, 0)`)
          }} src={telescope2} alt=""/>
          <animated.img className="telescope-1" style={{
            transform: val.interpolate(val => `translate(${val + 50}%, 0)`)
          }} src={telescope1} alt=""/>
        </>}
      </div>
    </>
  );
}

export default React.memo(WorkTelescope)
