import { PriceAttribute } from '../../shared/interfaces/commerce.interface';
import { ActionFactory, InternalActionFactory } from './quote-edit.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Quote Edit Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: []
      },
      expectedAction: {
        type: '[Quote Edit] Load'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'delete',
        parameters: []
      },
      expectedAction: {
        type: '[Quote Edit] Delete'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'editLineItemFromDetails',
        parameters: ['abc-123', { in: 1, out: 2 }, { some: 'attribute' }]
      },
      expectedAction: {
        type: '[Quote Edit] Edit Line Item From Details',
        uuid: 'abc-123',
        markers: { in: 1, out: 2 },
        attributes: { some: 'attribute' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addCustomPriceToLineItem',
        parameters: [{ some: 'lineItem' }, 1000, true]
      },
      expectedAction: {
        type: '[Quote Edit] Add Custom Price To LineItem',
        lineItem: { some: 'lineItem' },
        price: 1000,
        override: true
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Load Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Edit] Load Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'deleteSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Delete Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'deleteFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Edit] Delete Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'editLineItemFromDetailsSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Edit Line Item From Details Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'editLineItemFromDetailsFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Edit] Edit Line Item From Details Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'removeAsset',
        parameters: [{ some: 'asset' }]
      },
      expectedAction: {
        type: '[Quote Edit] Remove Asset',
        asset: { some: 'asset' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'removeAssetSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Remove Asset Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'removeAssetFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Edit] Remove Asset Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addCustomPriceToLineItemSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Custom Price To LineItem Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addCustomPriceToLineItemFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Custom Price To LineItem Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'sendQuote',
        parameters: []
      },
      expectedAction: {
        type: '[Quote Edit] Send Quote'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'sendQuoteSuccess',
        parameters: [10, 'ross.edfort@wazeedigital.com']
      },
      expectedAction: {
        type: '[Quote Edit] Send Quote Success',
        quoteId: 10,
        ownerEmail: 'ross.edfort@wazeedigital.com'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'saveRecipientInformationOnQuote',
        parameters: [{
          ownerEmail: 'ross.edfort@wazeedigital.com',
          expirationDate: '2017-03-22T06:00:00.000Z',
          purchaseType: 'Standard'
        }]
      },
      expectedAction: {
        type: '[Quote Edit] Save Recipient Information On Quote',
        quoteOptions: {
          ownerEmail: 'ross.edfort@wazeedigital.com',
          expirationDate: '2017-03-22T06:00:00.000Z',
          purchaseType: 'Standard'
        }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'cloneQuote',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Clone Quote',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'cloneQuoteSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Edit] Clone Quote Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'createQuote',
        parameters: []
      },
      expectedAction: {
        type: '[Quote Edit] Create Quote',
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateQuoteField',
        parameters: [{ field: 'some field' }]
      },
      expectedAction: {
        type: '[Quote Edit] Update Quote Fields',
        options: { field: 'some field' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addFeeTo',
        parameters: ['some project', '100']
      },
      expectedAction: {
        type: '[Quote Edit] Add Fee To',
        project: 'some project',
        fee: '100'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'removeFee',
        parameters: ['100']
      },
      expectedAction: {
        type: '[Quote Edit] Remove Fee',
        fee: '100'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'bulkImport',
        parameters: [{ attribute: 'some attribute' }, '1']
      },
      expectedAction: {
        type: '[Quote Edit] Bulk Import',
        rawAssets: { attribute: 'some attribute' },
        projectId: '1'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'bulkImportSuccess',
        parameters: [{ some: 'quote' }, { attribute: 'some attribute' }]
      },
      expectedAction: {
        type: '[Quote Edit] Bulk Import Success',
        quote: { some: 'quote' },
        rawAssets: { attribute: 'some attribute' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'editLineItem',
        parameters: [{ lineItem: 'some item' }, { fieldToEdit: 'some field' }]
      },
      expectedAction: {
        type: '[Quote Edit] Edit Line Item',
        lineItem: { lineItem: 'some item' },
        fieldToEdit: { fieldToEdit: 'some field' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addAssetToProjectInQuote',
        parameters: [{ parameters: 'some parameteres' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Asset To Project In Quote',
        parameters: { parameters: 'some parameteres' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'addAssetToProjectInQuoteSuccess',
        parameters: [{ some: 'quote' }, { assetId: 2 }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Asset To Project In Quote Success',
        quote: { some: 'quote' },
        assetId: { assetId: 2 }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addProject',
        parameters: []
      },
      expectedAction: {
        type: '[Quote Edit] Add Project'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'removeProject',
        parameters: [1]
      },
      expectedAction: {
        type: '[Quote Edit] Remove Project',
        projectId: 1
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateProject',
        parameters: [{ project: 'some project' }]
      },
      expectedAction: {
        type: '[Quote Edit] Update Project',
        project: { project: 'some project' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'moveLineItem',
        parameters: [{ project: 'some project' }, { lineItem: 'some item' }]
      },
      expectedAction: {
        type: '[Quote Edit] Move Line Item',
        project: { project: 'some project' },
        lineItem: { lineItem: 'some item' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'cloneLineItem',
        parameters: [{ lineItem: 'some item' }]
      },
      expectedAction: {
        type: '[Quote Edit] Clone Line Item',
        lineItem: { lineItem: 'some item' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'refreshAndNotify',
        parameters: [{ some: 'quote' }, 'SOME.TRANSLATION']
      },
      expectedAction: {
        type: '[Quote Edit] Refresh And Notify',
        quote: { some: 'quote' },
        translationString: 'SOME.TRANSLATION'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'editLineItemMarkers',
        parameters: [{ lineItem: 'quote' }, { newMarkers: { timeStart: 1, timeEnd: 4 } }]
      },
      expectedAction: {
        type: '[Quote Edit] Edit Line Item Markers',
        lineItem: { lineItem: 'quote' },
        newMarkers: { newMarkers: { timeStart: 1, timeEnd: 4 } }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateProjectPriceAttributes',
        parameters: [{ priceAttributes: { attribute: 4 } }, { project: 'project' }]
      },
      expectedAction: {
        type: '[Quote Edit] Update Project Price Attributes',
        priceAttributes: { priceAttributes: { attribute: 4 } },
        project: { project: 'project' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addUserToQuote',
        parameters: [{ user: 'Some User' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add User To Quote',
        user: { user: 'Some User' },
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addBillingAccountToQuote',
        parameters: [{ account: 'Some Account' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Billing Account To Quote',
        account: { account: 'Some Account' },
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addInvoiceContactToQuote',
        parameters: [{ userId: 1 }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Invoice Contact To Quote',
        userId: { userId: 1 },
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'initializeSalesManagerFormOnQuote',
        parameters: [{ emailAddress: 'email@email.com' }, { defaultDate: '2017/12/12' }]
      },
      expectedAction: {
        type: '[Quote Edit] Initialize Sales Manager Form On Quote',
        emailAddress: { emailAddress: 'email@email.com' },
        defaultDate: { defaultDate: '2017/12/12' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateSalesManagerFormOnQuote',
        parameters: [{ form: 'formData' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Sales Manager Form On Quote',
        form: { form: 'formData' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addNote',
        parameters: ['some note', { some: 'lineItem' }]
      },
      expectedAction: {
        type: '[Quote Edit] Add Note',
        note: 'some note',
        lineItem: { some: 'lineItem' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'removeNoteFrom',
        parameters: [{ some: 'lineItem' }]
      },
      expectedAction: {
        type: '[Quote Edit] Remove Note',
        lineItem: { some: 'lineItem' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'overrideInvoiceContact',
        parameters: [{ some: 'contact' }]
      },
      expectedAction: {
        type: '[Quote Edit] Override Invoice Contact',
        contact: { some: 'contact' }
      }
    });
  });
}
