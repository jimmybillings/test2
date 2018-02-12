import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppStore } from '../../../app.store';

@Injectable()
export class CartAssetResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(factory => factory.asset.loadCartAsset(route.params.uuid));

    return this.store.blockUntil(state => !state.asset.loading);
  }
}
