import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';
import { AssetEffects } from './asset.effects';
import { Frame } from '../../shared/modules/wazee-frame-formatter/frame';
import * as AssetActions from './asset.actions';
import * as CartActions from '../cart/cart.actions';
import * as OrderActions from '../order/order.actions';
import * as QuoteEditActions from '../quote-edit/quote-edit.actions';
import * as QuoteShowActions from '../quote-show/quote-show.actions';
import * as ActiveCollectionActions from '../active-collection/active-collection.actions';

export function main() {
  describe('Asset Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new AssetEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    /** Global Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAfterParentIsAvailable',
      comment: 'for an order asset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.LoadAssetAfterParentIsAvailable.Type,
        loadParameters: { some: 'loadParameters' },
        assetType: 'order',
        parentId: 123
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [{ some: 'loadParameters' }, 'order', 123],
        returnsObservableOf: { some: 'asset' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'asset' }]
        },
        failure: {
          sectionName: 'asset',
          methodName: 'loadFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAfterParentIsAvailable',
      comment: 'for an asset that is NOT an order asset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.LoadAssetAfterParentIsAvailable.Type,
        loadParameters: { some: 'loadParameters' },
        assetType: 'search',
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [{ some: 'loadParameters' }, 'search', undefined],
        returnsObservableOf: { some: 'asset' }
      },
      outputActionFactories: {
        success: [
          {
            sectionName: 'asset',
            methodName: 'loadSuccess',
            expectedArguments: [{ some: 'asset' }]
          },
          {
            sectionName: 'deliveryOptions',
            methodName: 'load',
            expectedArguments: [{ some: 'asset' }]
          }
        ],
        failure: {
          sectionName: 'asset',
          methodName: 'loadFailure'
        }
      }
    });

    /** Cart Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnCartLoadSuccess',
      comment: 'when the asset store HAS load parameters',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'cart' }
        },
        {
          storeSectionName: 'cart',
          value: {
            data: {
              id: 1,
              projects: [
                { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
              ]
            }
          }
        }
      ],
      inputAction: {
        type: CartActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'cart', undefined]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnCartLoadSuccess',
      comment: 'when the asset UUID doesn\'t exist in the cart',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'xyz-not-present', activeAssetType: 'cart' }
        },
        {
          storeSectionName: 'cart',
          value: {
            data: {
              id: 1,
              projects: [
                { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
              ]
            }
          }
        }
      ],
      inputAction: {
        type: CartActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadFailure',
          expectedArguments: [{ status: 404 }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadCartAsset',
      comment: 'when the cart is NOT yet loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'cart',
          value: { data: { id: null } }
        }
      ],
      inputAction: {
        type: AssetActions.LoadCartAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'cart',
          methodName: 'load',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadCartAsset',
      comment: 'when the cart IS loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'cart',
          value: {
            data: {
              id: 1,
              projects: [
                { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
              ]
            }
          }
        }
      ],
      inputAction: {
        type: AssetActions.LoadCartAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'cart', undefined]
        }
      }
    });

    /** Active Collection Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnCollectionLoadSuccess',
      comment: 'when the asset store HAS load parameters',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'collection' }
        },
        {
          storeSectionName: 'activeCollection',
          value: { collection: { id: 1, assets: { items: [{ assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 }] } } }
        }
      ],
      inputAction: {
        type: ActiveCollectionActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'collection', 1]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnCollectionLoadSuccess',
      comment: 'when the asset UUID doesn\'t exist in the collection',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'xyz-not-present', activeAssetType: 'collection' }
        },
        {
          storeSectionName: 'activeCollection',
          value: { collection: { id: 1, assets: { items: [{ assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 }] } } }
        }
      ],
      inputAction: {
        type: ActiveCollectionActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadFailure',
          expectedArguments: [{ status: 404 }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadActiveCollectionAsset',
      comment: 'when the collection is NOT yet loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'activeCollection',
          value: { collection: { id: null } }
        },
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'collection' }
        }
      ],
      inputAction: {
        type: AssetActions.LoadActiveCollectionAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'load',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadActiveCollectionAsset',
      comment: 'when the collection IS loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'activeCollection',
          value: { collection: { id: 1, assets: { items: [{ assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 }] } } }
        },
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'collection' }
        }
      ],
      inputAction: {
        type: AssetActions.LoadActiveCollectionAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'collection', 1]
        }
      }
    });

    /** Order Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnOrderLoadSuccess',
      comment: 'when the asset store HAS load parameters',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'order' }
        },
        {
          storeSectionName: 'order',
          propertyName: 'activeOrder',
          value: {
            id: 1,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        }
      ],
      inputAction: {
        type: OrderActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'order', 1]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnOrderLoadSuccess',
      comment: 'when the asset UUID doesn\'t exist in the order',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'xyz-not-present', activeAssetType: 'order' }
        },
        {
          storeSectionName: 'order',
          propertyName: 'activeOrder',
          value: {
            id: 1,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        }
      ],
      inputAction: {
        type: OrderActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadFailure',
          expectedArguments: [{ status: 404 }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadOrderAsset',
      comment: 'when the order is NOT yet loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'order',
          value: { activeOrder: { id: 0, data: { id: null } } }
        },
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'order' }
        }
      ],
      inputAction: {
        type: AssetActions.LoadOrderAsset.Type,
        orderId: 47,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'order',
          methodName: 'load',
          expectedArguments: [47]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadOrderAsset',
      comment: 'when the order IS loaded',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'order',
          propertyName: 'activeOrder',
          value: {
            id: 47,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        },
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'order' }
        }
      ],
      inputAction: {
        type: AssetActions.LoadOrderAsset.Type,
        orderId: 47,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'order', 47]
        }
      }
    });

    /** Quote Edit Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnQuoteLoadSuccess',
      comment: 'when the asset store HAS load parameters',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'quoteEdit' }
        },
        {
          storeSectionName: 'quoteEdit',
          value: {
            data: {
              id: 1,
              projects: [
                { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
              ]
            }
          }
        }
      ],
      inputAction: {
        type: QuoteEditActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'quoteEdit', 1]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnQuoteLoadSuccess',
      comment: 'when the asset UUID doesn\'t exist in the quote',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'xyz-not-present', activeAssetType: 'quoteEdit' }
        },
        {
          storeSectionName: 'quoteEdit',
          value: {
            data: {
              id: 1,
              projects: [
                { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
              ]
            }
          }
        }
      ],
      inputAction: {
        type: QuoteEditActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadFailure',
          expectedArguments: [{ status: 404 }]
        }
      }
    });


    effectsSpecHelper.generateTestsFor({
      effectName: 'loadQuoteEditAsset',
      comment: 'when the quote is NOT yet loaded',
      effectsInstantiator: instantiator,
      state: {
        storeSectionName: 'quoteEdit',
        value: { data: { id: 0 } }
      },
      inputAction: {
        type: AssetActions.LoadQuoteEditAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'quoteEdit',
          methodName: 'load',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadQuoteEditAsset',
      comment: 'when the quote IS loaded',
      effectsInstantiator: instantiator,
      state: {
        storeSectionName: 'quoteEdit',
        value: {
          data: {
            id: 1,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        }
      },
      inputAction: {
        type: AssetActions.LoadQuoteEditAsset.Type,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'quoteEdit', 1]
        }
      }
    });

    /** Quote Show Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnQuoteShowLoadSuccess',
      comment: 'when the asset store HAS load parameters',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'abc-123', activeAssetType: 'quoteShow' }
        },
        {
          storeSectionName: 'quoteShow',
          propertyName: 'data',
          value: {
            id: 1,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        }
      ],
      inputAction: {
        type: QuoteShowActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'quoteShow', 1]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadAssetOnQuoteShowLoadSuccess',
      comment: 'when the asset UUID doesn\'t exist in the quote',
      effectsInstantiator: instantiator,
      state: [
        {
          storeSectionName: 'asset',
          value: { loadingUuid: 'xyz-not-present', activeAssetType: 'quoteShow' }
        },
        {
          storeSectionName: 'quoteShow',
          propertyName: 'data',
          value: {
            id: 1,
            projects: [
              { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
            ]
          }
        }
      ],
      inputAction: {
        type: QuoteShowActions.LoadSuccess.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadFailure',
          expectedArguments: [{ status: 404 }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadQuoteShowAsset',
      comment: 'when the quote is NOT yet loaded',
      effectsInstantiator: instantiator,
      state: {
        storeSectionName: 'quoteShow',
        propertyName: 'data',
        value: { id: 0, data: { id: null } }
      },
      inputAction: {
        type: AssetActions.LoadQuoteShowAsset.Type,
        quoteId: 47,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'quoteShow',
          methodName: 'load',
          expectedArguments: [47]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadQuoteShowAsset',
      comment: 'when the quote IS loaded',
      effectsInstantiator: instantiator,
      state: {
        storeSectionName: 'quoteShow',
        propertyName: 'data',
        value: {
          id: 47,
          projects: [
            { lineItems: [{ id: 'abc-123', asset: { assetId: 50, uuid: 'abc-123', timeStart: 500, timeEnd: 5000 } }] }
          ]
        }
      },
      inputAction: {
        type: AssetActions.LoadQuoteShowAsset.Type,
        quoteId: 47,
        uuid: 'abc-123'
      },
      outputActionFactories: {
        success: {
          sectionName: 'asset',
          methodName: 'loadAssetAfterParentIsAvailable',
          expectedArguments: [{ id: '50', uuid: 'abc-123', timeStart: '500', timeEnd: '5000' }, 'quoteShow', 47]
        }
      }
    });

    /** Search Asset Effects Specs */

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadSearchAsset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.LoadSearchAsset.Type,
        loadParameters: { some: 'loadParameters', share_key: 'abc-123' },
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [{ some: 'loadParameters', share_key: 'abc-123' }, undefined],
        returnsObservableOf: { some: 'asset' }
      },
      outputActionFactories: {
        success: [
          {
            sectionName: 'asset',
            methodName: 'loadSuccess',
            expectedArguments: [{ some: 'asset' }]
          },
          {
            sectionName: 'deliveryOptions',
            methodName: 'load',
            expectedArguments: [{ some: 'asset' }, 'abc-123']
          },
        ],
        failure: {
          sectionName: 'asset',
          methodName: 'loadFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'updateMarkersInUrl',
      comment: 'with good markers',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.UpdateMarkersInUrl.Type,
        markers: { in: new Frame(30).setFromSeconds(10), out: new Frame(30).setFromSeconds(20) },
        assetId: 100
      },
      outputActionFactories: {
        success: {
          sectionName: 'router',
          methodName: 'addMarkersToUrl',
          expectedArguments: [100, 10000, 20000]
        }
      }
    });

    // Possible bug: timeStart=undefined;timeEnd=undefined, but it existed at the time of adding this test,
    // So I'm not going to modify the original code. -R.E. 9/1/17
    effectsSpecHelper.generateTestsFor({
      effectName: 'updateMarkersInUrl',
      comment: 'with bad markers',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.UpdateMarkersInUrl.Type,
        markers: { in: undefined, out: undefined },
        assetId: 100
      },
      outputActionFactories: {
        success: {
          sectionName: 'router',
          methodName: 'addMarkersToUrl',
          expectedArguments: [100, undefined, undefined]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'load500Failure',
      comment: 'With a status of 500',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AssetActions.LoadFailure.Type,
        error: { status: 500 },
      },
      outputActionFactories: {
        success: {
          sectionName: 'error',
          methodName: 'handle',
          expectedArguments: [{ status: 500 }]
        }
      }
    });
  });
}
