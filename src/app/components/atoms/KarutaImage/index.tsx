import Image, { type ImageLoaderProps } from 'next/image';
import type { Karuta } from '@/domains/models';

import { karutaNoToJPNText } from '@/domains/models/KarutaNo';

export type KarutaImageProps = {
  karuta: Karuta;
  width: number;
  height: number;
};

const imageLoader = ({ src }: ImageLoaderProps) => {
  return `/.netlify/images?url=${src}`;
};

const KarutaImage = ({ karuta, width, height }: KarutaImageProps) => (
  <Image
    loader={imageLoader}
    src={`/karuta/karuta_${karuta.imageNo}.jpg`}
    alt={karutaNoToJPNText({ karutaNo: karuta.no })}
    width={width}
    height={height}
  />
);

export default KarutaImage;
