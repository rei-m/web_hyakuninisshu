import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@src/styles/styled-components';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import TrainingMenuForm from '@src/containers/organisms/TrainingMenuForm';
import Block from '@src/components/atoms/Block';
import { ROUTE_PATHS } from '@src/constants';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  MenuType,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { gaEvent } from '@src/utils/ga';

const FormContainer = styled(Block)`
  padding: ${({ theme }) => theme.spacing2x} 0;
  max-width: 380px;
  margin: auto;
`;

const onSubmitHandler = (
  rangeFrom: RangeFromCondition,
  rangeTo: RangeToCondition,
  kimariji: KimarijiCondition,
  color: ColorCondition,
  kamiNoKuStyle: KarutaStyleCondition,
  shimoNoKuStyle: KarutaStyleCondition,
  questionAnim: QuestionAnimCondition
) => {
  const state = {
    color,
    kamiNoKuStyle,
    kimariji,
    rangeFrom,
    rangeTo,
    shimoNoKuStyle,
    questionAnim,
  };

  gaEvent('Training', 'click', JSON.stringify(state));
  navigate(ROUTE_PATHS.TRAINING_QUESTION, {
    state: {
      ...state,
      submitTime: new Date().getTime(),
    },
  });
};

const onClickBackHandler = () => {
  navigate(ROUTE_PATHS.ROOT, { replace: true });
};

const TrainingPage = () => (
  <SingleContentPageTemplate
    title={`百人一首 - 練習 -`}
    description={`百人一首の暗記を練習できます。出題条件を組み合わせて自分にあったペースで練習できます。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
    keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
    pageTitle={`出題設定`}
    menuType={MenuType.Training}
    onClickBack={onClickBackHandler}
    content={
      <FormContainer>
        <TrainingMenuForm onSubmit={onSubmitHandler} />
      </FormContainer>
    }
  />
);

export default TrainingPage;
