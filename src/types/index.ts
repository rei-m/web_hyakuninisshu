import { RouteComponentProps } from '@reach/router';

export interface SiteMetaData {
  title: string;
  description: string;
  author: string;
}

export type GeneratedPageComponentProps<T = {}> = { pageContext: T } & RouteComponentProps<T>;

export type Kimariji = 1 | 2 | 3 | 4 | 5 | 6;

export type Color = 'blue' | 'pink' | 'yellow' | 'green' | 'orange';

export interface Karuta {
  readonly id: string;
  readonly no: number;
  readonly imageNo: string;
  readonly creator: string;
  readonly firstKanji: string;
  readonly firstKana: string;
  readonly secondKanji: string;
  readonly secondKana: string;
  readonly thirdKanji: string;
  readonly thirdKana: string;
  readonly fourthKanji: string;
  readonly fourthKana: string;
  readonly fifthKanji: string;
  readonly fifthKana: string;
  readonly kimariji: Kimariji;
  readonly color: Color;
  readonly translation: string;
}

export interface YomiFuda {
  readonly questionId: number;
  readonly karutaNo: number;
  readonly firstText: string;
  readonly secondText: string;
  readonly thirdText: string;
}

export interface ToriFuda {
  readonly questionId: number;
  readonly karutaNo: number;
  readonly fourthText: string;
  readonly fifthText: string;
}

export interface Question {
  readonly id: number;
  readonly correctKaruta: Karuta;
  readonly yomiFuda: YomiFuda;
  readonly toriFudas: ToriFuda[];
}

export interface Answer {
  readonly questionId: number;
  readonly karutaNo: number;
  readonly correct: boolean;
  readonly time: number;
}
