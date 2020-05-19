import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import MenuLink from '@src/presentation/components/molecules/MenuLink';
import Block from '@src/presentation/components/atoms/Block';
import { ExamIcon, MaterialIcon, TrainingIcon } from '@src/presentation/components/atoms/MenuIcon';
import { ThemeInterface } from '@src/presentation/styles/theme';

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      flexDirection: 'row',
    },
  },
  menuLink: {
    margin: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
    flexGrow: 1,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      width: 224,
      flexGrow: 0,
    },
  },
}));

const MainMenuList = () => {
  const classes = useStyles();
  return (
    <Block className={classes.root}>
      <MenuLink
        to={paths.training()}
        icon={<TrainingIcon />}
        name={`練習`}
        description={`様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。`}
        className={classes.menuLink}
      />
      <MenuLink
        to={paths.exam()}
        icon={<ExamIcon />}
        name={`腕試し`}
        description={`自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。`}
        className={classes.menuLink}
      />
      <MenuLink
        to={paths.karutas()}
        icon={<MaterialIcon />}
        name={`資料`}
        description={`百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。`}
        className={classes.menuLink}
      />
    </Block>
  );
};

export default MainMenuList;
