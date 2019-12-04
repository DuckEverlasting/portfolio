import React from "react";
import { useSpring, animated } from "react-spring";

function ContactUnfold({ isOn }) {
  const unfoldSpr1 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.5turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 16 }
        : { mass: 1, tension: 18, friction: 16 },
    delay: isOn ? 0 : 1500
  })
  const unfoldSpr2 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.4turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 14 }
        : { mass: 1, tension: 18, friction: 14 },
    delay: isOn ? 125 : 1000
  })
  const unfoldSpr3 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.4turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 12 }
        : { mass: 1, tension: 18, friction: 12 },
    delay: isOn ? 250 : 500
  })
  const unfoldSpr4 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.5turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 10 }
        : { mass: 1, tension: 18, friction: 10 },
    delay: isOn ? 375 : 0
  })

  return (
    <div className="contact-unfold-container">
      <animated.div className="contact-unfold-box first-box" style={unfoldSpr1}>
        <div className="contact-unfold-front first" style={{background: "red"}}/>
        <div className="contact-unfold-back first"/>
        <p className="fold-label first">ONE</p>
        <animated.div className="contact-unfold-box" style={unfoldSpr2}>
          <div className="contact-unfold-front second" style={{background: "blue"}}/>
          <div className="contact-unfold-back second"/>
          <p className="fold-label second">TWO</p>
          <animated.div className="contact-unfold-box" style={unfoldSpr3}>
            <div className="contact-unfold-front third" style={{background: "green"}}/>
            <div className="contact-unfold-back third"/>
            <p className="fold-label third">THREE</p>
            <animated.div className="contact-unfold-box" style={unfoldSpr4}>
              <div className="contact-unfold-front fourth" style={{background: "orange"}}/>
              <div className="contact-unfold-back fourth"/>
              <p className="fold-label fourth">FOUR</p>
            </animated.div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default React.memo(ContactUnfold)