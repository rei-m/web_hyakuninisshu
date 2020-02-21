export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomizeArray = <T>(array: T[]): T[] => {
  const dup = [...array];
  for (let i = dup.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = dup[i];
    dup[i] = dup[r];
    dup[r] = tmp;
  }
  return dup;
};
