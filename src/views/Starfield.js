import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CanvasSC = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background: black;
`;

const CanvasBoxSC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 6;
`;

const StartButtonSC = styled.button`
  background: rgba(0, 0, 0, 0);
  padding: 20px;
  margin-bottom: 10vh;
  border: 1px solid white;
  border-radius: 20px;
  color: white;
  z-index: 7;
  user-select: none;
  transition: background 0.3s;

  :hover {
    background: rgba(50, 50, 50, 20);
    cursor: pointer;
  }

  :active {
    background: rgba(30, 30, 30, 20);
  }

  :focus {
    outline: none;
    border: 1px solid #bbbbbb;
  }
`;

let state = {
  animFrame: 0,
  mousePosition: { x: 0, y: 0 }
};

class Particle {
  constructor(x, y, hue) {
    this.hue =
      hue + (-0.5 * this.hueVariance + Math.random() * this.hueVariance);
    this.currentX = x;
    this.currentY = y;
  }

  // Set the speed for the particle
  speed = {
    x: -1 + Math.random() * 2,
    y: -1 + Math.random() * 2
  };

  // Size the particle
  radius = 4 + Math.random() * 4;

  // Set color variance
  hueVariance = 50;

  // Set radius of circle around mouse the particle will avoid
  mouseAvoidRadius = 500;

  // Set how quickly the particle should move away from the mouse (higher = faster)
  mouseAvoidStrength = 5;

  // Function to draw particle on canvas (and update location based on speed)
  draw = canvas => {
    const p = this;
    const ctx = canvas.getContext("2d");

    // Draw a circle at the current location
    ctx.beginPath();
    ctx.arc(p.currentX, p.currentY, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
    ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(p.currentX, p.currentY, p.radius / 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
    ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
    ctx.shadowBlur = 10;
    ctx.fill();

    // Update the particle's location
    p.currentX += p.speed.x;
    p.currentY += p.speed.y;

    // adjustment for resolution
    let mpX = state.mousePosition.x * 4;
    let mpY = state.mousePosition.y * 4;

    const mouseDistance = Math.sqrt(
      Math.pow(p.currentX - mpX, 2) + Math.pow(p.currentY - mpY, 2)
    );

    if (mouseDistance < p.mouseAvoidRadius) {
      // reset base speed with angle

      let avoidSpeed =
        p.mouseAvoidStrength *
        Math.pow((p.mouseAvoidRadius - mouseDistance) / p.mouseAvoidRadius, 2);
      // also calc currentSpeed ugh

      let moveDistX = ((p.currentX - mpX) * avoidSpeed) / mouseDistance;
      let moveDistY = ((p.currentY - mpY) * avoidSpeed) / mouseDistance;

      p.currentX += moveDistX;
      p.currentY += moveDistY;
    }

    if (p.currentX <= 0) {
      p.currentX = 0;
      p.speed.x *= -1;
    } else if (p.currentX >= canvas.width) {
      p.currentX = canvas.width;
      p.speed.x *= -1;
    }

    if (p.currentY <= 0) {
      p.currentY = 0;
      p.speed.y *= -1;
    } else if (p.currentY >= canvas.height) {
      p.currentY = canvas.height;
      p.speed.y *= -1;
    }
  };
}

export default function Starfield(props) {
  const canvasRef = useRef(null);
  let totalParticles = 40;
  let particles = [];

  let [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    window.addEventListener("resize", () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      particles = [];
      ctx.globalAlpha = 0;
      startAnimateParticles(canvas);
    });

    ctx.globalAlpha = 0;
    startAnimateParticles(canvas);
    animateParticles();

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
        ctx.globalAlpha += .002
      }

      // Draw all of our particles in their new location
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(canvas);
      }
    }

    return () => window.cancelAnimationFrame(state.animFrame)
  }, []);

  function setMousePosition(ev) {
    state = {
      ...state,
      mousePosition: { x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY }
    };
  }

  return (
    <CanvasBoxSC>
      <StartButtonSC onClick={props.startButtonHandler}>PRESS ME</StartButtonSC>
      <CanvasSC
        width={dimensions.width * 4}
        height={dimensions.height * 4}
        onMouseMove={setMousePosition}
        ref={canvasRef}
      />
    </CanvasBoxSC>
  );
}