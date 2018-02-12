import { CommentEffects } from './comment.effects';
import * as CommentActions from './comment.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Comment Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): CommentEffects {
      return new CommentEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'getComments',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.Load.Type,
        parentObject: { objectType: 'collection', objectId: 1 }
      },
      serviceMethod: {
        name: 'getCommentsFor',
        expectedArguments: [{ objectType: 'collection', objectId: 1 }],
        returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
      },
      outputActionFactories: {
        success: {
          sectionName: 'comment',
          methodName: 'loadSuccess',
          expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'formSubmit',
      comment: 'for EDIT',
      state: [
        { storeSectionName: 'comment', propertyName: 'formMode', value: 'EDIT' },
        { storeSectionName: 'comment', propertyName: 'commentBeingEdited', value: { old: 'comment' } }
      ],
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.FormSubmit.Type,
        parentObject: { objectType: 'collection', objectId: 1 },
        comment: { some: 'comment' }
      },
      serviceMethod: {
        name: 'editComment',
        expectedArguments: [{ objectType: 'collection', objectId: 1 }, { old: 'comment' }],
        returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
      },
      outputActionFactories: {
        success: {
          sectionName: 'comment',
          methodName: 'formSubmitSuccess',
          expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'formSubmit',
      comment: 'for ADD',
      state: { storeSectionName: 'comment', propertyName: 'formMode', value: 'ADD' },
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.FormSubmit.Type,
        parentObject: { objectType: 'collection', objectId: 1 },
        comment: { some: 'comment' }
      },
      serviceMethod: {
        name: 'addCommentTo',
        expectedArguments: [{ objectType: 'collection', objectId: 1 }, { some: 'comment' }],
        returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
      },
      outputActionFactories: {
        success: {
          sectionName: 'comment',
          methodName: 'formSubmitSuccess',
          expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'removeComment',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.Remove.Type,
        parentObject: { objectType: 'collection', objectId: 1 },
        commentId: 2
      },
      serviceMethod: {
        name: 'removeComment',
        expectedArguments: [{ objectType: 'collection', objectId: 1 }, 2],
        returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
      },
      outputActionFactories: {
        success: {
          sectionName: 'comment',
          methodName: 'removeSuccess',
          expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackBarOnRemoveSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.RemoveSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COMMENTS.DELETE_SUCCESS_TOAST']
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getCounts',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CommentActions.GetCounts.Type,
        parentObject: { some: 'parentObject' }
      },
      serviceMethod: {
        name: 'getCountsFor',
        expectedArguments: [{ some: 'parentObject' }],
        returnsObservableOf: { abc: 1 }
      },
      outputActionFactories: {
        success: {
          sectionName: 'comment',
          methodName: 'getCountsSuccess',
          expectedArguments: [{ abc: 1 }]
        }
      }
    });
  });
}
