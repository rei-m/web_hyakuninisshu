import { connect, Dispatch } from 'react-redux';
import { fetchKarutas } from '../actions/karuta';
import App from '../App';
import { GlobalState } from '../reducers/index';

const mapStateToProps = (state: GlobalState) => {
  return {
    initialized: false,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<GlobalState>) => {
  return {
    onStartApp: () => {
      dispatch(fetchKarutas());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
