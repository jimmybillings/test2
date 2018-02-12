import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Request, RequestMethod, RequestOptions, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiConfig } from '../../shared/services/api.config';
import { Api, ApiOptions, ApiParameters, ApiBody, ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { ApiService } from '../../shared/services/api.service';
import { AppState } from '../../app.store';

@Injectable()
export class FutureApiService extends ApiService {
  constructor(protected http: Http, protected apiConfig: ApiConfig, protected ngrxStore: Store<AppState>) {
    super(http, apiConfig, ngrxStore);
  }

  protected call(method: RequestMethod, api: Api, endpoint: string, options: ApiOptions): Observable<any> {
    options = this.combineDefaultOptionsWith(options);

    this.showLoadingIndicatorDependingOn(options);

    return this.http.request(this.requestFor(method, api, endpoint, options))
      .map(response => { try { return response.json(); } catch (exception) { return response; } })
      .do(() => this.hideLoadingIndicatorDependingOn(options),
      (error: ApiErrorResponse) => this.hideLoadingIndicatorDependingOn(options)
      );
  }
}
