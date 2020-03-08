import React from 'react';
import UnhandledErrorPage from '@src/presentation/components/pages/500';

export type State = {
  error?: Error;
};

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
      return <UnhandledErrorPage error={error} />;
    }
    return this.props.children;
  }
}
