import { FeeConfig } from '../../shared/interfaces/commerce.interface';
import { Action } from '@ngrx/store';

export class ActionFactory {
  public loadFeeConfig(): LoadFeeConfig {
    return new LoadFeeConfig();
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadFeeConfigSuccess(feeConfig: FeeConfig): LoadFeeConfigSuccess {
    return new LoadFeeConfigSuccess(feeConfig);
  }
}

export class LoadFeeConfig implements Action {
  public static readonly Type = '[Fee Config] Load Fee Config';
  public readonly type = LoadFeeConfig.Type;
}

export class LoadFeeConfigSuccess implements Action {
  public static readonly Type = '[Fee Config] Load Fee Config Success';
  public readonly type = LoadFeeConfigSuccess.Type;
  constructor(public readonly feeConfig: FeeConfig) { }
}

export type Any = LoadFeeConfig | LoadFeeConfigSuccess;
