import { connect, Dispatch } from 'react-redux';
import { branch } from 'recompose';
import { fetchKarutas } from '../../actions/karutas';
import Frame, {
  FrameConnectedProps,
  FrameDispatchProps,
  FrameOwnProps,
  FrameProps
} from '../../components/Frame';
import Progress from '../../components/Progress';
import { GlobalState } from '../../reducers/index';

const mapStateToProps = (
  state: GlobalState
): FrameOwnProps & FrameConnectedProps => {
  console.dir(state);
  return {
    initialized: false
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): FrameDispatchProps => {
  return {
    onStartApp: () => {
      dispatch(fetchKarutas());
    }
  };
};

const isInitialized = ({ initialized }: FrameConnectedProps) => {
  console.dir(initialized);
  return initialized;
};

const withInitializeCheck = branch<FrameProps>(
  isInitialized,
  component => component,
  _ => Progress
);

export default connect(mapStateToProps, mapDispatchToProps)(
  withInitializeCheck(Frame)
);
