import * as QuoteEditActions from './quote-edit.actions';
import { QuoteEditEffects } from './quote-edit.effects';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Quote Edit Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new QuoteEditEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
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
