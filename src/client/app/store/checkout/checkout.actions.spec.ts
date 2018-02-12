import { ActionFactory, InternalActionFactory } from './checkout.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Checkout Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setPurchaseOrderId',
        parameters: ['123-purchase-order-id']
      },
      expectedAction: {
        type: '[Checkout] Set Purchase Order Id',
        purchaseOrderId: '123-purchase-order-id'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setAvailablePaymentOptions',
        parameters: [{ some: 'options' }]
      },
      expectedAction: {
        type: '[Checkout] Set Available Payment Options',
        paymentOptions: { some: 'options' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setSelectedPaymentType',
        parameters: ['SomePaymentOption']
      },
      expectedAction: {
        type: '[Checkout] Set Selected Payment Type',
        selectedPaymentType: 'SomePaymentOption'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setAvailableAddresses',
        parameters: [{ some: 'addresses' }]
      },
      expectedAction: {
        type: '[Checkout] Set Available Addresses',
        addresses: { some: 'addresses' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setSelectedAddress',
        parameters: [{ some: 'address' }]
      },
      expectedAction: {
        type: '[Checkout] Set Selected Address',
        selectedAddress: { some: 'address' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setCreditCardAuthorization',
        parameters: [{ some: 'auth' }]
      },
      expectedAction: {
        type: '[Checkout] Set Credit Card Authorization',
        authorization: { some: 'auth' }
      }
    });
  });
}
