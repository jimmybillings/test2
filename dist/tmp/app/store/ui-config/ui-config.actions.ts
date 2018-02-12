import { Action } from '@ngrx/store';
import { State as UiConfig } from './ui-config.state';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

export class ActionFactory {
  public initialize(siteName: string): Initialize {
    return new Initialize(siteName);
  }

  public load(): Load {
    return new Load();
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(config: UiConfig): LoadSuccess {
    return new LoadSuccess(config);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }

  public initializeSuccess(config: UiConfig): InitializeSuccess {
    return new InitializeSuccess(config);
  }

  public initializeFailure(error: ApiErrorResponse): InitializeFailure {
    return new InitializeFailure(error);
  }
}

export class Load implements Action {
  public static readonly Type = '[Ui Config] Load';
  public readonly type = Load.Type;
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Ui Config] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly config: UiConfig) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Ui Config] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class Initialize implements Action {
  public static readonly Type = '[Ui Config] Initialize';
  public readonly type = Initialize.Type;
  constructor(public readonly siteName: string) { }
}

export class InitializeSuccess implements Action {
  public static readonly Type = '[Ui Config] Initialize Success';
  public readonly type = InitializeSuccess.Type;
  constructor(public readonly config: UiConfig) { }
}

export class InitializeFailure implements Action {
  public static readonly Type = '[Ui Config] Initialize Failure';
  public readonly type = InitializeFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export type Any = Load | LoadSuccess | LoadFailure | Initialize | InitializeSuccess | InitializeFailure;
