
// from and to included
// if only from is provided it is inferred as length returns [0,from)
export function range(from: number, to?: number) {
  if (!to) {
    to = from - 1;
    from = 0;
  }
  return new Array(to - from + 1).fill(0).map((_, i) => from + i);
}

export function randFromRange(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

