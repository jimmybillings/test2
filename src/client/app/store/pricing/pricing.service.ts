import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';
import { PriceAttribute } from '../../shared/interfaces/commerce.interface';
import { Api, ApiParameters } from '../../shared/interfaces/api.interface';
import { Pojo } from '../../shared/interfaces/common.interface';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';


@Injectable()
export class PricingService {
  constructor(private apiService: FutureApiService) { }

  public getPrice(attributes: Pojo, assetId: number, markers?: SubclipMarkersInterface.SubclipMarkers): Observable<any> {
    const parameters: ApiParameters =
      Object.assign(
        { region: 'AAA' },
        { attributes: this.formatAttributes(attributes) },
        markers ? this.formatDurationParametersFor(markers) : null
      );

    return this.apiService.get(Api.Orders, `priceBook/price/${assetId}`, { parameters }).map((data: any) => data.price);
  }

  public getPriceAttributes(priceModel: string): Observable<Array<PriceAttribute>> {
    priceModel = priceModel.split(' ').join('');
    return this.apiService.get(
      Api.Orders,
      'priceBook/priceAttributes',
      { parameters: { region: 'AAA', priceModel: priceModel } }
    ).map((data: any) => {
      data.list[0].primary = true;
      return data.list;
    });
  }

  private formatAttributes(attrs: any): any {
    let formatted: Array<string> = [];
    for (let attr in attrs) {
      formatted.push(`${attr}:${attrs[attr]}`);
    }
    return formatted.join(',');
  }

  private formatDurationParametersFor(markers: SubclipMarkersInterface.SubclipMarkers): object {
    return {
      startSecond: markers.in.asMilliseconds(), endSecond: markers.out.asMilliseconds()
    };
  }
}
