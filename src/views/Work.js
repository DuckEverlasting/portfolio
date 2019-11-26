import React from "react";
import { useSpring, animated } from "react-spring";

import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function Work({ scrollPosition }) {
  const telescope1Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope1bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });

  return (
    <div className="work-page">
      <div className="telescope-A">
        <animated.div className="telescope-A-end" style={telescope3Spr} >
          <div className="text-box-A">
            <div className="inner-text-box-A">
              <p>Matt Klein is a boy. Hey likes ducks. How are you? Lorem ipsum blah blah blah yadda yadda yadda.</p>
            </div>
          </div>
          <img className="telescope-3A" src={telescope3} alt=""/>
        </animated.div>
      	<animated.img className="telescope-2A" style={telescope2Spr} src={telescope2} alt=""/>
        <animated.img className="telescope-1A" style={telescope1Spr} src={telescope1} alt=""/>
      </div>
      <div className="telescope-B">
        <animated.div className="telescope-B-end" style={telescope3bSpr} >
          <div className="text-box-B">
            <p>HELLO</p>
          </div>
          <img className="telescope-3B" src={telescope3} alt=""/>
        </animated.div>
      	<animated.img className="telescope-2B" style={telescope2bSpr} src={telescope2} alt=""/>
        <animated.img className="telescope-1B" style={telescope1bSpr} src={telescope1} alt=""/>
      </div>
    </div>
  );
}

export default Work;
