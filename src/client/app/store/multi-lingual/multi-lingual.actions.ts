import { Action } from '@ngrx/store';

export class ActionFactory {
  public setLanguage(lang: string): SetLanguage {
    return new SetLanguage(lang);
  }
}

export class InternalActionFactory extends ActionFactory { }

export class SetLanguage implements Action {
  public static readonly Type = '[Multilingual] Set Language';
  public readonly type = SetLanguage.Type;
  constructor(public readonly lang: string) { }
}

export type Any = SetLanguage;
