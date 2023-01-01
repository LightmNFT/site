import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Frame from "./components/Frame";
import { sleep } from "./utils";

export default function EconomicalFrame() {
  const [flag, setFlag] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    (async () => {
      controls.stop();

      controls.set({
        translateY: -24,
        strokeWidth: 2,
      });

      controls.start({
        translateY: -4,
        transition: {
          duration: 1.2,
          type: "spring",
          stiffness: 800,
          damping: 30,
        },
      });

      await sleep(1500);

      controls.start({
        translateY: [-4, -3, -2, -1, 0],
        pathLength: [1, 0.6, 0.3, 0, 0],
        transition: {
          duration: 0.8,
          ease: "linear",
        },
      });
    })();
  });

  return (
    <Frame
      key={flag}
      title="Economical"
      description="Significantly reduce redundant contracts"
      stroke="#fff"
      fill="#fff"
      viewBox="0 -8 16 24"
      onRefresh={() => setFlag(flag + 1)}
    >
      <motion.path
        animate={controls}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5z"
      />
    </Frame>
  );
}
