import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  title: string;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    padding: theme.spacing(2, 0),
    textAlign: 'left',
  },
  underlineHeading: {
    position: 'relative',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '&:after': {
      content: '""',
      width: '100%',
      borderBottom: '1px solid #a9a9a9',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  },
}));

const ReadingContent: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Section
      heading={
        <Heading level={2} visualLevel={1} className={classes.underlineHeading}>
          {title}
        </Heading>
      }
      className={classes.root}
    >
      {children}
    </Section>
  );
};

export default ReadingContent;
