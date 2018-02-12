import { Action } from '@ngrx/store';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';
import { SpeedviewData } from '../../shared/interfaces/asset.interface';

export class ActionFactory {
  public load(asset: EnhancedAsset): Load {
    return new Load(asset);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(speedViewData: SpeedviewData, assetId: number): LoadSuccess {
    return new LoadSuccess(speedViewData, assetId);
  }

  public loadFailure(assetId: number): LoadFailure {
    return new LoadFailure(assetId);
  }
}

export class Load implements Action {
  public static readonly Type = '[SpeedPreview] Load';
  public readonly type = Load.Type;
  constructor(public readonly asset: EnhancedAsset) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[SpeedPreview] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly speedViewData: SpeedviewData, public readonly assetId: number) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[SpeedPreview] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly assetId: number) { }

}

export type Any = Load | LoadSuccess | LoadFailure;
