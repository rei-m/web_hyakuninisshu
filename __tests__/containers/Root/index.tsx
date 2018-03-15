import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockAppStoreCreateor } from '../../helpers';
import { GlobalState } from '../../../src/reducers/index';
import { initialState as questionsState } from '../../../src/reducers/questions';
import Root from '../../../src/containers/Root';
import Initializer from '../../../src/containers/Initializer';
import Frame from '../../../src/components/Frame';
import { Karuta } from '../../../src/types';
import { create } from '../../factories';
import { MenuType } from '../../../src/enums';

const createMockRouter: any = (pathname: string) => {
  return {
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    },
    route: {
      location: { pathname },
      match: { params: {} }
    }
  };
};

const createMockStore = (
  karutas = [
    create<Karuta>('karuta', {
      id: 1
    }),
    create<Karuta>('karuta', {
      id: 2
    }),
    create<Karuta>('karuta', {
      id: 3
    })
  ]
) => {
  return mockAppStoreCreateor({
    karutasState: {
      karutas
    },
    questionsState
  });
};

const createWrapper = (mockStore: MockStore<GlobalState>, mockRouter: any) => {
  return shallow(<Root />)
    .dive({
      context: {
        router: mockRouter
      }
    })
    .dive({
      context: {
        store: mockStore
      }
    });
};

describe('<Root />', () => {
  let wrapper: ShallowWrapper<{}>;
  let mockStore: MockStore<GlobalState>;
  let mockRouter: any;

  it('should render Initializer when not initialized', () => {
    mockStore = createMockStore([]);
    mockRouter = createMockRouter('/');
    wrapper = createWrapper(mockStore, mockRouter);
    expect(wrapper.dive().find(Initializer).length).toBe(1);
  });

  it('should render Frame when initialized', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/');
    wrapper = createWrapper(mockStore, mockRouter);
    expect(wrapper.dive().find(Frame).length).toBe(1);
  });

  it('should send props to Frame when location is training', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/training');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Training);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。出題条件を組み合わせて自分にあったペースで練習できます。'
    );
    expect(props.isDisplayNav).toBe(true);
    expect(props.subTitle).toBe('練習');
  });

  it('should send props to Frame when location is training/questions', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/training/questions');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Training);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。出題条件を組み合わせて自分にあったペースで練習できます。'
    );
    expect(props.isDisplayNav).toBe(false);
    expect(props.subTitle).toBe('練習');
  });

  it('should send props to Frame when location is exam', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/exam');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Exam);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。百首覚えられているかチャレンジしましょう。'
    );
    expect(props.isDisplayNav).toBe(true);
    expect(props.subTitle).toBe('腕試し');
  });

  it('should send props to Frame when location is exam/question', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/exam/question');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Exam);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。百首覚えられているかチャレンジしましょう。'
    );
    expect(props.isDisplayNav).toBe(false);
    expect(props.subTitle).toBe('腕試し');
  });

  it('should send props to Frame when location is karutas', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/karutas');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Material);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。札の画像や歌の意味を確認できます。'
    );
    expect(props.isDisplayNav).toBe(true);
    expect(props.subTitle).toBe('資料');
  });

  it('should send props to Frame when location is about', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/about');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(true);
    expect(props.currentMenuType).toBe(MenuType.Other);
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。百人一首の始めの一歩にご利用ください。'
    );
    expect(props.isDisplayNav).toBe(true);
    expect(props.subTitle).toBe('サイトについて');
  });

  it('should send props to Frame when location is root', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/');
    const props = createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props();
    expect(props.canBack).toBe(false);
    expect(props.currentMenuType).toBeUndefined();
    expect(props.description).toBe(
      '百人一首を手軽に暗記できるサイトです。百人一首の始めの一歩にご利用ください。'
    );
    expect(props.isDisplayNav).toBe(true);
    expect(props.subTitle).toBe('簡単に暗記');
  });

  it('should fire goBack to history when components onClickBack fired', () => {
    mockStore = createMockStore();
    mockRouter = createMockRouter('/');
    createWrapper(mockStore, mockRouter)
      .dive()
      .find(Frame)
      .props()
      .onClickBack();
    expect(mockRouter.history.goBack).toHaveBeenCalled();
  });
});
