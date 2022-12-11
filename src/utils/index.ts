export async function sleep(duration: number) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
