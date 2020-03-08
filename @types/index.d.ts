type SelectivePartial<T, D extends keyof T> = { [K in keyof T]: K extends D ? T[K] | undefined : T[K] };
type TypeOfProperty<T, K> = K extends keyof T ? T[K] : never;

declare module '*.png';
declare module '*.jpg';
