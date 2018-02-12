
import { ActionFactory, InternalActionFactory } from './active-collection.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Active Collection Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ currentPage: 42, pageSize: 50 }]
      },
      expectedAction: {
        type: '[Active Collection] Load',
        pagination: { currentPage: 42, pageSize: 50 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadIfNeeded',
        parameters: [{ currentPage: 42, pageSize: 50 }]
      },
      expectedAction: {
        type: '[Active Collection] Load If Needed',
        pagination: { currentPage: 42, pageSize: 50 }
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with default parameters',
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: []
      },
      expectedAction: {
        type: '[Active Collection] Load',
        pagination: { currentPage: 1, pageSize: 100 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'set',
        parameters: [99, { currentPage: 42, pageSize: 50 }]
      },
      expectedAction: {
        type: '[Active Collection] Set',
        collectionId: 99,
        pagination: { currentPage: 42, pageSize: 50 }
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with default parameters',
      factoryMethod: {
        class: ActionFactory,
        name: 'set',
        parameters: [99]
      },
      expectedAction: {
        type: '[Active Collection] Set',
        collectionId: 99,
        pagination: { currentPage: 1, pageSize: 100 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadPage',
        parameters: [{ currentPage: 42, pageSize: 50 }]
      },
      expectedAction: {
        type: '[Active Collection] Load Page',
        pagination: { currentPage: 42, pageSize: 50 }
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with default parameters',
      factoryMethod: {
        class: ActionFactory,
        name: 'loadPage',
        parameters: []
      },
      expectedAction: {
        type: '[Active Collection] Load Page',
        pagination: { currentPage: 1, pageSize: 100 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addAsset',
        parameters: [{ some: 'asset' }, { some: 'markers' }]
      },
      expectedAction: {
        type: '[Active Collection] Add Asset',
        asset: { some: 'asset' },
        markers: { some: 'markers' }
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'no markers',
      factoryMethod: {
        class: ActionFactory,
        name: 'addAsset',
        parameters: [{ some: 'asset' }]
      },
      expectedAction: {
        type: '[Active Collection] Add Asset',
        asset: { some: 'asset' },
        markers: undefined
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'removeAsset',
        parameters: [{ some: 'asset' }]
      },
      expectedAction: {
        type: '[Active Collection] Remove Asset',
        asset: { some: 'asset' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateAssetMarkers',
        parameters: [{ some: 'asset' }, { some: 'markers' }]
      },
      expectedAction: {
        type: '[Active Collection] Update Asset Markers',
        asset: { some: 'asset' },
        markers: { some: 'markers' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'reset',
        parameters: []
      },
      expectedAction: {
        type: '[Active Collection] Reset'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'collection' }]
      },
      expectedAction: {
        type: '[Active Collection] Load Success',
        activeCollection: { some: 'collection' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Load Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'setSuccess',
        parameters: [{ some: 'collection' }]
      },
      expectedAction: {
        type: '[Active Collection] Set Success',
        activeCollection: { some: 'collection' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'setFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Set Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadPageSuccess',
        parameters: [{ some: 'assets' }]
      },
      expectedAction: {
        type: '[Active Collection] Load Page Success',
        currentPageItems: { some: 'assets' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadPageFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Load Page Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addAssetSuccess',
        parameters: [{ some: 'assets' }]
      },
      expectedAction: {
        type: '[Active Collection] Add Asset Success',
        currentPageItems: { some: 'assets' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addAssetFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Add Asset Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'removeAssetSuccess',
        parameters: [{ some: 'assets' }]
      },
      expectedAction: {
        type: '[Active Collection] Remove Asset Success',
        currentPageItems: { some: 'assets' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'removeAssetFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Remove Asset Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'updateAssetMarkersSuccess',
        parameters: [{ some: 'assets' }]
      },
      expectedAction: {
        type: '[Active Collection] Update Asset Markers Success',
        currentPageItems: { some: 'assets' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'updateAssetMarkersFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Active Collection] Update Asset Markers Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addPageOfSearchAssets',
        parameters: []
      },
      expectedAction: {
        type: '[Active Collection] Add Page Of Search Assets'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addPageOfSearchAssetsSuccess',
        parameters: [{ some: 'items' }]
      },
      expectedAction: {
        type: '[Active Collection] Add Page Of Search Assets Success',
        currentPageItems: { some: 'items' }
      }
    });
  });
}
