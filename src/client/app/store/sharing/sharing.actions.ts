import { Action } from '@ngrx/store';

import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { AssetShareParameters, CollectionShareParameters, Pojo } from '../../shared/interfaces/common.interface';
import { CollectionReloadType } from '../../shared/interfaces/collection.interface';

export class ActionFactory {
  public createAssetShareLink(assetId: number, subclipMarkers: SubclipMarkers): CreateAssetShareLink {
    return new CreateAssetShareLink(assetId, subclipMarkers);
  }

  public emailAssetShareLink(
    assetId: number,
    markers: SubclipMarkers,
    parameters: AssetShareParameters,
    properties: Pojo
  ): EmailAssetShareLink {
    return new EmailAssetShareLink(assetId, markers, parameters, properties);
  }

  public emailCollectionShareLink(
    collectionId: number, parameters: CollectionShareParameters, reloadType: CollectionReloadType
  ): EmailCollectionShareLink {
    return new EmailCollectionShareLink(collectionId, parameters, reloadType);
  }
}

export class InternalActionFactory extends ActionFactory {
  public createAssetShareLinkSuccess(link: string): CreateAssetShareLinkSuccess {
    return new CreateAssetShareLinkSuccess(link);
  }

  public emailCollectionShareLinkSuccess(reloadType: CollectionReloadType): EmailCollectionShareLinkSuccess {
    return new EmailCollectionShareLinkSuccess(reloadType);
  }
}

export class CreateAssetShareLink implements Action {
  public static readonly Type = '[Sharing] Create Asset Share Link';
  public readonly type = CreateAssetShareLink.Type;
  constructor(public readonly assetId: number, public readonly markers: SubclipMarkers) { }
}

export class CreateAssetShareLinkSuccess implements Action {
  public static readonly Type = '[Sharing] Create Asset Share Link Success';
  public readonly type = CreateAssetShareLinkSuccess.Type;
  constructor(public readonly link: string) { }
}

export class EmailCollectionShareLink implements Action {
  public static readonly Type = '[Sharing] Email Collection Share Link';
  public readonly type = EmailCollectionShareLink.Type;
  constructor(
    public readonly collectionId: number,
    public readonly parameters: CollectionShareParameters,
    public readonly reloadType: CollectionReloadType
  ) { }
}

export class EmailCollectionShareLinkSuccess implements Action {
  public static readonly Type = '[Sharing] Email Collection Share Link Success';
  public readonly type = EmailCollectionShareLinkSuccess.Type;
  constructor(public readonly reloadType: CollectionReloadType) { }
}

export class EmailAssetShareLink implements Action {
  public static readonly Type = '[Sharing] Email Asset Share Link';
  public readonly type = EmailAssetShareLink.Type;
  constructor(
    public readonly assetId: number,
    public readonly markers: SubclipMarkers,
    public readonly parameters: AssetShareParameters,
    public readonly properties: Pojo
  ) { }
}

export type Any = CreateAssetShareLink | CreateAssetShareLinkSuccess | EmailAssetShareLink | EmailCollectionShareLink
  | EmailCollectionShareLinkSuccess;
