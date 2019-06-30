import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';
import styled from '@src/styles/styled-components';
import Txt from '@src/components/atoms/Txt';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import SmallMaterial from '@src/components/organisms/SmallMaterial';
import { GlobalState } from '@src/state';
import { uiSelectors, uiTypes } from '@src/state/ui';
import { Karuta } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';

export interface Props {
  karutas: Karuta[];
  className?: string;
}

export type ContainerProps = Props & {
  presenter: React.FC<Props>;
};

const Container = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

const MaterialContainer = styled.li`
  max-width: 380px;
  width: 100%;
  margin: ${({ theme }) => theme.spacingByPx(1)} 0;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    margin: ${({ theme }) => theme.spacingByPx(1)};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.fontColor.default};
  &:hover {
    color: ${({ theme }) => theme.fontColor.default};
    text-decoration: none;
  }
`;

const StyledMaterial = styled(SmallMaterial)`
  padding: ${({ theme }) => theme.spacingByPx(1)};
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ErrorMessage = styled(CenteredFrame)`
  height: 300px;
  width: 100%;
`;

export const FilteredSmallMaterialListPresenter = ({ karutas, className }: Props) => (
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

export const FilteredSmallMaterialListContainer = ({ presenter, karutas, className = '' }: ContainerProps) => {
  const { karutasFilter } = useSelector<GlobalState, uiTypes.State>(state => state.ui);
  const filteredKarutas = uiSelectors.filterKarutas(karutas, karutasFilter);
  return presenter({ karutas: filteredKarutas, className });
};

export const FilteredSmallMaterialList = (props: Props) => (
  <FilteredSmallMaterialListContainer {...props} presenter={FilteredSmallMaterialListPresenter} />
);

export default FilteredSmallMaterialList;
