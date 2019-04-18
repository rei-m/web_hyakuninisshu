import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { setUpQueryOnce } from '@test/helpers';
import Dogeza, { QueryData } from '@src/components/atoms/Dogeza';

describe('<Dogeza />', () => {
  beforeEach(() => {
    setUpQueryOnce<QueryData>({
      dogezaImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `dogeza-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
    });
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Dogeza alt="test" />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
