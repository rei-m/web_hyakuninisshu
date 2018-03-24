import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import KarutaCard from '../KarutaCard';
import { Karuta } from '../../types';

export interface KarutaDetailSectionProps {
  readonly karuta: Karuta;
}

const Root = withAppTheme(styled.div)`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;
`;

const KarutaDetailSection: React.SFC<KarutaDetailSectionProps> = ({
  karuta
}) => (
  <Root>
    <KarutaCard karuta={karuta} />
  </Root>
);

export default KarutaDetailSection;
