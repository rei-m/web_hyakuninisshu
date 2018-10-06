import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import { MenuType } from '@src/enums';
import { APP_NAME } from '@src/constants';
import Header from '@src/components/Header';
import Navigation from '@src/components/Navigation';

export interface FrameProps {
  readonly subTitle: string;
  readonly canBack: boolean;
  readonly currentMenuType?: MenuType;
  readonly isDisplayNav: boolean;
  readonly description: string;
  readonly onClickBack: () => void;
}

type BodyProps = Pick<FrameProps, 'isDisplayNav'>;

export const Body = withAppTheme<BodyProps>(styled.div)`
  padding-top: ${({ theme }) => theme.headerHeight};
  padding-bottom: ${({ isDisplayNav, theme }) =>
    isDisplayNav ? theme.bottomNavHeight : '0'};
  text-align: center;
  background-color: ${({ theme }) => theme.colorThin};
  min-height: 100vh;

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    padding-top: ${({ theme }) => theme.headerHeightWide};
    padding-bottom: 0;
    padding-left: ${({ isDisplayNav, theme }) =>
      isDisplayNav ? theme.bottomNavHeight : '0'};
  }
`;

const Frame: React.SFC<FrameProps> = ({
  canBack,
  children,
  subTitle,
  description,
  onClickBack,
  isDisplayNav,
  currentMenuType
}) => (
  <div>
    <Helmet>
      <meta
        name="keywords"
        content="百人一首,小倉百人一首,歌,一覧,意味,歌番号,暗記,練習"
      />
      <meta name="description" content={description} />
      {!isDisplayNav && <meta name="robots" content="noindex,nofollow" />}
      <title>{`${APP_NAME} - ${subTitle} -`}</title>
    </Helmet>
    <Header subTitle={subTitle} canBack={canBack} onClickBack={onClickBack} />
    <Body isDisplayNav={isDisplayNav}>{children}</Body>
    {isDisplayNav && <Navigation currentMenuType={currentMenuType} />}
  </div>
);

export default Frame;
