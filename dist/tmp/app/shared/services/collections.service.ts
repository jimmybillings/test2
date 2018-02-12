import { Injectable } from '@angular/core';
import { Collection, CollectionSummary } from '../../shared/interfaces/collection.interface';
import { Pojo, Asset } from '../../shared/interfaces/common.interface';
import { Observable } from 'rxjs/Observable';
import { CollectionsStore } from '../stores/collections.store';
import { ApiService } from '../../shared/services/api.service';
import { Api, LoadingIndicatorOption } from '../../shared/interfaces/api.interface';
import { AppStore, ActiveCollectionState } from '../../app.store';

@Injectable()
export class CollectionsService {
  private params: any;

  constructor(
    private collectionsStore: CollectionsStore,
    private api: ApiService,
    private store: AppStore
  ) {
    this.setSearchParams();
    this.staySyncedWithActiveCollection();
  }

  public get data(): Observable<CollectionSummary> {
    return this.collectionsStore.data;
  }

  public get state(): any {
    return this.collectionsStore.state;
  }

  public load(params?: any, loadingIndicator: LoadingIndicatorOption = false): Observable<any> {
    if (params) this.params = Object.assign({}, this.params, params);

    return this.api.get(Api.Assets, `collectionSummary/search`, { parameters: this.params, loadingIndicator: loadingIndicator })
      .do(response => this.collectionsStore.replaceAllCollectionsWith(response));
  }

  public create(collection: Collection): Observable<Collection> {
    return this.api.post(Api.Assets, 'collectionSummary', { body: collection, loadingIndicator: true })
      .do(response => this.collectionsStore.add(response as Collection));
  }

  public duplicate(collection: Collection): Observable<Collection> {
    return this.api.post(Api.Identities, 'collection', { body: collection, loadingIndicator: true });
  }

  public getByIdAndDuplicate(id: number): Observable<Pojo> {
    return this.api.get(Api.Identities, `collection/${id}`, { loadingIndicator: true })
      .map(response => this.prepareForDuplication(response));
  }

  public update(id: number, collectionUpdates: Collection): Observable<any> {
    // ANNOYANCES:
    // - If the API supported a PATCH request for this endpoint, we could just call it with the id and collectionUpdates.
    //   But it doesn't so we must GET, modify the response, and PUT it back.
    // - The GET returns an "assets" property, which is undocumented in Swagger.
    // - The PUT accepts the "assets" property, but somehow ignores it (also undocumented in Swagger).  Therefore, we don't
    //   need to remove it from the body sent with the PUT request here.

    const endpoint: string = `collection/${id}`;

    return this.api.get(Api.Identities, endpoint, { loadingIndicator: 'onBeforeRequest' })
      .switchMap(response =>
        this.api.put(
          Api.Identities,
          endpoint,
          { body: { ...response, ...collectionUpdates }, loadingIndicator: 'offAfterResponse' }
        )
      );
  }

  public delete(collectionId: number, loadingIndicator: LoadingIndicatorOption = 'onBeforeRequest'): Observable<any> {
    this.collectionsStore.deleteCollectionWith(collectionId);
    return this.api.delete(Api.Identities, `collection/${collectionId}`, { loadingIndicator: loadingIndicator })
      .switchMap(_ => {
        if (this.store.match(collectionId, state => state.activeCollection.collection.id)) {
          this.store.dispatch(factory => factory.activeCollection.load());

          return this.store.blockUntil(state => !state.activeCollection.loading).switchMap(() => this.load());
        } else {
          return this.load();
        }
      });
  }

  public reset(): void {
    this.collectionsStore.deleteAllCollections();
  }

  public destroyAll(): void {
    this.collectionsStore.deleteAllCollections();
    this.store.dispatch(factory => factory.activeCollection.reset());
  }

  public getItems(collectionId: number): Observable<any> {
    return this.api.get(
      Api.Assets,
      `collectionSummary/assets/${collectionId}`,
      { parameters: { i: '0', n: '100' }, loadingIndicator: true }
    );
  }

  private staySyncedWithActiveCollection(): void {
    this.store.select(state => state.activeCollection).subscribe((activeCollectionState: ActiveCollectionState) => {
      if (this.state.items && this.state.items.length > 0 && !activeCollectionState.loading) {
        this.collectionsStore.update(activeCollectionState.collection);
      }
    });
  }

  private setSearchParams() {
    this.params = { q: '', accessLevel: 'all', s: '', d: '', i: 0, n: 200 };
  }

  private prepareForDuplication(collection: Pojo): Pojo {
    let collectionCopy: Pojo = {
      name: collection.name,
      tags: collection.tags,
      siteName: collection.siteName,
    };
    if (collection.assets) {
      collectionCopy.assets = collection.assets.map((asset: Asset) => (
        {
          assetId: asset.assetId,
          timeEnd: asset.timeEnd,
          timeStart: asset.timeStart
        }
      ));
    }
    return collectionCopy;
  }
}
