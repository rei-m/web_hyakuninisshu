import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import { Karuta } from '@src/types';
import PageTitle from '@src/components/PageTitle';
import KarutaList from '@src/components/KarutaList';

export interface KarutaListSectionProps {
  readonly karutas: Karuta[];
  readonly onClickKarutaListRow: (karutaId: number) => void;
}

const RootSection = withAppTheme(styled.section)`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
`;

const KarutaListSection: React.SFC<KarutaListSectionProps> = ({
  karutas,
  onClickKarutaListRow
}) => (
  <RootSection>
    <PageTitle title="歌一覧" />
    <KarutaList karutas={karutas} onClickRow={onClickKarutaListRow} />
  </RootSection>
);

export default KarutaListSection;
