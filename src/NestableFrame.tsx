import { motion, useMotionValue, MotionProps } from "framer-motion";
import { useState } from "react";
import Frame, { FIXED_FRAME_SIDE_LEN } from "./components/Frame";

const SIDE_LEN = 224;
const RADIUS = 120;
const STROKE_WIDTH = 16;

const RX = SIDE_LEN / 5;
const TRIANGLE_SIDE_LEN = (2 / 3 ** (1 / 2)) * SIDE_LEN;

export default function NestableFrame() {
  const [flag, setFlag] = useState(0);

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
            y: 256,
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
  const triangleStartPoint = [
    720 - TRIANGLE_SIDE_LEN / 2,
    FIXED_FRAME_SIDE_LEN / 2 - SIDE_LEN / 2,
  ];
  const circlePoint = [FIXED_FRAME_SIDE_LEN / 2, 384];
  const rectPoint = [
    360 - SIDE_LEN / 2,
    FIXED_FRAME_SIDE_LEN / 2 - SIDE_LEN / 2,
  ];

  const rectX = useMotionValue(rectPoint[0]);
  const rectY = useMotionValue(rectPoint[1]);

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
      <motion.rect
        width={SIDE_LEN}
        height={SIDE_LEN}
        x={rectX}
        y={rectY}
        rx={RX}
        strokeWidth={STROKE_WIDTH}
        variants={draw}
      />
      <motion.polygon
        points={`${triangleStartPoint[0]},${triangleStartPoint[1]} 720,652 ${
          triangleStartPoint[0] + TRIANGLE_SIDE_LEN
        },${triangleStartPoint[1]}`}
        strokeLinejoin="round"
        strokeWidth={STROKE_WIDTH}
        variants={draw}
      />
      <motion.line
        x1={circlePoint[0]}
        y1={circlePoint[1]}
        x2={rectX.get() + SIDE_LEN / 2}
        y2={rectY.get() + SIDE_LEN / 2 + 256}
        strokeWidth={STROKE_WIDTH}
        variants={draw}
        custom="line"
      />
      <motion.line
        x1={circlePoint[0]}
        y1={circlePoint[1]}
        x2={rectPoint[0] + (TRIANGLE_SIDE_LEN * 0.8) / 2 + 360}
        y2={rectPoint[1] + (TRIANGLE_SIDE_LEN * 0.8) / 2 + 256}
        strokeWidth={STROKE_WIDTH}
        variants={draw}
        custom="line"
      />
    </Frame>
  );
}
