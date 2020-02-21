import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  size?: number;
  color?: string;
};

const useStyles = makeStyles<ThemeInterface, { color?: string }>(theme => ({
  root: {
    color: props => (props.color ? props.color : theme.palette.primary.dark),
  },
}));

const Progress = ({ color, size = 64 }: Props) => (
  <CircularProgress style={{ width: size, height: size }} className={useStyles({ color }).root} />
);

export default Progress;
