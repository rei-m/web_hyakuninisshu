import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import styled from '@src/styles/styled-components';
import CenteredFrame from '@src/components/atoms/CenteredFrame';

export interface Props {
  className?: string;
  renderIcon: () => React.ReactElement<SvgIconProps>;
  onClick?: () => void;
}

const Container = styled(CenteredFrame)`
  height: 56px;
  width: 56px;
  color: #fff;
  position: relative;
  box-sizing: border-box;
`;

const HeaderItem = ({ className, renderIcon, onClick }: Props) => (
  <Container onClick={onClick} className={className}>
    {renderIcon()}
  </Container>
);

export default HeaderItem;
