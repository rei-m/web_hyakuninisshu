import type { Question, QuestionId, KarutaNo } from '../models';
import { IllegalArgumentError } from '../errors';
import { getRandomInt, randomizeArray } from '../utils/array';

const createQuestion = (
  id: QuestionId,
  correctAnswerKarutaNo: KarutaNo,
  wrongKarutaNoList: [KarutaNo, KarutaNo, KarutaNo]
): Question => {
  if (wrongKarutaNoList.includes(correctAnswerKarutaNo)) {
    throw new IllegalArgumentError(`wrongKarutaNoList includes correctAnswerKarutaNo`);
  }

  const choiceKarutaNoList = randomizeArray(wrongKarutaNoList.concat(correctAnswerKarutaNo)) as [
    KarutaNo,
    KarutaNo,
    KarutaNo,
    KarutaNo,
  ];
  return {
    id,
    correctAnswerKarutaNo,
    choiceKarutaNoList,
  };
};

export class CreateQuestionListService {
  constructor(private allKarutaNoList: ReadonlyArray<KarutaNo>) {}
  public execute(targetKarutaNoList: ReadonlyArray<KarutaNo>): ReadonlyArray<Question> {
    if (targetKarutaNoList.length === 0) {
      throw new IllegalArgumentError('targetKarutaNoList is empty');
    }

    const startId = new Date().getTime();
    const questionList: ReadonlyArray<Question> = randomizeArray(targetKarutaNoList).map((correctAnswerKarutaNo, i) => {
      const id = (startId + i) as QuestionId;

      const exceptedAllKarutaNoList = [...this.allKarutaNoList].filter(
        (karutaNo) => karutaNo !== correctAnswerKarutaNo
      );

      const wrongKarutaNoList = Array.from({ length: 3 }).map(() => {
        const noIndex = getRandomInt(0, exceptedAllKarutaNoList.length - 1);
        const [karutaNo] = exceptedAllKarutaNoList.splice(noIndex, 1);
        return karutaNo;
      }) as [KarutaNo, KarutaNo, KarutaNo];

      return createQuestion(id, correctAnswerKarutaNo, wrongKarutaNoList);
    });

    return questionList;
  }
}
