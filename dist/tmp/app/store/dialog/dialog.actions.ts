import { Action } from '@ngrx/store';

import { ConfirmationDialogOptions, DialogNoResultCallback } from '../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';

export class ActionFactory {
  public showConfirmation(
    confirmationDialogOptions: ConfirmationDialogOptions,
    onAccept: DialogNoResultCallback,
    onDecline: DialogNoResultCallback = () => { }
  ): ShowConfirmation {
    return new ShowConfirmation(confirmationDialogOptions, onAccept, onDecline);
  }
}

export class InternalActionFactory extends ActionFactory {
  public showConfirmationSuccess(): ShowConfirmationSuccess {
    return new ShowConfirmationSuccess();
  }
}

export class ShowConfirmation implements Action {
  public static readonly Type = '[Dialog] Show Confirmation';
  public readonly type = ShowConfirmation.Type;
  constructor(
    public readonly confirmationDialogOptions: ConfirmationDialogOptions,
    public readonly onAccept: DialogNoResultCallback,
    public readonly onDecline: DialogNoResultCallback
  ) { }
}

export class ShowConfirmationSuccess implements Action {
  public static readonly Type = '[Dialog] Show Confirmation Success';
  public readonly type = ShowConfirmationSuccess.Type;
}

export type Any = ShowConfirmation | ShowConfirmationSuccess;
