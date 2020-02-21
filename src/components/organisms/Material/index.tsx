import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import Article from '@src/components/atoms/Article';
import Txt from '@src/components/atoms/Txt';
import Heading from '@src/components/atoms/Heading';
import Paragraph from '@src/components/atoms/Paragraph';
import KarutaNo from '@src/components/atoms/KarutaNo';
import KarutaImage from '@src/components/molecules/KarutaImage';
import MaterialKanjiTxt from '@src/components/molecules/MaterialKanjiTxt';
import MaterialKanaTxt from '@src/components/molecules/MaterialKanaTxt';
import { Karuta } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  karuta: Karuta;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    boxSizing: 'border-box',
    border: `8px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    padding: theme.spacing(2),
    maxWidth: 380,
    boxShadow: theme.elevationShadow1x,
  },
  subTitle: {
    textAlign: 'left',
  },
  karutaImage: {
    width: 200,
    margin: theme.spacing(1),
  },
  contentContainer: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  translation: {
    textAlign: 'left',
  },
}));

const Material = ({ karuta }: Props) => {
  const classes = useStyles();
  return (
    <Article
      heading={
        <Heading level={3}>
          <KarutaNo karutaNo={karuta.no} /> / <Txt>{karuta.creator}</Txt>
        </Heading>
      }
      className={classes.root}
    >
      <KarutaImage karutaNo={karuta.no} className={classes.karutaImage} />
      <Block className={classes.contentContainer}>
        <Heading level={4} visualLevel={5} className={classes.subTitle}>
          原文
        </Heading>
        <MaterialKanjiTxt karuta={karuta} size={`s`} />
        <MaterialKanaTxt karuta={karuta} size={`s`} />
      </Block>
      <Block className={classes.contentContainer}>
        <Heading level={4} visualLevel={5} className={classes.subTitle}>
          訳
        </Heading>
        <Paragraph size={`s`} className={classes.translation}>
          {karuta.translation}
        </Paragraph>
      </Block>
    </Article>
  );
};

export default Material;
