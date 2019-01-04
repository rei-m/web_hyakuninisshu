import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { withState } from 'recompose';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import KarutaCardDialog from '@src/components/KarutaCardDialog';
import AppButton from '@src/components/AppButton';
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
            <AppButton
              label="詳"
              type="normal"
              onClick={onClickOpenDetail}
              style={{
                padding: 0,
                minWidth: 33,
                minHeight: 33,
                position: 'absolute',
                top: 0,
                right: -48,
                height: 33,
                width: 33,
                fontSize: '1.4rem',
              }}
              data-test="open-detail"
            />
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
            <AppButton
              label="結果を見る"
              icon="arrow_forward_ios"
              type="normal"
              onClick={onClickGoToResult}
              data-test="go-to-result"
              style={{ marginTop: appTheme.spacing4x }}
            />
          ) : (
            <AppButton
              label="次へ進む"
              icon="arrow_forward_ios"
              type="normal"
              onClick={onClickGoToNext}
              data-test="go-to-next"
              style={{ marginTop: appTheme.spacing4x }}
            />
          )}
          <KarutaCardDialog open={opened} onClose={onCloseDialog} karuta={karuta} />
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
