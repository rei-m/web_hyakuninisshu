import * as React from 'react';
import Img from 'gatsby-image';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import Ratio from '@src/components/atoms/Ratio';
import YomiFuda from '@src/components/molecules/YomiFuda';
import ToriFuda from '@src/components/molecules/ToriFuda';
import { useAppContext } from '@src/hooks/useAppContext';
import { Answer, Question, ToriFuda as ToriFudaType } from '@src/types';

export interface Props {
  question: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  duration: number;
  onClickToriFuda: (toriFuda: ToriFudaType) => void;
  onClickResult: () => void;
}

const Container = styled(Block)`
  ${({ theme }) => theme.centering}
  flex-direction: column;
`;

const YomiFudaWrapper = styled(Block)`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing3x};
  width: 312px;
`;

const ToriFudaWrapper = styled(Block)`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;

const StyledYomiFuda = styled(YomiFuda)`
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const Position = styled(Ratio)`
  color: #fff;
  border-bottom: 1px dotted #fff;
  position: absolute;
  right: 0;
  top: -32px;
`;

const StyledToriFuda = styled(ToriFuda)`
  margin: ${({ theme }) => theme.spacing1x};
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const CorrectImageContainer = styled(Block)`
  ${({ theme }) => theme.centering}
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const CorrectImage = styled(Img)`
  width: 300px;
  height: 300px;
`;

const KarutaPlaying = ({
  answer,
  currentPosition,
  question,
  totalCount,
  duration,
  onClickToriFuda,
  onClickResult,
}: Props) => (
  <Container>
    <YomiFudaWrapper>
      <Position denominator={totalCount} numerator={currentPosition} size={`s`} />
      <StyledYomiFuda yomiFuda={question.yomiFuda} answered={!!answer} duration={duration} />
    </YomiFudaWrapper>
    <ToriFudaWrapper>
      {question.toriFudas.map(toriFuda => (
        <StyledToriFuda
          key={toriFuda.karutaNo}
          toriFuda={toriFuda}
          thin={!!answer && answer.karutaNo !== toriFuda.karutaNo}
          onClick={onClickToriFuda}
          data-test={`torifuda-${toriFuda.karutaNo}`}
        />
      ))}
    </ToriFudaWrapper>
    {answer && (
      <CorrectImageContainer onClick={onClickResult} data-test="result">
        <CorrectImage
          fluid={useAppContext()
            .useCorrectImage()
            .find((_, i) => (i === 0 && answer.correct) || (i === 1 && !answer.correct))}
        />
      </CorrectImageContainer>
    )}
  </Container>
);

export default KarutaPlaying;
