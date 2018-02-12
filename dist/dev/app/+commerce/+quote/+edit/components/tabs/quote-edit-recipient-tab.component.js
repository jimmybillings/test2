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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_1 = require("../../../../components/tabs/tab");
var current_user_service_1 = require("../../../../../shared/services/current-user.service");
var app_store_1 = require("../../../../../app.store");
var wz_form_picklist_component_1 = require("../wz-form-picklist.component");
var wz_form_autocomplete_view_component_1 = require("../wz-form-autocomplete-view.component");
;
var QuoteEditRecipientTabComponent = (function (_super) {
    __extends(QuoteEditRecipientTabComponent, _super);
    function QuoteEditRecipientTabComponent(store, currentUserService) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.currentUserService = currentUserService;
        return _this;
    }
    QuoteEditRecipientTabComponent.prototype.ngOnInit = function () {
        this.config = this.sendConfig();
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
            return this.store.select(function (state) { return state.quoteEdit.sendDetails; })
                .map(function (sendDetails) { return (_this.userAccountMatchesBillingAccount(sendDetails) ||
                _this.allBillingFieldsSelected(sendDetails)); });
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
        if ((state.billingAccount.name === state.user.accountName) && !state.invoiceContact.id) {
            this.config.invoiceContact = this.config.invoiceContact.map(function (item) {
                item.validation = 'OPTIONAL';
                return item;
            });
            this.billingAccountForm.resetForm();
            this.invoiceContactform.resetForm();
        }
        if ((state.billingAccount.name !== state.user.accountName) && !state.invoiceContact.id) {
            this.config.invoiceContact = this.config.invoiceContact.map(function (item) {
                item.validation = 'REQUIRED';
                return item;
            });
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
                return state.invoiceContact.id ?
                    c.id === state.invoiceContact.id :
                    c.id === state.billingAccount.invoiceContactId;
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
                    validation: 'OPTIONAL'
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
    __decorate([
        core_1.ViewChild('invoiceContactform'),
        __metadata("design:type", wz_form_picklist_component_1.WzFormPicklistComponent)
    ], QuoteEditRecipientTabComponent.prototype, "invoiceContactform", void 0);
    __decorate([
        core_1.ViewChild('billingAccountForm'),
        __metadata("design:type", wz_form_autocomplete_view_component_1.WzFormAutoCompleteViewComponent)
    ], QuoteEditRecipientTabComponent.prototype, "billingAccountForm", void 0);
    __decorate([
        core_1.ViewChild('salesManagerForm'),
        __metadata("design:type", wz_form_autocomplete_view_component_1.WzFormAutoCompleteViewComponent)
    ], QuoteEditRecipientTabComponent.prototype, "salesManagerForm", void 0);
    __decorate([
        core_1.ViewChild('recipientForm'),
        __metadata("design:type", wz_form_autocomplete_view_component_1.WzFormAutoCompleteViewComponent)
    ], QuoteEditRecipientTabComponent.prototype, "recipientForm", void 0);
    QuoteEditRecipientTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-edit-recipient-tab-component',
            templateUrl: 'quote-edit-recipient-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore,
            current_user_service_1.CurrentUserService])
    ], QuoteEditRecipientTabComponent);
    return QuoteEditRecipientTabComponent;
}(tab_1.Tab));
exports.QuoteEditRecipientTabComponent = QuoteEditRecipientTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXJlY2lwaWVudC10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzRjtBQWN0Rix1REFBc0Q7QUFDdEQsNEZBQXlGO0FBQ3pGLHNEQUFvRDtBQUdwRCw0RUFBd0U7QUFDeEUsOEZBQXlGO0FBUXhGLENBQUM7QUFRRjtJQUFvRCxrREFBRztJQVFyRCx3Q0FDVSxLQUFlLEVBQ2Ysa0JBQXNDO1FBRmhELFlBR0UsaUJBQU8sU0FDUjtRQUhTLFdBQUssR0FBTCxLQUFLLENBQVU7UUFDZix3QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9COztJQUVoRCxDQUFDO0lBRUQsaURBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxzQkFBVyxnREFBSTthQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDdEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwREFBYzthQUF6QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMERBQWM7YUFBekI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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QUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFlBQVk7b0JBQ2pELFVBQVUsRUFBRSxPQUFPO2lCQUNwQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsMkJBQTJCO29CQUNqQyxLQUFLLEVBQUUsMENBQTBDO29CQUNqRCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLFVBQVU7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQTNQZ0M7UUFBaEMsZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FBNEIsb0RBQXVCOzhFQUFDO0lBQ25EO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQTRCLHFFQUErQjs4RUFBQztJQUM3RDtRQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDO2tDQUEwQixxRUFBK0I7NEVBQUM7SUFDNUQ7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQXVCLHFFQUErQjt5RUFBQztJQUp2RSw4QkFBOEI7UUFQMUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0NBQW9DO1lBQzlDLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FXaUIsb0JBQVE7WUFDSyx5Q0FBa0I7T0FWckMsOEJBQThCLENBNlAxQztJQUFELHFDQUFDO0NBN1BELEFBNlBDLENBN1BtRCxTQUFHLEdBNlB0RDtBQTdQWSx3RUFBOEIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvK2VkaXQvY29tcG9uZW50cy90YWJzL3F1b3RlLWVkaXQtcmVjaXBpZW50LXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1xuICBRdW90ZU9wdGlvbnMsXG4gIFNlbmREZXRhaWxzLFxuICBTZW5kRGV0YWlsc0JpbGxpbmdBY2NvdW50LFxuICBTZW5kRGV0YWlsc0ludm9pY2VDb250YWN0LFxuICBTZW5kRGV0YWlsc1VzZXIsXG4gIFNlbmREZXRhaWxzU2FsZXNNYW5hZ2VyLFxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV3pGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FjY291bnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWInO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV3pGb3JtUGlja2xpc3RDb21wb25lbnQgfSBmcm9tICcuLi93ei1mb3JtLXBpY2tsaXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekZvcm1BdXRvQ29tcGxldGVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vd3otZm9ybS1hdXRvY29tcGxldGUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmludGVyZmFjZSBTZW5kRGV0YWlsc0NvbmZpZyB7XG4gIHVzZXI6IEZvcm1GaWVsZHNbXTtcbiAgYmlsbGluZ0FjY291bnQ6IEZvcm1GaWVsZHNbXTtcbiAgaW52b2ljZUNvbnRhY3Q6IFBvam9bXTtcbiAgc2FsZXNNYW5hZ2VyOiBGb3JtRmllbGRzW107XG59O1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncXVvdGUtZWRpdC1yZWNpcGllbnQtdGFiLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAncXVvdGUtZWRpdC1yZWNpcGllbnQtdGFiLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFF1b3RlRWRpdFJlY2lwaWVudFRhYkNvbXBvbmVudCBleHRlbmRzIFRhYiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2ludm9pY2VDb250YWN0Zm9ybScpIHB1YmxpYyBpbnZvaWNlQ29udGFjdGZvcm06IFd6Rm9ybVBpY2tsaXN0Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdiaWxsaW5nQWNjb3VudEZvcm0nKSBwdWJsaWMgYmlsbGluZ0FjY291bnRGb3JtOiBXekZvcm1BdXRvQ29tcGxldGVWaWV3Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdzYWxlc01hbmFnZXJGb3JtJykgcHVibGljIHNhbGVzTWFuYWdlckZvcm06IFd6Rm9ybUF1dG9Db21wbGV0ZVZpZXdDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3JlY2lwaWVudEZvcm0nKSBwdWJsaWMgcmVjaXBpZW50Rm9ybTogV3pGb3JtQXV0b0NvbXBsZXRlVmlld0NvbXBvbmVudDtcblxuICBwdWJsaWMgY29uZmlnOiBTZW5kRGV0YWlsc0NvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyU2VydmljZTogQ3VycmVudFVzZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5zZW5kQ29uZmlnKCk7XG4gICAgdGhpcy5pbml0aWFsaXplU2FsZXNNYW5hZ2VySW5TdGF0ZSgpO1xuICAgIHRoaXMubGlzdGVuVG9TdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXNlcigpOiBPYnNlcnZhYmxlPFNlbmREZXRhaWxzVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuc2VuZERldGFpbHMudXNlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbGxpbmdBY2NvdW50KCk6IE9ic2VydmFibGU8U2VuZERldGFpbHNCaWxsaW5nQWNjb3VudD4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuc2VuZERldGFpbHMuYmlsbGluZ0FjY291bnQpO1xuICB9XG5cbiAgcHVibGljIGdldCBpbnZvaWNlQ29udGFjdCgpOiBPYnNlcnZhYmxlPFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2FsZXNNYW5hZ2VyKCk6IE9ic2VydmFibGU8U2VuZERldGFpbHNTYWxlc01hbmFnZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LnNlbmREZXRhaWxzLnNhbGVzTWFuYWdlcik7XG4gIH1cblxuICBwdWJsaWMgdXNlclNlbGVjdCh1c2VyOiBVc2VyKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZFVzZXJUb1F1b3RlKHVzZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBhY2NvdW50U2VsZWN0KGFjY291bnQ6IEFjY291bnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuYWRkQmlsbGluZ0FjY291bnRUb1F1b3RlKGFjY291bnQpKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnZvaWNlQ29udGFjdFNlbGVjdChldmVudDogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5hZGRJbnZvaWNlQ29udGFjdFRvUXVvdGUoZXZlbnQudmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoZm9ybTogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVTYWxlc01hbmFnZXJGb3JtT25RdW90ZShmb3JtKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFsbEJpbGxpbmdTZWxlY3Rpb25Db21wbGV0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LnNlbmREZXRhaWxzKVxuICAgICAgLm1hcCgoc2VuZERldGFpbHM6IFNlbmREZXRhaWxzKSA9PiAoXG4gICAgICAgIHRoaXMudXNlckFjY291bnRNYXRjaGVzQmlsbGluZ0FjY291bnQoc2VuZERldGFpbHMpIHx8XG4gICAgICAgIHRoaXMuYWxsQmlsbGluZ0ZpZWxkc1NlbGVjdGVkKHNlbmREZXRhaWxzKVxuICAgICAgKSk7XG4gIH1cblxuICBwdWJsaWMgb25FZGl0YWJsZUZpZWxkQ2hhbmdlKGNoYW5nZTogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVCaWxsaW5nQWNjb3VudChjaGFuZ2UpKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoZWNrYm94Q2hhbmdlKGV2ZW50OiBNYXRDaGVja2JveENoYW5nZSk6IHZvaWQge1xuICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIHRoaXMuaW52b2ljZUNvbnRhY3Rmb3JtLmZvcm0uY29udHJvbHMpIHtcbiAgICAgIGlmIChldmVudC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuaW52b2ljZUNvbnRhY3Rmb3JtLmZvcm0uY29udHJvbHNbY29udHJvbE5hbWVdLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0Lm92ZXJyaWRlSW52b2ljZUNvbnRhY3Qoe1xuICAgICAgICAgIGlkOiB0aGlzLmN1cnJlbnRVc2VyU2VydmljZS5zdGF0ZS5pZCxcbiAgICAgICAgICBjb250YWN0RW1haWw6IHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLnN0YXRlLmVtYWlsQWRkcmVzcyxcbiAgICAgICAgICBuYW1lOiBgJHt0aGlzLmN1cnJlbnRVc2VyU2VydmljZS5zdGF0ZS5maXJzdE5hbWV9ICR7dGhpcy5jdXJyZW50VXNlclNlcnZpY2Uuc3RhdGUubGFzdE5hbWV9YFxuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmludm9pY2VDb250YWN0Zm9ybS5mb3JtLmNvbnRyb2xzW2NvbnRyb2xOYW1lXS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZEludm9pY2VDb250YWN0VG9RdW90ZShcbiAgICAgICAgICB0aGlzLmludm9pY2VDb250YWN0Zm9ybS5mb3JtLnZhbHVlLmludm9pY2VDb250YWN0XG4gICAgICAgICkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXNlckFjY291bnRNYXRjaGVzQmlsbGluZ0FjY291bnQoc2VuZERldGFpbHM6IFNlbmREZXRhaWxzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChzZW5kRGV0YWlscy51c2VyLmhhc093blByb3BlcnR5KCdhY2NvdW50TmFtZScpICYmIHNlbmREZXRhaWxzLmJpbGxpbmdBY2NvdW50Lmhhc093blByb3BlcnR5KCduYW1lJykpICYmXG4gICAgICBzZW5kRGV0YWlscy51c2VyLmFjY291bnROYW1lID09PSBzZW5kRGV0YWlscy5iaWxsaW5nQWNjb3VudC5uYW1lICYmXG4gICAgICB0aGlzLmZvcm1zQXJlVmFsaWQ7XG4gIH1cblxuICBwcml2YXRlIGFsbEJpbGxpbmdGaWVsZHNTZWxlY3RlZChzZW5kRGV0YWlsczogU2VuZERldGFpbHMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VuZERldGFpbHMudXNlci5oYXNPd25Qcm9wZXJ0eSgnYWNjb3VudE5hbWUnKSAmJlxuICAgICAgc2VuZERldGFpbHMuYmlsbGluZ0FjY291bnQuaGFzT3duUHJvcGVydHkoJ2lkJykgJiZcbiAgICAgIHNlbmREZXRhaWxzLmludm9pY2VDb250YWN0Lmhhc093blByb3BlcnR5KCdpZCcpICYmXG4gICAgICB0aGlzLmZvcm1zQXJlVmFsaWQ7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVTYWxlc01hbmFnZXJJblN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PlxuICAgICAgZmFjdG9yeS5xdW90ZUVkaXQuaW5pdGlhbGl6ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlKFxuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyU2VydmljZS5zdGF0ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgIHRoaXMuZGVmYXVsdERhdGUoMTUpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZvcm1zQXJlVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmJpbGxpbmdBY2NvdW50Rm9ybSAmJiB0aGlzLmJpbGxpbmdBY2NvdW50Rm9ybS5mb3JtLnZhbGlkKSAmJlxuICAgICAgKHRoaXMuc2FsZXNNYW5hZ2VyRm9ybSAmJiB0aGlzLnNhbGVzTWFuYWdlckZvcm0uZm9ybS52YWxpZCkgJiZcbiAgICAgICh0aGlzLnJlY2lwaWVudEZvcm0gJiYgdGhpcy5yZWNpcGllbnRGb3JtLmZvcm0udmFsaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0RGF0ZShkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBkYXlzKTtcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKS5yZXBsYWNlKC8tL2csICcvJyk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvU3RhdGVDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5zZW5kRGV0YWlscykuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIHRoaXMubWVyZ2VGb3JtVmFsdWVzKHN0YXRlKTtcbiAgICAgIHRoaXMudXBkYXRlRm9ybVZhbGlkaXR5KHN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRm9ybVZhbGlkaXR5KHN0YXRlOiBTZW5kRGV0YWlscyk6IHZvaWQge1xuXG4gICAgaWYgKCF0aGlzLmludm9pY2VDb250YWN0Zm9ybSB8fCAhdGhpcy5iaWxsaW5nQWNjb3VudEZvcm0pIHJldHVybjtcbiAgICBpZiAoKHN0YXRlLmJpbGxpbmdBY2NvdW50Lm5hbWUgPT09IHN0YXRlLnVzZXIuYWNjb3VudE5hbWUpICYmICFzdGF0ZS5pbnZvaWNlQ29udGFjdC5pZCkge1xuICAgICAgdGhpcy5jb25maWcuaW52b2ljZUNvbnRhY3QgPSB0aGlzLmNvbmZpZy5pbnZvaWNlQ29udGFjdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0udmFsaWRhdGlvbiA9ICdPUFRJT05BTCc7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmJpbGxpbmdBY2NvdW50Rm9ybS5yZXNldEZvcm0oKTtcbiAgICAgIHRoaXMuaW52b2ljZUNvbnRhY3Rmb3JtLnJlc2V0Rm9ybSgpO1xuICAgIH1cblxuICAgIGlmICgoc3RhdGUuYmlsbGluZ0FjY291bnQubmFtZSAhPT0gc3RhdGUudXNlci5hY2NvdW50TmFtZSkgJiYgIXN0YXRlLmludm9pY2VDb250YWN0LmlkKSB7XG4gICAgICB0aGlzLmNvbmZpZy5pbnZvaWNlQ29udGFjdCA9IHRoaXMuY29uZmlnLmludm9pY2VDb250YWN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgaXRlbS52YWxpZGF0aW9uID0gJ1JFUVVJUkVEJztcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYmlsbGluZ0FjY291bnRGb3JtLm1hcmtGaWVsZHNBc1RvdWNoZWQoKTtcbiAgICAgIHRoaXMuaW52b2ljZUNvbnRhY3Rmb3JtLm1hcmtGaWVsZHNBc1RvdWNoZWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRm9ybVZhbHVlcyhzdGF0ZTogU2VuZERldGFpbHMpOiB2b2lkIHtcbiAgICBpZiAoc3RhdGUudXNlci5lbWFpbCkge1xuICAgICAgdGhpcy5jb25maWcudXNlclswXS52YWx1ZSA9IHN0YXRlLnVzZXIuZW1haWw7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmJpbGxpbmdBY2NvdW50LmlkKSB7XG4gICAgICB0aGlzLmNvbmZpZy5iaWxsaW5nQWNjb3VudCA9IHRoaXMuY29uZmlnLmJpbGxpbmdBY2NvdW50Lm1hcChmaWVsZCA9PiB7XG4gICAgICAgIGZpZWxkLnZhbHVlID0gc3RhdGUuYmlsbGluZ0FjY291bnRbZmllbGQubmFtZV07XG4gICAgICAgIGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnbWF4JykgJiYgc3RhdGUuYmlsbGluZ0FjY291bnQuaGFzT3duUHJvcGVydHkoJ3JlYWRvbmx5UGF5bWVudFRlcm1zRGF5cycpKSB7XG4gICAgICAgICAgZmllbGQubWF4ID0gc3RhdGUuYmlsbGluZ0FjY291bnQucmVhZG9ubHlQYXltZW50VGVybXNEYXlzO1xuICAgICAgICAgIGlmICh0aGlzLmJpbGxpbmdBY2NvdW50Rm9ybSkgdGhpcy5iaWxsaW5nQWNjb3VudEZvcm0udXBkYXRlVmFsaWRhdG9yc0ZvcihmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmludm9pY2VDb250YWN0LmNvbnRhY3RzKSB7XG4gICAgICBjb25zdCBjb250YWN0ID0gc3RhdGUuaW52b2ljZUNvbnRhY3QuY29udGFjdHMuZmluZChjID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmludm9pY2VDb250YWN0LmlkID9cbiAgICAgICAgICBjLmlkID09PSBzdGF0ZS5pbnZvaWNlQ29udGFjdC5pZCA6XG4gICAgICAgICAgYy5pZCA9PT0gc3RhdGUuYmlsbGluZ0FjY291bnQuaW52b2ljZUNvbnRhY3RJZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb25maWcuaW52b2ljZUNvbnRhY3RbMF0udmFsdWUgPSBjb250YWN0IHx8ICcnO1xuICAgICAgdGhpcy5jb25maWcuaW52b2ljZUNvbnRhY3RbMF0ub3B0aW9ucyA9IHN0YXRlLmludm9pY2VDb250YWN0LmNvbnRhY3RzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VuZENvbmZpZygpOiBTZW5kRGV0YWlsc0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXI6IFtcbiAgICAgICAge1xuICAgICAgICAgIGVuZFBvaW50OiAndXNlci9zZWFyY2hGaWVsZHMnLFxuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAnZmllbGRzLGVtYWlsQWRkcmVzcyx2YWx1ZXMnLFxuICAgICAgICAgIHNlcnZpY2U6ICdpZGVudGl0aWVzJyxcbiAgICAgICAgICBzdWdnZXN0aW9uSGVhZGluZzogJ01hdGNoaW5nIHVzZXJzJyxcbiAgICAgICAgICBuYW1lOiAnZW1haWxBZGRyZXNzJyxcbiAgICAgICAgICBsYWJlbDogJ1FVT1RFLkVESVQuRk9STVMuUkVDSVBJRU5UX0VNQUlMX0xBQkVMJyxcbiAgICAgICAgICB0eXBlOiAnc3VnZ2VzdGlvbnMnLFxuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBiaWxsaW5nQWNjb3VudDogW1xuICAgICAgICB7XG4gICAgICAgICAgZW5kUG9pbnQ6ICdhY2NvdW50L3NlYXJjaEZpZWxkcycsXG4gICAgICAgICAgcXVlcnlQYXJhbXM6ICdmaWVsZHMsbmFtZSx2YWx1ZXMnLFxuICAgICAgICAgIHNlcnZpY2U6ICdpZGVudGl0aWVzJyxcbiAgICAgICAgICBzdWdnZXN0aW9uSGVhZGluZzogJ01hdGNoaW5nIGFjY291bnRzJyxcbiAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgbGFiZWw6ICdRVU9URS5FRElULkZPUk1TLkFDQ09VTlRfTkFNRV9MQUJFTCcsXG4gICAgICAgICAgdHlwZTogJ3N1Z2dlc3Rpb25zJyxcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3NhbGVzT3duZXInLFxuICAgICAgICAgIGxhYmVsOiAnUVVPVEUuRURJVC5TQUxFU19PV05FUl9LRVknLFxuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3BheW1lbnRUZXJtc0RheXMnLFxuICAgICAgICAgIGxhYmVsOiAnUVVPVEUuRURJVC5QQVlNRU5UX1RFUk1TX0RBWVNfS0VZJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGlvbjogJ0JFVFdFRU4nLFxuICAgICAgICAgIG1pbjogJzEnLFxuICAgICAgICAgIG1heDogJzAnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBpbnZvaWNlQ29udGFjdDogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2ludm9pY2VDb250YWN0JyxcbiAgICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgICBsYWJlbDogJ1FVT1RFLkVESVQuRk9STVMuSU5WT0lDRV9DT05UQUNUX0xBQkVMJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGlvbjogJ09QVElPTkFMJ1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgc2FsZXNNYW5hZ2VyOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBkZWZhdWx0OiAnVE9EQVkrMTUnLFxuICAgICAgICAgIG5hbWU6ICdleHBpcmF0aW9uRGF0ZScsXG4gICAgICAgICAgbGFiZWw6ICdRVU9URS5FRElULkZPUk1TLkVYUElSQVRJT05fREFURV9MQUJFTCcsXG4gICAgICAgICAgdHlwZTogJ3d6ZGF0ZScsXG4gICAgICAgICAgbWluaW11bTogJ1RPREFZJyxcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLFxuICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3NhbGVzTWFuYWdlcicsXG4gICAgICAgICAgbGFiZWw6ICdRVU9URS5FRElULkZPUk1TLlNBTEVTX01BTkFHRVJfTEFCRUwnLFxuICAgICAgICAgIHR5cGU6ICdlbWFpbCcsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLnN0YXRlLmVtYWlsQWRkcmVzcyxcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnRU1BSUwnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnb2ZmbGluZUFncmVlbWVudFJlZmVyZW5jZScsXG4gICAgICAgICAgbGFiZWw6ICdRVU9URS5FRElULkZPUk1TLk9GRkxJTkVfQUdSRUVNRU5UX0xBQkVMJyxcbiAgICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnT1BUSU9OQUwnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
