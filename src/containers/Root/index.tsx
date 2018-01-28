import { connect, Dispatch } from 'react-redux';
import { fetchKarutas } from '../../actions/karuta';
import { GlobalState } from '../../reducers/index';
import Entrance, {
  EntranceOwnProps,
  EntranceConnectedProps,
  EntranceDispatchProps
} from '../../components/Entrance';

const mapStateToProps = (_state: GlobalState, _props: EntranceOwnProps): EntranceOwnProps & EntranceConnectedProps => {
  return {
    initialized: false,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<GlobalState>, _props: EntranceOwnProps): EntranceDispatchProps => {
  return {
    onStartApp: () => {
      dispatch(fetchKarutas());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrance);
