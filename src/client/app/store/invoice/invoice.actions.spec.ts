import { ActionFactory, InternalActionFactory } from './invoice.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Invoice Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      comment: 'without a share key',
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ some: 'orderId' }]
      },
      expectedAction: {
        type: '[Invoice] Load',
        orderId: { some: 'orderId' },
        shareKey: undefined
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with a share key',
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ some: 'orderId' }, 'shareKey']
      },
      expectedAction: {
        type: '[Invoice] Load',
        orderId: { some: 'orderId' },
        shareKey: 'shareKey'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'invoice' }]
      },
      expectedAction: {
        type: '[Invoice] Load Success',
        invoice: { some: 'invoice' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Invoice] Load Failure',
        error: { some: 'error' }
      }
    });
  });
}
