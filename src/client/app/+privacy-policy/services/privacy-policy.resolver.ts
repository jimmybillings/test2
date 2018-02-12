import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { AppStore } from '../../app.store';

@Injectable()
export class PrivacyPolicyResolver implements Resolve<boolean> {
  constructor(private store: AppStore) { }

  public resolve(): Observable<boolean> {
    this.store.dispatch(factory => factory.privacyPolicy.load(
      this.store.snapshot(state => state.uiConfig.components.footer.config.privacyPolicyId.value)
    ));

    return this.store.blockUntil(state => state.privacyPolicy.document !== null);
  }
}
