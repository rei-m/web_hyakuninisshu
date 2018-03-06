import * as React from 'react';
import styled from 'styled-components';
import { appTheme, withAppTheme } from '../../styles';
import Dogeza from '../Dogeza';
import { AppError, UNKNOWN_MESSAGE } from '../../errors';

export interface ErrorBoundaryState {
  readonly error?: Error;
}

const Root = withAppTheme(styled.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorThin};
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
`;

const Message = styled.div`
  font-size: 1.8rem;
`;

export default class ErrorBoundary extends React.Component<
  {},
  ErrorBoundaryState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(errorInfo);
    }
    this.setState({
      error
    });
  }

  public render() {
    const { error } = this.state;
    if (error) {
      const message =
        error instanceof AppError ? error.message : UNKNOWN_MESSAGE;
      return (
        <Root>
          <Message>{message}</Message>
          <Dogeza
            alt="エラーが起きました"
            style={{
              marginTop: appTheme.spacing4x
            }}
          />
        </Root>
      );
    }
    return this.props.children;
  }
}
