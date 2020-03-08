import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  title: string;
  from: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
  };
  to: {
    name: string;
    value: string;
    list: Array<{ value: string | number; text: string }>;
  };
  error?: string;
  className?: string;
  handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  select: {
    fontSize: theme.fontSize.m,
    flexGrow: 1,
    textAlign: 'left',
    maxWidth: 167,
  },
  labelContainer: {
    textAlign: 'left',
  },
  label: {
    fontSize: '1.05rem',
    color: '#182026',
  },
  separate: {
    padding: theme.spacing(0, 2),
  },
  error: {
    textAlign: 'left',
    fontSize: theme.fontSize.ss,
    color: '#f00',
    margin: theme.spacing(1, 0),
  },
}));

const SelectRangeFromTo = ({ title, from, to, error, className = '', handleChange }: Props) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.labelContainer}>
        <label className={classes.label}>{title}</label>
      </div>
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
        <span className={classes.separate}>〜</span>
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
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default SelectRangeFromTo;
