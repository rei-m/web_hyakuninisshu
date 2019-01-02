import * as React from 'react';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import Dogeza from '@src/components/Dogeza';
import { AppError, UNKNOWN_MESSAGE } from '@src/errors';

export interface State {
  error?: Error;
}

const Container = styled.div`
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

export default class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(errorInfo);
    }
    this.setState({
      error,
    });
  }

  public render() {
    const { error } = this.state;
    if (error) {
      const message = error instanceof AppError ? error.message : UNKNOWN_MESSAGE;
      return (
        <Container>
          <Message>{message}</Message>
          <Dogeza
            alt="エラーが起きました"
            style={{
              marginTop: appTheme.spacing4x,
            }}
          />
        </Container>
      );
    }
    return this.props.children;
  }
}
