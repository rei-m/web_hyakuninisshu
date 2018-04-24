import { GlobalState } from '@src/reducers';
import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { AxiosInstance } from 'axios';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockAppStoreCreateor } from '../../helpers';
import { initialState as karutasState } from '@src/reducers/karutas';
import { initialState as questionsState } from '@src/reducers/questions';
import { FETCH_KARUTAS_NAME } from '@src/actions/karutas';
import Initializer from '@src/containers/Initializer';
import Progress from '@src/components/Progress';

describe('<Initializer />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    const axiosInstance = {
      get: (_url, _params) => Promise.resolve({ data: [], status: 200 })
    };

    mockStore = mockAppStoreCreateor(axiosInstance as AxiosInstance)({
      karutasState,
      questionsState
    });

    wrapper = shallow(<Initializer />, {
      context: {
        store: mockStore
      }
    });
  });

  it('should render component', () => {
    expect(wrapper.find(Progress).length).toBe(1);
  });

  it('should dispatch fetchKarutas action when components onStart fired', done => {
    wrapper
      .find(Progress)
      .props()
      .onStart();
    const mockActions = mockStore.getActions();
    mockStore.subscribe(() => {
      expect(mockActions[0].type).toEqual(FETCH_KARUTAS_NAME);
      done();
    });
  });
});
