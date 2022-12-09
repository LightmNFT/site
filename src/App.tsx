import * as ZR from "zrender";
import CanvasPainter from "zrender/lib/canvas/Painter";
import Zdog from "zdog";
import { useCallback, useEffect, useState } from "react";
import Canva from "./components/Canvas";
import { sleep } from "./utils";

ZR.registerPainter("canvas", CanvasPainter);

const TRANSPARENT = "rgba(0,0,0,0)";
const WHITE = "white";
const BLACK = "black";

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

  const renderNestable = useCallback(
    async (stage: ZR.ZRenderType) => {
      if (stage) {
        const stageWidth = stage.getWidth();
        const stageHeight = stage.getHeight();
        const radius = Math.min(stageWidth, stageHeight) / 12;
        const sideLen = (radius * 224) / 128;

        const NFTA = new ZR.Circle({
          shape: {
            cx: stageWidth / 3,
            cy: stageHeight / 2,
            r: radius,
          },
          style: { fill: TRANSPARENT },
          silent: true,
        });

        const NFTB = new ZR.Rect({
          shape: {
            x: (stageWidth * 2) / 3 - sideLen / 2,
            y: stageHeight / 2 - sideLen / 2,
            width: sideLen,
            height: sideLen,
            r: 8,
          },
          style: { fill: TRANSPARENT },
          silent: true,
        });

        stage.add(NFTA);
        stage.add(NFTB);

        NFTA.animate("style").when(500, { fill: themeColor }).start();
        NFTA.animate("shape")
          .delay(500)
          .when(500, {
            cx: stageWidth / 2,
            cy: stageHeight / 3,
          })
          .start();

        NFTB.animate("style")
          .when(500, {
            fill: themeColor,
          })
          .start();
        NFTB.animate("shape")
          .delay(500)
          .when(500, {
            x: stageWidth / 2 - sideLen / 2,
            y: (stageHeight * 2) / 3 - sideLen / 2,
          })
          .done(drawLine)
          .start();

        function drawLine() {
          const NFTARect = NFTA.getBoundingRect();
          const NFTBRect = NFTB.getBoundingRect();
          const startPoint = { x: NFTBRect.x + sideLen / 2, y: NFTBRect.y };
          const finalPoint = {
            x: NFTARect.x + radius,
            y: NFTARect.y + radius * 2,
          };

          const line = new ZR.Line({
            shape: {
              x1: startPoint.x,
              y1: startPoint.y,
              x2: startPoint.x,
              y2: startPoint.y,
            },
            style: { stroke: themeColor, fill: themeColor, lineWidth: 4 },
            silent: true,
          });

          stage.add(line);

          line
            .animate("shape")
            .when(800, {
              x1: startPoint.x,
              y1: startPoint.y,
              x2: finalPoint.x,
              y2: finalPoint.y,
            })
            .start();
        }
      }
    },
    [themeColor]
  );

  const renderMultiAsset = useCallback(
    async (stage: ZR.ZRenderType) => {
      if (stage) {
        const stageWidth = stage.getWidth() / 2;
        const stageHeight = stage.getHeight() / 2;
        const radius = Math.min(stageWidth, stageHeight) / 12;
        const sideLen = (radius * 224) / 128;

        const NFTC = new ZR.Isogon({
          shape: {
            n: 6,
            r: sideLen * 2,
            x: stageWidth,
            y: stageHeight,
          },
          style: {
            fill: TRANSPARENT,
          },
          silent: true,
        });

        stage.add(NFTC);

        NFTC.animate("style").when(500, { fill: themeColor }).start();
        NFTC.animate("shape")
          .delay(500)
          .when(500, { n: 8 })
          .when(1000, { n: 8 })
          .when(1500, { n: 4 })
          .when(2000, { n: 4 })
          .when(2500, { n: 6 })
          .start();
      }
    },
    [themeColor]
  );

  const renderComposable = useCallback(async (illo: Zdog.Illustration) => {
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

    const startY = -containerHeight - 20;
    const endY = containerHeight / 6;
    const diffrence = endY - startY;

    rainbowColors.forEach(async (color, i) => {
      await sleep(i * 800);

      const semiRing = new Zdog.Ellipse({
        addTo: illo,
        diameter: containerWidth / 3 + i * 2 * 43,
        quarters: 2,
        stroke: 40,
        color,
        rotate: { z: -Zdog.TAU / 4, x: -Zdog.TAU / 120 },
        translate: { y: startY },
      });

      let tick = 0;
      const cycle = 90;

      const animate = () => {
        const progress = tick / cycle;
        const tween = Zdog.easeInOut(progress, 3);

        semiRing.translate.y = startY + diffrence * tween;

        tick++;

        if (semiRing.translate.y <= endY) {
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
        <Canva
          id="nestable"
          title="Nestable"
          description="NFT can own NFT"
          color={themeColor}
          autoplay
          render={renderNestable}
        />
        <Canva
          id="multi-asset"
          title="Multi Asset"
          description="NFT can have multiple output"
          color={themeColor}
          autoplay
          render={renderMultiAsset}
        />
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
