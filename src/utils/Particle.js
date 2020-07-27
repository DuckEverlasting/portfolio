import createParticleImage from "./createParticleImage";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const smallestDimension = screenWidth < screenHeight ? screenWidth : screenHeight

// helper to get current speed
const getDelta = (data) => Math.sqrt(
  Math.pow(data.x, 2) + Math.pow(data.y, 2)
);

export default class Particle {
  constructor({x, y, hue, hueVariance, glow, size, baseSpeed, avoidRadius, avoidStrength, clickStrength, image}) {
    let variance = (-0.5 * hueVariance + Math.random() * hueVariance);
    this.hue =
      (hue + variance);
    // Toggle particle shadow (shadow decreases performance)
    this.glow = glow;
    this.currentX = x;
    this.currentY = y;
    // Size the particle
    this.radius = (3 + smallestDimension / 200 + Math.random() * 4) * size;
    // Set radius of circle around mouse the particle will avoid
    this.mouseAvoidRadius = avoidRadius * (5 + smallestDimension / 200);
    // Set how quickly the particle should move away from the mouse (higher = faster)
    this.mouseAvoidStrength = avoidStrength;
    // Set force multiplier when mouse is clicked
    this.mouseClickForce = clickStrength;
    // Set the initial speed and direction for the particle
    this.initSpeed = {
      x: (-1 + Math.random() * 2) * baseSpeed,
      y: (-1 + Math.random() * 2 ) * baseSpeed
    };
    this.speed = {...this.initSpeed}
    // Calculate base speed
    this.minSpeed = getDelta(this.initSpeed);
    // Set rate of deacceleration
    this.friction = 0.99;
    // Set area of effect multiplier when mouse is clicked 
    this.mouseClickRadius = 1.25;

    this.lastMouseDistance = Infinity;
    
    // Create and store particle to stamp onto canvas
    this.particleImage = image || createParticleImage(this.radius, this.glow, this.hue);
  }


  // Set rate of deacceleration
  // friction = 0.99

  // Set area of effect multiplier when mouse is clicked 
  // mouseClickRadius = 1.25;

  // lastMouseDistance = Infinity;

  // Function to draw particle on canvas (and update location based on speed)
  draw = (canvas, state) => {
    const p = this;

    // Draw particle image at the current location
    canvas.getContext("2d").drawImage(p.particleImage, p.currentX - p.particleImage.width / 2, p.currentY - p.particleImage.height / 2);
    
    // Update the particle's location
    p.currentX += p.speed.x;
    p.currentY += p.speed.y;

    // adjustment for resolution
    let mpX = state.mousePosition.x * 4;
    let mpY = state.mousePosition.y * 4;

    let clickDistance, mcX, mcY;
    const mouseDistance = Math.sqrt(
      Math.pow(p.currentX - mpX, 2) + Math.pow(p.currentY - mpY, 2)
    );
    if (state.mouseClicked) {
      mcX = state.clickPosition.x * 4;
      mcY = state.clickPosition.y * 4;
      clickDistance = Math.sqrt(
        Math.pow(p.currentX - mcX, 2) + Math.pow(p.currentY - mcY, 2)
      );
    }

    if (state.mouseClicked && clickDistance < p.mouseAvoidRadius * p.mouseClickRadius) {
      let avoidSpeed =
        p.mouseAvoidStrength *
        p.mouseClickForce *
        Math.pow((p.mouseAvoidRadius - clickDistance) / p.mouseAvoidRadius, 2);

      p.speed.x += ((p.currentX - mcX) * avoidSpeed) / clickDistance;
      p.speed.y += ((p.currentY - mcY) * avoidSpeed) / clickDistance;
    } else if (mouseDistance < p.mouseAvoidRadius && mouseDistance < p.lastMouseDistance) {
      let avoidSpeed =
        p.mouseAvoidStrength *
        Math.pow((p.mouseAvoidRadius - mouseDistance) / p.mouseAvoidRadius, 2);

      p.speed.x += ((p.currentX - mpX) * avoidSpeed) / mouseDistance;
      p.speed.y += ((p.currentY - mpY) * avoidSpeed) / mouseDistance;

    } else if (getDelta(p.speed) > p.minSpeed) {
      p.speed.x *= p.friction;
      p.speed.y *= p.friction;
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

    p.lastMouseDistance = mouseDistance;
  };
}