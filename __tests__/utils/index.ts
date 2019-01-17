import { getRandomInt, menuTypeToIcon, randomizeArray, toQuestionAnimConditionString } from '@src/utils';
import { MenuType, QuestionAnimCondition } from '@src/enums';

describe('utility functions', () => {
  it('should get random intager value', () => {
    const actual = getRandomInt(1, 10);
    expect(actual).toBeGreaterThanOrEqual(1);
    expect(actual).toBeLessThanOrEqual(10);
  });

  it('should sort array at random', () => {
    const target = [1, 2, 3, 4, 5];
    const actual = randomizeArray(target);
    expect(target).toEqual([1, 2, 3, 4, 5]);
    expect(actual).toHaveLength(5);
    expect(actual).toContain(1);
    expect(actual).toContain(2);
    expect(actual).toContain(3);
    expect(actual).toContain(4);
    expect(actual).toContain(5);
  });

  it('should return icon classname', () => {
    expect(menuTypeToIcon(MenuType.Training)).toBe('create');
    expect(menuTypeToIcon(MenuType.Exam)).toBe('note');
    expect(menuTypeToIcon(MenuType.Material)).toBe('library_books');
    expect(menuTypeToIcon(MenuType.Other)).toBe('settings');
  });

  it('should return QuestionAnimCondition text', () => {
    expect(toQuestionAnimConditionString(QuestionAnimCondition.None)).toBe('なし');
    expect(toQuestionAnimConditionString(QuestionAnimCondition.Slow)).toBe('おそめ');
    expect(toQuestionAnimConditionString(QuestionAnimCondition.Normal)).toBe('ふつう');
    expect(toQuestionAnimConditionString(QuestionAnimCondition.Fast)).toBe('はやめ');
  });
});
