import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { SearchService } from './search.service';
import * as SearchActions from './search.actions';

@Injectable()
export class SearchEffects {
  @Effect()
  public loadResults: Observable<Action> = this.actions.ofType(SearchActions.LoadResults.Type)
    .switchMap((action: SearchActions.LoadResults) =>
      this.service.loadResults(action.params)
        .map((results) => this.store.create(factory => factory.search.loadResultsSuccess(results)))
        .catch(error => Observable.of(this.store.create(factory => factory.search.loadResultsFailure(error))))
    );

  @Effect()
  public loadResultsFailure: Observable<Action> = this.actions.ofType(SearchActions.LoadResultsFailure.Type)
    .map((action: SearchActions.LoadResultsFailure) =>
      this.store.create(factory => factory.error.handle(action.error))
    );

  constructor(private actions: Actions, private store: AppStore, private service: SearchService) { }
}
