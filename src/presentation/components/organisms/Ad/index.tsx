import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AdSense from 'react-adsense';
import Block from '@src/presentation/components/atoms/Block';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = {
  type: 'top' | 'responsive';
  className?: string;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(2),
  },
  dummyTop: {
    width: 320,
    height: 100,
    border: '1px solid #123',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    '@media (min-width: 500px)': {
      width: 468,
      height: 60,
    },
    '@media (min-width: 800px)': {
      width: 728,
      height: 90,
    },
  },
  dummyResponsive: {
    height: 100,
    border: '1px solid #123',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AdProperty = {
  client: 'ca-pub-4104372369598017',
  slot: '9171068817',
};

export const AdProduction = ({ type, className = '' }: Props) => {
  const classes = useStyles();
  return (
    <Block className={clsx(classes.root, className)}>
      {type === 'top' ? (
        //         <>
        //           <style
        //             dangerouslySetInnerHTML={{
        //               __html: `
        // .ad_top { width: 320px; height: 100px; }
        // @media(min-width: 500px) { .ad_top { width: 468px; height: 60px; } }
        // @media(min-width: 800px) { .ad_top { width: 728px; height: 90px; } }
        // `,
        //             }}
        //           />
        //           <AdSense.Google
        //             {...AdProperty}
        //             className={`ad_top`}
        //             style={{ display: 'inline-block' }}
        //             format={``}
        //             responsive={``}
        //           />
        //         </>
        <AdSense.Google {...AdProperty} style={{ display: 'block' }} format={`auto`} responsive={`true`} />
      ) : (
        <AdSense.Google {...AdProperty} style={{ display: 'block' }} format={`auto`} responsive={`true`} />
      )}
    </Block>
  );
};

export const AdDummy = ({ type, className = '' }: Props) => {
  const classes = useStyles();
  return (
    <Block className={clsx(classes.root, className)}>
      {type === 'top' ? (
        <Block className={classes.dummyTop}>この欄は広告枠です</Block>
      ) : (
        <Block className={classes.dummyResponsive}>この欄は広告枠です</Block>
      )}
    </Block>
  );
};

const Ad = process.env.NODE_ENV === 'production' ? AdProduction : AdDummy;

export default Ad;
