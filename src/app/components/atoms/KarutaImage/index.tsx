import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

import type { Karuta } from '@/domains/models';

export type KarutaImageProps = {
  karuta: Karuta;
  width: number;
};

export const KarutaImage = ({ karuta, width }: KarutaImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/karuta/karuta_${karuta.imageNo}.jpg`} alt={karutaNoToJPNText({ karutaNo: karuta.no })} width={width} />
);
