export const COLOR_LIST = ['blue', 'pink', 'yellow', 'green', 'orange'] as const;

const COLOR_MAP = {
  blue: '青色',
  pink: '桃色',
  yellow: '黄色',
  green: '緑色',
  orange: '橙色',
} as const;

/**
 * 5色百人一首のかるたの色
 */
export type Color = (typeof COLOR_LIST)[number];

export const colorToJPNText = ({ color }: { color: Color }) => COLOR_MAP[color];
