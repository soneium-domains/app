import React, { useEffect, useRef } from "react";

// Define types for the props
interface CanvasComponentProps {
  boxSize?: number;
  text?: string;
  style?: {};
  startX?: number;
  startY?: number;
  shadowColor?: string;
  colors?: string | string[]; // Accept either a single color or an array of colors for boxes
  bgColor?: string[]; // Accept an array of two colors for the light gradient
}

// Light and Position interfaces
interface Light {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

// Define the component
const Canvas3DText: React.FC<CanvasComponentProps> = ({
  boxSize = 10,
  text = "Soneium Domains",
  style = {},
  colors = "#c1aaff", // Default box color
  shadowColor = "#282354",
  bgColor = ["#6343bb", "#31225e"], // Default gradient colors for the light
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<Light>({ x: 140, y: 270 });
  const targetLightRef = useRef<Light>({ x: 140, y: 270 }); 
  const boxesRef = useRef<Box[]>([]); // Store the boxes in a ref
  const spacing = boxSize * 2;
  const wordSpacing = boxSize * 2;
  const smoothingSpeed = 0.04;
  const calculateTotalTextWidth = (): number => {
    let totalWidth = 0;
    for (let letter of text) {
      totalWidth += getLetterSpacing(letter.toUpperCase()) * spacing;
      totalWidth += wordSpacing;
    }
    return totalWidth;
  };

  // Function to get spacing based on the letter
  const getLetterSpacing = (letter: string): number => {
    switch (letter) {
      case "M":
      case "W":
      case "X":
      case "Z":
      case "N":
      case "V":
      case "Y":
      case "Q":
        return 5;
      case "K":
      case "G":
      case "O":
      case "D":
        return 4;
      case "I":
        return 2;
      default:
        return 3;
    }
  };

  // Function to generate positions for each letter
  const getLetterPositions = (word: string): Position[] => {
    const positions: Position[] = [];
    const totalTextWidth = calculateTotalTextWidth();
    let currentX = (window.innerWidth - totalTextWidth) / 2; // Center the text
    currentX += wordSpacing * 3;
  
    const letterShapes = {
      A: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 2],
        [2, 1],
        [2, 2],
        [2, 3],
        [0, 4],
        [2, 4],
      ],
      B: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 0],
        [1, 2],
        [1, 4],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      C: [
        [0, 1],
        [0, 2],
        [1, 0],
        [0, 3],
        [1, 4],
        [2, 0],
        [2, 4],
      ],
      D: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 4],
        [3, 3],
        [3, 1],
        [3, 2],
        [0, 4],
        [2, 0],
        [2, 4],
      ],
      E: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 2],
        [2, 2],
        [2, 0],
        [0, 4],
        [1, 4],
        [2, 4],
      ],
      F: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 0],
        [1, 2],
        [2, 2],
        [2, 0],
      ],
      G: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 0],
        [2, 4],
        [1, 4],
        [2, 0],
        [2, 2],
        [3, 2],
        [3, 3],
      ],
      H: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
      ],
      I: [
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      J: [
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
        [0, 4],
      ],
      K: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 2],
        [2, 3],
        [3, 4],
        [2, 1],
        [3, 0],
      ],
      L: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 4],
        [2, 4],
      ],
      M: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 1],
        [2, 2],
        [3, 1],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      N: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      O: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [2, 0],
        [1, 4],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      P: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 0],
        [1, 2],
        [2, 1],
      ],
      Q: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [2, 0],
        [1, 4],
        [2, 2],
        [2, 4],
        [4, 4],
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      R: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 0],
        [1, 2],
        [2, 1],
        [2, 3],
        [2, 4],
      ],
      S: [
        [0, 0],
        [0, 1],
        [0, 2],
        [2, 0],
        [1, 0],
        [1, 2],
        [2, 2],
        [2, 3],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      T: [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      U: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 4],
        [0, 4],
        [2, 4],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      V: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 3],
        [4, 2],
        [4, 1],
        [4, 0],
      ],
      W: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 3],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      X: [
        [0, 0],
        [0, 4],
        [1, 1],
        [1, 3],
        [3, 1],
        [2, 2],
        [4, 0],
        [3, 3],
        [4, 4],
      ],
      Y: [
        [0, 0],
        [2, 4],
        [1, 1],
        [2, 3],
        [3, 1],
        [2, 2],
        [4, 0],
      ],
      Z: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [1, 3],
        [2, 2],
        [3, 1],
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
      ],
      "0": [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      "1": [
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
      ],
      "2": [
        [0, 0],
        [0, 3],
        [1, 0],
        [1, 2],
        [2, 1],
        [2, 3],
      ],
      "3": [
        [0, 0],
        [0, 3],
        [1, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      "4": [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      "5": [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 2],
        [2, 3],
      ],
      "6": [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 2],
        [1, 3],
        [2, 0],
        [2, 2],
        [2, 3],
      ],
      "7": [
        [0, 0],
        [0, 3],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
      ],
      "8": [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 1],
        [1, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      "9": [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 1],
        [1, 3],
        [2, 0],
        [2, 3],
      ],
    };

    for (let letter of word.toUpperCase()) {
      //@ts-ignore
      const letterShape = letterShapes[letter];
      if (letterShape) {
        for (const [x, y] of letterShape) {
          positions.push({ x: currentX + x * spacing, y: window.innerHeight / 3.6 + y * spacing });
        }
        currentX += getLetterSpacing(letter) * spacing;
      }
      currentX += wordSpacing;
    }
  
    return positions;
  };


  // Function to draw the light effect with customizable background colors
  const drawLight = (ctx: CanvasRenderingContext2D, light: Light) => {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      light.x,
      light.y,
      0,
      light.x,
      light.y,
      1000
    );
    gradient.addColorStop(0, bgColor[0]);
    gradient.addColorStop(1, bgColor[1]);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
    // const smallGradient = ctx.createRadialGradient(
    //   light.x,
    //   light.y,
    //   0,
    //   light.x,
    //   light.y,
    //   5
    // );
    // smallGradient.addColorStop(0, "#fff");
    // smallGradient.addColorStop(1, bgColor[0]);
    // ctx.fillStyle = smallGradient;
    // ctx.fill();
  };

  // Box class to define each box and its behavior
  class Box {
    half_size: number;
    x: number;
    y: number;
    color: string;
    shadow_length: number;

    constructor(x: number, y: number) {
      this.half_size = boxSize;
      this.x = x;
      this.y = y;

      // Determine if colors is an array or a single color
      if (Array.isArray(colors)) {
        this.color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        this.color = colors;
      }

      this.shadow_length = 2000;
    }

    getDots() {
      const p1 = { x: this.x - this.half_size, y: this.y - this.half_size };
      const p2 = { x: this.x + this.half_size, y: this.y - this.half_size };
      const p3 = { x: this.x + this.half_size, y: this.y + this.half_size };
      const p4 = { x: this.x - this.half_size, y: this.y + this.half_size };
      return { p1, p2, p3, p4 };
    }

    drawShadow(ctx: CanvasRenderingContext2D, light: Light) {
      const dots : any = this.getDots();
      let points = [];

      for (const dot in dots) {
        const angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
        const endX =
          dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
        const endY =
          dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
        points.push({ endX, endY, startX: dots[dot].x, startY: dots[dot].y });
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const n = i === 3 ? 0 : i + 1;
        ctx.beginPath();
        ctx.moveTo(points[i].startX, points[i].startY);
        ctx.lineTo(points[n].startX, points[n].startY);
        ctx.lineTo(points[n].endX, points[n].endY);
        ctx.lineTo(points[i].endX, points[i].endY);
        ctx.fillStyle = shadowColor;
        ctx.fill();
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      const dots = this.getDots();
      ctx.beginPath();
      ctx.moveTo(dots.p1.x, dots.p1.y);
      ctx.lineTo(dots.p2.x, dots.p2.y);
      ctx.lineTo(dots.p3.x, dots.p3.y);
      ctx.lineTo(dots.p4.x, dots.p4.y);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const smoothTransition = () => {
    const light = lightRef.current;
    const targetLight = targetLightRef.current;

    // Linear interpolation formula: current = current + (target - current) * smoothingSpeed
    light.x += (targetLight.x - light.x) * smoothingSpeed;
    light.y += (targetLight.y - light.y) * smoothingSpeed;

    requestAnimationFrame(smoothTransition);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    lightRef.current = { x: window.innerWidth / 3 , y: window.innerHeight / 2.4 };
    targetLightRef.current = { ...lightRef.current }; // Initialize target light position

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLight(ctx, lightRef.current);

      // Draw the shadows and boxes
      boxesRef.current.forEach((box) => box.drawShadow(ctx, lightRef.current));
      boxesRef.current.forEach((box) => box.draw(ctx));

      requestAnimationFrame(draw);
    };

    const initBoxes = () => {
      const letterPositions = getLetterPositions(text);
      boxesRef.current = letterPositions.map((pos) => new Box(pos.x, pos.y));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initBoxes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      console.log(e)
      targetLightRef.current.x = e.clientX - rect.left;
      targetLightRef.current.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      console.log(touch)
      targetLightRef.current.x = touch.clientX - rect.left;
      targetLightRef.current.y = touch.clientY - rect.top;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    resizeCanvas();
    draw();
    smoothTransition(); // Start the smooth transition loop

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [text, boxSize, colors, bgColor]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        backgroundColor: bgColor[1],
        transition: 'all 0.3s ease-out',
        ...style
      }}
    />
  );
};

export default Canvas3DText;
