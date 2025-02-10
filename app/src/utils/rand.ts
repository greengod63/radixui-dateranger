var seed = Math.random();

const setSeed = (s) => {
  seed = s;
};

const item = (arr: Array<unknown>): unknown => {
  return arr[between(0, arr.length - 1, true)];
};

const between = (min: number, max: number, round: boolean = true): number => {
  let r;
  if (round == null) {
    round = false;
  }
  r = Math.sin(seed++) * 1000000;
  r = r - Math.floor(r);
  r = r * (max - min) + min;
  if (round) {
    return Math.round(r);
  }
  return r;
};

const max = (maxNumber: number, round: boolean = true): number => {
  return between(0, maxNumber, round);
};

const num = (): number => {
  return between(0, 1, false);
};

const bool = (): boolean => {
  return between(0, 1, true) === 0;
};

const shuffle = (arr: Array<any>): Array<any> => {
  arr = arr.slice();
  const shuffled: any = [];
  while (arr.length) {
    shuffled.push(arr.splice(between(0, arr.length - 1), 1)[0]);
  }
  return shuffled;
};

export default { num, bool, max, between, item, setSeed, shuffle };
