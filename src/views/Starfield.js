import React, { useState, useEffect, useRef } from "react";
import screenBorder from "../assets/Screen-Border.png";
import Particle from "../utils/Particle.js";
import StarfieldModal from "../components/StarfieldModal.js";
import AnimatedText from "../components/AnimatedText";
import AnimatedButton from "../components/AnimatedButton";
import StarfieldSettings from "../components/StarfieldSettings";

let state = {
  animFrame: 0,
  mousePosition: { x: Infinity, y: Infinity },
  mouseClicked: false,
  clickPosition: { x: Infinity, y: Infinity }
};

export default function Starfield(props) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [settings, setSettings] = useState({
    totalParticles: 100,
    hue: 200,
    hueVariance: 50,
    glow: true,
    size: 1,
    baseSpeed: 1,
    avoidStrength: 1,
    avoidRadius: 100,
    clickStrength: 40
  });
  const [newSettings, setNewSettings] = useState(settings);

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
      particles.current = [];
      ctx.globalAlpha = 0;
      if (!props.toggle) {
        startAnimateParticles(canvas);
      }
    };

    window.addEventListener("resize", handleResize);

    ctx.globalAlpha = 0;

    if (!props.toggle && props.init) {
      startAnimateParticles(canvas);
      animateParticles(canvas);
    }

    return () => {
      window.cancelAnimationFrame(state.animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [props.toggle, props.init]);

  useEffect(() => {
    if (props.clear) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [props.clear]);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      particles.current = [];
      ctx.globalAlpha = 0;
      if (!props.toggle) {
        startAnimateParticles(canvas);
      }
    }
  }, [settings]);

  function startAnimateParticles(canvas) {
    for (let j = 0; j < settings.totalParticles; j++) {
      particles.current = particleEmitter(particles.current);
    }

    function particleEmitter(particles) {
      const x = Math.floor(canvas.width * Math.random());
      const y = Math.floor(canvas.height * Math.random());
      const { totalParticles, ...particleSettings } = settings;

      return [
        ...particles,
        new Particle({
          x,
          y,
          ...particleSettings
        })
      ];
    }
  }

  function animateParticles(canvas) {
    const ctx = canvas.getContext("2d");
    state = {
      ...state,
      animFrame: requestAnimationFrame(() => animateParticles(canvas))
    };
    // Clear out the old particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ctx.globalAlpha < 1) {
      ctx.globalAlpha += 0.003;
    }

    // Draw all of our particles in their new location
    for (let i = 0; i < particles.current.length; i++) {
      particles.current[i].draw(canvas, state);
    }

    // If mouse has been clicked, reset bool flag
    if (state.mouseClicked) {
      state = { ...state, mouseClicked: false };
    }
  }

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

  function handleTouchEnd() {
    state = {
      ...state,
      mouseClicked: true,
      clickPosition: state.mousePosition,
      mousePosition: { x: Infinity, y: Infinity }
    };
  }

  function handleStart(ev) {
    props.setStarModalIsVisible(false);
    props.startButtonHandler(ev);
  }

  function handleClick() {
    state = {
      ...state,
      mouseClicked: true,
      clickPosition: state.mousePosition
    };
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(newSettings.glow)
    setSettings(newSettings);
  }

  function handleCancel(ev) {
    ev.preventDefault();
    setNewSettings(settings);
  }

  function handleChange(ev) {
    const target = ev.target.name;
    let value;
    if (target === "glow") {
      value = ev.target.checked;
    } else {
      value = parseInt(ev.target.value);
    }
    
    setNewSettings({ ...newSettings, [target]: value });
  }

  function handleSettingsClose(ev) {
    ev.preventDefault();

  }

  return (
    <>
      <img
        className="border-screen"
        alt=""
        src={screenBorder}
        style={{
          opacity: props.toggle ? 1 : 0,
          transform: `scale(${props.toggle ? 1 : 1.3})`
        }}
      />
      <div
        className="starfield-box"
        style={{ transform: `scale(${props.toggle ? 1 : 1.1})` }}
      >
        <canvas
          className="canvas"
          width={dimensions.width * 4}
          height={dimensions.height * 4}
          onMouseMove={handleMouse}
          onMouseUp={handleClick}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleTouchEnd}
          ref={canvasRef}
        />
        <div className="starfield-content-box">
          <h1 className="page-title">
            <AnimatedText string="Matt Klein Development" />
          </h1>
          <div className="button-box">
            <AnimatedButton onClick={handleStart} className="animated-button">
              ENTER
            </AnimatedButton>
            <AnimatedButton delay={500} config={{tension: 160, friction: 15}} onClick={() => props.setStarSettingsAreOpen(!props.starSettingsAreOpen)} className="animated-button settings">
              SETTINGS
            </AnimatedButton>
          </div>
          <StarfieldSettings
            newSettings={newSettings}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            handleClose={() => props.setStarSettingsAreOpen(false)}
            isOpen={props.starSettingsAreOpen}
          />
          <StarfieldModal
            tabIndex={props.toggle ? -1 : 0}
            isVisible={props.starModalIsVisible}
            trigger={() => props.setStarModalIsVisible(false)}
          />
        </div>
      </div>
    </>
  );
}
