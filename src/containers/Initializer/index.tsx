import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '@src/reducers';
import { fetchKarutas } from '@src/actions/karutas';
import Progress, { ProgressProps } from '@src/components/Progress';

export type InitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): InitializerDispatchProps => ({
  onStart: () => {
    dispatch(fetchKarutas());
  }
});

export default connect(undefined, mapDispatchToProps)(Progress);
