import {
  convertCamelKey,
  getRandomInt,
  menuTypeToIcon,
  randomizeArray
} from '@src/utils';
import { MenuType } from '@src/enums';

describe('utility functions', () => {
  it('should convert json sneak to camel', () => {
    const target = {
      test_a: 1,
      test_b: {
        test_c: 'a',
        test_d: true
      }
    };
    const expected = {
      testA: 1,
      testB: {
        testC: 'a',
        testD: true
      }
    };
    const actual = convertCamelKey(target);
    expect(actual).toEqual(expected);
  });

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
});
