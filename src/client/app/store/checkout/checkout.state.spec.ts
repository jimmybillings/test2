import { accessSync } from 'fs';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';
import * as CheckoutState from './checkout.state';
import * as CheckoutActions from './checkout.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Checkout Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: CheckoutActions,
      state: CheckoutState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetPurchaseOrderId'],
      customTests: [
        {
          it: 'returns the state with purchase order id',
          actionParameters: { purchaseOrderId: '123-purchase-order-id' },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, purchaseOrderId: '123-purchase-order-id' }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetAvailablePaymentOptions'],
      customTests: [
        {
          it: 'returns the state with paymentOptions',
          actionParameters: { paymentOptions: { some: 'options' } },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, paymentOptions: { some: 'options' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetSelectedPaymentType'],
      customTests: [
        {
          it: 'returns the state with selectedPaymentType',
          actionParameters: { selectedPaymentType: 'SomePaymentType' },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, selectedPaymentType: 'SomePaymentType' }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetAvailableAddresses'],
      customTests: [
        {
          it: 'returns the state with addresses',
          actionParameters: { addresses: { some: 'addresses' } },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, addresses: { some: 'addresses' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetSelectedAddress'],
      customTests: [
        {
          it: 'returns the state with selectedAddress',
          actionParameters: { selectedAddress: { some: 'address' } },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, selectedAddress: { some: 'address' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['SetCreditCardAuthorization'],
      customTests: [
        {
          it: 'returns the state with authorization',
          actionParameters: { authorization: { some: 'auth' } },
          previousState: CheckoutState.initialState,
          expectedNextState: { ...CheckoutState.initialState, authorization: { some: 'auth' } }
        }
      ]
    });
  });
}
