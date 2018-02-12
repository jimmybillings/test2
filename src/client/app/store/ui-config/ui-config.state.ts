import * as UiConfigActions from './ui-config.actions';
import { Common, UiConfigSegment, UiConfigComponents } from '../../shared/interfaces/common.interface';

export interface State extends Common {
  loaded: boolean;
  components: UiConfigComponents;
};

export const initialState: State = { loaded: false, components: null };

export function reducer(state: State = initialState, action: UiConfigActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    case UiConfigActions.LoadSuccess.Type: {
      return {
        ...state,
        ...action.config,
        loaded: true
      };
    }

    case UiConfigActions.InitializeSuccess.Type: {
      return {
        ...state,
        ...action.config
      };
    }

    default: {
      return state;
    }

  }
}
