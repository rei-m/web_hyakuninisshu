import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import KarutaList, {
  KarutaListProps
} from '../../../src/components/KarutaList';
import { KarutaListRowProps } from '../../../src/components/KarutaList/KarutaListRow';
import { Karuta } from '../../../src/types';
import { create } from '../../factories';
import { sel } from '../../helpers';

describe('<KarutaList />', () => {
  let props: KarutaListProps;

  beforeEach(() => {
    props = {
      karutas: [
        create<Karuta>('karuta', {
          id: 1
        }),
        create<Karuta>('karuta', {
          id: 2
        })
      ],
      onClickRow: jest.fn()
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaList {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRow when karuta clicked', () => {
    const wrapper = shallow(<KarutaList {...props} />).find(
      sel('row-1')
    ) as ShallowWrapper<KarutaListRowProps, any>;
    wrapper.props().onClickRow(1);
    expect(props.onClickRow).toHaveBeenCalledWith(1);
  });
});
