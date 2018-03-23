import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import TrainingsIndex from '../../../src/containers/Trainings';
import TrainingMenuSection from '../../../src/components/TrainingMenuSection';
import { GlobalState } from '../../../src/reducers/index';
import { initialState as karutasState } from '../../../src/reducers/karutas';
import { initialState as questionsState } from '../../../src/reducers/questions';
import { mockAppStoreCreateor } from '../../helpers';
import { ROUTE_PATHS } from '../../../src/constants';

describe('<Trainings />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      history: {
        push: jest.fn()
      },
      route: {
        location: { pathname: '/trainings' },
        match: { params: {} }
      }
    };
    mockStore = mockAppStoreCreateor()({
      karutasState,
      questionsState
    });
    wrapper = shallow(<TrainingsIndex />)
      .dive({
        context: {
          router: mockRouter
        }
      })
      .dive({
        context: {
          store: mockStore
        }
      });
  });

  it('should render component', () => {
    expect(wrapper.find(TrainingMenuSection).length).toBe(1);
  });

  it('should push next page to history when components onSubmit fired', () => {
    wrapper
      .find(TrainingMenuSection)
      .props()
      .onSubmit(1, 100, 0, '', 1, 0, 10000);
    expect(mockRouter.history.push).toHaveBeenCalledWith(
      ROUTE_PATHS.TRAINING_QUESTION,
      {
        color: '',
        kamiNoKuStyle: 1,
        kimariji: 0,
        rangeFrom: 1,
        rangeTo: 100,
        shimoNoKuStyle: 0,
        submitTime: 10000
      }
    );
  });
});
