import * as CommentState from './comment.state';
import * as CommentActions from './comment.actions';
import { Comment } from '../../shared/interfaces/comment.interface';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';
import { Common } from '../../shared/utilities/common.functions';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Comment Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: CommentActions,
      state: CommentState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['ChangeFormModeToEdit'],
      customTests: [
        {
          it: 'changes formMode to \'EDIT\', commentBeingEdited to the action\'s commentBeingEdited, and the formSubmitLabel',
          actionParameters: { commentBeingEdited: { some: 'comment' } },
          previousState: CommentState.initialState,
          expectedNextState: {
            ...CommentState.initialState,
            formMode: 'EDIT',
            commentBeingEdited: { some: 'comment' },
            formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL'
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['ChangeFormModeToAdd'],
      mutationTestData: {
        previousState: { formMode: 'ADD' }
      },
      customTests: [
        {
          it: 'changes formMode to  \'ADD\', commentBeingEdited to null, and the formSubmitLabel',
          previousState: {
            ...CommentState.initialState,
            formMode: 'EDIT',
            commentBeingEdited: { some: 'comment' },
            formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL'
          },
          expectedNextState: {
            ...CommentState.initialState,
            formMode: 'ADD',
            commentBeingEdited: null,
            formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL'
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['Remove', 'Load'],
      mutationTestData: {
        actionParameters: { parentObject: { objectType: 'collection', objectId: 1 } }
      },
      customTests: [
        {
          it: 'changes the activeObjectType to the action\'s objectType for a regular object type',
          actionParameters: { parentObject: { objectType: 'collection', objectId: 1 } },
          previousState: { activeObjectType: null },
          expectedNextState: { activeObjectType: 'collection' }
        },
        {
          it: 'changes the activeObjectType to the action\'s objectType for a nested object type',
          actionParameters: {
            parentObject: { objectType: 'collection', objectId: 1, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123' }
          },
          previousState: { activeObjectType: null },
          expectedNextState: { activeObjectType: 'lineItem' }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['FormSubmitSuccess', 'RemoveSuccess', 'LoadSuccess'],
      mutationTestData: {
        actionParameters: { comments: { items: [{ some: 'collection' }], pagination: {} } }
      },
      customTests: [
        {
          it: 'adds the comments to the right part of the store and sets activeObjectType back to null',
          actionParameters: { comments: { items: [{ some: 'collection' }], pagination: {} } },
          previousState: { activeObjectType: 'collection' },
          expectedNextState: {
            activeObjectType: 'collection',
            formMode: 'ADD',
            formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
            commentBeingEdited: null,
            collection: { items: [{ some: 'collection' }], pagination: {} }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['GetCountsSuccess'],
      customTests: [
        {
          it: 'merges the counts into the state',
          actionParameters: { counts: { 'abc': 4, 'def': 2 } },
          previousState: CommentState.initialState,
          expectedNextState: { ...Common.clone(CommentState.initialState), counts: { 'abc': 4, 'def': 2 } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['FormSubmit'],
      customTests: [
        {
          it: 'merges the commentBeingEdited',
          actionParameters: { comment: { the: 'newComment' } },
          previousState: { commentBeingEdited: { some: 'comment' } },
          expectedNextState: { commentBeingEdited: { some: 'comment', the: 'newComment' } }
        }
      ]
    });
  });
}
