import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import KarutaImage from '@src/presentation/components/molecules/KarutaImage';
import MaterialKanjiTxt from '@src/presentation/components/molecules/MaterialKanjiTxt';
import MaterialKanaTxt from '@src/presentation/components/molecules/MaterialKanaTxt';
import Block from '@src/presentation/components/atoms/Block';
import Article from '@src/presentation/components/atoms/Article';
import Txt from '@src/presentation/components/atoms/Txt';
import Heading from '@src/presentation/components/atoms/Heading';
import Paragraph from '@src/presentation/components/atoms/Paragraph';
import KarutaNo from '@src/presentation/components/atoms/KarutaNo';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { Karuta } from '@src/domain/models';

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
