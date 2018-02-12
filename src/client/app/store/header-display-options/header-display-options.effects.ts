import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AppStore } from '../../app.store';
import * as HeaderDisplayOptionsActions from './header-display-options.actions';

@Injectable()
export class HeaderDisplayOptionsEffects {
  @Effect()
  public determineHeaderPosition: Observable<Action> = this.actions
    .ofType(HeaderDisplayOptionsActions.SetHeaderPosition.Type)
    .withLatestFrom(this.store.select(state => state.headerDisplayOptions.isFixed))
    .switchMap(([action, isFixed]: [HeaderDisplayOptionsActions.SetHeaderPosition, boolean]) =>
      this.shouldHeaderBeFixed(action.pageVerticalOffset)
        .filter(shouldBeFixed => shouldBeFixed !== isFixed)
        .map((shouldBeFixed: boolean) => {
          return shouldBeFixed ?
            this.store.create(factory => factory.headerDisplayOptions.fix()) :
            this.store.create(factory => factory.headerDisplayOptions.unfix());
        })
    );

  @Effect()
  public determineIfHeaderCanBeFixed: Observable<Action> = this.actions
    .ofType(HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type)
    .switchMap((action: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed) => this.canHeaderBeFixed(action.url)
      .map((canBeFixed: boolean) => {
        return canBeFixed ?
          this.store.create(factory => factory.headerDisplayOptions.enableFix()) :
          this.store.create(factory => factory.headerDisplayOptions.disableFix());
      })
    );

  @Effect()
  public determineIfFiltersAreAvailable: Observable<Action> = this.actions
    .ofType(HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type)
    .switchMap((action: HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable) => this.areFiltersAvailable(action.url)
      .map((filtersAreAvailable) => {
        return filtersAreAvailable ?
          this.store.create(factory => factory.headerDisplayOptions.enableFilters()) :
          this.store.create(factory => factory.headerDisplayOptions.disableFilters());
      })
    );

  private readonly urlsWhereHeaderCannotBeFixed: string[] = [
    '/user/forgot-password',
    '/user/register',
    '/user/login',
    '/user/reset-password',
    '/error/404',
    '/error/400',
    '/error/500'
  ];

  constructor(private actions: Actions, private store: AppStore) { }

  private shouldHeaderBeFixed(pageVerticalOffset: number): Observable<boolean> {
    return (pageVerticalOffset > 111) ? Observable.of(true) : Observable.of(false);
  }

  private canHeaderBeFixed(url: string): Observable<boolean> {
    if (url === '/') return Observable.of(false);
    let canBeFixed: boolean = this.urlsWhereHeaderCannotBeFixed.filter(u => url.indexOf(u) > -1).length === 0;
    return Observable.of(canBeFixed);
  }

  private areFiltersAvailable(url: string): Observable<boolean> {
    let filtersAreAvailable =
      (url.indexOf('search') > -1 &&
        url.indexOf('search/asset/') === -1) &&
      url.indexOf('gq=') < 0;
    return Observable.of(filtersAreAvailable);
  }
}
