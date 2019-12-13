import React from "react";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faGithub,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

function ContactUnfold({ isOn }) {
  const unfoldSpr1 = useSpring({
    transform: isOn ? "rotateX(0turn)" : "rotateX(-0.5turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 12 }
      : { mass: 1, tension: 38, friction: 16 },
    delay: isOn ? 0 : 600
  });
  const unfoldSpr2 = useSpring({
    transform: isOn ? "rotateX(0turn)" : "rotateX(-0.25turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 12 }
      : { mass: 1, tension: 38, friction: 14 },
    delay: isOn ? 125 : 400
  });
  const unfoldSpr3 = useSpring({
    transform: isOn ? "rotateX(0turn)" : "rotateX(-0.25turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 14 }
      : { mass: 1, tension: 38, friction: 12 },
    delay: isOn ? 250 : 200
  });
  const unfoldSpr4 = useSpring({
    transform: isOn ? "rotateX(0turn)" : "rotateX(-0.5turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 10 }
      : { mass: 1, tension: 18, friction: 10 },
    delay: isOn ? 375 : 0
  });

  const handleEmailButton = ev => {
    ev.currentTarget.blur();
  };

  return (
    <div className="contact-unfold-container">
      <animated.div className="contact-unfold-box first-box" style={unfoldSpr1}>
        <div className="contact-unfold-front first" />
        <div className="contact-unfold-back first" />
        <div className="fold-content first">© 2019 Matt Klein</div>
        <animated.div className="contact-unfold-box" style={unfoldSpr2}>
          <div className="contact-unfold-front second" />
          <div className="contact-unfold-back second" />
          <div className="fold-content second">
            <a
              className="icon-box"
              tabIndex={isOn ? 1 : -1}
              href="https://www.linkedin.com/in/matthew-s-klein/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaIcon className="icon linked-in" icon={faLinkedinIn} />
            </a>
            <a
              className="icon-box"
              tabIndex={isOn ? 1 : -1}
              href="https://github.com/DuckEverlasting"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaIcon className="icon github" icon={faGithub} />
            </a>
            <a
              className="icon-box"
              tabIndex={isOn ? 1 : -1}
              href="https://twitter.com/DuckEverlasting"
            >
              <FaIcon className="icon twitter" icon={faTwitter} />
            </a>
          </div>
          <animated.div className="contact-unfold-box" style={unfoldSpr3}>
            <div className="contact-unfold-front third" />
            <div className="contact-unfold-back third" />
            <div className="fold-content third">
              <a
                className="email-button"
                href="mailto:mklein246@gmail.com?subject=Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOn ? 0 : -1}
              >
                SEND ME AN EMAIL
              </a>
            </div>
            <animated.div className="contact-unfold-box" style={unfoldSpr4}>
              <div className="contact-unfold-front fourth" />
              <div className="contact-unfold-back fourth" />
              <div className="fold-content fourth">
                Have questions or comments? I'd love to hear them!
              </div>
            </animated.div>
          </animated.div>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default React.memo(ContactUnfold);
