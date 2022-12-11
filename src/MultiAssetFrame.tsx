import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import Frame, { FIXED_FRAME_SIDE_LEN } from "./components/Frame";
import { random, sleep } from "./utils";

const STROKE_WIDTH = 16;

function getRandomPolygon() {
  const cx = FIXED_FRAME_SIDE_LEN / 2;
  const cy = FIXED_FRAME_SIDE_LEN / 2;
  const r = random(192, 480);
  const sides = random(3, 16);

  let points = "";
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 2 * Math.PI;
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    points += `${x},${y} `;
  }

  return points.trim();
}

export default function MultiAssetFrame() {
  const controls = useAnimationControls();
  const initPoints = `${FIXED_FRAME_SIDE_LEN / 2},${FIXED_FRAME_SIDE_LEN / 2}`;
  const [flag, setFlag] = useState(0);

  const startAnimation = useCallback(() => {
    (async () => {
      controls.stop();
      for (let i = 0; i < 3; i++) {
        controls.set({
          fill: "#0000",
          stroke: "#fff",
          points: getRandomPolygon(),
        });

        controls.start({
          pathLength: [0, 0.2, 0.5, 0.8, 1],
          rotate: [0, 90, 180, 90, 0],
          transition: {
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          },
        });

        await sleep(1000);

        controls.start({
          fill: "#fff",
          stroke: "#0000",
          transition: {
            duration: 1,
            type: "spring",
          },
        });

        await sleep(1200);
      }
    })();
  }, []);

  useEffect(() => {
    startAnimation();
  });

  return (
    <Frame
      title="Multi Asset"
      description="NFT can have multiple output"
      fill="#0000"
      stroke="#fff"
      onRefresh={() => setFlag(flag + 1)}
    >
      <motion.polygon
        style={{ transformOrigin: "center" }}
        animate={controls}
        points={initPoints}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        strokeLinejoin="round"
        strokeWidth={STROKE_WIDTH}
      />
    </Frame>
  );
}
