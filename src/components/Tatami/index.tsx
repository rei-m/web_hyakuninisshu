import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import * as tatami from './tatami_part.png';

const Tatami = withAppTheme(styled.div)`
  background-image: url("${tatami}");
`;

export default Tatami;
