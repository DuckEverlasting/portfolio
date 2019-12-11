import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

function WorkPanel({ isOn, content, triggerModal }) {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  useEffect(() => {
    content.ref.current.currentTime = content.start || 0;
  }, [content.ref, content.start])

  const workPanelSpring = useSpring({
    transform: isOn ? "rotateX(0)" : "rotateX(0.5turn)",
    config: isOn
      ? { mass: 1, tension: Math.random() * 30 + 40, friction: 2 }
      : { mass: 1, tension: 480, friction: 38 },
    delay: isOn ? Math.random() * 200 + 1000 : Math.random() * 50
  });

  const handleVideoHover = () => {
    setVideoIsPlaying(true);
    content.ref.current.play();
  }

  const handleVideoOff = () => {
    setVideoIsPlaying(false);
    content.ref.current.pause();
    content.ref.current.currentTime = content.start || 0;
  }

  return (
    <div className="work-panel-container">
      <animated.div className="work-panel" style={workPanelSpring}>
        <div className="work-panel-front">
          <div
            className="work-panel-content"
            onMouseEnter={handleVideoHover}
            onMouseLeave={handleVideoOff}
            onClick={() => triggerModal(content.id)}
          >
            <img
              className="work-panel-image"
              src={content.static}
              alt={content.name}
              style={{opacity: videoIsPlaying ? 0 : 1}}
            />
            <div className="work-panel-text">
              <h3 className="work-panel-title">{content.name}</h3>
              <p className="work-panel-slug">{content.slug}</p>
            </div>
            <video
              className="work-panel-video"
              ref={content.ref}
              alt={content.name}
              style={content.style}
              muted
              loop
              src={content.video}
            />
          </div>
        </div>
        <div className="work-panel-back" />
      </animated.div>
    </div>
  );
}

export default React.memo(WorkPanel);
