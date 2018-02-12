import { ActionFactory, InternalActionFactory } from './order.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Order Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [42]
      },
      expectedAction: {
        type: '[Order] Load',
        orderId: 42
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'order' }]
      },
      expectedAction: {
        type: '[Order] Load Success',
        activeOrder: { some: 'order' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Order] Load Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'setCheckoutState',
        parameters: [true]
      },
      expectedAction: {
        type: '[Order] Set Checkout State',
        checkingOut: true
      }
    });
  });
}
