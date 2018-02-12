import * as PrivacyPolicyActions from './privacy-policy.actions';

export interface State {
  document: string;
}

export const initialState: State = {
  document: null
};

export function reducer(state: State = initialState, action: PrivacyPolicyActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    case PrivacyPolicyActions.LoadSuccess.Type: {
      return { document: action.document };
    }

    default: {
      return state;
    }

  }
}
