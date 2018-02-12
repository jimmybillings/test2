import { Action } from '@ngrx/store';

export class ActionFactory {
  public setHeaderPosition(pageVerticalOffset: number): SetHeaderPosition {
    return new SetHeaderPosition(pageVerticalOffset);
  }

  public checkIfHeaderCanBeFixed(url: string): CheckIfHeaderCanBeFixed {
    return new CheckIfHeaderCanBeFixed(url);
  }

  public checkIfFiltersAreAvailable(url: string): CheckIfFiltersAreAvailable {
    return new CheckIfFiltersAreAvailable(url);
  }

  public reset(): Reset {
    return new Reset();
  }
}

export class InternalActionFactory extends ActionFactory {
  public disableFix(): DisableFix {
    return new DisableFix();
  }

  public enableFix(): EnableFix {
    return new EnableFix();
  }

  public fix(): Fix {
    return new Fix();
  }

  public unfix(): Unfix {
    return new Unfix();
  }

  public enableFilters(): EnableFilters {
    return new EnableFilters();
  }

  public disableFilters(): DisableFilters {
    return new DisableFilters();
  }
}

export class SetHeaderPosition implements Action {
  public static readonly Type = '[Header Display Options] Set Header Position';
  public readonly type = SetHeaderPosition.Type;
  constructor(public readonly pageVerticalOffset: number) { }
}

export class CheckIfHeaderCanBeFixed implements Action {
  public static readonly Type = '[Header Display Options] Check If Header Can Be Fixed';
  public readonly type = CheckIfHeaderCanBeFixed.Type;
  constructor(public readonly url: string) { }
}

export class CheckIfFiltersAreAvailable implements Action {
  public static readonly Type = '[Header Display Options] Check If Filters Are Available';
  public readonly type = CheckIfFiltersAreAvailable.Type;
  constructor(public readonly url: string) { }
}

export class DisableFix implements Action {
  public static readonly Type = '[Header Display Options] Disable Fix';
  public readonly type = DisableFix.Type;
}

export class EnableFix implements Action {
  public static readonly Type = '[Header Display Options] Enable Fix';
  public readonly type = EnableFix.Type;
}

export class DisableFilters implements Action {
  public static readonly Type = '[Header Display Options] Disable Filters';
  public readonly type = DisableFilters.Type;
}

export class EnableFilters implements Action {
  public static readonly Type = '[Header Display Options] Enable Filters';
  public readonly type = EnableFilters.Type;
}

export class Fix implements Action {
  public static readonly Type = '[Header Display Options] Fix';
  public readonly type = Fix.Type;
}

export class Unfix implements Action {
  public static readonly Type = '[Header Display Options] Unfix';
  public readonly type = Unfix.Type;
}

export class Reset implements Action {
  public static readonly Type = '[Header Display Options] Reset';
  public readonly type = Reset.Type;
}

export type Any = DisableFix | EnableFix | Fix | Unfix | DisableFilters | EnableFilters | Reset;
