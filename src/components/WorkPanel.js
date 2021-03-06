import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSpring, animated } from "react-spring";
import ClipLoader from "react-spinners/ClipLoader";

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

const KeyConsVid = React.lazy(() => import("./videoComponents/KeyConsVid")),
  GazorkazorkVid = React.lazy(() => import("./videoComponents/GazorkazorkVid")),
  SnapShotVid = React.lazy(() => import("./videoComponents/SnapShotVid")),
  HexsweeperVid = React.lazy(() => import("./videoComponents/HexsweeperVid")),
  RejewelerVid = React.lazy(() => import("./videoComponents/RejewelerVid")),
  TetroVid = React.lazy(() => import("./videoComponents/TetroVid")),
  FirstPersonVid = React.lazy(() => import("./videoComponents/FirstPersonVid")),
  EncounterVid = React.lazy(() => import("./videoComponents/EncounterVid"));

const videos = {
  KeyConsVid: props => <KeyConsVid {...props} />,
  GazorkazorkVid: props => <GazorkazorkVid {...props} />,
  SnapShotVid: props => <SnapShotVid {...props} />,
  HexsweeperVid: props => <HexsweeperVid {...props} />,
  RejewelerVid: props => <RejewelerVid {...props} />,
  TetroVid: props => <TetroVid {...props} />,
  FirstPersonVid: props => <FirstPersonVid {...props} />,
  EncounterVid: props => <EncounterVid {...props} />
}  

const mobile = isMobileDevice();

function WorkPanel({ isOn, content, triggerModal, modalState }) {
  const [isHovering, setIsHovering] = useState(false);
  const [readyForVideo, setReadyForVideo] = useState(false);
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const hoverRef = useRef(isHovering);
  hoverRef.current = isHovering;

  useEffect(() => {
    isOn ? 
      setWorkPanelSpring(() => ({
        transform: "rotateX(0turn)",
        config: { mass: 1, tension: Math.random() * 30 + 40, friction: 2 },
        delay: Math.random() * 200 + 1000,
      }))
      :
      setWorkPanelSpring(() => ({
        transform: "rotateX(0.5turn)",
        config: { mass: 1, tension: 480, friction: 38 },
        delay: Math.random() * 50,
      }))
      // eslint-disable-next-line
  }, [isOn])

  const [workPanelSpring, setWorkPanelSpring] = useSpring(() => ({
    transform: "rotateX(0.5turn)",
    config: { mass: 1, tension: 480, friction: 38 },
    delay: Math.random() * 50,
  }));

  const handleClick = ev => {
    ev.currentTarget.blur();
    triggerModal(content.id);
  }

  const handleSubmit = ev => {
    if (ev.key === "Enter") {
      handleClick(ev)
    }
  }

  const handleVideoHover = async () => {
    if (mobile) {return;}
    setIsHovering(true);
    setReadyForVideo(true);
  }

  const handleVideoOff = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!hoverRef.current) {
        setReadyForVideo(false)
      }
    }, 1000);
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
              style={{opacity: isHovering ? 0 : 1}}
            />

                <div className="work-panel-text">
                  <h3 className="work-panel-title">{content.name}</h3>
                  <p className="work-panel-slug">{content.slug}</p>
                </div>
                <div className="work-panel-video-box">
                  {!videoIsLoaded && isHovering && <div className="spinner-box">
                    <ClipLoader color="white"/>
                  </div>}
                  {readyForVideo && !mobile && 
                    <Suspense fallback={<div />}>
                      {videos[content.video]({style: content.style, onPlay: () => setVideoIsLoaded()})}
                    </Suspense>
                  }
                </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default WorkPanel;
