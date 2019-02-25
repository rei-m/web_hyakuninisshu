import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { appTheme } from '@src/styles/theme';

export interface Props {
  size?: number;
  color?: string;
}

const Progress = ({ size = 64, color = appTheme.colorPrimaryDark }: Props) => (
  <CircularProgress style={{ color, width: size, height: size }} />
);

export default Progress;
