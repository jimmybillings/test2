"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_1 = require("../../../../components/tabs/tab");
var current_user_service_1 = require("../../../../../shared/services/current-user.service");
var app_store_1 = require("../../../../../app.store");
;
var QuoteEditRecipientTabComponent = (function (_super) {
    __extends(QuoteEditRecipientTabComponent, _super);
    function QuoteEditRecipientTabComponent(store, currentUserService) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.currentUserService = currentUserService;
        _this.config = _this.sendConfig();
        return _this;
    }
    QuoteEditRecipientTabComponent.prototype.ngOnInit = function () {
        this.initializeSalesManagerInState();
        this.listenToStateChanges();
    };
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "user", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails.user; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "billingAccount", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails.billingAccount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "invoiceContact", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails.invoiceContact; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "salesManager", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails.salesManager; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditRecipientTabComponent.prototype.userSelect = function (user) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.addUserToQuote(user); });
    };
    QuoteEditRecipientTabComponent.prototype.accountSelect = function (account) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.addBillingAccountToQuote(account); });
    };
    QuoteEditRecipientTabComponent.prototype.invoiceContactSelect = function (event) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.addInvoiceContactToQuote(event.value); });
    };
    QuoteEditRecipientTabComponent.prototype.onBlur = function (form) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.updateSalesManagerFormOnQuote(form); });
    };
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "allBillingSelectionComplete", {
        get: function () {
            var _this = this;
            return this.store.select(function (state) {
                return _this.userAccountMatchesBillingAccount(state.quoteEdit.sendDetails) ||
                    _this.allBillingFieldsSelected(state.quoteEdit.sendDetails);
            });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditRecipientTabComponent.prototype.onEditableFieldChange = function (change) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.updateBillingAccount(change); });
    };
    QuoteEditRecipientTabComponent.prototype.onCheckboxChange = function (event) {
        var _this = this;
        for (var controlName in this.invoiceContactform.form.controls) {
            if (event.checked) {
                this.invoiceContactform.form.controls[controlName].disable();
                this.store.dispatch(function (factory) { return factory.quoteEdit.overrideInvoiceContact({
                    id: _this.currentUserService.state.id,
                    contactEmail: _this.currentUserService.state.emailAddress,
                    name: _this.currentUserService.state.firstName + " " + _this.currentUserService.state.lastName
                }); });
            }
            else {
                this.invoiceContactform.form.controls[controlName].enable();
                this.store.dispatch(function (factory) { return factory.quoteEdit.addInvoiceContactToQuote(_this.invoiceContactform.form.value.invoiceContact); });
            }
        }
    };
    QuoteEditRecipientTabComponent.prototype.userAccountMatchesBillingAccount = function (sendDetails) {
        return (sendDetails.user.hasOwnProperty('accountName') && sendDetails.billingAccount.hasOwnProperty('name')) &&
            sendDetails.user.accountName === sendDetails.billingAccount.name &&
            this.formsAreValid;
    };
    QuoteEditRecipientTabComponent.prototype.allBillingFieldsSelected = function (sendDetails) {
        return sendDetails.user.hasOwnProperty('accountName') &&
            sendDetails.billingAccount.hasOwnProperty('id') &&
            sendDetails.invoiceContact.hasOwnProperty('id') &&
            this.formsAreValid;
    };
    QuoteEditRecipientTabComponent.prototype.initializeSalesManagerInState = function () {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.quoteEdit.initializeSalesManagerFormOnQuote(_this.currentUserService.state.emailAddress, _this.defaultDate(15));
        });
    };
    Object.defineProperty(QuoteEditRecipientTabComponent.prototype, "formsAreValid", {
        get: function () {
            return (this.billingAccountForm && this.billingAccountForm.form.valid) &&
                (this.salesManagerForm && this.salesManagerForm.form.valid) &&
                (this.recipientForm && this.recipientForm.form.valid);
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditRecipientTabComponent.prototype.defaultDate = function (days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().slice(0, 10).replace(/-/g, '/');
    };
    QuoteEditRecipientTabComponent.prototype.listenToStateChanges = function () {
        var _this = this;
        this.store.select(function (state) { return state.quoteEdit.sendDetails; }).subscribe(function (state) {
            _this.mergeFormValues(state);
            _this.updateFormValidity(state);
        });
    };
    QuoteEditRecipientTabComponent.prototype.updateFormValidity = function (state) {
        if (!this.invoiceContactform || !this.billingAccountForm)
            return;
        if ((state.billingAccount.name === state.user.accountName) && !state.invoiceContact.hasOwnProperty('id')) {
            this.billingAccountForm.resetForm();
            this.invoiceContactform.resetForm();
        }
        if ((state.billingAccount.name !== state.user.accountName) && !state.invoiceContact.hasOwnProperty('id')) {
            this.billingAccountForm.markFieldsAsTouched();
            this.invoiceContactform.markFieldsAsTouched();
        }
    };
    QuoteEditRecipientTabComponent.prototype.mergeFormValues = function (state) {
        var _this = this;
        if (state.user.email) {
            this.config.user[0].value = state.user.email;
        }
        if (state.billingAccount.id) {
            this.config.billingAccount = this.config.billingAccount.map(function (field) {
                field.value = state.billingAccount[field.name];
                if (field.hasOwnProperty('max') && state.billingAccount.hasOwnProperty('readonlyPaymentTermsDays')) {
                    field.max = state.billingAccount.readonlyPaymentTermsDays;
                    if (_this.billingAccountForm)
                        _this.billingAccountForm.updateValidatorsFor(field);
                }
                return field;
            });
        }
        if (state.invoiceContact.contacts) {
            var contact = state.invoiceContact.contacts.find(function (c) {
                return state.invoiceContact.id ? c.id === state.invoiceContact.id : c.id === state.billingAccount.invoiceContactId;
            });
            this.config.invoiceContact[0].value = contact || '';
            this.config.invoiceContact[0].options = state.invoiceContact.contacts;
        }
    };
    QuoteEditRecipientTabComponent.prototype.sendConfig = function () {
        return {
            user: [
                {
                    endPoint: 'user/searchFields',
                    queryParams: 'fields,emailAddress,values',
                    service: 'identities',
                    suggestionHeading: 'Matching users',
                    name: 'emailAddress',
                    label: 'QUOTE.EDIT.FORMS.RECIPIENT_EMAIL_LABEL',
                    type: 'suggestions',
                    value: '',
                    validation: 'REQUIRED'
                }
            ],
            billingAccount: [
                {
                    endPoint: 'account/searchFields',
                    queryParams: 'fields,name,values',
                    service: 'identities',
                    suggestionHeading: 'Matching accounts',
                    name: 'name',
                    label: 'QUOTE.EDIT.FORMS.ACCOUNT_NAME_LABEL',
                    type: 'suggestions',
                    value: '',
                    validation: 'REQUIRED'
                },
                {
                    name: 'salesOwner',
                    label: 'QUOTE.EDIT.SALES_OWNER_KEY',
                    type: 'text',
                    value: '',
                    validation: 'REQUIRED'
                },
                {
                    name: 'paymentTermsDays',
                    label: 'QUOTE.EDIT.PAYMENT_TERMS_DAYS_KEY',
                    type: 'number',
                    value: '',
                    validation: 'BETWEEN',
                    min: '1',
                    max: '0'
                }
            ],
            invoiceContact: [
                {
                    name: 'invoiceContact',
                    options: [],
                    label: 'QUOTE.EDIT.FORMS.INVOICE_CONTACT_LABEL',
                    type: 'select',
                    value: '',
                    validation: 'REQUIRED'
                }
            ],
            salesManager: [
                {
                    default: 'TODAY+15',
                    name: 'expirationDate',
                    label: 'QUOTE.EDIT.FORMS.EXPIRATION_DATE_LABEL',
                    type: 'wzdate',
                    minimum: 'TODAY',
                    validation: 'REQUIRED',
                    value: ''
                },
                {
                    name: 'salesManager',
                    label: 'QUOTE.EDIT.FORMS.SALES_MANAGER_LABEL',
                    type: 'email',
                    value: this.currentUserService.state.emailAddress,
                    validation: 'EMAIL'
                },
                {
                    name: 'offlineAgreementReference',
                    label: 'QUOTE.EDIT.FORMS.OFFLINE_AGREEMENT_LABEL',
                    type: 'textarea',
                    value: '',
                    validation: 'OPTIONAL'
                }
            ]
        };
    };
    QuoteEditRecipientTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-edit-recipient-tab-component',
                    templateUrl: 'quote-edit-recipient-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteEditRecipientTabComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    QuoteEditRecipientTabComponent.propDecorators = {
        'invoiceContactform': [{ type: core_1.ViewChild, args: ['invoiceContactform',] },],
        'billingAccountForm': [{ type: core_1.ViewChild, args: ['billingAccountForm',] },],
        'salesManagerForm': [{ type: core_1.ViewChild, args: ['salesManagerForm',] },],
        'recipientForm': [{ type: core_1.ViewChild, args: ['recipientForm',] },],
    };
    return QuoteEditRecipientTabComponent;
}(tab_1.Tab));
exports.QuoteEditRecipientTabComponent = QuoteEditRecipientTabComponent;
//# sourceMappingURL=quote-edit-recipient-tab.component.js.map