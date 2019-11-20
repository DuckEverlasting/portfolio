import React from "react";
import { useSpring, animated } from "react-spring";

import springImg from "../assets/spring.png";
import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function About({scrollPosition, skip}) {
  
  const aboutTitleSpr = useSpring({
    transform:
      !skip && 22 < scrollPosition && scrollPosition < 38
        ? "translate(0, 100%)"
        : "translate(0, -200%)",
    config: { mass: 1, tension: 250, friction: 8 }
  });
  const aboutTitleSpringsSpr = useSpring({
    height:
      !skip && 22 < scrollPosition && scrollPosition < 38
        ? "260px"
        : "0px",
    transform:
      !skip && 22 < scrollPosition && scrollPosition < 38
        ? "translate(0, 0)"
        : "translate(0, -20%)",
    config: { mass: 1, tension: 250, friction: 8 }
  });
  const telescope1Spr = useSpring({
    transform:
      !skip && 24 < scrollPosition && scrollPosition < 34
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2Spr = useSpring({
    transform:
      !skip && 24 < scrollPosition && scrollPosition < 34
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3Spr = useSpring({
    transform:
      !skip && 24 < scrollPosition && scrollPosition < 34
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope1bSpr = useSpring({
    transform:
      !skip && 26 < scrollPosition && scrollPosition < 36
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2bSpr = useSpring({
    transform:
      !skip && 26 < scrollPosition && scrollPosition < 36
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3bSpr = useSpring({
    transform:
      !skip && 26 < scrollPosition && scrollPosition < 36
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });

  return (
    <div className="about-page">
      <div className="about-sign">
        <animated.div className="spring-box" style={aboutTitleSpringsSpr}>
        	<img className="left-spring" src={springImg} alt=""/>
        	<img className="right-spring" src={springImg} alt=""/>
        </animated.div>
        <animated.h1 className="title" style={aboutTitleSpr}>
          About
        </animated.h1>
      </div>
      <div className="telescope-A">
        <animated.img className="telescope-3A" style={telescope3Spr} src={telescope3} alt=""/>
      	<animated.img className="telescope-2A" style={telescope2Spr} src={telescope2} alt=""/>
        <animated.img className="telescope-1A" style={telescope1Spr} src={telescope1} alt=""/>
      </div>
      <div className="telescope-B">
        <animated.img className="telescope-3B" style={telescope3bSpr} src={telescope3} alt=""/>
      	<animated.img className="telescope-2B" style={telescope2bSpr} src={telescope2} alt=""/>
        <animated.img className="telescope-1B" style={telescope1bSpr} src={telescope1} alt=""/>
      </div>
      
      
    </div>
  );
}

export default About;
