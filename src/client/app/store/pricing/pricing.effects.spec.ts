import { PricingEffects } from './pricing.effects';
import * as PricingActions from './pricing.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Pricing Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();
    let mockDialogService: any;

    function instantiator(): PricingEffects {
      mockDialogService = { openComponentInDialog: jasmine.createSpy('openComponentInDialog') };
      return new PricingEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockDialogService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'initializePricing',
      effectsInstantiator: instantiator,
      comment: 'when there are no attributes in the state',
      state: {
        storeSectionName: 'pricing',
        value: { attributes: null }
      },
      inputAction: {
        type: PricingActions.InitializePricing.Type,
        rightsReproduction: 'Rights Managed',
        dialogOptions: { some: 'options' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'getAttributes',
          expectedArguments: ['Rights Managed', { some: 'options' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'initializePricing',
      effectsInstantiator: instantiator,
      comment: 'when there are attributes in the state',
      state: {
        storeSectionName: 'pricing',
        value: { attributes: { some: 'attributes' } }
      },
      inputAction: {
        type: PricingActions.InitializePricing.Type,
        rightsReproduction: 'Rights Managed',
        dialogOptions: { some: 'options' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'openDialog',
          expectedArguments: [{ some: 'options' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAttributes',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.GetAttributes.Type,
        rightsReproduction: 'Rights Managed',
        dialogOptions: { some: 'options' }
      },
      serviceMethod: {
        name: 'getPriceAttributes',
        returnsObservableOf: { some: 'attributes' },
        expectedArguments: ['Rights Managed']
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'getAttributesSuccess',
          expectedArguments: [{ some: 'attributes' }, 'Rights Managed', { some: 'options' }]
        },
        failure: {
          sectionName: 'pricing',
          methodName: 'getAttributesFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAttributesSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.GetAttributesSuccess.Type,
        dialogOptions: { some: 'options' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'openDialog',
          expectedArguments: [{ some: 'options' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAttributesSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.GetAttributesSuccess.Type,
        dialogOptions: { some: 'options' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'openDialog',
          expectedArguments: [{ some: 'options' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'calculatePrice',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.CalculatePrice.Type,
        selectedAttributes: { a: 'b', c: 'd' },
        assetId: 12345,
        subclipMarkers: { some: 'markers' }
      },
      serviceMethod: {
        name: 'getPrice',
        expectedArguments: [{ a: 'b', c: 'd' }, 12345, { some: 'markers' }],
        returnsObservableOf: 100
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'calculatePriceSuccess',
          expectedArguments: [100]
        },
        failure: {
          sectionName: 'pricing',
          methodName: 'calculatePriceFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'calculatePriceSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.CalculatePriceSuccess.Type,
        price: 100
      },
      outputActionFactories: {
        success: {
          sectionName: 'pricing',
          methodName: 'setPriceForDialog',
          expectedArguments: [100]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'openDialog',
      effectsInstantiator: instantiator,
      inputAction: {
        type: PricingActions.OpenDialog.Type,
        dialogOptions: { some: 'options' }
      },
      customTests: [
        {
          it: 'calls \'openComponentInDialog()\' on the dialog service',
          expectation: () => expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({ some: 'options' })
        }
      ]
    });
  });
}
