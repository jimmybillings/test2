import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Cart } from '../../shared/interfaces/commerce.interface';
import { SubclipMarkers, Duration, durationFrom, bothMarkersAreSet } from '../../shared/interfaces/subclip-markers';
import { AssetLineItem, Asset } from '../../shared/interfaces/commerce.interface';
import { Pojo, SelectedPriceAttribute } from '../../shared/interfaces/common.interface';
import { Common } from '../../shared/utilities/common.functions';

@Injectable()
export class FutureCartService {
  constructor(private apiService: FutureApiService) { }

  public load(): Observable<Cart> {
    return this.apiService.get(Api.Orders, 'cart', { loadingIndicator: true });
  }

  public editLineItem(
    lineItem: AssetLineItem,
    markers: SubclipMarkers,
    attributes: SelectedPriceAttribute[]
  ): Observable<Cart> {
    const duration: Duration = this.durationFrom(lineItem, markers);
    const newAttributes: SelectedPriceAttribute[] = attributes ? attributes : lineItem.attributes || [];
    const newAsset: Asset = { ...lineItem.asset, ...duration };

    const newLineItem = {
      ...lineItem,
      attributes: newAttributes,
      asset: newAsset
    };

    return this.makeEditLineItemRequest(newLineItem);
  }

  public removeAsset(asset: Asset): Observable<Cart> {
    return this.apiService.delete(Api.Orders, `cart/asset/${asset.uuid}`, { loadingIndicator: true });
  }

  public addNote(note: string, lineItem: AssetLineItem): Observable<Cart> {
    if (lineItem.hasOwnProperty('notes') && Array.isArray(lineItem.notes)) {
      lineItem.notes[0] = { notes: [note] };
    } else {
      lineItem.notes = [{ notes: [note] }];
    }

    return this.makeEditLineItemRequest(lineItem);
  }

  public removeNoteFrom(lineItem: AssetLineItem): Observable<Cart> {
    let clonedLineItem: AssetLineItem = Common.clone(lineItem);
    delete clonedLineItem.notes;

    return this.makeEditLineItemRequest(clonedLineItem);
  }

  private durationFrom(lineItem: AssetLineItem, markers: SubclipMarkers): Duration {
    return bothMarkersAreSet(markers) ?
      durationFrom(markers) : { timeStart: lineItem.asset.timeStart, timeEnd: lineItem.asset.timeEnd };
  }

  private makeEditLineItemRequest(lineItem: AssetLineItem): Observable<Cart> {
    return this.apiService.put(
      Api.Orders,
      `cart/update/lineItem/${lineItem.id}`,
      { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true }
    );
  }
}
