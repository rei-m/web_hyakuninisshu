import React from 'react';
import Img from 'gatsby-image';
import { useKarutaImage } from '@src/presentation/hooks/static-queries/useKarutaImage';
import { KarutaNo } from '@src/domain/models';

export type Props = {
  karutaNo: KarutaNo;
  className?: string;
  style?: React.CSSProperties;
};

const KarutaImage: React.FC<Props> = ({ karutaNo, className = '', style }) => (
  <Img fluid={useKarutaImage(karutaNo)} className={className} style={style} alt={KarutaNo.toJPNString(karutaNo)} />
);

export default React.memo(KarutaImage, (prevProps, nextProps) => prevProps.karutaNo === nextProps.karutaNo);