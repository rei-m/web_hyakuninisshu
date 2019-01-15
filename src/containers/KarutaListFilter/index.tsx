import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { PositionProperty } from 'csstype';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import Overlay from '@src/components/Overlay';
import { closeKarutasFilter, toggleKarutasColor, toggleKarutasKimariji, UiActions } from '@src/actions/ui';
import { toColorString, toKimarijiString } from '@src/utils';
import { GlobalState } from '@src/state';
import { Color, Kimariji } from '@src/types';

export interface ConnectedProps {
  open: boolean;
  colors: Array<{ color: Color; checked: boolean }>;
  kimarijis: Array<{ kimariji: Kimariji; checked: boolean }>;
}

export interface DispatchProps {
  onChangeColor: (color: Color, checked: boolean) => void;
  onChangeKimariji: (kimariji: Kimariji, checked: boolean) => void;
  onClickClose: () => void;
}

export type Props = ConnectedProps & DispatchProps;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colorThin};
  width: 200px;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.elevationShadow2x};
  right: 0;
  top: 0;
  position: absolute;
`;

const Header = styled.li`
  position: relative;
  text-align: center;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #808080;
`;

const CloseIcon = styled.i`
  line-height: 48px;
  width: 48px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const styles = () => ({
  root: {
    width: '100%',
    backgroundColor: appTheme.colorThin,
    position: 'relative' as PositionProperty,
    overflow: 'auto',
    maxHeight: '100vh',
  },
  listSubHeader: {
    fontSize: '1.4rem',
    padding: 0,
    lineHeight: '32px',
    margin: 0,
  },
  listItem: {
    padding: 0,
  },
  listItemText: {
    padding: 0,
    fontSize: '1.4rem',
  },
});

type RenderProps = Props & {
  classes: {
    root: string;
    listSubHeader: string;
    listItem: string;
    listItemText: string;
  };
};

export const KarutaListFilter: React.FC<RenderProps> = ({
  open,
  kimarijis,
  colors,
  classes,
  onChangeKimariji,
  onChangeColor,
  onClickClose,
}) => {
  if (!open) {
    return <></>;
  }

  const onClickModalContainerHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClickClose();
  };

  const onClickCloseHandler = () => {
    onClickClose();
  };

  const onClickContainerHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onCheckKimarijiHandler = (kimariji: Kimariji, checked: boolean) => () => {
    onChangeKimariji(kimariji, !checked);
  };

  const onCheckColorHandler = (color: Color, checked: boolean) => () => {
    onChangeColor(color, !checked);
  };

  return (
    <Overlay>
      <ModalContainer onClick={onClickModalContainerHandler}>
        <Container onClick={onClickContainerHandler}>
          <List className={classes.root} subheader={<li />}>
            <Header key="header">
              絞り込み
              <CloseIcon className="material-icons" onClick={onClickCloseHandler}>
                close
              </CloseIcon>
            </Header>
            <li key="section-kimariji">
              <Ul>
                <ListSubheader className={classes.listSubHeader}>決まり字</ListSubheader>
                {kimarijis.map(({ kimariji, checked }) => (
                  <ListItem
                    key={kimariji}
                    role={undefined}
                    dense={true}
                    button={true}
                    onClick={onCheckKimarijiHandler(kimariji, checked)}
                    className={classes.listItem}
                  >
                    <Checkbox checked={checked} disableRipple={true} />
                    <ListItemText primary={toKimarijiString(kimariji)} className={classes.listItemText} />
                  </ListItem>
                ))}
              </Ul>
            </li>
            <li key="section-color">
              <Ul>
                <ListSubheader className={classes.listSubHeader}>色</ListSubheader>
                {colors.map(({ color, checked }) => (
                  <ListItem
                    key={color}
                    role={undefined}
                    dense={true}
                    button={true}
                    onClick={onCheckColorHandler(color, checked)}
                    className={classes.listItem}
                  >
                    <Checkbox checked={checked} disableRipple={true} />
                    <ListItemText primary={toColorString(color)} className={classes.listItemText} />
                  </ListItem>
                ))}
              </Ul>
            </li>
          </List>
        </Container>
      </ModalContainer>
    </Overlay>
  );
};

export const mapStateToProps = ({ ui }: GlobalState): ConnectedProps => {
  return { ...ui.karutasFilter };
};

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, UiActions>): DispatchProps => ({
  onChangeColor: (color: Color, checked: boolean) => {
    dispatch(toggleKarutasColor(color, checked));
  },
  onChangeKimariji: (kimariji: Kimariji, checked: boolean) => {
    dispatch(toggleKarutasKimariji(kimariji, checked));
  },
  onClickClose: () => {
    dispatch(closeKarutasFilter());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(KarutaListFilter));
