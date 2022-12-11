export async function sleep(duration: number) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

interface IPolygonConfig {
  sideLen: number;
  origin?: {
    x: number;
    y: number;
  };
  r?: { min: number; max: number };
  sides?: {
    min: number;
    max: number;
  };
}

export function getRandomPolygon({
  sideLen,
  origin,
  r,
  sides,
}: IPolygonConfig) {
  const cx = origin ? origin.x : sideLen / 2;
  const cy = origin ? origin.y : sideLen / 2;
  const _r = r ? random(r.min, r.max) : random(192, 384);
  const _sides = sides ? random(sides.min, sides.max) : random(3, 16);

  let points = "";
  for (let i = 0; i < _sides; i++) {
    const angle = (i / _sides) * 2 * Math.PI;
    const x = cx + _r * Math.sin(angle);
    const y = cy - _r * Math.cos(angle);
    points += `${x},${y} `;
  }

  return points.trim();
}
