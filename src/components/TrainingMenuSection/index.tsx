import * as React from 'react';
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

const TrainingMenuSection = () => (
  <RootSection>
    <SectionTitle title="練習" />
    <TrainingMenuForm
      initialRangeFrom={RANGE_FROM[0].value}
      initialRangeTo={RANGE_TO[9].value}
      initialKimariji={KIMARIJI_LIST[0].value}
      initialColor={COLOR_LIST[0].value}
      initialKamiNoKuStyle={STYLE_LIST[0].value}
      initialShimoNoKuStyle={STYLE_LIST[1].value}
    />
  </RootSection>
);

export default TrainingMenuSection;
