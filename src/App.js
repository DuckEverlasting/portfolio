import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";
import WorkModal from "./components/WorkModal";
import GradientWipe from "./components/GradientWipe";

import gear from "./assets/gear.png";
import colors from "./styles/Colors.scss";

function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false),
    [isDeepLinking, setIsDeepLinking] = useState(false),
    [wipeIsMounted, setWipeIsMounted] = useState(true),
    [clearStarfield, setClearStarfield] = useState(false),
    [hasStarted, setHasStarted] = useState(false),
    [scrollPosition, setScrollPosition] = useState(0),
    [skipSections, setSkipSections] = useState([]),
    [starModalIsVisible, setStarModalIsVisible] = useState(true),
    [starSettingsAreOpen, setStarSettingsAreOpen] = useState(false),
    [modalState, setModalState] = useState(0);

  const history = useHistory(),
    location = useLocation();
  
  const triggerModal = useCallback(id => {
    if (id !== 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    setModalState(id)
  }, [])

  useEffect(() => {
    if (!appIsLoaded) {return;}
    if (scrollPosition < 20 && history.location.pathname !== "/") {
      history.replace("/")
    } else if (scrollPosition > 20 && scrollPosition < 50 && history.location.pathname !== "/about" && !skipSections.includes("about")) {
      history.replace("/about")
    } else if (scrollPosition > 50 && scrollPosition < 75 && history.location.pathname !== "/work" && !skipSections.includes("work")) {
      history.replace("/work")
    } else if (scrollPosition > 75 && history.location.pathname !== "/contact") {
      history.replace("/contact")
    }
    // eslint-disable-next-line
  }, [scrollPosition])

  const appRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    setTimeout(() => setAppIsLoaded(true), 500)
    return () => { 
      window.removeEventListener("scroll", handleScroll, true);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      if (["/about", "/work", "/contact"].includes(location.pathname)) {
        setHasStarted(true);
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
    switch (location.pathname) {
      case "/about":
        scrollButtonHandler(33, false, "auto");
        break;
      case "/work":
        scrollButtonHandler(66, false, "auto");
        break;
      case "/contact":
        scrollButtonHandler(100, false, "auto");
        break;
      default: 
        history.replace("/");
        break;
    }
    // eslint-disable-next-line
  }, [isDeepLinking]);


  const handleScroll = ev => {
    if (modalState) {
      return ev.preventDefault();
    }
    const scrollPct =
      ((window.scrollY /
        (appRef.current.getBoundingClientRect().height - window.innerHeight)) *
      100);
    setScrollPosition(scrollPct);
  };

  const scrollButtonHandler = async (target, reset=false, scrollBehavior="smooth") => {
    const scrollNum = (target / 100) * (appRef.current.getBoundingClientRect().height - window.innerHeight);
    
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

    let pauseNum = scrollPosition * 14 + 950
    await window.scrollTo({
      top: scrollNum,
      behavior: scrollBehavior
    });
    if (reset) {
      setClearStarfield(true);
      setTimeout(() => {
        setHasStarted(false);
        setClearStarfield(false);
      }, pauseNum);
    };
    setTimeout(() => setSkipSections([]), 1500);
  };

  const startButtonHandler = async ev => {
    ev.target.blur();
    if (!hasStarted) {
      await setHasStarted(true);
      setTimeout(() => scrollButtonHandler(33), 1100);
    } else {
      scrollButtonHandler(33);
    }
  };

  return (
    <div
      className="app"
      ref={appRef}
      style={{ height: hasStarted ? "7000px" : "100%"}}
    >
      {wipeIsMounted && <GradientWipe isVisible={!appIsLoaded} trigger={setWipeIsMounted} />}
      <div className="top-container">
        <Starfield
          init={appIsLoaded}
          toggle={hasStarted}
          startButtonHandler={startButtonHandler}
          clear={clearStarfield}
          starModalIsVisible={starModalIsVisible}
          setStarModalIsVisible={setStarModalIsVisible}
          starSettingsAreOpen={starSettingsAreOpen}
          setStarSettingsAreOpen={setStarSettingsAreOpen}
        />
      </div>
      {hasStarted && (
        <>
          <div className="nav-bar">
            <p className="nav-page-title" onClick={() => scrollButtonHandler(100)}>Matt{'\u00A0'}Klein</p>
            <div className="inner-nav-bar">
              <button className="nav-link" tabIndex={0} onClick={() => scrollButtonHandler(0, true)}>
                RESET
              </button>
              <button className="nav-link" tabIndex={0} style={!skipSections.includes("about") && scrollPosition < 50 ? {background: colors.brightMagenta} : null} onClick={() => scrollButtonHandler(33)}>
                ABOUT
              </button>
              <button className="nav-link" tabIndex={0} style={!skipSections.includes("work") && 50 < scrollPosition && scrollPosition < 75 ? {background: colors.brightMagenta} : null} onClick={() => scrollButtonHandler(66)}>
                WORK
              </button>
              <button className="nav-link" tabIndex={0} style={!skipSections.includes("contact") && 75 < scrollPosition ? {background: colors.brightMagenta} : null} onClick={() => scrollButtonHandler(100)}>
                CONTACT
              </button>
            </div>
          </div>
          <WorkModal state={modalState} trigger={triggerModal} />
          <div className="gradient" />
          <div className="fixed-container">
            <img className="gear top-left" src={gear} alt="" style={{transform: `rotate(${scrollPosition * 5}deg)`}}/>
            <img className="gear bottom-right" src={gear} alt="" style={{transform: `rotate(${scrollPosition * -5}deg)`}}/>
            <About scrollPosition={scrollPosition} skip={skipSections.includes("about")} isLoaded={appIsLoaded}/>
            <Work scrollPosition={scrollPosition} skip={skipSections.includes("work")} modalState={modalState} triggerModal={triggerModal} isLoaded={appIsLoaded}/>
            <Contact scrollPosition={scrollPosition} skip={skipSections.includes("contact")} isLoaded={appIsLoaded}/>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
