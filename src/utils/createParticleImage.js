export default function createParticleImage(radius, glow, hue) {
  let canvas;
  const size = glow ? radius * 4 : radius * 2
  if (typeof OffscreenCanvas !== "undefined") { 
    canvas = new OffscreenCanvas(size, size);
  } else { 
    canvas = document.createElement("CANVAS");
    canvas.width = size;
    canvas.height = size;
  }
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
  ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
  ctx.shadowBlur = glow ? 1 * radius : 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fill();
  ctx.closePath();
  return canvas;
}