import * as React from 'react';
import styled from 'styled-components';
import Header from '../Header';

export type FrameOwnProps = React.ClassAttributes<Frame>;

export interface FrameConnectedProps {
  initialized: boolean;
}

export interface FrameDispatchProps {
  onStartApp: () => void;
}

export type FrameProps = FrameOwnProps &
  FrameConnectedProps &
  FrameDispatchProps;

const Body = styled.div`
  padding-top: 64px;
  text-align: center;
`;

export default class Frame extends React.Component<FrameProps> {
  public componentDidMount() {
    this.props.onStartApp();
  }

  public render() {
    return (
      <div>
        <Header />
        <Body>{this.props.children}</Body>
      </div>
    );
  }
}
