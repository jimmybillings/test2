import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as CommentActions from './comment.actions';
import { Comment, Comments, CommentFormMode, CommentCounts } from '../../shared/interfaces/comment.interface';
import { CommentService } from './comment.service';
import { AppStore, CommentState } from '../../app.store';

@Injectable()
export class CommentEffects {
  @Effect()
  public getComments: Observable<Action> = this.actions.ofType(CommentActions.Load.Type)
    .switchMap((action: CommentActions.Load) =>
      this.service.getCommentsFor(action.parentObject)
        .map((comments: Comments) => this.store.create(factory => factory.comment.loadSuccess(comments)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public formSubmit: Observable<Action> = this.actions.ofType(CommentActions.FormSubmit.Type)
    .withLatestFrom(this.store.select(state => state.comment))
    .switchMap(([action, state]: [CommentActions.FormSubmit, CommentState]) => {
      const serviceResult: Observable<Comments> = state.formMode === 'ADD' ?
        this.service.addCommentTo(action.parentObject, action.comment) :
        this.service.editComment(action.parentObject, state.commentBeingEdited);

      return serviceResult
        .map((comments: Comments) => this.store.create(factory => factory.comment.formSubmitSuccess(comments)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))));
    });

  @Effect()
  public removeComment: Observable<Action> = this.actions.ofType(CommentActions.Remove.Type)
    .switchMap((action: CommentActions.Remove) =>
      this.service.removeComment(action.parentObject, action.commentId)
        .map((comments: Comments) => this.store.create(factory => factory.comment.removeSuccess(comments)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public showSnackBarOnRemoveSuccess: Observable<Action> = this.actions.ofType(CommentActions.RemoveSuccess.Type)
    .map(() => this.store.create(factory => factory.snackbar.display('COMMENTS.DELETE_SUCCESS_TOAST')));

  @Effect()
  public getCounts: Observable<Action> = this.actions.ofType(CommentActions.GetCounts.Type)
    .switchMap((action: CommentActions.GetCounts) => this.service.getCountsFor(action.parentObject)
      .map((counts: CommentCounts) => this.store.create(factory => factory.comment.getCountsSuccess(counts)))
      .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  constructor(
    private actions: Actions,
    private store: AppStore,
    private service: CommentService
  ) { }
}
