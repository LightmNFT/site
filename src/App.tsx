import Zdog from "zdog";
import { useCallback, useEffect, useState } from "react";
import Canva from "./components/Canvas";
import { sleep } from "./utils";
import NestableFrame from "./NestableFrame";
import MultiAssetFrame from "./MultiAssetFrame";
import EconomicalFrame from "./EconomicalFrame";
import UpgradableFrame from "./UpgradableFrame";

const TRANSPARENT = "rgba(0,0,0,0)";
const WHITE = "rgba(255,255,255,1)";
const BLACK = "rgba(0,0,0,1)";

export const RMRK_THEME_COLOR = "#ca2a77";
export const EIP_2535_THEME_COLOR = "#53e6f8";

const githubLink = "https://github.com/orgs/LightmNFT/repositories";
const twitterLink = "https://twitter.com/LightmNFT";
const mailLink = "mailto:contact@lightm.xyz";

const planLink =
  "https://docs.google.com/presentation/d/16Ut2nVxYzLKM8X8QB9MRvKUpq1mMI82_/edit?usp=sharing&ouid=100859893654062893603&rtpof=true&sd=true";
const planLinkCN =
  "https://docs.google.com/presentation/d/15mes-6h-H-fSf_4nFLh7_BsiBE9qfW0l/edit?usp=sharing&ouid=100859893654062893603&rtpof=true&sd=true";

const githubSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const twitterSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
);

const mailSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
  </svg>
);

function App() {
  const [themeColor, setThemeColor] = useState(
    (() => {
      const query = window.matchMedia("(prefers-color-scheme: dark)");

      if (query.matches) {
        return WHITE;
      } else {
        return BLACK;
      }
    })()
  );

  const listenThemeChange = useCallback(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    function handleColorSchemeChange(e: MediaQueryListEvent) {
      if (e.matches) {
        setThemeColor(WHITE);
      } else {
        setThemeColor(BLACK);
      }
    }

    query.addEventListener("change", handleColorSchemeChange);
  }, []);

  const renderComposable = useCallback(async (illo: Zdog.Illustration) => {
    const isMobile = window.screen.width <= 640;
    const containerHeight = (illo.element.height as number) / devicePixelRatio;
    const containerWidth = (illo.element.width as number) / devicePixelRatio;

    const rainbowColors = [
      "#9400d3",
      "#4b0082",
      "#0000ff",
      "#00ff00",
      "#ffff00",
      "#ff7f00",
      "#ff0000",
    ];

    const strokeWidth = containerWidth / 32;

    const startY = -containerHeight - 20;
    const endY = containerHeight / 6;
    const diffrence = endY - startY;

    rainbowColors.forEach(async (color, i) => {
      await sleep(i * 800);

      const semiRing = new Zdog.Ellipse({
        addTo: illo,
        diameter: containerWidth / 3 + i * 2 * (strokeWidth + 2),
        quarters: 2,
        stroke: strokeWidth,
        color,
        rotate: { z: -Zdog.TAU / 4, x: -Zdog.TAU / 120 },
        translate: { y: isMobile ? endY : startY },
      });

      let tick = 0;
      const cycle = 90;

      const animate = () => {
        const progress = tick / cycle;
        const tween = Zdog.easeInOut(progress, 3);

        semiRing.translate.y = startY + diffrence * tween;

        tick++;

        if (semiRing.translate.y <= endY) {
          illo.updateRenderGraph();
          requestAnimationFrame(animate);
        }
      };

      animate();
    });

    illo.updateRenderGraph();
  }, []);

  useEffect(() => {
    listenThemeChange();
  }, []);

  return (
    <div className="p-4 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black dark:bg-black dark:text-white font-semibold flex flex-col items-center gap-4 w-full min-h-screen">
      <div className="self-start flex flex-wrap items-end gap-4">
        <div className="flex items-center">
          <picture className="inline md:w-24 sm:w-16 w-12">
            <source
              srcSet="LightmDark_logo.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img src="Lightm_logo.svg" />
          </picture>
          <h1 className="md:text-8xl sm:text-6xl text-4xl">Lightm</h1>
        </div>
        <span className="text-sm">
          Show respect to{" "}
          <a
            style={{ color: RMRK_THEME_COLOR }}
            className="hover:underline hover:underline-offset-4"
            href="https://rmrk.app"
          >
            RMRK
          </a>{" "}
          and{" "}
          <a
            style={{ color: EIP_2535_THEME_COLOR }}
            className="hover:underline hover:underline-offset-4"
            href="https://eips.ethereum.org/EIPS/eip-2535"
          >
            EIP-2535
          </a>
        </span>
      </div>
      <p className="self-start text-xl pb-4">
        Next generation decentralized NFT platform.
        <p>
          Vision, and short-term plans:{" "}
          <a className="underline underline-offset-4" href={planLink}>
            EN
          </a>{" "}
          <a className="underline underline-offset-4" href={planLinkCN}>
            CN
          </a>
        </p>
        <p>©{new Date().getFullYear()} LightM Labs.</p>
        <p className="flex gap-2">
          <a href={githubLink} target="_blank">
            {githubSvg}
          </a>
          <a href={twitterLink} target="_blank">
            {twitterSvg}
          </a>
          <a href={mailLink}>{mailSvg}</a>
        </p>
      </p>
      <div className="flex-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-4 w-full">
        <NestableFrame />
        <MultiAssetFrame />
        <Canva
          is3D
          className="colorful-box md:col-start-1 md:col-end-3 lg:col-auto"
          textClassName="colorful-text"
          id="composable"
          title="Composable"
          description="NFT can combine"
          color={themeColor}
          autoplay
          render3D={renderComposable}
        />
      </div>
      <div className="flex-auto grid md:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-4 w-full">
        <EconomicalFrame />
        <UpgradableFrame />
      </div>
    </div>
  );
}

export default App;
