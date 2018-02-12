import * as LoadingIndicatorActions from './loading-indicator.actions';

export interface State {
  show: boolean;
}

export const initialState: State = {
  show: false
};

export function reducer(state: State = initialState, action: LoadingIndicatorActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    case LoadingIndicatorActions.Show.Type: {
      return { show: true };
    }

    case LoadingIndicatorActions.Hide.Type: {
      return { show: false };
    }

    default: {
      return state;
    }

  }
}
