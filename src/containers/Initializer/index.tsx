import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { fetchKarutas } from '../../actions/karutas';
import Progress, { ProgressProps } from '../../components/Progress';

export type InitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): InitializerDispatchProps => {
  return {
    onStart: () => {
      dispatch(fetchKarutas());
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Progress);
