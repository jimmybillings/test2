import { Action } from '@ngrx/store';

export class ActionFactory {
  public show(): Show {
    return new Show();
  }

  public hide(): Hide {
    return new Hide();
  }
}

export class InternalActionFactory extends ActionFactory { }

export class Show implements Action {
  public static readonly Type = '[Loading Indicator] Show';
  public readonly type = Show.Type;
}

export class Hide implements Action {
  public static readonly Type = '[Loading Indicator] Hide';
  public readonly type = Hide.Type;
}

export type Any = Show | Hide;
