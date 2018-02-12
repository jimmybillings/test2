import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../../app.store';

@Injectable()
export class OrderResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requestedOrderId: number = Number(route.params['id']);

    this.store.dispatch(factory => factory.order.load(requestedOrderId));

    return this.store.blockUntil(state => !state.order.loading);
  }
}
