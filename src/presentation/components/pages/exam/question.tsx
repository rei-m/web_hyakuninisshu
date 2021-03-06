import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import { paths } from '@src/presentation/routes';
import PlayingPageTemplate from '@src/presentation/components/templates/PlayingPageTemplate';
import KarutaPlayingContainer from '@src/presentation/containers/organisms/KarutaPlayingContainer';

export type Props = {};

const ExamQuestionPage = (_: Props) => {
  const handleClickBack = useCallback(() => {
    if (navigate) {
      navigate(paths.exam(), { replace: true });
    }
  }, [navigate]);

  return (
    <PlayingPageTemplate
      title={`百人一首 - 腕試し -`}
      isDisplayNav={false}
      onClickBack={handleClickBack}
      content={
        <KarutaPlayingContainer
          kamiNoKuStyle={'kanji'}
          shimoNoKuStyle={'kana'}
          questionAnim={'normal'}
          resultUrl={paths.examResult()}
        />
      }
    />
  );
};

export default ExamQuestionPage;
