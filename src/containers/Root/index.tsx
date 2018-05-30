import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { branch } from 'recompose';
import { ROUTE_PATHS } from '@src/constants';
import { MenuType } from '@src/enums';
import { GlobalState } from '@src/reducers';
import Initializer from '@src/containers/Initializer';
import Frame, { FrameProps } from '@src/components/Frame';
import { toKarutaIdString } from '@src/components/helper';

export type RootOwnProps = RouteComponentProps<{}>;

export type RootConnectedProps = Omit<FrameProps, 'onClickBack'> & {
  readonly initialized: boolean;
};

export type RootDispatchProps = Pick<FrameProps, 'onClickBack'>;

export type RootProps = RootOwnProps & RootConnectedProps & RootDispatchProps;

const mapStateToProps = (
  { karutasState }: GlobalState,
  { location }: RootOwnProps
): RootConnectedProps => {
  if (karutasState.error) {
    throw karutasState.error;
  }

  let canBack = false;
  let isDisplayNav = true;
  let subTitle = '簡単に暗記';
  let description =
    '百人一首を手軽に暗記できるサイトです。百人一首の始めの一歩にご利用ください。';
  let currentMenuType: MenuType | undefined;

  const { pathname } = location;

  if (pathname.indexOf(ROUTE_PATHS.TRAINING) >= 0) {
    canBack = true;
    subTitle = '練習';
    description =
      '百人一首を手軽に暗記できるサイトです。出題条件を組み合わせて自分にあったペースで練習できます。';
    currentMenuType = MenuType.Training;
    if (pathname.indexOf(ROUTE_PATHS.TRAINING_QUESTION) >= 0) {
      isDisplayNav = false;
    }
  } else if (pathname.indexOf(ROUTE_PATHS.EXAM) >= 0) {
    canBack = true;
    subTitle = '腕試し';
    description =
      '百人一首を手軽に暗記できるサイトです。百首覚えられているかチャレンジしましょう。';
    currentMenuType = MenuType.Exam;
    if (pathname.indexOf(ROUTE_PATHS.EXAM_QUESTION) >= 0) {
      isDisplayNav = false;
    }
  } else if (pathname.indexOf(ROUTE_PATHS.KARUTAS) >= 0) {
    const match = pathname.match(/\/(100|\d{2}|[1-9])$/);
    canBack = true;
    subTitle = match ? toKarutaIdString(Number(match[1])) : '資料';
    description =
      '百人一首を手軽に暗記できるサイトです。札の画像や歌の意味を確認できます。';
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
    description,
    initialized: karutasState.karutas.length > 0,
    isDisplayNav,
    subTitle
  };
};

const mapDispatchToProps = (
  _: Dispatch<GlobalState>,
  { history, location }: RootOwnProps
): RootDispatchProps => ({
  onClickBack: () => {
    const { pathname } = location;
    switch (pathname) {
      case ROUTE_PATHS.TRAINING:
      case ROUTE_PATHS.EXAM:
      case ROUTE_PATHS.KARUTAS:
      case ROUTE_PATHS.ABOUT:
        history.replace(ROUTE_PATHS.ROOT);
        break;
      default:
        history.goBack();
        break;
    }
  }
});

const isInitialized = ({ initialized }: RootConnectedProps) => initialized;

const withInitializeCheck = branch<RootProps>(
  isInitialized,
  component => component,
  _ => Initializer
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withInitializeCheck(Frame))
);
