import { OrderEffects } from './order.effects';
import * as OrderActions from './order.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Order Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new OrderEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      effectsInstantiator: instantiator,
      inputAction: {
        type: OrderActions.Load.Type,
        orderId: 47
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [47],
        returnsObservableOf: { some: 'order' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'order',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'order' }]
        },
        failure: {
          sectionName: 'order',
          methodName: 'loadFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadSuccess',
      comment: 'with order store checkingOut === true',
      effectsInstantiator: instantiator,
      inputAction: {
        type: OrderActions.LoadSuccess.Type
      },
      state: {
        storeSectionName: 'order',
        propertyName: 'checkingOut',
        value: true
      },
      outputActionFactories: {
        success: [{
          sectionName: 'order',
          methodName: 'setCheckoutState',
          expectedArguments: [false]
        },
        {
          sectionName: 'cart',
          methodName: 'load',
          expectedArguments: []
        }]
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadSuccess',
      comment: 'with order store checkingOut === false',
      effectsInstantiator: instantiator,
      inputAction: {
        type: OrderActions.LoadSuccess.Type
      },
      state: {
        storeSectionName: 'order',
        propertyName: 'checkingOut',
        value: false
      },
      expectToEmitAction: false
    });
  });
}
