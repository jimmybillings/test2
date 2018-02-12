import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Request, RequestMethod, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiConfig } from './api.config';
import { Api, ApiOptions, ApiParameters, ApiBody, ApiErrorResponse } from '../interfaces/api.interface';

// Work with these directly so that we don't need AppStore.  Prevents circular dependencies in LegacyServices.
import { AppState } from '../../app.store';
import * as ErrorActions from '../../store/error/error.actions';
import * as LoadingIndicatorActions from '../../store/loading-indicator/loading-indicator.actions';

@Injectable()
export class ApiService {
  // NOTE that all "private" properties are temporarily "protected" to allow FutureApiService to override/access them as needed.
  constructor(protected http: Http, protected apiConfig: ApiConfig, protected ngrxStore: Store<AppState>) { }

  public get(api: Api, endpoint: string, options: ApiOptions = {}): Observable<any> {
    return this.call(RequestMethod.Get, api, endpoint, options);
  }

  public post(api: Api, endpoint: string, options: ApiOptions = {}): Observable<any> {
    return this.call(RequestMethod.Post, api, endpoint, options);
  }

  public put(api: Api, endpoint: string, options: ApiOptions = {}): Observable<any> {
    return this.call(RequestMethod.Put, api, endpoint, options);
  }

  public delete(api: Api, endpoint: string, options: ApiOptions = {}): Observable<any> {
    return this.call(RequestMethod.Delete, api, endpoint, options);
  }

  //// END OF PUBLIC INTERFACE
  // NOTE that all "private" methods are temporarily "protected" to allow FutureApiService to override/access as necessary.
  protected call(method: RequestMethod, api: Api, endpoint: string, options: ApiOptions): Observable<any> {
    options = this.combineDefaultOptionsWith(options);

    this.showLoadingIndicatorDependingOn(options);

    return this.http.request(this.requestFor(method, api, endpoint, options))
      .map(response => { try { return response.json(); } catch (exception) { return response; } })
      .do(() => {
        this.hideLoadingIndicatorDependingOn(options);
      }, (error: ApiErrorResponse) => {
        this.hideLoadingIndicatorDependingOn(options);

        try { return error.json(); } catch (exception) { this.ngrxStore.dispatch(new ErrorActions.Handle(error)); }
        return error;
      });
  }

  protected combineDefaultOptionsWith(options: ApiOptions): ApiOptions {
    return { parameters: {}, body: {}, loadingIndicator: false, overridingToken: '', ...options };
  }

  protected showLoadingIndicatorDependingOn(options: ApiOptions): void {
    if (options.loadingIndicator === 'onBeforeRequest' || options.loadingIndicator === true) {
      this.ngrxStore.dispatch(new LoadingIndicatorActions.Show());
    }
  }

  protected hideLoadingIndicatorDependingOn(options: ApiOptions): void {
    if (options.loadingIndicator === 'offAfterResponse' || options.loadingIndicator === true) {
      this.ngrxStore.dispatch(new LoadingIndicatorActions.Hide());
    }
  }

  protected requestFor(method: RequestMethod, api: Api, endpoint: string, options: ApiOptions): Request {
    return new Request(
      new RequestOptions({
        method: method,
        url: this.urlFor(api, endpoint),
        body: this.bodyJsonFrom(options.body),
        headers: this.apiConfig.headers(options.overridingToken, options.headerType),
        search: this.searchParametersFrom(options.parameters)
      })
    );
  }

  protected urlFor(api: Api, endpoint: string) {
    return `${this.apiConfig.baseUrl}${this.pathSegmentFor(api)}-api/${this.versionFor(api)}/${endpoint}`;
  }

  protected pathSegmentFor(api: Api): string {
    return (Api[api] || '?').toLowerCase();
  }

  protected versionFor(api: Api): string {
    switch (api) {
      case Api.Identities: return 'v1';
      case Api.Assets: return 'v1';
      case Api.Orders: return 'v1';
      default: return 'v?';
    };
  }

  protected bodyJsonFrom(bodyObject: ApiBody): string {
    return Array.isArray(bodyObject) ?
      JSON.stringify(bodyObject) :
      JSON.stringify({ ...bodyObject, siteName: this.apiConfig.portal });
  }

  protected searchParametersFrom(parameters: ApiParameters): URLSearchParams {
    const search: URLSearchParams = new URLSearchParams('', new CustomQueryEncoder());

    if (parameters['siteName']) console.error('Cannot set siteName externally.');

    Object.keys(parameters)
      .filter(parameter => (parameter !== 'siteName'))
      .forEach(parameter => search.set(parameter, parameters[parameter]));

    search.set('siteName', this.apiConfig.portal);

    return search;
  }
}

/*
 * CustomQueryEncoder
 * Fix plus sign (+) not encoding, so sent as blank space
 * See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
 */
export class CustomQueryEncoder extends QueryEncoder {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
  }
}
