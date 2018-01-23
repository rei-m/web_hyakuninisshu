import * as React from 'react';

export type EntranceOwnProps = React.ClassAttributes<Entrance>;

export interface EntranceConnectedProps {
  initialized: boolean;
}

export interface EntranceDispatchProps {
  onStartApp: () => void;
}

export type EntranceProps = EntranceOwnProps & EntranceConnectedProps & EntranceDispatchProps;

export default class Entrance extends React.Component<EntranceProps, {}> {

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
