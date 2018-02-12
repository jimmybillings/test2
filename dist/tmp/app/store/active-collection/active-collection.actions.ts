import { Action } from '@ngrx/store';

import {
  CollectionPaginationParameters, Collection, CollectionItems, CollectionItemMarkersUpdater, CollectionItemsResponse
} from '../../shared/interfaces/collection.interface';
import { Asset } from '../../shared/interfaces/common.interface';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

const defaultPagination: CollectionPaginationParameters = { currentPage: 1, pageSize: 100 };

export class ActionFactory {
  public load(pagination: CollectionPaginationParameters = defaultPagination): Load {
    return new Load(pagination);
  }

  public loadIfNeeded(pagination: CollectionPaginationParameters = defaultPagination): LoadIfNeeded {
    return new LoadIfNeeded(pagination);
  }

  public set(collectionId: number, pagination: CollectionPaginationParameters = defaultPagination): Set {
    return new Set(collectionId, pagination);
  }

  public loadPage(pagination: CollectionPaginationParameters = defaultPagination): LoadPage {
    return new LoadPage(pagination);
  }

  public addAsset(asset: Asset, markers?: SubclipMarkers): AddAsset {
    return new AddAsset(asset, markers);
  }

  public removeAsset(asset: Asset): RemoveAsset {
    return new RemoveAsset(asset);
  }

  public updateAssetMarkers(asset: Asset, markers: SubclipMarkers): UpdateAssetMarkers {
    return new UpdateAssetMarkers(asset, markers);
  }

  public addPageOfSearchAssets(): AddPageOfSearchAssets {
    return new AddPageOfSearchAssets();
  }

  public reset(): Reset {
    return new Reset();
  }
};

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(activeCollection: Collection): LoadSuccess {
    return new LoadSuccess(activeCollection);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }

  public setSuccess(activeCollection: Collection): SetSuccess {
    return new SetSuccess(activeCollection);
  }

  public setFailure(error: ApiErrorResponse): SetFailure {
    return new SetFailure(error);
  }

  public loadPageSuccess(currentPageItems: CollectionItems): LoadPageSuccess {
    return new LoadPageSuccess(currentPageItems);
  }

  public loadPageFailure(error: ApiErrorResponse): LoadPageFailure {
    return new LoadPageFailure(error);
  }

  public addAssetSuccess(currentPageItems: CollectionItems): AddAssetSuccess {
    return new AddAssetSuccess(currentPageItems);
  }

  public addAssetFailure(error: ApiErrorResponse): AddAssetFailure {
    return new AddAssetFailure(error);
  }

  public removeAssetSuccess(currentPageItems: CollectionItems): RemoveAssetSuccess {
    return new RemoveAssetSuccess(currentPageItems);
  }

  public removeAssetFailure(error: ApiErrorResponse): RemoveAssetFailure {
    return new RemoveAssetFailure(error);
  }

  public updateAssetMarkersSuccess(currentPageItems: CollectionItems): UpdateAssetMarkersSuccess {
    return new UpdateAssetMarkersSuccess(currentPageItems);
  }

  public updateAssetMarkersFailure(error: ApiErrorResponse): UpdateAssetMarkersFailure {
    return new UpdateAssetMarkersFailure(error);
  }

  public addPageOfSearchAssetsSuccess(currentPageItems: CollectionItems): AddPageOfSearchAssetsSuccess {
    return new AddPageOfSearchAssetsSuccess(currentPageItems);
  }
};

export class Load implements Action {
  public static readonly Type = '[Active Collection] Load';
  public readonly type = Load.Type;
  constructor(public readonly pagination: CollectionPaginationParameters) { }
}

export class LoadIfNeeded implements Action {
  public static readonly Type = '[Active Collection] Load If Needed';
  public readonly type = LoadIfNeeded.Type;
  constructor(public readonly pagination: CollectionPaginationParameters) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Active Collection] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly activeCollection: Collection) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Active Collection] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class Set implements Action {
  public static readonly Type = '[Active Collection] Set';
  public readonly type = Set.Type;
  constructor(public readonly collectionId: number, public readonly pagination: CollectionPaginationParameters) { }
}

export class SetSuccess implements Action {
  public static readonly Type = '[Active Collection] Set Success';
  public readonly type = SetSuccess.Type;
  constructor(public readonly activeCollection: Collection) { }
}

export class SetFailure implements Action {
  public static readonly Type = '[Active Collection] Set Failure';
  public readonly type = SetFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class LoadPage implements Action {
  public static readonly Type = '[Active Collection] Load Page';
  public readonly type = LoadPage.Type;
  constructor(public readonly pagination: CollectionPaginationParameters) { }
}

export class LoadPageSuccess implements Action {
  public static readonly Type = '[Active Collection] Load Page Success';
  public readonly type = LoadPageSuccess.Type;
  constructor(public readonly currentPageItems: CollectionItems) { }
}

export class LoadPageFailure implements Action {
  public static readonly Type = '[Active Collection] Load Page Failure';
  public readonly type = LoadPageFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class AddAsset implements Action {
  public static readonly Type = '[Active Collection] Add Asset';
  public readonly type = AddAsset.Type;
  constructor(public readonly asset: Asset, public readonly markers: SubclipMarkers) { }
}

export class AddAssetSuccess implements Action {
  public static readonly Type = '[Active Collection] Add Asset Success';
  public readonly type = AddAssetSuccess.Type;
  constructor(public readonly currentPageItems: CollectionItems) { }
}

export class AddAssetFailure implements Action {
  public static readonly Type = '[Active Collection] Add Asset Failure';
  public readonly type = AddAssetFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class RemoveAsset implements Action {
  public static readonly Type = '[Active Collection] Remove Asset';
  public readonly type = RemoveAsset.Type;
  constructor(public readonly asset: Asset) { }
}

export class RemoveAssetSuccess implements Action {
  public static readonly Type = '[Active Collection] Remove Asset Success';
  public readonly type = RemoveAssetSuccess.Type;
  constructor(public readonly currentPageItems: CollectionItems) { }
}

export class RemoveAssetFailure implements Action {
  public static readonly Type = '[Active Collection] Remove Asset Failure';
  public readonly type = RemoveAssetFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class UpdateAssetMarkers implements Action {
  public static readonly Type = '[Active Collection] Update Asset Markers';
  public readonly type = UpdateAssetMarkers.Type;
  constructor(public readonly asset: Asset, public readonly markers: SubclipMarkers) { }
}

export class UpdateAssetMarkersSuccess implements Action {
  public static readonly Type = '[Active Collection] Update Asset Markers Success';
  public readonly type = UpdateAssetMarkersSuccess.Type;
  constructor(public readonly currentPageItems: CollectionItems) { }
}

export class UpdateAssetMarkersFailure implements Action {
  public static readonly Type = '[Active Collection] Update Asset Markers Failure';
  public readonly type = UpdateAssetMarkersFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class AddPageOfSearchAssets {
  public static readonly Type = '[Active Collection] Add Page Of Search Assets';
  public readonly type = AddPageOfSearchAssets.Type;
}

export class AddPageOfSearchAssetsSuccess {
  public static readonly Type = '[Active Collection] Add Page Of Search Assets Success';
  public readonly type = AddPageOfSearchAssetsSuccess.Type;
  constructor(public readonly currentPageItems: CollectionItems) { }
}

export class Reset implements Action {
  public static readonly Type = '[Active Collection] Reset';
  public readonly type = Reset.Type;
}


export type Any =
  Load | LoadSuccess | LoadFailure |
  Set | SetSuccess | SetFailure |
  LoadPage | LoadPageSuccess | LoadPageFailure |
  AddAsset | AddAssetSuccess | AddAssetFailure |
  RemoveAsset | RemoveAssetSuccess | RemoveAssetFailure |
  UpdateAssetMarkers | UpdateAssetMarkersSuccess | UpdateAssetMarkersFailure |
  AddPageOfSearchAssets | AddPageOfSearchAssetsSuccess |
  Reset;
