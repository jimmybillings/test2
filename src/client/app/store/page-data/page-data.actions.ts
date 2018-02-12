import { Action } from '@ngrx/store';
import { Pojo } from '../../shared/interfaces/common.interface';

export class ActionFactory {
  public updateTitle(trKey: string, trParams: Pojo): UpdateTitle {
    return new UpdateTitle(trKey, trParams);
  }
}

export class InternalActionFactory extends ActionFactory { }

export class UpdateTitle implements Action {
  public static readonly Type = '[Page Data] Update Title';
  public readonly type = UpdateTitle.Type;
  constructor(public readonly trKey: string, public readonly trParams: Pojo) { }
}

export type Any = UpdateTitle;
