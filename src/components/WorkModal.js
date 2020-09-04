import React, { useState, useEffect, Suspense } from "react";
import { useSpring, animated } from "react-spring";

import keyConsPlaceholder from "../assets/Videos/Key-Cons-sample.png";
import gazorkazorkPlaceholder from "../assets/Videos/Gazorkazork-sample.png"
import snapShotPlaceholder from "../assets/Videos/SnapShot-sample.png";
import hexsweeperPlaceholder from "../assets/Videos/Hexsweeper-sample.png";
import rejewelerPlaceholder from "../assets/Videos/Rejeweler-sample.png";
import tetroPlaceholder from "../assets/Videos/Tetro-sample.png";
import firstPersonPlaceholder from "../assets/Videos/First-Person-sample.png";
import encounterPlaceholder from "../assets/Videos/5E-Encounter-sample.png";

const KeyConsVid = React.lazy(() => import("./videoComponents/KeyConsVid")),
  GazorkazorkVid = React.lazy(() => import("./videoComponents/GazorkazorkVid")),
  SnapShotVid = React.lazy(() => import("./videoComponents/SnapShotVid")),
  HexsweeperVid = React.lazy(() => import("./videoComponents/HexsweeperVid")),
  RejewelerVid = React.lazy(() => import("./videoComponents/RejewelerVid")),
  TetroVid = React.lazy(() => import("./videoComponents/TetroVid")),
  FirstPersonVid = React.lazy(() => import("./videoComponents/FirstPersonVid")),
  EncounterVid = React.lazy(() => import("./videoComponents/EncounterVid"));

const modalData = {
  0: {
    title: "",
    techStack: "",
    description: "",
    video: "",
    link: ""
  },
  1: {
    title: "Key Conservation",
    techStack: "React Native, Redux, Node.js,\u00A0Auth0",
    description: <p>Social media app built to connect conservationists with potential supporters. Built by rotating teams of developers as part of Lambda Labs. I was a member of the original team for the project; <a href="https://youtu.be/vivicbwPDts" target="_blank" rel="noopener noreferrer">this video</a> is a presentation of the work my team did in the app's first two months.</p>,
    video: <KeyConsVid />,
    placeholder: keyConsPlaceholder,
    link: "https://www.keyconservation.org/"
  },
  2: {
    title: "Gazorkazork",
    techStack: "React, Django",
    description: <p>Online MUD (Multi-User Dungeon) prototype built by a small team in one week. My work on the project included a <a href="https://github.com/Gazorkazork/django_be/blob/master/util/room_layout.py" target="_blank" rel="noopener noreferrer">room generation algorithm</a> and a <a href="https://github.com/Gazorkazork/frontend/blob/master/src/utils/textParser.js" target="_blank" rel="noopener noreferrer">language parser</a>.</p>,
    video: <GazorkazorkVid />,
    placeholder: gazorkazorkPlaceholder,
    link: "https://gazorkazork.netlify.com/"
  },
  3: {
    title: "SnapShot",
    techStack: "React, Redux",
    description: "Solo project. Online layer-based image editor and drawing tool. Originally built to test interactions between React, Redux, and the Canvas API.",
    video: <SnapShotVid />,
    placeholder: snapShotPlaceholder,
    link: "https://snapshotie.netlify.com/"
  },
  4: {
    title: "Hexsweeper",
    techStack: "React",
    description: "Solo project. Minesweeper clone built to test limitations of React, to learn more about React's memoization features, and to become more familiar with working in a hexagonal grid.",
    video: <HexsweeperVid />,
    placeholder: hexsweeperPlaceholder,
    link: "http://hexsweeper.netlify.com/"
  },
  5: {
    title: "Rejeweler",
    techStack: "Javascript",
    description: "Solo project. Bejewled clone built to practice particle effects and advanced class interactions in JavaScript.",
    video: <RejewelerVid />,
    placeholder: rejewelerPlaceholder,
    link: "https://rejeweler.netlify.com/"
  },
  6: {
    title: "Tetro",
    techStack: "Javascript",
    description: "Solo project. Tetris clone built in vanilla Javascript to learn more about the Canvas API.",
    video: <TetroVid />,
    placeholder: tetroPlaceholder,
    link: "http://tetro.netlify.com/"
  },
  7: {
    title: "First Person Prototype",
    techStack: "React",
    description: "Solo project. First person game environment styled completely in CSS. The result of an experiment with CSS's 3d-capabilities.",
    video: <FirstPersonVid />,
    placeholder: firstPersonPlaceholder,
    link: "https://first-person-css.netlify.com/"
  },
  8: {
    title: "5E Enounter Generator",
    techStack: "React, Redux, Node.js",
    description: "Encounter generator for Dungeons & Dragons. Created for a 48-hour hackathon by a small team. For this project, I was the sole backend developer.",
    video: <EncounterVid />,
    placeholder: encounterPlaceholder,
    link: "https://5e-encounters.netlify.com/"
  }
};

function WorkModal({ state, trigger }) {
  const [modalContent, setModalContent] = useState({
    title: "",
    techStack: "",
    description: "",
    video: "",
    link: ""
  });
  const [readyForVideo, setReadyForVideo] = useState(false);

  useEffect(() => {
    if (state !== 0) {
      setModalContent(modalData[state]);
    }
  }, [state]);

  const handleSpringRest = () => {
    if (state === 0) {
      setReadyForVideo(false);
      setModalContent(modalData[0]);
    } else {
      if (state !== 0) {
        setReadyForVideo(true);
      }
    }
  }

  const workModalSpring = useSpring({
    transform: state ? "translateX(0%)" : "translateX(-200%)",
    config: { mass: 1, tension: 100, friction: 15 },
    onRest: handleSpringRest,
    delay: state ? 200 : 0,
  });

  const turnOff = () => {
    trigger(0);
  };

  const handleModalClick = ev => {
    ev.stopPropagation();
  };

  const handleOffButton = ev => {
    ev.preventDefault();
    turnOff();
  };

  return (
    <div
      className= "modal-container"
      style={{
        pointerEvents: state ? "all" : "none",
        background: state ? "rgba(0, 0, 0, .6)" : "transparent"
      }}
      onClick={turnOff}
    >
      <animated.div
        className="work-modal"
        style={workModalSpring}
        onClick={handleModalClick}
      >
        <button className="modal-off-button" onClick={handleOffButton}>
          X
        </button>
        <div className="modal-outer-box">
          {modalContent.placeholder && <Suspense fallback={
            <div className="modal-video-box">
              <img src={modalContent.placeholder} className="video-placeholder" />
            </div>
          }>
            <div className="modal-video-box">
              {modalContent.placeholder && <img src={modalContent.placeholder} className="video-placeholder" />}
              {readyForVideo && modalContent.video}
            </div>
          </Suspense>}
          <div className="modal-inner-box">
            <h2 className="modal-title">{modalContent.title}</h2>
            <p className="modal-tech-stack">{modalContent.techStack}</p>
            <p className="modal-description">{modalContent.description}</p>
          </div>
        </div>
        {modalContent.link && <a className="modal-link" href={modalContent.link} target="_blank" rel="noopener noreferrer">VISIT</a>}
      </animated.div>
    </div>
  );
}

export default React.memo(WorkModal);
