import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import {
  COLOR_LIST,
  KIMARIJI_LIST,
  RANGE_FROM,
  RANGE_TO,
  STYLE_LIST
} from '../../constants/Training';
import SectionTitle from '../SectionTitle';
import TrainingMenuForm from '../../containers/TrainingMenuForm';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const handleSubmit = (props: RouteComponentProps<{}>) => {
  return (
    rangeFrom: number,
    rangeTo: number,
    kimariji: number,
    color: string,
    kamiNoKuStyle: number,
    shimoNoKuStyle: number
  ) => {
    props.history.push('/training/question', {
      color,
      kamiNoKuStyle,
      kimariji,
      rangeFrom,
      rangeTo,
      shimoNoKuStyle
    });
  };
};

const TrainingMenuSection = (props: RouteComponentProps<{}>) => (
  <RootSection>
    <SectionTitle title="練習" />
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
