const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const smallestDimension = screenWidth < screenHeight ? screenWidth : screenHeight

// helper to get current speed
const getDelta = (data) => Math.sqrt(
  Math.pow(data.x, 2) + Math.pow(data.y, 2)
);

export default class Particle {
  constructor({x, y, hue, size, baseSpeed, avoidRadius, avoidStrength, clickStrength}) {
    let variance = (-0.5 * this.hueVariance + Math.random() * this.hueVariance);
    this.hue =
      (hue + variance);
    console.log(this.hue)
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
  }


  // Set rate of deacceleration
  friction = 0.99

  // Set color variance
  hueVariance = 50;

  // Set area of effect multiplier when mouse is clicked 
  mouseClickRadius = 1.25;

  lastMouseDistance = Infinity;

  // Function to draw particle on canvas (and update location based on speed)
  draw = (canvas, state) => {
    const p = this;
    const ctx = canvas.getContext("2d");

    // Draw a circle at the current location
    ctx.beginPath();
    ctx.arc(p.currentX, p.currentY, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
    ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
    ctx.shadowBlur = 2 * p.radius;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
    ctx.closePath();
    // ctx.beginPath();
    // ctx.arc(p.currentX, p.currentY, p.radius / 1.5, 0, Math.PI * 2);
    // ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
    // ctx.shadowColor = `hsl(${p.hue}, 100%, 70%)`;
    // ctx.shadowBlur = 10;
    // ctx.fill();

    // Update the particle's location
    p.currentX += p.speed.x;
    p.currentY += p.speed.y;

    // adjustment for resolution
    let mpX = state.mousePosition.x * 4;
    let mpY = state.mousePosition.y * 4;

    const mouseDistance = Math.sqrt(
      Math.pow(p.currentX - mpX, 2) + Math.pow(p.currentY - mpY, 2)
    );

    //
    // if (mouseDistance < p.mouseAvoidRadius) {
    //   // reset speed with angle

    //   let avoidSpeed =
    //     p.mouseAvoidStrength *
    //     Math.pow((p.mouseAvoidRadius - mouseDistance) / p.mouseAvoidRadius, 2);
    //   // also calc currentSpeed ugh

    //   let moveDistX = ((p.currentX - mpX) * avoidSpeed) / mouseDistance;
    //   let moveDistY = ((p.currentY - mpY) * avoidSpeed) / mouseDistance;

    //   p.currentX += moveDistX;
    //   p.currentY += moveDistY;
    // }


    if (state.mouseClicked && mouseDistance < p.mouseAvoidRadius * p.mouseClickRadius) {
      let avoidSpeed =
        p.mouseAvoidStrength *
        p.mouseClickForce *
        Math.pow((p.mouseAvoidRadius - mouseDistance) / p.mouseAvoidRadius, 2);

      p.speed.x += ((p.currentX - mpX) * avoidSpeed) / mouseDistance;
      p.speed.y += ((p.currentY - mpY) * avoidSpeed) / mouseDistance;
    }
    else if (mouseDistance < p.mouseAvoidRadius && mouseDistance < p.lastMouseDistance) {
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