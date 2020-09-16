import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles/App.scss";
import ClipLoader from "react-spinners/ClipLoader";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";
import WorkModal from "./components/WorkModal";
import GradientWipe from "./components/GradientWipe";

import gear from "./assets/gear.png";
import colors from "./styles/Colors.scss";

function MobileApp() {
  const [appIsLoaded, setAppIsLoaded] = useState(false),
    [wipeIsMounted, setWipeIsMounted] = useState(true),
    [isDeepLinking, setIsDeepLinking] = useState(false),
    [topContainerIsUp, setTopContainerIsUp] = useState(false),
    [contentIsVisible, setContentIsVisible] = useState(false),
    [clearStarfield, setClearStarfield] = useState(false),
    [scrollPosition, setScrollPosition] = useState(0),
    [gearPosition, setGearPosition] = useState(0),
    [skipSections, setSkipSections] = useState([]),
    [hold, setHold] = useState(false),
    [starModalIsVisible, setStarModalIsVisible] = useState(true),
    [starSettingsAreOpen, setStarSettingsAreOpen] = useState(false),
    [modalState, setModalState] = useState(0),
    triggerModal = useCallback(id => {
      setModalState(id)
    }, [])

  const history = useHistory(),
    location = useLocation();

  const appRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setAppIsLoaded(true), 500)
  }, []);

  
  useEffect(() => {
    if (!appIsLoaded) {return;}
    if (scrollPosition < 20 && history.location.pathname !== "/") {
      history.replace("/");
    } else if (scrollPosition > 20 && scrollPosition < 50 && history.location.pathname !== "/about" && !skipSections.includes("about")) {
      history.replace("/about");
    } else if (scrollPosition > 50 && scrollPosition < 75 && history.location.pathname !== "/work" && !skipSections.includes("work")) {
      history.replace("/work");
    } else if (scrollPosition > 75 && history.location.pathname !== "/contact") {
      history.replace("/contact");
    }
    // eslint-disable-next-line
  }, [scrollPosition])
  
  useEffect(() => {
    if (location.pathname !== "/") {
      if (["/about", "/work", "/contact"].includes(location.pathname)) {
        setContentIsVisible(true);
        setTopContainerIsUp(true);
        setIsDeepLinking(true);
      } else {
        history.replace("/");
      }
    }
    // eslint-disable-next-line
  }, [])

  
  useEffect(() => {
    if (!isDeepLinking) {return;}
    setIsDeepLinking(false);
    console.log("TOP", topContainerIsUp)
    switch (location.pathname) {
      case "/about":
        scrollButtonHandler(null, 33, false, true);
        break;
      case "/work":
        scrollButtonHandler(null, 66, false, true);
        break;
      case "/contact":
        scrollButtonHandler(null, 100, false, true);
        break;
      default: 
        history.replace("/");
        break;
    }
    // eslint-disable-next-line
  }, [isDeepLinking]);


  const fakeScroll = async (target, instant) => {
    if (scrollPosition === target) return;

    const wait = ms => {
      return new Promise((res, rej) => setTimeout(res, ms))
    }
    setHold(true)
    if (!instant) {
      const halfTarget = target < scrollPosition ? scrollPosition - 15 : scrollPosition + 15
      await setScrollPosition(halfTarget)
    }
    setGearPosition(target)
    if (!instant) {
      await wait(500)
    }
    await setScrollPosition(target)
    setHold(false)
  }

  useEffect(() => console.log(scrollPosition), [scrollPosition])

  const scrollButtonHandler = async (ev, target, reset=false, instant=false) => {
    if (ev && ev.preventDefault) {ev.preventDefault()};
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

    await fakeScroll(target, instant);

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
      {wipeIsMounted && <div className={`app-spinner ${appIsLoaded ? "app-loaded" : ""}`}>
        <ClipLoader color="white" size="100px"/>
      </div>}
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
            <img className="gear top-left" src={gear} alt="" style={{transform: `rotate(${gearPosition * 5}deg)`, transition: "transform 1s"}}/>
            <img className="gear bottom-right" src={gear} alt="" style={{transform: `rotate(${gearPosition * -5}deg)`, transition: "transform 1s"}}/>
            <About scrollPosition={scrollPosition} skip={skipSections.includes("about")} isLoaded={appIsLoaded}/>
            <Work scrollPosition={scrollPosition} skip={skipSections.includes("work")} triggerModal={triggerModal} isLoaded={appIsLoaded}/>
            <Contact scrollPosition={scrollPosition} skip={skipSections.includes("contact")} isLoaded={appIsLoaded}/>
          </div>
        </>
      )}
    </div>
  );
}

export default MobileApp;
