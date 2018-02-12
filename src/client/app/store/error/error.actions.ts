import { Action } from '@ngrx/store';

import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

export class ActionFactory {
  public handle(error: ApiErrorResponse): Handle {
    return new Handle(error);
  }

  public handle401Unauthorized(): Handle401Unauthorized {
    return new Handle401Unauthorized();
  }

  public handle403Forbidden(): Handle403Forbidden {
    return new Handle403Forbidden();
  }

  public handleCustomError(title: string): HandleCustomError {
    return new HandleCustomError(title);
  }
}

export class InternalActionFactory extends ActionFactory { }

export class Handle implements Action {
  public static readonly Type = '[Error] Handle';
  public readonly type = Handle.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class Handle401Unauthorized implements Action {
  public static readonly Type = '[Error] Handle 401 Unauthorized';
  public readonly type = Handle401Unauthorized.Type;
}

export class Handle403Forbidden implements Action {
  public static readonly Type = '[Error] Handle 403 Forbidden';
  public readonly type = Handle403Forbidden.Type;
}

export class HandleCustomError implements Action {
  public static readonly Type = '[Error] Handle Custom Error';
  public readonly type = HandleCustomError.Type;
  constructor(public readonly title: string) { }
}
