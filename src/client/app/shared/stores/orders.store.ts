import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Orders } from '../interfaces/commerce.interface';
import { LegacyAction } from '../interfaces/common.interface';

/**
 * Orders store -
 */
const ordersState: Orders = {
  items: [],
  pagination: {
    totalCount: 0,
    currentPage: 1,
    pageSize: 100,
    hasNextPage: false,
    hasPreviousPage: false,
    numberOfPages: 0
  }
};

export function orders(state: Orders = ordersState, action: LegacyAction) {
  switch (action.type) {
    case 'ORDERS.GET_ORDERS':
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};


@Injectable()
export class OrdersStore {
  constructor(private store: Store<any>) { }

  public get data(): Observable<any> {
    return this.store.select('orders');
  }

  public storeOrders(payload: any): void {
    payload.items = payload.items === undefined ? [] : payload.items;
    this.store.dispatch({
      type: 'ORDERS.GET_ORDERS', payload: {
        'items': payload.items,
        'pagination': {
          'totalCount': payload.totalCount,
          'currentPage': payload.currentPage + 1,
          'hasNextPage': payload.hasNextPage,
          'hasPreviousPage': payload.hasPreviousPage,
          'numberOfPages': payload.numberOfPages,
          'pageSize': payload.pageSize
        }
      }
    });
  }
}
