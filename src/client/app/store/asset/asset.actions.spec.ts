import { ActionFactory, InternalActionFactory } from './asset.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Asset Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadOrderAsset',
        parameters: [1, 'abc-123']
      },
      expectedAction: {
        type: '[Asset] Load Order Asset',
        orderId: 1,
        uuid: 'abc-123',
        assetType: 'order'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadQuoteShowAsset',
        parameters: [1, 'abc-123']
      },
      expectedAction: {
        type: '[Asset] Load Quote Show Asset',
        quoteId: 1,
        uuid: 'abc-123',
        assetType: 'quoteShow'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadQuoteEditAsset',
        parameters: ['abc-123']
      },
      expectedAction: {
        type: '[Asset] Load Quote Edit Asset',
        uuid: 'abc-123',
        assetType: 'quoteEdit'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadCartAsset',
        parameters: ['abc-123']
      },
      expectedAction: {
        type: '[Asset] Load Cart Asset',
        uuid: 'abc-123',
        assetType: 'cart'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadActiveCollectionAsset',
        parameters: ['abc-123']
      },
      expectedAction: {
        type: '[Asset] Load Active Collection Asset',
        uuid: 'abc-123',
        assetType: 'collection'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadSearchAsset',
        parameters: [{ some: 'loadParams' }]
      },
      expectedAction: {
        type: '[Asset] Load Search Asset',
        loadParameters: { some: 'loadParams' },
        assetType: 'search'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateMarkersInUrl',
        parameters: [{ some: 'markers' }, 1234567]
      },
      expectedAction: {
        type: '[Asset] Update Markers In URL',
        markers: { some: 'markers' },
        assetId: 1234567
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadAssetAfterParentIsAvailable',
        parameters: [{ some: 'loadParams' }, 'cart', 123]
      },
      expectedAction: {
        type: '[Asset] Load Asset After Parent Is Available',
        loadParameters: { some: 'loadParams' },
        assetType: 'cart',
        parentId: 123
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'asset' }]
      },
      expectedAction: {
        type: '[Asset] Load Success',
        activeAsset: { some: 'asset' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Asset] Load Failure',
        error: { some: 'error' }
      }
    });
  });
}
