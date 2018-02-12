import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api, ApiParameters } from '../../shared/interfaces/api.interface';
import { Observable } from 'rxjs/Observable';
import { SearchParams, ApiSearchResults, SearchResults } from '../../shared/interfaces/search.interface';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { GalleryViewService } from '../../shared/services/gallery-view.service';
import { UserPreferenceService } from '../../shared/services/user-preference.service';

@Injectable()
export class SearchService {
  constructor(
    private apiService: FutureApiService,
    private currentUser: CurrentUserService,
    private galleryViewService: GalleryViewService,
    private userPreference: UserPreferenceService
  ) { }

  public loadResults(searchParams: SearchParams): Observable<SearchResults> {
    const parameters: ApiParameters = this.format(searchParams);
    const apiPath: string = this.currentUser.loggedIn() ? 'search' : 'search/anonymous';

    return this.apiService.get(
      Api.Assets,
      apiPath,
      { parameters, loadingIndicator: true }
    ).map((results) => this.normalize(results));
  }

  private normalize(results: ApiSearchResults): SearchResults {
    return {
      items: results.items || [],
      pagination: {
        totalCount: results.totalCount,
        pageSize: results.pageSize,
        currentPage: results.currentPage + 1,
        numberOfPages: results.numberOfPages,
        hasNextPage: results.hasNextPage,
        hasPreviousPage: results.hasPreviousPage
      }
    };
  }

  private format(searchParams: SearchParams): ApiParameters {
    let normalized: ApiParameters = {};

    for (let paramKey in searchParams) {
      normalized[paramKey] = searchParams[paramKey].toString(); // not modifying params here, toString() returns a new value
    }

    if (!normalized.q) normalized.q = 'itemType:clip';
    if (normalized.gq) normalized.gq = this.galleryViewService.stringifyPathForSearch(JSON.parse(normalized.gq));
    normalized.i = normalized.i ? (parseFloat(normalized.i) - 1).toString() : '0';
    normalized.viewType = this.userPreference.state.assetView;
    return normalized;
  }
}
