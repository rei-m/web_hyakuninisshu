import * as React from 'react';
import Header from '../Header';

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
          paddingTop: 64
        }}>
          <section>
            <h2>メニュー</h2>
            <div>

              <div>
                <i className="skill-icon fa fa-lightbulb-o"></i>
                <div>練習</div>
                <p>説明</p>
              </div>              

            </div>
          </section>
        </div>
      </div>
    );
  }
}
