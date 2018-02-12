import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as DialogActions from './dialog.actions';
import { AppStore } from '../../app.store';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';

@Injectable()
export class DialogEffects {
  @Effect()
  public showConfirmation: Observable<Action> = this.actions.ofType(DialogActions.ShowConfirmation.Type)
    .switchMap((action: DialogActions.ShowConfirmation) =>
      this.service.openConfirmationDialog(action.confirmationDialogOptions, action.onAccept, action.onDecline)
        .map(() => this.store.create(factory => factory.dialog.showConfirmationSuccess()))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: WzDialogService) { }
}
