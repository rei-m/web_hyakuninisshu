import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { sel, setUpQuery } from '@test/helpers';
import KarutaList, { Props } from '@src/components/KarutaList';
import { QueryData } from '@src/components/KarutaImage';
import { Karuta } from '@src/types';

describe('<KarutaList />', () => {
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
    const wrapper = shallow(<KarutaList {...props} />).find(sel('row-1'));
    wrapper.dive().simulate('click');
    expect(props.onClickRow).toHaveBeenCalledWith(1);
  });
});
