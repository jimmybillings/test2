import { ActivityOptions } from '../../shared/interfaces/common.interface';
import { Action } from '@ngrx/store';

export class ActionFactory { }

export class InternalActionFactory extends ActionFactory {
  public record(options: ActivityOptions): Record {
    return new Record(options);
  }
}

export class Record implements Action {
  public static readonly Type = '[Activity] Record';
  public readonly type = Record.Type;
  constructor(public readonly options: ActivityOptions) { }
}

export type Any = Record;
