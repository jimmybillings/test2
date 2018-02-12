import { Action } from '@ngrx/store';

import { AssetLineItem, Cart } from '../../shared/interfaces/commerce.interface';
import { Asset } from '../../shared/interfaces/common.interface';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { Pojo, SelectedPriceAttribute } from '../../shared/interfaces/common.interface';

export class ActionFactory {
  public load(): Load {
    return new Load();
  }

  public editLineItemFromDetails(
    uuid: string,
    markers: SubclipMarkers,
    attributes: SelectedPriceAttribute[]
  ): EditLineItemFromDetails {
    return new EditLineItemFromDetails(uuid, markers, attributes);
  }

  public removeAsset(asset: Asset): RemoveAsset {
    return new RemoveAsset(asset);
  }

  public addNote(note: string, lineItem: AssetLineItem): AddNote {
    return new AddNote(note, lineItem);
  }

  public removeNoteFrom(lineItem: AssetLineItem): RemoveNote {
    return new RemoveNote(lineItem);
  }

  // Move this to internal action factory when cart is fully "effected"
  public loadSuccess(cart: Cart): LoadSuccess {
    return new LoadSuccess(cart);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }

  public editLineItemFromDetailsSuccess(cart: Cart): EditLineItemFromDetailsSuccess {
    return new EditLineItemFromDetailsSuccess(cart);
  }

  public editLineItemFromDetailsFailure(error: ApiErrorResponse): EditLineItemFromDetailsFailure {
    return new EditLineItemFromDetailsFailure(error);
  }

  public removeAssetSuccess(cart: Cart): RemoveAssetSuccess {
    return new RemoveAssetSuccess(cart);
  }

  public removeAssetFailure(error: ApiErrorResponse): RemoveAssetFailure {
    return new RemoveAssetFailure(error);
  }

  public addNoteSuccess(cart: Cart): AddNoteSuccess {
    return new AddNoteSuccess(cart);
  }

  public removeNoteSuccess(cart: Cart): RemoveNoteSuccess {
    return new RemoveNoteSuccess(cart);
  }
}

export class Load implements Action {
  public static readonly Type = '[Cart] Load';
  public readonly type = Load.Type;
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Cart] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly cart: Cart) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Cart] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class EditLineItemFromDetails implements Action {
  public static readonly Type = '[Cart] Edit Line Item From Details';
  public readonly type = EditLineItemFromDetails.Type;
  constructor(
    public readonly uuid: string,
    public readonly markers: SubclipMarkers,
    public readonly attributes: SelectedPriceAttribute[]
  ) { }
}

export class EditLineItemFromDetailsSuccess implements Action {
  public static readonly Type = '[Cart] Edit Line Item From Details Success';
  public readonly type = EditLineItemFromDetailsSuccess.Type;
  constructor(public readonly cart: Cart) { }
}

export class EditLineItemFromDetailsFailure implements Action {
  public static readonly Type = '[Cart] Edit Line Item From Details Failure';
  public readonly type = EditLineItemFromDetailsFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class RemoveAsset implements Action {
  public static readonly Type = '[Cart] Remove Asset';
  public readonly type = RemoveAsset.Type;
  constructor(public readonly asset: Asset) { }
}

export class RemoveAssetSuccess implements Action {
  public static readonly Type = '[Cart] Remove Asset Success';
  public readonly type = RemoveAssetSuccess.Type;
  constructor(public readonly cart: Cart) { }
}

export class RemoveAssetFailure implements Action {
  public static readonly Type = '[Cart] Remove Asset Failure';
  public readonly type = RemoveAssetFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class AddNote implements Action {
  public static readonly Type = '[Cart] Add Note';
  public readonly type = AddNote.Type;
  constructor(public readonly note: string, public readonly lineItem: AssetLineItem) { }
}

export class RemoveNote implements Action {
  public static readonly Type = '[Cart] Remove Note';
  public readonly type = RemoveNote.Type;
  constructor(public readonly lineItem: AssetLineItem) { }
}

export class AddNoteSuccess implements Action {
  public static readonly Type = '[Cart] Add Note Success';
  public readonly type = AddNoteSuccess.Type;
  constructor(public readonly cart: Cart) { }
}

export class RemoveNoteSuccess implements Action {
  public static readonly Type = '[Cart] Remove Note Success';
  public readonly type = RemoveNoteSuccess.Type;
  constructor(public readonly cart: Cart) { }
}

export type Any =
  Load | LoadSuccess | LoadFailure |
  EditLineItemFromDetails | EditLineItemFromDetailsSuccess | EditLineItemFromDetailsFailure |
  RemoveAsset | RemoveAssetSuccess | RemoveAssetFailure | AddNote | AddNoteSuccess | RemoveNote | RemoveNoteSuccess;
