import styled from '@material-ui/core/styles/styled';
import CenteredFrame, { Props as CenteredFrameProps } from '../CenteredFrame';

export type Props = CenteredFrameProps;

const CircleFrame = styled(CenteredFrame)({
  border: '2px solid #000',
  borderRadius: '50%',
});

export default CircleFrame;
