import * as React from 'react';
import styled from 'styled-components';
import SectionTitle from '../SectionTitle';
import KarutaList from '../KarutaList';
import { Karuta } from '../../types';

export interface KarutaListSectionConnectedProps {
  karutas: Karuta[];
}

export interface KarutaListSectionDispatchProps {
  onClickKarutaListRow: (karutaId: number) => void;
}

export type KarutaListSectionProps = KarutaListSectionConnectedProps &
  KarutaListSectionDispatchProps;

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const KarutaListSection = ({
  karutas,
  onClickKarutaListRow
}: KarutaListSectionProps) => (
  <RootSection>
    <SectionTitle title="歌一覧" />
    <KarutaList karutas={karutas} onClickRow={onClickKarutaListRow} />
  </RootSection>
);

export default KarutaListSection;
