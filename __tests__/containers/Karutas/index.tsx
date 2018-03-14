import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MockStore } from 'redux-mock-store';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '../../../src/reducers/index';
import { initialState as karutasState } from '../../../src/reducers/karutas';
import { initialState as questionsState } from '../../../src/reducers/questions';
import KarutasIndex from '../../../src/containers/Karutas';
import KarutaListSection from '../../../src/components/KarutaListSection';

describe('<KarutasIndex />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockRouter: any;
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockRouter = {
      history: {
        push: jest.fn()
      },
      route: {
        location: { pathname: '/exam' },
        match: { params: {} }
      }
    };

    mockStore = mockAppStoreCreateor({
      karutasState,
      questionsState
    });

    wrapper = shallow(<KarutasIndex />)
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
    expect(wrapper.find(KarutaListSection).length).toBe(1);
  });

  it('should push karutas/:id to history when components onClickKarutaListRow fired', () => {
    wrapper
      .find(KarutaListSection)
      .props()
      .onClickKarutaListRow(1);
    expect(mockRouter.history.push).toHaveBeenCalledWith('/karutas/1');
  });
});
