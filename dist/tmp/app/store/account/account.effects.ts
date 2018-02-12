import { SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Account } from '../../shared/interfaces/account.interface';
import { AppStore } from '../../app.store';
import { AccountService } from './account.service';
import * as AccountActions from './account.actions';

@Injectable()
export class AccountEffects {

  @Effect()
  public getAccountForQuoteAdmin: Observable<Action> = this.actions
    .ofType(AccountActions.GetAccountForQuoteAdmin.Type, AccountActions.GetAccountForQuoteAdminOnUserAdd.Type)
    .switchMap((action: AccountActions.GetAccountForQuoteAdmin | AccountActions.GetAccountForQuoteAdminOnUserAdd) =>
      this.service.getAccount(action.accountId, 'onBeforeRequest')
        .map((account: Account) => (
          {
            id: account.id,
            name: account.name,
            salesOwner: account.salesOwner || null,
            paymentTermsDays: account.paymentTermsDays || null,
            purchaseOnCredit: account.purchaseOnCredit || null,
            creditExemption: account.creditExemption || null,
            licensingVertical: account.licensingVertical || null,
            invoiceContactId: account.invoiceContactId
          }
        ))
        .map((billingAccount: SendDetailsBillingAccount) => {
          return this.store.create(factory =>
            (action.type === AccountActions.GetAccountForQuoteAdminOnUserAdd.Type) ?
              factory.account.getAccountForQuoteAdminOnUserAddSuccess(billingAccount) :
              factory.account.getAccountForQuoteAdminSuccess(billingAccount));
        }).catch(error =>
          Observable.of(this.store.create(factory =>
            factory.error.handle(error)
          ))
        )

    );

  @Effect()
  public getAccountForQuoteAdminSuccess: Observable<Action> = this.actions
    .ofType(AccountActions.GetAccountForQuoteAdminSuccess.Type, AccountActions.GetAccountForQuoteAdminOnUserAddSuccess.Type)
    .map((action: AccountActions.GetAccountForQuoteAdminSuccess | AccountActions.GetAccountForQuoteAdminOnUserAddSuccess) =>
      this.store.create(factory => factory.user.getAllUsersByAccountId(action.account.id))
    );

  constructor(private actions: Actions, private store: AppStore, private service: AccountService) { }
}
