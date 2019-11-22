import React from "react";
import { useSpring, animated } from "react-spring";

function Work({ scrollPosition }) {
  const workPanelSpr = useSpring({
    transform:
      60 < scrollPosition && scrollPosition < 68
        ? "perspective(1500px) rotateY(0)"
        : "perspective(1500px) rotateY(0.5turn)",
    config: { mass: 2, tension: 170, friction: 34 }
  });
  const workPanelBgSpr = useSpring({
    background:
      58 < scrollPosition && scrollPosition < 70
        ? "rgb(177, 177, 177)"
        : "rgb(207, 207, 207)",
    config: { mass: 1, tension: 210, friction: 20 }
  });
  const pixelMaskSpr = useSpring({
    width:
      60 < scrollPosition && scrollPosition < 68
        ? "100%"
        : "100.2%",
    config: { mass: 2, tension: 170, friction: 34 }
  });

  return (
    <div className="work-page">
      <div className="flipbook">
        <animated.div className="flip-panel" style={workPanelSpr}>
          <div className="frontside">
            <h2 className="project-title">Title of Work</h2>
            <div className="project-window">

            </div>
          </div>
          <animated.div className="backside" style={{...workPanelBgSpr, ...pixelMaskSpr}}/>
        </animated.div>
        <div className="flipbook-back" />
      </div>
    </div>
  );
}

export default Work;
