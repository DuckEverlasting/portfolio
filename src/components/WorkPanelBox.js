import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

import WorkPanel from "../components/WorkPanel.js";

import keyConsStill from "../assets/Stills/Key-Cons-still.png";
import gazorkazorkStill from "../assets/Stills/Gazorkazork-still.png";
import snapShotStill from "../assets/Stills/SnapShot-still.png";
import hexsweeperStill from "../assets/Stills/Hexsweeper-still.png";
import rejewelerStill from "../assets/Stills/Rejeweler-still.png";
import tetroStill from "../assets/Stills/Tetro-still.png";
import firstPersonStill from "../assets/Stills/First-Person-still.png";
import encounterStill from "../assets/Stills/5E-Encounter-still.png";

import keyConsPlaceholder from "../assets/Videos/Key-Cons-sample-small.png";
import gazorkazorkPlaceholder from "../assets/Videos/Gazorkazork-sample-small.png"
import snapShotPlaceholder from "../assets/Videos/SnapShot-sample-small.png";
import hexsweeperPlaceholder from "../assets/Videos/Hexsweeper-sample-small.png";
import rejewelerPlaceholder from "../assets/Videos/Rejeweler-sample-small.png";
import tetroPlaceholder from "../assets/Videos/Tetro-sample-small.png";
import firstPersonPlaceholder from "../assets/Videos/First-Person-sample-small.png";
import encounterPlaceholder from "../assets/Videos/5E-Encounter-sample-small.png";

function WorkPanelBox({ isOn, triggerModal, modalState, isLoaded }) {
  useEffect(() => {
    isOn ? 
    setWorkPanelBoxSpring(() => ({
      transform: "rotateX(0)",
      config: { mass: 1, tension: 40, friction: 2 },
      delay: isLoaded ? 1000 : 0,
    }))
    :
    setWorkPanelBoxSpring(() => ({
      transform: "rotateX(-0.25turn)",
      config: { mass: 1, tension: 480, friction: 38 },
      delay: 0
    }))
    // eslint-disable-next-line
  }, [isOn])

  const [workPanelBoxSpring, setWorkPanelBoxSpring] = useSpring(() => ({
    transform: "rotateX(-0.25turn)",
    config: { mass: 1, tension: 480, friction: 38 },
    delay: 0
  }));


  const content = [
    {
      id: 1,
      name: "Key Conservation",
      slug: "Conservation outreach app",
      video: "KeyConsVid",
      placeholder: keyConsPlaceholder,
      static: keyConsStill,
    },
    {
      id: 2,
      name: "Gazorkazork",
      slug: "Online multiuser dungeon",
      video: "GazorkazorkVid",
      placeholder: gazorkazorkPlaceholder,
      static: gazorkazorkStill,
    },
    {
      id: 3,
      name: "SnapShot",
      slug: "Raster graphics editor",
      video: "SnapShotVid",
      placeholder: snapShotPlaceholder,
      static: snapShotStill,
      style: {
        width: "125%",
        marginLeft: "-12%",
        marginTop: "-7%"
      },
      start: 4,
    },
    {
      id: 4,
      name: "Hexsweeper",
      slug: "Customizable puzzle game",
      video: "HexsweeperVid",
      placeholder: hexsweeperPlaceholder,
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
      video: "RejewelerVid",
      placeholder: rejewelerPlaceholder,
      static: rejewelerStill,
      style: {},
    },
    {
      id: 6,
      name: "Tetro",
      slug: "Falling tile game",
      video: "TetroVid",
      placeholder: tetroPlaceholder,
      static: tetroStill,
      style: {},
    },
    {
      id: 7,
      name: "First Person Prototype",
      slug: "POC game environment",
      video: "FirstPersonVid",
      placeholder: firstPersonPlaceholder,
      static: firstPersonStill,
      style: {},
      start: 2,
    },
    {
      id: 8,
      name: "5e Encounter Generator",
      slug: "Online D&D tool",
      video: "EncounterVid",
      placeholder: encounterPlaceholder,
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
                isLoaded={isLoaded}
              />
            ))}
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default WorkPanelBox;
