import React from "react";
import { useSpring, animated } from "react-spring";

function WorkPanel({ isOn, Content }) {
  const workPanelSpring = useSpring({
    transform:
      isOn
        ? "rotateX(0)"
        : "rotateX(0.5turn)",
    config: 
      isOn
        ? { mass: 1, tension: Math.random() * 30 + 40, friction: 2 }
        : { mass: 1, tension: Math.random() * 40 + 180, friction: 32 },
    delay: 
      isOn
        ? Math.random() * 200
        : Math.random() * 50
  });

  const bgColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`

  return (
    <>
      <div className="work-panel-container">
        <animated.div className="work-panel" style={workPanelSpring}>
          <div className="work-panel-front">
            <div className="work-panel-content" style={{background: bgColor}}>
              {Content}
            </div>
          </div>
          <div className="work-panel-back"/>
        </animated.div>
      </div>
    </>
  );
}

export default React.memo(WorkPanel)