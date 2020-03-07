import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { paths } from '@src/presentation/routes';
import SmallMaterial from '@src/presentation/components/organisms/SmallMaterial';
import Txt from '@src/presentation/components/atoms/Txt';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { GlobalState } from '@src/state';
import { uiTypes, uiSelectors } from '@src/state/ui';
import { Karuta } from '@src/domain/models';

export type Props = {
  karutas: Array<Karuta>;
  className?: string;
};

export type ContainerProps = Props & {
  presenter: (props: Props) => React.ReactElement;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      flexDirection: 'row',
    },
  },
  listItem: {
    maxWidth: 380,
    width: '100%',
    margin: theme.spacing(1, 0),
    boxShadow: theme.elevationShadow1x,
    [`@media screen and (min-width:${theme.minWidthWide})`]: {
      margin: theme.spacing(1),
    },
  },
  link: {
    color: theme.fontColor.default,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  material: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  errorMessage: {
    height: 300,
    width: '100%',
  },
}));

export const FilteredSmallMaterialListPresenter = ({ karutas, className }: Props) => {
  const classes = useStyles();
  return (
    <ul className={clsx(classes.root, className)}>
      {karutas.length > 0 ? (
        karutas.map(karuta => (
          <li key={karuta.no} className={classes.listItem}>
            <Link to={paths.karutasShow(karuta.no)} className={classes.link}>
              <SmallMaterial karuta={karuta} className={classes.material} data-test={`row-${karuta.no}`} />
            </Link>
          </li>
        ))
      ) : (
        <li>
          <CenteredFrame tag={`div`} className={classes.errorMessage}>
            <Txt role={`error`}>歌が見つかりませんでした。絞り込みを見直してください。</Txt>
          </CenteredFrame>
        </li>
      )}
    </ul>
  );
};

export const FilteredSmallMaterialListContainer = ({ presenter, karutas, className = '' }: ContainerProps) => {
  const { karutasFilter } = useSelector<GlobalState, uiTypes.State>(state => state.ui);
  const filteredKarutas = uiSelectors.filterKarutas(karutas, karutasFilter);
  return presenter({ karutas: filteredKarutas, className });
};

export const FilteredSmallMaterialList = (props: Props) => (
  <FilteredSmallMaterialListContainer {...props} presenter={FilteredSmallMaterialListPresenter} />
);

export default FilteredSmallMaterialList;
