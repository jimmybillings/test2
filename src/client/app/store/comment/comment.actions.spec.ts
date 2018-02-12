import { ActionFactory, InternalActionFactory } from './comment.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Comment Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ objectType: 'collection', objectId: 1 }]
      },
      expectedAction: {
        type: '[Comment] Load',
        parentObject: { objectType: 'collection', objectId: 1 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'formSubmit',
        parameters: [{ objectType: 'collection', objectId: 1 }, { some: 'comment' }]
      },
      expectedAction: {
        type: '[Comment] Form Submit',
        parentObject: { objectType: 'collection', objectId: 1 },
        comment: { some: 'comment' },
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'remove',
        parameters: [{ objectType: 'collection', objectId: 1 }, 2]
      },
      expectedAction: {
        type: '[Comment] Remove',
        parentObject: { objectType: 'collection', objectId: 1 },
        commentId: 2,
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'changeFormModeToAdd',
        parameters: []
      },
      expectedAction: {
        type: '[Comment] Change Form Mode To ADD'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'changeFormModeToEdit',
        parameters: [{ some: 'comment' }]
      },
      expectedAction: {
        type: '[Comment] Change Form Mode To EDIT',
        commentBeingEdited: { some: 'comment' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'getCounts',
        parameters: [{ some: 'parentObject' }]
      },
      expectedAction: {
        type: '[Comment] Get Counts',
        parentObject: { some: 'parentObject' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'comments' }]
      },
      expectedAction: {
        type: '[Comment] Load Success',
        comments: { some: 'comments' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'formSubmitSuccess',
        parameters: [{ some: 'comments' }]
      },
      expectedAction: {
        type: '[Comment] Form Submit Success',
        comments: { some: 'comments' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'removeSuccess',
        parameters: [{ some: 'comments' }]
      },
      expectedAction: {
        type: '[Comment] Remove Success',
        comments: { some: 'comments' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getCountsSuccess',
        parameters: [{ some: 'counts' }]
      },
      expectedAction: {
        type: '[Comment] Get Counts Success',
        counts: { some: 'counts' }
      }
    });
  });
}
