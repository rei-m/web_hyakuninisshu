import React from 'react';
import clsx from 'clsx';
import { GatsbyLinkProps, Link } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Block from '@src/presentation/components/atoms/Block';
import Txt from '@src/presentation/components/atoms/Txt';
import Paragraph from '@src/presentation/components/atoms/Paragraph';
import { withRipple } from '@src/presentation/enhancers/withRipple';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  to: string;
  icon: React.ReactElement<SvgIconProps>;
  name: string;
  description: string;
  className?: string;
};

const LinkWithRipple = withRipple<GatsbyLinkProps<{}>>(Link);

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  root: {
    border: '1px solid #00000030',
    backgroundColor: theme.palette.common.white,
    borderRadius: 16,
    boxSizing: 'border-box',
    textAlign: 'center',
    '&:hover': {
      textDecoration: 'none',
      borderRadius: 16,
      backgroundColor: '#f5f5f5',
    },
  },
  iconWrapper: {
    width: 32,
    height: 32,
    border: '2px solid #f1b400',
    borderRadius: '50%',
    color: '#f1b400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1,
    '& svg': {
      fontSize: 'inherit',
    },
    '@media screen and (min-width: 768px)': {
      width: 124,
      height: 124,
      borderWidth: 4,
      position: 'initial',
      fontSize: '6rem',
      margin: '0 auto',
    },
  },
  title: {
    margin: theme.spacing(1),
    color: theme.fontColor.link,
    position: 'relative',
    '&:after': {
      content: '""',
      width: '100%',
      borderBottom: '4px double #a9a9a9',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
    },
  },
  explain: {
    marginTop: theme.spacing(3),
    color: theme.fontColor.link,
  },
}));

const linkStyles = {
  ':hover': {
    textDecoration: 'none',
  },
  display: 'inline-block',
  height: '100%',
  padding: '16px',
};

const MenuLink = ({ to, icon, name, description, className = '' }: Props) => {
  const classes = useStyles();
  return (
    <Block className={clsx(classes.root, className)}>
      <LinkWithRipple to={to} style={linkStyles}>
        <span className={classes.iconWrapper}>{icon}</span>
        <Txt tag={`div`} size={`ll`} className={classes.title}>
          {name}
        </Txt>
        <Paragraph size={`s`} className={classes.explain}>
          {description}
        </Paragraph>
      </LinkWithRipple>
    </Block>
  );
};

export default MenuLink;
