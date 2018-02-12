import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { EnhancedAsset, enhanceAsset } from '../../shared/interfaces/enhanced-asset';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { SpeedviewData } from '../../shared/interfaces/asset.interface';

@Injectable()
export class SpeedPreviewService {
  constructor(private apiService: FutureApiService, private currentUserService: CurrentUserService) { }

  public load(asset: EnhancedAsset): Observable<SpeedviewData> {
    let path: string;
    // If the asset belongs to a user based collection, cart, quote, etc...
    if (asset.parentId && asset.type) {
      path = `assetInfo/view/SpeedView/clip/${asset.assetId}/${asset.type}/${asset.parentId}`;

      // If the asset is an item in the search results page response.
    } else {
      path = this.currentUserService.loggedIn() ?
        `assetInfo/view/SpeedView/${asset.assetId}` : `assetInfo/anonymous/view/SpeedView/${asset.assetId}`;
    }

    return this.apiService.get(Api.Assets, path);
  }
}
