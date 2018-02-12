"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
var asset_effects_1 = require("./asset.effects");
var frame_1 = require("../../shared/modules/wazee-frame-formatter/frame");
var AssetActions = require("./asset.actions");
var CartActions = require("../cart/cart.actions");
var OrderActions = require("../order/order.actions");
var QuoteEditActions = require("../quote-edit/quote-edit.actions");
var QuoteShowActions = require("../quote-show/quote-show.actions");
var ActiveCollectionActions = require("../active-collection/active-collection.actions");
function main() {
    describe('Asset Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new asset_effects_1.AssetEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
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
                markers: { in: new frame_1.Frame(30).setFromSeconds(10), out: new frame_1.Frame(30).setFromSeconds(20) },
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
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyRUFBd0U7QUFDeEUsaURBQStDO0FBQy9DLDBFQUF5RTtBQUN6RSw4Q0FBZ0Q7QUFDaEQsa0RBQW9EO0FBQ3BELHFEQUF1RDtBQUN2RCxtRUFBcUU7QUFDckUsbUVBQXFFO0FBQ3JFLHdGQUEwRjtBQUUxRjtJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksNEJBQVksQ0FDckIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFJRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsNEJBQTRCO1lBQ3hDLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJO2dCQUN2RCxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQzFDLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixRQUFRLEVBQUUsR0FBRzthQUNkO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO2dCQUM3RCxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDdkM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsYUFBYTtvQkFDekIs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QkFDUCxXQUFXLEVBQUUsUUFBUTtvQkFDckIsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztpQkFDL0M7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2FBQ3ZCO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsT0FBTztvQkFDcEIsVUFBVSxFQUFFLFFBQVE7b0JBQ3BCLGlCQUFpQixFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7aUJBQ3JDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFudkJELG9CQW12QkMiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuaW1wb3J0IHsgQXNzZXRFZmZlY3RzIH0gZnJvbSAnLi9hc3NldC5lZmZlY3RzJztcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2ZyYW1lJztcbmltcG9ydCAqIGFzIEFzc2V0QWN0aW9ucyBmcm9tICcuL2Fzc2V0LmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgQ2FydEFjdGlvbnMgZnJvbSAnLi4vY2FydC9jYXJ0LmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgT3JkZXJBY3Rpb25zIGZyb20gJy4uL29yZGVyL29yZGVyLmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgUXVvdGVFZGl0QWN0aW9ucyBmcm9tICcuLi9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBRdW90ZVNob3dBY3Rpb25zIGZyb20gJy4uL3F1b3RlLXNob3cvcXVvdGUtc2hvdy5hY3Rpb25zJztcbmltcG9ydCAqIGFzIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zIGZyb20gJy4uL2FjdGl2ZS1jb2xsZWN0aW9uL2FjdGl2ZS1jb2xsZWN0aW9uLmFjdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0Fzc2V0IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogYW55IHtcbiAgICAgIHJldHVybiBuZXcgQXNzZXRFZmZlY3RzKFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrTmdyeEVmZmVjdHNBY3Rpb25zLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU3RvcmUsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTZXJ2aWNlXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKiBHbG9iYWwgQXNzZXQgRWZmZWN0cyBTcGVjcyAqL1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZEFmdGVyUGFyZW50SXNBdmFpbGFibGUnLFxuICAgICAgY29tbWVudDogJ2ZvciBhbiBvcmRlciBhc3NldCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuTG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZS5UeXBlLFxuICAgICAgICBsb2FkUGFyYW1ldGVyczogeyBzb21lOiAnbG9hZFBhcmFtZXRlcnMnIH0sXG4gICAgICAgIGFzc2V0VHlwZTogJ29yZGVyJyxcbiAgICAgICAgcGFyZW50SWQ6IDEyM1xuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2xvYWRQYXJhbWV0ZXJzJyB9LCAnb3JkZXInLCAxMjNdLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdhc3NldCcgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGYWlsdXJlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkQWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZScsXG4gICAgICBjb21tZW50OiAnZm9yIGFuIGFzc2V0IHRoYXQgaXMgTk9UIGFuIG9yZGVyIGFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFzc2V0QWN0aW9ucy5Mb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlLlR5cGUsXG4gICAgICAgIGxvYWRQYXJhbWV0ZXJzOiB7IHNvbWU6ICdsb2FkUGFyYW1ldGVycycgfSxcbiAgICAgICAgYXNzZXRUeXBlOiAnc2VhcmNoJyxcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdsb2FkUGFyYW1ldGVycycgfSwgJ3NlYXJjaCcsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2Fzc2V0JyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWQnLFxuICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdhc3NldCcgfV1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKiBDYXJ0IEFzc2V0IEVmZmVjdHMgU3BlY3MgKi9cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRBc3NldE9uQ2FydExvYWRTdWNjZXNzJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBhc3NldCBzdG9yZSBIQVMgbG9hZCBwYXJhbWV0ZXJzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAnYWJjLTEyMycsIGFjdGl2ZUFzc2V0VHlwZTogJ2NhcnQnIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgaWQ6ICdhYmMtMTIzJywgYXNzZXQ6IHsgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfSB9XSB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGlkOiAnNTAnLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogJzUwMCcsIHRpbWVFbmQ6ICc1MDAwJyB9LCAnY2FydCcsIHVuZGVmaW5lZF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZEFzc2V0T25DYXJ0TG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGFzc2V0IFVVSUQgZG9lc25cXCd0IGV4aXN0IGluIHRoZSBjYXJ0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAneHl6LW5vdC1wcmVzZW50JywgYWN0aXZlQXNzZXRUeXBlOiAnY2FydCcgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBpZDogJ2FiYy0xMjMnLCBhc3NldDogeyBhc3NldElkOiA1MCwgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6IDUwMCwgdGltZUVuZDogNTAwMCB9IH1dIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENhcnRBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHN0YXR1czogNDA0IH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRDYXJ0QXNzZXQnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGNhcnQgaXMgTk9UIHlldCBsb2FkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiBudWxsIH0gfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLkxvYWRDYXJ0QXNzZXQuVHlwZSxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZENhcnRBc3NldCcsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgY2FydCBJUyBsb2FkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgaWQ6ICdhYmMtMTIzJywgYXNzZXQ6IHsgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfSB9XSB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuTG9hZENhcnRBc3NldC5UeXBlLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMydcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaWQ6ICc1MCcsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiAnNTAwJywgdGltZUVuZDogJzUwMDAnIH0sICdjYXJ0JywgdW5kZWZpbmVkXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiogQWN0aXZlIENvbGxlY3Rpb24gQXNzZXQgRWZmZWN0cyBTcGVjcyAqL1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZEFzc2V0T25Db2xsZWN0aW9uTG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGFzc2V0IHN0b3JlIEhBUyBsb2FkIHBhcmFtZXRlcnMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgdmFsdWU6IHsgbG9hZGluZ1V1aWQ6ICdhYmMtMTIzJywgYWN0aXZlQXNzZXRUeXBlOiAnY29sbGVjdGlvbicgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIHZhbHVlOiB7IGNvbGxlY3Rpb246IHsgaWQ6IDEsIGFzc2V0czogeyBpdGVtczogW3sgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfV0gfSB9IH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaWQ6ICc1MCcsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiAnNTAwJywgdGltZUVuZDogJzUwMDAnIH0sICdjb2xsZWN0aW9uJywgMV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZEFzc2V0T25Db2xsZWN0aW9uTG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGFzc2V0IFVVSUQgZG9lc25cXCd0IGV4aXN0IGluIHRoZSBjb2xsZWN0aW9uJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAneHl6LW5vdC1wcmVzZW50JywgYWN0aXZlQXNzZXRUeXBlOiAnY29sbGVjdGlvbicgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIHZhbHVlOiB7IGNvbGxlY3Rpb246IHsgaWQ6IDEsIGFzc2V0czogeyBpdGVtczogW3sgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfV0gfSB9IH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHN0YXR1czogNDA0IH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRBY3RpdmVDb2xsZWN0aW9uQXNzZXQnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGNvbGxlY3Rpb24gaXMgTk9UIHlldCBsb2FkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICB2YWx1ZTogeyBjb2xsZWN0aW9uOiB7IGlkOiBudWxsIH0gfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICB2YWx1ZTogeyBsb2FkaW5nVXVpZDogJ2FiYy0xMjMnLCBhY3RpdmVBc3NldFR5cGU6ICdjb2xsZWN0aW9uJyB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldC5UeXBlLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMydcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBjb2xsZWN0aW9uIElTIGxvYWRlZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIHZhbHVlOiB7IGNvbGxlY3Rpb246IHsgaWQ6IDEsIGFzc2V0czogeyBpdGVtczogW3sgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfV0gfSB9IH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgdmFsdWU6IHsgbG9hZGluZ1V1aWQ6ICdhYmMtMTIzJywgYWN0aXZlQXNzZXRUeXBlOiAnY29sbGVjdGlvbicgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLkxvYWRBY3RpdmVDb2xsZWN0aW9uQXNzZXQuVHlwZSxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGlkOiAnNTAnLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogJzUwMCcsIHRpbWVFbmQ6ICc1MDAwJyB9LCAnY29sbGVjdGlvbicsIDFdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKiBPcmRlciBBc3NldCBFZmZlY3RzIFNwZWNzICovXG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkQXNzZXRPbk9yZGVyTG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGFzc2V0IHN0b3JlIEhBUyBsb2FkIHBhcmFtZXRlcnMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgdmFsdWU6IHsgbG9hZGluZ1V1aWQ6ICdhYmMtMTIzJywgYWN0aXZlQXNzZXRUeXBlOiAnb3JkZXInIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdvcmRlcicsXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiAnYWN0aXZlT3JkZXInLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHByb2plY3RzOiBbXG4gICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBpZDogJ2FiYy0xMjMnLCBhc3NldDogeyBhc3NldElkOiA1MCwgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6IDUwMCwgdGltZUVuZDogNTAwMCB9IH1dIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBPcmRlckFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBpZDogJzUwJywgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6ICc1MDAnLCB0aW1lRW5kOiAnNTAwMCcgfSwgJ29yZGVyJywgMV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZEFzc2V0T25PcmRlckxvYWRTdWNjZXNzJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBhc3NldCBVVUlEIGRvZXNuXFwndCBleGlzdCBpbiB0aGUgb3JkZXInLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgdmFsdWU6IHsgbG9hZGluZ1V1aWQ6ICd4eXotbm90LXByZXNlbnQnLCBhY3RpdmVBc3NldFR5cGU6ICdvcmRlcicgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ29yZGVyJyxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdhY3RpdmVPcmRlcicsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IGFzc2V0SWQ6IDUwLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogNTAwLCB0aW1lRW5kOiA1MDAwIH0gfV0gfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IE9yZGVyQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzdGF0dXM6IDQwNCB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkT3JkZXJBc3NldCcsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgb3JkZXIgaXMgTk9UIHlldCBsb2FkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdvcmRlcicsXG4gICAgICAgICAgdmFsdWU6IHsgYWN0aXZlT3JkZXI6IHsgaWQ6IDAsIGRhdGE6IHsgaWQ6IG51bGwgfSB9IH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgdmFsdWU6IHsgbG9hZGluZ1V1aWQ6ICdhYmMtMTIzJywgYWN0aXZlQXNzZXRUeXBlOiAnb3JkZXInIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFzc2V0QWN0aW9ucy5Mb2FkT3JkZXJBc3NldC5UeXBlLFxuICAgICAgICBvcmRlcklkOiA0NyxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ29yZGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFs0N11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZE9yZGVyQXNzZXQnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIG9yZGVyIElTIGxvYWRlZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ29yZGVyJyxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdhY3RpdmVPcmRlcicsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGlkOiA0NyxcbiAgICAgICAgICAgIHByb2plY3RzOiBbXG4gICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBpZDogJ2FiYy0xMjMnLCBhc3NldDogeyBhc3NldElkOiA1MCwgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6IDUwMCwgdGltZUVuZDogNTAwMCB9IH1dIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAnYWJjLTEyMycsIGFjdGl2ZUFzc2V0VHlwZTogJ29yZGVyJyB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuTG9hZE9yZGVyQXNzZXQuVHlwZSxcbiAgICAgICAgb3JkZXJJZDogNDcsXG4gICAgICAgIHV1aWQ6ICdhYmMtMTIzJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBpZDogJzUwJywgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6ICc1MDAnLCB0aW1lRW5kOiAnNTAwMCcgfSwgJ29yZGVyJywgNDddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKiBRdW90ZSBFZGl0IEFzc2V0IEVmZmVjdHMgU3BlY3MgKi9cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRBc3NldE9uUXVvdGVMb2FkU3VjY2VzcycsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgYXNzZXQgc3RvcmUgSEFTIGxvYWQgcGFyYW1ldGVycycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICB2YWx1ZTogeyBsb2FkaW5nVXVpZDogJ2FiYy0xMjMnLCBhY3RpdmVBc3NldFR5cGU6ICdxdW90ZUVkaXQnIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBpZDogJ2FiYy0xMjMnLCBhc3NldDogeyBhc3NldElkOiA1MCwgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6IDUwMCwgdGltZUVuZDogNTAwMCB9IH1dIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBpZDogJzUwJywgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6ICc1MDAnLCB0aW1lRW5kOiAnNTAwMCcgfSwgJ3F1b3RlRWRpdCcsIDFdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRBc3NldE9uUXVvdGVMb2FkU3VjY2VzcycsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgYXNzZXQgVVVJRCBkb2VzblxcJ3QgZXhpc3QgaW4gdGhlIHF1b3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAneHl6LW5vdC1wcmVzZW50JywgYWN0aXZlQXNzZXRUeXBlOiAncXVvdGVFZGl0JyB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgaWQ6ICdhYmMtMTIzJywgYXNzZXQ6IHsgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfSB9XSB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHN0YXR1czogNDA0IH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZFF1b3RlRWRpdEFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBxdW90ZSBpcyBOT1QgeWV0IGxvYWRlZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogMCB9IH1cbiAgICAgIH0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuTG9hZFF1b3RlRWRpdEFzc2V0LlR5cGUsXG4gICAgICAgIHV1aWQ6ICdhYmMtMTIzJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZFF1b3RlRWRpdEFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBxdW90ZSBJUyBsb2FkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgaWQ6ICdhYmMtMTIzJywgYXNzZXQ6IHsgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfSB9XSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLkxvYWRRdW90ZUVkaXRBc3NldC5UeXBlLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMydcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaWQ6ICc1MCcsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiAnNTAwJywgdGltZUVuZDogJzUwMDAnIH0sICdxdW90ZUVkaXQnLCAxXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiogUXVvdGUgU2hvdyBBc3NldCBFZmZlY3RzIFNwZWNzICovXG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkQXNzZXRPblF1b3RlU2hvd0xvYWRTdWNjZXNzJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBhc3NldCBzdG9yZSBIQVMgbG9hZCBwYXJhbWV0ZXJzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYXNzZXQnLFxuICAgICAgICAgIHZhbHVlOiB7IGxvYWRpbmdVdWlkOiAnYWJjLTEyMycsIGFjdGl2ZUFzc2V0VHlwZTogJ3F1b3RlU2hvdycgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlU2hvdycsXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiAnZGF0YScsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IGFzc2V0SWQ6IDUwLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogNTAwLCB0aW1lRW5kOiA1MDAwIH0gfV0gfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlU2hvd0FjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBpZDogJzUwJywgdXVpZDogJ2FiYy0xMjMnLCB0aW1lU3RhcnQ6ICc1MDAnLCB0aW1lRW5kOiAnNTAwMCcgfSwgJ3F1b3RlU2hvdycsIDFdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRBc3NldE9uUXVvdGVTaG93TG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGFzc2V0IFVVSUQgZG9lc25cXCd0IGV4aXN0IGluIHRoZSBxdW90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICB2YWx1ZTogeyBsb2FkaW5nVXVpZDogJ3h5ei1ub3QtcHJlc2VudCcsIGFjdGl2ZUFzc2V0VHlwZTogJ3F1b3RlU2hvdycgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlU2hvdycsXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiAnZGF0YScsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IGFzc2V0SWQ6IDUwLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogNTAwLCB0aW1lRW5kOiA1MDAwIH0gfV0gfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlU2hvd0FjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhc3NldCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc3RhdHVzOiA0MDQgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZFF1b3RlU2hvd0Fzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBxdW90ZSBpcyBOT1QgeWV0IGxvYWRlZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVTaG93JyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnZGF0YScsXG4gICAgICAgIHZhbHVlOiB7IGlkOiAwLCBkYXRhOiB7IGlkOiBudWxsIH0gfVxuICAgICAgfSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVTaG93QXNzZXQuVHlwZSxcbiAgICAgICAgcXVvdGVJZDogNDcsXG4gICAgICAgIHV1aWQ6ICdhYmMtMTIzJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZVNob3cnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzQ3XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkUXVvdGVTaG93QXNzZXQnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIHF1b3RlIElTIGxvYWRlZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVTaG93JyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnZGF0YScsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgaWQ6IDQ3LFxuICAgICAgICAgIHByb2plY3RzOiBbXG4gICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgaWQ6ICdhYmMtMTIzJywgYXNzZXQ6IHsgYXNzZXRJZDogNTAsIHV1aWQ6ICdhYmMtMTIzJywgdGltZVN0YXJ0OiA1MDAsIHRpbWVFbmQ6IDUwMDAgfSB9XSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLkxvYWRRdW90ZVNob3dBc3NldC5UeXBlLFxuICAgICAgICBxdW90ZUlkOiA0NyxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGlkOiAnNTAnLCB1dWlkOiAnYWJjLTEyMycsIHRpbWVTdGFydDogJzUwMCcsIHRpbWVFbmQ6ICc1MDAwJyB9LCAncXVvdGVTaG93JywgNDddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKiBTZWFyY2ggQXNzZXQgRWZmZWN0cyBTcGVjcyAqL1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZFNlYXJjaEFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFzc2V0QWN0aW9ucy5Mb2FkU2VhcmNoQXNzZXQuVHlwZSxcbiAgICAgICAgbG9hZFBhcmFtZXRlcnM6IHsgc29tZTogJ2xvYWRQYXJhbWV0ZXJzJywgc2hhcmVfa2V5OiAnYWJjLTEyMycgfSxcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdsb2FkUGFyYW1ldGVycycsIHNoYXJlX2tleTogJ2FiYy0xMjMnIH0sIHVuZGVmaW5lZF0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2Fzc2V0JyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWQnLFxuICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdhc3NldCcgfSwgJ2FiYy0xMjMnXVxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Fzc2V0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3VwZGF0ZU1hcmtlcnNJblVybCcsXG4gICAgICBjb21tZW50OiAnd2l0aCBnb29kIG1hcmtlcnMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLlVwZGF0ZU1hcmtlcnNJblVybC5UeXBlLFxuICAgICAgICBtYXJrZXJzOiB7IGluOiBuZXcgRnJhbWUoMzApLnNldEZyb21TZWNvbmRzKDEwKSwgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21TZWNvbmRzKDIwKSB9LFxuICAgICAgICBhc3NldElkOiAxMDBcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnYWRkTWFya2Vyc1RvVXJsJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEwMCwgMTAwMDAsIDIwMDAwXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBQb3NzaWJsZSBidWc6IHRpbWVTdGFydD11bmRlZmluZWQ7dGltZUVuZD11bmRlZmluZWQsIGJ1dCBpdCBleGlzdGVkIGF0IHRoZSB0aW1lIG9mIGFkZGluZyB0aGlzIHRlc3QsXG4gICAgLy8gU28gSSdtIG5vdCBnb2luZyB0byBtb2RpZnkgdGhlIG9yaWdpbmFsIGNvZGUuIC1SLkUuIDkvMS8xN1xuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3VwZGF0ZU1hcmtlcnNJblVybCcsXG4gICAgICBjb21tZW50OiAnd2l0aCBiYWQgbWFya2VycycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBc3NldEFjdGlvbnMuVXBkYXRlTWFya2Vyc0luVXJsLlR5cGUsXG4gICAgICAgIG1hcmtlcnM6IHsgaW46IHVuZGVmaW5lZCwgb3V0OiB1bmRlZmluZWQgfSxcbiAgICAgICAgYXNzZXRJZDogMTAwXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3JvdXRlcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2FkZE1hcmtlcnNUb1VybCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMDAsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkNTAwRmFpbHVyZScsXG4gICAgICBjb21tZW50OiAnV2l0aCBhIHN0YXR1cyBvZiA1MDAnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQXNzZXRBY3Rpb25zLkxvYWRGYWlsdXJlLlR5cGUsXG4gICAgICAgIGVycm9yOiB7IHN0YXR1czogNTAwIH0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaGFuZGxlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc3RhdHVzOiA1MDAgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
