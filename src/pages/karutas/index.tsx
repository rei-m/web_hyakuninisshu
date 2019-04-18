import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from '@src/styles/styled-components';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import FilteredSmallMaterialList from '@src/containers/organisms/FilteredSmallMaterialList';
import MaterialListFilter from '@src/containers/organisms/MaterialListFilter';
import Overlay from '@src/components/atoms/Overlay';
import { GlobalState } from '@src/state';
import { uiOperations, uiTypes } from '@src/state/ui';
import { Karuta } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';

export interface OwnProps {
  data: {
    allKaruta: {
      edges: Array<{
        node: {
          internal: {
            content: string;
          };
        };
      }>;
    };
  };
}

export interface ConnectedProps {
  filterOpen: boolean;
}

export interface DispatchProps {
  onClickSearch: () => void;
  onClickOverlay: () => void;
}

export type Props = OwnProps & ConnectedProps & DispatchProps;

export interface PresenterProps {
  karutas: Karuta[];
  filterOpen: boolean;
  onClickSearch: () => void;
  onClickOverlay: () => void;
}

const StyledMaterialListFilter = styled(MaterialListFilter)`
  right: 0;
  top: 0;
  position: absolute;
  box-shadow: ${({ theme }) => theme.elevationShadow2x};
`;

const onClickBackHandler = () => navigate(ROUTE_PATHS.ROOT, { replace: true });

export const KarutasPagePresenter = ({ karutas, filterOpen, onClickSearch, onClickOverlay }: PresenterProps) => (
  <SingleContentPageTemplate
    title={`百人一首 - 資料 -`}
    description={`百人一首の資料のページです。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
    keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
    pageTitle={`歌一覧`}
    menuType={MenuType.Material}
    onClickBack={onClickBackHandler}
    onClickSearch={onClickSearch}
    content={
      <>
        <FilteredSmallMaterialList karutas={karutas} />
        {filterOpen && (
          <Overlay onClick={onClickOverlay}>
            <StyledMaterialListFilter />
          </Overlay>
        )}
      </>
    }
  />
);

export const KarutasPage: React.FC<Props> = ({ data, filterOpen, onClickSearch, onClickOverlay }) => {
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  return (
    <KarutasPagePresenter
      karutas={karutas}
      filterOpen={filterOpen}
      onClickSearch={onClickSearch}
      onClickOverlay={onClickOverlay}
    />
  );
};

export const mapStateToProps = ({ ui }: GlobalState): ConnectedProps => ({
  filterOpen: ui.karutasFilter.open,
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, uiTypes.Actions>): DispatchProps => ({
  onClickSearch: () => {
    dispatch(uiOperations.openKarutasFilter());
  },
  onClickOverlay: () => {
    dispatch(uiOperations.closeKarutasFilter());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KarutasPage);

export const query = graphql`
  query {
    allKaruta(sort: { fields: [no], order: ASC }) {
      edges {
        node {
          internal {
            content
          }
        }
      }
    }
  }
`;
