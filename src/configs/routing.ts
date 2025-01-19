import type { KarutaNo } from '@/domains/models';

export const ROUTING = {
  about: () => '/about/',
  exam: () => '/exam/',
  examQuestion: () => '/exam/question/',
  examResult: () => '/exam/result/',
  karutas: () => '/karutas/',
  karutasShow: (karutaNo: KarutaNo) => `/karutas/${karutaNo}/`,
  root: () => '/',
  training: () => '/training/',
  trainingQuestion: () => '/training/question/',
  trainingResult: () => '/training/result/',
} as const;
