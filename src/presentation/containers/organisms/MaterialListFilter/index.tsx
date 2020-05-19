import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Txt from '@src/presentation/components/atoms/Txt';
import Kimariji from '@src/presentation/components/atoms/Kimariji';
import KarutaColor from '@src/presentation/components/atoms/KarutaColor';
import CenteredFrame from '@src/presentation/components/atoms/CenteredFrame';
import { useDiContainer } from '@src/presentation/hooks/useDiContainer';
import { ThemeInterface } from '@src/presentation/styles/theme';
import { GlobalState } from '@src/state';
import { uiTypes } from '@src/state/ui';
import { Kimariji as KimarijiType, Color } from '@src/domain/models';

export type OwnProps = {
  className?: string;
};

export type ConnectedProps = {
  colors: Array<{ color: Color; checked: boolean }>;
  kimarijis: Array<{ kimariji: KimarijiType; checked: boolean }>;
};

export type DispatchProps = {
  onChangeColor: (color: Color, checked: boolean) => void;
  onChangeKimariji: (kimariji: KimarijiType, checked: boolean) => void;
  onClickClose: () => void;
};

export type PresenterProps = OwnProps & ConnectedProps & DispatchProps;

export type ContainerProps = OwnProps & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  root: {
    backgroundColor: theme.colorThin,
    width: 200,
    boxSizing: 'border-box',
  },
  list: {
    width: '100%',
    backgroundColor: theme.colorThin,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
  },
  listHeader: {
    position: 'relative',
    textAlign: 'center',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #808080',
  },
  listSubHeader: {
    padding: 0,
    lineHeight: '32px',
    margin: 0,
  },
  listItem: {
    padding: 0,
  },
  listItemText: {
    padding: 0,
  },
  closeIconContainer: {
    height: 48,
    width: 48,
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ul: {
    margin: 0,
    padding: 0,
  },
}));

const onClickContainerHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const MaterialListFilterPresenter = ({
  className,
  colors,
  kimarijis,
  onChangeColor,
  onChangeKimariji,
  onClickClose,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <div onClick={onClickContainerHandler} className={clsx(classes.root, className)}>
      <List className={classes.list} subheader={<li />}>
        <li key="header" className={classes.listHeader}>
          <Txt tag={`span`} size={`s`}>
            絞り込み
          </Txt>
          <CenteredFrame onClick={onClickClose} className={classes.closeIconContainer}>
            <CloseIcon />
          </CenteredFrame>
        </li>
        <li key="section-kimariji">
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubHeader}>
              <Txt tag={`span`} size={`s`}>
                決まり字
              </Txt>
            </ListSubheader>
            {kimarijis.map(({ kimariji, checked }) => (
              <ListItem
                key={kimariji}
                role={undefined}
                dense={true}
                button={true}
                onClick={() => {
                  onChangeKimariji(kimariji, !checked);
                }}
                className={classes.listItem}
              >
                <Checkbox checked={checked} disableRipple={true} />
                <ListItemText primary={<Kimariji kimariji={kimariji} size={`s`} />} className={classes.listItemText} />
              </ListItem>
            ))}
          </ul>
        </li>
        <li key="section-color">
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubHeader}>
              <Txt tag={`span`} size={`s`}>
                色
              </Txt>
            </ListSubheader>
            {colors.map(({ color, checked }) => (
              <ListItem
                key={color}
                role={undefined}
                dense={true}
                button={true}
                onClick={() => {
                  onChangeColor(color, !checked);
                }}
                className={classes.listItem}
              >
                <Checkbox checked={checked} disableRipple={true} />
                <ListItemText primary={<KarutaColor color={color} size={`s`} />} className={classes.listItemText} />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
    </div>
  );
};

export const MaterialListFilterContainer = ({ presenter, className = '' }: ContainerProps) => {
  const dispatch = useDispatch();
  const { uiActionCreator } = useDiContainer();
  const { karutasFilter } = useSelector<GlobalState, uiTypes.State>((state) => state.ui);
  const handleChangeColor = (color: Color, checked: boolean) => {
    dispatch(uiActionCreator.toggleKarutasColor(color, checked));
  };
  const handleChangeKimariji = (kimariji: KimarijiType, checked: boolean) => {
    dispatch(uiActionCreator.toggleKarutasKimariji(kimariji, checked));
  };
  const handleClickClose = () => {
    dispatch(uiActionCreator.closeKarutasFilter());
  };
  return presenter({
    className,
    ...karutasFilter,
    onChangeColor: handleChangeColor,
    onChangeKimariji: handleChangeKimariji,
    onClickClose: handleClickClose,
  });
};

export const MaterialListFilter = (props: OwnProps) => (
  <MaterialListFilterContainer {...props} presenter={MaterialListFilterPresenter} />
);

export default MaterialListFilter;
