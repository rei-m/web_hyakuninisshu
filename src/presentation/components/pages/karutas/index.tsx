import React, { useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import SingleContentPageTemplate from '@src/presentation/components/templates/SingleContentPageTemplate';
import FilteredSmallMaterialList from '@src/presentation/containers/organisms/FilteredSmallMaterialList';
import MaterialListFilter from '@src/presentation/containers/organisms/MaterialListFilter';
import Overlay from '@src/presentation/components/atoms/Overlay';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { useDiContainer } from '@src/presentation/hooks/useDiContainer';
import { GlobalState } from '@src/state';
import { Karuta } from '@src/domain/models';

export type Props = {
  karutaList: Array<Karuta>;
} & Pick<RouteComponentProps, 'navigate'>;

export type PresenterProps = {
  karutaList: Array<Karuta>;
  filterOpen: boolean;
  onClickSearch: () => void;
  onClickOverlay: () => void;
  onClickBack: () => void;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface>(theme => ({
  materialListFilter: {
    right: 0,
    top: 0,
    position: 'absolute',
    boxShadow: theme.elevationShadow2x,
  },
}));

export const Presenter = ({ karutaList, filterOpen, onClickSearch, onClickOverlay, onClickBack }: PresenterProps) => {
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      title={`百人一首 - 資料 -`}
      description={`百人一首の資料のページです。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`}
      keywords={[`百人一首`, `小倉百人一首`, `歌`, `一覧`, `意味`, `歌番号`, `暗記`, `練習`]}
      pageTitle={`歌一覧`}
      menuType={'material'}
      onClickBack={onClickBack}
      onClickSearch={onClickSearch}
      content={
        <>
          <FilteredSmallMaterialList karutas={karutaList} />
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

export const Container = ({ karutaList, navigate, presenter }: ContainerProps) => {
  const dispatch = useDispatch();
  const { uiActionCreator } = useDiContainer();
  const filterOpen = useSelector<GlobalState, boolean>(
    state => state.ui.karutasFilter.open,
    (left, right) => left === right
  );

  const handleClickSearch = useCallback(() => {
    dispatch(uiActionCreator.openKarutasFilter());
  }, []);

  const handleClickOverlay = useCallback(() => {
    dispatch(uiActionCreator.closeKarutasFilter());
  }, []);

  const handleClickBack = useCallback(() => {
    if (navigate) {
      navigate(paths.root(), { replace: true });
    }
  }, [navigate]);

  return presenter({
    karutaList,
    filterOpen,
    onClickSearch: handleClickSearch,
    onClickOverlay: handleClickOverlay,
    onClickBack: handleClickBack,
  });
};

export const KarutasPage = (props: Props) => <Container {...props} presenter={Presenter} />;

export default KarutasPage;
