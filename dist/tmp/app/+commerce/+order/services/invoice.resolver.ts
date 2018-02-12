import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ActionFactoryMapper, AppStore } from '../../../app.store';

@Injectable()
export class InvoiceResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const orderId: number = Number(route.params['id']);
    const shareKey: string = route.params['share_key'];

    const actionMapper: ActionFactoryMapper = shareKey ?
      factory => factory.invoice.load(orderId, shareKey) :
      factory => factory.invoice.load(orderId);

    this.store.dispatch(actionMapper);

    return this.store.blockUntil(state => !state.invoice.loading);
  }
}
