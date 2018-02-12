import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../../app.store';

@Injectable()
export class QuoteShowResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(factory => factory.quoteShow.load(parseInt(route.params.id)));

    return this.store.blockUntil(state => !state.quoteShow.loading);
  }
}
