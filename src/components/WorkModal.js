import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import keyConsVid from "../assets/Videos/Key-Cons-sample.mp4";
import gazorkazorkVid from "../assets/Videos/Gazorkazork-sample.mp4"
import snapShotVid from "../assets/Videos/SnapShot-sample.mp4";
import hexsweeperVid from "../assets/Videos/Hexsweeper-sample.mp4";
import rejewelerVid from "../assets/Videos/Rejeweler-sample.mp4";
import tetroVid from "../assets/Videos/Tetro-sample.mp4";
import firstPersonVid from "../assets/Videos/First-Person-sample.mp4";
import encounterVid from "../assets/Videos/5E-Encounter-sample.mp4";

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
    video: keyConsVid,
    link: "https://www.keyconservation.org/"
  },
  2: {
    title: "Gazorkazork",
    techStack: "React, Django",
    description: <p>Online MUD (Multi-User Dungeon) prototype built by a small team in one week. My work on the project included a <a href="https://github.com/Gazorkazork/django_be/blob/master/util/room_layout.py" target="_blank" rel="noopener noreferrer">room generation algorithm</a> and a <a href="https://github.com/Gazorkazork/frontend/blob/master/src/utils/textParser.js" target="_blank" rel="noopener noreferrer">language parser</a>.</p>,
    video: gazorkazorkVid,
    link: "https://gazorkazork.netlify.com/"
  },
  3: {
    title: "SnapShot",
    techStack: "React, Redux",
    description: "Solo project. Online layer-based image editor and drawing tool. Originally built to test interactions between React, Redux, and the Canvas API.",
    video: snapShotVid,
    link: "https://snapshotie.netlify.com/"
  },
  4: {
    title: "Hexsweeper",
    techStack: "React",
    description: "Solo project. Minesweeper clone built to test limitations of React, to learn more about React's memoization features, and to become more familiar with working in a hexagonal grid.",
    video: hexsweeperVid,
    link: "http://hexsweeper.netlify.com/"
  },
  5: {
    title: "Rejeweler",
    techStack: "Javascript",
    description: "Solo project. Bejewled clone built to practice particle effects and advanced class interactions in JavaScript.",
    video: rejewelerVid,
    link: "https://rejeweler.netlify.com/"
  },
  6: {
    title: "Tetro",
    techStack: "Javascript",
    description: "Solo project. Tetris clone built in vanilla Javascript to learn more about the Canvas API.",
    video: tetroVid,
    link: "http://tetro.netlify.com/"
  },
  7: {
    title: "First Person Prototype",
    techStack: "React",
    description: "Solo project. First person game environment styled completely in CSS. The result of an experiment with CSS's 3d-capabilities.",
    video: firstPersonVid,
    link: "https://first-person-css.netlify.com/"
  },
  8: {
    title: "5E Enounter Generator",
    techStack: "React, Redux, Node.js",
    description: "Encounter generator for Dungeons & Dragons. Created for a 48-hour hackathon by a small team. For this project, I was the sole backend developer.",
    video: encounterVid,
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

  useEffect(() => {
    if (state !== 0) {
      setModalContent(modalData[state]);
    }
  }, [state]);

  const handleSpringRest = () => {
    if (state === 0) {
      setModalContent(modalData[0]);
    }
  }

  const workModalSpring = useSpring({
    transform: state ? "translateX(0%)" : "translateX(-200%)",
    config: { mass: 1, tension: 100, friction: 15 },
    onRest: handleSpringRest,
    delay: state ? 300 : 0,
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
          <video
            className="modal-video"
            alt={modalContent.title}
            autoPlay={true}
            muted={true}
            loop={true}
            src={modalContent.video}
          />
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
