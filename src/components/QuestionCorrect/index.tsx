import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { withState } from 'recompose';
import { Dialog } from '@blueprintjs/core';
import styled from '@src/styles/styled-components';
import KarutaCard from '@src/components/KarutaCard';
import { Karuta } from '@src/types';
import { toKarutaNoString, toKimarijiString } from '@src/utils';

export interface Props {
  karuta: Karuta;
  isAllAnswered: boolean;
  onClickGoToNext: () => void;
  onClickGoToResult: () => void;
}

interface QueryData {
  questionCorrectBGImage: {
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

const Header = styled.div`
  position: relative;
  width: 160px;
`;

const NumberAndKimariji = styled.div`
  padding: ${({ theme }) => `${theme.spacing1x} ${theme.spacing2x}`};
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

const KarutaFrame = styled.div`
  width: 200px;
  height: 260px;
  border: 6px solid ${({ theme }) => theme.colorPrimaryDark};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing2x} auto 0 auto;
  background-color: ${({ theme }) => theme.colorThin};
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

const SecondPhrase = styled(Phrase)`
  padding-top: 24px;
  margin-right: 8px;
`;

const ThirdPhrase = styled(Phrase)`
  padding-top: 48px;
  margin-right: 8px;
`;

const FourthPhrase = styled(Phrase)`
  padding-top: 32px;
  margin-right: 8px;
`;

const FifthPhrase = styled(Phrase)`
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

const enhance = withState<{}, boolean, 'opened', 'setOpened'>('opened', 'setOpened', false);

const QuestionCorrect = enhance<
  Props & {
    opened: boolean;
    setOpened: (state: boolean) => boolean;
  }
>(({ karuta, isAllAnswered, onClickGoToNext, onClickGoToResult, opened, setOpened }) => {
  const onClickOpenDetail = () => {
    setOpened(true);
  };

  const onCloseDialog = () => {
    setOpened(false);
  };

  return (
    <StaticQuery
      query={query}
      render={({ questionCorrectBGImage }: QueryData) => (
        <Container bgImageUrl={questionCorrectBGImage.publicURL}>
          <Header>
            <NumberAndKimariji>
              {toKarutaNoString(karuta.no)} / {toKimarijiString(karuta.kimariji)}
            </NumberAndKimariji>
            <OpenDetail onClick={onClickOpenDetail} className="bp3-button" data-test="open-detail">
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
              className="bp3-button bp3-large bp3-icon-double-chevron-right"
              data-test="go-to-result"
            >
              結果を見る
            </NextButton>
          ) : (
            <NextButton
              onClick={onClickGoToNext}
              className="bp3-button bp3-large bp3-icon-double-chevron-right"
              data-test="go-to-next"
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
              width: '80vw',
            }}
          >
            <KarutaCard karuta={karuta} />
          </Dialog>
        </Container>
      )}
    />
  );
});

export default QuestionCorrect;

const query = graphql`
  query {
    questionCorrectBGImage: file(relativePath: { eq: "tatami_part.png" }) {
      publicURL
    }
  }
`;
