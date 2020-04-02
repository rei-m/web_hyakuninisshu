const NUMS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

/**
 * 1 から 100までの数字を漢数字に変換する
 *
 * @param num 変換対象の数字
 */
export const toChineseChar = (num: number): string => {
  if (num === 100) {
    return '百';
  }

  const ret: string[] = [''];

  const doubleDigits = Math.floor(num / 10);
  const singleDigits = num % 10;

  if (0 < doubleDigits) {
    if (1 < doubleDigits) {
      ret.push(NUMS[doubleDigits - 1]);
    }
    ret.push('十');
  }

  if (0 < singleDigits) {
    ret.push(NUMS[singleDigits - 1]);
  }

  return ret.join('');
};
