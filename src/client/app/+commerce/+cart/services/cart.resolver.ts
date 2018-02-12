import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../../app.store';

@Injectable()
export class CartResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  resolve(): Observable<boolean> {
    this.store.dispatch(factory => factory.cart.load());

    return this.store.blockUntil(state => !state.cart.loading);
  }
}
