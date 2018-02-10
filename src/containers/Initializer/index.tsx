import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { fetchKarutas } from '../../actions/karutas';
import Progress, { ProgressDispatchProps } from '../../components/Progress';

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): ProgressDispatchProps => {
  return {
    onStart: () => {
      dispatch(fetchKarutas());
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Progress);
