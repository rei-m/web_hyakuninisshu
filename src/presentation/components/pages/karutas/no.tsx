import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SingleContentPageTemplate from '@src/presentation/components/templates/SingleContentPageTemplate';
import Material from '@src/presentation/components/organisms/Material';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { Karuta, KarutaNo } from '@src/domain/models';

export type Props = {
  karuta: Karuta;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const onClickBackHandler = () => {
  window.history.back();
};

const KarutasNoPage = ({ karuta }: Props) => {
  const karutaNoString = KarutaNo.toJPNString(karuta.no);
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      title={`百人一首 - ${karutaNoString} -`}
      description={`百人一首の${karutaNoString}の歌のページです。作者は${karuta.creator}です。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
      keywords={[`百人一首`, karutaNoString, karuta.creator, `小倉百人一首`, `歌`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={karutaNoString}
      menuType={'material'}
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
