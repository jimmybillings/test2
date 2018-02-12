import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { FutureCollectionsService } from './collections.service';
import * as CollectionsActions from './collections.actions';
import { Collection, AddAssetToCollectionResponse } from '../../shared/interfaces/collection.interface';

@Injectable()
export class CollectionsEffects {

  @Effect()
  public addAsset: Observable<Action> = this.actions.ofType(CollectionsActions.AddAssetToCollection.Type)
    .switchMap((action: CollectionsActions.AddAssetToCollection) =>
      this.service.addAssetTo(action.collection, action.asset)
        .map((addAssetToCollectionResponse: AddAssetToCollectionResponse) => {
          return addAssetToCollectionResponse.list
            ? this.store.create(factory => factory.snackbar.display('COLLECTION.SHOW.ASSET_ADDED',
              { collectionName: action.collection.name, assetId: action.asset.assetId })
            )
            : this.store.create(factory =>
              factory.snackbar.display('COLLECTION.ALREADY_IN_COLLECTION_TOAST',
                { collectionName: action.collection.name })
            );
        })
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: FutureCollectionsService) { }
}
