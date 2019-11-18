import React, { useState, useEffect, useRef } from "react";
import "./styles/App.scss";
import Starfield from "./views/Starfield";
import programScroll from "./utils/programScroll";

import { useSpring, animated } from "react-spring";

const scrollData = {
  title: [
    { scrollNum: 18, deltaY: -55, opacity: 0 },
    { scrollNum: 25, deltaY: 0, opacity: 1 },
    { scrollNum: 30, deltaY: 0, opacity: 1 },
    { scrollNum: 32, deltaY: 55, opacity: 0 }
  ]
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const appRef = useRef(null);

  const aboutTitle = useSpring({
    transform: 19 < scrollPosition && scrollPosition < 33 ? "translate(20%, 0)" : "translate(-20%, 0)",
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const handleScroll = () => {
    const scrollPct =
      (window.scrollY /
        (appRef.current.getBoundingClientRect().height - window.innerHeight)) *
      100;
    setScrollPosition(scrollPct);
  };

  const scrollButtonHandler = (ev, target) => {
    ev.preventDefault();
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };

  const startButtonHandler = async ev => {
    await setHasStarted(true);
    scrollButtonHandler(ev, 2500);
  };

  return (
    <div
      className="app"
      ref={appRef}
      style={{ height: hasStarted ? "10000px" : "100%" }}
    >
      <div className="nav-bar">
        <p className="nav-link" onClick={ev => scrollButtonHandler(ev, 0)}>
          RESET
        </p>
        <p className="nav-link" onClick={ev => scrollButtonHandler(ev, 2500)}>
          ABOUT
        </p>
        <p className="nav-link" onClick={ev => scrollButtonHandler(ev, 5000)}>
          WORK
        </p>
        <p className="nav-link" onClick={ev => scrollButtonHandler(ev, 9000)}>
          CONTACT
        </p>
      </div>
      <div className="top-container">
        <Starfield startButtonHandler={startButtonHandler} />
      </div>
      {hasStarted && (
        <>
          <div className="gradient" />
          <div className="fixed-container">
            <div className="about-page">
              <h1
                className="title"
                style={programScroll(scrollData.title, scrollPosition)}
              >
                About
              </h1>
              <animated.p style={aboutTitle}>
                HEY THERE
              </animated.p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
