import React, {useState, useRef} from "react";
import "./App.css";
import Starfield from "./Starfield";
import styled from "styled-components";

import Zoom from 'react-reveal/Zoom'

const AppSC = styled.div`
  height: 100%;
  overflow: ${props => props.scroll ? "auto" : "hidden"};
`;

const ContainerSC = styled.div`
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #333333;
`;

const NavBarSC = styled.div`
  position: fixed;
  height: 50px;
  width: 100%;
  background: #004400;
  z-index: 5;
`;

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const scrollTarget = useRef(null);

  const startButtonHandler = async ev => {
    ev.preventDefault();
    await setHasStarted(true)
    window.scrollTo({
      top: scrollTarget.current.offsetTop,
      behavior: "smooth"
    })
  }

  return (
    <AppSC scroll={hasStarted}>
      <NavBarSC></NavBarSC>
      <ContainerSC>
        <Starfield startButtonHandler = {startButtonHandler}/>
      </ContainerSC>
      {
        hasStarted &&
        <>
          <ContainerSC ref={scrollTarget}>
            <Zoom>
              <p>wassup</p>
              <p>wassup</p>
              <p>wassup</p>
              <p>wassup</p>
              <p>wassup</p>
              <p>wassup</p>
            </Zoom>
          </ContainerSC>
          <ContainerSC>
            <p>wassup</p>
          </ContainerSC>
          <ContainerSC>
            <p>wassup</p>
          </ContainerSC>
        </>
      }
    </AppSC>
  );
}

export default App;
