import * as React from 'react';
import Img from 'gatsby-image';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Txt from '@src/components/atoms/Txt';
import { useDogezaImage } from '@src/hooks/staticQueries/useDogezaImage';
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
            fluid={useDogezaImage()}
            style={{
              width: 200,
              marginTop: '32px',
            }}
            alt={`エラーが起きました`}
          />
        </MessagePageTemplate>
      );
    }
    return this.props.children;
  }
}
