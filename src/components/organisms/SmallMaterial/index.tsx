import * as React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import KarutaNo from '@src/components/atoms/KarutaNo';
import KarutaImage from '@src/components/molecules/KarutaImage';
import MaterialKanjiTxt from '@src/components/molecules/MaterialKanjiTxt';
import { Karuta } from '@src/types';

export interface Props {
  karuta: Karuta;
  image?: boolean;
  separate?: React.ReactNode;
  className?: string;
  onClick?: (karutaNo: number) => void;
}

const Container = styled(Block)`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const ImageColumn = styled(Block)`
  ${({ theme }) => theme.centering}
  flex-direction: column;
  margin-right: 8px;
`;

const TextColumn = styled(Block)`
  flex-grow: 1;
  text-align: left;
  box-sizing: border-box;
`;

const StyledKarutaImage = styled(KarutaImage)`
  width: 40px;
  margin-top: ${({ theme }) => theme.spacing0_5x};
`;

const Creator = styled(Txt)`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding-top: ${({ theme }) => theme.spacing1x};
`;

export const SmallMaterial = ({ karuta, image = true, separate = <br />, className, onClick }: Props) => {
  const handleOnClick = React.useCallback(() => {
    if (onClick) {
      onClick(karuta.no);
    }
  }, []);

  return (
    <Container onClick={handleOnClick} className={className}>
      {image && (
        <ImageColumn>
          <KarutaNo karutaNo={karuta.no} size={`sss`} />
          <StyledKarutaImage karutaNo={karuta.no} />
        </ImageColumn>
      )}
      <TextColumn>
        {!image && <KarutaNo karutaNo={karuta.no} size={`sss`} />}
        <MaterialKanjiTxt karuta={karuta} size={`s`} separate={separate} />
        <Creator tag={`span`} size={`s`}>
          {karuta.creator}
        </Creator>
      </TextColumn>
    </Container>
  );
};

export default React.memo(SmallMaterial, (prevProps, nextProps) => prevProps.karuta.no === nextProps.karuta.no);
