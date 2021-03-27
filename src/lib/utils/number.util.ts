export function range(from: number, to: number) {
  return new Array(to - from + 1).fill(0).map((_, i) => from + i);
}

export function randFromRange(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function pascalCase(s: string) {
  return s.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}
