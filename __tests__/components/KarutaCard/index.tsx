import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { create } from '@test/factories';
import { mockStaticQuery } from '@test/helpers';
import KarutaCard from '@src/components/KarutaCard';
import { Karuta } from '@src/types';

describe('<KarutaCard />', () => {
  beforeEach(() => {
    mockStaticQuery.mockImplementationOnce(({ render }) =>
      render({
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
      })
    );
  });

  it('should render component when kimariji is short', () => {
    const karuta = create<Karuta>('karuta', { no: 1, kimariji: 2 });
    const renderer = ReactTestRenderer.create(<KarutaCard karuta={karuta} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when kimariji is long', () => {
    const karuta = create<Karuta>('karuta', { no: 2, kimariji: 6 });
    const renderer = ReactTestRenderer.create(<KarutaCard karuta={karuta} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
