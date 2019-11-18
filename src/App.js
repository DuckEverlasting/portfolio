import React, {useState, useEffect, useRef} from "react";
import "./styles/App.scss";
import Starfield from "./Starfield";

const scrollData = {
  title: [
    {scrollNum: 18, deltaY: -55, opacity: 0},
    {scrollNum: 25, deltaY: 0, opacity: 1},
    {scrollNum: 30, deltaY: 0, opacity: 1},
    {scrollNum: 32, deltaY: 55, opacity: 0}
  ]
}

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const appRef = useRef(null);
  const scrollTarget = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {window.removeEventListener('scroll')}
  }, [])

  const handleScroll = () => {
    const scrollPct = window.scrollY / (appRef.current.getBoundingClientRect().height - window.innerHeight) * 100
    console.log("scrollPct", scrollPct)
    setScrollPosition(scrollPct)
  }

  const programScroll = keyframes => {
    // Keyframe = {scrollPct, deltaX, deltaY (default 0), scale (default 1), opacity (default 1), rotate (default 0)}
    keyframes.sort((a, b) => a.ScrollNum - b.ScrollNum)
    let current = 0;
    let scrollNum, deltaX, deltaY, scale, opacity, rotate;

    const output = () => ({
      transform: `translate(${deltaX}%, ${deltaY}%) scale(${scale}) rotate(${rotate})`,
      opacity: opacity
    })

    while (current < keyframes.length) {
      ({scrollNum, deltaX = 0, deltaY = 0, scale = 1, opacity = 1, rotate = 0} = keyframes[current])

      if (scrollPosition === scrollNum) {
        console.log(output())
        return output();
      } else if (scrollPosition > scrollNum) {
        current ++
      } else if (scrollPosition < scrollNum) {
        console.log("CURRENT", current)
        console.log("CURRENT", scrollNum, deltaX, deltaY, scale)
        if (current > 0) {
          let {
            scrollNum: prevScrollNum, 
            deltaX: prevDeltaX = 0,
            deltaY: prevDeltaY = 0,
            scale: prevScale = 1,
            opacity: prevOpacity = 1,
            rotate: prevRotate = 0
          } = keyframes[current - 1]

          console.log("PREVIOUS", keyframes[current - 1])
          console.log("PREVIOUS", prevScrollNum, prevDeltaX, prevDeltaY, prevScale, prevOpacity, prevRotate)
          let ratio = (scrollPosition - prevScrollNum) / (scrollNum - prevScrollNum)
          
          deltaX = prevDeltaX + ((deltaX - prevDeltaX) * ratio)
          deltaY = prevDeltaY + ((deltaY - prevDeltaY) * ratio)
          scale = prevScale + ((scale - prevScale) * ratio)
          opacity = prevOpacity + ((opacity - prevOpacity) * ratio)
          rotate = prevRotate + ((rotate - prevRotate) * ratio)

          console.log((output()))
          return output();
        } else {
          console.log("PREVIOUS", "(none)")
          console.log((output()))
          return output();
        }
      }
    }
    console.log((output()))
    return output();
  }

  const scrollButtonHandler = (ev, target) => {
    ev.preventDefault();
    window.scrollTo({
      top: target,
      behavior: "smooth"
    })
  }

  const startButtonHandler = async ev => {
    await setHasStarted(true)
    scrollButtonHandler(ev, 2500)
  }

  return (
    <div className={"app"} ref={appRef} scroll={hasStarted}>
    {/* overflow: props.scroll ? "auto" : "hidden" */}
      <div className={"nav-bar"}>
        <p className={"nav-link"} onClick={ev => scrollButtonHandler(ev, 0)}>RESET</p>
        <p className={"nav-link"} onClick={ev => scrollButtonHandler(ev, 2500)}>ABOUT</p>
        <p className={"nav-link"} onClick={ev => scrollButtonHandler(ev, 5000)}>WORK</p>
        <p className={"nav-link"} onClick={ev => scrollButtonHandler(ev, 9000)}>CONTACT</p>
      </div>
      <div className={"top-container"}>
        <Starfield startButtonHandler = {startButtonHandler}/>
      </div>
      {
        hasStarted &&
        <>
          <div className={"gradient"} />
          <div className={"scroll-box"} ref={scrollTarget}>
            <div className={"fixed-container"}>
              <div className={"about-page"}>
                <h1 className={"title"} style={programScroll(scrollData.title)}>About</h1>
                {/* transform: ${props => props.transform}; */}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
