import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Answer, Karuta, Question } from '../../types';
import { toKarutaIdString } from '../helper';
import * as correctImage from './check_correct.png';
import * as incorrectImage from './check_incorrect.png';

export interface QuestionResultsMapProps {
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly style?: React.CSSProperties;
  readonly onClickResult: (karuta: Karuta) => void;
}

const Root = withAppTheme(styled.div)`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colorThin};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  border-radius: 4px;
`;

const Cell = styled.div`
  width: 20%;
  height: 69px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KarutaNo = styled.span`
  font-size: 1.2rem;
`;

const CorrentImageBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const QuestionResultsMap: React.SFC<QuestionResultsMapProps> = ({
  questions,
  answers,
  style,
  onClickResult
}) => (
  <Root style={style}>
    {questions.map((q, i) => {
      const onClickCell = () => onClickResult(q.correctKaruta);
      return (
        <Cell onClick={onClickCell} key={i} data-test={`question-${q.id}`}>
          <KarutaNo>{toKarutaIdString(q.correctKaruta.id)}</KarutaNo>
          <CorrentImageBox>
            <img
              src={answers[i].correct ? correctImage : incorrectImage}
              style={{ width: '80%' }}
            />
          </CorrentImageBox>
        </Cell>
      );
    })}
  </Root>
);

export default QuestionResultsMap;
