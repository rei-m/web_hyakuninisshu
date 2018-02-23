import * as React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';
import { MenuType } from '../../enums';

export const Body = styled.div`
  padding-top: 56px;
  padding-bottom: 56px;
  text-align: center;
  background-color: #fffff0;
  min-height: 100vh;

  @media screen and (min-width: 768px) {
    padding-top: 64px;
    padding-bottom: 0;
    padding-left: 64px;
  }
`;

export interface FrameConnectedProps
  extends React.ClassAttributes<HTMLDivElement> {
  readonly subTitle: string;
  readonly canBack: boolean;
  readonly currentMenuType?: MenuType;
  readonly isDisplayNav: boolean;
}

export interface FrameDispatchProps {
  readonly onClickBack: () => void;
}

export type FrameProps = FrameConnectedProps & FrameDispatchProps;

const Frame: React.StatelessComponent<FrameProps> = ({
  canBack,
  children,
  subTitle,
  onClickBack,
  isDisplayNav,
  currentMenuType
}) => (
  <div>
    <Header subTitle={subTitle} canBack={canBack} onClickBack={onClickBack} />
    <Body>{children}</Body>
    {isDisplayNav && <Navigation currentMenuType={currentMenuType} />}
  </div>
);

export default Frame;
