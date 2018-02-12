import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppStore } from '../../app.store';
import { Pojo, SearchAssetLoadParameters } from '../../shared/interfaces/common.interface';

@Injectable()
export class SearchAssetResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(factory => factory.asset.loadSearchAsset(this.convertToLoadParameters(route.params)));

    return this.store.blockUntil(state => !state.asset.loading);
  }

  private convertToLoadParameters(routeParameters: Pojo): SearchAssetLoadParameters {
    return {
      id: routeParameters['id'],
      share_key: routeParameters['share_key'],
      timeEnd: routeParameters['timeEnd'],
      timeStart: routeParameters['timeStart']
    };
  }
}
