import React, { useEffect, useRef } from "react";

interface FloatingDomainMapProps {
  domainNames: string[];
  centralComponent: React.ReactNode;
  centralSize?: number;
  lineColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

interface Box {
  name: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  width: number;
  height: number;
}

const FloatingDomainMap2D: React.FC<FloatingDomainMapProps> = ({
  domainNames,
  centralComponent,
  centralSize = 150,
  lineColor = "#000000",
  textColor = "#000000",
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const screenWidth = canvas.clientWidth;
    const screenHeight = canvas.clientHeight;
    const perspective = 800;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const padding = 16;
    const fontSize = 16;

    const calculateBoxWidth = (text: string) => {
      ctx.font = `${fontSize}px Arial`;
      const textWidth = ctx.measureText(text).width;
      return textWidth + padding * 2;
    };

    const createBox = (
      x: number,
      y: number,
      z: number,
      width: number,
      height: number,
      text: string
    ) => {
      const scale = perspective / (perspective + z);
      const scaledX = centerX + (x - centerX) * scale;
      const scaledY = centerY + (y - centerY) * scale;
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      ctx.beginPath();
      ctx.moveTo(scaledX + scaledHeight / 2, scaledY);
      ctx.lineTo(scaledX + scaledWidth - scaledHeight / 2, scaledY);
      ctx.quadraticCurveTo(scaledX + scaledWidth, scaledY, scaledX + scaledWidth, scaledY + scaledHeight / 2);
      ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight - scaledHeight / 2);
      ctx.quadraticCurveTo(scaledX + scaledWidth, scaledY + scaledHeight, scaledX + scaledWidth - scaledHeight / 2, scaledY + scaledHeight);
      ctx.lineTo(scaledX + scaledHeight / 2, scaledY + scaledHeight);
      ctx.quadraticCurveTo(scaledX, scaledY + scaledHeight, scaledX, scaledY + scaledHeight - scaledHeight / 2);
      ctx.lineTo(scaledX, scaledY + scaledHeight / 2);
      ctx.quadraticCurveTo(scaledX, scaledY, scaledX + scaledHeight / 2, scaledY);
      ctx.closePath();

      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `${fontSize * scale}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, scaledX + scaledWidth / 2, scaledY + scaledHeight / 2);
    };

    const drawConnectingLine = (
      fromX: number,
      fromY: number,
      fromZ: number,
      toX: number,
      toY: number,
      toZ: number,
      toWidth: number,
      toHeight: number
    ) => {
      const scaleFrom = perspective / (perspective + fromZ);
      const scaleTo = perspective / (perspective + toZ);

      const fromScaledX = centerX + (fromX - centerX) * scaleFrom;
      const fromScaledY = centerY + (fromY - centerY) * scaleFrom;
      const toScaledX = centerX + (toX - centerX) * scaleTo + toWidth / 2 * scaleTo;
      const toScaledY = centerY + (toY - centerY) * scaleTo + toHeight / 2 * scaleTo;

      ctx.beginPath();
      ctx.moveTo(fromScaledX, fromScaledY);
      ctx.lineTo(toScaledX, toScaledY);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const floatingBoxes: Box[] = domainNames.map((name) => ({
      name,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      z: Math.random() * perspective * 2 - perspective,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      vz: (Math.random() - 0.5) * 2,
      width: calculateBoxWidth(name),
      height: fontSize + padding * 2,
    }));

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines first (so they appear behind the boxes)
      floatingBoxes.forEach((box) => {
        drawConnectingLine(centerX, centerY, 0, box.x, box.y, box.z, box.width, box.height);
      });

      // Draw floating boxes
      floatingBoxes.forEach((box) => {
        box.x += box.vx;
        box.y += box.vy;
        box.z += box.vz;

        // Bounce off the walls
        if (box.x <= 0 || box.x + box.width >= screenWidth) box.vx = -box.vx;
        if (box.y <= 0 || box.y + box.height >= screenHeight) box.vy = -box.vy;
        if (box.z <= -perspective || box.z >= perspective) box.vz = -box.vz;

        createBox(box.x, box.y, box.z, box.width, box.height, box.name);
      });
    };

    const animate = () => {
      drawScene();
      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    initializeCanvas();

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [domainNames, centralComponent, lineColor, textColor, backgroundColor]);

  return (
    <div style={{ position: "absolute", bottom: 0, width: "99vw", height: "100vh", zIndex: -100 }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
        }}
      />

      {/* Render central JSX component */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
          width: `${centralSize}px`,
          height: `${centralSize}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {centralComponent}
      </div>
    </div>
  );
};

export default FloatingDomainMap2D;