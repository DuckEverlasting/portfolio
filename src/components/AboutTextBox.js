import React from "react";
import { useSpring, animated, config } from "react-spring";

function AboutTextBox({ isOn }) {
  const textBoxHeightSpr = useSpring({
    height: isOn ? "100%" : "0%",
    delay: isOn ? 0 : 220,
    config: isOn
      ? config.default
      : config.stiff
  })
  const textBoxWidthSpr = useSpring({
    width: isOn ? "100%" : "0%",
    delay: isOn ? 400 : 10,
    config: isOn
      ? config.default
      : config.stiff
  })
  const textWidthSpr = useSpring({
    transform: isOn ? "scaleX(1)" : "scaleX(0)",
    delay: isOn ? 390 : 0,
    config: isOn
      ? config.default
      : config.stiff
  })

  return (
    <div className="text-box-wrapper">
      {
        <animated.div className="text-box" style={{...textBoxWidthSpr, ...textBoxHeightSpr}}>
          <animated.p className="about-text" style={textWidthSpr}>
            I am a full stack web developer based in Los Angeles, CA. I enjoy making things that work, and fixing things that don't.
          </animated.p>
        </animated.div>
      }
    </div>
  );
}

export default React.memo(AboutTextBox)