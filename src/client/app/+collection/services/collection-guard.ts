import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Capabilities } from '../../shared/services/capabilities.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { AppStore } from '../../app.store';

@Injectable()
export class CollectionGuard implements CanActivate {
  constructor(
    private userCan: Capabilities,
    private currentUser: CurrentUserService,
    private router: Router,
    private store: AppStore) { }

  canActivate() {
    if (this.currentUser.loggedIn() && this.userCan.viewCollections()) {
      return true;
    } else {
      if (this.currentUser.loggedIn() && !this.userCan.viewCollections()) {
        this.store.dispatch(factory => factory.error.handle403Forbidden());
      } else {
        this.store.dispatch(factory => factory.error.handle401Unauthorized());
      }
      return false;
    }
  }

}


