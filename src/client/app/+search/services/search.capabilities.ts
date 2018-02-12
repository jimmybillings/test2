import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';


@Injectable()
export class SearchCapabilities {
  constructor(public currentUser: CurrentUserService) { }

  public userHas(permission: string): boolean {
    return this.currentUser.hasPermission(permission);
  }
}
