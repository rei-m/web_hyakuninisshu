import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '../../../src/reducers/index';
import { initialState as karutasState } from '../../../src/reducers/karutas';
import { initialState as questionsState } from '../../../src/reducers/questions';
import { START_TRAINING_NAME } from '../../../src/actions/questions';
import TrainingInitializer from '../../../src/containers/TrainingInitializer';
import Progress from '../../../src/components/Progress';

const createMockRouter: any = () => {
  return {
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    },
    route: {
      location: {
        pathname: '/',
        state: {
          color: '',
          kamiNoKuStyle: 1,
          kimariji: 0,
          rangeFrom: 1,
          rangeTo: 100,
          shimoNoKuStyle: 0
        }
      },
      match: { params: {} }
    }
  };
};

describe('<TrainingInitializer />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;
  let mockRouter: any;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor()({
      karutasState,
      questionsState
    });
    mockRouter = createMockRouter();
    wrapper = shallow(<TrainingInitializer />, {
      context: {
        router: mockRouter,
        store: mockStore
      }
    })
      .dive()
      .dive()
      .dive();
  });

  it('should render component', () => {
    expect(wrapper.find(Progress).length).toBe(1);
  });

  it('should dispatch startTraining action when components onStart fired', () => {
    wrapper
      .find(Progress)
      .props()
      .onStart();
    const mockActions = mockStore.getActions();
    expect(mockActions[0].type).toBe(START_TRAINING_NAME);
  });
});
