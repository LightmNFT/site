import * as ZR from "zrender";
import Zdog from "zdog";
import { useCallback, useEffect, useRef } from "react";
import Refresh from "./Refresh";

interface ICanvas {
  id: string;
  is3D?: boolean;
  title: string;
  description: string;
  autoplay: boolean;
  color?: string;
  className?: string;
  textClassName?: string;
  render?: (stage: ZR.ZRenderType) => void;
  render3D?: (illo: Zdog.Illustration) => void;
}

export default function Canvas({
  id,
  is3D,
  title,
  description,
  autoplay,
  color,
  className,
  textClassName,
  render,
  render3D,
}: ICanvas) {
  const domRef = useRef<HTMLDivElement>(null);
  const dom3DRef = useRef<HTMLCanvasElement>();

  const stageRef = useRef<ZR.ZRenderType>();
  const illoRef = useRef<Zdog.Illustration>();

  id = `example-display-container-${id}`;

  const init = useCallback(() => {
    const stage = ZR.init(domRef.current);

    stageRef.current = stage;
  }, []);

  const init3D = useCallback(() => {
    const container = domRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = container.clientWidth * 2;
    canvas.height = container.clientHeight * 2;

    if (dom3DRef.current) {
      dom3DRef.current.remove();
    }

    container.appendChild(canvas);

    const illo = new Zdog.Illustration({
      element: canvas,
      dragRotate: true,
    });

    canvas.style.cursor = "move";
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;

    illoRef.current = illo;
    dom3DRef.current = canvas;

    function animate() {
      illo.updateRenderGraph();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const reRender = useCallback(() => {
    stageRef.current?.clear();
    render && render(stageRef.current!);
  }, [render]);

  const reRender3D = useCallback(() => {
    init3D();
    render3D && render3D(illoRef.current!);
  }, [init3D]);

  useEffect(() => {
    (is3D ? init3D : init)();

    if (autoplay) {
      (is3D ? reRender3D : reRender)();
    }
  }, []);

  useEffect(() => {
    (is3D ? reRender3D : reRender)();
  }, [reRender, reRender3D]);

  return (
    <div
      className={`box-border min-w-full aspect-square relative border-black border-4 rounded-2xl dark:border-white${
        className ? ` ${className}` : ""
      }`}
      style={{
        maxWidth: "min(640px,38%)",
        maxHeight: "100%",
      }}
    >
      <div className="w-full h-full relative" ref={domRef} id={id}></div>
      <div
        className={`absolute top-2 right-2 flex items-center${
          textClassName ? ` ${textClassName}` : ""
        }`}
      >
        <div className="flex flex-col items-end cursor-default">
          <span className="text-2xl">{title}</span>
          <span className="text-md">{description}</span>
        </div>
        <span className="cursor-pointer hover:scale-110 transition-transform">
          <Refresh color={color} onClick={is3D ? reRender3D : reRender} />
        </span>
      </div>
    </div>
  );
}
