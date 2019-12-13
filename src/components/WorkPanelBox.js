import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

import keyConsStill from "../assets/Stills/Key-Cons-still.png";
import gazorkazorkStill from "../assets/Stills/Gazorkazork-still.png";
import photosmithStill from "../assets/Stills/Photosmith-still.png";
import hexsweeperStill from "../assets/Stills/Hexsweeper-still.png";
import rejewelerStill from "../assets/Stills/Rejeweler-still.png";
import tetroStill from "../assets/Stills/Tetro-still.png";
import firstPersonStill from "../assets/Stills/First-Person-still.png";
import encounterStill from "../assets/Stills/5E-Encounter-still.png";

import keyConsVid from "../assets/Videos/Key-Cons-sample.mp4";
import gazorkazorkVid from "../assets/Videos/Gazorkazork-sample.mp4"
import photosmithVid from "../assets/Videos/Photosmith-sample.mp4";
import hexsweeperVid from "../assets/Videos/Hexsweeper-sample.mp4";
import rejewelerVid from "../assets/Videos/Rejeweler-sample.mp4";
import tetroVid from "../assets/Videos/Tetro-sample.mp4";
import firstPersonVid from "../assets/Videos/First-Person-sample.mp4";
import encounterVid from "../assets/Videos/5E-Encounter-sample.mp4";

function WorkPanelBox({ isOn, triggerModal, modalState }) {
  const workPanelBoxSpring = useSpring({
    transform: isOn ? "rotateX(0)" : "rotateX(-0.25turn)",
    config: isOn
      ? { mass: 1, tension: 40, friction: 2 }
      : { mass: 1, tension: 480, friction: 38 },
    delay: isOn ? 1000 : 0
  });


  const content = [
    {
      id: 1,
      name: "Key Conservation",
      slug: "Conservation outreach app",
      ref: useRef(null),
      video: keyConsVid,
      static: keyConsStill,
    },
    {
      id: 2,
      name: "Gazorkazork",
      slug: "Online multiuser dungeon",
      ref: useRef(null),
      video: gazorkazorkVid,
      static: gazorkazorkStill,
    },
    {
      id: 3,
      name: "Photosmith",
      slug: "Raster graphics editor",
      ref: useRef(null),
      video: photosmithVid,
      static: photosmithStill,
      style: {
        width: "120%",
        marginLeft: "-10%",
        marginTop: "-6%"
      },
      start: 4,
    },
    {
      id: 4,
      name: "Hexsweeper",
      slug: "Customizable puzzle game",
      ref: useRef(null),
      video: hexsweeperVid,
      static: hexsweeperStill,
      style: {
        width: "170%",
        marginLeft: "-37%",
        marginTop: "-28%"
      },
    },
    {
      id: 5,
      name: "Rejeweler",
      slug: "Tile matching game",
      ref: useRef(null),
      video: rejewelerVid,
      static: rejewelerStill,
      style: {},
    },
    {
      id: 6,
      name: "Tetro",
      slug: "Falling tile game",
      ref: useRef(null),
      video: tetroVid,
      static: tetroStill,
      style: {},
    },
    {
      id: 7,
      name: "First Person Prototype",
      slug: "POC game environment",
      ref: useRef(null),
      video: firstPersonVid,
      static: firstPersonStill,
      style: {},
      start: 2,
    },
    {
      id: 8,
      name: "5e Encounter Generator",
      slug: "Online D&D tool",
      ref: useRef(null),
      video: encounterVid,
      static: encounterStill,
      style: {},
    }
  ];

  return (
    <>
      <div className="perspective-box">
        <div className="adjustment-box">
          <animated.div className="panel-box" style={workPanelBoxSpring}>
            {content.map(item => (
              <WorkPanel
                key={item.id}
                isOn={isOn}
                content={item}
                triggerModal={triggerModal}
                modalState={modalState}
              />
            ))}
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default React.memo(WorkPanelBox);
