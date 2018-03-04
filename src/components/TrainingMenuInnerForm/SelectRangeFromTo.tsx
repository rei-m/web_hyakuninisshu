import * as React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { RangeFromConditions, RangeToConditions } from '../../enums';
import { toKarutaIdString } from '../helper';

export interface SelectRangeFromToProps {
  readonly from: string;
  readonly to: string;
  readonly fromTouched?: boolean;
  readonly toTouched?: boolean;
  readonly error?: string;
  readonly handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Label = styled.label`
  text-align: left;
`;

const SelectRow = withAppTheme(styled.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing2x};
`;

const SelectRange = styled.div`
  width: 128px;
  flex-grow: 1;
`;

const Separate = withAppTheme(styled.span)`
  padding: ${({ theme }) => theme.spacing2x};
`;

const Error = withAppTheme(styled.div)`
  font-size: 1.2rem;
  color: #f00;
  margin: ${({ theme }) => `${theme.spacing1x} ${theme.spacing2x}`};
`;

const SelectRangeFromTo = ({
  from,
  to,
  fromTouched,
  toTouched,
  error,
  handleChange
}: SelectRangeFromToProps) => (
  <Label className="pt-label">
    出題範囲
    <SelectRow>
      <SelectRange className="pt-select pt-large">
        <Field
          component="select"
          name="rangeFrom"
          value={from}
          onChange={handleChange}
        >
          {RangeFromConditions.values.map((value, i) => (
            <option value={value} key={`range_from_${i}`}>
              {toKarutaIdString(value)}
            </option>
          ))}
        </Field>
      </SelectRange>
      <Separate>〜</Separate>
      <SelectRange className="pt-select pt-large">
        <Field
          component="select"
          name="rangeTo"
          value={to}
          onChange={handleChange}
        >
          {RangeToConditions.values.map((value, i) => (
            <option value={value} key={`range_to_${i}`}>
              {toKarutaIdString(value)}
            </option>
          ))}
        </Field>
      </SelectRange>
    </SelectRow>
    {(fromTouched || toTouched) && error && <Error>{error}</Error>}
  </Label>
);

export default SelectRangeFromTo;
