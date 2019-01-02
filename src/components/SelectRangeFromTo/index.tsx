import * as React from 'react';
import styled from '@src/styles/styled-components';
import { Field } from 'formik';
import { RangeFromConditions, RangeToConditions } from '@src/enums';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  from: string;
  to: string;
  fromTouched?: boolean;
  toTouched?: boolean;
  error?: string;
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Container = styled.div`
  text-align: left;
`;

const SelectRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing2x};
`;

const SelectRange = styled.div`
  width: 136px;
  flex-grow: 1;
`;

const Separate = styled.span`
  padding: ${({ theme }) => theme.spacing2x};
`;

const Error = styled.div`
  font-size: 1.2rem;
  color: #f00;
  margin: ${({ theme }) => `${theme.spacing1x} ${theme.spacing2x}`};
`;

const SelectRangeFromTo: React.FC<Props> = ({ from, to, fromTouched, toTouched, error, handleChange }) => (
  <Container>
    出題範囲
    <SelectRow>
      <label className="bp3-label">
        <SelectRange className="bp3-select bp3-large">
          <Field component="select" name="rangeFrom" value={from} onChange={handleChange}>
            {RangeFromConditions.values.map((value, i) => (
              <option value={value} key={`range_from_${i}`}>
                {toKarutaNoString(value)}
              </option>
            ))}
          </Field>
        </SelectRange>
      </label>
      <Separate>〜</Separate>
      <label className="bp3-label">
        <SelectRange className="bp3-select bp3-large">
          <Field component="select" name="rangeTo" value={to} onChange={handleChange}>
            {RangeToConditions.values.map((value, i) => (
              <option value={value} key={`range_to_${i}`}>
                {toKarutaNoString(value)}
              </option>
            ))}
          </Field>
        </SelectRange>
      </label>
    </SelectRow>
    {(fromTouched || toTouched) && error && <Error>{error}</Error>}
  </Container>
);

export default SelectRangeFromTo;
