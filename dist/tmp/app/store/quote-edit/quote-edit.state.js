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
var AccountActions = require("../account/account.actions");
var UserActions = require("../user/user.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    data: {
        id: 0,
        total: 0,
        createdUserId: 0,
        ownerUserId: 0,
        quoteStatus: 'PENDING'
    },
    sendDetails: {
        user: {
            customerName: null,
            accountName: null
        },
        billingAccount: {
            purchaseOnCredit: null,
            creditExemption: null,
            licensingVertical: null,
            paymentTermsDays: null,
            readonlyPaymentTermsDays: null,
            salesOwner: null
        },
        invoiceContact: {
            contactEmail: null,
            name: null,
            id: null,
            contacts: []
        },
        salesManager: {
            expirationDate: null,
            salesManager: null,
            offlineAgreement: null
        }
    },
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case QuoteEditActions.Delete.Type:
        case QuoteEditActions.Load.Type:
        case QuoteEditActions.CloneQuote.Type:
        case QuoteEditActions.CreateQuote.Type:
        case QuoteEditActions.UpdateQuoteFields.Type:
        case QuoteEditActions.AddFeeTo.Type:
        case QuoteEditActions.RemoveFee.Type:
        case QuoteEditActions.BulkImport.Type:
        case QuoteEditActions.EditLineItem.Type:
        case QuoteEditActions.AddAssetToProjectInQuote.Type:
        case QuoteEditActions.AddProject.Type:
        case QuoteEditActions.RemoveProject.Type:
        case QuoteEditActions.UpdateProject.Type:
        case QuoteEditActions.MoveLineItem.Type:
        case QuoteEditActions.CloneLineItem.Type:
        case QuoteEditActions.EditLineItemMarkers.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case QuoteEditActions.EditLineItemFromDetailsSuccess.Type:
        case QuoteEditActions.AddCustomPriceToLineItemSuccess.Type:
        case QuoteEditActions.DeleteSuccess.Type:
        case QuoteEditActions.LoadSuccess.Type:
        case QuoteEditActions.RemoveAssetSuccess.Type:
        case QuoteEditActions.CloneQuoteSuccess.Type:
        case QuoteEditActions.BulkImportSuccess.Type:
        case QuoteEditActions.AddAssetToProjectInQuoteSuccess.Type:
        case QuoteEditActions.RefreshAndNotify.Type: {
            return {
                loading: false,
                data: __assign({}, action.quote),
                sendDetails: __assign({}, common_functions_1.Common.clone(state.sendDetails))
            };
        }
        case QuoteEditActions.AddUserToQuote.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { user: {
                        id: action.user.id,
                        customerName: action.user.firstName + " " + action.user.lastName,
                        email: action.user.emailAddress
                    } }) });
        }
        case AccountActions.GetAccountForQuoteAdminSuccess.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { billingAccount: __assign({}, action.account), invoiceContact: __assign({}, clonedState.sendDetails.invoiceContact, { id: action.account.invoiceContactId }) }) });
        }
        case AccountActions.GetAccountForQuoteAdminOnUserAddSuccess.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { billingAccount: __assign({}, action.account, { readonlyPaymentTermsDays: action.account.paymentTermsDays }), invoiceContact: __assign({}, clonedState.sendDetails.invoiceContact, { id: action.account.invoiceContactId }), user: __assign({}, clonedState.sendDetails.user, { accountName: action.account.name }) }) });
        }
        case UserActions.GetAllUsersByAccountIdSuccess.Type: {
            var clonedState_1 = common_functions_1.Common.clone(state);
            var selectedUser = action.users.find(function (user) {
                return user.id === clonedState_1.sendDetails.billingAccount.invoiceContactId;
            });
            return __assign({}, clonedState_1, { sendDetails: __assign({}, clonedState_1.sendDetails, { invoiceContact: __assign({}, clonedState_1.sendDetails.invoiceContact, { contacts: action.users, contactEmail: (selectedUser) ? selectedUser.emailAddress : null, name: (selectedUser) ? selectedUser.name : null }) }) });
        }
        case QuoteEditActions.AddInvoiceContactToQuote.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            var selectedUser = clonedState.sendDetails.invoiceContact.contacts.find(function (user) {
                return user.id === action.userId;
            });
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { invoiceContact: __assign({}, clonedState.sendDetails.invoiceContact, { id: action.userId, contactEmail: (selectedUser) ? selectedUser.emailAddress : null, name: (selectedUser) ? selectedUser.name : null }) }) });
        }
        case QuoteEditActions.InitializeSalesManagerFormOnQuote.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { salesManager: __assign({}, clonedState.sendDetails.salesManager, { expirationDate: action.defaultDate, salesManager: action.emailAddress }) }) });
        }
        case QuoteEditActions.UpdateSalesManagerFormOnQuote.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { salesManager: {
                        expirationDate: action.form.expirationDate,
                        salesManager: action.form.salesManager,
                        offlineAgreement: action.form.offlineAgreementReference,
                    } }) });
        }
        case QuoteEditActions.DeleteFailure.Type:
        case QuoteEditActions.EditLineItemFromDetailsFailure.Type:
        case QuoteEditActions.AddCustomPriceToLineItemFailure.Type:
        case QuoteEditActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        case QuoteEditActions.UpdateBillingAccount.Type: {
            return __assign({}, state, { sendDetails: __assign({}, state.sendDetails, { billingAccount: __assign({}, state.sendDetails.billingAccount, action.form) }) });
        }
        case QuoteEditActions.OverrideInvoiceContact.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { sendDetails: __assign({}, clonedState.sendDetails, { invoiceContact: __assign({}, clonedState.sendDetails.invoiceContact, action.contact) }) });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=quote-edit.state.js.map