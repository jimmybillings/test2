import { Action } from '@ngrx/store';

import { ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { PriceAttribute } from '../../shared/interfaces/commerce.interface';
import { Pojo, SelectedPriceAttribute } from '../../shared/interfaces/common.interface';
import { DefaultComponentOptions } from '../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';

export class ActionFactory {
  public resetPricing(): ResetPricing {
    return new ResetPricing();
  }

  public setPriceForDetails(price: number): SetPriceForDetails {
    return new SetPriceForDetails(price);
  }

  public setPriceForDialog(price: number): SetPriceForDialog {
    return new SetPriceForDialog(price);
  }

  public setAppliedAttributes(appliedAttributes: SelectedPriceAttribute[]): SetAppliedAttributes {
    return new SetAppliedAttributes(appliedAttributes);
  }

  public initializePricing(rightsReproduction: string, dialogOptions: DefaultComponentOptions): InitializePricing {
    return new InitializePricing(rightsReproduction, dialogOptions);
  }

  public calculatePrice(
    selectedAttributes: Pojo,
    assetId: number,
    subclipMarkers: SubclipMarkersInterface.SubclipMarkers
  ): CalculatePrice {
    return new CalculatePrice(selectedAttributes, assetId, subclipMarkers);
  }
}

export class InternalActionFactory extends ActionFactory {
  public getAttributes(
    rightsReproduction: string,
    dialogOptions: DefaultComponentOptions
  ): GetAttributes {
    return new GetAttributes(rightsReproduction, dialogOptions);
  }

  public openDialog(dialogOptions: DefaultComponentOptions): OpenDialog {
    return new OpenDialog(dialogOptions);
  }

  public getAttributesSuccess(
    attributes: PriceAttribute[],
    rightsReproduction: string,
    dialogOptions: DefaultComponentOptions
  ): GetAttributesSuccess {
    return new GetAttributesSuccess(attributes, rightsReproduction, dialogOptions);
  }

  public getAttributesFailure(error: ApiErrorResponse): GetAttributesFailure {
    return new GetAttributesFailure(error);
  }

  public calculatePriceSuccess(price: number): CalculatePriceSuccess {
    return new CalculatePriceSuccess(price);
  }

  public calculatePriceFailure(error: ApiErrorResponse): CalculatePriceFailure {
    return new CalculatePriceFailure(error);
  }
}

export class GetAttributes implements Action {
  public static readonly Type = '[Pricing] Get Attributes';
  public readonly type = GetAttributes.Type;
  constructor(public readonly rightsReproduction: string, public readonly dialogOptions: DefaultComponentOptions) { }
}

export class GetAttributesSuccess implements Action {
  public static readonly Type = '[Pricing] Get Attributes Success';
  public readonly type = GetAttributesSuccess.Type;
  constructor(
    public readonly attributes: PriceAttribute[],
    public readonly rightsReproduction: string,
    public readonly dialogOptions: DefaultComponentOptions
  ) { }
}

export class GetAttributesFailure implements Action {
  public static readonly Type = '[Pricing] Get Attributes Failure';
  public readonly type = GetAttributesFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}


export class ResetPricing implements Action {
  public static readonly Type = '[Pricing] Reset Pricing';
  public readonly type = ResetPricing.Type;
}

export class SetPriceForDetails implements Action {
  public static readonly Type = '[Pricing] Set Price For Details';
  public readonly type = SetPriceForDetails.Type;
  constructor(public readonly price: number) { }
}

export class SetPriceForDialog implements Action {
  public static readonly Type = '[Pricing] Set Price For Dialog';
  public readonly type = SetPriceForDialog.Type;
  constructor(public readonly price: number) { }
}

export class SetAppliedAttributes implements Action {
  public static readonly Type = '[Pricing] Set Applied Attributes';
  public readonly type = SetAppliedAttributes.Type;
  constructor(public readonly appliedAttributes: SelectedPriceAttribute[]) { }
}

export class CalculatePrice implements Action {
  public static readonly Type = '[Pricing] Calculate Price';
  public readonly type = CalculatePrice.Type;
  constructor(
    public readonly selectedAttributes: Pojo,
    public readonly assetId: number,
    public readonly subclipMarkers: SubclipMarkersInterface.SubclipMarkers
  ) { }
}

export class CalculatePriceSuccess implements Action {
  public static readonly Type = '[Pricing] Calculate Price Success';
  public readonly type = CalculatePriceSuccess.Type;
  constructor(public readonly price: number) { }
}

export class CalculatePriceFailure implements Action {
  public static readonly Type = '[Pricing] Calculate Price Failure';
  public readonly type = CalculatePriceFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class InitializePricing implements Action {
  public static readonly Type = '[Pricing] Initialize Pricing';
  public readonly type = InitializePricing.Type;
  constructor(public readonly rightsReproduction: string, public readonly dialogOptions: DefaultComponentOptions) { }
}

export class OpenDialog implements Action {
  public static readonly Type = '[Pricing] Open Dialog';
  public readonly type = OpenDialog.Type;
  constructor(public readonly dialogOptions: DefaultComponentOptions) { }
}

export type Any = GetAttributes | GetAttributesSuccess | GetAttributesFailure | ResetPricing | SetPriceForDetails | OpenDialog |
  SetPriceForDialog | SetAppliedAttributes | CalculatePrice | CalculatePriceSuccess | CalculatePriceFailure | InitializePricing;
