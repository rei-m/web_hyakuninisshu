import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import styled from '@src/styles/styled-components';
import Txt from '@src/components/atoms/Txt';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import SmallMaterial from '@src/components/organisms/SmallMaterial';
import { GlobalState } from '@src/state';
import { uiSelectors } from '@src/state/ui';
import { Karuta } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';

export interface Props {
  karutas: Karuta[];
  className?: string;
}

const Container = styled.ul`
  ${({ theme }) => theme.centering}
  flex-wrap: wrap;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const MaterialContainer = styled.li`
  max-width: 380px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing1x} 0;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    margin: ${({ theme }) => theme.spacing1x};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.fontColorDefault};
  &:hover {
    color: ${({ theme }) => theme.fontColorDefault};
    text-decoration: none;
  }
`;

const StyledMaterial = styled(SmallMaterial)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ErrorMessage = styled(CenteredFrame)`
  height: 300px;
  width: 100%;
`;

export const FilteredSmallMaterialList = ({ karutas, className }: Props) => (
  <Container className={className}>
    {karutas.length > 0 ? (
      karutas.map(karuta => (
        <MaterialContainer key={karuta.no}>
          <StyledLink to={ROUTE_PATHS.KARUTAS_ID.replace(':id', karuta.no.toString())}>
            <StyledMaterial karuta={karuta} data-test={`row-${karuta.no}`} />
          </StyledLink>
        </MaterialContainer>
      ))
    ) : (
      <li>
        <ErrorMessage tag={`div`}>
          <Txt role={`error`}>歌が見つかりませんでした。絞り込みを見直してください。</Txt>
        </ErrorMessage>
      </li>
    )}
  </Container>
);

export const mapStateToProps = ({ ui }: GlobalState, { karutas }: Props): Props => ({
  karutas: uiSelectors.filterKarutas(karutas, ui.karutasFilter),
});

export default connect(mapStateToProps)(FilteredSmallMaterialList);
