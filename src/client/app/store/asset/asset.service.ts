import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/services/api.service';
import { FutureApiService } from '../api/api.service';
import { Api, ApiOptions } from '../../shared/interfaces/api.interface';
import { AssetType } from '../../shared/interfaces/enhanced-asset';
import { Asset, AssetLoadParameters } from '../../shared/interfaces/common.interface';

@Injectable()
export class AssetService {
  constructor(private apiService: FutureApiService) { }

  public load(parameters: AssetLoadParameters, assetType: AssetType, parentId?: number): Observable<Asset> {
    const requestUrl: string = this.requestUrlFor(parameters, assetType, parentId);
    const options: ApiOptions = { loadingIndicator: true };
    if (parameters.share_key) options.overridingToken = parameters.share_key;

    return this.apiService.get(Api.Assets, requestUrl, options)
      .map(asset => this.merge(asset, parameters));
  }

  private merge(asset: Asset, parameters: AssetLoadParameters): Asset {
    return {
      ...asset,
      uuid: parameters.uuid || null,
      timeStart: this.convert(parameters.timeStart),
      timeEnd: this.convert(parameters.timeEnd)
    };
  }

  private convert(time: string): number {
    const number: number = parseInt(time);
    return number >= 0 ? number : null;
  }

  private requestUrlFor(parameters: AssetLoadParameters, assetType: AssetType, parentId: number): string {
    switch (assetType) {
      case 'collection':
        return `clip/${parameters.id}/collection/${parentId}/clipDetail`;
      case 'order':
        return `clip/${parameters.id}/order/${parentId}/clipDetail`;
      case 'quoteEdit':
      case 'quoteShow':
        return `clip/${parameters.id}/quote/${parentId}/clipDetail`;
      default:
        return `clip/${parameters.id}/clipDetail`;
    }
  }
}

@Injectable()
export class LegacyAssetService {
  constructor(private apiService: ApiService) { }

  public getClipPreviewData(assetId: number): Observable<any> {
    const viewType: ApiOptions = { parameters: { 'useType': 'clipPreview' } };
    return this.apiService.get(Api.Assets, `renditionType/${assetId}`, viewType);
  }
}
