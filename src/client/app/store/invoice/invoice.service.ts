import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { Api, ApiOptions } from '../../shared/interfaces/api.interface';
import { Invoice } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class InvoiceService {
  constructor(private apiService: FutureApiService) { }

  public load(orderId: number, shareKey?: string): Observable<Invoice> {
    let apiOptions: ApiOptions = { loadingIndicator: true };
    if (shareKey) apiOptions = { ...apiOptions, overridingToken: shareKey };
    return this.apiService.get(Api.Orders, `order/invoiceData/${orderId}`, apiOptions);
  }
}
