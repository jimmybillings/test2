"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuoteEditActions = require("./quote-edit.actions");
var quote_edit_effects_1 = require("./quote-edit.effects");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Quote Edit Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new quote_edit_effects_1.QuoteEditEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.Load.Type
            },
            serviceMethod: {
                name: 'load',
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteEdit',
                    methodName: 'loadFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'delete',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            inputAction: {
                type: QuoteEditActions.Delete.Type
            },
            serviceMethod: {
                name: 'delete',
                expectedArguments: [1],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'deleteSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteEdit',
                    methodName: 'deleteFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'changeRouteOnDeleteSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.DeleteSuccess.Type
            },
            outputActionFactories: {
                success: {
                    sectionName: 'router',
                    methodName: 'goToQuotes',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'editLineItemFromDetails',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.EditLineItemFromDetails.Type,
                uuid: 'abc-123',
                markers: { in: 1, out: 2 },
                attributes: { some: 'attribute' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 77, projects: [{ lineItems: [{ id: 'abc-123', asset: { some: 'asset' } }] }] } }
            },
            serviceMethod: {
                name: 'editLineItemFromDetails',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [77, { id: 'abc-123', asset: { some: 'asset' } }, { in: 1, out: 2 }, { some: 'attribute' }]
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'editLineItemFromDetailsSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteEdit',
                    methodName: 'editLineItemFromDetailsFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnEditLineItemSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.EditLineItemFromDetailsSuccess.Type,
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.DETAIL.QUOTE_ITEM_UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeAsset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RemoveAsset.Type,
                asset: { some: 'asset' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                propertyName: 'data',
                value: { id: { some: 'quoteId' } }
            },
            serviceMethod: {
                name: 'removeAsset',
                expectedArguments: [{ some: 'quoteId' }, { some: 'asset' }],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'removeAssetSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteEdit',
                    methodName: 'removeAssetFailure',
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'changeRouteOnRemoveAssetSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RemoveAssetSuccess.Type
            },
            outputActionFactories: {
                success: {
                    sectionName: 'router',
                    methodName: 'goToActiveQuote',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnRemoveAssetSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RemoveAssetSuccess.Type,
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['QUOTE.REMOVE_ASSET.SUCCESS']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addCustomPriceToLineItem',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddCustomPriceToLineItem.Type,
                lineItem: { some: 'lineItem' },
                price: 10000,
                override: true
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 10 } }
            },
            serviceMethod: {
                name: 'addCustomPriceToLineItem',
                expectedArguments: [10, { some: 'lineItem' }, 10000, true],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'addCustomPriceToLineItemSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteEdit',
                    methodName: 'addCustomPriceToLineItemFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'sendQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.SendQuote.Type,
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: {
                    data: { id: 10 },
                    sendDetails: {
                        user: { email: 'ross.edfort@wazeedigital.com' },
                        billingAccount: { id: 20, salesOwner: 'ross', paymentTermsDays: '4' },
                        invoiceContact: { id: 123 },
                        salesManager: {
                            salesManager: 'sven.peterson@wazeedigital.com',
                            offlineAgreement: 'OFFL-1234',
                            expirationDate: '2017-03-22T06:00:00.000Z',
                        },
                    }
                }
            },
            serviceMethod: {
                name: 'sendQuote',
                expectedArguments: [10, 'ross.edfort@wazeedigital.com', {
                        expirationDate: new Date('2017/03/22'),
                        agreementId: 'OFFL-1234',
                        salesManager: 'sven.peterson@wazeedigital.com',
                        billingAccountId: 20,
                        invoiceContactType: 'User',
                        invoiceContactId: 123,
                        paymentTermsDays: '4',
                        salesOwner: 'ross'
                    }],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'sendQuoteSuccess',
                    expectedArguments: [10, 'ross.edfort@wazeedigital.com']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'sendQuoteSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.SendQuoteSuccess.Type,
                quoteId: 10,
                ownerEmail: 'ross.edfort@wazeedigital.com'
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'router',
                        methodName: 'goToQuoteById',
                        expectedArguments: [10]
                    }, {
                        sectionName: 'quoteEdit',
                        methodName: 'load',
                        expectedArguments: null,
                    }, {
                        sectionName: 'snackbar',
                        methodName: 'display',
                        expectedArguments: ['QUOTE.CREATED_FOR_TOAST', { emailAddress: 'ross.edfort@wazeedigital.com' }]
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'cloneQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.CloneQuote.Type,
                quote: { some: 'quote' }
            },
            serviceMethod: {
                name: 'cloneQuote',
                expectedArguments: [{ some: 'quote' }],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'cloneQuoteSuccess',
                    expectedArguments: [{ some: 'quote' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'cloneQuoteSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.CloneQuoteSuccess.Type
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'router',
                        methodName: 'goToActiveQuote',
                        expectedArguments: null,
                    }, {
                        sectionName: 'snackbar',
                        methodName: 'display',
                        expectedArguments: ['QUOTE.UPDATED']
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'createQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.CreateQuote.Type
            },
            serviceMethod: {
                name: 'createQuote',
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'updateQuoteFields',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.UpdateQuoteFields.Type,
                options: { some: 'field' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { some: 'quote' } }
            },
            serviceMethod: {
                name: 'updateQuoteField',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [{ some: 'field' }, { some: 'quote' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addFeeTo',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddFeeTo.Type,
                project: { project: 'some project' },
                fee: 100
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'addFeeTo',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { project: 'some project' }, 100],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeFee',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RemoveFee.Type,
                fee: 100
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'removeFee',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, 100],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'bulkImport',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.BulkImport.Type,
                rawAssets: { attribute: 'some attribute' },
                projectId: '3'
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'bulkImport',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { attribute: 'some attribute' }, '3'],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'bulkImportSuccess',
                    expectedArguments: [{ some: 'quote' }, { attribute: 'some attribute' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'bulkImportSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.BulkImportSuccess.Type,
                rawAssets: { lineItemAttributes: 'attribute' }
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'snackbar',
                        methodName: 'display',
                        expectedArguments: ['QUOTE.BULK_IMPORT.CONFIRMATION', { numOfAssets: 'attribute'.split('\n').length }]
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'editLineItem',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.EditLineItem.Type,
                lineItem: { lineItem: 'some item' },
                fieldToEdit: { fieldToEdit: 'some field' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'editLineItem',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { lineItem: 'some item' }, { fieldToEdit: 'some field' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAssetToProjectInQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddAssetToProjectInQuote.Type,
                parameters: { lineItem: { asset: { assetId: 12 } } }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1, projects: [{ name: 'project1' }, { name: 'project2' }] } }
            },
            serviceMethod: {
                name: 'addAssetToProjectInQuote',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, ['project1', 'project2'], { lineItem: { asset: { assetId: 12 } } }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'addAssetToProjectInQuoteSuccess',
                    expectedArguments: [{ some: 'quote' }, 12]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAssetToProjectInQuoteSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddAssetToProjectInQuoteSuccess.Type,
                quote: { some: 'quote' },
                assetId: 1
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'snackbar',
                        methodName: 'display',
                        expectedArguments: ['ASSET.ADD_TO_QUOTE_TOAST', { assetId: 1 }]
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addProject',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddProject.Type
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'addProject',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeProject',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RemoveProject.Type,
                projectId: 3
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'removeProject',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, 3],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'updateProject',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.UpdateProject.Type,
                project: { project: 'some project' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'updateProject',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { project: 'some project' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'moveLineItem',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.MoveLineItem.Type,
                project: { project: 'some project' },
                lineItem: { lineItem: 1 }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'moveLineItem',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { project: 'some project' }, { lineItem: 1 }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'cloneLineItem',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.CloneLineItem.Type,
                lineItem: { lineItem: 1 }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'cloneLineItem',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { lineItem: 1 }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'refreshAndNotify',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.RefreshAndNotify.Type,
                quote: { some: 'quote' },
                translationString: 'SOME.TRANSLATION'
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'snackbar',
                        methodName: 'display',
                        expectedArguments: ['SOME.TRANSLATION']
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'editLineItemMarkers',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.EditLineItemMarkers.Type,
                lineItem: { lineItem: 'item' },
                newMarkers: { newMarkers: { timeStart: 1, timeEnd: 4 } }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'editLineItemMarkers',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { lineItem: 'item' }, { newMarkers: { timeStart: 1, timeEnd: 4 } }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'updateProjectPriceAttributes',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.UpdateProjectPriceAttributes.Type,
                priceAttributes: { priceAttributes: { attribute: 4 } },
                project: { project: 'project' }
            },
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 1 } }
            },
            serviceMethod: {
                name: 'updateProjectPriceAttributes',
                returnsObservableOf: { some: 'quote' },
                expectedArguments: [1, { priceAttributes: { attribute: 4 } }, { project: 'project' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addUserToQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddUserToQuote.Type,
                user: { accountId: 1 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'account',
                    methodName: 'getAccountForQuoteAdminOnUserAdd',
                    expectedArguments: [1]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addBillingAccountToQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteEditActions.AddBillingAccountToQuote.Type,
                account: { id: 1 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'account',
                    methodName: 'getAccountForQuoteAdmin',
                    expectedArguments: [1]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addNote',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 111 } }
            },
            inputAction: {
                type: QuoteEditActions.AddNote.Type,
                note: 'some note',
                lineItem: { some: 'lineItem' }
            },
            serviceMethod: {
                name: 'addNote',
                expectedArguments: [111, 'some note', { some: 'lineItem' }],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
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
            state: {
                storeSectionName: 'quoteEdit',
                value: { data: { id: 111 } }
            },
            inputAction: {
                type: QuoteEditActions.RemoveNote.Type,
                lineItem: { some: 'lineItem' }
            },
            serviceMethod: {
                name: 'removeNote',
                expectedArguments: [111, { some: 'lineItem' }],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteEdit',
                    methodName: 'refreshAndNotify',
                    expectedArguments: [{ some: 'quote' }, 'QUOTE.UPDATED']
                },
                failure: {
                    sectionName: 'error',
                    methodName: 'handle'
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXlEO0FBQ3pELDJEQUF3RDtBQUN4RCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUkscUNBQWdCLENBQ3pCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2pDO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN2QztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUN2QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFVBQVUsRUFBRSxhQUFhO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLFFBQVE7WUFDcEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsV0FBVztn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LENBQUMsSUFBSTtnQkFDdEMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTthQUMvQjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7Z0JBQzlDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN2QztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFVBQVUsRUFBRSxrQkFBa0I7b0JBQzlCLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsZUFBZSxDQUFDO2lCQUN4RDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLFVBQVUsRUFBRSxRQUFRO2lCQUNyQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBanpCRCxvQkFpekJDIiwiZmlsZSI6ImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUXVvdGVFZGl0QWN0aW9ucyBmcm9tICcuL3F1b3RlLWVkaXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBRdW90ZUVkaXRFZmZlY3RzIH0gZnJvbSAnLi9xdW90ZS1lZGl0LmVmZmVjdHMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IGFueSB7XG4gICAgICByZXR1cm4gbmV3IFF1b3RlRWRpdEVmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkxvYWQuVHlwZVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2RlbGV0ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogMSB9IH1cbiAgICAgIH0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkRlbGV0ZS5UeXBlXG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZGVsZXRlJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxXSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGVsZXRlU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGVsZXRlRmFpbHVyZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnY2hhbmdlUm91dGVPbkRlbGV0ZVN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5EZWxldGVTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub1F1b3RlcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZWRpdExpbmVJdGVtRnJvbURldGFpbHMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5FZGl0TGluZUl0ZW1Gcm9tRGV0YWlscy5UeXBlLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMycsXG4gICAgICAgIG1hcmtlcnM6IHsgaW46IDEsIG91dDogMiB9LFxuICAgICAgICBhdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGUnIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogNzcsIHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSB9XSB9XSB9IH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscycsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzc3LCB7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSB9LCB7IGluOiAxLCBvdXQ6IDIgfSwgeyBzb21lOiAnYXR0cmlidXRlJyB9XVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdlZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2VkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrYmFyT25FZGl0TGluZUl0ZW1TdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzLlR5cGUsXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQVNTRVQuREVUQUlMLlFVT1RFX0lURU1fVVBEQVRFRCddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3JlbW92ZUFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlQXNzZXQuVHlwZSxcbiAgICAgICAgYXNzZXQ6IHsgc29tZTogJ2Fzc2V0JyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2RhdGEnLFxuICAgICAgICB2YWx1ZTogeyBpZDogeyBzb21lOiAncXVvdGVJZCcgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAncmVtb3ZlQXNzZXQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlSWQnIH0sIHsgc29tZTogJ2Fzc2V0JyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVtb3ZlQXNzZXRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZW1vdmVBc3NldEZhaWx1cmUnLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjaGFuZ2VSb3V0ZU9uUmVtb3ZlQXNzZXRTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub0FjdGl2ZVF1b3RlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrYmFyT25SZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydRVU9URS5SRU1PVkVfQVNTRVQuU1VDQ0VTUyddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZEN1c3RvbVByaWNlVG9MaW5lSXRlbScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbS5UeXBlLFxuICAgICAgICBsaW5lSXRlbTogeyBzb21lOiAnbGluZUl0ZW0nIH0sXG4gICAgICAgIHByaWNlOiAxMDAwMCxcbiAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogMTAgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMCwgeyBzb21lOiAnbGluZUl0ZW0nIH0sIDEwMDAwLCB0cnVlXSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtRmFpbHVyZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2VuZFF1b3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuU2VuZFF1b3RlLlR5cGUsXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgZGF0YTogeyBpZDogMTAgfSxcbiAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgdXNlcjogeyBlbWFpbDogJ3Jvc3MuZWRmb3J0QHdhemVlZGlnaXRhbC5jb20nIH0sXG4gICAgICAgICAgICBiaWxsaW5nQWNjb3VudDogeyBpZDogMjAsIHNhbGVzT3duZXI6ICdyb3NzJywgcGF5bWVudFRlcm1zRGF5czogJzQnIH0sXG4gICAgICAgICAgICBpbnZvaWNlQ29udGFjdDogeyBpZDogMTIzIH0sXG4gICAgICAgICAgICBzYWxlc01hbmFnZXI6IHtcbiAgICAgICAgICAgICAgc2FsZXNNYW5hZ2VyOiAnc3Zlbi5wZXRlcnNvbkB3YXplZWRpZ2l0YWwuY29tJyxcbiAgICAgICAgICAgICAgb2ZmbGluZUFncmVlbWVudDogJ09GRkwtMTIzNCcsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiAnMjAxNy0wMy0yMlQwNjowMDowMC4wMDBaJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnc2VuZFF1b3RlJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMCwgJ3Jvc3MuZWRmb3J0QHdhemVlZGlnaXRhbC5jb20nLCB7XG4gICAgICAgICAgZXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKCcyMDE3LzAzLzIyJyksXG4gICAgICAgICAgYWdyZWVtZW50SWQ6ICdPRkZMLTEyMzQnLFxuICAgICAgICAgIHNhbGVzTWFuYWdlcjogJ3N2ZW4ucGV0ZXJzb25Ad2F6ZWVkaWdpdGFsLmNvbScsXG4gICAgICAgICAgYmlsbGluZ0FjY291bnRJZDogMjAsXG4gICAgICAgICAgaW52b2ljZUNvbnRhY3RUeXBlOiAnVXNlcicsXG4gICAgICAgICAgaW52b2ljZUNvbnRhY3RJZDogMTIzLFxuICAgICAgICAgIHBheW1lbnRUZXJtc0RheXM6ICc0JyxcbiAgICAgICAgICBzYWxlc093bmVyOiAncm9zcydcbiAgICAgICAgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3NlbmRRdW90ZVN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMTAsICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2VuZFF1b3RlU3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLlNlbmRRdW90ZVN1Y2Nlc3MuVHlwZSxcbiAgICAgICAgcXVvdGVJZDogMTAsXG4gICAgICAgIG93bmVyRW1haWw6ICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiBbe1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub1F1b3RlQnlJZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IG51bGwsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnUVVPVEUuQ1JFQVRFRF9GT1JfVE9BU1QnLCB7IGVtYWlsQWRkcmVzczogJ3Jvc3MuZWRmb3J0QHdhemVlZGlnaXRhbC5jb20nIH1dXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjbG9uZVF1b3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQ2xvbmVRdW90ZS5UeXBlLFxuICAgICAgICBxdW90ZTogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdjbG9uZVF1b3RlJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Nsb25lUXVvdGVTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjbG9uZVF1b3RlU3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkNsb25lUXVvdGVTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW3tcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3JvdXRlcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2dvVG9BY3RpdmVRdW90ZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IG51bGwsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnUVVPVEUuVVBEQVRFRCddXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjcmVhdGVRdW90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkNyZWF0ZVF1b3RlLlR5cGVcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdjcmVhdGVRdW90ZScsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAndXBkYXRlUXVvdGVGaWVsZHMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5VcGRhdGVRdW90ZUZpZWxkcy5UeXBlLFxuICAgICAgICBvcHRpb25zOiB7IHNvbWU6ICdmaWVsZCcgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IHNvbWU6ICdxdW90ZScgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAndXBkYXRlUXVvdGVGaWVsZCcsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2ZpZWxkJyB9LCB7IHNvbWU6ICdxdW90ZScgfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkRmVlVG8nLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5BZGRGZWVUby5UeXBlLFxuICAgICAgICBwcm9qZWN0OiB7IHByb2plY3Q6ICdzb21lIHByb2plY3QnIH0sXG4gICAgICAgIGZlZTogMTAwXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkRmVlVG8nLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdxdW90ZScgfSxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxLCB7IHByb2plY3Q6ICdzb21lIHByb2plY3QnIH0sIDEwMF0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAncmVtb3ZlRmVlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlRmVlLlR5cGUsXG4gICAgICAgIGZlZTogMTAwXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAncmVtb3ZlRmVlJyxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH0sXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMSwgMTAwXSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfSwgJ1FVT1RFLlVQREFURUQnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdidWxrSW1wb3J0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQnVsa0ltcG9ydC5UeXBlLFxuICAgICAgICByYXdBc3NldHM6IHsgYXR0cmlidXRlOiAnc29tZSBhdHRyaWJ1dGUnIH0sXG4gICAgICAgIHByb2plY3RJZDogJzMnXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYnVsa0ltcG9ydCcsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgYXR0cmlidXRlOiAnc29tZSBhdHRyaWJ1dGUnIH0sICczJ10sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2J1bGtJbXBvcnRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9LCB7IGF0dHJpYnV0ZTogJ3NvbWUgYXR0cmlidXRlJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdidWxrSW1wb3J0U3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkJ1bGtJbXBvcnRTdWNjZXNzLlR5cGUsXG4gICAgICAgIHJhd0Fzc2V0czogeyBsaW5lSXRlbUF0dHJpYnV0ZXM6ICdhdHRyaWJ1dGUnIH1cblxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiBbe1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydRVU9URS5CVUxLX0lNUE9SVC5DT05GSVJNQVRJT04nLCB7IG51bU9mQXNzZXRzOiAnYXR0cmlidXRlJy5zcGxpdCgnXFxuJykubGVuZ3RoIH1dXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdlZGl0TGluZUl0ZW0nLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5FZGl0TGluZUl0ZW0uVHlwZSxcbiAgICAgICAgbGluZUl0ZW06IHsgbGluZUl0ZW06ICdzb21lIGl0ZW0nIH0sXG4gICAgICAgIGZpZWxkVG9FZGl0OiB7IGZpZWxkVG9FZGl0OiAnc29tZSBmaWVsZCcgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiAxIH0gfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2VkaXRMaW5lSXRlbScsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgbGluZUl0ZW06ICdzb21lIGl0ZW0nIH0sIHsgZmllbGRUb0VkaXQ6ICdzb21lIGZpZWxkJyB9XSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfSwgJ1FVT1RFLlVQREFURUQnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdhZGRBc3NldFRvUHJvamVjdEluUXVvdGUnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5BZGRBc3NldFRvUHJvamVjdEluUXVvdGUuVHlwZSxcbiAgICAgICAgcGFyYW1ldGVyczogeyBsaW5lSXRlbTogeyBhc3NldDogeyBhc3NldElkOiAxMiB9IH0gfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiAxLCBwcm9qZWN0czogW3sgbmFtZTogJ3Byb2plY3QxJyB9LCB7IG5hbWU6ICdwcm9qZWN0MicgfV0gfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkQXNzZXRUb1Byb2plY3RJblF1b3RlJyxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH0sXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMSwgWydwcm9qZWN0MScsICdwcm9qZWN0MiddLCB7IGxpbmVJdGVtOiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEyIH0gfSB9XSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnYWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfSwgMTJdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5BZGRBc3NldFRvUHJvamVjdEluUXVvdGVTdWNjZXNzLlR5cGUsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfSxcbiAgICAgICAgYXNzZXRJZDogMVxuXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFt7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzbmFja2JhcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ0FTU0VULkFERF9UT19RVU9URV9UT0FTVCcsIHsgYXNzZXRJZDogMSB9XVxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkUHJvamVjdCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLkFkZFByb2plY3QuVHlwZVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiAxIH0gfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2FkZFByb2plY3QnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdxdW90ZScgfSxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxXSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfSwgJ1FVT1RFLlVQREFURUQnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZW1vdmVQcm9qZWN0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlUHJvamVjdC5UeXBlLFxuICAgICAgICBwcm9qZWN0SWQ6IDNcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogMSB9IH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVQcm9qZWN0JyxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH0sXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMSwgM10sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAndXBkYXRlUHJvamVjdCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVByb2plY3QuVHlwZSxcbiAgICAgICAgcHJvamVjdDogeyBwcm9qZWN0OiAnc29tZSBwcm9qZWN0JyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAndXBkYXRlUHJvamVjdCcsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgcHJvamVjdDogJ3NvbWUgcHJvamVjdCcgfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbW92ZUxpbmVJdGVtJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuTW92ZUxpbmVJdGVtLlR5cGUsXG4gICAgICAgIHByb2plY3Q6IHsgcHJvamVjdDogJ3NvbWUgcHJvamVjdCcgfSxcbiAgICAgICAgbGluZUl0ZW06IHsgbGluZUl0ZW06IDEgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiAxIH0gfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ21vdmVMaW5lSXRlbScsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgcHJvamVjdDogJ3NvbWUgcHJvamVjdCcgfSwgeyBsaW5lSXRlbTogMSB9XSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdxdW90ZScgfSwgJ1FVT1RFLlVQREFURUQnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjbG9uZUxpbmVJdGVtJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQ2xvbmVMaW5lSXRlbS5UeXBlLFxuICAgICAgICBsaW5lSXRlbTogeyBsaW5lSXRlbTogMSB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnY2xvbmVMaW5lSXRlbScsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgbGluZUl0ZW06IDEgfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLlJlZnJlc2hBbmROb3RpZnkuVHlwZSxcbiAgICAgICAgcXVvdGU6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICB0cmFuc2xhdGlvblN0cmluZzogJ1NPTUUuVFJBTlNMQVRJT04nXG5cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW3tcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnU09NRS5UUkFOU0xBVElPTiddXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdlZGl0TGluZUl0ZW1NYXJrZXJzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtTWFya2Vycy5UeXBlLFxuICAgICAgICBsaW5lSXRlbTogeyBsaW5lSXRlbTogJ2l0ZW0nIH0sXG4gICAgICAgIG5ld01hcmtlcnM6IHsgbmV3TWFya2VyczogeyB0aW1lU3RhcnQ6IDEsIHRpbWVFbmQ6IDQgfSB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZWRpdExpbmVJdGVtTWFya2VycycsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgbGluZUl0ZW06ICdpdGVtJyB9LCB7IG5ld01hcmtlcnM6IHsgdGltZVN0YXJ0OiAxLCB0aW1lRW5kOiA0IH0gfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlZnJlc2hBbmROb3RpZnknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH0sICdRVU9URS5VUERBVEVEJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAndXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMuVHlwZSxcbiAgICAgICAgcHJpY2VBdHRyaWJ1dGVzOiB7IHByaWNlQXR0cmlidXRlczogeyBhdHRyaWJ1dGU6IDQgfSB9LFxuICAgICAgICBwcm9qZWN0OiB7IHByb2plY3Q6ICdwcm9qZWN0JyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3F1b3RlRWRpdCcsXG4gICAgICAgIHZhbHVlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAndXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlcycsXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsIHsgcHJpY2VBdHRyaWJ1dGVzOiB7IGF0dHJpYnV0ZTogNCB9IH0sIHsgcHJvamVjdDogJ3Byb2plY3QnIH1dLFxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZWZyZXNoQW5kTm90aWZ5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9LCAnUVVPVEUuVVBEQVRFRCddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZFVzZXJUb1F1b3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQWRkVXNlclRvUXVvdGUuVHlwZSxcbiAgICAgICAgdXNlcjogeyBhY2NvdW50SWQ6IDEgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY2NvdW50JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkQmlsbGluZ0FjY291bnRUb1F1b3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQWRkQmlsbGluZ0FjY291bnRUb1F1b3RlLlR5cGUsXG4gICAgICAgIGFjY291bnQ6IHsgaWQ6IDEgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY2NvdW50JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW4nLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkTm90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAncXVvdGVFZGl0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBpZDogMTExIH0gfVxuICAgICAgfSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlRWRpdEFjdGlvbnMuQWRkTm90ZS5UeXBlLFxuICAgICAgICBub3RlOiAnc29tZSBub3RlJyxcbiAgICAgICAgbGluZUl0ZW06IHsgc29tZTogJ2xpbmVJdGVtJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkTm90ZScsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMTExLCAnc29tZSBub3RlJywgeyBzb21lOiAnbGluZUl0ZW0nIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZWZyZXNoQW5kTm90aWZ5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9LCAnUVVPVEUuVVBEQVRFRCddXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaGFuZGxlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZW1vdmVOb3RlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICB2YWx1ZTogeyBkYXRhOiB7IGlkOiAxMTEgfSB9XG4gICAgICB9LFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUXVvdGVFZGl0QWN0aW9ucy5SZW1vdmVOb3RlLlR5cGUsXG4gICAgICAgIGxpbmVJdGVtOiB7IHNvbWU6ICdsaW5lSXRlbScgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZU5vdGUnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzExMSwgeyBzb21lOiAnbGluZUl0ZW0nIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdxdW90ZUVkaXQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZWZyZXNoQW5kTm90aWZ5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ3F1b3RlJyB9LCAnUVVPVEUuVVBEQVRFRCddXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaGFuZGxlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
