import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '../../../src/reducers/index';
import { initialState } from '../../../src/reducers/karutas';
import { initialState as questionsState } from '../../../src/reducers/questions';
import { START_EXAM_NAME } from '../../../src/actions/questions';
import ExamInitializer from '../../../src/containers/ExamInitializer';
import Progress from '../../../src/components/Progress';

describe('<ExamInitializer />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor({
      karutasState: initialState,
      questionsState
    });

    wrapper = shallow(<ExamInitializer />, {
      context: {
        store: mockStore
      }
    });
  });

  it('should render component', () => {
    expect(wrapper.find(Progress).length).toBe(1);
  });

  it('should dispatch action next page to history when components onSubmit fired', () => {
    wrapper
      .find(Progress)
      .props()
      .onStart();
    const mockActions = mockStore.getActions();
    expect(mockActions[0].type).toEqual(START_EXAM_NAME);
  });
});
