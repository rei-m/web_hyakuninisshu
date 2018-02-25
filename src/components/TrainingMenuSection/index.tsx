import * as React from 'react';
import styled from 'styled-components';
import PageTitle from '../PageTitle';
import TrainingMenuForm from '../../containers/TrainingMenuForm';

export interface TrainingMenuSectionStateProps {
  initialRangeFrom: number;
  initialRangeTo: number;
  initialKimariji: number;
  initialColor: string;
  initialKamiNoKuStyle: number;
  initialShimoNoKuStyle: number;
}

export interface TrainingMenuSectionDispatchProps {
  onSubmit: (
    rangeFrom: number,
    rangeTo: number,
    kimariji: number,
    color: string,
    kamiNoKuStyle: number,
    shimoNoKuStyle: number,
    submitTime: number
  ) => void;
}

export type TrainingMenuSectionProps = TrainingMenuSectionStateProps &
  TrainingMenuSectionDispatchProps;

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
  padding: 16px;
  box-sizing: border-box;
`;

const TrainingMenuSection = ({
  initialRangeFrom,
  initialRangeTo,
  initialKimariji,
  initialColor,
  initialKamiNoKuStyle,
  initialShimoNoKuStyle,
  onSubmit
}: TrainingMenuSectionProps) => (
  <RootSection>
    <PageTitle title="出題設定" />
    <TrainingMenuForm
      initialRangeFrom={initialRangeFrom}
      initialRangeTo={initialRangeTo}
      initialKimariji={initialKimariji}
      initialColor={initialColor}
      initialKamiNoKuStyle={initialKamiNoKuStyle}
      initialShimoNoKuStyle={initialShimoNoKuStyle}
      handleSubmit={onSubmit}
    />
  </RootSection>
);

export default TrainingMenuSection;
