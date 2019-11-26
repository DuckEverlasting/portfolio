import React from "react";
import { useSpring, animated, config } from "react-spring";

function AboutTextBox({ isOn }) {
  const textBoxHeightSpr = useSpring({
    height: isOn
      ? "100%"
      : "0%",
    delay: isOn
      ? 0
      : 220,
    config: isOn
      ? config.default
      : config.stiff
  })
  const textBoxWidthSpr = useSpring({
    width: isOn
      ? "100%"
      : "0.5%",
    delay: isOn
      ? 400
      : 0,
    config: isOn
      ? config.default
      : config.stiff
  })

  return (
    <div className="text-box-wrapper">
      {<animated.div className="text-box" style={{...textBoxWidthSpr, ...textBoxHeightSpr}} />}
    </div>
  );
}

export default React.memo(AboutTextBox)