import Image from 'next/image';
import type { Karuta } from '@/domains/models';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

export type KarutaImageProps = {
  karuta: Karuta;
  width: number;
  height: number;
};

const KarutaImage = ({ karuta, width, height }: KarutaImageProps) => {
  const src = `/karuta/karuta_${karuta.imageNo}.jpg`;
  return (
    <Image
      src={process.env.NODE_ENV === 'production' ? `/.netlify/images?url=${src}` : src}
      alt={karutaNoToJPNText({ karutaNo: karuta.no })}
      width={width}
      height={height}
    />
  );
};

export default KarutaImage;
