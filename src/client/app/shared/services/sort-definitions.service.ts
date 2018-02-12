import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserPreferenceService } from './user-preference.service';
import { ApiService } from './api.service';
import { Api } from '../interfaces/api.interface';
import { LegacyAction } from '../interfaces/common.interface';

const initSortState: any = {
  sorts: [],
  currentSort: {}
};

export function sortDefinitions(state = initSortState, action: LegacyAction) {
  switch (action.type) {
    case 'SORTS.UPDATE_DEFINITIONS':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

@Injectable()
export class SortDefinitionsService {
  public data: Observable<any>;

  constructor(private api: ApiService, private store: Store<any>, private userPreference: UserPreferenceService) {
    this.data = this.store.select('sortDefinitions');
  }

  public update(params: any): void {
    this.store.dispatch({ type: 'SORTS.UPDATE_DEFINITIONS', payload: params });
  }

  public getSortDefinitions(): Observable<any> {
    return this.api.get(Api.Identities, 'sortDefinition/list').flatMap((response: any) => {
      let stickySort: any = this.findStickySort(response.list) || response.list[0].first;
      this.update({ sorts: response.list, currentSort: stickySort });
      return this.data;
    });
  }

  private findStickySort(sorts: Array<any>): any {
    for (let group of sorts) {
      for (let definition in group) {
        if (group[definition].id === parseInt(this.userPreference.state.sortId)) {
          return group[definition];
        };
      };
    };
  }
}
