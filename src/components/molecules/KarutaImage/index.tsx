import React from 'react';
import Img from 'gatsby-image';
import { useKarutaImage } from '@src/hooks/staticQueries/useKarutaImage';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  karutaNo: number;
  className?: string;
  style?: React.CSSProperties;
}

const KarutaImage: React.FC<Props> = ({ karutaNo, className = '', style }) => (
  <Img fluid={useKarutaImage(karutaNo)} className={className} style={style} alt={toKarutaNoString(karutaNo)} />
);

export default React.memo(KarutaImage, (prevProps, nextProps) => prevProps.karutaNo === nextProps.karutaNo);
