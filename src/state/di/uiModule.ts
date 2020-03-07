import { uiTypes } from '../ui';
import { ActionCreatorImpl } from '../ui/actions';

export type Module = {
  uiActionCreator: uiTypes.ActionCreator;
};

export const inject = (): Module => {
  return {
    uiActionCreator: new ActionCreatorImpl(),
  };
};
