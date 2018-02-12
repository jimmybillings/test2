import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action } from '@ngrx/store';

import { CollectionPaginationParameters } from '../../shared/interfaces/collection.interface';
import { AppStore, ActionFactory, ActiveCollectionState } from '../../app.store';

@Injectable()
export class CollectionShowResolver {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(factory => this.createAppropriateActionFor(route.params, factory));

    return this.store.blockUntil(state => !state.activeCollection.loading);
  }

  private createAppropriateActionFor(routeParameters: { [key: string]: any }, factory: ActionFactory): Action {
    const state: ActiveCollectionState = this.store.snapshot(state => state.activeCollection);
    const routeId: number = Number(routeParameters['id']);
    const actionParameters: CollectionPaginationParameters = {
      currentPage: routeParameters['i'], pageSize: routeParameters['n']
    };

    if (!state.loading) {
      if (state.collection.id === routeId) {
        return factory.activeCollection.loadPage(actionParameters);
      }

      return factory.activeCollection.set(routeId, actionParameters);
    }

    return factory.activeCollection.load(actionParameters);
  }
}
