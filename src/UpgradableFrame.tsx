import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Frame from "./components/Frame";
import { sleep } from "./utils";

const lockBeamPath = "M10 9 v-3 a2 2 0 1 0 -4 0 v2";
const lockBodyPath = "M4 8 h8 v5 h-8 z";

export default function UpgradableFrame() {
  const [flag, setFlag] = useState(0);
  const beamControls = useAnimationControls();
  const bodyControls = useAnimationControls();

  const variants: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, type: "spring" },
    },
    scale: {
      scale: 0.92,
      transition: {
        fill: { duration: 0.8, type: "spring" },
        scale: { duration: 0.8, type: "spring", bounce: 0.82 },
      },
    },
    translateY: {
      y: -1,
      transition: { duration: 0.5, type: "spring", bounce: 0.62 },
    },
    rotateY: {
      rotateY: 180,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 180,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    (async () => {
      beamControls.stop();
      bodyControls.stop();

      beamControls.set(variants.hidden);
      bodyControls.set(variants.hidden);
      beamControls.start(variants.visible);
      bodyControls.start(variants.visible);

      await sleep(1000);

      beamControls.start(variants.translateY);

      await sleep(800);

      bodyControls.start(variants.scale);

      beamControls.start(variants.rotateY);
    })();
  });

  return (
    <Frame
      key={flag}
      title="Upgradable"
      description="Optional upgradable contract"
      stroke="#fff"
      fill="#fff0"
      viewBox="0 0 16 16"
      onRefresh={() => setFlag(flag + 1)}
    >
      <motion.path
        style={{ originX: "62%" }}
        animate={beamControls}
        d={lockBeamPath}
      />
      <motion.path
        fill="#ffff"
        animate={bodyControls}
        d={lockBodyPath}
        strokeLinejoin="round"
      />
    </Frame>
  );
}
