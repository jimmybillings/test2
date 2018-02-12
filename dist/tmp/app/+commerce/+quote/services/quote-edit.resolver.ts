import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../../app.store';

@Injectable()
export class QuoteEditResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  resolve(): Observable<boolean> {
    this.store.dispatch(factory => factory.quoteEdit.load());

    return this.store.blockUntil(state => !state.quoteEdit.loading);
  }
}
