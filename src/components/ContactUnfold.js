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
        ? { mass: 1, tension: 40, friction: 12 }
        : { mass: 1, tension: 38, friction: 16 },
    delay: isOn ? 0 : 600
  })
  const unfoldSpr2 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.25turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 12 }
        : { mass: 1, tension: 38, friction: 14 },
    delay: isOn ? 125 : 400
  })
  const unfoldSpr3 = useSpring({
    transform:
      isOn
        ? "rotateX(0turn)"
        : "rotateX(-0.25turn)",
    config: 
      isOn
        ? { mass: 1, tension: 40, friction: 14 }
        : { mass: 1, tension: 38, friction: 12 },
    delay: isOn ? 250 : 200
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

  const handleEmailButton = ev => {
    ev.preventDefault();
    ev.target.blur();
  }

  return (
    <div className="contact-unfold-container">
      <animated.div className="contact-unfold-box first-box" style={unfoldSpr1}>
        <div className="contact-unfold-front first"/>
        <div className="contact-unfold-back first"/>
        <div className="fold-content first"/>
        <animated.div className="contact-unfold-box" style={unfoldSpr2}>
          <div className="contact-unfold-front second"/>
          <div className="contact-unfold-back second"/>
          <div className="fold-content second">(Social media icons here)</div>
          <animated.div className="contact-unfold-box" style={unfoldSpr3}>
            <div className="contact-unfold-front third"/>
            <div className="contact-unfold-back third"/>
            <div className="fold-content third">
              <button className="email-button" tabIndex={5} onClick={handleEmailButton}>SEND ME AN EMAIL</button>
            </div>
            <animated.div className="contact-unfold-box" style={unfoldSpr4}>
              <div className="contact-unfold-front fourth"/>
              <div className="contact-unfold-back fourth"/>
              <div className="fold-content fourth">Have questions or comments? I'd love to hear them!</div>
            </animated.div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default React.memo(ContactUnfold)