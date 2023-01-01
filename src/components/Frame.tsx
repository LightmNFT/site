import { motion } from "framer-motion";
import { ReactNode } from "react";
import Refresh from "./Refresh";

export interface IFrame extends React.PropsWithChildren {
  title: ReactNode;
  description: ReactNode;
  fill: string;
  stroke: string;
  className?: string;
  textClassName?: string;
  viewBox?: string;
  onRefresh?: () => void;
}

export const FIXED_FRAME_SIDE_LEN = 1080;

export default function Frame({
  children,
  textClassName,
  fill,
  stroke,
  className,
  title,
  description,
  viewBox = `0 0 ${FIXED_FRAME_SIDE_LEN} ${FIXED_FRAME_SIDE_LEN}`,
  onRefresh = () => {},
}: IFrame) {
  return (
    <div
      className={`bg-white dark:bg-black box-border min-w-full overflow-hidden aspect-square relative border-black border-4 rounded-2xl dark:border-white${
        className ? ` ${className}` : ""
      }`}
      style={{
        maxWidth: "min(640px,38%)",
        maxHeight: "100%",
      }}
    >
      <motion.svg
        width={FIXED_FRAME_SIDE_LEN}
        height={FIXED_FRAME_SIDE_LEN}
        viewBox={viewBox}
        className="w-full h-full object-contain mix-blend-difference"
        initial="hidden"
        animate="visible"
        fill={fill}
        stroke={stroke}
      >
        {children}
      </motion.svg>

      <div
        className={`absolute top-2 right-2 flex items-center${
          textClassName ? ` ${textClassName}` : ""
        }`}
      >
        <div className="text-white selection:text-black selection:bg-white flex flex-col items-end cursor-default">
          <span className="text-2xl mix-blend-difference">{title}</span>
          <span className="text-md mix-blend-difference">{description}</span>
        </div>
        <span className="cursor-pointer">
          <Refresh color={"#fff"} onClick={onRefresh} />
        </span>
      </div>
    </div>
  );
}
