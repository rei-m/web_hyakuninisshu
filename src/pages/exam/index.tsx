import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import { EditButton } from '@src/components/molecules/IconLabelButton';
import Paragraph from '@src/components/atoms/Paragraph';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';

const Explain = styled(Paragraph)`
  padding: ${({ theme }) => `${theme.spacing4x} ${theme.spacing2x}`};
`;

const StartExamButton = styled(EditButton)`
  ${({ theme }) => `
    margin-top: ${theme.spacing4x};
    margin-bottom: ${theme.spacing2x};
    box-shadow: ${theme.elevationShadow1x};
  `}
`;

const onSubmitHandler = () => {
  navigate(ROUTE_PATHS.EXAM_QUESTION, {
    state: {
      submitTime: new Date().getTime(),
    },
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.ROOT, { replace: true });
};

const ExamPage = () => (
  <SingleContentPageTemplate
    title={`百人一首 - 腕試し -`}
    description={`百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。`}
    keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
    pageTitle={`腕試し`}
    menuType={MenuType.Exam}
    onClickBack={onClickBackHandler}
    content={
      <>
        <Explain size={`m`}>
          全百首からランダムに出題されます。
          <br />
          練習の成果を確認しましょう。
        </Explain>
        <StartExamButton type={`primary`} onClick={onSubmitHandler}>
          腕試しをはじめる
        </StartExamButton>
      </>
    }
  />
);

export default ExamPage;
