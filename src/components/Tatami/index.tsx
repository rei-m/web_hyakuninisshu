import styled from 'styled-components';
import * as tatami from './tatami_part.png';
import { ThemedSection } from '../../styles';
const section: ThemedSection<{}> = styled.section;

const Tatami = section`
  background-image: url("${tatami}");
`;

export default Tatami;
