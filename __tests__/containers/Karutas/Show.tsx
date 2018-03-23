import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MockStore } from 'redux-mock-store';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '../../../src/reducers/index';
import { initialState as questionsState } from '../../../src/reducers/questions';
import KarutasShow from '../../../src/containers/Karutas/Show';
import KarutaDetailSection from '../../../src/components/KarutaDetailSection';
import { Karuta } from '../../../src/types';
import { create } from '../../factories';

const createMockRouter = (id: number): any => {
  return {
    history: {
      push: jest.fn()
    },
    route: {
      location: { pathname: '/exam' },
      match: { params: { id } }
    }
  };
};

describe('<KarutasShow />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;

  beforeEach(() => {
    mockStore = mockAppStoreCreateor()({
      karutasState: {
        karutas: [create<Karuta>('karuta')]
      },
      questionsState
    });
  });

  it('should render component', () => {
    wrapper = shallow(<KarutasShow />)
      .dive({
        context: {
          router: createMockRouter(1)
        }
      })
      .dive({
        context: {
          store: mockStore
        }
      });
    expect(wrapper.find(KarutaDetailSection).length).toBe(1);
  });

  it('should throw error when receive invalid id', () => {
    expect(() => {
      shallow(<KarutasShow />)
        .dive({
          context: {
            router: createMockRouter(2)
          }
        })
        .dive({
          context: {
            store: mockStore
          }
        });
    }).toThrow();
  });
});
