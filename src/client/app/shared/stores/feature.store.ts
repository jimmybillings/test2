import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Feature, Features } from '../interfaces/feature.interface';
import { LegacyAction } from '../interfaces/common.interface';

const initState: Features = {
  disableCartAccess: false,
  disableCollectionAccess: false,
  disableCommerceAgreements: false
};

export function features(state: Features = initState, action: LegacyAction) {
  switch (action.type) {
    case 'FEATURE.SET_STATE':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

@Injectable()
export class FeatureStore {
  constructor(private store: Store<any>) {
    if (localStorage.getItem('siteFeatures')) {
      this.set(JSON.parse(localStorage.getItem('siteFeatures')));
    }
  }

  public isAvailable(feature: Feature): boolean {
    return !this.state[feature];
  }

  public set(data: any): void {
    this.setInLocalStorage(data);
    this.store.dispatch({ type: 'FEATURE.SET_STATE', payload: this.format(data) });
  }

  public get data(): Observable<Features> {
    return this.store.select('features');
  }

  public get state(): Features {
    let s: Features;
    this.data.take(1).subscribe((state: Features) => s = state);
    return s;
  }

  private setInLocalStorage(data: any): void {
    localStorage.setItem('siteFeatures', JSON.stringify(this.format(data)));
  }

  private format(data: any): Features {
    for (let key in data) {
      try {
        data[key] = JSON.parse(data[key]);
      } catch (error) {
        data[key] = data[key];
      }
    }
    return data;
  }
}
