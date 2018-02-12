import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Api, ApiParameters } from '../interfaces/api.interface';
import { Orders, OrdersApiResponse } from '../interfaces/commerce.interface';
import { OrdersStore } from '../stores/orders.store';

@Injectable()
export class OrdersService {

  constructor(
    private api: ApiService,
    private store: OrdersStore) { }

  public get data(): Observable<Orders> {
    return this.store.data;
  }

  public getOrders(params: any): Observable<OrdersApiResponse> {
    return this.api.get(Api.Orders, 'order/myOrders',
      { parameters: this.buildSearchParams(params), loadingIndicator: true }
    ).do((response: OrdersApiResponse) => this.store.storeOrders(response));
  }

  private buildSearchParams(params: any): any {
    params.i = (params.i && params.i > 0) ? params.i - 1 : 0;
    return Object.assign({}, { q: '', s: '', d: '', i: 0, n: 20 }, params);
  }
}
