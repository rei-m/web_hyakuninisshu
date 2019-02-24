import { MockStore } from 'redux-mock-store';
import { mockAppStoreCreateor } from '@test/helpers';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions/reducers';
import { RESTART_QUESTIONS_NAME } from '@src/state/questions/constants';
import { initialState as uiState } from '@src/state/ui/reducers';
import { mapDispatchToProps } from '@src/containers/ReviewInitializer';

describe('<ReviewInitializer />', () => {
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor()({
      questions: questionsState,
      ui: uiState,
    });
  });

  it('should dispatch restartTraining action when components onStart fired', () => {
    mapDispatchToProps(mockStore.dispatch).onStart();
    const mockActions = mockStore.getActions();
    expect(mockActions[0].type).toEqual(RESTART_QUESTIONS_NAME);
  });
});
