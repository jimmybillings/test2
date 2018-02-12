import { Action } from '@ngrx/store';

import { Invoice } from '../../shared/interfaces/commerce.interface';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

export class ActionFactory {
  public load(orderId: number, shareKey?: string): Load {
    return new Load(orderId, shareKey);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(invoice: Invoice): LoadSuccess {
    return new LoadSuccess(invoice);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }
}

export class Load implements Action {
  public static readonly Type = '[Invoice] Load';
  public readonly type = Load.Type;
  constructor(public readonly orderId: number, public readonly shareKey: string) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Invoice] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly invoice: Invoice) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Invoice] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export type Any = Load | LoadSuccess | LoadFailure;
