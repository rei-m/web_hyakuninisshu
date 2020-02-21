import React from 'react';
import { navigate } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import { EditButton } from '@src/components/molecules/IconLabelButton';
import Paragraph from '@src/components/atoms/Paragraph';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';
import { ThemeInterface } from '@src/styles/theme';

const useStyles = makeStyles<ThemeInterface>(theme => ({
  explain: {
    padding: theme.spacing(4, 2),
  },
  startExamButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
}));

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

const ExamPage = () => {
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      title={`百人一首 - 腕試し -`}
      description={`百人一首の暗記を練習できます。百首覚えられているかチャレンジしましょう。`}
      keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={`腕試し`}
      menuType={MenuType.Exam}
      onClickBack={onClickBackHandler}
      content={
        <>
          <Paragraph size={`m`} className={classes.explain}>
            全百首からランダムに出題されます。
            <br />
            練習の成果を確認しましょう。
          </Paragraph>
          <EditButton type={`accent`} onClick={onSubmitHandler} className={classes.startExamButton}>
            腕試しをはじめる
          </EditButton>
        </>
      }
    />
  );
};

export default ExamPage;
