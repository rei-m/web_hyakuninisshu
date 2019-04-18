import * as React from 'react';
import Img from 'gatsby-image';
import { appTheme } from '@src/styles/theme';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Txt from '@src/components/atoms/Txt';
import { useAppContext } from '@src/hooks/useAppContext';
import { AppError, UNKNOWN_MESSAGE } from '@src/errors';

export interface State {
  error?: Error;
}

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
        <MessagePageTemplate>
          <Txt size={`l`}>{message}</Txt>
          <Img
            fluid={useAppContext().useDogezaImage()}
            style={{
              width: 200,
              marginTop: appTheme.spacing4x,
            }}
            alt={`エラーが起きました`}
          />
        </MessagePageTemplate>
      );
    }
    return this.props.children;
  }
}