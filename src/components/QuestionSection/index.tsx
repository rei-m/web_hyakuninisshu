import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Answer, Question, ToriFuda } from '../../types';
import Tatami from '../Tatami';
import YomiFudaView from '../YomiFudaView';
import ToriFudaView from '../ToriFudaView';
import QuestionResult from '../QuestionResult';

export interface QuestionSectionProps {
  readonly question: Question;
  readonly answer?: Answer;
  readonly totalCount: number;
  readonly currentPosition: number;
  readonly onClickToriFuda: (toriFuda: ToriFuda) => void;
  readonly onClickResult: () => void;
}

const Frame = Tatami.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const YomiFudaBox = withAppTheme(styled.div)`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing3x};
  width: 312px;
`;

const ToriFudaBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;

const Position = styled.div`
  position: absolute;
  right: 0;
  top: -32px;
  color: #fff;
  border-bottom: 1px dotted #fff;
`;

const QuestionSection: React.SFC<QuestionSectionProps> = ({
  answer,
  currentPosition,
  question,
  totalCount,
  onClickToriFuda,
  onClickResult
}) => {
  return (
    <Frame>
      <YomiFudaBox>
        <Position>
          {currentPosition} / {totalCount}
        </Position>
        <YomiFudaView yomiFuda={question.yomiFuda} style={{ margin: 'auto' }} />
      </YomiFudaBox>
      <ToriFudaBox>
        {question.toriFudas.map((toriFuda, i) => (
          <ToriFudaView
            toriFuda={toriFuda}
            style={{
              margin: '8px',
              opacity:
                !answer || answer.karutaId === toriFuda.karutaId ? 1 : 0.8
            }}
            key={i}
            onClick={onClickToriFuda}
            data-test={`torifuda-${i}`}
          />
        ))}
      </ToriFudaBox>
      {answer && (
        <QuestionResult
          answer={answer}
          onClick={onClickResult}
          data-test="result"
        />
      )}
    </Frame>
  );
};

export default QuestionSection;
