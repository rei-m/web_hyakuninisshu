import { Question, QuestionId, KarutaNo, Karuta } from '../models';

export interface KarutaRepository {
  findByNo(karutaNo: KarutaNo): Karuta;
  findByNoList(karutaNoList: Array<KarutaNo>): Array<Karuta>;
  findAll(): Array<Karuta>;
}

export interface QuestionRepository {
  initialize(questionList: Array<Question>): void;
  update(question: Question): void;
  findById(questionId: QuestionId): Question;
  findNextById(questionId: QuestionId): Question;
  findAll(): Array<Question>;
}
