import { Question, QuestionId, KarutaNo, Karuta, KarutaCollection } from '../models';

export interface KarutaRepository {
  findByNo(karutaNo: KarutaNo): Karuta;
  findByNoList(karutaNoList: ReadonlyArray<KarutaNo>): ReadonlyArray<Karuta>;
  findAll(): KarutaCollection;
}

export interface QuestionRepository {
  initialize(questionList: ReadonlyArray<Question>): void;
  update(question: Question): void;
  findById(questionId: QuestionId): Question;
  findNextById(questionId: QuestionId): Question;
  findAll(): ReadonlyArray<Question>;
}
