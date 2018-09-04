import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ThunkExtra } from '@src/store';
import { GlobalState } from '@src/reducers';
import { fetchKarutas, KarutaActions } from '@src/actions/karutas';
import Progress, { ProgressProps } from '@src/components/Progress';

export type InitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, ThunkExtra, KarutaActions>
): InitializerDispatchProps => ({
  onStart: () => {
    dispatch(fetchKarutas());
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(Progress);
