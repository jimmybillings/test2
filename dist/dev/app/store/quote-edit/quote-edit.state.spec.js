"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var QuoteEditActions = require("./quote-edit.actions");
var QuoteState = require("./quote-edit.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
var UserActions = require("../user/user.actions");
var AccountActions = require("../account/account.actions");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Quote Edit Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            state: QuoteState,
            actions: QuoteEditActions
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['Load', 'Delete', 'CloneQuote', 'CreateQuote', 'UpdateQuoteFields', 'AddFeeTo', 'RemoveFee',
                'BulkImport', 'EditLineItem', 'AddAssetToProjectInQuote', 'AddProject', 'RemoveProject', 'UpdateProject',
                'MoveLineItem', 'CloneLineItem', 'EditLineItemMarkers'],
            customTests: [
                {
                    it: 'returns a clone of the state with loading: true',
                    previousState: QuoteState.initialState,
                    expectedNextState: __assign({}, QuoteState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: [
                'LoadSuccess', 'DeleteSuccess', 'EditLineItemFromDetailsSuccess', 'RemoveAssetSuccess',
                'AddCustomPriceToLineItemSuccess', 'CloneQuoteSuccess', 'BulkImportSuccess',
                'AddAssetToProjectInQuoteSuccess', 'RefreshAndNotify'
            ],
            customTests: [
                {
                    it: 'returns the state with the requested quote and loading: false',
                    previousState: __assign({}, QuoteState.initialState, { loading: true }),
                    actionParameters: { quote: { some: 'quote' } },
                    expectedNextState: { data: { some: 'quote' }, sendDetails: QuoteState.initialState.sendDetails, loading: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFailure', 'DeleteFailure', 'EditLineItemFromDetailsFailure',
                'AddCustomPriceToLineItemFailure'],
            mutationTestData: {
                previousState: { loading: true }
            },
            customTests: [
                {
                    it: 'returns a clone of the state with loading: false',
                    previousState: __assign({}, QuoteState.initialState, { loading: true }),
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: QuoteState.initialState.sendDetails, loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['AddUserToQuote'],
            mutationTestData: {
                previousState: QuoteState.initialState,
                actionParameters: { user: { id: 1, firstName: 'test', lastName: 'user', emailAddress: 'test@email.com' } }
            },
            customTests: [
                {
                    it: 'Adds user properties to the sendDetails and updates the user field value with current user',
                    previousState: QuoteState.initialState,
                    actionParameters: { user: { id: 1, firstName: 'test', lastName: 'user', emailAddress: 'test@email.com' } },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { user: {
                                id: 1,
                                customerName: 'test user',
                                email: 'test@email.com'
                            } }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            overrideActionClass: UserActions,
            actionClassName: ['GetAllUsersByAccountIdSuccess'],
            mutationTestData: {
                actionParameters: {
                    users: [
                        { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
                        { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
                        { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
                    ]
                }
            },
            customTests: [
                {
                    it: 'adds the users and the selectedUser to the invoiceContact',
                    previousState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { billingAccount: __assign({}, QuoteState.initialState.sendDetails.billingAccount, { invoiceContactId: 2 }), invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact) }) }),
                    actionParameters: {
                        users: [
                            { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
                            { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
                            { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
                        ]
                    },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { billingAccount: __assign({}, QuoteState.initialState.sendDetails.billingAccount, { invoiceContactId: 2 }), invoiceContact: {
                                contactEmail: 'email2@test.com',
                                name: 'test2',
                                id: null,
                                contacts: QuoteState.initialState.sendDetails.invoiceContact.contacts.concat([
                                    { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
                                    { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
                                    { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
                                ])
                            } }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['AddInvoiceContactToQuote'],
            mutationTestData: {
                actionParameters: { userId: 1 },
                previousState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }] }) }) })
            },
            customTests: [
                {
                    it: 'Adds the selected user as the invoiceContactId on the quote',
                    previousState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }] }) }) }),
                    actionParameters: { userId: 1 },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }], id: 1, contactEmail: 'email1@test.com', name: 'test' }) }) })
                },
                {
                    it: 'does nothing if there is no matching user',
                    previousState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }] }) }) }),
                    actionParameters: { userId: 10 },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { id: 10, contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }] }) }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            overrideActionClass: AccountActions,
            actionClassName: ['GetAccountForQuoteAdminSuccess'],
            mutationTestData: {
                actionParameters: {
                    account: {
                        name: 'Wazee Account',
                        salesOwner: 'testOwner',
                        purchaseOnCredit: 100,
                        creditExemption: 100,
                        paymentTermsDays: 20,
                        licensingVertical: 'yes',
                        invoiceContactId: 1
                    }
                }
            },
            customTests: [
                {
                    it: "Adds new account to state, updates form element with new account name as the value, \n          adds invoiceContactId property value to ID property on invoice contact object",
                    previousState: __assign({}, QuoteState.initialState),
                    actionParameters: {
                        account: {
                            name: 'Wazee Account',
                            salesOwner: 'testOwner',
                            purchaseOnCredit: 100,
                            creditExemption: 100,
                            paymentTermsDays: 20,
                            licensingVertical: 'yes',
                            invoiceContactId: 1
                        }
                    },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { billingAccount: {
                                name: 'Wazee Account',
                                salesOwner: 'testOwner',
                                purchaseOnCredit: 100,
                                creditExemption: 100,
                                paymentTermsDays: 20,
                                licensingVertical: 'yes',
                                invoiceContactId: 1
                            }, invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { id: 1 }) }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            overrideActionClass: AccountActions,
            actionClassName: ['GetAccountForQuoteAdminOnUserAddSuccess'],
            mutationTestData: {
                actionParameters: {
                    account: {
                        name: 'Wazee Account',
                        salesOwner: 'testOwner',
                        purchaseOnCredit: 100,
                        creditExemption: 100,
                        paymentTermsDays: 20,
                        licensingVertical: 'yes',
                        invoiceContactId: 1
                    }
                }
            },
            customTests: [
                {
                    it: "After adding a new user, automatically adds the users account to the state, updates form \n          element with new account name as the value, adds invoiceContactId property value to ID \n          property on invoice contact object and adds the accountName property to the user state",
                    previousState: __assign({}, QuoteState.initialState),
                    actionParameters: {
                        account: {
                            name: 'Wazee Account',
                            salesOwner: 'testOwner',
                            purchaseOnCredit: 100,
                            creditExemption: 100,
                            paymentTermsDays: 20,
                            licensingVertical: 'yes',
                            invoiceContactId: 1
                        }
                    },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { billingAccount: {
                                name: 'Wazee Account',
                                salesOwner: 'testOwner',
                                purchaseOnCredit: 100,
                                creditExemption: 100,
                                paymentTermsDays: 20,
                                readonlyPaymentTermsDays: 20,
                                licensingVertical: 'yes',
                                invoiceContactId: 1
                            }, invoiceContact: __assign({}, QuoteState.initialState.sendDetails.invoiceContact, { id: 1 }), user: __assign({}, QuoteState.initialState.sendDetails.user, { accountName: 'Wazee Account' }) }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['InitializeSalesManagerFormOnQuote'],
            mutationTestData: {
                actionParameters: { emailAddress: 'email@test.com', defaultDate: '2018/12/12' }
            },
            customTests: [
                {
                    it: 'Initializes sales manager form with current user and adds current user and default date to the state',
                    previousState: __assign({}, QuoteState.initialState),
                    actionParameters: { emailAddress: 'email@test.com', defaultDate: '2018/12/12' },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { salesManager: {
                                expirationDate: '2018/12/12',
                                salesManager: 'email@test.com',
                                offlineAgreement: null
                            } }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['UpdateSalesManagerFormOnQuote'],
            mutationTestData: {
                actionParameters: {
                    form: {
                        salesManager: 'email@test.com',
                        expirationDate: '2018/12/12',
                        offlineAgreementReference: 'SD12FJ23GJ23'
                    }
                }
            },
            customTests: [
                {
                    it: 'Initializes sales manager form with current user and adds current user and default date to the state',
                    previousState: __assign({}, QuoteState.initialState),
                    actionParameters: {
                        form: {
                            salesManager: 'email@test.com',
                            expirationDate: '2018/12/12',
                            offlineAgreementReference: 'SD12FJ23GJ23'
                        }
                    },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { salesManager: {
                                expirationDate: '2018/12/12',
                                salesManager: 'email@test.com',
                                offlineAgreement: 'SD12FJ23GJ23'
                            } }) })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'OverrideInvoiceContact',
            mutationTestData: {
                previousState: QuoteState.initialState,
                actionParameters: { contact: { name: 'Ross Edfort', id: 1 } }
            },
            customTests: [
                {
                    it: 'Overrides the existing invoice contact',
                    previousState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: { name: 'Some Contact', id: 999 } }) }),
                    actionParameters: {
                        contact: { name: 'Ross Edfort', id: 1 }
                    },
                    expectedNextState: __assign({}, QuoteState.initialState, { sendDetails: __assign({}, QuoteState.initialState.sendDetails, { invoiceContact: { name: 'Ross Edfort', id: 1 } }) })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsdURBQXlEO0FBQ3pELCtDQUFpRDtBQUNqRCx1RUFBb0U7QUFDcEUsa0RBQW9EO0FBQ3BELDJEQUE2RDtBQUU3RDtJQUNFLElBQU0sZUFBZSxHQUFvQixJQUFJLG1DQUFlLEVBQUUsQ0FBQztJQUUvRCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1lBQ3BDLEtBQUssRUFBRSxVQUFVO1lBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsV0FBVztnQkFDM0csWUFBWSxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWU7Z0JBQ3hHLGNBQWMsRUFBRSxlQUFlLEVBQUUscUJBQXFCLENBQUM7WUFDekQsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxpREFBaUQ7b0JBQ3JELGFBQWEsRUFBRSxVQUFVLENBQUMsWUFBWTtvQkFDdEMsaUJBQWlCLGVBQU8sVUFBVSxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO2lCQUNqRTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRTtnQkFDZixhQUFhLEVBQUUsZUFBZSxFQUFFLGdDQUFnQyxFQUFFLG9CQUFvQjtnQkFDdEYsaUNBQWlDLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CO2dCQUMzRSxpQ0FBaUMsRUFBRSxrQkFBa0I7YUFDdEQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLCtEQUErRDtvQkFDbkUsYUFBYSxlQUFPLFVBQVUsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtvQkFDNUQsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzlDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO2lCQUNqSDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsZ0NBQWdDO2dCQUNoRixpQ0FBaUMsQ0FBQztZQUNwQyxnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTthQUNqQztZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsa0RBQWtEO29CQUN0RCxhQUFhLGVBQU8sVUFBVSxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO29CQUM1RCxpQkFBaUIsZUFBTyxVQUFVLENBQUMsWUFBWSxJQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFFO2lCQUNwSDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ25DLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsVUFBVSxDQUFDLFlBQVk7Z0JBQ3RDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLEVBQUU7YUFDM0c7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDRGQUE0RjtvQkFDaEcsYUFBYSxFQUFFLFVBQVUsQ0FBQyxZQUFZO29CQUN0QyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxFQUFFO29CQUMxRyxpQkFBaUIsZUFDWixVQUFVLENBQUMsWUFBWSxJQUMxQixXQUFXLGVBQ04sVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQ3RDLElBQUksRUFBRTtnQ0FDSixFQUFFLEVBQUUsQ0FBQztnQ0FDTCxZQUFZLEVBQUUsV0FBVztnQ0FDekIsS0FBSyxFQUFFLGdCQUFnQjs2QkFDeEIsTUFFSjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLG1CQUFtQixFQUFFLFdBQVc7WUFDaEMsZUFBZSxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDbEQsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGdCQUFnQixFQUFFO29CQUNoQixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7d0JBQ3RFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFO3dCQUN6RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtxQkFDMUU7aUJBQ0Y7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsMkRBQTJEO29CQUMvRCxhQUFhLGVBQ1IsVUFBVSxDQUFDLFlBQVksSUFDMUIsV0FBVyxlQUNOLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUN0QyxjQUFjLGVBQ1QsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUNyRCxnQkFBZ0IsRUFBRSxDQUFDLEtBRXJCLGNBQWMsZUFDVCxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxjQUFjLE9BRzFEO29CQUNELGdCQUFnQixFQUFFO3dCQUNoQixLQUFLLEVBQUU7NEJBQ0wsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7NEJBQ3RFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFOzRCQUN6RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTt5QkFDMUU7cUJBQ0Y7b0JBQ0QsaUJBQWlCLGVBQ1osVUFBVSxDQUFDLFlBQVksSUFDMUIsV0FBVyxlQUNOLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUN0QyxjQUFjLGVBQ1QsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUNyRCxnQkFBZ0IsRUFBRSxDQUFDLEtBRXJCLGNBQWMsRUFBRTtnQ0FDZCxZQUFZLEVBQUUsaUJBQWlCO2dDQUMvQixJQUFJLEVBQUUsT0FBTztnQ0FDYixFQUFFLEVBQUUsSUFBSTtnQ0FDUixRQUFRLEVBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVE7b0NBQzlELEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFO29DQUN0RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtvQ0FDekUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7a0NBQzFFOzZCQUNGLE1BRUo7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUM3QyxnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQixhQUFhLGVBQ1IsVUFBVSxDQUFDLFlBQVksSUFDMUIsV0FBVyxlQUNOLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUN0QyxjQUFjLGVBQ1QsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUNyRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLFNBR3ZGO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDZEQUE2RDtvQkFDakUsYUFBYSxlQUNSLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxlQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFDckQsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxTQUd2RjtvQkFDRCxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7b0JBQy9CLGlCQUFpQixlQUNaLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxlQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFDckQsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUNsRixFQUFFLEVBQUUsQ0FBQyxFQUNMLFlBQVksRUFBRSxpQkFBaUIsRUFDL0IsSUFBSSxFQUFFLE1BQU0sU0FHakI7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLDJDQUEyQztvQkFDL0MsYUFBYSxlQUNSLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxlQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFDckQsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxTQUd2RjtvQkFDRCxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7b0JBQ2hDLGlCQUFpQixlQUNaLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxlQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFDckQsRUFBRSxFQUFFLEVBQUUsRUFDTixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLFNBR3ZGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsbUJBQW1CLEVBQUUsY0FBYztZQUNuQyxlQUFlLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNuRCxnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxJQUFJLEVBQUUsZUFBZTt3QkFDckIsVUFBVSxFQUFFLFdBQVc7d0JBQ3ZCLGdCQUFnQixFQUFFLEdBQUc7d0JBQ3JCLGVBQWUsRUFBRSxHQUFHO3dCQUNwQixnQkFBZ0IsRUFBRSxFQUFFO3dCQUNwQixpQkFBaUIsRUFBRSxLQUFLO3dCQUN4QixnQkFBZ0IsRUFBRSxDQUFDO3FCQUNwQjtpQkFDRjthQUNGO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwrS0FDMEU7b0JBQzlFLGFBQWEsZUFDUixVQUFVLENBQUMsWUFBWSxDQUMzQjtvQkFDRCxnQkFBZ0IsRUFBRTt3QkFDaEIsT0FBTyxFQUFFOzRCQUNQLElBQUksRUFBRSxlQUFlOzRCQUNyQixVQUFVLEVBQUUsV0FBVzs0QkFDdkIsZ0JBQWdCLEVBQUUsR0FBRzs0QkFDckIsZUFBZSxFQUFFLEdBQUc7NEJBQ3BCLGdCQUFnQixFQUFFLEVBQUU7NEJBQ3BCLGlCQUFpQixFQUFFLEtBQUs7NEJBQ3hCLGdCQUFnQixFQUFFLENBQUM7eUJBQ3BCO3FCQUNGO29CQUNELGlCQUFpQixlQUNaLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxFQUFFO2dDQUNkLElBQUksRUFBRSxlQUFlO2dDQUNyQixVQUFVLEVBQUUsV0FBVztnQ0FDdkIsZ0JBQWdCLEVBQUUsR0FBRztnQ0FDckIsZUFBZSxFQUFFLEdBQUc7Z0NBQ3BCLGdCQUFnQixFQUFFLEVBQUU7Z0NBQ3BCLGlCQUFpQixFQUFFLEtBQUs7Z0NBQ3hCLGdCQUFnQixFQUFFLENBQUM7NkJBQ3BCLEVBQ0QsY0FBYyxlQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFDckQsRUFBRSxFQUFFLENBQUMsU0FHVjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLG1CQUFtQixFQUFFLGNBQWM7WUFDbkMsZUFBZSxFQUFFLENBQUMseUNBQXlDLENBQUM7WUFDNUQsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGdCQUFnQixFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLFVBQVUsRUFBRSxXQUFXO3dCQUN2QixnQkFBZ0IsRUFBRSxHQUFHO3dCQUNyQixlQUFlLEVBQUUsR0FBRzt3QkFDcEIsZ0JBQWdCLEVBQUUsRUFBRTt3QkFDcEIsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsZ0JBQWdCLEVBQUUsQ0FBQztxQkFDcEI7aUJBQ0Y7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsZ1NBRW1GO29CQUN2RixhQUFhLGVBQ1IsVUFBVSxDQUFDLFlBQVksQ0FDM0I7b0JBQ0QsZ0JBQWdCLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsVUFBVSxFQUFFLFdBQVc7NEJBQ3ZCLGdCQUFnQixFQUFFLEdBQUc7NEJBQ3JCLGVBQWUsRUFBRSxHQUFHOzRCQUNwQixnQkFBZ0IsRUFBRSxFQUFFOzRCQUNwQixpQkFBaUIsRUFBRSxLQUFLOzRCQUN4QixnQkFBZ0IsRUFBRSxDQUFDO3lCQUNwQjtxQkFDRjtvQkFDRCxpQkFBaUIsZUFDWixVQUFVLENBQUMsWUFBWSxJQUMxQixXQUFXLGVBQ04sVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQ3RDLGNBQWMsRUFBRTtnQ0FDZCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsVUFBVSxFQUFFLFdBQVc7Z0NBQ3ZCLGdCQUFnQixFQUFFLEdBQUc7Z0NBQ3JCLGVBQWUsRUFBRSxHQUFHO2dDQUNwQixnQkFBZ0IsRUFBRSxFQUFFO2dDQUNwQix3QkFBd0IsRUFBRSxFQUFFO2dDQUM1QixpQkFBaUIsRUFBRSxLQUFLO2dDQUN4QixnQkFBZ0IsRUFBRSxDQUFDOzZCQUNwQixFQUNELGNBQWMsZUFDVCxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxjQUFjLElBQ3JELEVBQUUsRUFBRSxDQUFDLEtBRVAsSUFBSSxlQUNDLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksSUFDM0MsV0FBVyxFQUFFLGVBQWUsU0FHakM7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUdILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUN0RCxnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTthQUNoRjtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsc0dBQXNHO29CQUMxRyxhQUFhLGVBQ1IsVUFBVSxDQUFDLFlBQVksQ0FDM0I7b0JBQ0QsZ0JBQWdCLEVBQUUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTtvQkFDL0UsaUJBQWlCLGVBQ1osVUFBVSxDQUFDLFlBQVksSUFDMUIsV0FBVyxlQUNOLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUN0QyxZQUFZLEVBQUU7Z0NBQ1osY0FBYyxFQUFFLFlBQVk7Z0NBQzVCLFlBQVksRUFBRSxnQkFBZ0I7Z0NBQzlCLGdCQUFnQixFQUFFLElBQUk7NkJBQ3ZCLE1BRUo7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztZQUNsRCxnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRTt3QkFDSixZQUFZLEVBQUUsZ0JBQWdCO3dCQUM5QixjQUFjLEVBQUUsWUFBWTt3QkFDNUIseUJBQXlCLEVBQUUsY0FBYztxQkFDMUM7aUJBQ0Y7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsc0dBQXNHO29CQUMxRyxhQUFhLGVBQ1IsVUFBVSxDQUFDLFlBQVksQ0FDM0I7b0JBQ0QsZ0JBQWdCLEVBQUU7d0JBQ2hCLElBQUksRUFBRTs0QkFDSixZQUFZLEVBQUUsZ0JBQWdCOzRCQUM5QixjQUFjLEVBQUUsWUFBWTs0QkFDNUIseUJBQXlCLEVBQUUsY0FBYzt5QkFDMUM7cUJBQ0Y7b0JBQ0QsaUJBQWlCLGVBQ1osVUFBVSxDQUFDLFlBQVksSUFDMUIsV0FBVyxlQUNOLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUN0QyxZQUFZLEVBQUU7Z0NBQ1osY0FBYyxFQUFFLFlBQVk7Z0NBQzVCLFlBQVksRUFBRSxnQkFBZ0I7Z0NBQzlCLGdCQUFnQixFQUFFLGNBQWM7NkJBQ2pDLE1BRUo7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsd0JBQXdCO1lBQ3pDLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsVUFBVSxDQUFDLFlBQVk7Z0JBQ3RDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7YUFDOUQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHdDQUF3QztvQkFDNUMsYUFBYSxlQUNSLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BRXBEO29CQUNELGdCQUFnQixFQUFFO3dCQUNoQixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7cUJBQ3hDO29CQUNELGlCQUFpQixlQUNaLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFdBQVcsZUFDTixVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFDdEMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BRWpEO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUE2QkwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdmNELG9CQXVjQyIsImZpbGUiOiJhcHAvc3RvcmUvcXVvdGUtZWRpdC9xdW90ZS1lZGl0LnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZW5kRGV0YWlscyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBRdW90ZUVkaXRBY3Rpb25zIGZyb20gJy4vcXVvdGUtZWRpdC5hY3Rpb25zJztcbmltcG9ydCAqIGFzIFF1b3RlU3RhdGUgZnJvbSAnLi9xdW90ZS1lZGl0LnN0YXRlJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5pbXBvcnQgKiBhcyBVc2VyQWN0aW9ucyBmcm9tICcuLi91c2VyL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBBY2NvdW50QWN0aW9ucyBmcm9tICcuLi9hY2NvdW50L2FjY291bnQuYWN0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgc3RhdGU6IFF1b3RlU3RhdGUsXG4gICAgICBhY3Rpb25zOiBRdW90ZUVkaXRBY3Rpb25zXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnTG9hZCcsICdEZWxldGUnLCAnQ2xvbmVRdW90ZScsICdDcmVhdGVRdW90ZScsICdVcGRhdGVRdW90ZUZpZWxkcycsICdBZGRGZWVUbycsICdSZW1vdmVGZWUnLFxuICAgICAgICAnQnVsa0ltcG9ydCcsICdFZGl0TGluZUl0ZW0nLCAnQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlJywgJ0FkZFByb2plY3QnLCAnUmVtb3ZlUHJvamVjdCcsICdVcGRhdGVQcm9qZWN0JyxcbiAgICAgICAgJ01vdmVMaW5lSXRlbScsICdDbG9uZUxpbmVJdGVtJywgJ0VkaXRMaW5lSXRlbU1hcmtlcnMnXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgYSBjbG9uZSBvZiB0aGUgc3RhdGUgd2l0aCBsb2FkaW5nOiB0cnVlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiBRdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogW1xuICAgICAgICAnTG9hZFN1Y2Nlc3MnLCAnRGVsZXRlU3VjY2VzcycsICdFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MnLCAnUmVtb3ZlQXNzZXRTdWNjZXNzJyxcbiAgICAgICAgJ0FkZEN1c3RvbVByaWNlVG9MaW5lSXRlbVN1Y2Nlc3MnLCAnQ2xvbmVRdW90ZVN1Y2Nlc3MnLCAnQnVsa0ltcG9ydFN1Y2Nlc3MnLFxuICAgICAgICAnQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzcycsICdSZWZyZXNoQW5kTm90aWZ5J1xuICAgICAgXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggdGhlIHJlcXVlc3RlZCBxdW90ZSBhbmQgbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGRhdGE6IHsgc29tZTogJ3F1b3RlJyB9LCBzZW5kRGV0YWlsczogUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMsIGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0xvYWRGYWlsdXJlJywgJ0RlbGV0ZUZhaWx1cmUnLCAnRWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlJyxcbiAgICAgICAgJ0FkZEN1c3RvbVByaWNlVG9MaW5lSXRlbUZhaWx1cmUnXSxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBsb2FkaW5nOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIGEgY2xvbmUgb2YgdGhlIHN0YXRlIHdpdGggbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSwgc2VuZERldGFpbHM6IFF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydBZGRVc2VyVG9RdW90ZSddLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiBRdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyB1c2VyOiB7IGlkOiAxLCBmaXJzdE5hbWU6ICd0ZXN0JywgbGFzdE5hbWU6ICd1c2VyJywgZW1haWxBZGRyZXNzOiAndGVzdEBlbWFpbC5jb20nIH0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ0FkZHMgdXNlciBwcm9wZXJ0aWVzIHRvIHRoZSBzZW5kRGV0YWlscyBhbmQgdXBkYXRlcyB0aGUgdXNlciBmaWVsZCB2YWx1ZSB3aXRoIGN1cnJlbnQgdXNlcicsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyB1c2VyOiB7IGlkOiAxLCBmaXJzdE5hbWU6ICd0ZXN0JywgbGFzdE5hbWU6ICd1c2VyJywgZW1haWxBZGRyZXNzOiAndGVzdEBlbWFpbC5jb20nIH0gfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscyxcbiAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyTmFtZTogJ3Rlc3QgdXNlcicsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QGVtYWlsLmNvbSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgb3ZlcnJpZGVBY3Rpb25DbGFzczogVXNlckFjdGlvbnMsXG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnR2V0QWxsVXNlcnNCeUFjY291bnRJZFN1Y2Nlc3MnXSxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgIHVzZXJzOiBbXG4gICAgICAgICAgICB7IGlkOiAxLCB1c2VyOiAndGVzdCcsIG5hbWU6ICd0ZXN0JywgZW1haWxBZGRyZXNzOiAnZW1haWwxQHRlc3QuY29tJyB9LFxuICAgICAgICAgICAgeyBpZDogMiwgdXNlcjogJ3Rlc3QgMicsIG5hbWU6ICd0ZXN0MicsIGVtYWlsQWRkcmVzczogJ2VtYWlsMkB0ZXN0LmNvbScgfSxcbiAgICAgICAgICAgIHsgaWQ6IDMsIHVzZXI6ICd0ZXN0IDMnLCBuYW1lOiAndGVzdDMnLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDNAdGVzdC5jb20nIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdhZGRzIHRoZSB1c2VycyBhbmQgdGhlIHNlbGVjdGVkVXNlciB0byB0aGUgaW52b2ljZUNvbnRhY3QnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgc2VuZERldGFpbHM6IHtcbiAgICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMsXG4gICAgICAgICAgICAgIGJpbGxpbmdBY2NvdW50OiB7XG4gICAgICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMuYmlsbGluZ0FjY291bnQsXG4gICAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3RJZDogMlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge1xuICAgICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIHVzZXJzOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEsIHVzZXI6ICd0ZXN0JywgbmFtZTogJ3Rlc3QnLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDFAdGVzdC5jb20nIH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDIsIHVzZXI6ICd0ZXN0IDInLCBuYW1lOiAndGVzdDInLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDJAdGVzdC5jb20nIH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDMsIHVzZXI6ICd0ZXN0IDMnLCBuYW1lOiAndGVzdDMnLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDNAdGVzdC5jb20nIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBiaWxsaW5nQWNjb3VudDoge1xuICAgICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmJpbGxpbmdBY2NvdW50LFxuICAgICAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IDJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICBjb250YWN0RW1haWw6ICdlbWFpbDJAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0MicsXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgY29udGFjdHM6IFtcbiAgICAgICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0LmNvbnRhY3RzLFxuICAgICAgICAgICAgICAgICAgeyBpZDogMSwgdXNlcjogJ3Rlc3QnLCBuYW1lOiAndGVzdCcsIGVtYWlsQWRkcmVzczogJ2VtYWlsMUB0ZXN0LmNvbScgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6IDIsIHVzZXI6ICd0ZXN0IDInLCBuYW1lOiAndGVzdDInLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDJAdGVzdC5jb20nIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAzLCB1c2VyOiAndGVzdCAzJywgbmFtZTogJ3Rlc3QzJywgZW1haWxBZGRyZXNzOiAnZW1haWwzQHRlc3QuY29tJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnQWRkSW52b2ljZUNvbnRhY3RUb1F1b3RlJ10sXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgdXNlcklkOiAxIH0sXG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMsXG4gICAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscy5pbnZvaWNlQ29udGFjdCxcbiAgICAgICAgICAgICAgY29udGFjdHM6IFt7IGlkOiAxLCB1c2VyOiAndGVzdCcsIG5hbWU6ICd0ZXN0JywgZW1haWxBZGRyZXNzOiAnZW1haWwxQHRlc3QuY29tJyB9XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ0FkZHMgdGhlIHNlbGVjdGVkIHVzZXIgYXMgdGhlIGludm9pY2VDb250YWN0SWQgb24gdGhlIHF1b3RlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge1xuICAgICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0LFxuICAgICAgICAgICAgICAgIGNvbnRhY3RzOiBbeyBpZDogMSwgdXNlcjogJ3Rlc3QnLCBuYW1lOiAndGVzdCcsIGVtYWlsQWRkcmVzczogJ2VtYWlsMUB0ZXN0LmNvbScgfV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyB1c2VySWQ6IDEgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscyxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscy5pbnZvaWNlQ29udGFjdCxcbiAgICAgICAgICAgICAgICBjb250YWN0czogW3sgaWQ6IDEsIHVzZXI6ICd0ZXN0JywgbmFtZTogJ3Rlc3QnLCBlbWFpbEFkZHJlc3M6ICdlbWFpbDFAdGVzdC5jb20nIH1dLFxuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RFbWFpbDogJ2VtYWlsMUB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ2RvZXMgbm90aGluZyBpZiB0aGVyZSBpcyBubyBtYXRjaGluZyB1c2VyJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge1xuICAgICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0LFxuICAgICAgICAgICAgICAgIGNvbnRhY3RzOiBbeyBpZDogMSwgdXNlcjogJ3Rlc3QnLCBuYW1lOiAndGVzdCcsIGVtYWlsQWRkcmVzczogJ2VtYWlsMUB0ZXN0LmNvbScgfV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyB1c2VySWQ6IDEwIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgc2VuZERldGFpbHM6IHtcbiAgICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMsXG4gICAgICAgICAgICAgIGludm9pY2VDb250YWN0OiB7XG4gICAgICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMuaW52b2ljZUNvbnRhY3QsXG4gICAgICAgICAgICAgICAgaWQ6IDEwLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RzOiBbeyBpZDogMSwgdXNlcjogJ3Rlc3QnLCBuYW1lOiAndGVzdCcsIGVtYWlsQWRkcmVzczogJ2VtYWlsMUB0ZXN0LmNvbScgfV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgb3ZlcnJpZGVBY3Rpb25DbGFzczogQWNjb3VudEFjdGlvbnMsXG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnR2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzJ10sXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBhY2NvdW50OiB7XG4gICAgICAgICAgICBuYW1lOiAnV2F6ZWUgQWNjb3VudCcsXG4gICAgICAgICAgICBzYWxlc093bmVyOiAndGVzdE93bmVyJyxcbiAgICAgICAgICAgIHB1cmNoYXNlT25DcmVkaXQ6IDEwMCxcbiAgICAgICAgICAgIGNyZWRpdEV4ZW1wdGlvbjogMTAwLFxuICAgICAgICAgICAgcGF5bWVudFRlcm1zRGF5czogMjAsXG4gICAgICAgICAgICBsaWNlbnNpbmdWZXJ0aWNhbDogJ3llcycsXG4gICAgICAgICAgICBpbnZvaWNlQ29udGFjdElkOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiBgQWRkcyBuZXcgYWNjb3VudCB0byBzdGF0ZSwgdXBkYXRlcyBmb3JtIGVsZW1lbnQgd2l0aCBuZXcgYWNjb3VudCBuYW1lIGFzIHRoZSB2YWx1ZSwgXG4gICAgICAgICAgYWRkcyBpbnZvaWNlQ29udGFjdElkIHByb3BlcnR5IHZhbHVlIHRvIElEIHByb3BlcnR5IG9uIGludm9pY2UgY29udGFjdCBvYmplY3RgLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICBhY2NvdW50OiB7XG4gICAgICAgICAgICAgIG5hbWU6ICdXYXplZSBBY2NvdW50JyxcbiAgICAgICAgICAgICAgc2FsZXNPd25lcjogJ3Rlc3RPd25lcicsXG4gICAgICAgICAgICAgIHB1cmNoYXNlT25DcmVkaXQ6IDEwMCxcbiAgICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiAxMDAsXG4gICAgICAgICAgICAgIHBheW1lbnRUZXJtc0RheXM6IDIwLFxuICAgICAgICAgICAgICBsaWNlbnNpbmdWZXJ0aWNhbDogJ3llcycsXG4gICAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBiaWxsaW5nQWNjb3VudDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdXYXplZSBBY2NvdW50JyxcbiAgICAgICAgICAgICAgICBzYWxlc093bmVyOiAndGVzdE93bmVyJyxcbiAgICAgICAgICAgICAgICBwdXJjaGFzZU9uQ3JlZGl0OiAxMDAsXG4gICAgICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiAxMDAsXG4gICAgICAgICAgICAgICAgcGF5bWVudFRlcm1zRGF5czogMjAsXG4gICAgICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6ICd5ZXMnLFxuICAgICAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IDFcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscy5pbnZvaWNlQ29udGFjdCxcbiAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBvdmVycmlkZUFjdGlvbkNsYXNzOiBBY2NvdW50QWN0aW9ucyxcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MnXSxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgIGFjY291bnQ6IHtcbiAgICAgICAgICAgIG5hbWU6ICdXYXplZSBBY2NvdW50JyxcbiAgICAgICAgICAgIHNhbGVzT3duZXI6ICd0ZXN0T3duZXInLFxuICAgICAgICAgICAgcHVyY2hhc2VPbkNyZWRpdDogMTAwLFxuICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiAxMDAsXG4gICAgICAgICAgICBwYXltZW50VGVybXNEYXlzOiAyMCxcbiAgICAgICAgICAgIGxpY2Vuc2luZ1ZlcnRpY2FsOiAneWVzJyxcbiAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6IGBBZnRlciBhZGRpbmcgYSBuZXcgdXNlciwgYXV0b21hdGljYWxseSBhZGRzIHRoZSB1c2VycyBhY2NvdW50IHRvIHRoZSBzdGF0ZSwgdXBkYXRlcyBmb3JtIFxuICAgICAgICAgIGVsZW1lbnQgd2l0aCBuZXcgYWNjb3VudCBuYW1lIGFzIHRoZSB2YWx1ZSwgYWRkcyBpbnZvaWNlQ29udGFjdElkIHByb3BlcnR5IHZhbHVlIHRvIElEIFxuICAgICAgICAgIHByb3BlcnR5IG9uIGludm9pY2UgY29udGFjdCBvYmplY3QgYW5kIGFkZHMgdGhlIGFjY291bnROYW1lIHByb3BlcnR5IHRvIHRoZSB1c2VyIHN0YXRlYCxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgICAgYWNjb3VudDoge1xuICAgICAgICAgICAgICBuYW1lOiAnV2F6ZWUgQWNjb3VudCcsXG4gICAgICAgICAgICAgIHNhbGVzT3duZXI6ICd0ZXN0T3duZXInLFxuICAgICAgICAgICAgICBwdXJjaGFzZU9uQ3JlZGl0OiAxMDAsXG4gICAgICAgICAgICAgIGNyZWRpdEV4ZW1wdGlvbjogMTAwLFxuICAgICAgICAgICAgICBwYXltZW50VGVybXNEYXlzOiAyMCxcbiAgICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6ICd5ZXMnLFxuICAgICAgICAgICAgICBpbnZvaWNlQ29udGFjdElkOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscyxcbiAgICAgICAgICAgICAgYmlsbGluZ0FjY291bnQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnV2F6ZWUgQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgc2FsZXNPd25lcjogJ3Rlc3RPd25lcicsXG4gICAgICAgICAgICAgICAgcHVyY2hhc2VPbkNyZWRpdDogMTAwLFxuICAgICAgICAgICAgICAgIGNyZWRpdEV4ZW1wdGlvbjogMTAwLFxuICAgICAgICAgICAgICAgIHBheW1lbnRUZXJtc0RheXM6IDIwLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5UGF5bWVudFRlcm1zRGF5czogMjAsXG4gICAgICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6ICd5ZXMnLFxuICAgICAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IDFcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscy5pbnZvaWNlQ29udGFjdCxcbiAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUuc2VuZERldGFpbHMudXNlcixcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ1dhemVlIEFjY291bnQnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0luaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSddLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGVtYWlsQWRkcmVzczogJ2VtYWlsQHRlc3QuY29tJywgZGVmYXVsdERhdGU6ICcyMDE4LzEyLzEyJyB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnSW5pdGlhbGl6ZXMgc2FsZXMgbWFuYWdlciBmb3JtIHdpdGggY3VycmVudCB1c2VyIGFuZCBhZGRzIGN1cnJlbnQgdXNlciBhbmQgZGVmYXVsdCBkYXRlIHRvIHRoZSBzdGF0ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGVtYWlsQWRkcmVzczogJ2VtYWlsQHRlc3QuY29tJywgZGVmYXVsdERhdGU6ICcyMDE4LzEyLzEyJyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBzYWxlc01hbmFnZXI6IHtcbiAgICAgICAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogJzIwMTgvMTIvMTInLFxuICAgICAgICAgICAgICAgIHNhbGVzTWFuYWdlcjogJ2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBvZmZsaW5lQWdyZWVtZW50OiBudWxsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydVcGRhdGVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSddLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgZm9ybToge1xuICAgICAgICAgICAgc2FsZXNNYW5hZ2VyOiAnZW1haWxAdGVzdC5jb20nLFxuICAgICAgICAgICAgZXhwaXJhdGlvbkRhdGU6ICcyMDE4LzEyLzEyJyxcbiAgICAgICAgICAgIG9mZmxpbmVBZ3JlZW1lbnRSZWZlcmVuY2U6ICdTRDEyRkoyM0dKMjMnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnSW5pdGlhbGl6ZXMgc2FsZXMgbWFuYWdlciBmb3JtIHdpdGggY3VycmVudCB1c2VyIGFuZCBhZGRzIGN1cnJlbnQgdXNlciBhbmQgZGVmYXVsdCBkYXRlIHRvIHRoZSBzdGF0ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgIHNhbGVzTWFuYWdlcjogJ2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbkRhdGU6ICcyMDE4LzEyLzEyJyxcbiAgICAgICAgICAgICAgb2ZmbGluZUFncmVlbWVudFJlZmVyZW5jZTogJ1NEMTJGSjIzR0oyMydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgICAgICAgICAgICBzYWxlc01hbmFnZXI6IHtcbiAgICAgICAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogJzIwMTgvMTIvMTInLFxuICAgICAgICAgICAgICAgIHNhbGVzTWFuYWdlcjogJ2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBvZmZsaW5lQWdyZWVtZW50OiAnU0QxMkZKMjNHSjIzJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdPdmVycmlkZUludm9pY2VDb250YWN0JyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY29udGFjdDogeyBuYW1lOiAnUm9zcyBFZGZvcnQnLCBpZDogMSB9IH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdPdmVycmlkZXMgdGhlIGV4aXN0aW5nIGludm9pY2UgY29udGFjdCcsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscyxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHsgbmFtZTogJ1NvbWUgQ29udGFjdCcsIGlkOiA5OTkgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgICAgY29udGFjdDogeyBuYW1lOiAnUm9zcyBFZGZvcnQnLCBpZDogMSB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZS5zZW5kRGV0YWlscyxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHsgbmFtZTogJ1Jvc3MgRWRmb3J0JywgaWQ6IDEgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgLy8gc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgIC8vICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ1VwZGF0ZUJpbGxpbmdBY2NvdW50J10sXG4gICAgLy8gICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgLy8gICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgZm9ybTogeyBzYWxlc093bmVyOiAnUm9zcycgfSB9XG4gICAgLy8gICB9LFxuICAgIC8vICAgY3VzdG9tVGVzdHM6IFtcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGl0OiAnb3ZlcnJpZGVzIGFueSBwcm9wZXJ0aWVzIG9uIHRoZSBiaWxsaW5nQWNjb3VudCcsXG4gICAgLy8gICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgIC8vICAgICAgICAgLi4uUXVvdGVTdGF0ZS5pbml0aWFsU3RhdGVcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHtcbiAgICAvLyAgICAgICAgIGZvcm06IHsgc2FsZXNPd25lcjogJ1Jvc3MnIH1cbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgLy8gICAgICAgICAuLi5RdW90ZVN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAvLyAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgLy8gICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLFxuICAgIC8vICAgICAgICAgICBiaWxsaW5nQWNjb3VudDoge1xuICAgIC8vICAgICAgICAgICAgIC4uLlF1b3RlU3RhdGUuaW5pdGlhbFN0YXRlLnNlbmREZXRhaWxzLmJpbGxpbmdBY2NvdW50LFxuICAgIC8vICAgICAgICAgICAgIHNhbGVzT3duZXI6ICdSb3NzJ1xuICAgIC8vICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICBdXG4gICAgLy8gfSk7XG4gIH0pO1xufVxuIl19
