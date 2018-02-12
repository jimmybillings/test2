import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ApiService } from '../../shared/services/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { ActiveFilters } from '../interfaces/filters.interface';
import { LegacyAction } from '../interfaces/common.interface';
import { Common } from '../utilities/common.functions';

const initFilters: any = {};
export function filters(state: Array<any> = initFilters, action: LegacyAction) {
  switch (action.type) {
    case 'FILTERS.SET_FILTERS':
      return Object.assign({}, Common.clone(action.payload));
    default:
      return state;
  }
};

@Injectable()
export class FilterService {
  public data: Observable<any>;
  public found: boolean = false;
  constructor(private api: ApiService, private store: Store<any>, private currentUser: CurrentUserService) {
    this.data = this.store.select('filters');
  }

  public load(params: any, counted: boolean): Observable<any> {
    let options = Common.clone(Object.assign({}, params, { counted }));
    if (!options.q) options.q = 'itemType:clip';
    return this.api.get(
      Api.Assets,
      this.currentUser.loggedIn() ? 'filter/filterTree' : 'filter/anonymous/filterTree',
      { parameters: options, loadingIndicator: false }
    ).do(response => {
      let activeFilterGroups: string[] = JSON.parse(localStorage.getItem('activeFilterGroups')) || [];
      this.set(this.sanitize(response, null, activeFilterGroups));
    });
  }

  public clear() {
    this.set(this.clearValues());
  }

  public toggle(filterId: number) {
    this.set(this.toggleValue(filterId));
  }

  public addCustom(filter: any, value: any) {
    this.set(this.addCustomValue(filter, value));
  }

  public toggleExclusive(subFilter: any) {
    this.set(this.toggleExclusiveValue(subFilter));
  }

  public toggleFilterGroup(filter: any) {
    this.set(this.toggleValue(filter.filterId));
    let activeFilterGroups: any = [];
    this.activeFilterGroup(activeFilterGroups);
    localStorage.setItem('activeFilterGroups', JSON.stringify(activeFilterGroups));
  }

  public getActive() {
    let active: ActiveFilters = { filters: [], ids: [], values: [] };
    this.activeFilters(active.filters);
    active.ids = active.filters.map((filter: any) => filter.filterId);
    active.values = active.filters.filter((filter: any) => filter.filterValue)
      .map((filter: any) => `${filter.filterId}:${filter.filterValue}`);
    return active;
  }

  //
  // ----------- END OF PUBLIC INTERFACE ----------- //
  //
  private set(filters: any): void {
    this.store.dispatch({ type: 'FILTERS.SET_FILTERS', payload: filters });
  }

  private sanitize(child: any, parent: any, activeFilterGroups: string[]) {
    if (activeFilterGroups.indexOf(child.filterId) > -1) child.active = true;
    if (parent) child.parentId = parent.filterId;
    if (child.subFilters) {
      for (let baby of child.subFilters) this.sanitize(baby, child, activeFilterGroups);
    }
    return child;
  }

  private activeFilters(activeFilters: any, filter = this.filters) {
    if (filter.subFilters) {
      for (var l of filter.subFilters) this.activeFilters(activeFilters, l);
      return filter;
    } else {
      if (filter.active) activeFilters.push(filter);
      return filter;
    }
  }

  private activeFilterGroup(activeParentFilters: any, filter = this.filters) {
    if (filter.subFilters) {
      if (filter.active) activeParentFilters.push(filter.filterId);
      for (var l of filter.subFilters) {
        this.activeFilterGroup(activeParentFilters, l);
      }
      return filter;
    }
  }

  private clearValues(filter = this.filters) {
    if (filter.subFilters) {
      for (var l of filter.subFilters) this.clearValues(l);
      return filter;
    } else {
      if (filter.active) filter.active = false;
      filter.filterValue = null;
      return filter;
    }
  }

  private toggleExclusiveValue(subFilter: any, filter = this.filters): void {
    if (filter.subFilters) {
      if (filter.filterId === subFilter.parentId) {
        for (let f of filter.subFilters) f.active = (f.filterId === subFilter.filterId) ? !f.active : false;
        this.found = true;
      }
      for (var l of filter.subFilters) {
        if (this.found) {
          this.found = false;
          break;
        }
        this.toggleExclusiveValue(subFilter, l);
      }
      return filter;
    }
    return filter;
  }

  private addCustomValue(currentFilter: any, value: any, filter = this.filters): void {
    if (filter.subFilters) {
      for (let f of filter.subFilters) {
        if (this.found) {
          this.found = false;
          break;
        }
        this.addCustomValue(currentFilter, value, f);
      }
      return filter;
    } else {
      if (filter.filterId === currentFilter.filterId) {
        filter.active = true;
        filter.filterValue = value;
        this.found = true;
      }
      return filter;
    }
  }

  private toggleValue(currentFilter: any, filter = this.filters) {
    if (filter.filterId === currentFilter) {
      if (filter.active) filter.filterValue = null;
      filter.active = !filter.active;
      this.found = true;
    }
    if (filter.subFilters) {
      for (var l of filter.subFilters) {
        if (this.found) {
          this.found = false;
          break;
        }
        this.toggleValue(currentFilter, l);
      }
      return filter;
    }
  }

  private get filters() {
    let filters: any = {};
    this.data.take(1).subscribe(f => filters = f);
    return filters;
  }
}
