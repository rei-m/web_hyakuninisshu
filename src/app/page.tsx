import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { PageLayout } from '@/app/components/organisms/PageLayout';
import { MainMenuList } from '@/app/components/organisms/MainMenuList';
import { SmallMaterial } from '@/app/components/organisms/SmallMaterial';
import { Chihaya } from '@/app/components/organisms/Chihaya';
import { Ad } from '@/app/components/organisms/Ad';
import { ReadingContent } from '@/app/components/molecules/ReadingContent';
import { AppStoreBanner } from '@/app/components/atoms/AppStoreBanner';
import { PlayStoreBanner } from '@/app/components/atoms/PlayStoreBanner';
import { karutaRepository } from '@/domains/repositories';

const HomePage = () => (
  <PageLayout title={'百人一首 - 簡単に暗記 -'} isDisplayNav={true}>
    <Box
      sx={{
        boxSizing: 'border-box',
        padding: 2,
        maxWidth: 960,
        margin: 'auto',
      }}
    >
      <ReadingContent title={`百人一首 簡単に暗記について`}>
        <Typography>
          このサイトは百人一首を手軽に暗記するためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
        </Typography>
      </ReadingContent>
      <Ad type={`responsive`} />
      <ReadingContent title={`メニュー`}>
        <Typography>
          百人一首の練習は読み札に対応する下の句を四択の中から選ぶクイズ形式となっています。繰り返し練習して百人一首のスタートに立ちましょう。
        </Typography>
        <MainMenuList />
      </ReadingContent>
      <ReadingContent title={`アプリ版`}>
        <Typography>
          よりサクサク使えるアプリ版を用意しています。百人一首の読み上げ形式も対応していますので、自信のついた方におすすめです。
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              paddingTop: 4,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <AppStoreBanner type="normal" />
            <AppStoreBanner type="reader" />
          </Box>
          <Box
            sx={{
              paddingTop: 4,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PlayStoreBanner type="normal" />
            <PlayStoreBanner type="reader" />
          </Box>
        </Box>
      </ReadingContent>
      <Ad type={`responsive`} />
      <ReadingContent title={`百人一首とは`}>
        <Typography component={'p'}>
          百人一首とは、100人の歌人の和歌を1人1首づつ選んだ歌集のことで、藤原定家が選んだ小倉百人一首が広く知られています。
          <br />
          現代では詠み札と取り札に別れたかるたとしての知名度が高く、散らし取り、坊主めくりなどといった遊戯や競技かるたのように札取りを競い合うスポーツもあり、幅広く親しまれています。
          百首覚えたあとは色々な遊び方を探してみてはいかがでしょうか。
        </Typography>
      </ReadingContent>
      <ReadingContent title={`ちはやふる基金の紹介`}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 1,
          }}
        >
          <Chihaya />
        </Box>
        <Typography component={'p'}>
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
        </Typography>
      </ReadingContent>
      <Ad type={`responsive`} />
      <ReadingContent title={`百人一首の用語について`}>
        <dl>
          <dt>
            <Typography>決まり字</Typography>
          </dt>
          <dd>
            <Typography>
              歌を上の句の最初から読んでいき、その文字が読まれたら、その歌が、どの一首なのかが決まるところの文字をいいます。
              <br />
              例えば「村雨の 露もまだひぬ 槇の葉に 霧たちのぼる
              秋の夕ぐれ」という歌がありますが、百首のなかで「む」で始まる歌はこの歌しかないので、この歌の決まり字は一字決まりとなります。
            </Typography>
          </dd>
          <dt>
            <Typography>上の句</Typography>
          </dt>
          <dd>
            <Typography>
              歌は五七五七七の五つの句で構成されており、その前半の五七五の部分のこと。かるた遊びをする際は詠み札となります。
            </Typography>
          </dd>
          <dt>
            <Typography>下の句</Typography>
          </dt>
          <dd>
            <Typography>
              歌は五七五七七の五つの句で構成されており、その後半の七七の部分のこと。かるた遊びでは取り札となります。
            </Typography>
          </dd>
        </dl>
      </ReadingContent>
      <ReadingContent title={`競技かるたについて`}>
        <Typography>
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
        </Typography>
      </ReadingContent>
      <ReadingContent title={`百人一首 歌一覧`}>
        <List
          sx={{
            padding: 0,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            '& > li': {
              width: '100%',
              padding: 0,
              '@media screen and (min-width:600px)': {
                width: '49%',
              },
            },
          }}
        >
          {karutaRepository.all().map((karuta) => (
            <ListItem key={karuta.no}>
              <SmallMaterial
                karuta={karuta}
                separate={` `}
                image={false}
                sx={{
                  backgroundColor: '#fffff0',
                  padding: 0,
                  ':hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#106ba3',
                    backgroundColor: '#fffff0',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </ReadingContent>
    </Box>
  </PageLayout>
);

export default HomePage;
