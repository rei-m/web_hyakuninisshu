import * as React from 'react';
import styled from 'styled-components';
import Tatami from '../Tatami';
import { Karuta } from '../../types';
import { COLOR_PRIMARY_DARK } from '../../constants/colors';
import { convetKarutaId, convetKimariji } from '../helper';

export interface QuestionCorrectProps {
  readonly karuta: Karuta;
  readonly isAllAnswered: boolean;
  readonly onClickGoToNext: () => void;
  readonly onClickGoToResult: () => void;
}

const Frame = Tatami.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);

  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 64px);
  }
`;

const NumberAndKimariji = styled.div`
  padding: 8px 16px;
  border: 1px solid #d3d3d3;
  width: 160px;
  margin: 0 auto;
  font-size: 1.2rem;
  background-color: #ffffff;
`;

const KarutaFrame = styled.div`
  width: 200px;
  height: 260px;
  border: 6px solid ${COLOR_PRIMARY_DARK};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto 0 auto;
  background-color: #fffff0;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  font-family: 'Sawarabi Mincho';
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Phrase = styled.div`
  width: 1.9rem;
  font-size: 1.9rem;
  line-height: 2rem;
`;

const SecondPhrase = Phrase.extend`
  padding-top: 24px;
  margin-right: 8px;
`;

const ThirdPhrase = Phrase.extend`
  padding-top: 48px;
  margin-right: 8px;
`;

const FourthPhrase = Phrase.extend`
  padding-top: 32px;
  margin-right: 8px;
`;

const FifthPhrase = Phrase.extend`
  padding-top: 56px;
  margin-right: 8px;
`;

const Creator = styled.div`
  width: 1.6rem;
  margin-right: 16px;
  font-size: 1.4rem;
  line-height: 1.6rem;
  align-self: flex-end;
`;

const NextButton = styled.button`
  margin-top: 32px;
`;

const QuestionCorrect = ({
  karuta,
  isAllAnswered,
  onClickGoToNext,
  onClickGoToResult
}: QuestionCorrectProps) => {
  return (
    <Frame>
      <NumberAndKimariji>
        {convetKarutaId(karuta.id)} / {convetKimariji(karuta.kimariji)}
      </NumberAndKimariji>
      <KarutaFrame>
        <Inner>
          <Phrase>{karuta.firstKanji}</Phrase>
          <SecondPhrase>{karuta.secondKanji}</SecondPhrase>
          <ThirdPhrase>{karuta.thirdKanji}</ThirdPhrase>
          <FourthPhrase>{karuta.fourthKanji}</FourthPhrase>
          <FifthPhrase>{karuta.fifthKanji}</FifthPhrase>
          <Creator>{karuta.creator}</Creator>
        </Inner>
      </KarutaFrame>
      {isAllAnswered ? (
        <NextButton
          onClick={onClickGoToResult}
          className="pt-button pt-large pt-icon-double-chevron-right"
        >
          結果を見る
        </NextButton>
      ) : (
        <NextButton
          onClick={onClickGoToNext}
          className="pt-button pt-large pt-icon-double-chevron-right"
        >
          次へ進む
        </NextButton>
      )}
    </Frame>
  );
};

export default QuestionCorrect;
