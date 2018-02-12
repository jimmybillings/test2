import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SearchContext } from '../../shared/services/search-context.service';
import { UserPreferenceService } from '../../shared/services/user-preference.service';
import { FilterService } from '../../shared/services/filter.service';
import { AppStore } from '../../app.store';

@Injectable()
export class SearchResolver {
  constructor(
    private store: AppStore,
    private searchContext: SearchContext,
    private userPreferences: UserPreferenceService,
    private filter: FilterService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.searchContext.create = route.params;
    this.filter.load(this.searchContext.state, this.userPreferences.state.displayFilterCounts).subscribe();
    this.store.dispatch(factory => factory.search.loadResults(this.searchContext.state));
    return this.store.blockUntil(state => !state.search.loading);
  }
}
