"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

export function WireframeScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const progress = smoothProgress.get();
      
      // Wireframe Grid Settings
      const gridSize = 40;
      const cols = Math.ceil(width / gridSize) + 4;
      const rows = 15;
      const perspective = 500;
      
      ctx.strokeStyle = "rgba(45, 212, 191, 0.08)"; // Subtle Teal
      ctx.lineWidth = 0.5;

      // Draw horizontal lines with perspective
      for (let i = 0; i <= rows; i++) {
        const yBase = (i / rows) * height * 0.5;
        const z = 1 - (i / rows) * 0.8; // Perspective depth
        const y = height * 0.2 + yBase * (1 + progress * 0.5); // Animation move
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vertical lines tapering into distance
      for (let j = 0; j <= cols; j++) {
        const xPos = (j / cols) * width * 1.5 - width * 0.25;
        const centerX = width / 2;
        
        ctx.beginPath();
        // Point from the "horizon"
        const startX = centerX + (xPos - centerX) * 0.1;
        const startY = height * 0.2;
        
        // Point at the "bottom"
        const endX = xPos;
        const endY = height * 0.8;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Add a few "tech nodes" or dots at intersections (very subtle)
      ctx.fillStyle = "rgba(45, 212, 191, 0.2)";
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
           const x = (j / 4) * width;
           const y = height * 0.3 + (i / 4) * height * 0.4;
           ctx.beginPath();
           ctx.arc(x, y + progress * 20, 1, 0, Math.PI * 2);
           ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothProgress]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
