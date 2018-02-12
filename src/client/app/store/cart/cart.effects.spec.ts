import { CartEffects } from './cart.effects';
import * as CartActions from './cart.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Cart Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new CartEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.Load.Type
      },
      serviceMethod: {
        name: 'load',
        returnsObservableOf: { some: 'cart' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'cart' }]
        },
        failure: {
          sectionName: 'cart',
          methodName: 'loadFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'editLineItemFromDetails',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.EditLineItemFromDetails.Type,
        uuid: 'abc-123',
        markers: { in: 1, out: 2 },
        attributes: { some: 'attribute' }
      },
      state: {
        storeSectionName: 'cart',
        value: { data: { projects: [{ lineItems: [{ id: 'abc-123', asset: { some: 'asset' } }] }] } }
      },
      serviceMethod: {
        name: 'editLineItem',
        returnsObservableOf: { some: 'cart' },
        expectedArguments: [{ id: 'abc-123', asset: { some: 'asset' } }, { in: 1, out: 2 }, { some: 'attribute' }]
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'editLineItemFromDetailsSuccess',
          expectedArguments: [{ some: 'cart' }]
        },
        failure: {
          sectionName: 'cart',
          methodName: 'editLineItemFromDetailsFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackbarOnEditLineItemSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.EditLineItemFromDetailsSuccess.Type,
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['ASSET.DETAIL.CART_ITEM_UPDATED']
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'removeAsset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.RemoveAsset.Type,
        asset: { some: 'asset' }
      },
      state: {
        storeSectionName: 'cart',
        propertyName: 'data',
        value: { id: { some: 'cartId' } }
      },
      serviceMethod: {
        name: 'removeAsset',
        expectedArguments: [{ some: 'asset' }],
        returnsObservableOf: { some: 'cart' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'removeAssetSuccess',
          expectedArguments: [{ some: 'cart' }]
        },
        failure: {
          sectionName: 'cart',
          methodName: 'removeAssetFailure',
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'changeRouteOnRemoveAssetSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.RemoveAssetSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'router',
          methodName: 'goToCart',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackbarOnRemoveAssetSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.RemoveAssetSuccess.Type,
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['CART.REMOVE_ASSET.SUCCESS']
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'addNote',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.AddNote.Type,
        note: 'some note',
        lineItem: { some: 'lineItem' }
      },
      serviceMethod: {
        name: 'addNote',
        expectedArguments: ['some note', { some: 'lineItem' }],
        returnsObservableOf: { some: 'cart' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'addNoteSuccess',
          expectedArguments: [{ some: 'cart' }]
        },
        failure: {
          sectionName: 'error',
          methodName: 'handle'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'removeNote',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CartActions.RemoveNote.Type,
        lineItem: { some: 'lineItem' }
      },
      serviceMethod: {
        name: 'removeNoteFrom',
        expectedArguments: [{ some: 'lineItem' }],
        returnsObservableOf: { some: 'cart' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'removeNoteSuccess',
          expectedArguments: [{ some: 'cart' }]
        },
        failure: {
          sectionName: 'error',
          methodName: 'handle'
        }
      }
    });
  });
}
