import * as React from 'react';
import Header from '../Header';
import MenuSection from '../MenuSection';

export type EntranceOwnProps = React.ClassAttributes<Entrance>;

export interface EntranceConnectedProps {
  initialized: boolean;
}

export interface EntranceDispatchProps {
  onStartApp: () => void;
}

export type EntranceProps = EntranceOwnProps & EntranceConnectedProps & EntranceDispatchProps;

export default class Entrance extends React.Component<EntranceProps> {

  public componentDidMount() {
    this.props.onStartApp();
  }

  public render() {
    return (
      <div>
        <Header />
        <div style={{
          paddingTop: 64,
          textAlign:'center'
        }}>
          <MenuSection />
        </div>
      </div>
    );
  }
}
