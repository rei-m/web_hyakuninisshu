import { connect, Dispatch } from 'react-redux';
import { startApplication } from '../actions';
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
      dispatch(startApplication());
    },
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Container;
