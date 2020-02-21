import { QuestionRepository, KarutaRepository } from '../repositories';
import { Question, QuestionId, KarutaNo, Karuta } from '../models';
import { getRandomInt, randomizeArray } from '../utils/array';
import { IllegalArgumentError } from '../errors';

export class QuestionListService {
  constructor(karutaRepository: KarutaRepository, questionRepository: QuestionRepository) {
    this._karutaRepository = karutaRepository;
    this._questionRepository = questionRepository;
  }

  private _karutaRepository: KarutaRepository;
  private _questionRepository: QuestionRepository;

  public initialize(targetKarutaList: Array<Karuta>): Array<Question> {
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
      const choiceKarutaNoList = randomizeArray(wrongKarutaNoList.concat(correctAnswerKarutaNo)) as [
        KarutaNo,
        KarutaNo,
        KarutaNo,
        KarutaNo
      ];
      return {
        id,
        correctAnswerKarutaNo,
        choiceKarutaNoList,
      };
    });

    this._questionRepository.initialize(questionList);

    return questionList;
  }
}
