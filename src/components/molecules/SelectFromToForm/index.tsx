import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from '@src/styles/styled-components';
import { ThemeInterface } from '@src/styles/theme';
import CenteredFrame from '@src/components/atoms/CenteredFrame';

export interface Props {
  title: string;
  from: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
    touched?: boolean;
  };
  to: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
    touched?: boolean;
  };
  error?: string;
  className?: string;
  handleChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles<ThemeInterface>(theme => ({
  select: {
    fontSize: theme.fontSize.m,
    flexGrow: 1,
    textAlign: 'left',
  },
}));

const LabelContainer = styled.div`
  text-align: left;
`;

const Label = styled.label`
  font-size: 1.05rem;
  color: #182026;
`;

const Separate = styled.span`
  padding: ${({ theme }) => `0 ${theme.spacingByPx(2)}`};
`;

const Error = styled.div`
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.ss};
  color: #f00;
  margin: ${({ theme }) => `${theme.spacingByPx(1)} 0`};
`;

const SelectRangeFromTo = ({ title, from, to, error, className = '', handleChange }: Props) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <LabelContainer>
        <Label>{title}</Label>
      </LabelContainer>
      <CenteredFrame tag={`div`}>
        <Select
          value={from.value}
          onChange={handleChange}
          inputProps={{
            name: from.name,
            id: `id-${from.name}`,
          }}
          className={classes.select}
        >
          {from.list.map(({ value, text }) => (
            <MenuItem value={value} className={classes.select} key={`range_from_${value}`}>
              {text}
            </MenuItem>
          ))}
        </Select>
        <Separate>〜</Separate>
        <Select
          value={to.value}
          onChange={handleChange}
          inputProps={{
            name: to.name,
            id: `id-${to.name}`,
          }}
          className={classes.select}
        >
          {to.list.map(({ value, text }) => (
            <MenuItem value={value} className={classes.select} key={`range_to_${value}`}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </CenteredFrame>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default SelectRangeFromTo;
