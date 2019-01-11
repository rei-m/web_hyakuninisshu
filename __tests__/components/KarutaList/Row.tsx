import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { setUpQueryOnce } from '@test/helpers';
import { create } from '@test/factories';
import Row, { Props } from '@src/components/KarutaList/Row';
import { QueryData } from '@src/components/KarutaImage';
import { Karuta } from '@src/types';

describe('KarutaList', () => {
  describe('<Row />', () => {
    let props: Props;
    beforeEach(() => {
      setUpQueryOnce<QueryData>({
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
          ],
        },
      });

      props = {
        karuta: create<Karuta>('karuta', {
          no: 1,
        }),
        onClickRow: jest.fn(),
      };
    });

    it('should render component', () => {
      const renderer = ReactTestRenderer.create(<Row {...props} />);
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it('should fire onClickRow when clicked', () => {
      shallow(<Row {...props} />).simulate('click');
      expect(props.onClickRow).toHaveBeenCalledWith(1);
    });
  });
});
