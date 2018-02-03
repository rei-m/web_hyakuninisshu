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
import SelectItem from './SelectItem';
import SelectRangeFromTo from './SelectRangeFromTo';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const StartButton = styled.button`
  margin-top: 32px;
`;

const mockOnChange = (value: any) => {
  console.dir(value);
};

const TrainingMenuSection = () => (
  <RootSection>
    <SectionTitle title="練習" />
    <SelectRangeFromTo
      fromValue={RANGE_FROM[0].value}
      toValue={RANGE_TO[9].value}
    />
    <SelectItem
      title="決まり字"
      list={KIMARIJI_LIST}
      value={KIMARIJI_LIST[0].value}
      onChange={mockOnChange}
    />
    <SelectItem
      title="五色"
      list={COLOR_LIST}
      value={COLOR_LIST[0].value}
      onChange={mockOnChange}
    />
    <SelectItem
      title="上の句"
      list={STYLE_LIST}
      value={STYLE_LIST[0].value}
      onChange={mockOnChange}
    />
    <SelectItem
      title="下の句"
      list={STYLE_LIST}
      value={STYLE_LIST[1].value}
      onChange={mockOnChange}
    />
    <StartButton
      type="button"
      className="pt-button pt-intent-primary pt-large pt-icon-edit"
    >
      練習をはじめる
    </StartButton>
  </RootSection>
);

export default TrainingMenuSection;
