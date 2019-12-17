import React from "react";
import { useSpring, animated, config } from "react-spring";

function AboutTextBox({ isOn }) {
  const textBoxHeightSpr = useSpring({
    height: isOn ? "100%" : "0%",
    delay: isOn ? 200 : 220,
    config: isOn
      ? config.easy
      : config.stiff
  })
  const textBoxWidthSpr = useSpring({
    width: isOn ? "100%" : "0%",
    delay: isOn ? 700 : 10,
    config: isOn
      ? config.default
      : config.stiff
  })
  const textWidthSpr = useSpring({
    transform: isOn ? "scaleX(1)" : "scaleX(0)",
    delay: isOn ? 690 : 0,
    config: isOn
      ? config.default
      : config.stiff
  })

  return (
    <div className="text-box-wrapper">
      {
        <animated.div className="text-box" style={{...textBoxWidthSpr, ...textBoxHeightSpr}}>
          <animated.p className="about-text" style={textWidthSpr}>
            I am a full stack web developer based in Los Angeles, CA. I enjoy making things that work, and fixing things that don't. I come from 
          </animated.p>
        </animated.div>
      }
    </div>
  );
}

export default React.memo(AboutTextBox)