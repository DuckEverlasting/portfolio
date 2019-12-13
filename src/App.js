import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";
import WorkModal from "./components/WorkModal";

import gear from "./assets/gear.png";

function App() {
  const [clearStarfield, setClearStarfield] = useState(false)
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [skipSections, setSkipSections] = useState([])
  
  const [modalState, setModalState] = useState(0)
  const triggerModal = useCallback(id => {
    if (id !== 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    setModalState(id)
  }, [])

  const appRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => { 
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

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

  const scrollButtonHandler = async (ev, target, reset=false) => {
    ev.preventDefault();
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
      behavior: "smooth"
    });
    if (reset) {
      setClearStarfield(true);
      setTimeout(() => {
        setHasStarted(false)
        setClearStarfield(false);
      }, pauseNum);
    };
    setTimeout(() => setSkipSections([]), 1500);
  };

  const startButtonHandler = async ev => {
    if (!hasStarted) {
      await setHasStarted(true);
      setTimeout(() => scrollButtonHandler(ev, 33), 1100);
    } else {
      scrollButtonHandler(ev, 33)
    }
  };

  return (
    <div
      className="app"
      ref={appRef}
      style={{ height: hasStarted ? "7000px" : "100%"}}
    >
      <div className="nav-bar">
        <p className="page-title">Matt Klein</p>
        <div className="inner-nav-bar">
          <button className="nav-link" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 0, true)}>
            RESET
          </button>
          <button className="nav-link" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 33)}>
            ABOUT
          </button>
          <button className="nav-link" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 66)}>
            WORK
          </button>
          <button className="nav-link" tabIndex={0} onClick={ev => scrollButtonHandler(ev, 100)}>
            CONTACT
          </button>
        </div>
      </div>
      <div className="top-container">
          <Starfield toggle={hasStarted} startButtonHandler={startButtonHandler} clear={clearStarfield}/>
      </div>
      {hasStarted && (
        <>
          <WorkModal state={modalState} trigger={triggerModal} />
          <div className="gradient" />
          <div className="fixed-container">
            <img className="gear" src={gear} alt="" style={{transform: `rotate(${scrollPosition * 5}deg)`}}/>
            {!skipSections.includes("about") && <About scrollPosition={scrollPosition}/>}
            {!skipSections.includes("work") && <Work scrollPosition={scrollPosition} modalState={modalState} triggerModal={triggerModal}/>}
            {!skipSections.includes("contact") && <Contact scrollPosition={scrollPosition}/>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
