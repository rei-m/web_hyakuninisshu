import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { withRipple } from '../../enhancers/withRipple';
import MenuIcon from '../MenuIcon';
import { MenuType } from '../../enums';
import { ROUTE_PATHS } from '../../constants';

const RootSection = withAppTheme(styled.div)`
  padding: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
  max-width: 960px;
  margin: auto;
  text-align: left;
`;

const Section = withAppTheme(styled.section)`
  margin: ${({ theme }) => theme.spacing4x} 0;
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

const SectionText = withAppTheme(styled.div)`
  padding: ${({ theme }) => theme.spacing1x};
  line-height: 2rem;
`;

const MenuWrapper = withAppTheme(styled.div)`
  padding: ${({ theme }) => theme.spacing4x} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const MenuRoot = withAppTheme(styled.div)`
  border: 1px solid #00000030;
  box-shadow: 0 2px 5px rgba(0,0,0,0.26);
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  flex-grow: 1;
  text-align: center;
  margin: 16px;

  & .title {
    font-size: 2.0rem;
    margin: 8px;
    position: relative;
    &:after {
      content: '';
      width: 100%;
      border-bottom: 4px double #a9a9a9;
      position: absolute;
      bottom: -8px;
      left: 0;
    }
  }

  & .text {
    margin-top: 24px
  }

  & :hover {
    text-decoration: none;
  }

  :hover {
    background-color: #f5f5f5;
  }

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    width: 224px;
    flex-grow: 0;
  }
`;

const LinkWithRipple = withRipple<LinkProps>(Link);

const linkStyles = {
  ':hover': {
    textDecoration: 'none'
  },
  display: 'inline-block',
  height: '100%',
  padding: '16px'
};

const MenuSection: React.SFC = () => (
  <RootSection>
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
          <LinkWithRipple to={ROUTE_PATHS.TRAINING} style={linkStyles}>
            <MenuIcon iconType={MenuType.Training} />
            <div className="title">練習</div>
            <p className="text">
              様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
            </p>
          </LinkWithRipple>
        </MenuRoot>
        <MenuRoot>
          <LinkWithRipple to={ROUTE_PATHS.EXAM} style={linkStyles}>
            <MenuIcon iconType={MenuType.Exam} />
            <div className="title">腕試し</div>
            <p className="text">
              自身のある方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
            </p>
          </LinkWithRipple>
        </MenuRoot>
        <MenuRoot>
          <LinkWithRipple to={ROUTE_PATHS.KARUTAS} style={linkStyles}>
            <MenuIcon iconType={MenuType.Material} />
            <div className="title">資料</div>
            <p className="text">
              百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
            </p>
          </LinkWithRipple>
        </MenuRoot>
      </MenuWrapper>
    </Section>
  </RootSection>
);

export default MenuSection;
