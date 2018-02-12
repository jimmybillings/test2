import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../app.store';
import * as ErrorActions from './error.actions';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { NotificationDialogOptions } from '../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Injectable()
export class ErrorEffects {
  @Effect()
  public handle: Observable<Action> = this.actions
    .filter((action: Action) => this.canHandleErrorIn(action))
    .mergeMap((action: Action) => Observable.from(this.nextActionsFor(action)));

  @Effect()
  public handle401Unauthorized: Observable<Action> = this.actions.ofType(ErrorActions.Handle401Unauthorized.Type)
    .filter(() => !this.awaitingPreviousNotificationDismissal)
    .mergeMap((action: ErrorActions.Handle401Unauthorized) => Observable.from(this.unauthorized()));

  @Effect()
  public handle403Forbidden: Observable<Action> = this.actions.ofType(ErrorActions.Handle403Forbidden.Type)
    .filter(() => !this.awaitingPreviousNotificationDismissal)
    .mergeMap((action: ErrorActions.Handle403Forbidden) => Observable.from(this.forbidden()));

  @Effect()
  public handleCustom: Observable<Action> = this.actions.ofType(ErrorActions.HandleCustomError.Type)
    .filter(() => !this.awaitingPreviousNotificationDismissal)
    .mergeMap((action: ErrorActions.HandleCustomError) => Observable.from(this.customError(action.title)));

  private awaitingPreviousNotificationDismissal: boolean = false;

  private nextActionCreators: any = {
    400: this.badRequest,
    401: this.unauthorized,
    403: this.forbidden,
    404: this.notFound,
    412: this.preConditionFailed,
    419: this.sessionExpired,
    451: this.registrationDisallowed,
    500: this.serverError
  };

  constructor(
    private actions: Actions,
    private store: AppStore,
    private currentUserService: CurrentUserService,
    private location: Location
  ) { }

  private canHandleErrorIn(action: Action): boolean {
    if (this.awaitingPreviousNotificationDismissal || !action) return false;

    const error: any = (action as any).error;
    if (!error) return false;

    const status: number = error.status;
    if (!status) return false;

    return isNaN(status) || this.canHandle(status);
  }

  private canHandle(status: number): boolean {
    return Object.keys(this.nextActionCreators).some(supportedStatus => status === parseInt(supportedStatus));
  }

  private nextActionsFor(action: Action): Action[] {
    const error: any = (action as any).error;
    const status: number = parseInt(error.status);

    return isNaN(status) ? this.customError(error.status) : this.nextActionCreators[status].call(this);
  }

  private badRequest(): Action[] {
    return [
      this.createBadRequestAction()
    ];
  }

  private serverError(): Action[] {
    return [
      this.createServerErrorAction()
    ];
  }

  private unauthorized(): Action[] {
    this.currentUserService.destroy();  // TODO: When AppStore has currentUser, this will be an action in the returned array.

    const actionsArray = [this.createGoToLoginAction()];
    return this.location.path().split(';')[0] === '/user/login'
      ? actionsArray.concat(this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.INVALID_CREDENTIALS'))
      : actionsArray;
  }

  private forbidden(): Action[] {
    return [
      this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.NEED_PERMISSION')
    ];
  }

  private notFound(): Action[] {
    return [
      this.store.create(factory => factory.router.goToPageNotFound())
    ];
  }

  private sessionExpired(): Action[] {
    this.currentUserService.destroy();  // TODO: When AppStore has currentUser, this will be an action in the returned array.

    return [
      this.createGoToLoginAction(),
      this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.EXPIRED_SESSION')
    ];
  }

  private preConditionFailed(): Action[] {
    return [
      this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.PRECONDITION_FAIL')
    ];
  }

  private registrationDisallowed(): Action[] {
    return [
      this.createNotifierActionWith('REGISTER.DISALLOWED.TITLE', 'REGISTER.DISALLOWED.MESSAGE', 'REGISTER.DISALLOWED.PROMPT')
    ];
  }

  private customError(error: number | string): Action[] {
    return [
      this.createNotifierActionWith(String(error))
    ];
  }

  private createGoToLoginAction(): Action {
    return this.store.create(factory => factory.router.goToLoginWithRedirect());
  }

  private createNotifierActionWith(title: string, message?: string, prompt?: string): Action {
    this.awaitingPreviousNotificationDismissal = true;  // NOTE: Side effect purposely added in favor of DRYness.

    let options: NotificationDialogOptions = { title };
    if (message) options = { ...options, message };
    if (prompt) options = { ...options, prompt };

    return this.store.create(
      factory => factory.notifier.notify(options, () => this.awaitingPreviousNotificationDismissal = false)
    );
  }

  private createBadRequestAction(): Action {
    return this.store.create(factory => factory.router.goToBadRequest());
  }

  private createServerErrorAction(): Action {
    return this.store.create(factory => factory.router.goToServerError());
  }

}
