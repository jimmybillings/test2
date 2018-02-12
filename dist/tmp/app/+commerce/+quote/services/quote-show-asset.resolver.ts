import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppStore } from '../../../app.store';

@Injectable()
export class QuoteShowAssetResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(factory => factory.asset.loadQuoteShowAsset(parseInt(route.params.id), route.params.uuid));

    return this.store.blockUntil(state => !state.asset.loading);
  }
}
