import * as React from 'react';
import styled from 'styled-components';
import { RANGE_FROM, RANGE_TO } from '../../constants/Training';
import SectionTitle from '../SectionTitle';
import SelectRangeFromTo from './SelectRangeFromTo';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const TrainingMenuSection = () => (
  <RootSection>
    <SectionTitle title="練習" />
    <SelectRangeFromTo
      fromValue={RANGE_FROM[0].value}
      toValue={RANGE_TO[9].value}
    />
    <button type="button" className="pt-button pt-icon-add">
      練習をはじめる
    </button>
  </RootSection>
);

export default TrainingMenuSection;
