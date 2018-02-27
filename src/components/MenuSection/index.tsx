import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '../MenuIcon';
import { MenuType } from '../../enums';
import { ROUTE_PATHS } from '../../constants';
import { Helmet } from 'react-helmet';

const RootSection = styled.div`
  padding: 16px;
  box-sizing: border-box;
  max-width: 960px;
  margin: auto;
  text-align: left;
`;

const Section = styled.section`
  margin: 32px 0;
`;

const SectionTitle = styled.h1`
  font-size: 2.4rem;
  position: relative;
  &:after {
    content: '';
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    position: absolute;
    bottom: -8px;
    left: 0;
  }
`;

const SectionText = styled.div`
  padding: 8px;
  line-height: 2rem;
`;

const MenuWrapper = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const MenuRoot = styled.div`
  padding: 16px;
  box-sizing: border-box;
  flex-grow: 1;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: 200px;
  }
`;

const MenuSection = () => (
  <RootSection>
    <Helmet>
      <title>unko</title>
    </Helmet>
    <Section>
      <SectionTitle>百人一首とは</SectionTitle>
      <SectionText>
        『百人一首』とは、100人の歌人の和歌を1人1首づつ選んだ歌集のことで、藤原定家が選んだ小倉百人一首が広く知られています。
        現代では詠み札と取り札に別れたかるたとしての知名度が高く、散らし取り、坊主めくりなどといった遊戯や競技かるたのように札取りを競い合うスポーツもあり、幅広く親しまれています。
      </SectionText>
    </Section>
    <Section>
      <SectionTitle>メニュー</SectionTitle>
      <SectionText>
        このサイトでは百人一首暗記の練習ができます。練習は読み札に対応する下の句を四択の中から選ぶクイズ形式となっています。繰り返し練習して百人一首のスタートに立ちましょう。
      </SectionText>
      <MenuWrapper>
        <MenuRoot>
          <Link to={ROUTE_PATHS.TRAINING}>
            <MenuIcon iconType={MenuType.Training} />
          </Link>
          <div>練習</div>
          <p>
            様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
          </p>
        </MenuRoot>
        <MenuRoot>
          <Link to={ROUTE_PATHS.EXAM}>
            <MenuIcon iconType={MenuType.Exam} />
          </Link>
          <div>腕試し</div>
          <p>
            自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
          </p>
        </MenuRoot>
        <MenuRoot>
          <Link to={ROUTE_PATHS.KARUTAS}>
            <MenuIcon iconType={MenuType.Material} />
          </Link>
          <div>資料</div>
          <p>
            百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
          </p>
        </MenuRoot>
      </MenuWrapper>
    </Section>
  </RootSection>
);

export default MenuSection;
