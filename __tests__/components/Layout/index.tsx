import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import Layout, { Props } from '@src/components/templates/Layout';
import Navigation from '@src/components/molecules/Navigation';

describe('<Layout />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      title: 'title',
      isDisplayNav: true,
      onClickBack: jest.fn(),
    };
  });

  describe('with Navigation', () => {
    let props: Props;

    beforeEach(() => {
      props = { ...baseProps };
    });

    it('should render component', () => {
      const renderer = ReactTestRenderer.create(<Layout {...props}>test</Layout>);
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it('contains Navigation', () => {
      const wrapper = shallow(<Layout {...props}>test</Layout>);
      expect(wrapper.find(Navigation).length).toEqual(1);
    });
  });

  describe('without Navigation', () => {
    let props: Props;

    beforeEach(() => {
      props = { ...baseProps, isDisplayNav: false };
    });

    it('should render component', () => {
      const renderer = ReactTestRenderer.create(<Layout {...props}>test</Layout>);
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it('not contains Navigation', () => {
      const wrapper = shallow(<Layout {...props}>test</Layout>);
      expect(wrapper.find(Navigation).length).toEqual(0);
    });
  });
});
