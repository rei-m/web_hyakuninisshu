import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';
import { ThemeInterface } from '@src/styles/theme';

export type Props = TxtProps;

const toLineHeight = (size: string) => {
  const value = Number(size.replace('rem', ''));
  return `${value + 0.1}rem`;
};

const useStyles = makeStyles<ThemeInterface, Pick<TxtProps, 'size'>>(theme => ({
  root: {
    display: 'inline-block',
    width: ({ size = 'm' }) => theme.fontSize[size],
    lineHeight: ({ size = 'm' }) => toLineHeight(theme.fontSize[size]),
  },
}));

const VerticalTxt: React.FC<Props> = props => {
  const classes = useStyles(props);
  return <Txt {...props} className={classes.root} />;
};

export default VerticalTxt;
