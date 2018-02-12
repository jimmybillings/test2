import * as CommentActions from './comment.actions';
import {
  Comment, Comments, ObjectType, CommentFormMode, CommentCountsApiResponse, CommentCounts
} from '../../shared/interfaces/comment.interface';
import { Pagination } from '../../shared/interfaces/common.interface';
import { Common } from '../../shared/utilities/common.functions';

// I would love to take advantage of our ObjectType type here, but currently can't find a way to do it (R.E. 08/10/2017)
// for the time being, manually add to this interface when adding comments to cart, quote, etc.
// for reference: https://github.com/Microsoft/TypeScript/issues/2491 and https://github.com/Microsoft/TypeScript/pull/12114
export interface State {
  readonly formSubmitLabel: string;
  readonly commentBeingEdited: Comment;
  readonly activeObjectType: ObjectType;
  readonly formMode: CommentFormMode;
  readonly cart?: Comments;
  readonly collection?: Comments;
  readonly quote?: Comments;
  readonly order?: Comments;
  readonly lineItem?: Comments;
  readonly counts?: CommentCounts;
}

const defaultCommentPagination: Pagination = { pageSize: 100, currentPage: 1, hasNextPage: false, hasPreviousPage: false };

export const initialState: State = {
  formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
  commentBeingEdited: null,
  activeObjectType: null,
  formMode: 'ADD',
  cart: { items: [], pagination: defaultCommentPagination },
  collection: { items: [], pagination: defaultCommentPagination },
  quote: { items: [], pagination: defaultCommentPagination },
  lineItem: { items: [], pagination: defaultCommentPagination },
  counts: {}
};

export function reducer(state: State = initialState, action: CommentActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case CommentActions.ChangeFormModeToEdit.Type: {
      return {
        ...Common.clone(state),
        formMode: 'EDIT',
        formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL',
        commentBeingEdited: action.commentBeingEdited
      };
    }

    case CommentActions.ChangeFormModeToAdd.Type: {
      return {
        ...Common.clone(state),
        formMode: 'ADD',
        formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
        commentBeingEdited: null
      };
    }

    case CommentActions.Load.Type:
    case CommentActions.Remove.Type: {
      const activeObjectType: ObjectType = action.parentObject.nestedObjectId
        ? 'lineItem'
        : action.parentObject.objectType;
      return {
        ...Common.clone(state),
        activeObjectType: activeObjectType
      };
    }

    case CommentActions.FormSubmitSuccess.Type:
    case CommentActions.RemoveSuccess.Type:
    case CommentActions.LoadSuccess.Type: {
      const stateClone: State = Common.clone(state);
      return {
        ...stateClone,
        [stateClone.activeObjectType]: {
          ...action.comments
        },
        formMode: 'ADD',
        formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
        commentBeingEdited: null
      };
    }

    case CommentActions.GetCountsSuccess.Type: {
      return {
        ...Common.clone(state),
        counts: action.counts
      };
    }

    case CommentActions.FormSubmit.Type: {
      const stateClone: State = Common.clone(state);

      return {
        ...stateClone,
        commentBeingEdited: {
          ...stateClone.commentBeingEdited, ...action.comment
        }
      };
    }

    default: {
      return state;
    }
  }
}
