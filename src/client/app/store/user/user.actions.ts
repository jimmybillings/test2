import { SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';
import { User } from '../../shared/interfaces/user.interface';
import { Action } from '@ngrx/store';

export class ActionFactory {
  getAllUsersByAccountId(accountId: number): GetAllUsersByAccountId {
    return new GetAllUsersByAccountId(accountId);
  }
}

export class InternalActionFactory extends ActionFactory {
  getAllUsersByAccountIdSuccess(users: SendDetailsBillingAccount[]): GetAllUsersByAccountIdSuccess {
    return new GetAllUsersByAccountIdSuccess(users);
  }
}

export class GetAllUsersByAccountId implements Action {
  public static readonly Type = '[User] Get All Users By Account Id';
  public readonly type = GetAllUsersByAccountId.Type;
  constructor(public readonly accountId: number) { }
}

export class GetAllUsersByAccountIdSuccess implements Action {
  public static readonly Type = '[User] Get All Users By Account Id Success';
  public readonly type = GetAllUsersByAccountIdSuccess.Type;
  constructor(public readonly users: SendDetailsBillingAccount[]) { }
}

export type Any = GetAllUsersByAccountId | GetAllUsersByAccountIdSuccess;
