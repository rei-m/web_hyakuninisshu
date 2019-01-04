import { MockStore } from 'redux-mock-store';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions';
import { START_TRAINING_NAME } from '@src/actions/questions';
import { mapDispatchToProps } from '@src/containers/TrainingInitializer';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

describe('<TrainingInitializer />', () => {
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor()({
      questions: questionsState,
    });
  });

  it('should dispatch startTraining action when components onStart fired', () => {
    mapDispatchToProps(mockStore.dispatch, {
      karutas: [],
      rangeFrom: RangeFromCondition.One,
      rangeTo: RangeToCondition.OneHundred,
      kimariji: KimarijiCondition.None,
      color: ColorCondition.None,
      kamiNoKuStyle: KarutaStyleCondition.KanaOnly,
      shimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
    }).onStart();
    const mockActions = mockStore.getActions();
    expect(mockActions[0].type).toBe(START_TRAINING_NAME);
  });
});
