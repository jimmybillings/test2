import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { Api, ApiOptions } from '../../shared/interfaces/api.interface';
import {
  Collection, CollectionPaginationParameters, CollectionItems, CollectionItemMarkersUpdater,
  CollectionItemsResponse, CollectionAssetResponse, AddAssetToCollectionResponse
} from '../../shared/interfaces/collection.interface';
import { Asset, Pagination } from '../../shared/interfaces/common.interface';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';
import { Common } from '../../shared/utilities/common.functions';

@Injectable()
export class ActiveCollectionService {
  constructor(private apiService: FutureApiService) { }

  public load(parameters: CollectionPaginationParameters): Observable<Collection> {
    return this.apiService.get(Api.Assets, 'collectionSummary/focused', { loadingIndicator: true })
      .flatMap((summaryResponse: Collection) => this.combineAssetsWith(summaryResponse, parameters));
  }

  public set(collectionId: number, parameters: CollectionPaginationParameters): Observable<Collection> {
    return this.apiService.put(Api.Assets, `collectionSummary/setFocused/${collectionId}`, { loadingIndicator: true })
      .flatMap((summaryResponse: Collection) => this.combineAssetsWith(summaryResponse, parameters));
  }

  // Deprecated! please use loadFocusedPage() for loading focused collection assets
  public loadPage(collectionId: number, parameters: CollectionPaginationParameters): Observable<CollectionItems> {
    return this.apiService.get(
      Api.Assets,
      `collectionSummary/assets/${collectionId}`,
      { parameters: this.convertToApiParameters(parameters), loadingIndicator: true }
    ).map((res) => this.convertToCollectionItems(res));
  }

  // Replaces loadPage()
  public loadFocusedPage(parameters: CollectionPaginationParameters, totalAssetsAdded: number): Observable<CollectionItems> {
    return this.apiService.get(
      Api.Assets,
      'collectionSummary/assets/focused',
      { parameters: this.convertToApiParameters(parameters), loadingIndicator: true }
    ).map((res) => this.convertToCollectionItems(res, totalAssetsAdded));
  }

  public addAssetTo(
    activeCollection: Collection,
    asset: Asset,
    markers: SubclipMarkersInterface.SubclipMarkers
  ): Observable<CollectionItems> {
    const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(markers);
    const assetInfo: object = {
      assetId: asset.assetId,
      timeStart: String(duration.timeStart),
      timeEnd: String(duration.timeEnd)
    };

    return this.apiService.post(
      Api.Identities, 'collection/focused/addAssets', { body: { list: [assetInfo] }, loadingIndicator: true }
    ).flatMap(res => res.list
      ? this.loadPage(activeCollection.id, { currentPage: 1, pageSize: activeCollection.assets.pagination.pageSize })
      : Observable.of({ items: [] as Asset[], pagination: {} as Pagination })
    );
  }

  public removeAssetFrom(activeCollection: Collection, asset: Asset): Observable<CollectionItems> {
    const pagination: Pagination = activeCollection.assets.pagination;

    // If we come from somewhere that doesn't know about collection UUIDs (like search results), then we
    // (somewhat questionably) just find any asset in the collection with this asset's same assetID and remove it.
    if (!asset.uuid) asset = activeCollection.assets.items.find(otherAsset => otherAsset.assetId === asset.assetId);

    return this.apiService.post(
      Api.Identities, `collection/focused/removeAssets`, { body: { list: [asset.uuid] }, loadingIndicator: true }
    ).flatMap(() =>
      this.loadPage(activeCollection.id, { currentPage: pagination.currentPage, pageSize: pagination.pageSize })
    );
  }

  public updateAssetMarkers(
    activeCollection: Collection, asset: Asset, updatedMarkers: SubclipMarkersInterface.SubclipMarkers
  ): Observable<CollectionItems> {
    const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(updatedMarkers);
    const updater: CollectionItemMarkersUpdater = {
      uuid: asset.uuid,
      assetId: asset.assetId,
      timeStart: String(duration.timeStart),
      timeEnd: String(duration.timeEnd)
    };
    const pagination: Pagination = activeCollection.assets.pagination;

    return this.apiService.put(Api.Identities, `collection/focused/updateAsset`, { body: updater, loadingIndicator: true })
      .flatMap(response =>
        this.loadPage(activeCollection.id, { currentPage: pagination.currentPage, pageSize: pagination.pageSize })
      );
  }

  public addAssetsToFocusedCollection(assets: Asset[], pagination: Pagination): Observable<CollectionItems> {
    const formattedAssets: { assetId: number }[] = assets.map(a => { return { assetId: a.assetId }; });

    return this.apiService.post(
      Api.Identities,
      'collection/focused/addAssets',
      { body: { list: formattedAssets }, loadingIndicator: true }
    ).flatMap((res: AddAssetToCollectionResponse) => {
      return this.loadFocusedPage(
        { currentPage: pagination.currentPage, pageSize: pagination.pageSize },
        res.list ? res.list.length : 0
      );
    });
  }

  private combineAssetsWith(collectionSummary: Collection, parameters: CollectionPaginationParameters): Observable<Collection> {
    return this.loadPage(collectionSummary.id, parameters)
      .map((assets: CollectionItems) => ({ ...collectionSummary, assets: assets }));
  }

  private convertToApiParameters(parameters: CollectionPaginationParameters) {
    return {
      i: String(parameters.currentPage - 1), // Convert UI one-based page to API zero-based page.
      n: String(parameters.pageSize)
    };
  }

  private convertToCollectionItems(response: CollectionItemsResponse, totalAssetsAdded?: number): CollectionItems {
    const convertedItems: Asset[] =
      (response.items || []).map(item => ({ ...item, timeStart: parseInt(item.timeStart), timeEnd: parseInt(item.timeEnd) }));

    let collectionItems: CollectionItems = {
      items: convertedItems,
      pagination: {
        totalCount: response.totalCount || 0,
        currentPage: (response.currentPage || 0) + 1, // Convert API zero-based page to UI one-based page.
        pageSize: response.pageSize || 0,
        hasNextPage: response.hasNextPage || false,
        hasPreviousPage: response.hasPreviousPage || false,
        numberOfPages: response.numberOfPages || 0
      }
    };

    if (Common.isNotNullOrUndefined(totalAssetsAdded)) collectionItems = { ...collectionItems, totalAssetsAdded };

    return collectionItems;
  }
}
