import React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import Button from '@src/components/atoms/Button';
import KarutaNo from '@src/components/atoms/KarutaNo';
import Kimariji from '@src/components/atoms/Kimariji';
import Fuda from '@src/components/molecules/Fuda';
import { ArrowForwardButton } from '@src/components/molecules/IconLabelButton';
import ClosableDialog from '@src/components/molecules/ClosableDialog';
import Material from '@src/components/organisms/Material';
import { Karuta } from '@src/types';
import { useBool } from '@src/hooks/useBool';

export interface Props {
  karuta: Karuta;
  isAllAnswered: boolean;
  onClickGoToNext: () => void;
  onClickGoToResult: () => void;
}

export interface State {
  opened: boolean;
}

const Container = styled(Block)``;

const Header = styled(Block)`
  position: relative;
  margin: auto;
  width: 160px;
`;

const HeaderInner = styled(Block)`
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacingByPx(1)} ${theme.spacingByPx(2)}`};
  border: 1px solid #d3d3d3;
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: #fff;
`;

const MaterialButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.m} !important;
  padding: 0 !important;
  height: 33px !important;
  width: 33px !important;
  min-width: 33px !important;
  min-height: 33px !important;
  position: absolute !important;
  top: 0 !important;
  right: -48px !important;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const StyledFuda = styled(Fuda)`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  margin: ${({ theme }) => theme.spacingByPx(2)} auto 0 auto;
`;

const StyledArrowForwardButton = styled(ArrowForwardButton)`
  margin-top: ${({ theme }) => theme.spacingByPx(4)} !important;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const KarutaPlayingCorrect = ({ karuta, isAllAnswered, onClickGoToNext, onClickGoToResult }: Props) => {
  const [opened, openDialog, closeDialog] = useBool(false);
  return (
    <Container>
      <Header>
        <HeaderInner>
          <KarutaNo karutaNo={karuta.no} size={`ss`} /> / <Kimariji kimariji={karuta.kimariji} size={`ss`} />
        </HeaderInner>
        <MaterialButton onClick={openDialog} data-test={`open-detail`}>
          資
        </MaterialButton>
      </Header>
      <StyledFuda karuta={karuta} />
      {isAllAnswered ? (
        <StyledArrowForwardButton onClick={onClickGoToResult} data-test={`go-to-result`}>
          結果を見る
        </StyledArrowForwardButton>
      ) : (
        <StyledArrowForwardButton onClick={onClickGoToNext} data-test={`go-to-next`}>
          次へ進む
        </StyledArrowForwardButton>
      )}
      <ClosableDialog
        title={`正解`}
        open={opened}
        onClose={closeDialog}
        PaperProps={{
          style: { maxWidth: 380 },
        }}
      >
        {karuta && <Material karuta={karuta} />}
      </ClosableDialog>
    </Container>
  );
};

export default KarutaPlayingCorrect;
