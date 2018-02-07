export interface Karuta {
  id: number;
  imageNo: string;
}

export interface Question {
  correctKaruta: Karuta;
  choices: Karuta[];
}

export interface OptionItem<T> {
  readonly name: string;
  readonly value: T;
}
