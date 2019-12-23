import React, { useState, useEffect, useRef } from "react";
import screenBorder from "../assets/Screen-Border.png";
import Particle from "../utils/Particle.js";
import StarfieldModal from "../components/StarfieldModal.js"
import AnimatedText from "../components/AnimatedText";
import AnimatedButton from "../components/AnimatedButton";

let state = {
  animFrame: 0,
  mousePosition: { x: Infinity, y: Infinity }
};

export default function Starfield(props) {
  const canvasRef = useRef(null);
  let totalParticles = 100;
  let particles = [];

  let [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      // eslint-disable-next-line
      particles = [];
      ctx.globalAlpha = 0;
      if (!props.toggle) {
        startAnimateParticles(canvas);
      }
    }

    window.addEventListener("resize", handleResize);

    ctx.globalAlpha = 0;
    
    if (!props.toggle && props.init) {
      startAnimateParticles(canvas);
      animateParticles();
    }

    function startAnimateParticles(canvas) {
      for (let j = 0; j < totalParticles; j++) {
        particles = particleEmitter(particles);
      }

      function particleEmitter(particles) {
        let hue = 200;
        let x = Math.floor(canvas.width * Math.random());
        let y = Math.floor(canvas.height * Math.random());

        return [...particles, new Particle(x, y, hue)];
      }
    }

    function animateParticles() {
      state = { ...state, animFrame: requestAnimationFrame(animateParticles) };
      // Clear out the old particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ctx.globalAlpha < 1) {
        ctx.globalAlpha += .003
      }

      // Draw all of our particles in their new location
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(canvas, state);
      }
    }

    return () => {
      window.cancelAnimationFrame(state.animFrame)
      window.removeEventListener("resize", handleResize);
    }
  }, [props.toggle, props.init]);

  useEffect(() => {
    if (props.clear) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [props.clear])

  function handleMouse(ev) {
    state = {
      ...state,
      mousePosition: { x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY }
    };
  }

  function handleTouch(ev) {
    const rect = ev.target.getBoundingClientRect();
    const x = ev.nativeEvent.targetTouches[0].pageX - rect.left;
    const y = ev.nativeEvent.targetTouches[0].pageY - rect.top;

    state = {
      ...state,
      mousePosition: { x, y }
    };
  }

  function handleTouchEnd(ev) {
    state = {
      ...state,
      mousePosition: { x: Infinity, y: Infinity }
    };
  }

  function handleStart(ev) {
    props.setStarModalIsVisible(false);
    props.startButtonHandler(ev);
  }

  return (
    <>
      <img className="border-screen" alt="" src={screenBorder} style={{opacity: props.toggle ? 1 : 0, transform: `scale(${props.toggle ? 1 : 1.3})`}} />
      <div className="starfield-box" style={{transform: `scale(${props.toggle ? 1 : 1.1})`}}>
        <canvas
          className="canvas"
          width={dimensions.width * 4}
          height={dimensions.height * 4}
          onMouseMove={handleMouse}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleTouchEnd}
          ref={canvasRef}
        />
        <div className="starfield-content-box">
          <h1 className="page-title">
            <AnimatedText string="Matt Klein Development"/>
          </h1>
          <AnimatedButton onClick={handleStart} className="animated-button">
            ENTER
          </AnimatedButton>
          <StarfieldModal tabIndex={props.toggle ? -1 : 0} isVisible={props.starModalIsVisible} trigger={() => props.setStarModalIsVisible(false)}/>
        </div>
      </div>
    </>
  );
}
