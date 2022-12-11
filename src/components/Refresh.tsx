export default function Refresh({
  color,
  onClick,
}: {
  color?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      width="48"
      height="48"
      className="mix-blend-difference"
      fill={color || "auto"}
      onClick={onClick}
    >
      <path
        d="M832 512a32 32 0 0 0-32 32c0 158.784-129.216 288-288 288s-288-129.216-288-288 129.216-288 288-288c66.208 0 129.536 22.752 180.608 64H608a32 32 0 0 0 0 64h160a32 32 0 0 0 32-32V192a32 32 0 0 0-64 0v80.96A350.464 350.464 0 0 0 512 192C317.92 192 160 349.92 160 544s157.92 352 352 352 352-157.92 352-352a32 32 0 0 0-32-32"
        p-id="1361"
      ></path>
    </svg>
  );
}
