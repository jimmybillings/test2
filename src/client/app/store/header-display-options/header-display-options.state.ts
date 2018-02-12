import * as HeaderDisplayOptionsActions from './header-display-options.actions';

export interface State {
  canBeFixed: boolean;
  isFixed: boolean;
  filtersAreAvailable: boolean;
}

export const initialState: State = {
  canBeFixed: false,
  isFixed: false,
  filtersAreAvailable: false
};

export function reducer(state: State = initialState, action: HeaderDisplayOptionsActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    case HeaderDisplayOptionsActions.EnableFix.Type: {
      return { ...state, canBeFixed: true };
    }

    case HeaderDisplayOptionsActions.DisableFix.Type: {
      return { ...state, canBeFixed: false };
    }

    case HeaderDisplayOptionsActions.EnableFilters.Type: {
      return { ...state, filtersAreAvailable: true };
    }

    case HeaderDisplayOptionsActions.DisableFilters.Type: {
      return { ...state, filtersAreAvailable: false };
    }

    case HeaderDisplayOptionsActions.Fix.Type: {
      return { ...state, isFixed: true };
    }

    case HeaderDisplayOptionsActions.Unfix.Type: {
      return { ...state, isFixed: false };
    }

    case HeaderDisplayOptionsActions.Reset.Type: {
      return { ...initialState };
    }

    default: {
      return state;
    }

  }
}
