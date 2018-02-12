import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LegacyAction } from '../interfaces/common.interface';

const collectionOptionsState: any = {
  currentFilter: {
    'id': 0,
    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
    'value': 'all',
    'access': { 'accessLevel': 'all' }
  },
  currentSort: {
    'id': 0,
    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
    'value': 'modNewest',
    'sort': { 's': 'lastUpdated', 'd': true }
  },
  currentSearchQuery: { 'q': '' }
};

export function collectionOptions(state = collectionOptionsState, action: LegacyAction) {
  switch (action.type) {
    case 'RESET_OPTIONS':
      return Object.assign({}, action.payload);
    case 'UPDATE_OPTIONS':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

@Injectable()
export class CollectionContextService {
  public data: Observable<any>;

  constructor(public store: Store<any>) {
    this.data = store.select('collectionOptions');
  }

  public updateCollectionOptions(options: any): void {
    this.store.dispatch({ type: 'UPDATE_OPTIONS', payload: options });
  }

  public resetCollectionOptions(): void {
    this.store.dispatch({ type: 'RESET_OPTIONS', payload: collectionOptionsState });
  }
}
