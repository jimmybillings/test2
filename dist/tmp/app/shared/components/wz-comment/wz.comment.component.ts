import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../../../app.store';
import { FormFields } from '../../interfaces/forms.interface';
import {
  Comments,
  Comment,
  ObjectType,
  CommentParentObject,
  CommentFormMode,
  CommentAccess
} from '../../interfaces/comment.interface';
import { WzFormComponent } from '../../modules/wz-form/wz.form.component';
import { CurrentUserService } from '../../services/current-user.service';
import { User } from '../../interfaces/user.interface';
import { Common } from '../../utilities/common.functions';

@Component({
  moduleId: module.id,
  selector: 'wz-comment',
  templateUrl: 'wz.comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WzCommentComponent {
  @Input()
  set parentObject(parentObject: CommentParentObject) {
    this._parentObject = parentObject;
    this.initializeData();
  }
  @Input() formFields: Array<FormFields>;
  @Input() userCanAddComments: boolean = true;
  @Output() toggleCommentsVisibility: EventEmitter<null> = new EventEmitter();
  @ViewChild(WzFormComponent) wzForm: WzFormComponent;
  private currentUserId: number;
  private _parentObject: CommentParentObject;
  constructor(private store: AppStore, private currentUserService: CurrentUserService) {
    this.currentUserService.data.take(1).subscribe((user: User) => this.currentUserId = user.id);
  }

  public get commentsExist(): Observable<boolean> {
    return this.comments.map(comments => comments.items.length > 0);
  }

  public initials(userName: string): string {
    let [firstName, lastName] = userName.split(' ');
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  }

  public get formSubmitLabel(): Observable<string> {
    return this.store.select(factory => factory.comment.formSubmitLabel);
  }

  public onFormSubmit(comment: Comment): void {
    this.store.dispatch(factory => factory.comment.formSubmit(this._parentObject, comment));
    this.resetForm();
  }

  public onEditCommentButtonClick(comment: Comment): void {
    this.store.dispatch(factory => factory.comment.changeFormModeToEdit(comment));
    let newFormFields: Array<FormFields> = this.formFields.map((field: FormFields) => {
      field.value = comment[field.name];
      return field;
    });
    this.wzForm.mergeNewValues(newFormFields);
  }

  public onFormCancel($event: any): void {
    $event.preventDefault();
    this.store.dispatch(factory => factory.comment.changeFormModeToAdd());
    this.resetForm();
  }

  public onDeleteCommentButtonClick(comment: Comment): void {
    this.store.dispatch(factory => factory.dialog.showConfirmation(
      {
        title: 'COMMENTS.DELETE_CONFIRMATION.TITLE',
        message: 'COMMENTS.DELETE_CONFIRMATION.MESSAGE',
        accept: 'COMMENTS.DELETE_CONFIRMATION.ACCEPT',
        decline: 'COMMENTS.DELETE_CONFIRMATION.DECLINE'
      },
      () => this.store.dispatch(factory => factory.comment.remove(this._parentObject, comment.id))
    ));
  }

  public closeComments(): void {
    this.toggleCommentsVisibility.emit();
  }

  public get comments(): Observable<Comments> {
    const activeObjectType: ObjectType = this._parentObject.nestedObjectId ?
      'lineItem' : this._parentObject.objectType;
    return this.store.select(state => state.comment[activeObjectType]);
  }

  public isCommentOwner(commentOwnerId: number): boolean {
    return commentOwnerId === this.currentUserId;
  }

  public pluralize(commentAccess: CommentAccess): string {
    return commentAccess + 's';
  }

  private resetForm() {
    const accessStateFieldValue: string = this.wzForm.getValueForField('access');
    this.wzForm.resetForm();
    this.wzForm.setValueForField('access', accessStateFieldValue);
  }

  private initializeData(): void {
    this.store.dispatch(factory => factory.comment.load(this._parentObject));
  }
}
