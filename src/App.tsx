import * as ZR from "zrender";
import CanvasPainter from "zrender/lib/canvas/Painter";
import Zdog from "zdog";
import { useCallback, useEffect, useState } from "react";
import Canva from "./components/Canvas";
import { sleep } from "./utils";
import NestableFrame from "./NestableFrame";
import MultiAssetFrame from "./MultiAssetFrame";

ZR.registerPainter("canvas", CanvasPainter);

const TRANSPARENT = "rgba(0,0,0,0)";
const WHITE = "rgba(255,255,255,1)";
const BLACK = "rgba(0,0,0,1)";

const RMRK_THEME_COLOR = "#ca2a77";
const EIP_2535_THEME_COLOR = "#53e6f8";

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
    <div className="p-4 dark:bg-black dark:text-white font-semibold flex flex-col items-center gap-4 w-full min-h-screen">
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
      <p className="self-start text-xl">
        Next generation decentralized NFT platform.
        <p>©{new Date().getFullYear()} LightM Labs.</p>
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
    </div>
  );
}

export default App;
