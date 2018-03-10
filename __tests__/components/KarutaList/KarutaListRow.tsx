import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import KarutaListRow, {
  KarutaListRowProps
} from '../../../src/components/KarutaList/KarutaListRow';
import { Karuta } from '../../../src/types';
import { create } from '../../factories';

describe('<KarutaListRow />', () => {
  let props: KarutaListRowProps;

  beforeEach(() => {
    props = {
      karuta: create<Karuta>('karuta', {
        id: 1
      }),
      onClickRow: jest.fn()
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaListRow {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRow when clicked', () => {
    shallow(<KarutaListRow {...props} />).simulate('click');
    expect(props.onClickRow).toHaveBeenCalledWith(1);
  });
});
