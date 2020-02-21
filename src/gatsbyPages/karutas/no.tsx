import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import Material from '@src/components/organisms/Material';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import { GeneratedPageComponentProps, Karuta } from '@src/types';
import { MenuType } from '@src/enums';
import { toKarutaNoString } from '@src/utils';
import { ThemeInterface } from '@src/styles/theme';

export type PageContext = {
  karuta: Karuta;
};

export type Props = GeneratedPageComponentProps<PageContext>;

const useStyles = makeStyles<ThemeInterface>(theme => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const onClickBackHandler = () => {
  window.history.back();
};

const KarutasNoPage = ({ pageContext }: Props) => {
  const { karuta } = pageContext;
  const karutaNoString = toKarutaNoString(karuta.no);
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      title={`百人一首 - ${karutaNoString} -`}
      description={`百人一首の${karutaNoString}の歌のページです。作者は${karuta.creator}です。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
      keywords={[`百人一首`, karutaNoString, karuta.creator, `小倉百人一首`, `歌`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={karutaNoString}
      menuType={MenuType.Material}
      onClickBack={onClickBackHandler}
      content={
        <CenteredFrame tag={`div`} className={classes.container}>
          <Material karuta={karuta} />
        </CenteredFrame>
      }
    />
  );
};

export default KarutasNoPage;
