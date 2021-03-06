import { QuestionRepository } from '@src/domain/repositories';
import { Question, QuestionId } from '@src/domain/models';
import { NoSuchElementError } from '@src/domain/errors';

export class QuestionRepositoryImpl implements QuestionRepository {
  private keyList: ReadonlyArray<QuestionId> = [];
  private dataSource: Map<QuestionId, Question> = new Map();

  initialize(questionList: ReadonlyArray<Question>) {
    this.keyList = questionList.map((q) => q.id);
    const source = new Map();
    questionList.forEach((q) => {
      source.set(q.id, q);
    });
    this.dataSource = source;
  }
  update(question: Question) {
    if (!this.dataSource.get(question.id)) {
      throw new NoSuchElementError(`id=${question.id}`);
    }
    this.dataSource.set(question.id, question);
  }
  findById(questionId: QuestionId) {
    const result = this.dataSource.get(questionId);
    if (!result) {
      throw new NoSuchElementError(`id=${questionId}`);
    }
    return result;
  }
  findNextById(questionId: QuestionId) {
    const currentIndex = this.keyList.findIndex((key) => key === questionId);
    const nextIndex = currentIndex + 1;
    const result = this.dataSource.get(this.keyList[nextIndex]);
    if (!result) {
      throw new NoSuchElementError(`id=${this.keyList[nextIndex]}`);
    }
    return result;
  }
  findAll() {
    return this.keyList.map((key) => this.dataSource.get(key)!);
  }
}
