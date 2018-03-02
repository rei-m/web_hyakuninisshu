import styled from 'styled-components';
import { withTheme } from '../../styles';
import * as tatami from './tatami_part.png';

const Tatami = withTheme(styled.div)`
  background-image: url("${tatami}");
`;

export default Tatami;
