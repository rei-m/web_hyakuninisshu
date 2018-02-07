import { connect, Dispatch } from 'react-redux';
import { lifecycle } from 'recompose';
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

const InitializerProgress = lifecycle<ProgressDispatchProps, {}>({
  componentDidMount() {
    this.props.onStart();
  }
})(Progress);

export default connect(undefined, mapDispatchToProps)(InitializerProgress);
