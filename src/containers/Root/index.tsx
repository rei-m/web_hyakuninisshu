import { connect, Dispatch } from 'react-redux';
import { fetchKarutas } from '../../actions/karuta';
import Frame, {
  FrameConnectedProps,
  FrameDispatchProps,
  FrameOwnProps
} from '../../components/Frame';
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

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
