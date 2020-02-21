import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import { ThemeInterface } from '@src/styles/theme';

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colorThin,
    boxSizing: 'border-box',
  },
}));

const MessagePageTemplate: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Block className={classes.root}>{children}</Block>;
};

export default MessagePageTemplate;
