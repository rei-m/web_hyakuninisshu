import * as React from 'react';
import styled from 'styled-components';
import PageTitle from '../PageTitle';
import KarutaList from '../KarutaList';
import { Karuta } from '../../types';

export interface KarutaListSectionProps {
  karutas: Karuta[];
  onClickKarutaListRow: (karutaId: number) => void;
}

const RootSection = styled.section`
  box-sizing: border-box;
  padding: 16px;
`;

const KarutaListSection = ({
  karutas,
  onClickKarutaListRow
}: KarutaListSectionProps) => (
  <RootSection>
    <PageTitle title="歌一覧" />
    <KarutaList karutas={karutas} onClickRow={onClickKarutaListRow} />
  </RootSection>
);

export default KarutaListSection;
