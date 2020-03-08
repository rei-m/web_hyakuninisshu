import { KarutaNo } from '@src/domain/models';

export const paths = {
  about: () => '/about/' as const,
  exam: () => '/exam/' as const,
  examQuestion: () => '/exam/question/' as const,
  examResult: () => '/exam/result/' as const,
  karutas: () => '/karutas/' as const,
  karutasShow: (karutaNo: KarutaNo) => `/karutas/${karutaNo}/`,
  root: () => '/' as const,
  training: () => '/training/' as const,
  trainingQuestion: () => '/training/question/' as const,
  trainingResult: () => '/training/result/' as const,
};
