import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { PositionProperty } from 'csstype';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import Txt from '@src/components/atoms/Txt';
import Kimariji from '@src/components/atoms/Kimariji';
import KarutaColor from '@src/components/atoms/KarutaColor';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import { Color, Kimariji as KimarijiType } from '@src/types';
import { uiOperations, uiTypes } from '@src/state/ui';
import { GlobalState } from '@src/state';

export interface OwnProps {
  className?: string;
}

export interface ConnectedProps {
  colors: Array<{ color: Color; checked: boolean }>;
  kimarijis: Array<{ kimariji: KimarijiType; checked: boolean }>;
}

export interface DispatchProps {
  onChangeColor: (color: Color, checked: boolean) => void;
  onChangeKimariji: (kimariji: KimarijiType, checked: boolean) => void;
  onClickClose: () => void;
}

export type Props = OwnProps & ConnectedProps & DispatchProps;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colorThin};
  width: 200px;
  box-sizing: border-box;
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

const CloseIconWrapper = styled(CenteredFrame)`
  height: 48px;
  width: 48px;
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
});

type RenderProps = Props & {
  classes: {
    root: string;
    listSubHeader: string;
    listItem: string;
    listItemText: string;
  };
};

const onClickContainerHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const MaterialListFilter = withStyles(styles)(
  ({ kimarijis, colors, classes, className, onChangeKimariji, onChangeColor, onClickClose }: RenderProps) => (
    <Container onClick={onClickContainerHandler} className={className}>
      <List className={classes.root} subheader={<li />}>
        <Header key="header">
          <Txt tag={`span`} size={`s`}>
            絞り込み
          </Txt>
          <CloseIconWrapper onClick={onClickClose}>
            <CloseIcon />
          </CloseIconWrapper>
        </Header>
        <li key="section-kimariji">
          <Ul>
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
          </Ul>
        </li>
        <li key="section-color">
          <Ul>
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
          </Ul>
        </li>
      </List>
    </Container>
  )
);

export const mapStateToProps = ({ ui }: GlobalState): ConnectedProps => ({ ...ui.karutasFilter });

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, uiTypes.Actions>): DispatchProps => ({
  onChangeColor: (color: Color, checked: boolean) => {
    dispatch(uiOperations.toggleKarutasColor(color, checked));
  },
  onChangeKimariji: (kimariji: KimarijiType, checked: boolean) => {
    dispatch(uiOperations.toggleKarutasKimariji(kimariji, checked));
  },
  onClickClose: () => {
    dispatch(uiOperations.closeKarutasFilter());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialListFilter);
