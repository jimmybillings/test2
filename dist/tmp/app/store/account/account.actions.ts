import { SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';
import { User } from '../../shared/interfaces/user.interface';
import { Account } from '../../shared/interfaces/account.interface';
import { Action } from '@ngrx/store';

export class ActionFactory {
  getAccountForQuoteAdmin(accountId: number): GetAccountForQuoteAdmin {
    return new GetAccountForQuoteAdmin(accountId);
  }
}

export class InternalActionFactory extends ActionFactory {
  getAccountForQuoteAdminSuccess(account: SendDetailsBillingAccount): GetAccountForQuoteAdminSuccess {
    return new GetAccountForQuoteAdminSuccess(account);
  }

  getAccountForQuoteAdminOnUserAdd(accountId: number): GetAccountForQuoteAdminOnUserAdd {
    return new GetAccountForQuoteAdminOnUserAdd(accountId);
  }

  getAccountForQuoteAdminOnUserAddSuccess(account: SendDetailsBillingAccount): GetAccountForQuoteAdminOnUserAddSuccess {
    return new GetAccountForQuoteAdminOnUserAddSuccess(account);
  }
}

export class GetAccountForQuoteAdmin implements Action {
  public static readonly Type = '[Account] Get Account For Quote Admin';
  public readonly type = GetAccountForQuoteAdmin.Type;
  constructor(public readonly accountId: number) { }
}

export class GetAccountForQuoteAdminSuccess implements Action {
  public static readonly Type = '[Account] Get Account For Quote Admin Success';
  public readonly type = GetAccountForQuoteAdminSuccess.Type;
  constructor(public readonly account: SendDetailsBillingAccount) { }
}

export class GetAccountForQuoteAdminOnUserAdd implements Action {
  public static readonly Type = '[Account] Get Account For Quote Admin On User Add';
  public readonly type = GetAccountForQuoteAdminOnUserAdd.Type;
  constructor(public readonly accountId: number) { }
}

export class GetAccountForQuoteAdminOnUserAddSuccess implements Action {
  public static readonly Type = '[Account] Get Account For Quote Admin On User Add Success';
  public readonly type = GetAccountForQuoteAdminOnUserAddSuccess.Type;
  constructor(public readonly account: SendDetailsBillingAccount) { }
}

export type Any = GetAccountForQuoteAdmin | GetAccountForQuoteAdminSuccess
  | GetAccountForQuoteAdminOnUserAdd | GetAccountForQuoteAdminOnUserAddSuccess;
