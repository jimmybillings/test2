import * as PricingState from './pricing.state';
import * as PricingActions from './pricing.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Pricing Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: PricingActions,
      state: PricingState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'ResetPricing',
      mutationTestData: {
        previousState: {
          priceForDetails: null,
          priceForDialog: null,
          attributes: null,
          appliedAttributes: null,
          selectedAttributes: { some: 'attributes' }
        }
      },
      customTests: [
        {
          it: 'returns the inital state',
          previousState: {
            priceForDetails: null,
            priceForDialog: null,
            attributes: null,
            appliedAttributes: null,
            selectedAttributes: { some: 'attributes' }
          },
          expectedNextState: PricingState.initialState
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'CalculatePrice',
      customTests: [
        {
          it: 'returns the state, but with the price attributes the user has selected',
          actionParameters: { selectedAttributes: { some: 'attributes' } },
          previousState: PricingState.initialState,
          expectedNextState: { ...PricingState.initialState, selectedAttributes: { some: 'attributes' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'SetAppliedAttributes',
      customTests: [
        {
          it: 'returns the state, but with the price attributes the user has applied',
          actionParameters: { appliedAttributes: { some: 'attributes' } },
          previousState: PricingState.initialState,
          expectedNextState: { ...PricingState.initialState, appliedAttributes: { some: 'attributes' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'GetAttributesSuccess',
      customTests: [
        {
          it: 'returns the state, but with the price attributes from the API',
          actionParameters: { attributes: { some: 'attributes' } },
          previousState: PricingState.initialState,
          expectedNextState: { ...PricingState.initialState, attributes: { some: 'attributes' } }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'SetPriceForDetails',
      customTests: [
        {
          it: 'returns the state, but with the priceForDetails value from the action',
          actionParameters: { price: 100 },
          previousState: PricingState.initialState,
          expectedNextState: { ...PricingState.initialState, priceForDetails: 100 }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'SetPriceForDialog',
      customTests: [
        {
          it: 'returns the state, but with the priceForDialog value from the action',
          actionParameters: { price: 100 },
          previousState: PricingState.initialState,
          expectedNextState: { ...PricingState.initialState, priceForDialog: 100 }
        }
      ]
    });
  });
}
