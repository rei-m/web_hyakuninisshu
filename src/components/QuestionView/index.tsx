import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@src/styles/styled-components';
import YomiFudaView from '@src/components/YomiFudaView';
import ToriFudaView from '@src/components/ToriFudaView';
import QuestionResult from '@src/components/QuestionResult';
import { Answer, Question, ToriFuda } from '@src/types';

export interface Props {
  question: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  onClickToriFuda: (toriFuda: ToriFuda) => void;
  onClickResult: () => void;
}

interface QueryData {
  questionBGImage: {
    publicURL: string;
  };
}

const Container = styled.div<{ bgImageUrl: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("${({ bgImageUrl }) => bgImageUrl}");
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    min-height: calc(100vh - ${({ theme }) => theme.headerHeightWide});
  }
`;

const YomiFudaBox = styled.div`
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

const QuestionView: React.FC<Props> = ({
  answer,
  currentPosition,
  question,
  totalCount,
  onClickToriFuda,
  onClickResult,
}) => (
  <StaticQuery
    query={query}
    render={({ questionBGImage }: QueryData) => (
      <Container bgImageUrl={questionBGImage.publicURL}>
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
                opacity: !answer || answer.karutaNo === toriFuda.karutaNo ? 1 : 0.8,
              }}
              key={i}
              onClick={onClickToriFuda}
              data-test={`torifuda-${i}`}
            />
          ))}
        </ToriFudaBox>
        {answer && <QuestionResult answer={answer} onClick={onClickResult} data-test="result" />}
      </Container>
    )}
  />
);

export default QuestionView;

const query = graphql`
  query {
    questionBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
