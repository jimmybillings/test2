import * as MultiLingualActions from './multi-lingual.actions';

export interface State {
  lang: string;
}

export const initialState: State = {
  lang: 'en'
};

export function reducer(state: State = initialState, action: MultiLingualActions.Any): State {
  if (state === null) state = initialState;
  switch (action.type) {

    case MultiLingualActions.SetLanguage.Type: {

      return { lang: action.lang };
    }

    default: {
      return state;
    }
  }
}
