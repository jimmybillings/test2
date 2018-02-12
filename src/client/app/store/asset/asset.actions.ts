import { Action } from '@ngrx/store';
import * as Common from '../../shared/interfaces/common.interface';
import * as Commerce from '../../shared/interfaces/commerce.interface';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { AssetType } from '../../shared/interfaces/enhanced-asset';

export class ActionFactory {
  public loadOrderAsset(orderId: number, uuid: string): LoadOrderAsset {
    return new LoadOrderAsset(orderId, uuid, 'order');
  }

  public loadQuoteShowAsset(quoteId: number, uuid: string): LoadQuoteShowAsset {
    return new LoadQuoteShowAsset(quoteId, uuid, 'quoteShow');
  }

  public loadQuoteEditAsset(uuid: string): LoadQuoteEditAsset {
    return new LoadQuoteEditAsset(uuid, 'quoteEdit');
  }

  public loadCartAsset(uuid: string): LoadCartAsset {
    return new LoadCartAsset(uuid, 'cart');
  }

  public loadActiveCollectionAsset(uuid: string): LoadActiveCollectionAsset {
    return new LoadActiveCollectionAsset(uuid, 'collection');
  }

  public loadSearchAsset(params: Common.SearchAssetLoadParameters): LoadSearchAsset {
    return new LoadSearchAsset(params, 'search');
  }

  public updateMarkersInUrl(markers: SubclipMarkers, assetId: number) {
    return new UpdateMarkersInUrl(markers, assetId);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadAssetAfterParentIsAvailable(
    params: Common.ChildAssetLoadParameters,
    assetType: AssetType,
    parentId?: number
  ): LoadAssetAfterParentIsAvailable {
    return new LoadAssetAfterParentIsAvailable(params, assetType, parentId);
  }

  public loadSuccess(activeAsset: Common.Asset): LoadSuccess {
    return new LoadSuccess(activeAsset);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }
}

export class LoadOrderAsset implements Action {
  public static readonly Type = '[Asset] Load Order Asset';
  public readonly type = LoadOrderAsset.Type;
  constructor(public readonly orderId: number, public readonly uuid: string, public readonly assetType: AssetType) { }
}

export class LoadQuoteShowAsset implements Action {
  public static readonly Type = '[Asset] Load Quote Show Asset';
  public readonly type = LoadQuoteShowAsset.Type;
  constructor(public readonly quoteId: number, public readonly uuid: string, public readonly assetType: AssetType) { }
}

export class LoadSearchAsset implements Action {
  public static readonly Type = '[Asset] Load Search Asset';
  public readonly type = LoadSearchAsset.Type;
  constructor(public readonly loadParameters: Common.SearchAssetLoadParameters, public readonly assetType: AssetType) { }
}

export class LoadCartAsset implements Action {
  public static readonly Type = '[Asset] Load Cart Asset';
  public readonly type = LoadCartAsset.Type;
  constructor(public readonly uuid: string, public readonly assetType: AssetType) { }
}

export class LoadActiveCollectionAsset implements Action {
  public static readonly Type = '[Asset] Load Active Collection Asset';
  public readonly type = LoadActiveCollectionAsset.Type;
  constructor(public readonly uuid: string, public readonly assetType: AssetType) { }
}

export class LoadQuoteEditAsset implements Action {
  public static readonly Type = '[Asset] Load Quote Edit Asset';
  public readonly type = LoadQuoteEditAsset.Type;
  constructor(public readonly uuid: string, public readonly assetType: AssetType) { }
}

export class UpdateMarkersInUrl implements Action {
  public static readonly Type = '[Asset] Update Markers In URL';
  public readonly type = UpdateMarkersInUrl.Type;
  constructor(public readonly markers: SubclipMarkers, public readonly assetId: number) { }
}

export class LoadAssetAfterParentIsAvailable implements Action {
  public static readonly Type = '[Asset] Load Asset After Parent Is Available';
  public readonly type = LoadAssetAfterParentIsAvailable.Type;
  constructor(
    public readonly loadParameters: Common.ChildAssetLoadParameters,
    public readonly assetType: AssetType,
    public readonly parentId: number
  ) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Asset] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly activeAsset: Common.Asset) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Asset] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export type Any = LoadCartAsset | LoadOrderAsset | LoadQuoteEditAsset | LoadSearchAsset | LoadQuoteShowAsset |
  LoadActiveCollectionAsset | LoadSuccess | LoadFailure | LoadAssetAfterParentIsAvailable | UpdateMarkersInUrl;

