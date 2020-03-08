import { QuestionRepository, KarutaRepository } from '../repositories';
import { Question, QuestionId, KarutaNo, Karuta } from '../models';
import { getRandomInt, randomizeArray } from '../utils/array';
import { IllegalArgumentError } from '../errors';

export class InitializeQuestionListService {
  constructor(private _karutaRepository: KarutaRepository, private _questionRepository: QuestionRepository) {}

  public execute(targetKarutaList: Array<Karuta>): Array<Question> {
    if (targetKarutaList.length === 0) {
      throw new IllegalArgumentError('targetKarutaList is empty');
    }

    const startId = new Date().getTime();
    const allKarutaList = this._karutaRepository.findAll();
    const questionList: Array<Question> = randomizeArray(targetKarutaList).map((karuta, i) => {
      const id: QuestionId = startId + i;

      const correctAnswerKarutaNo: KarutaNo = karuta.no;

      const exceptedAllKarutaNoList = [...allKarutaList]
        .filter(karuta => karuta.no !== correctAnswerKarutaNo)
        .map(karuta => karuta.no);

      const wrongKarutaNoList = Array.from({ length: 3 }).map(_ => {
        const noIndex = getRandomInt(0, exceptedAllKarutaNoList.length - 1);
        const [karutaNo] = exceptedAllKarutaNoList.splice(noIndex, 1);
        return karutaNo;
      }) as [KarutaNo, KarutaNo, KarutaNo];

      return Question.create(id, correctAnswerKarutaNo, wrongKarutaNoList);
    });

    this._questionRepository.initialize(questionList);

    return questionList;
  }
}
