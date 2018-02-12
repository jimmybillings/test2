import * as SnackbarActions from './snackbar.actions';
import { Pojo } from '../../shared/interfaces/common.interface';

export interface State {
  readonly messageKey: string;
  readonly messageParameters: Pojo;
  readonly translatedMessage: string;
};

export const initialState = {
  messageKey: '',
  messageParameters: {},
  translatedMessage: ''
};

export function reducer(state: State = initialState, action: SnackbarActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case SnackbarActions.Display.Type: {
      return {
        messageKey: action.messageKey,
        messageParameters: action.messageParameters,
        translatedMessage: ''
      };
    }

    case SnackbarActions.DisplaySuccess.Type: {
      return {
        messageKey: state.messageKey,
        messageParameters: { ...state.messageParameters },
        translatedMessage: action.translatedMessage
      };
    }

    default: {
      return state;
    }
  }
}
