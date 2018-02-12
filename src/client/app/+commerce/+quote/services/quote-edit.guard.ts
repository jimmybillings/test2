import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommerceCapabilities } from '../../services/commerce.capabilities';
import { AppStore } from '../../../app.store';

@Injectable()
export class QuoteEditGuard implements CanActivate {
  constructor(
    private userCan: CommerceCapabilities,
    private store: AppStore) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userCan.administerQuotes()) {
      return true;
    } else {
      this.store.dispatch(factory => factory.error.handle403Forbidden());
      return false;
    }
  }
}
