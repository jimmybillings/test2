import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as QuoteShowActions from './quote-show.actions';
import { FutureQuoteShowService } from './quote-show.service';
import { AppStore } from '../../app.store';

@Injectable()
export class QuoteShowEffects {
  @Effect()
  public load: Observable<Action> = this.actions.ofType(QuoteShowActions.Load.Type)
    .switchMap((action: QuoteShowActions.Load) =>
      this.service.load(action.quoteId)
        .map(quote => this.store.create(factory => factory.quoteShow.loadSuccess(quote)))
        .catch(error => Observable.of(this.store.create(factory => factory.quoteShow.loadFailure(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: FutureQuoteShowService) { }
}
