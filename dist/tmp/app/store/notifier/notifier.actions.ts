import { Action } from '@ngrx/store';

import { NotificationDialogOptions } from '../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';

export const defaultOnCloseFunction: Function = () => { };

export class ActionFactory {
  public notify(options: NotificationDialogOptions, onClose: Function = defaultOnCloseFunction): Notify {
    return new Notify({ prompt: 'NOTIFICATION.CLOSE', ...options }, onClose);
  }
}

export class InternalActionFactory extends ActionFactory { }

export class Notify implements Action {
  public static readonly Type = '[Notifier] Notify';
  public readonly type = Notify.Type;
  constructor(readonly options: NotificationDialogOptions, readonly onClose: Function) { }
}
