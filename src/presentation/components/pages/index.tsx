import React from 'react';
import { Link } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import TripleContentsPageTemplate from '@src/presentation/components/templates/TripleContentsPageTemplate';
import MainMenuList from '@src/presentation/components/organisms/MainMenuList';
import SmallMaterial from '@src/presentation/components/organisms/SmallMaterial';
import Chihaya from '@src/presentation/components/organisms/Chihaya';
import ReadingContent from '@src/presentation/components/molecules/ReadingContent';
import Paragraph from '@src/presentation/components/atoms/Paragraph';
import Txt from '@src/presentation/components/atoms/Txt';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { Karuta } from '@src/domain/models';

export type Props = {
  karutaList: Array<Karuta>;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  karutaList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > li': {
      width: '100%',
      [`@media screen and (min-width:${theme.minWidthWide})`]: {
        width: '49%',
      },
    },
  },
  material: {
    backgroundColor: theme.colorThin,
    color: theme.fontColor.link,
  },
  chihayaWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
}));

const IndexPage = ({ karutaList }: Props) => {
  const classes = useStyles();
  return (
    <TripleContentsPageTemplate
      title={`百人一首 - 簡単に暗記 -`}
      keywords={[`百人一首`, `小倉百人一首`, `ちはやふる`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      top={
        <ReadingContent title={`百人一首 簡単に暗記について`}>
          <Paragraph size={`s`}>
            このサイトは百人一首を手軽に暗記するためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
          </Paragraph>
        </ReadingContent>
      }
      middle={
        <ReadingContent title={`メニュー`}>
          <Paragraph size={`s`}>
            百人一首の練習は詠み札に対応する下の句を四択の中から選ぶクイズ形式となっています。繰り返し練習して百人一首のスタートに立ちましょう。
          </Paragraph>
          <MainMenuList />
        </ReadingContent>
      }
      bottom={
        <>
          <ReadingContent title={`百人一首とは`}>
            <Paragraph size={`s`}>
              百人一首とは、100人の歌人の和歌を1人1首づつ選んだ歌集のことで、藤原定家が選んだ小倉百人一首が広く知られています。
              <br />
              現代では詠み札と取り札に別れたかるたとしての知名度が高く、散らし取り、坊主めくりなどといった遊戯や競技かるたのように札取りを競い合うスポーツもあり、幅広く親しまれています。
              百首覚えたあとは色々な遊び方を探してみてはいかがでしょうか。
            </Paragraph>
          </ReadingContent>
          <ReadingContent title={`ちはやふる基金の紹介`}>
            <div className={classes.chihayaWrapper}>
              <Chihaya />
            </div>
            <Paragraph size={`s`}>
              <a href="https://chihayafund.com/" target="_blank" rel="noopener noreferrer">
                ちはやふる基金
              </a>
              は、競技かるたの支援や百人一首の振興を目的として、
              <a href="https://be-love.jp/c/chihaya.html" target="_blank" rel="noopener noreferrer">
                ちはやふる
              </a>
              の作者の
              <a href="https://twitter.com/yuyu2000_0908" target="_blank" rel="noopener noreferrer">
                末次先生
              </a>
              が発起人となり設立された団体です。競技かるた界隈は競技人口の増加で盛り上がりを続ける一方、選手の育成支援や大会運営においてさまざまな負担も増加しているようです。この基金はそういった課題を解消するために設立されています。
              <br />
              <br />
              このサイトは中の人がちはやふるにはまったことがきっかけで作ったサイトです。微力ながら恩返しの意味も込めて紹介させていただきます。
            </Paragraph>
          </ReadingContent>
          <ReadingContent title={`百人一首の用語について`}>
            <dl>
              <dt>
                <Txt size={`s`}>決まり字</Txt>
              </dt>
              <dd>
                <Paragraph size={`s`}>
                  歌を上の句の最初から読んでいき、その文字が読まれたら、その歌が、どの一首なのかが決まるところの文字をいいます。
                  <br />
                  例えば「村雨の 露もまだひぬ 槇の葉に 霧たちのぼる
                  秋の夕ぐれ」という歌がありますが、百首のなかで「む」で始まる歌はこの歌しかないので、この歌の決まり字は一字決まりとなります。
                </Paragraph>
              </dd>
              <dt>
                <Txt size={`s`}>上の句</Txt>
              </dt>
              <dd>
                <Paragraph size={`s`}>
                  歌は五七五七七の五つの句で構成されており、その前半の五七五の部分のこと。かるた遊びをする際は詠み札となります。
                </Paragraph>
              </dd>
              <dt>
                <Txt size={`s`}>下の句</Txt>
              </dt>
              <dd>
                <Paragraph size={`s`}>
                  歌は五七五七七の五つの句で構成されており、その後半の七七の部分のこと。かるた遊びでは取り札となります。
                </Paragraph>
              </dd>
            </dl>
          </ReadingContent>
          <ReadingContent title={`競技かるたについて`}>
            <Paragraph size={`s`}>
              小倉百人一首を用いて行う競技です。百人一首というと畳の上で穏やかに遊ぶ印象がありますが、競技かるたはハードなスポーツに近いです。
              <br />
              詠み上げた上の句に対応する下の句の札を取るという基本的なルールは普通のかるた遊びと共通していますが、取った枚数を競いはしません。
              <br />
              百首のなかから50首が選ばれ、選ばれた歌の取り札が自陣と敵陣にそれぞれ分配されます。競技かるたの試合はこの自陣の札を空にすることで勝利となります。
              札は自陣の札を取ればそのまま減らし、敵陣の札を取れば敵陣の札をどけた上で自陣から敵陣に一枚札を送ります。これを送り札といいます。
              <br />
              50首を選んでいるので詠まれた札が自陣・敵陣に存在しない場合があります。これは空札といいます。取り札を間違えた場合や空札なのに取り札に触った場合はお手付きとなり、敵陣に札を送れます。
              <br />
              自陣の札を取る、または敵陣の札を取って自陣の札を敵陣に送る、という勝負を繰り返して自陣を先に空にしたほうが勝者となります。
              <br />
              近年では競技かるたを題材とした漫画の「
              <a href="https://be-love.jp/c/chihaya.html" target="_blank" rel="noopener noreferrer">
                ちはやふる
              </a>
              」がアニメ化や実写映画化されるなど人気が高まっています。
            </Paragraph>
          </ReadingContent>
          <ReadingContent title={`百人一首 歌一覧`}>
            <ul className={classes.karutaList}>
              {karutaList.map(karuta => (
                <li key={karuta.no}>
                  <Link to={paths.karutasShow(karuta.no)}>
                    <SmallMaterial karuta={karuta} separate={` `} image={false} className={classes.material} />
                  </Link>
                </li>
              ))}
            </ul>
          </ReadingContent>
        </>
      }
    />
  );
};

export default IndexPage;
