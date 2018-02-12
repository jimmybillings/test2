import * as DeliveryOptionsActions from './delivery-options.actions';
import * as AssetActions from '../asset/asset.actions';
import { DeliveryOptions } from '../../shared/interfaces/asset.interface';
import { Common } from '../../shared/utilities/common.functions';

export interface State {
  loading: boolean;
  hasDeliveryOptions: boolean;
  activeAssetId: number;
  options: DeliveryOptions;
  showLoadingMessage: boolean;
};

export const initialState: State = {
  loading: false,
  showLoadingMessage: false,
  hasDeliveryOptions: false,
  activeAssetId: null,
  options: []
};

export type AllowedActions = AssetActions.LoadActiveCollectionAsset | AssetActions.LoadCartAsset |
  AssetActions.LoadQuoteEditAsset | AssetActions.LoadQuoteShowAsset | AssetActions.LoadSearchAsset |
  DeliveryOptionsActions.Any;

export function reducer(state: State = initialState, action: AllowedActions): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case AssetActions.LoadActiveCollectionAsset.Type:
    case AssetActions.LoadCartAsset.Type:
    case AssetActions.LoadQuoteEditAsset.Type:
    case AssetActions.LoadQuoteShowAsset.Type:
    case AssetActions.LoadSearchAsset.Type: {
      return { ...Common.clone(initialState), loading: true };
    }

    case DeliveryOptionsActions.Load.Type: {
      return { ...Common.clone(initialState), loading: true, activeAssetId: action.activeAsset.assetId };
    }

    case DeliveryOptionsActions.LoadSuccess.Type: {
      const hasDeliveryOptions: boolean = action.options.length > 0;
      return {
        ...Common.clone(state),
        loading: false,
        hasDeliveryOptions,
        options: action.options,
        showLoadingMessage: false
      };
    }

    case DeliveryOptionsActions.SetLoadingMessageFlag.Type: {
      return { ...Common.clone(state), showLoadingMessage: true };
    }

    default: {
      return state;
    }
  }
}
