import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import Starfield from "./Starfield";
import styled from "styled-components";

const AppSC = styled.div`
  height: 100%;
  overflow: ${props => props.scroll ? "auto" : "hidden"};
  background: #333333;
  scroll-behavior: smooth;
`;

const TopContainerSC = styled.div`
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const ScrollBox = styled.div`
  position: relative;
  height: 1000vh;
  margin: 0;
  padding: 0;
`;

const FixedContainerSC = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const NavBarSC = styled.div`
  display: flex;
  position: fixed;
  padding: 0 20% 0 20%;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 60%;
  background: #000000;
  z-index: 5;
`;

const NavLinkSC = styled.p`
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 20px;

  :hover {
    cursor: pointer;
  }
`

const GradientSC = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 10%, rgba(255,255,255,0) 90%);
  z-index: 10;
`

const AboutPageSC = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: 60px 0 0;
  flex-direction: column;
`

const TitleSC = styled.h1`
  margin: 0;
  padding: 10vh 0 0;
  text-align: center;
  font-family: 'Exo 2', sans-serif;
  font-size: 4rem;
  transform: ${props => props.transform};
`


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

    const output = () => (
      `translate(${deltaX}%, ${deltaY}%) scale(${scale}) rotate(${rotate});
      opacity: ${opacity};`
    )

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
    <AppSC ref={appRef} scroll={hasStarted}>
      <NavBarSC>
        <NavLinkSC onClick={ev => scrollButtonHandler(ev, 0)}>RESET</NavLinkSC>
        <NavLinkSC onClick={ev => scrollButtonHandler(ev, 2500)}>ABOUT</NavLinkSC>
        <NavLinkSC onClick={ev => scrollButtonHandler(ev, 5000)}>WORK</NavLinkSC>
        <NavLinkSC onClick={ev => scrollButtonHandler(ev, 9000)}>CONTACT</NavLinkSC>
      </NavBarSC>
      <TopContainerSC>
        <Starfield startButtonHandler = {startButtonHandler}/>
      </TopContainerSC>
      {
        hasStarted &&
        <>
          <GradientSC />
          <ScrollBox ref={scrollTarget}>
            <FixedContainerSC>
              <AboutPageSC>
                <TitleSC transform={programScroll([{scrollNum: 18, deltaY: -55, opacity: 0}, {scrollNum: 25, deltaY: 0, opacity: 1}, {scrollNum: 30, deltaY: 0, opacity: 1}, {scrollNum: 32, deltaY: 55, opacity: 0}])}>About</TitleSC>
              </AboutPageSC>
            </FixedContainerSC>
          </ScrollBox>
        </>
      }
    </AppSC>
  );
}

export default App;
