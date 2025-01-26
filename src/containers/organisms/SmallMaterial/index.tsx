import type { KarutaNo } from '@/domains/models';

import SmallMaterialView, { SmallMaterialProps as SmallMaterialViewProps } from '@/components/organisms/SmallMaterial';

import { useAppSelector } from '@/lib/hooks';
import { selectKarutaByNo } from '@/lib/features/material/materialSlice';

export type SmallMaterialProps = {
  karutaNo: KarutaNo;
} & Omit<SmallMaterialViewProps, 'karuta'>;

const SmallMaterial = ({ karutaNo, image = true, separate = <br />, sx }: SmallMaterialProps) => {
  const karuta = useAppSelector((state) => selectKarutaByNo(state, karutaNo));
  return <SmallMaterialView karuta={karuta} image={image} separate={separate} sx={sx} />;
};

export default SmallMaterial;
