import { Injectable }             from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private currentUser: CurrentUserService,
    private router: Router) { }

  canActivate() {
    if (!this.currentUser.loggedIn())  {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
