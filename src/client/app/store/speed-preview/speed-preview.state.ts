import * as SpeedPreviewActions from './speed-preview.actions';
import { Asset } from '../../shared/interfaces/common.interface';
import { SpeedviewData } from '../../shared/interfaces/asset.interface';

export interface State {
  readonly [index: number]: SpeedviewData;
};

export const initialState: State = {};

export function reducer(state: State = initialState, action: SpeedPreviewActions.Any): State {
  if (state === null) state = initialState;
  switch (action.type) {

    case SpeedPreviewActions.LoadSuccess.Type: {
      return Object.assign({}, state, { [action.assetId]: action.speedViewData });
    }

    case SpeedPreviewActions.LoadFailure.Type: {
      return Object.assign({}, state, { [action.assetId]: { noData: true } });
    }

    default: {
      return state;
    }
  }
}

