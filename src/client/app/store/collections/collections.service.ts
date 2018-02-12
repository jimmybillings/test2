import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Collection, AddAssetToCollectionResponse } from '../../shared/interfaces/collection.interface';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';
import { Observable } from 'rxjs/Observable';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';

@Injectable()
export class FutureCollectionsService {
  constructor(private apiService: FutureApiService) { }

  public addAssetTo(collection: Collection, asset: EnhancedAsset): Observable<AddAssetToCollectionResponse> {
    const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(asset.subclipMarkers);
    const assetInfo: object = {
      assetId: asset.assetId,
      timeStart: String(duration.timeStart),
      timeEnd: String(duration.timeEnd)
    };

    return this.apiService.post(
      Api.Identities, `collection/${collection.id}/addAssets`,
      { body: { list: [assetInfo] }, loadingIndicator: true }
    );
  }
}
