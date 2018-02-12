import { Action } from '@ngrx/store';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

export class ActionFactory {
  public load(documentId: string): Load {
    return new Load(documentId);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(document: string): LoadSuccess {
    return new LoadSuccess(document);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }
}

export class Load implements Action {
  public static readonly Type = '[Privacy Policy] Load';
  public readonly type = Load.Type;
  constructor(public readonly documentId: string) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Privacy Policy] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly document: string) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Privacy Policy] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export type Any = Load | LoadSuccess | LoadFailure;
