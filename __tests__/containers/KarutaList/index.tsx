import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { sel, setUpQuery } from '@test/helpers';
import { mapStateToProps, KarutaList, Props } from '@src/containers/KarutaList';
import { QueryData } from '@src/components/KarutaImage';
import { initialState as questionsState } from '@src/state/questions';
import { initialState as uiState } from '@src/state/ui';
import { Color, Karuta, Kimariji } from '@src/types';
import { GlobalState } from '@src/state';

describe('<KarutaList />', () => {
  describe('components', () => {
    let props: Props;

    beforeEach(() => {
      setUpQuery<QueryData>({
        karutaImages: {
          edges: [
            {
              node: {
                childImageSharp: {
                  fluid: {
                    aspectRatio: 1,
                    sizes: `100 200 300`,
                    src: `karuta_001.jpg`,
                    srcSet: `asdfasdf`,
                  },
                },
              },
            },
            {
              node: {
                childImageSharp: {
                  fluid: {
                    aspectRatio: 1,
                    sizes: `100 200 300`,
                    src: `karuta_002.jpg`,
                    srcSet: `asdfasdf`,
                  },
                },
              },
            },
          ],
        },
      });

      props = {
        karutas: [
          create<Karuta>('karuta', {
            id: '1',
            no: 1,
          }),
          create<Karuta>('karuta', {
            id: '2',
            no: 2,
          }),
        ],
        onClickRow: jest.fn(),
      };
    });

    it('should render component', () => {
      const renderer = ReactTestRenderer.create(<KarutaList {...props} />);
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it('should fire onClickRow when karuta clicked', () => {
      const wrapper = shallow(<KarutaList {...props} />)
        .find(sel('row-1'))
        .dive()
        .dive();
      wrapper.simulate('click');
      expect(props.onClickRow).toHaveBeenCalledWith(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should convert state to props', () => {
      const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
        create<Karuta>('karuta', {
          color: (i < 20 ? 'blue' : 'pink') as Color,
          id: (i + 1).toString(),
          no: i + 1,
          kimariji: ((i % 5) + 1) as Kimariji,
        })
      );

      const props: Props = {
        karutas,
        onClickRow: jest.fn(),
      };

      const state: GlobalState = {
        questions: questionsState,
        ui: {
          ...uiState,
          karutasFilter: {
            colors: [{ color: 'blue', checked: true }, { color: 'pink', checked: false }],
            kimarijis: [{ kimariji: 1, checked: true }, { kimariji: 2, checked: false }],
            open: false,
          },
        },
      };

      expect(mapStateToProps(state, props)).toMatchSnapshot();
    });
  });
});
