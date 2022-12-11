import { motion, useMotionValue, MotionProps } from "framer-motion";
import { useState } from "react";
import Frame, { FIXED_FRAME_SIDE_LEN } from "./components/Frame";
import { getRandomPolygon } from "./utils";

const RADIUS = 120;
const STROKE_WIDTH = 16;

export default function NestableFrame() {
  const [flag, setFlag] = useState(0);

  const polygonSidesRange = { min: 3, max: 8 };
  const polygonRadiusRange = {
    min: (RADIUS * (3 ** 1 / 2)) / 2,
    max: RADIUS * 1.2,
  };
  const circlePoint = [FIXED_FRAME_SIDE_LEN / 2, FIXED_FRAME_SIDE_LEN / 3];
  const leftPoint = {
    x: FIXED_FRAME_SIDE_LEN / 3,
    y: FIXED_FRAME_SIDE_LEN / 2,
  };
  const rightPoint = {
    x: (FIXED_FRAME_SIDE_LEN / 3) * 2,
    y: FIXED_FRAME_SIDE_LEN / 2,
  };
  const translateY = (FIXED_FRAME_SIDE_LEN * 2) / 3 - FIXED_FRAME_SIDE_LEN / 2;

  const draw: MotionProps["variants"] = {
    hidden: (action: string) => {
      switch (action) {
        case "circle": {
          return {
            opacity: 0,
            scale: 1,
            fill: "#0000",
          };
        }
        case "line": {
          return {
            pathLength: 0,
          };
        }
        default:
          return { opacity: 0, fill: "#0000" };
      }
    },
    visible: (action: string) => {
      let delay = 0.2;

      switch (action) {
        case "circle": {
          delay += 3;

          return {
            opacity: 1,
            scale: 0.88,
            fill: "#fff",
            transition: {
              opacity: { delay, duration: 0.5 },
              scale: {
                delay: delay + 1,
                duration: 0.5,
                type: "spring",
                stiffness: 1200,
                damping: 16,
              },
              fill: {
                delay: delay + 1,
                duration: 0.5,
                type: "spring",
              },
            },
          };
        }
        case "line": {
          delay += 4;

          return {
            pathLength: 1,
            transition: {
              pathLength: {
                delay: delay + 0.5,
                duration: 1,
                type: "spring",
              },
            },
          };
        }
        default:
          return {
            opacity: 1,
            scale: 0.8,
            fill: "#fff",
            y: translateY,
            transition: {
              opacity: { delay, duration: 0.5 },
              y: {
                delay: delay + 1,
                duration: 1,
                type: "spring",
                stiffness: 1200,
                damping: 32,
              },
              fill: {
                delay: delay + 2,
                duration: 0.5,
                type: "spring",
              },
              scale: {
                delay: delay + 2,
                duration: 1,
                type: "spring",
                stiffness: 800,
                damping: 16,
              },
            },
          };
      }
    },
  };

  return (
    <Frame
      key={flag}
      title="Nestable"
      description="NFT can own NFT"
      stroke="#fff"
      fill="#fff"
      onRefresh={() => setFlag(flag + 1)}
    >
      <motion.circle
        r={RADIUS}
        cx={circlePoint[0]}
        cy={circlePoint[1]}
        variants={draw}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        custom="circle"
      />
      <motion.polygon
        points={getRandomPolygon({
          sideLen: FIXED_FRAME_SIDE_LEN,
          origin: leftPoint,
          sides: polygonSidesRange,
          r: polygonRadiusRange,
        })}
        strokeLinejoin="round"
        strokeWidth={STROKE_WIDTH}
        variants={draw}
      />
      <motion.polygon
        points={getRandomPolygon({
          sideLen: FIXED_FRAME_SIDE_LEN,
          origin: rightPoint,
          sides: polygonSidesRange,
          r: polygonRadiusRange,
        })}
        strokeLinejoin="round"
        strokeWidth={STROKE_WIDTH}
        variants={draw}
      />
      <motion.line
        x1={circlePoint[0]}
        y1={circlePoint[1]}
        x2={leftPoint.x}
        y2={leftPoint.y + translateY}
        strokeWidth={STROKE_WIDTH}
        variants={draw}
        custom="line"
      />
      <motion.line
        x1={circlePoint[0]}
        y1={circlePoint[1]}
        x2={rightPoint.x}
        y2={rightPoint.y + translateY}
        strokeWidth={STROKE_WIDTH}
        variants={draw}
        custom="line"
      />
    </Frame>
  );
}
