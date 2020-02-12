import React, { useState, useEffect, useRef } from "react";
import screenBorder from "../assets/Screen-Border.png";
import Particle from "../utils/Particle.js";
import StarfieldModal from "../components/StarfieldModal.js";
import AnimatedText from "../components/AnimatedText";
import AnimatedButton from "../components/AnimatedButton";

let state = {
  animFrame: 0,
  mousePosition: { x: Infinity, y: Infinity },
  mouseClicked: false
};

export default function Starfield(props) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [settings, setSettings] = useState({
    totalParticles: 100,
    hue: 200,
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
      particles.current.current = [];
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
      setFirstLoad(false)
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

  function handleClick() {
    state = {
      ...state,
      mouseClicked: true
    };
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setSettings(newSettings);
  }

  function handleCancel(ev) {
    ev.preventDefault();
    setNewSettings(settings);
  }

  function handleChange(ev) {
    const target = ev.target.name;
    const value = parseInt(ev.target.value);
    setNewSettings({ ...newSettings, [target]: value });
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
          <AnimatedButton onClick={handleStart} className="animated-button">
            ENTER
          </AnimatedButton>
          {/* <form style={{ position: "relative", zIndex: "12", color: "white" }}>
            <label>
              Total Particles
              <input
                type="range"
                name="totalParticles"
                max={500}
                value={newSettings.totalParticles}
                onChange={handleChange}
              />
            </label>
            <label>
              Color
              <input
                type="range"
                name="hue"
                max={255}
                step={1}
                value={newSettings.hue}
                onChange={handleChange}
              />
            </label>
            <label>
              Size
              <input
                type="range"
                name="size"
                min={0.25}
                max={10}
                step={0.25}
                value={newSettings.size}
                onChange={handleChange}
              />
            </label>
            <label>
              Speed
              <input
                type="range"
                name="baseSpeed"
                max={10}
                step={.1}
                value={newSettings.baseSpeed}
                onChange={handleChange}
              />
            </label>
            <label>
              Avoid Strength
              <input
                type="range"
                name="avoidStrength"
                max={10}
                step={.1}
                value={newSettings.avoidStrength}
                onChange={handleChange}
              />
            </label>
            <label>
              Avoid Radius
              <input
                type="range"
                name="avoidRadius"
                max={500}
                value={newSettings.avoidRadius}
                onChange={handleChange}
              />
            </label>
            <label>
              Click Strength
              <input
                type="range"
                name="clickStrength"
                max={500}
                value={newSettings.clickStrength}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSubmit}>SUBMIT</button>
            <button onClick={handleCancel}>CANCEL</button>
          </form> */}
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
