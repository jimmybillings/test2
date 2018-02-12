import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AppStore } from '../../app.store';

@Injectable()
export class PrivacyPolicyGuard implements CanActivate {
  constructor(private store: AppStore) { }

  public canActivate(): boolean {
    if (this.store.snapshot(state => !state.uiConfig.components.footer.config.privacyPolicyId)) {
      this.store.dispatch(factory => factory.router.goToPageNotFound());
      return false;
    }
    return true;
  }
}
