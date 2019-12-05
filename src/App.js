import React, { useState, useEffect, useRef } from "react";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import About from "./views/About";
import Work from "./views/Work";
import Contact from "./views/Contact";

import gear from "./assets/gear.png";

const scrollData = {
  title: [
    { scrollNum: 10, deltaY: -55, opacity: 0 },
    { scrollNum: 16, deltaY: 0, opacity: 1 },
    { scrollNum: 21, deltaY: 0, opacity: 1 },
    { scrollNum: 23, deltaY: 55, opacity: 0 }
  ]
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [reload, setReload] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [skipSections, setSkipSections] = useState([])
  const appRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const handleScroll = () => {
    const scrollPct =
      ((window.scrollY /
        (appRef.current.getBoundingClientRect().height - window.innerHeight)) *
      100);
    setScrollPosition(scrollPct);
  };

  const scrollButtonHandler = async (ev, target, reset=false) => {
    ev.preventDefault();
    if (ev.target) {
      ev.target.blur()
    };
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
      setReload(true)
      setTimeout(() => setHasStarted(false), pauseNum);
    };
    setTimeout(() => setSkipSections([]), 1500);
  };

  const startButtonHandler = async ev => {
    if (!hasStarted) {
      setReload(false)
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
      style={{ height: hasStarted ? "7000px" : "100%", overflow: hasStarted ? "auto" : "hidden"}}
    >
      <div className="nav-bar">
        <p className="page-title">Matt Klein {Math.floor(scrollPosition)}</p>
        <div className="inner-nav-bar">
          <p className="nav-link" tabIndex={1} onClick={ev => scrollButtonHandler(ev, 0, true)}>
            RESET
          </p>
          <p className="nav-link" tabIndex={2} onClick={ev => scrollButtonHandler(ev, 33)}>
            ABOUT
          </p>
          <p className="nav-link" tabIndex={3} onClick={ev => scrollButtonHandler(ev, 66)}>
            WORK
          </p>
          <p className="nav-link" tabIndex={4} onClick={ev => scrollButtonHandler(ev, 100)}>
            CONTACT
          </p>
        </div>
      </div>
      <div className="top-container">
        {
          (!hasStarted || scrollPosition < 14 || reload) &&
          <Starfield toggle={hasStarted} startButtonHandler={startButtonHandler} />
        }
      </div>
      {hasStarted && (
        <>
          <div className="gradient" />
          <div className="fixed-container">
            <img className="gear" src={gear} alt="" style={{transform: `rotate(${scrollPosition * 5}deg)`}}/>
            {!skipSections.includes("about") && <About scrollPosition={scrollPosition}/>}
            {!skipSections.includes("work") && <Work scrollPosition={scrollPosition}/>}
            {!skipSections.includes("contact") && <Contact scrollPosition={scrollPosition}/>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
