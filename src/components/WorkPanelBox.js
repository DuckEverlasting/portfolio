import React from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

import temp1 from "../assets/temp/temp1.jpg"
import temp2 from "../assets/temp/temp2.jpg"
import temp3 from "../assets/temp/temp3.jpg"
import temp4 from "../assets/temp/temp4.jpg"
import temp5 from "../assets/temp/temp5.jpg"
import temp6 from "../assets/temp/temp6.jpg"
import temp7 from "../assets/temp/temp7.jpg"
import temp8 from "../assets/temp/temp8.jpg"

const content = [
  {id: 1, name: "", animated: temp1, static: temp2},
  {id: 2, name: "", animated: temp2, static: temp3},
  {id: 3, name: "", animated: temp3, static: temp4},
  {id: 4, name: "", animated: temp4, static: temp5},
  {id: 5, name: "", animated: temp5, static: temp6},
  {id: 6, name: "", animated: temp6, static: temp7},
  {id: 7, name: "", animated: temp7, static: temp8},
  {id: 8, name: "", animated: temp8, static: temp1}
];

function WorkPanelBox({ isOn, triggerModal }) {  
  const workPanelBoxSpring = useSpring({
    transform: isOn ? "rotateX(0)" : "rotateX(-0.25turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 2 }
      : { mass: 1, tension: 480, friction: 38 },
    delay: isOn ? 1000 : 0
  });

  return (
    <>
      <div className="perspective-box">
        <div className="adjustment-box">
          <animated.div className="panel-box" style={workPanelBoxSpring}>
            {content.map(el => (
              <WorkPanel
                key={content.id}
                isOn={isOn}
                content={el}
                triggerModal={triggerModal}
              />
            ))}
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default React.memo(WorkPanelBox);
