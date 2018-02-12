import { ActionFactory, InternalActionFactory } from './delivery-options.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Delivery Options Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ some: 'asset' }, 'abc-123']
      },
      expectedAction: {
        type: '[Delivery Options] Load',
        activeAsset: { some: 'asset' },
        shareKey: 'abc-123'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'download',
        parameters: [{ some: 'option' }]
      },
      expectedAction: {
        type: '[Delivery Options] Download',
        option: { some: 'option' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'downloadViaAspera',
        parameters: [{ some: 'option' }]
      },
      expectedAction: {
        type: '[Delivery Options] Download Via Aspera',
        option: { some: 'option' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'deliver',
        parameters: [1, { some: 'option' }, { some: 'markers' }]
      },
      expectedAction: {
        type: '[Delivery Options] Deliver Asset',
        assetId: 1,
        option: { some: 'option' },
        markers: { some: 'markers' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [[{ some: 'options' }]]
      },
      expectedAction: {
        type: '[Delivery Options] Load Success',
        options: [{ some: 'options' }]
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Delivery Options] Load Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'deliverySuccess',
        parameters: [1, { some: 'option' }]
      },
      expectedAction: {
        type: '[Delivery Options] Delivery Success',
        orderId: 1,
        option: { some: 'option' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'deliveryFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Delivery Options] Delivery Failure',
        error: { some: 'error' }
      }
    });
  });
}
