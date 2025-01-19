import type { Question, QuestionId, KarutaNo, Karuta } from '../models';
import type { KarutaRepository } from '../repositories';
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
  constructor(private karutaRepository: KarutaRepository) {}
  public execute(targetKarutaList: ReadonlyArray<Karuta>): ReadonlyArray<Question> {
    const allKarutaList = this.karutaRepository.all();
    if (targetKarutaList.length === 0) {
      throw new IllegalArgumentError('targetKarutaList is empty');
    }

    const startId = new Date().getTime();
    const questionList: ReadonlyArray<Question> = randomizeArray(targetKarutaList).map((karuta, i) => {
      const id = (startId + i) as QuestionId;

      const correctAnswerKarutaNo: KarutaNo = karuta.no;

      const exceptedAllKarutaNoList = [...allKarutaList]
        .filter((karuta) => karuta.no !== correctAnswerKarutaNo)
        .map((karuta) => karuta.no);

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
