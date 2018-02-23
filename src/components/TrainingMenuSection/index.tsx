import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import {
  COLOR_LIST,
  KIMARIJI_LIST,
  RANGE_FROM,
  RANGE_TO,
  STYLE_LIST
} from '../../constants/trainings';
import PageTitle from '../PageTitle';
import TrainingMenuForm from '../../containers/TrainingMenuForm';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
  padding: 16px;
  box-sizing: border-box;
`;

const handleSubmit = ({ history }: RouteComponentProps<{}>) => {
  return (
    rangeFrom: number,
    rangeTo: number,
    kimariji: number,
    color: string,
    kamiNoKuStyle: number,
    shimoNoKuStyle: number,
    submitTime: number
  ) => {
    history.push('/training/question', {
      color,
      kamiNoKuStyle,
      kimariji,
      rangeFrom,
      rangeTo,
      shimoNoKuStyle,
      submitTime
    });
  };
};

const TrainingMenuSection = (props: RouteComponentProps<{}>) => (
  <RootSection>
    <PageTitle title="出題設定" />
    <TrainingMenuForm
      initialRangeFrom={RANGE_FROM[0].value}
      initialRangeTo={RANGE_TO[9].value}
      initialKimariji={KIMARIJI_LIST[0].value}
      initialColor={COLOR_LIST[0].value}
      initialKamiNoKuStyle={STYLE_LIST[0].value}
      initialShimoNoKuStyle={STYLE_LIST[1].value}
      handleSubmit={handleSubmit(props)}
    />
  </RootSection>
);

export default withRouter(TrainingMenuSection);
