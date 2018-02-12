import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as ActiveCollectionActions from './active-collection.actions';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';
import { ActiveCollectionService } from './active-collection.service';
import { AppStore, AppState, InternalActionFactoryMapper } from '../../app.store';
import { Collection, CollectionItems } from '../../shared/interfaces/collection.interface';
import { Asset, Pagination } from '../../shared/interfaces/common.interface';
import { UserPreferenceService } from '../../shared/services/user-preference.service';

@Injectable()
export class ActiveCollectionEffects {
  @Effect()
  public load: Observable<Action> = this.actions.ofType(ActiveCollectionActions.Load.Type)
    .switchMap((action: ActiveCollectionActions.Load) =>
      this.service.load(action.pagination)
        .map((collection: Collection) => this.store.create(factory => factory.activeCollection.loadSuccess(collection)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public loadIfNeeded: Observable<Action> = this.actions.ofType(ActiveCollectionActions.LoadIfNeeded.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection.id))
    .filter(([action, collectionId]: [ActiveCollectionActions.LoadIfNeeded, number]) =>
      collectionId === null
    )
    .map(([action, collectionId]: [ActiveCollectionActions.LoadIfNeeded, number]) =>
      this.store.create(factory => factory.activeCollection.load(action.pagination))
    );

  @Effect()
  public set: Observable<Action> = this.actions.ofType(ActiveCollectionActions.Set.Type)
    .switchMap((action: ActiveCollectionActions.Set) =>
      this.service.set(action.collectionId, action.pagination)
        .map((collection: Collection) => this.store.create(factory => factory.activeCollection.setSuccess(collection)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public loadPage: Observable<Action> = this.actions.ofType(ActiveCollectionActions.LoadPage.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection.id))
    .switchMap(([action, collectionId]: [ActiveCollectionActions.LoadPage, number]) =>
      this.service.loadPage(collectionId, action.pagination)
        .map((assets: CollectionItems) => this.store.create(factory => factory.activeCollection.loadPageSuccess(assets)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  // TODO: After user preference service has been replaced, this will map to a user preference action instead of calling do().
  @Effect({ dispatch: false })
  public openTrayOnAddOrRemove: Observable<Action> =
    this.actions.ofType(ActiveCollectionActions.AddAsset.Type, ActiveCollectionActions.RemoveAsset.Type)
      .do(() => this.userPreferenceService.openCollectionTray());

  @Effect()
  public addAsset: Observable<Action> = this.actions.ofType(ActiveCollectionActions.AddAsset.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection))
    .switchMap(([action, collection]: [ActiveCollectionActions.AddAsset, Collection]) =>
      this.service.addAssetTo(collection, action.asset, action.markers)
        .map((assets: CollectionItems) => assets.items.length > 0
          ? this.store.create(factory => factory.activeCollection.addAssetSuccess(assets))
          : this.store.create(factory =>
            factory.snackbar.display('COLLECTION.ALREADY_IN_COLLECTION_TOAST', { collectionName: collection.name })
          )
        )
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public showSnackBarOnAddSuccess: Observable<Action> = this.actions.ofType(ActiveCollectionActions.AddAssetSuccess.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection.name))
    .map(([action, name]: [ActiveCollectionActions.AddAssetSuccess, string]) =>
      this.store.create(factory => factory.snackbar.display('COLLECTION.ADD_TO_COLLECTION_TOAST', { collectionName: name }))
    );

  @Effect()
  public removeAsset: Observable<Action> = this.actions.ofType(ActiveCollectionActions.RemoveAsset.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection))
    .switchMap(([action, collection]: [ActiveCollectionActions.RemoveAsset, Collection]) =>
      this.service.removeAssetFrom(collection, action.asset)
        .map((assets: CollectionItems) => this.store.create(factory => factory.activeCollection.removeAssetSuccess(assets)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public showSnackBarOnRemoveSuccess: Observable<Action> = this.actions.ofType(ActiveCollectionActions.RemoveAssetSuccess.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection.name))
    .map(([action, name]: [ActiveCollectionActions.RemoveAssetSuccess, string]) =>
      this.store.create(factory => factory.snackbar.display('COLLECTION.REMOVE_ASSET.SUCCESS', { collectionName: name }))
    );

  @Effect()
  public changeRouteOnRemoveAssetSuccess: Observable<Action> =
    this.actions.ofType(ActiveCollectionActions.RemoveAssetSuccess.Type)
      .withLatestFrom(this.store.select(state => state.activeCollection.collection.id))
      .map(([action, collectionId]: [ActiveCollectionActions.RemoveAssetSuccess, number]) => {
        return this.store.create(factory => factory.router.goToCollection(collectionId));
      });


  @Effect()
  public updateAssetMarkers: Observable<Action> = this.actions.ofType(ActiveCollectionActions.UpdateAssetMarkers.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection))
    .switchMap(([action, collection]: [ActiveCollectionActions.UpdateAssetMarkers, Collection]) =>
      this.service.updateAssetMarkers(collection, action.asset, action.markers)
        .map((assets: CollectionItems) =>
          this.store.create(factory => factory.activeCollection.updateAssetMarkersSuccess(assets)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public showSnackbarOnUpdateAssetMarkersSuccess: Observable<Action> =
    this.actions.ofType(ActiveCollectionActions.UpdateAssetMarkersSuccess.Type)
      .withLatestFrom(this.store.select(state => state.activeCollection.collection.name))
      .map(([action, name]: [ActiveCollectionActions.UpdateAssetMarkersSuccess, string]) =>
        this.store.create(factory => factory.snackbar.display('COLLECTION.UPDATE_IN_COLLECTION_TOAST', { collectionName: name }))
      );

  @Effect()
  public addPageOfSearchAssets: Observable<Action> = this.actions.ofType(ActiveCollectionActions.AddPageOfSearchAssets.Type)
    .withLatestFrom(this.store.select(state => state.search.results.items))
    .withLatestFrom(this.store.select(state => state.activeCollection.collection.assets.pagination))
    .switchMap(([[action, items], pagination]: [[ActiveCollectionActions.AddPageOfSearchAssets, Asset[]], Pagination]) =>
      this.service.addAssetsToFocusedCollection(items, pagination)
        .map(items => this.store.create(factory => factory.activeCollection.addPageOfSearchAssetsSuccess(items)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public showToastOnAddPageSuccess: Observable<Action> =
    this.actions.ofType(ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type)
      .withLatestFrom(this.store.select(state => state.activeCollection.collection.name))
      .map(([action, collectionName]: [ActiveCollectionActions.AddPageOfSearchAssetsSuccess, string]) =>
        this.store.create(factory => factory.snackbar.display(
          'COLLECTION.ADD_ASSETS_SUCCESS_TOAST',
          { totalAssetsAdded: action.currentPageItems.totalAssetsAdded, collectionName })
        )
      );

  constructor(
    private actions: Actions,
    private store: AppStore,
    private service: ActiveCollectionService,
    private userPreferenceService: UserPreferenceService  // For now, until we can directly map to user preference actions...
  ) { }
}
