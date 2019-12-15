import styled from "styled-components";
import colors from "../styles/Colors.scss"; 
import vars from "../styles/Variables.scss"; 

export const BorderScreenSC = styled.img`
  position: absolute;
  z-index: 8;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: ${props => props.toggle ? 1 : 0};
  transform: scale(${props => props.toggle ? 1 : 1.3});
  transition: opacity 1s, transform 1s;
`

export const CanvasSC = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background: ${colors.magenta};
  background: linear-gradient(90deg, rgba(90,0,72,1) 0%, rgba(67,0,19,1) 47%, rgba(67,0,19,1) 53%, rgba(50,0,73,1) 100%);
  transition: background 3s;
`;

export const CanvasBoxSC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 6;
  width: 100%;
  height: 100%;
  transform: scale(${props => props.toggle ? 1 : 1.1});
  transition: transform 1s;
`;

export const StartButtonSC = styled.button`
  background: ${colors.darkBlack};
  padding: 15px 20px;
  margin-bottom: 10vh;
  border: 2px solid rgb(207, 207, 207);
  border-radius: 10px;
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
  color: white;
  z-index: 7;
  user-select: none;
  transition: background 0.3s;
  outline: none;

  @media screen and (max-width: ${vars.breakMobile}) and (orientation: portrait) {
    font-size: 1.2rem;
  }

  @media screen and (max-height: ${vars.breakMobile}) and (orientation: landscape) {
    font-size: 1.2rem;
  }

  :focus {
    background: ${colors.black};
  }

  :hover {
    background: ${colors.brightMagenta};
    color: white;
    cursor: pointer;

    &:active {
      background: ${colors.magenta}
    } 
  }
`;

export const PageTitleSC = styled.h1`
position: absolute;
top: 20%;
width: 80%;
text-align: center;
font-size: 4rem;
font-family: "Exo 2";
color: white;

  @media screen and (max-width: ${vars.break720}) {
    font-size: 3rem;
  }

  @media screen and (max-width: ${vars.breakMobile}) and (orientation: portrait) {
    font-size: 2rem;
  }

  @media screen and (max-height: ${vars.breakMobile}) and (orientation: landscape) {
    font-size: 2rem;
  }
`