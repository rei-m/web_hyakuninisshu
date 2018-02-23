import * as React from 'react';
import styled from 'styled-components';
import SectionTitle from '../SectionTitle';
import KarutaCard from '../KarutaCard';
import { Karuta } from '../../types';

export interface KarutaDetailSectionProps {
  karuta: Karuta;
}

const RootSection = styled.section`
  box-sizing: border-box;
  max-width: 960px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const KarutaDetailSection = ({ karuta }: KarutaDetailSectionProps) => (
  <RootSection>
    <SectionTitle title="歌詳細" />
    <KarutaCard karuta={karuta} />
  </RootSection>
);

export default KarutaDetailSection;
