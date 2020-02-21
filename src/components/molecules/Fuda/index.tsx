import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Karuta } from '@src/types';
import Block from '@src/components/atoms/Block';
import VerticalTxt from '@src/components/atoms/VerticalTxt';
import { ThemeInterface } from '@src/styles/theme';

type Size = 's' | 'm' | 'l';

export type Props = {
  karuta: Karuta;
  size?: Size;
  className?: string;
};

const RATIO_L = 1.15;
const RATIO_S = 0.875;

const ROOT_STYLE_MAP = {
  s: {
    width: `${175 * RATIO_S}px`,
    height: `${230 * RATIO_S}px`,
    borderWidth: `${5 * RATIO_S}px`,
  },
  m: {
    width: `175px`,
    height: `230px`,
    borderWidth: `5px`,
  },
  l: {
    width: `${230 * RATIO_S}px`,
    height: `${230 * RATIO_L}px`,
    borderWidth: `${5 * RATIO_L}px`,
  },
} as const;

const PHRASE_STYLE_MAP = {
  s: {
    paddingUnit: 5,
    marginRight: 5,
  },
  m: {
    paddingUnit: 7,
    marginRight: 7,
  },
  l: {
    paddingUnit: 8,
    marginRight: 8,
  },
};

const CREATOR_STYLE_MAP = {
  s: {
    fontSize: `${1.3 * RATIO_S}rem`,
    lineHeight: `${1.4 * RATIO_S}rem`,
    marginRight: `${14 * RATIO_S}px`,
  },
  m: {
    fontSize: `1.3rem`,
    lineHeight: `1.4rem`,
    marginRight: `14px`,
  },
  l: {
    fontSize: `${1.3 * RATIO_L}rem`,
    lineHeight: `${1.4 * RATIO_L}rem`,
    marginRight: `${14 * RATIO_L}px`,
  },
};

const useStyles = makeStyles<ThemeInterface, { size: Size }>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorThin,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    borderRadius: 10,
    fontFamily: 'Sawarabi Mincho',
    width: ({ size }) => ROOT_STYLE_MAP[size].width,
    height: ({ size }) => ROOT_STYLE_MAP[size].height,
    borderWidth: ({ size }) => ROOT_STYLE_MAP[size].borderWidth,
  },
  inner: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  firstPhrase: {},
  secondPhrase: {
    paddingTop: ({ size }) => `${PHRASE_STYLE_MAP[size].paddingUnit * 3}px`,
    marginRight: ({ size }) => `${PHRASE_STYLE_MAP[size].marginRight}px`,
  },
  thirdPhrase: {
    paddingTop: ({ size }) => `${PHRASE_STYLE_MAP[size].paddingUnit * 6}px`,
    marginRight: ({ size }) => `${PHRASE_STYLE_MAP[size].marginRight}px`,
  },
  fourthPhrase: {
    paddingTop: ({ size }) => `${PHRASE_STYLE_MAP[size].paddingUnit * 4}px`,
    marginRight: ({ size }) => `${PHRASE_STYLE_MAP[size].marginRight}px`,
  },
  fifthPhrase: {
    paddingTop: ({ size }) => `${PHRASE_STYLE_MAP[size].paddingUnit * 7}px`,
    marginRight: ({ size }) => `${PHRASE_STYLE_MAP[size].marginRight}px`,
  },
  creator: {
    alignSelf: 'flex-end',
    fontSize: ({ size }) => CREATOR_STYLE_MAP[size].fontSize,
    lineHeight: ({ size }) => CREATOR_STYLE_MAP[size].lineHeight,
    marginRight: ({ size }) => CREATOR_STYLE_MAP[size].marginRight,
  },
}));

const Fuda = ({ karuta, size = 'l', className = '' }: Props) => {
  const classes = useStyles({ size });
  return (
    <Block className={clsx(classes.root, className)}>
      <Block className={classes.inner}>
        <VerticalTxt size={size} className={classes.firstPhrase}>
          {karuta.firstKanji}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.secondPhrase}>
          {karuta.secondKanji}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.thirdPhrase}>
          {karuta.thirdKanji}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.fourthPhrase}>
          {karuta.fourthKanji}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.fifthPhrase}>
          {karuta.fifthKanji}
        </VerticalTxt>
        <VerticalTxt size={size} className={classes.creator}>
          {karuta.creator}
        </VerticalTxt>
      </Block>
    </Block>
  );
};

export default Fuda;
