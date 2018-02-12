import { User } from '../../shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { FutureUserService } from './user.service';
import * as UserActions from './user.actions';
import { SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class UserEffects {

  @Effect()
  public getAllUsersByAccountId: Observable<Action> = this.actions
    .ofType(UserActions.GetAllUsersByAccountId.Type)
    .switchMap((action: UserActions.GetAllUsersByAccountId) =>
      this.service.getUsersByAccountId(action.accountId, 'offAfterResponse')
        .map((users: User[]) => {
          return (users || [])
            .map(user => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              emailAddress: user.emailAddress
            }));
        })
        .map((invoiceContactUsers: SendDetailsBillingAccount[]) =>
          this.store.create(factory => factory.user.getAllUsersByAccountIdSuccess(invoiceContactUsers))
        ).catch(error =>
          Observable.of(this.store.create(factory =>
            factory.error.handle(error)
          ))
        )
    );

  constructor(private actions: Actions, private store: AppStore, private service: FutureUserService) { }
}
