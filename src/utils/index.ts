export async function sleep(duration: number) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomPolygon(sideLen: number) {
  const cx = sideLen / 2;
  const cy = sideLen / 2;
  const r = random(192, 480);
  const sides = random(3, 16);

  let points = "";
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 2 * Math.PI;
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    points += `${x},${y} `;
  }

  return points.trim();
}