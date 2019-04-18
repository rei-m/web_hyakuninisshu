type SelectivePartial<T, D extends keyof T> = { [K in keyof T]: (K extends D ? T[K] | undefined : T[K]) };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare module '*.png';
declare module '*.jpg';
