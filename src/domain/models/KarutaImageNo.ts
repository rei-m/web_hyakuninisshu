import { IllegalArgumentError } from '../errors';

/**
 * 歌画像の番号
 */
export type KarutaImageNo = string;
export const KarutaImageNo = {
  create: (value: string): KarutaImageNo => {
    if (value.length === 3 && '001' <= value && value <= '100') {
      return value as KarutaImageNo;
    }
    throw new IllegalArgumentError(`value=${value}`);
  },
};
