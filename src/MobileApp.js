import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";
import WorkModal from "./components/WorkModal";

import gear from "./assets/gear.png";

function MobileApp() {
  const [topContainerIsUp, setTopContainerIsUp] = useState(false);
  const [contentIsVisible, setContentIsVisible] = useState(false);
  const [clearStarfield, setClearStarfield] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [gearPosition, setGearPosition] = useState(0);
  const [skipSections, setSkipSections] = useState([])
  const [hold, setHold] = useState(false)
  const [starModalIsVisible, setStarModalIsVisible] = useState(false)
  const [modalState, setModalState] = useState(0)
  const triggerModal = useCallback(id => {
    setModalState(id)
  }, [])

  const appRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setStarModalIsVisible(true), 1500)
  }, [])

  const fakeScroll = async target => {
    if (scrollPosition === target) return;

    const wait = ms => {
      return new Promise((res, rej) => setTimeout(res, ms))
    }
    const halfTarget = target < scrollPosition ? scrollPosition - 15 : scrollPosition + 15
    setHold(true)
    await setScrollPosition(halfTarget)
    setGearPosition(target)
    await wait(500)
    await setScrollPosition(target)
    setHold(false)
  }

  const scrollButtonHandler = async (ev, target, reset=false) => {
    ev.preventDefault();
    if (hold) {
      return
    }
    
    // check for sections to skip
    let toSkip = []
    if (target === 0) {
      if (scrollPosition >= 38) toSkip.push("about")
      if (scrollPosition >= 68) toSkip.push("work")

    } else if (target === 33) {
      if (scrollPosition >= 68) toSkip.push("work")

    } else if (target === 66) {
      if (scrollPosition <= 22) toSkip.push("about")

    } else if (target === 100) {
      if (scrollPosition <= 22) toSkip.push("about")
      if (scrollPosition <= 62) toSkip.push("work")
    }
    await setSkipSections(toSkip)

    await fakeScroll(target);

    if (reset) {
      setTopContainerIsUp(false);
      setClearStarfield(true);
      setTimeout(() => {
        if (topContainerIsUp) {
          setClearStarfield(false);
          setContentIsVisible(false);
        }
      }, 1000)
    }

    setTimeout(() => setSkipSections([]), 1500);
  };

  const startButtonHandler = ev => {
    setContentIsVisible(true);
    setTimeout(() => {
      setTopContainerIsUp(true);
      scrollButtonHandler(ev, 33);
    }, 1000)
  };

  return (
    <div
      className="app"
      ref={appRef}
      style={{ height: "100%"}}
    >
      <div className="nav-bar">
        <p className="page-title">Matt{'\u00A0'}Klein</p>
        <div className="inner-nav-bar">
          <button className="nav-link mobile" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 0, true)}>
            RESET
          </button>
          <button className="nav-link mobile" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 33)}>
            ABOUT
          </button>
          <button className="nav-link mobile" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 66)}>
            WORK
          </button>
          <button className="nav-link mobile" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 100)}>
            CONTACT
          </button>
        </div>
      </div>
      <div 
        className={`top-container ${topContainerIsUp && "up"}`}
        style={{height: "100%"}}
      >
        <Starfield
          toggle={contentIsVisible}
          startButtonHandler={startButtonHandler}
          clear={clearStarfield}
          starModalIsVisible={starModalIsVisible}
          setStarModalIsVisible={setStarModalIsVisible}
        />
      </div>
      {contentIsVisible && (
        <>
          <WorkModal state={modalState} trigger={triggerModal} />
          <div className="fixed-container">
            <img className="gear" src={gear} alt="" style={{transform: `rotate(${gearPosition * 5}deg)`, transition: "transform 1s"}}/>
            {!skipSections.includes("about") && <About scrollPosition={scrollPosition}/>}
            {!skipSections.includes("work") && <Work scrollPosition={scrollPosition} triggerModal={triggerModal}/>}
            {!skipSections.includes("contact") && <Contact scrollPosition={scrollPosition}/>}
          </div>
        </>
      )}
    </div>
  );
}

export default MobileApp;
