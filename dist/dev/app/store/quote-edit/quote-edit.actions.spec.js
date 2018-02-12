"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_edit_actions_1 = require("./quote-edit.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Quote Edit Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.ActionFactory,
                name: 'load',
                parameters: []
            },
            expectedAction: {
                type: '[Quote Edit] Load'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.ActionFactory,
                name: 'delete',
                parameters: []
            },
            expectedAction: {
                type: '[Quote Edit] Delete'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
                name: 'sendQuote',
                parameters: []
            },
            expectedAction: {
                type: '[Quote Edit] Send Quote'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
                name: 'createQuote',
                parameters: []
            },
            expectedAction: {
                type: '[Quote Edit] Create Quote',
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
                name: 'addProject',
                parameters: []
            },
            expectedAction: {
                type: '[Quote Edit] Add Project'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.InternalActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
                class: quote_edit_actions_1.ActionFactory,
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
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkRBQTRFO0FBQzVFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1CQUFtQjthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxxQkFBcUI7YUFDNUI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLHlCQUF5QjtnQkFDL0IsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDbEU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDBDQUEwQztnQkFDaEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUMxQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDL0M7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDJDQUEyQztnQkFDakQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDOUIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxhQUFhO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsMENBQXFCO2dCQUM1QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw2QkFBNkI7Z0JBQ25DLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxnQ0FBZ0M7Z0JBQ3RDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxrREFBa0Q7Z0JBQ3hELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxnQ0FBZ0M7Z0JBQ3RDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxrREFBa0Q7Z0JBQ3hELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxtQ0FBbUM7Z0JBQ3pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxtQ0FBbUM7Z0JBQ3pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxtREFBbUQ7Z0JBQ3pELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxtREFBbUQ7Z0JBQ3pELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHlCQUF5QjthQUNoQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLDhCQUE4QixDQUFDO2FBQ2pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFVBQVUsRUFBRSw4QkFBOEI7YUFDM0M7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLGlDQUFpQztnQkFDdkMsVUFBVSxFQUFFLENBQUM7d0JBQ1gsVUFBVSxFQUFFLDhCQUE4Qjt3QkFDMUMsY0FBYyxFQUFFLDBCQUEwQjt3QkFDMUMsWUFBWSxFQUFFLFVBQVU7cUJBQ3pCLENBQUM7YUFDSDtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsa0RBQWtEO2dCQUN4RCxZQUFZLEVBQUU7b0JBQ1osVUFBVSxFQUFFLDhCQUE4QjtvQkFDMUMsY0FBYyxFQUFFLDBCQUEwQjtvQkFDMUMsWUFBWSxFQUFFLFVBQVU7aUJBQ3pCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxrQ0FBa0M7Z0JBQ3hDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDJCQUEyQjthQUNsQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixVQUFVLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQzthQUN0QztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxVQUFVO2dCQUNoQixVQUFVLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO2FBQ3BDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx5QkFBeUI7Z0JBQy9CLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixHQUFHLEVBQUUsS0FBSzthQUNYO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUM7YUFDcEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHlCQUF5QjtnQkFDL0IsR0FBRyxFQUFFLEtBQUs7YUFDWDtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLENBQUM7YUFDbkQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDBCQUEwQjtnQkFDaEMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUMxQyxTQUFTLEVBQUUsR0FBRzthQUNmO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsMENBQXFCO2dCQUM1QixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ2pFO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxrQ0FBa0M7Z0JBQ3hDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQ3hCLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsY0FBYztnQkFDcEIsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLENBQUM7YUFDdkU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtnQkFDbkMsV0FBVyxFQUFFLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw0Q0FBNEM7Z0JBQ2xELFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRTthQUMvQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGlDQUFpQztnQkFDdkMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDaEQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9EQUFvRDtnQkFDMUQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtnQkFDeEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTthQUN4QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMEJBQTBCO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxlQUFlO2dCQUNyQixVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsU0FBUyxFQUFFLENBQUM7YUFDYjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsZUFBZTtnQkFDckIsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7YUFDMUM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTthQUNyQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsY0FBYztnQkFDcEIsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDckU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTtnQkFDcEMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTthQUNwQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsZUFBZTtnQkFDckIsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDeEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDhCQUE4QjtnQkFDcEMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTthQUNwQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsa0JBQWtCLENBQUM7YUFDcEQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGlDQUFpQztnQkFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtnQkFDeEIsaUJBQWlCLEVBQUUsa0JBQWtCO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUNsRjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUscUNBQXFDO2dCQUMzQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2dCQUMvQixVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTthQUN6RDtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsOEJBQThCO2dCQUNwQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQzVFO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw4Q0FBOEM7Z0JBQ3BELGVBQWUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEQsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTthQUNoQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzthQUNwQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDO2FBQzFDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwyQ0FBMkM7Z0JBQ2pELE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUU7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxrQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLDBCQUEwQjtnQkFDaEMsVUFBVSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDNUI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDJDQUEyQztnQkFDakQsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsbUNBQW1DO2dCQUN6QyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxDQUFDO2FBQ2pGO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxxREFBcUQ7Z0JBQzNELFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtnQkFDakQsV0FBVyxFQUFFLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsK0JBQStCO2dCQUNyQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzthQUNuQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsOENBQThDO2dCQUNwRCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2FBQzNCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxTQUFTO2dCQUNmLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzthQUNoRDtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixJQUFJLEVBQUUsV0FBVztnQkFDakIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGtDQUFhO2dCQUNwQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzthQUNuQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2FBQy9CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx1Q0FBdUM7Z0JBQzdDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDN0I7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuakJELG9CQW1qQkMiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLWVkaXQvcXVvdGUtZWRpdC5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmljZUF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1b3RlLWVkaXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdRdW90ZSBFZGl0IEFjdGlvbiBGYWN0b3J5JywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBMb2FkJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdkZWxldGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gRGVsZXRlJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnYWJjLTEyMycsIHsgaW46IDEsIG91dDogMiB9LCB7IHNvbWU6ICdhdHRyaWJ1dGUnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBFZGl0IExpbmUgSXRlbSBGcm9tIERldGFpbHMnLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMycsXG4gICAgICAgIG1hcmtlcnM6IHsgaW46IDEsIG91dDogMiB9LFxuICAgICAgICBhdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGUnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2xpbmVJdGVtJyB9LCAxMDAwLCB0cnVlXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gQWRkIEN1c3RvbSBQcmljZSBUbyBMaW5lSXRlbScsXG4gICAgICAgIGxpbmVJdGVtOiB7IHNvbWU6ICdsaW5lSXRlbScgfSxcbiAgICAgICAgcHJpY2U6IDEwMDAsXG4gICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBMb2FkIFN1Y2Nlc3MnLFxuICAgICAgICBxdW90ZTogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2RlbGV0ZVN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBEZWxldGUgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2RlbGV0ZUZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBEZWxldGUgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2VkaXRMaW5lSXRlbUZyb21EZXRhaWxzU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEVkaXQgTGluZSBJdGVtIEZyb20gRGV0YWlscyBTdWNjZXNzJyxcbiAgICAgICAgcXVvdGU6IHsgc29tZTogJ3F1b3RlJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzIEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlQXNzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXNzZXQnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBSZW1vdmUgQXNzZXQnLFxuICAgICAgICBhc3NldDogeyBzb21lOiAnYXNzZXQnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBSZW1vdmUgQXNzZXQgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3JlbW92ZUFzc2V0RmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIFJlbW92ZSBBc3NldCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEFkZCBDdXN0b20gUHJpY2UgVG8gTGluZUl0ZW0gU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZEN1c3RvbVByaWNlVG9MaW5lSXRlbUZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBBZGQgQ3VzdG9tIFByaWNlIFRvIExpbmVJdGVtIEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2VuZFF1b3RlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIFNlbmQgUXVvdGUnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2VuZFF1b3RlU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxMCwgJ3Jvc3MuZWRmb3J0QHdhemVlZGlnaXRhbC5jb20nXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gU2VuZCBRdW90ZSBTdWNjZXNzJyxcbiAgICAgICAgcXVvdGVJZDogMTAsXG4gICAgICAgIG93bmVyRW1haWw6ICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzYXZlUmVjaXBpZW50SW5mb3JtYXRpb25PblF1b3RlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3tcbiAgICAgICAgICBvd25lckVtYWlsOiAncm9zcy5lZGZvcnRAd2F6ZWVkaWdpdGFsLmNvbScsXG4gICAgICAgICAgZXhwaXJhdGlvbkRhdGU6ICcyMDE3LTAzLTIyVDA2OjAwOjAwLjAwMFonLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ1N0YW5kYXJkJ1xuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gU2F2ZSBSZWNpcGllbnQgSW5mb3JtYXRpb24gT24gUXVvdGUnLFxuICAgICAgICBxdW90ZU9wdGlvbnM6IHtcbiAgICAgICAgICBvd25lckVtYWlsOiAncm9zcy5lZGZvcnRAd2F6ZWVkaWdpdGFsLmNvbScsXG4gICAgICAgICAgZXhwaXJhdGlvbkRhdGU6ICcyMDE3LTAzLTIyVDA2OjAwOjAwLjAwMFonLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ1N0YW5kYXJkJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Nsb25lUXVvdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBDbG9uZSBRdW90ZScsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Nsb25lUXVvdGVTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ3F1b3RlJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gQ2xvbmUgUXVvdGUgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjcmVhdGVRdW90ZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBDcmVhdGUgUXVvdGUnLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICd1cGRhdGVRdW90ZUZpZWxkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgZmllbGQ6ICdzb21lIGZpZWxkJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gVXBkYXRlIFF1b3RlIEZpZWxkcycsXG4gICAgICAgIG9wdGlvbnM6IHsgZmllbGQ6ICdzb21lIGZpZWxkJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZEZlZVRvJyxcbiAgICAgICAgcGFyYW1ldGVyczogWydzb21lIHByb2plY3QnLCAnMTAwJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEFkZCBGZWUgVG8nLFxuICAgICAgICBwcm9qZWN0OiAnc29tZSBwcm9qZWN0JyxcbiAgICAgICAgZmVlOiAnMTAwJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZW1vdmVGZWUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJzEwMCddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBSZW1vdmUgRmVlJyxcbiAgICAgICAgZmVlOiAnMTAwJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdidWxrSW1wb3J0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgYXR0cmlidXRlOiAnc29tZSBhdHRyaWJ1dGUnIH0sICcxJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEJ1bGsgSW1wb3J0JyxcbiAgICAgICAgcmF3QXNzZXRzOiB7IGF0dHJpYnV0ZTogJ3NvbWUgYXR0cmlidXRlJyB9LFxuICAgICAgICBwcm9qZWN0SWQ6ICcxJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2J1bGtJbXBvcnRTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ3F1b3RlJyB9LCB7IGF0dHJpYnV0ZTogJ3NvbWUgYXR0cmlidXRlJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gQnVsayBJbXBvcnQgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfSxcbiAgICAgICAgcmF3QXNzZXRzOiB7IGF0dHJpYnV0ZTogJ3NvbWUgYXR0cmlidXRlJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2VkaXRMaW5lSXRlbScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IGxpbmVJdGVtOiAnc29tZSBpdGVtJyB9LCB7IGZpZWxkVG9FZGl0OiAnc29tZSBmaWVsZCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEVkaXQgTGluZSBJdGVtJyxcbiAgICAgICAgbGluZUl0ZW06IHsgbGluZUl0ZW06ICdzb21lIGl0ZW0nIH0sXG4gICAgICAgIGZpZWxkVG9FZGl0OiB7IGZpZWxkVG9FZGl0OiAnc29tZSBmaWVsZCcgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGRBc3NldFRvUHJvamVjdEluUXVvdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBwYXJhbWV0ZXJzOiAnc29tZSBwYXJhbWV0ZXJlcycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEFkZCBBc3NldCBUbyBQcm9qZWN0IEluIFF1b3RlJyxcbiAgICAgICAgcGFyYW1ldGVyczogeyBwYXJhbWV0ZXJzOiAnc29tZSBwYXJhbWV0ZXJlcycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAncXVvdGUnIH0sIHsgYXNzZXRJZDogMiB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gQWRkIEFzc2V0IFRvIFByb2plY3QgSW4gUXVvdGUgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfSxcbiAgICAgICAgYXNzZXRJZDogeyBhc3NldElkOiAyIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkUHJvamVjdCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBBZGQgUHJvamVjdCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlUHJvamVjdCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gUmVtb3ZlIFByb2plY3QnLFxuICAgICAgICBwcm9qZWN0SWQ6IDFcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAndXBkYXRlUHJvamVjdCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHByb2plY3Q6ICdzb21lIHByb2plY3QnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBVcGRhdGUgUHJvamVjdCcsXG4gICAgICAgIHByb2plY3Q6IHsgcHJvamVjdDogJ3NvbWUgcHJvamVjdCcgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdtb3ZlTGluZUl0ZW0nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBwcm9qZWN0OiAnc29tZSBwcm9qZWN0JyB9LCB7IGxpbmVJdGVtOiAnc29tZSBpdGVtJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gTW92ZSBMaW5lIEl0ZW0nLFxuICAgICAgICBwcm9qZWN0OiB7IHByb2plY3Q6ICdzb21lIHByb2plY3QnIH0sXG4gICAgICAgIGxpbmVJdGVtOiB7IGxpbmVJdGVtOiAnc29tZSBpdGVtJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Nsb25lTGluZUl0ZW0nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBsaW5lSXRlbTogJ3NvbWUgaXRlbScgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIENsb25lIExpbmUgSXRlbScsXG4gICAgICAgIGxpbmVJdGVtOiB7IGxpbmVJdGVtOiAnc29tZSBpdGVtJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVmcmVzaEFuZE5vdGlmeScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdxdW90ZScgfSwgJ1NPTUUuVFJBTlNMQVRJT04nXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gUmVmcmVzaCBBbmQgTm90aWZ5JyxcbiAgICAgICAgcXVvdGU6IHsgc29tZTogJ3F1b3RlJyB9LFxuICAgICAgICB0cmFuc2xhdGlvblN0cmluZzogJ1NPTUUuVFJBTlNMQVRJT04nXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2VkaXRMaW5lSXRlbU1hcmtlcnMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBsaW5lSXRlbTogJ3F1b3RlJyB9LCB7IG5ld01hcmtlcnM6IHsgdGltZVN0YXJ0OiAxLCB0aW1lRW5kOiA0IH0gfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEVkaXQgTGluZSBJdGVtIE1hcmtlcnMnLFxuICAgICAgICBsaW5lSXRlbTogeyBsaW5lSXRlbTogJ3F1b3RlJyB9LFxuICAgICAgICBuZXdNYXJrZXJzOiB7IG5ld01hcmtlcnM6IHsgdGltZVN0YXJ0OiAxLCB0aW1lRW5kOiA0IH0gfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICd1cGRhdGVQcm9qZWN0UHJpY2VBdHRyaWJ1dGVzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgcHJpY2VBdHRyaWJ1dGVzOiB7IGF0dHJpYnV0ZTogNCB9IH0sIHsgcHJvamVjdDogJ3Byb2plY3QnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBVcGRhdGUgUHJvamVjdCBQcmljZSBBdHRyaWJ1dGVzJyxcbiAgICAgICAgcHJpY2VBdHRyaWJ1dGVzOiB7IHByaWNlQXR0cmlidXRlczogeyBhdHRyaWJ1dGU6IDQgfSB9LFxuICAgICAgICBwcm9qZWN0OiB7IHByb2plY3Q6ICdwcm9qZWN0JyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZFVzZXJUb1F1b3RlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgdXNlcjogJ1NvbWUgVXNlcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIEVkaXRdIEFkZCBVc2VyIFRvIFF1b3RlJyxcbiAgICAgICAgdXNlcjogeyB1c2VyOiAnU29tZSBVc2VyJyB9LFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGRCaWxsaW5nQWNjb3VudFRvUXVvdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBhY2NvdW50OiAnU29tZSBBY2NvdW50JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gQWRkIEJpbGxpbmcgQWNjb3VudCBUbyBRdW90ZScsXG4gICAgICAgIGFjY291bnQ6IHsgYWNjb3VudDogJ1NvbWUgQWNjb3VudCcgfSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkSW52b2ljZUNvbnRhY3RUb1F1b3RlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgdXNlcklkOiAxIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBBZGQgSW52b2ljZSBDb250YWN0IFRvIFF1b3RlJyxcbiAgICAgICAgdXNlcklkOiB7IHVzZXJJZDogMSB9LFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdpbml0aWFsaXplU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBlbWFpbEFkZHJlc3M6ICdlbWFpbEBlbWFpbC5jb20nIH0sIHsgZGVmYXVsdERhdGU6ICcyMDE3LzEyLzEyJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgRWRpdF0gSW5pdGlhbGl6ZSBTYWxlcyBNYW5hZ2VyIEZvcm0gT24gUXVvdGUnLFxuICAgICAgICBlbWFpbEFkZHJlc3M6IHsgZW1haWxBZGRyZXNzOiAnZW1haWxAZW1haWwuY29tJyB9LFxuICAgICAgICBkZWZhdWx0RGF0ZTogeyBkZWZhdWx0RGF0ZTogJzIwMTcvMTIvMTInIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAndXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBmb3JtOiAnZm9ybURhdGEnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBBZGQgU2FsZXMgTWFuYWdlciBGb3JtIE9uIFF1b3RlJyxcbiAgICAgICAgZm9ybTogeyBmb3JtOiAnZm9ybURhdGEnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkTm90ZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnc29tZSBub3RlJywgeyBzb21lOiAnbGluZUl0ZW0nIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBBZGQgTm90ZScsXG4gICAgICAgIG5vdGU6ICdzb21lIG5vdGUnLFxuICAgICAgICBsaW5lSXRlbTogeyBzb21lOiAnbGluZUl0ZW0nIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlTm90ZUZyb20nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnbGluZUl0ZW0nIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBSZW1vdmUgTm90ZScsXG4gICAgICAgIGxpbmVJdGVtOiB7IHNvbWU6ICdsaW5lSXRlbScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdvdmVycmlkZUludm9pY2VDb250YWN0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2NvbnRhY3QnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBFZGl0XSBPdmVycmlkZSBJbnZvaWNlIENvbnRhY3QnLFxuICAgICAgICBjb250YWN0OiB7IHNvbWU6ICdjb250YWN0JyB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
