import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as NotifierActions from './notifier.actions';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';
import { NotificationDialogOptions } from '../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';

@Injectable()
export class NotifierEffects {
  @Effect({ dispatch: false })
  public notify: Observable<Action> = this.actions.ofType(NotifierActions.Notify.Type)
    .do((action: NotifierActions.Notify) =>
      this.dialogService.openNotificationDialog(action.options).subscribe(() => action.onClose())
    );

  constructor(private actions: Actions, private dialogService: WzDialogService) { }
}
