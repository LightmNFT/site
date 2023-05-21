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
const discordLink = "https://discord.gg/DNyqtwJ3Yu";
const mailLink = "mailto:contact@lightm.xyz";

const planLink =
  "https://docs.google.com/presentation/d/16Ut2nVxYzLKM8X8QB9MRvKUpq1mMI82_/edit?usp=sharing&ouid=100859893654062893603&rtpof=true&sd=true";
const planLinkCN =
  "https://lightm-intro-cn.netlify.app/";
const docsLink =
  "https://lightm.notion.site/Lightm-Introduction-Lightm-191dbf88db314e268abf75587867a036";
const appLink = "https://app.lightm.xyz";

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

const discordSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
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

const docsSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
  </svg>
);

const arrowSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
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
    <div className="px-8 py-2 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black dark:bg-black dark:text-white font-semibold flex flex-col items-center gap-4 w-full min-h-screen">
      <div className="self-start flex flex-wrap items-end gap-4">
        <div className="flex items-center">
          <picture className="inline 2xl:w-32 md:w-28 w-16">
            <source
              srcSet="LightmDark_logo.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img src="Lightm_logo.svg" />
          </picture>
          <h1 className="2xl:text-9xl md:text-8xl text-6xl">Lightm</h1>
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
        <p className="text-2xl basis-full">
          Next generation decentralized NFT platform.
          <p>
            Vision, and short-term plans:{" "}
            <a
              className="underline underline-offset-4"
              href={planLink}
              target="_blank"
            >
              EN
            </a>{" "}
            <a
              className="underline underline-offset-4"
              href={planLinkCN}
              target="_blank"
            >
              CN
            </a>
          </p>
        </p>
      </div>
      <div className="self-start flex flex-wrap gap-2">
        <div className="border-2 border-black dark:border-white rounded-xl text-lg p-1">
          <p>©{new Date().getFullYear()} LightM Labs.</p>
          <p className="flex gap-2">
            <a href={githubLink} target="_blank">
              {githubSvg}
            </a>
            <a href={twitterLink} target="_blank">
              {twitterSvg}
            </a>
            <a href={discordLink} target="_blank">
              {discordSvg}
            </a>
            <a href={mailLink}>{mailSvg}</a>
          </p>
        </div>
        <a href={docsLink} target="_blank" className="link-button">
          {docsSvg}
          <span>Check docs</span>
        </a>
        <a href={appLink} target="_blank" className="link-button">
          {arrowSvg}
          <span>Launch App (Alpha Stage)</span>
        </a>
      </div>
      <div className="container flex gap-4 2xl:gap-6 flex-wrap 2xl:flex-nowrap">
        <div className="flex-auto grid md:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-4 2xl:gap-6 w-full 2xl:w-[50%]">
          <NestableFrame />
          <MultiAssetFrame />
          <EconomicalFrame />
          <UpgradableFrame />
        </div>
        <div className="flex-auto w-full 2xl:w-[50%]">
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
      </div>
    </div>
  );
}

export default App;
