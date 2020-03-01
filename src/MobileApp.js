import React, { useState, useRef, useEffect, useCallback } from "react";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";
import WorkModal from "./components/WorkModal";
import GradientWipe from "./components/GradientWipe";

import gear from "./assets/gear.png";
import colors from "./styles/Colors.scss";

function MobileApp() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)
  const [wipeIsMounted, setWipeIsMounted] = useState(true)
  const [topContainerIsUp, setTopContainerIsUp] = useState(false);
  const [contentIsVisible, setContentIsVisible] = useState(false);
  const [clearStarfield, setClearStarfield] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [gearPosition, setGearPosition] = useState(0);
  const [skipSections, setSkipSections] = useState([])
  const [hold, setHold] = useState(false)
  const [starModalIsVisible, setStarModalIsVisible] = useState(true)
  const [starSettingsAreOpen, setStarSettingsAreOpen] = useState(false);
  const [modalState, setModalState] = useState(0)
  const triggerModal = useCallback(id => {
    setModalState(id)
  }, [])

  const appRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setAppIsLoaded(true), 500)
  }, []);

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
      style={{ height: "100%", width: "100%", position: "fixed"}}
    >
      {wipeIsMounted && <GradientWipe isVisible={!appIsLoaded} trigger={setWipeIsMounted} />}
      <div 
        className={`top-container ${topContainerIsUp && "up"}`}
        style={{height: "100%"}}
      >
        <Starfield
          init={appIsLoaded}
          toggle={contentIsVisible}
          startButtonHandler={startButtonHandler}
          clear={clearStarfield}
          starModalIsVisible={starModalIsVisible}
          setStarModalIsVisible={setStarModalIsVisible}
          starSettingsAreOpen={starSettingsAreOpen}
          setStarSettingsAreOpen={setStarSettingsAreOpen}
        />
      </div>
      {contentIsVisible && (
        <>
          <div className="nav-bar">
          <p className="nav-page-title">Matt{'\u00A0'}Klein</p>
            <div className="inner-nav-bar">
              <button className="nav-link mobile" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 0, true)}>
                RESET
              </button>
              <button className="nav-link mobile" tabIndex={0} style={!skipSections.includes("about") && scrollPosition < 35 ? {background: colors.brightMagenta} : null} onClick={ev => scrollButtonHandler(ev, 39)}>
                ABOUT
              </button>
              <button className="nav-link mobile" tabIndex={0} style={!skipSections.includes("work") && 63 < scrollPosition && scrollPosition < 69 ? {background: colors.brightMagenta} : null} onClick={ev => scrollButtonHandler(ev, 60)}>
                WORK
              </button>
              <button className="nav-link mobile" tabIndex={0} style={!skipSections.includes("contact") && 95 < scrollPosition ? {background: colors.brightMagenta} : null} onClick={ev => scrollButtonHandler(ev, 88)}>
                CONTACT
              </button>
            </div>
          </div>
          <WorkModal state={modalState} trigger={triggerModal} />
          <div className="fixed-container">
            <img className="gear" src={gear} alt="" style={{transform: `rotate(${gearPosition * 5}deg)`, transition: "transform 1s"}}/>
            <About scrollPosition={scrollPosition} skip={skipSections.includes("about")}/>
            <Work scrollPosition={scrollPosition} skip={skipSections.includes("work")} triggerModal={triggerModal}/>
            <Contact scrollPosition={scrollPosition} skip={skipSections.includes("contact")}/>
          </div>
        </>
      )}
    </div>
  );
}

export default MobileApp;
