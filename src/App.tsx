import * as React from 'react';

export interface Props extends React.Props<App> {
  initialized: boolean;
  onStartApp: () => void;
}

export default class App extends React.Component<Props, {}> {

  public componentDidMount() {
    this.props.onStartApp();
  }

  public render() {
    return (
      <div>
        <div>test</div>
      </div>
    );
  }
}
