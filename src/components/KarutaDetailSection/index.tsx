import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import PageTitle from '../PageTitle';
import KarutaCard from '../KarutaCard';
import { Karuta } from '../../types';
import { toKarutaIdString } from '../helper';

export interface KarutaDetailSectionProps {
  readonly karuta: Karuta;
}

const RootSection = withAppTheme(styled.section)`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const KarutaDetailSection: React.SFC<KarutaDetailSectionProps> = ({
  karuta
}) => (
  <RootSection>
    <PageTitle title={toKarutaIdString(karuta.id)} />
    <KarutaCard karuta={karuta} />
  </RootSection>
);

export default KarutaDetailSection;
