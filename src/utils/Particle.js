export default class Particle {
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
  draw = (canvas, state) => {
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