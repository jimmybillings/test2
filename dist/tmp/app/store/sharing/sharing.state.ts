import * as SharingActions from './sharing.actions';
import { Common } from '../../shared/utilities/common.functions';

export interface State {
  assetLink: string;
}

export const initialState: State = {
  assetLink: null
};

export function reducer(state: State = initialState, action: SharingActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case SharingActions.CreateAssetShareLinkSuccess.Type: {
      return { ...Common.clone(state), assetLink: action.link };
    }

    default: {
      return state;
    }
  }
}
