import React from "react";
import { useSpring, animated } from "react-spring";

import telescope1 from "../assets/telescope-1.png";
import telescope2 from "../assets/telescope-2.png";
import telescope3 from "../assets/telescope-3.png";

function Work({ scrollPosition }) {
  const telescope1Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3Spr = useSpring({
    transform:
      24 < scrollPosition && scrollPosition < 34
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope1bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(20%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope2bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(70%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });
  const telescope3bSpr = useSpring({
    transform:
      26 < scrollPosition && scrollPosition < 36
        ? "translate(120%, 0)"
        : "translate(-70%, 0)",
      config: { mass: 5, tension: 400, friction: 120 }
  });

  return (
    <div className="work-page">
      <div className="telescope-A">
        <animated.div className="telescope-A-end" style={telescope3Spr} >
          <img className="telescope-3A" src={telescope3} alt=""/>
        </animated.div>
      	<animated.img className="telescope-2A" style={telescope2Spr} src={telescope2} alt=""/>
        <animated.img className="telescope-1A" style={telescope1Spr} src={telescope1} alt=""/>
      </div>
      <div className="telescope-B">
        <animated.div className="telescope-B-end" style={telescope3bSpr} >
          <img className="telescope-3B" src={telescope3} alt=""/>
        </animated.div>
      	<animated.img className="telescope-2B" style={telescope2bSpr} src={telescope2} alt=""/>
        <animated.img className="telescope-1B" style={telescope1bSpr} src={telescope1} alt=""/>
      </div>
    </div>
  );
}

export default Work;


// .telescope-A {
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   left: 0;
//   top: 45%;
//   transform: translate(-6%, 0);

//   @media screen and (max-width: $break-tablet) {
//     transform: scale(0.8) translate(-155px, 0);
//   }

//   .telescope-1A {
//     position: absolute;
//     left: 0;
//     height: 72px;
//     width: 10%;
//     min-width: 90px;
//   }

//   .telescope-2A {
//     position: absolute;
//     left: 1%;
//     height: 42px;
//     width: 10%;
//     min-width: 90px;
//   }

//   .telescope-A-end {
//     position: absolute;
//     left: 2%;
//     height: 33px;
//     width: 10%;
//     min-width: 90px;

//     .telescope-3A {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//     }
//   }
// }

// .telescope-B {
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   left: 100%;
//   top: 80%;
//   transform: scaleX(-1) translate(10%, 0);

//   @media screen and (max-width: $break-tablet) {
//     transform: scaleX(-1) scale(0.8) translate(29%, 0) translateX(-50px);
//   }

//   .telescope-1B {
//     position: absolute;
//     right: 6%;
//     height: 72px;
//     width: 10%;
//     min-width: 90px;
//   }

//   .telescope-2B {
//     position: absolute;
//     right: 5%;
//     height: 42px;
//     width: 10%;
//     min-width: 90px;
//   }

//   .telescope-B-end {
//     position: absolute;
//     right: 4%;
//     height: 33px;
//     width: 10%;
//     min-width: 90px;

//     .telescope-3B {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//     }
//   }
// }