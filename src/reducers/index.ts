import { combineReducers, Reducer } from 'redux';
import {
  COMPLETE_PREPARE_APPLICATION_NAME,
  CompletePrepareApplicationAction,
} from '../actions';

export interface GlobalState {
  application: boolean;
}

export interface AppState {
  initialized: boolean;
}

const application = (state = { initialized: false }, action: CompletePrepareApplicationAction) => {
  switch (action.type) {
    case COMPLETE_PREPARE_APPLICATION_NAME:
      return state.initialized;
    default:
      return state;
  }
};

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  application,
});

export default rootReducer;
