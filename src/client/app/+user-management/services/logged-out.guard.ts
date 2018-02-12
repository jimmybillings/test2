import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { AppStore } from '../../app.store';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(
    private currentUser: CurrentUserService,
    private store: AppStore) { }

  canActivate() {
    if (this.currentUser.loggedIn()) {
      return true;
    } else {
      this.store.dispatch(factory => factory.error.handle401Unauthorized());
      return false;
    }
  }

}


