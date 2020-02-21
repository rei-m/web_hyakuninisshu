import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  title: string;
  name: string;
  value: string;
  list: Array<{ value: string | number; text: string }>;
  error?: string;
  className?: string;
  handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  formControl: {
    display: 'flex',
  },
  label: {
    fontSize: theme.fontSize.s,
    color: '#182026',
  },
  select: {
    fontSize: theme.fontSize.m,
    textAlign: 'left',
  },
  error: {
    fontSize: theme.fontSize.ss,
    color: '#f00',
    margin: theme.spacing(1, 0),
  },
}));

const SelectItem = ({ title, name, value, list, error, className = '', handleChange }: Props) => {
  const classes = useStyles();
  return (
    <FormControl className={`${classes.formControl} ${className}`}>
      <InputLabel htmlFor={`id-${name}`} className={classes.label}>
        {title}
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name,
          id: `id-${name}`,
        }}
        className={classes.select}
      >
        {list.map(item => (
          <MenuItem value={item.value} className={classes.select} key={`select_item_${item.value}`}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      {error && <div className={classes.error}>{error}</div>}
    </FormControl>
  );
};

export default SelectItem;
