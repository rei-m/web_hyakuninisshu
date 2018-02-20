import * as React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';
import { MenuType } from '../../enums';

export const Body = styled.div`
  padding-top: 64px;
  text-align: center;
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
  isDisplayNav
}) => (
  <div>
    <Header subTitle={subTitle} canBack={canBack} onClickBack={onClickBack} />
    <Body>{children}</Body>
    {isDisplayNav && <Navigation />}
  </div>
);

export default Frame;
