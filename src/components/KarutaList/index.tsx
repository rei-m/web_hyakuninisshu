import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import { Karuta } from '../../types';
import KarutaListRow from './KarutaListRow';

export interface KarutaListProps {
  readonly karutas: Karuta[];
  readonly onClickRow: (karutaId: number) => void;
}

const Root = withAppTheme(styled.div)`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const KarutaList: React.SFC<KarutaListProps> = ({ karutas, onClickRow }) => (
  <Root>
    {karutas.map((k, i) => (
      <KarutaListRow
        karuta={k}
        key={i}
        onClickRow={onClickRow}
        data-test={`row-${k.id}`}
      />
    ))}
  </Root>
);

export default KarutaList;
