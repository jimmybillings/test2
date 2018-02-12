import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Capabilities } from '../../shared/services/capabilities.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { AppStore } from '../../app.store';

@Injectable()
export class SearchAssetGuard implements CanActivate {
  constructor(
    private userCan: Capabilities,
    private currentUser: CurrentUserService,
    private router: Router,
    private store: AppStore) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.currentUser.loggedIn() && !route.params['share_key']) {
      // Let the api dictate based on site-config whether or
      // not a logged out user can visit the clip details page.
      return true;
    } else if (this.userCan.viewAssetDetails()) {
      // User has permissions.
      return true;
    } else if (route.params['share_key']) {
      // A Mayfly user with a share token.
      return true;
    } else {
      // user is logged in but doesn't have permission
      this.store.dispatch(factory => factory.error.handle403Forbidden());
      return false;
    }
  }
}
