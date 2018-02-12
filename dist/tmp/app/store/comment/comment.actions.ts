import { Action } from '@ngrx/store';

import {
  Comment, Comments, ObjectType, CommentFormMode, CommentParentObject, CommentCounts
} from '../../shared/interfaces/comment.interface';

export class ActionFactory {
  public load(parentObject: CommentParentObject): Load {
    return new Load(parentObject);
  }

  public formSubmit(parentObject: CommentParentObject, comment: Comment): FormSubmit {
    return new FormSubmit(parentObject, comment);
  }

  public remove(parentObject: CommentParentObject, commentId: number): Remove {
    return new Remove(parentObject, commentId);
  }

  public changeFormModeToAdd(): ChangeFormModeToAdd {
    return new ChangeFormModeToAdd();
  }

  public changeFormModeToEdit(commentBeingEdited: Comment): ChangeFormModeToEdit {
    return new ChangeFormModeToEdit(commentBeingEdited);
  }

  public getCounts(parentObject: CommentParentObject): GetCounts {
    return new GetCounts(parentObject);
  }
}

export class InternalActionFactory {
  public loadSuccess(comments: Comments): LoadSuccess {
    return new LoadSuccess(comments);
  }

  public formSubmitSuccess(comments: Comments): FormSubmitSuccess {
    return new FormSubmitSuccess(comments);
  }

  public removeSuccess(comments: Comments): RemoveSuccess {
    return new RemoveSuccess(comments);
  }

  public getCountsSuccess(counts: CommentCounts): GetCountsSuccess {
    return new GetCountsSuccess(counts);
  }
}

export class Load implements Action {
  public static readonly Type = '[Comment] Load';
  public readonly type = Load.Type;
  constructor(public readonly parentObject: CommentParentObject) { }
}

export class FormSubmit implements Action {
  public static readonly Type = '[Comment] Form Submit';
  public readonly type = FormSubmit.Type;
  constructor(public readonly parentObject: CommentParentObject, public readonly comment: Comment) { }
}

export class Remove implements Action {
  public static readonly Type = '[Comment] Remove';
  public readonly type = Remove.Type;
  constructor(public readonly parentObject: CommentParentObject, public readonly commentId: number) { }
}

export class ChangeFormModeToAdd implements Action {
  public static readonly Type = '[Comment] Change Form Mode To ADD';
  public readonly type = ChangeFormModeToAdd.Type;
}

export class ChangeFormModeToEdit implements Action {
  public static readonly Type = '[Comment] Change Form Mode To EDIT';
  public readonly type = ChangeFormModeToEdit.Type;
  constructor(public readonly commentBeingEdited: Comment) { }
}

export class GetCounts {
  public static readonly Type = '[Comment] Get Counts';
  public readonly type = GetCounts.Type;
  constructor(public readonly parentObject: CommentParentObject) { }
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Comment] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly comments: Comments) { }
}

export class FormSubmitSuccess implements Action {
  public static readonly Type = '[Comment] Form Submit Success';
  public readonly type = FormSubmitSuccess.Type;
  constructor(public readonly comments: Comments) { }
}

export class RemoveSuccess implements Action {
  public static readonly Type = '[Comment] Remove Success';
  public readonly type = RemoveSuccess.Type;
  constructor(public readonly comments: Comments) { }
}

export class GetCountsSuccess {
  public static readonly Type = '[Comment] Get Counts Success';
  public readonly type = GetCountsSuccess.Type;
  constructor(public readonly counts: CommentCounts) { }
}

export type Any = Load | FormSubmit | ChangeFormModeToAdd | ChangeFormModeToEdit | GetCounts |
  LoadSuccess | FormSubmitSuccess | Remove | RemoveSuccess | GetCountsSuccess;
