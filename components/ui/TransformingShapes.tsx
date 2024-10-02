import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TransformingShapesProps {
  objectSize?: number;
  shapeColors?: {
    square?: string;
    circle?: string;
    triangle?: string;
    x?: string;
  };
  transitionDuration?: number;
}

const shapes = ["triangle","square", "circle", "x"] as const;
type ShapeType = typeof shapes[number];

const TransformingShapes: React.FC<TransformingShapesProps> = ({
  objectSize = 100,
  shapeColors = {
    square: "#FF5733",
    circle: "#33FF57",
    triangle: "#3357FF",
    x: "#F3FF33",
  },
  transitionDuration = 2,
}) => {
  const [currentShape, setCurrentShape] = useState<ShapeType>("square");

  useEffect(() => {
    const shapeIndex = shapes.indexOf(currentShape);
    const nextShape = shapes[(shapeIndex + 1) % shapes.length];

    const timer = setTimeout(() => {
      setCurrentShape(nextShape);
    }, transitionDuration * 1000);

    return () => clearTimeout(timer);
  }, [currentShape, transitionDuration]);

  const renderShape = () => {
    switch (currentShape) {
      case "square":
        return (
          <motion.div
            style={{
              width: objectSize,
              height: objectSize,
              border: `4px solid ${shapeColors.square || "#000"}`,
              backgroundColor: "transparent",
            }}
            animate={{ borderRadius: "0%" }}
            transition={{ duration: transitionDuration }}
          />
        );
      case "circle":
        return (
          <motion.div
            style={{
              width: objectSize,
              height: objectSize,
              border: `4px solid ${shapeColors.circle || "#000"}`,
              backgroundColor: "transparent",
            }}
            animate={{ borderRadius: "50%" }}
            transition={{ duration: transitionDuration }}
          />
        );
      case "triangle":
        return (
          <motion.div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${objectSize / 2}px solid transparent`,
              borderRight: `${objectSize / 2}px solid transparent`,
              borderBottom: `4px solid ${shapeColors.triangle || "#000"}`,
            }}
            animate={{
              rotate: 0,
            }}
            transition={{ duration: transitionDuration }}
          />
        );
      case "x":
        return (
          <motion.div
            style={{
              position: "relative",
              width: objectSize,
              height: objectSize,
            }}
            transition={{ duration: transitionDuration }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 4,
                height: objectSize,
                backgroundColor: shapeColors.x || "#000",
                transformOrigin: "center",
              }}
              animate={{ rotate: [0, 45] }}
              transition={{ duration: transitionDuration }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 4,
                height: objectSize,
                backgroundColor: shapeColors.x || "#000",
                transformOrigin: "center",
              }}
              animate={{ rotate: [0, -45] }}
              transition={{ duration: transitionDuration }}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderShape()}
    </div>
  );
};

export default TransformingShapes;