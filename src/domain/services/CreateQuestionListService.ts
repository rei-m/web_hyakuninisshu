import { Question, QuestionId, KarutaNo, Karuta, KarutaCollection } from '../models';
import { getRandomInt, randomizeArray } from '../utils/array';
import { IllegalArgumentError } from '../errors';

export class CreateQuestionListService {
  public execute(karutaCollection: KarutaCollection, targetKarutaList: ReadonlyArray<Karuta>): ReadonlyArray<Question> {
    if (targetKarutaList.length === 0) {
      throw new IllegalArgumentError('targetKarutaList is empty');
    }

    const startId = new Date().getTime();
    const questionList: Array<Question> = randomizeArray(targetKarutaList).map((karuta, i) => {
      const id: QuestionId = startId + i;

      const correctAnswerKarutaNo: KarutaNo = karuta.no;

      const exceptedAllKarutaNoList = [...karutaCollection.karutaList]
        .filter(karuta => karuta.no !== correctAnswerKarutaNo)
        .map(karuta => karuta.no);

      const wrongKarutaNoList = Array.from({ length: 3 }).map(_ => {
        const noIndex = getRandomInt(0, exceptedAllKarutaNoList.length - 1);
        const [karutaNo] = exceptedAllKarutaNoList.splice(noIndex, 1);
        return karutaNo;
      }) as [KarutaNo, KarutaNo, KarutaNo];

      return Question.create(id, correctAnswerKarutaNo, wrongKarutaNoList);
    });

    return questionList;
  }
}
