import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const modalData = {
  1: {
    title: "Key Conservation",
    techStack: "React Native, Redux, Node.js, Auth0",
    description: "Social media app built to connect conservationists with potential supporters. Built by rotating teams of developers as part of a program called Lambda Labs. I was part of the original team for this project, and constructed much of the skeleton of both the frontend and the backend.",
    image: "",
    link: "https://www.keyconservation.org/"
  },
  2: {
    title: "Gazorkazork",
    techStack: "React, Django",
    description: <p>Online MUD (Multi-User Dungeon) prototype built by a small team in one week. My work on the project included a <a href="https://github.com/Gazorkazork/django_be/blob/master/util/room_layout.py">room generation algorithm</a> and a <a href="https://github.com/Gazorkazork/frontend/blob/master/src/utils/textParser.js">language parser</a>.</p>,
    image: "",
    link: "https://gazorkazork.netlify.com/"
  },
  3: {
    title: "Photosmith",
    techStack: "React, Redux",
    description: "Solo project. Online drawing tool built to test interactions between React, Redux, and the Canvas API.",
    image: "",
    link: "https://photosmith.netlify.com/"
  },
  4: {
    title: "Hexsweeper",
    techStack: "React",
    description: "Solo project. Minesweeper clone built to test limitations of React, to learn more about React's memoization features, and to become more familiar with working in a hexagonal grid.",
    image: "",
    link: "http://hexsweeper.netlify.com/"
  },
  5: {
    title: "Rejeweler",
    techStack: "Canvas Api, Javascript",
    description: "Solo project. Bejewled clone built to practice particle effects",
    image: "",
    link: "https://rejeweler.netlify.com/"
  },
  6: {
    title: "Tetro",
    techStack: "Canvas API, Javascript",
    description: "Solo project. Tetris clone built in vanilla Javascript to learn more about the Canvas API.",
    image: "",
    link: "http://tetro.netlify.com/"
  },
  7: {
    title: "First Person Prototype",
    techStack: "React",
    description: "Solo project. First person game environment styled completely in CSS. The result of an experiment with CSS's 3d-capabilities.",
    image: "",
    link: "https://first-person-css.netlify.com/"
  },
  8: {
    title: "5E Enounter Generator",
    techStack: "React, Redux, Node.js",
    description: "Encounter generator for Dungeons & Dragons. Created for a 48-hour hackathon by a small team. For this project, I was the sole backend developer.",
    image: "",
    link: "https://5e-encounters.netlify.com/"
  }
};

function WorkModal({ state, trigger, mobile }) {
  const [modalContent, setModalContent] = useState({
    title: "",
    techStack: "",
    description: "",
    image: "",
    link: ""
  });

  useEffect(() => {
    if (state !== 0) {
      setModalContent(modalData[state]);
    }
  }, [state]);

  const workModalSpring = useSpring({
    transform: state ? "translateX(0%)" : "translateX(-150%)",
    config: { mass: 1, tension: 100, friction: 15 }
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
      className= {mobile ? "modal-container chrome-fix" : "modal-container"}
      style={{
        pointerEvents: state ? "all" : "none",
        background: state ? "rgba(0, 0, 0, .3)" : "transparent"
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
          <img className="modal-image" src="" alt=""/>
          <div className="modal-inner-box">
            <h2 className="modal-title">{modalContent.title}</h2>
            <p className="modal-description">{modalContent.description}</p>
          </div>
        </div>
        {modalContent.link && <a className="modal-link" href={modalContent.link} target="_blank" rel="noopener noreferrer">VISIT</a>}
      </animated.div>
    </div>
  );
}

export default React.memo(WorkModal);
