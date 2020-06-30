import React from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import TripleContentsPageTemplate from '@src/presentation/components/templates/TripleContentsPageTemplate';
import ReadingContent from '@src/presentation/components/molecules/ReadingContent';
import Block from '@src/presentation/components/atoms/Block';
import Paragraph from '@src/presentation/components/atoms/Paragraph';
import PlayStoreBanner from '@src/presentation/components/atoms/PlayStoreBanner';
import { ThemeInterface } from '@src/presentation/styles/theme';

export type Props = Pick<RouteComponentProps, 'navigate'>;

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  bannerContainer: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AboutPage = ({ navigate }: Props) => {
  const handleClickBack = () => {
    if (navigate) {
      navigate(paths.root(), { replace: true });
    }
  };
  const classes = useStyles();
  return (
    <TripleContentsPageTemplate
      title={`百人一首 - サイトについて -`}
      description={`このサイトは百人一首を覚えるためのサイトです。百人一首の暗記を効率よく練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
      keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      menuType={'other'}
      onClickBack={handleClickBack}
      top={
        <ReadingContent title={`サイトについて`}>
          <Paragraph size={`s`}>
            このサイトは百人一首を覚えるためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
          </Paragraph>
        </ReadingContent>
      }
      middle={
        <ReadingContent title={`使い方について`}>
          <Paragraph size={`s`}>
            練習では様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
            もう全部覚えたという方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
            資料では百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
          </Paragraph>
        </ReadingContent>
      }
      bottom={
        <>
          <ReadingContent title={`アプリ版について`}>
            <Paragraph size={`s`}>
              Androidのみリリースしていて、読み上げ形式のアプリも用意しています。こちらは一旦インストールしていただけばオフラインでも使えます。iOS版は未定ですが、要望があればがんばります。
            </Paragraph>
            <Block className={classes.bannerContainer}>
              <PlayStoreBanner type="normal" />
              <PlayStoreBanner type="reader" />
            </Block>
          </ReadingContent>
          <ReadingContent title={`運営者について`}>
            <Paragraph size={`s`}>
              当サイトは
              <a href="https://twitter.com/rei_m" target="_blank" rel="noopener noreferrer">
                @rei_m
              </a>
              が個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
              アプリのレビューで読み上げ機能が欲しいというお声をいただくのですが、使用可能ないい音源があれば搭載します。
            </Paragraph>
          </ReadingContent>
          <ReadingContent title={`漫画のコマ画像について`}>
            <Paragraph size={`s`}>
              サイト内の漫画のコマ画像は
              <a href="https://alu.jp/" target="_blank" rel="noopener noreferrer">
                アル
              </a>
              の「コマ投稿」機能により表示しております。
            </Paragraph>
          </ReadingContent>
          <ReadingContent title={`プライバシー ポリシー`}>
            <Paragraph size={`s`}>
              サイトの利用状況の把握や広告配信のためにGoogle社が提供しているサービスを利用しております。詳しくは
              <a href="https://rei-m.github.io/app/policy/" target="_blank" rel="noopener noreferrer">
                こちら
              </a>
            </Paragraph>
          </ReadingContent>
        </>
      }
    />
  );
};

export default AboutPage;
