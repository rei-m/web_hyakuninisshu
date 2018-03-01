import * as React from 'react';
import styled, { ThemedStyledFunction } from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import { withState } from 'recompose';
import Tatami from '../Tatami';
import KarutaCard from '../KarutaCard';
import { Karuta } from '../../types';
import { convetKarutaId, convetKimariji } from '../helper';
import { Theme } from '../../styles';

export interface QuestionCorrectProps {
  readonly karuta: Karuta;
  readonly isAllAnswered: boolean;
  readonly onClickGoToNext: () => void;
  readonly onClickGoToResult: () => void;
}

const div: ThemedStyledFunction<React.HTMLProps<HTMLDivElement>, Theme> =
  styled.div;

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

const Header = styled.div`
  position: relative;
  width: 160px;
`;

const NumberAndKimariji = styled.div`
  padding: 8px 16px;
  border: 1px solid #d3d3d3;
  width: 160px;
  margin: 0 auto;
  font-size: 1.2rem;
  background-color: #ffffff;
`;

const OpenDetail = styled.button`
  position: absolute;
  top: 0;
  right: -48px;
  height: 33px;
  width: 33px;
`;

const KarutaFrame = div`
  width: 200px;
  height: 260px;
  border: 6px solid ${({ theme }) => theme.color_primary_dark};
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

const enhance = withState<{}, boolean, 'opened', 'setOpened'>(
  'opened',
  'setOpened',
  false
);

const QuestionCorrect = enhance<
  QuestionCorrectProps & {
    opened: boolean;
    setOpened: (state: boolean) => boolean;
  }
>(
  ({
    karuta,
    isAllAnswered,
    onClickGoToNext,
    onClickGoToResult,
    opened,
    setOpened
  }) => {
    const onClickOpenDetail = () => {
      setOpened(true);
    };

    const onCloseDialog = () => {
      setOpened(false);
    };

    return (
      <Frame>
        <Header>
          <NumberAndKimariji>
            {convetKarutaId(karuta.id)} / {convetKimariji(karuta.kimariji)}
          </NumberAndKimariji>
          <OpenDetail onClick={onClickOpenDetail} className="pt-button">
            詳
          </OpenDetail>
        </Header>
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
        <Dialog
          isOpen={opened}
          onClose={onCloseDialog}
          title="正解"
          style={{
            maxWidth: 380,
            padding: 0,
            width: '80vw'
          }}
        >
          <KarutaCard karuta={karuta} />
        </Dialog>
      </Frame>
    );
  }
);

export default QuestionCorrect;
