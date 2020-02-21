import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { graphql, navigate } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import FilteredSmallMaterialList from '@src/containers/organisms/FilteredSmallMaterialList';
import MaterialListFilter from '@src/containers/organisms/MaterialListFilter';
import Overlay from '@src/components/atoms/Overlay';
import { GlobalState } from '@src/state';
import { uiOperations, uiTypes } from '@src/state/ui';
import { Karuta } from '@src/types';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';
import { ThemeInterface } from '@src/styles/theme';

export type OwnProps = {
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
};

export type ConnectedProps = {
  filterOpen: boolean;
};

export type PresenterProps = {
  karutas: Karuta[];
  filterOpen: boolean;
  onClickSearch: () => void;
  onClickOverlay: () => void;
};

export type ContainerProps = OwnProps & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface>(theme => ({
  materialListFilter: {
    right: 0,
    top: 0,
    position: 'absolute',
    boxShadow: theme.elevationShadow2x,
  },
}));

const onClickBackHandler = () => navigate(ROUTE_PATHS.ROOT, { replace: true });

export const KarutasPagePresenter = ({ karutas, filterOpen, onClickSearch, onClickOverlay }: PresenterProps) => {
  const classes = useStyles();
  return (
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
              <MaterialListFilter className={classes.materialListFilter} />
            </Overlay>
          )}
        </>
      }
    />
  );
};

export const KarutasPageContainer = ({ data, presenter }: ContainerProps) => {
  const dispatch = useDispatch();
  const { karutasFilter } = useSelector<GlobalState, uiTypes.State>(state => state.ui);
  const karutas = data.allKaruta.edges.map(karutaData => JSON.parse(karutaData.node.internal.content) as Karuta);
  const handleClickSearch = () => {
    dispatch(uiOperations.openKarutasFilter());
  };
  const handleClickOverlay = () => {
    dispatch(uiOperations.closeKarutasFilter());
  };

  return presenter({
    karutas,
    filterOpen: karutasFilter.open,
    onClickSearch: handleClickSearch,
    onClickOverlay: handleClickOverlay,
  });
};

export const KarutasPage = (props: OwnProps) => (
  <KarutasPageContainer data={props.data} presenter={KarutasPagePresenter} />
);

export default KarutasPage;

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
