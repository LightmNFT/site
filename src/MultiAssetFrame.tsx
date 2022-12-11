import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import Frame, { FIXED_FRAME_SIDE_LEN } from "./components/Frame";
import { getRandomPolygon, sleep } from "./utils";

const STROKE_WIDTH = 16;

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
          points: getRandomPolygon({ sideLen: FIXED_FRAME_SIDE_LEN }),
        });

        controls.start({
          scale: [1, 1.25, 1.5, 1.25, 1],
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
