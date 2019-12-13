import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

const mobile = isMobileDevice();

function WorkPanel({ isOn, content, triggerModal, modalState }) {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  useEffect(() => {
    if (mobile) return;
    content.ref.current.currentTime = content.start || 0;
  }, [content.ref, content.start])

  const workPanelSpring = useSpring({
    transform: isOn ? "rotateX(0)" : "rotateX(0.5turn)",
    config: isOn
      ? { mass: 1, tension: Math.random() * 30 + 40, friction: 2 }
      : { mass: 1, tension: 480, friction: 38 },
    delay: isOn ? Math.random() * 200 + 1000 : Math.random() * 50
  });

  const handleClick = ev => {
    ev.currentTarget.blur();
    triggerModal(content.id);
  }

  const handleSubmit = ev => {
    if (ev.key === "Enter") {
      handleClick(ev)
    }
  }

  const handleVideoHover = () => {
    if (!mobile) {
      setVideoIsPlaying(true);
      content.ref.current.play();
    };
  }

  const handleVideoOff = () => {
    if (!mobile) {
      setVideoIsPlaying(false);
      content.ref.current.pause();
      content.ref.current.currentTime = content.start || 0;
    }
  }

  return (
    <div className="work-panel-container">
      <animated.div className="work-panel" style={workPanelSpring}>
        <div className="work-panel-front">
          <div
            className="work-panel-content"
            tabIndex={isOn && !modalState ? 0 : -1}
            onMouseEnter={handleVideoHover}
            onMouseLeave={handleVideoOff}
            onClick={handleClick}
            onKeyPress={handleSubmit}
          >
            <img
              className="work-panel-image"
              src={content.static}
              alt={content.name}
              style={{opacity: videoIsPlaying ? 0 : 1}}
            />
            {!mobile && <>
              <div className="work-panel-text">
                <h3 className="work-panel-title">{content.name}</h3>
                <p className="work-panel-slug">{content.slug}</p>
              </div>
              <div className="work-panel-video-box">
                <video
                  className="work-panel-video"
                  ref={content.ref}
                  alt={content.name}
                  style={content.style}
                  muted={true}
                  loop={true}
                  src={content.video}
                />
              </div>
            </>}
          </div>
        </div>
        <div className="work-panel-back" />
      </animated.div>
    </div>
  );
}

export default React.memo(WorkPanel);
