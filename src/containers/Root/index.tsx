import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { branch } from 'recompose';
import { GlobalState } from '../../reducers/index';
import Initializer from '../Initializer';
import Frame, {
  FrameDispatchProps,
  FrameProps,
  FrameStateProps
} from '../../components/Frame';
import { ROUTE_PATHS } from '../../constants';
import { MenuType } from '../../enums';

export interface RootOwnProps {
  initialized: boolean;
}

export type RootProps = RootOwnProps & FrameProps;

const mapStateToProps = (
  { karutasState }: GlobalState,
  { location }: RouteComponentProps<{}>
): FrameStateProps & RootOwnProps => {
  let canBack = false;
  let isDisplayNav = true;
  let subTitle = '簡単に暗記';
  let currentMenuType: MenuType | undefined;

  const { pathname } = location;

  if (pathname.indexOf(ROUTE_PATHS.TRAINING) >= 0) {
    canBack = true;
    subTitle = '練習';
    currentMenuType = MenuType.Training;
    if (pathname.indexOf(ROUTE_PATHS.TRAINING_QUESTION) >= 0) {
      isDisplayNav = false;
    }
  } else if (pathname.indexOf(ROUTE_PATHS.EXAM) >= 0) {
    canBack = true;
    subTitle = '腕試し';
    currentMenuType = MenuType.Exam;
    if (pathname.indexOf(ROUTE_PATHS.EXAM_QUESTION) >= 0) {
      isDisplayNav = false;
    }
  } else if (pathname.indexOf(ROUTE_PATHS.KARUTAS) >= 0) {
    canBack = true;
    subTitle = '資料';
    currentMenuType = MenuType.Material;
  } else if (pathname.indexOf(ROUTE_PATHS.ABOUT) >= 0) {
    canBack = true;
    subTitle = 'サイトについて';
    currentMenuType = MenuType.Other;
  } else {
    canBack = false;
    currentMenuType = undefined;
  }

  return {
    canBack,
    currentMenuType,
    initialized: karutasState.karutas.length > 0,
    isDisplayNav,
    subTitle
  };
};

const mapDispatchToProps = (
  _: Dispatch<GlobalState>,
  { history }: RouteComponentProps<{}>
): FrameDispatchProps => {
  return {
    onClickBack: () => {
      history.goBack();
    }
  };
};

const isInitialized = ({ initialized }: RootOwnProps) => initialized;

const withInitializeCheck = branch<RootProps>(
  isInitialized,
  component => component,
  _ => Initializer
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withInitializeCheck(Frame))
);
