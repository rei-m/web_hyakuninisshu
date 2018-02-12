import * as React from 'react';
import styled from 'styled-components';
import { Karuta } from '../../types';
import { COLOR_PRIMARY_DARK } from '../../constants/colors';
import { convetKarutaId, convetKimariji } from '../helper';

export interface QuestionCorrectOwnProps {
  readonly karuta: Karuta;
}

export interface QuestionCorrectDispatchProps {
  readonly onClickGoToNext: () => void;
}

export type QuestionCorrectProps = QuestionCorrectOwnProps &
  QuestionCorrectDispatchProps;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NumberAndKimariji = styled.div`
  padding: 8px 16px;
  border: 1px solid #d3d3d3;
  width: 160px;
  margin: 0 auto;
  font-size: 1.2rem;
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

const GoToNextButton = styled.button`
  margin-top: 32px;
`;

const QuestionCorrect = ({ karuta, onClickGoToNext }: QuestionCorrectProps) => {
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
      <GoToNextButton
        onClick={onClickGoToNext}
        className="pt-button pt-large pt-icon-double-chevron-right"
      >
        次へ進む
      </GoToNextButton>
    </Frame>
  );
};

export default QuestionCorrect;
