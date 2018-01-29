import { connect, Dispatch } from 'react-redux';
import { fetchKarutas } from '../../actions/karuta';
import Entrance, {
  EntranceConnectedProps,
  EntranceDispatchProps,
  EntranceOwnProps
} from '../../components/Entrance';
import { GlobalState } from '../../reducers/index';

const mapStateToProps = (
  state: GlobalState
): EntranceOwnProps & EntranceConnectedProps => {
  console.dir(state);
  return {
    initialized: false
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): EntranceDispatchProps => {
  return {
    onStartApp: () => {
      dispatch(fetchKarutas());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entrance);
