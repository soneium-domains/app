import React, { useEffect, useRef } from "react";

interface FloatingObjectsProps {
  objectCount?: number;
  objectSize?: number;
  shapeColors?: {
    square?: string;
    circle?: string;
    triangle?: string;
    x?: string;
  };
  lineWidth?: number;
  styles?: any;
}

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "square" | "circle" | "triangle" | "x";
}

const FloatingObjects: React.FC<FloatingObjectsProps> = ({
  objectCount = 10,
  objectSize = 50,
  lineWidth = 2,
  shapeColors = {
    square: "#77777777",
    circle: "#77777777",
    triangle: "#77777777",
    x: "#77777777",
  },
  styles
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const shapes: Shape[] = Array.from({ length: objectCount }, () => ({
      x: Math.random() * (screenWidth - objectSize),
      y: Math.random() * (screenHeight - objectSize),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      type: ["square", "circle", "triangle", "x"][
        Math.floor(Math.random() * 4)
      ] as "square" | "circle" | "triangle" | "x",
    }));

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;

        // Set stroke color based on shape type
        switch (shape.type) {
          case "square":
            ctx.strokeStyle = shapeColors.square || "#000000";
            ctx.rect(shape.x, shape.y, objectSize, objectSize);
            ctx.stroke();
            break;
          case "circle":
            ctx.strokeStyle = shapeColors.circle || "#000000";
            ctx.arc(
              shape.x + objectSize / 2,
              shape.y + objectSize / 2,
              objectSize / 2,
              0,
              2 * Math.PI
            );
            ctx.stroke();
            break;
          case "triangle":
            ctx.strokeStyle = shapeColors.triangle || "#000000";
            ctx.moveTo(shape.x + objectSize / 2, shape.y);
            ctx.lineTo(shape.x, shape.y + objectSize);
            ctx.lineTo(shape.x + objectSize, shape.y + objectSize);
            ctx.closePath();
            ctx.stroke();
            break;
          case "x":
            ctx.strokeStyle = shapeColors.x || "#000000";
            ctx.moveTo(shape.x, shape.y);
            ctx.lineTo(shape.x + objectSize, shape.y + objectSize);
            ctx.moveTo(shape.x + objectSize, shape.y);
            ctx.lineTo(shape.x, shape.y + objectSize);
            ctx.stroke();
            break;
        }
      });
    };

    const updatePositions = () => {
      shapes.forEach((shape) => {
        shape.x += shape.vx;
        shape.y += shape.vy;

        if (shape.x <= 0 || shape.x >= screenWidth - objectSize) shape.vx = -shape.vx;
        if (shape.y <= 0 || shape.y >= screenHeight - objectSize) shape.vy = -shape.vy;
      });

      drawShapes();
      requestAnimationFrame(updatePositions);
    };

    updatePositions();
  }, [objectCount, objectSize, shapeColors]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100vh", zIndex: -1, position: 'absolute', top: 0, ...styles }} />;
};

export default FloatingObjects;