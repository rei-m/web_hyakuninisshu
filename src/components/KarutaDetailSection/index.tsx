import * as React from 'react';
import styled from 'styled-components';
import PageTitle from '../PageTitle';
import KarutaCard from '../KarutaCard';
import { Karuta } from '../../types';
import { convetKarutaId } from '../helper';

export interface KarutaDetailSectionProps {
  karuta: Karuta;
}

const RootSection = styled.section`
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const KarutaDetailSection = ({ karuta }: KarutaDetailSectionProps) => (
  <RootSection>
    <PageTitle title={convetKarutaId(karuta.id)} />
    <KarutaCard karuta={karuta} />
  </RootSection>
);

export default KarutaDetailSection;
