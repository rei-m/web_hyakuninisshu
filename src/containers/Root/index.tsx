import { connect } from 'react-redux';
import { branch } from 'recompose';
import { GlobalState } from '../../reducers/index';
import Initializer from '../Initializer';
import Frame from '../../components/Frame';

export interface FrameConnectedProps {
  initialized: boolean;
}

export type FrameProps = FrameConnectedProps;

const mapStateToProps = ({ karuta }: GlobalState): FrameConnectedProps => {
  return {
    initialized: karuta.karutas.length > 0
  };
};

const isInitialized = ({ initialized }: FrameConnectedProps) => initialized;

const withInitializeCheck = branch<FrameProps>(
  isInitialized,
  component => component,
  _ => Initializer
);

export default connect(mapStateToProps)(withInitializeCheck(Frame));
