import * as React from 'react';
import styled from '@src/styles/styled-components';
import CenteredFrame, { Props as CenteredFrameProps } from '../CenteredFrame';

export type Props = CenteredFrameProps;

const Container = styled(CenteredFrame)({
  border: '2px solid #000',
  borderRadius: '50%',
});

const CircleFrame: React.FC<Props> = props => <Container {...props} />;

export default CircleFrame;
