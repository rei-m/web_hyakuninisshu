export interface Karuta {
  id: number;
  imageNo: string;
}

export interface OptionItem<T> {
  readonly name: string;
  readonly value: T;
}
