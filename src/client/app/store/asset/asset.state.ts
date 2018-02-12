import * as AssetActions from './asset.actions';
import * as CommonI from '../../shared/interfaces/common.interface';
import * as Commerce from '../../shared/interfaces/commerce.interface';
import { AssetType } from '../../shared/interfaces/enhanced-asset';
import { Common } from '../../shared/utilities/common.functions';

export interface State {
  readonly activeAssetType: AssetType;
  readonly activeAsset: CommonI.Asset | Commerce.Asset;
  readonly loading: boolean;
  readonly loadingUuid: string;
};

export const initialState: State = {
  activeAssetType: null,
  activeAsset: { assetId: 0, name: '' },
  loading: false,
  loadingUuid: null
};

export function reducer(state: State = initialState, action: AssetActions.Any): State {
  switch (action.type) {
    case AssetActions.LoadQuoteShowAsset.Type:
    case AssetActions.LoadQuoteShowAsset.Type:
    case AssetActions.LoadOrderAsset.Type:
    case AssetActions.LoadCartAsset.Type:
    case AssetActions.LoadQuoteEditAsset.Type:
    case AssetActions.LoadActiveCollectionAsset.Type: {
      return { ...Common.clone(state), loading: true, loadingUuid: action.uuid, activeAssetType: action.assetType };
    }

    case AssetActions.LoadSearchAsset.Type: {
      return { ...Common.clone(state), loading: true, activeAssetType: action.assetType };
    }

    case AssetActions.LoadSuccess.Type: {
      return { ...Common.clone(state), activeAsset: action.activeAsset, loading: false, loadingUuid: null };
    }

    case AssetActions.LoadFailure.Type: {
      return { ...Common.clone(state), loading: false };
    }

    default: {
      return state;
    }
  }
}
