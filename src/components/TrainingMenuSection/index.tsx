import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import PageTitle from '../PageTitle';
import TrainingMenuForm from '../../containers/TrainingMenuForm';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition
} from '../../enums';

export interface TrainingMenuSectionProps {
  readonly initialRangeFrom: RangeFromCondition;
  readonly initialRangeTo: RangeToCondition;
  readonly initialKimariji: KimarijiCondition;
  readonly initialColor: ColorCondition;
  readonly initialKamiNoKuStyle: KarutaStyleCondition;
  readonly initialShimoNoKuStyle: KarutaStyleCondition;
  readonly onSubmit: (
    rangeFrom: number,
    rangeTo: number,
    kimariji: number,
    color: string,
    kamiNoKuStyle: number,
    shimoNoKuStyle: number,
    submitTime: number
  ) => void;
}

const RootSection = withAppTheme(styled.section)`
  max-width: 380px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing2x};
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
