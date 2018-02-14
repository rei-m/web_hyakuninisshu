import { connect } from 'react-redux';
import { branch } from 'recompose';
import { GlobalState } from '../../reducers/index';
import Initializer from '../Initializer';
import Frame from '../../components/Frame';

export interface RootProps {
  initialized: boolean;
}

const mapStateToProps = ({ karutasState }: GlobalState): RootProps => {
  return {
    initialized: karutasState.karutas.length > 0
  };
};

const isInitialized = ({ initialized }: RootProps) => initialized;

const withInitializeCheck = branch<RootProps>(
  isInitialized,
  component => component,
  _ => Initializer
);

export default connect(mapStateToProps)(withInitializeCheck(Frame));
