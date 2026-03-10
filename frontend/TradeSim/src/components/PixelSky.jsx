import { useEffect, useRef } from "react";

const CLOUD_COLOR_SETS = [
  ["#f3e3d0", "#e8d4be", "#d2c4b4"],
  ["#aacddc", "#90bdd0", "#81a6c6"],
  ["#d2c4b4", "#c0b0a0", "#b0a090"],
  ["#ffffff", "#eeeeee", "#dddddd"],
];

const CLOUDS = [
  { x: 0.05, y: 0.12, scale: 1.8, speed: 0.18, colorSet: 0 },
  { x: 0.25, y: 0.22, scale: 2.4, speed: 0.12, colorSet: 1 },
  { x: 0.50, y: 0.10, scale: 1.4, speed: 0.22, colorSet: 2 },
  { x: 0.70, y: 0.28, scale: 2.0, speed: 0.14, colorSet: 3 },
  { x: 0.40, y: 0.35, scale: 1.6, speed: 0.20, colorSet: 0 },
  { x: 0.85, y: 0.18, scale: 1.2, speed: 0.28, colorSet: 1 },
  { x: 0.15, y: 0.38, scale: 2.8, speed: 0.10, colorSet: 2 },
  { x: 0.60, y: 0.42, scale: 1.0, speed: 0.32, colorSet: 3 },
];

const STARS = Array.from({ length: 60 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.5,
  size: Math.random() < 0.3 ? 2 : 1,
  twinkleSpeed: 0.02 + Math.random() * 0.03,
  phase: Math.random() * Math.PI * 2,
}));

const CLOUD_PIXELS = [
  [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
  [1,1,2,2,1,1,1,1,1,1,1,0,0,0,0,0],
  [1,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],
  [1,1,2,2,2,2,2,2,2,2,2,1,1,1,0,0],
  [0,1,1,2,2,2,2,2,2,2,2,2,1,1,1,0],
  [0,0,1,1,1,2,2,2,2,2,2,2,2,1,1,1],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
];

function drawCloud(ctx, cx, cy, scale, colorSet) {
  const colors = CLOUD_COLOR_SETS[colorSet];
  const px = Math.floor(scale * 4);
  for (let row = 0; row < CLOUD_PIXELS.length; row++) {
    for (let col = 0; col < CLOUD_PIXELS[row].length; col++) {
      const v = CLOUD_PIXELS[row][col];
      if (v === 0) continue;
      ctx.fillStyle = colors[v - 1];
      ctx.fillRect(
        Math.floor(cx + col * px),
        Math.floor(cy + row * px),
        px, px
      );
    }
  }
}

function drawStar(ctx, x, y, size, alpha) {
  ctx.fillStyle = `rgba(243, 227, 208, ${alpha})`;
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  if (size === 2) {
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
    ctx.fillRect(Math.floor(x) - 1, Math.floor(y), 1, 1);
    ctx.fillRect(Math.floor(x) + 2, Math.floor(y), 1, 1);
    ctx.fillRect(Math.floor(x), Math.floor(y) - 1, 1, 1);
    ctx.fillRect(Math.floor(x), Math.floor(y) + 2, 1, 1);
  }
}

export default function PixelSky() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    clouds: CLOUDS.map(c => ({ ...c })),
    stars:  STARS.map(s => ({ ...s })),
    tick: 0,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function drawSky(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0.00, "#0d1a2a");
      grad.addColorStop(0.25, "#1a2a3a");
      grad.addColorStop(0.50, "#243447");
      grad.addColorStop(0.70, "#3a5470");
      grad.addColorStop(0.85, "#81a6c6");
      grad.addColorStop(1.00, "#aacddc");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    function drawGround(ctx, w, h) {
      const tileW  = 16;
      const groundH = 8;
      const y = h - groundH;
      const colors = ["#81a6c6", "#aacddc"];
      for (let x = 0; x < w; x += tileW) {
        ctx.fillStyle = colors[Math.floor(x / tileW) % 2];
        ctx.globalAlpha = 0.4;
        ctx.fillRect(x, y, tileW, groundH);
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      const { clouds, stars, tick } = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;

      drawSky(ctx, w, h);

      stars.forEach(s => {
        const alpha = 0.3 + 0.5 * Math.sin(tick * s.twinkleSpeed + s.phase);
        drawStar(ctx, s.x * w, s.y * h, s.size, alpha);
      });

      clouds.forEach(c => {
        const cloudW = 16 * Math.floor(c.scale * 4);
        if (c.x * w > w + cloudW) c.x = -cloudW / w;
        c.x += c.speed / w;
        drawCloud(ctx, Math.floor(c.x * w), Math.floor(c.y * h), c.scale, c.colorSet);
      });

      drawGround(ctx, w, h);

      stateRef.current.tick++;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  );
}