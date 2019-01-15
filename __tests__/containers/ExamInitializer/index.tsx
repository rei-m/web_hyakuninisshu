import { MockStore } from 'redux-mock-store';
import { mockAppStoreCreateor } from '@test/helpers';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions';
import { initialState as uiState } from '@src/state/ui';
import { START_EXAM_NAME } from '@src/actions/questions';
import { mapDispatchToProps } from '@src/containers/ExamInitializer';

describe('<ExamInitializer />', () => {
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor()({
      questions: questionsState,
      ui: uiState,
    });
  });

  it('should dispatch startExam action when components onStart fired', () => {
    mapDispatchToProps(mockStore.dispatch, { karutas: [] }).onStart();
    const mockActions = mockStore.getActions();
    expect(mockActions[0].type).toEqual(START_EXAM_NAME);
  });
});
