import React from "react";
import { useSpring, animated, config } from "react-spring";

function AboutTextBox({ isOn }) {
  const textBoxHeightSpr = useSpring({
    height: isOn ? "100%" : "0%",
    borderWidth: isOn ? "3px" : "0px",
    delay: isOn ? 200 : 240,
    config: isOn
      ? config.easy
      : config.stiff
  })
  const textBoxWidthSpr = useSpring({
    width: isOn ? "100%" : "0%",
    delay: isOn ? 700 : 10,
    config: isOn
      ? config.default
      : {tension: 650, friction: 50}
  })

  return (
    <div className="text-box-wrapper">
      {
        <animated.div className="text-box" style={{...textBoxWidthSpr, ...textBoxHeightSpr}}>
          <p className="about-text">
            I am a full stack web developer based in Los Angeles, CA. 
            I enjoy making things that work, and fixing things that don't. 
            My background is in film and television production; I've been an editor, a graphic designer, and a colorist. 
            Now I'm looking for the next challenge. 
          </p>
        </animated.div>
      }
    </div>
  );
}

export default React.memo(AboutTextBox)