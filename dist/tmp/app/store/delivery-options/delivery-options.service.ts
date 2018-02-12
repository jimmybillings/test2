import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api, ApiParameters, ApiOptions } from '../../shared/interfaces/api.interface';
import { SubclipMarkers, durationFrom, Duration } from '../../shared/interfaces/subclip-markers';
import { Order } from '../../shared/interfaces/commerce.interface';
import { AsperaService } from '../../shared/services/aspera.service';
import {
  DeliveryOption,
  ApiDeliveryOptions,
  DeliveryOptions,
  DeliveryOptionGroup,
} from '../../shared/interfaces/asset.interface';


@Injectable()
export class DeliveryOptionsService {
  constructor(private apiService: FutureApiService, private asperaService: AsperaService) { }

  public getDeliveryOptions(assetId: number, shareKey?: string): Observable<DeliveryOptions> {
    let options: ApiOptions = {};
    if (shareKey) options.overridingToken = shareKey;

    return this.apiService.get(Api.Assets, `renditionType/deliveryOptions/${assetId}`, options).map(this.formatDeliveryOptions);
  }

  public deliverAsset(assetId: number, optionId: number, markers?: SubclipMarkers): Observable<Order> {
    let parameters: ApiParameters = {
      region: 'AAA',
      optionId: String(optionId)
    };

    if (markers) {
      const duration: Duration = durationFrom(markers);
      parameters = { ...parameters, startTime: String(duration.timeStart), endTime: String(duration.timeEnd) };
    }

    return this.apiService.post(
      Api.Orders,
      `order/deliverAsset/${assetId}`,
      {
        loadingIndicator: true,
        parameters: parameters
      }
    );
  }

  public initializeAsperaConnection(asperaSpec: string): void {
    this.asperaService.initConnect(asperaSpec);
  }

  private formatDeliveryOptions(options: ApiDeliveryOptions): DeliveryOptions {
    if (!options.list) return [];
    let formattedOptions: DeliveryOptions = [];
    options.list.reduce((usedGroupIds: string[], option: DeliveryOption) => {
      let group: DeliveryOptionGroup;
      if (!option.deliveryOptionGroupId) {
        formattedOptions.push([option]);
      } else {
        const groupId: string = option.deliveryOptionGroupId;
        if (!usedGroupIds.includes(groupId)) {
          group = options.list
            .filter(o => o.deliveryOptionGroupId === groupId)
            .sort((a, b) => parseInt(a.deliveryOptionGroupOrder) - parseInt(b.deliveryOptionGroupOrder));
          formattedOptions.push(group);
          usedGroupIds.push(groupId);
        }
      }
      return usedGroupIds;
    }, []);
    return formattedOptions;
  }
}
