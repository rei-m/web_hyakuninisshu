import type { Karuta } from '@/domains/models';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

export type KarutaImageProps = {
  karuta: Karuta;
  width: number;
};

const KarutaImage = ({ karuta, width }: KarutaImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/karuta/karuta_${karuta.imageNo}.jpg`} alt={karutaNoToJPNText({ karutaNo: karuta.no })} width={width} />
);

export default KarutaImage;
