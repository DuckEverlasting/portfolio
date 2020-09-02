import React from "react";
import { useSpring, animated, config } from "react-spring";

function AboutTextBox({ isOn, isLoaded }) {
  const textBoxHeightSpr = useSpring({
    height: isOn ? "100%" : "0%",
    borderWidth: isOn ? "3px" : "0px",
    delay: isLoaded ? (isOn ? 200 : 240) : 0,
    config: isOn
      ? config.easy
      : config.stiff
  })
  const textBoxWidthSpr = useSpring({
    width: isOn ? "100%" : "0%",
    delay: isLoaded ? (isOn ? 700 : 10) : 0,
    config: isOn
      ? config.default
      : {tension: 650, friction: 50}
  })

  return (
    <div className="text-box-wrapper">
      {
        <animated.div className="text-box" style={{...textBoxWidthSpr, ...textBoxHeightSpr}}>
          <p className="about-text">
            I am a full stack web developer specializing in interactive design and image manipulation. 
            I have a background is in film production; I've been 
            an editor, a graphic designer, and a colorist. 
            Now I'm looking to take that experience and apply it to designing and creating 
            beautiful, functional websites.
          </p>
        </animated.div>
      }
    </div>
  );
}

export default React.memo(AboutTextBox)