import React from "react";
import { useSpring, animated } from "react-spring";

import colors from "../styles/Colors.scss"; 

function Contact({ scrollPosition }) {
  const contactPanelSpr = useSpring({
    transform:
      100 === scrollPosition
        ? "perspective(1500px) rotateY(0)"
        : "perspective(1500px) rotateY(0.5turn)",
    config: { mass: 2, tension: 170, friction: 34 }
  });
  const contactPanelBgSpr = useSpring({
    background:
      97 < scrollPosition
        ? colors.darkGreyBlue
        : colors.greyBlue,
    config: { mass: 1, tension: 210, friction: 20 }
  });
  const pixelMaskSpr = useSpring({
    width:
      100 === scrollPosition
        ? "100%"
        : "100.2%",
    config: { mass: 2, tension: 170, friction: 34 }
  });

  return (
    <div className="contact-page">
      <div className="flipbook">
        <animated.div className="flip-panel" style={contactPanelSpr}>
          <div className="frontside">
            <h2 className="project-title">Title of Work</h2>
            <div className="project-window">
              
            </div>
          </div>
          <animated.div className="backside" style={{...contactPanelBgSpr, ...pixelMaskSpr}}/>
        </animated.div>
        <div className="flipbook-back" />
      </div>
    </div>
  );
}

export default Contact;



// .flipbook {
//   position: absolute;
//   bottom: 20%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 30vw;
//   width: 60vw;
//   min-height: 250px;
//   min-width: 500px;
//   max-height: 400px;
//   max-width: 800px;

//   @media screen and (max-width: $break-mobile) {
//     transform: rotateZ(0.25turn);
//   }

//   .flip-panel {
//     position: absolute;
//     left: 0%;
//     height: 100%;
//     width: 50%;
//     transform-origin: right center;
//     z-index: 2;
//     backface-visibility: hidden;

//     .frontside {
//       position: absolute;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       border-top-left-radius: 20px;
//       border-bottom-left-radius: 20px;
//       width: 100%;
//       height: 99.6%;
//       top: 0.2%;
//       right: 0%;
//       background: $black;
//       z-index: 3;
//       backface-visibility: hidden;

//       .project-title {
//         font-family: "Open Sans", sans-serif;
//         font-size: 30px;
//         margin-top: 5%;
//         height: 15%;
//         color: white;
//       }

//       .project-window {
//         position: relative;
//         width: 90%;
//         height: 70%;
//         background: white;
//         border-radius: 20px;
//         z-index: 3;
//         backface-visibility: hidden;
//       }
//     }

//     .backside {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       border-top-right-radius: 20px;
//       border-bottom-right-radius: 20px;
//       background: $grey-blue;
//       transform: rotateY(0.5turn);
//       z-index: 2;
//     }
//   }

//   .flipbook-back {
//     position: absolute;
//     height: 99.6%;
//     width: 49.8%;
//     top: 0.2%;
//     left: 50%;
//     background: green;
//     border-top-right-radius: 20px;
//     border-bottom-right-radius: 20px;
//     z-index: 1;
//   }
// }