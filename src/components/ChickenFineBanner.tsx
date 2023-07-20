import { motion } from "framer-motion";

const chickenFineLink = "https://chicken-fine-site.vercel.app/";

export default function ChickenFineBanner() {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.2,
        type: "spring",
        damping: 25,
      }}
      className="fixed flex justify-center items-center rounded-xl overflow-hidden right-8 bottom-8 max-lg:right-auto z-50 w-[42%] max-2xl:w-[54%] max-lg:w-[94%]"
    >
      <div className="absolute z-20 p-2">
        <div className="flex flex-col items-center gap-4 pt-16">
          <h1 className="text-5xl max-sm:text-2xl">
            Our flagship is on the way!
          </h1>
          <a
            className="text-3xl max-md:text-base link-button"
            href={chickenFineLink}
            target="_blank"
          >
            <span>Check!</span>
          </a>
        </div>
      </div>
      <div className="absolute z-20 top-4 left-4 flex gap-2 items-center">
        <img
          src="/icon.png"
          alt="chicken_fine_icon"
          className="w-24 h-24 max-md:w-12 max-md:h-12"
        />
        <h2 className="text-3xl">Chicken Fine</h2>
      </div>
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-white/30 dark:bg-black/30 z-10 backdrop-blur-sm"></div>
      <img src="/bg.png" alt="chicken_fine_bg" className="w-full" />
    </motion.div>
  );
}
