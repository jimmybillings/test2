import { Action } from '@ngrx/store';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';
import { Collection } from '../../shared/interfaces/collection.interface';

export class ActionFactory {
  public addAssetToCollection(collection: Collection, asset: EnhancedAsset): AddAssetToCollection {
    return new AddAssetToCollection(collection, asset);
  }
}

export class InternalActionFactory extends ActionFactory { }

export class AddAssetToCollection implements Action {
  public static readonly Type = '[Collections] add asset to collection';
  public readonly type = AddAssetToCollection.Type;
  constructor(readonly collection: Collection, readonly asset: EnhancedAsset) { }
}

export type Any = AddAssetToCollection;
