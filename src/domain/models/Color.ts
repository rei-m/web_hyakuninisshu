/**
 * 5色百人一首のかるたの色
 */
export type Color = 'blue' | 'pink' | 'yellow' | 'green' | 'orange';
const COLOR_MAP = {
  blue: '青色',
  pink: '桃色',
  yellow: '黄色',
  green: '緑色',
  orange: '橙色',
};

export const Color = {
  create: (value: string): Color => {
    if (['blue', 'pink', 'yellow', 'green', 'orange'].includes(value)) {
      return value as Color;
    }
    throw new Error(`IllegalArgument: value=${value}`);
  },
  values: ['blue', 'pink', 'yellow', 'green', 'orange'] as Array<Color>,
  toJPNString: (value: Color): string => COLOR_MAP[value],
};
