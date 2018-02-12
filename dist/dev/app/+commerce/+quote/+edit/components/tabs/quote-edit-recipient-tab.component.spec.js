"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../../../store/spec-helpers/mock-app.store");
var quote_edit_recipient_tab_component_1 = require("./quote-edit-recipient-tab.component");
function defaultDate(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10).replace(/-/g, '/');
}
function main() {
    describe('Quote Edit Recipient Tab Component', function () {
        var componentUnderTest;
        var addUserToQuoteDispatchSpy;
        var addBillingAccountToQuoteDispatchSpy;
        var addInvoiceContactToQuoteDispatchSpy;
        var updateSalesManagerFormOnQuoteDispatchSpy;
        var initializeSalesManagerFormOnQuoteDispatchSpy;
        var overrideInvoiceContactDispatchSpy;
        var updateBillingAccountDispatchSpy;
        var mockForm;
        var mockCurrentUserService;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('quoteEdit', {
                data: {},
                sendDetails: {
                    user: {
                        customerName: null,
                        accountName: null
                    },
                    billingAccount: {
                        salesOwner: null,
                        purchaseOnCredit: null,
                        creditExemption: null,
                        paymentTermsDays: null,
                        licensingVertical: null
                    },
                    invoiceContact: {
                        contactEmail: null
                    },
                    salesManager: {
                        expirationDate: null,
                        salesManager: null,
                        offlineAgreement: null
                    }
                },
                loading: false
            });
            addUserToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addUserToQuote');
            addBillingAccountToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addBillingAccountToQuote');
            addInvoiceContactToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addInvoiceContactToQuote');
            updateBillingAccountDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateBillingAccount');
            overrideInvoiceContactDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'overrideInvoiceContact');
            updateSalesManagerFormOnQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateSalesManagerFormOnQuote');
            initializeSalesManagerFormOnQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'initializeSalesManagerFormOnQuote');
            mockForm = {
                resetForm: jasmine.createSpy('resetForm'),
                markFieldsAsTouched: jasmine.createSpy('markFieldsAsTouched'),
                form: {
                    valid: true,
                    value: { invoiceContact: { name: 'Ross Edfort', contactEmail: 'ross@ross.com' } },
                    controls: { someControl: { disable: jasmine.createSpy('disable'), enable: jasmine.createSpy('enable') } }
                }
            };
            mockCurrentUserService = { state: { id: 10, emailAddress: 'test email', firstName: 'test', lastName: 'user' } };
            componentUnderTest = new quote_edit_recipient_tab_component_1.QuoteEditRecipientTabComponent(mockStore, mockCurrentUserService);
        });
        describe('ngOnInit()', function () {
            describe('initializeSalesManagerInState()', function () {
                it('dispatches the proper action', function () {
                    componentUnderTest.ngOnInit();
                    expect(initializeSalesManagerFormOnQuoteDispatchSpy).toHaveBeenCalledWith('test email', defaultDate(15));
                });
            });
            describe('updateFormValidity()', function () {
                beforeEach(function () {
                    componentUnderTest.invoiceContactform = mockForm;
                    componentUnderTest.billingAccountForm = mockForm;
                });
                it('resets the forms if the user account name matches the billing account', function () {
                    mockStore.createStateSection('quoteEdit', {
                        sendDetails: {
                            user: {
                                accountName: 'Test Account',
                            },
                            billingAccount: {
                                name: 'Test Account',
                                id: 1
                            },
                            invoiceContact: {}
                        }
                    });
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.invoiceContactform.resetForm).toHaveBeenCalled();
                    expect(componentUnderTest.invoiceContactform.markFieldsAsTouched).not.toHaveBeenCalled();
                    expect(componentUnderTest.billingAccountForm.resetForm).toHaveBeenCalled();
                    expect(componentUnderTest.billingAccountForm.markFieldsAsTouched).not.toHaveBeenCalled();
                    expect(componentUnderTest.config.invoiceContact[0].validation).toEqual('OPTIONAL');
                });
                it("marks the forms as touched if the user account name does not match the billing account", function () {
                    mockStore.createStateSection('quoteEdit', {
                        sendDetails: {
                            user: {
                                accountName: 'Test 2 Account',
                            },
                            billingAccount: {
                                name: 'Test Account',
                                id: 1
                            },
                            invoiceContact: {}
                        }
                    });
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.invoiceContactform.resetForm).not.toHaveBeenCalled();
                    expect(componentUnderTest.invoiceContactform.markFieldsAsTouched).toHaveBeenCalled();
                    expect(componentUnderTest.billingAccountForm.resetForm).not.toHaveBeenCalled();
                    expect(componentUnderTest.billingAccountForm.markFieldsAsTouched).toHaveBeenCalled();
                    expect(componentUnderTest.config.invoiceContact[0].validation).toEqual('REQUIRED');
                });
            });
            describe('mergeFormValues()', function () {
                it('updates the config when the billingAccount changes in the state', function () {
                    mockStore.createStateSection('quoteEdit', {
                        sendDetails: {
                            billingAccount: { id: 1, readonlyPaymentTermsDays: 30, salesOwner: 'Ross' },
                            user: { email: 'some-email' },
                            invoiceContact: {}
                        }
                    });
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.config.billingAccount[1].value).toBe('Ross');
                    expect(componentUnderTest.config.billingAccount[2].max).toBe(30);
                });
                it('updats the config when the invoiceContact changes in the state', function () {
                    mockStore.createStateSection('quoteEdit', {
                        sendDetails: {
                            billingAccount: { invoiceContactId: 13 },
                            user: { email: 'some-email' },
                            invoiceContact: { contacts: [{ id: 13, some: 'user' }] }
                        }
                    });
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.config.invoiceContact[0].value).toEqual({ id: 13, some: 'user' });
                    expect(componentUnderTest.config.invoiceContact[0].options).toEqual([{ id: 13, some: 'user' }]);
                });
            });
        });
        describe('get user()', function () {
            it('returns an observable of the send details user', function () {
                var user;
                componentUnderTest.user.subscribe(function (returnedUser) { return user = returnedUser; });
                expect(user).toEqual({
                    customerName: null,
                    accountName: null
                });
            });
        });
        describe('get billingAccount()', function () {
            it('returns an observable of the send details user', function () {
                var billingAccount;
                componentUnderTest.billingAccount.subscribe(function (returnedBillingAccount) { return billingAccount = returnedBillingAccount; });
                expect(billingAccount).toEqual({
                    salesOwner: null,
                    purchaseOnCredit: null,
                    creditExemption: null,
                    paymentTermsDays: null,
                    licensingVertical: null
                });
            });
        });
        describe('get invoiceContact()', function () {
            it('returns an observable of the send details user', function () {
                var invoiceContact;
                componentUnderTest.invoiceContact.subscribe(function (returnedInvoiceContact) { return invoiceContact = returnedInvoiceContact; });
                expect(invoiceContact).toEqual({
                    contactEmail: null
                });
            });
        });
        describe('get salesManager()', function () {
            it('returns an observable of the send details user', function () {
                var salesManager;
                componentUnderTest.salesManager.subscribe(function (returnedSalesManager) { return salesManager = returnedSalesManager; });
                expect(salesManager).toEqual({
                    expirationDate: null,
                    salesManager: null,
                    offlineAgreement: null
                });
            });
        });
        describe('userSelect()', function () {
            it('dispatches addUserToQuote with a User', function () {
                componentUnderTest.userSelect({ user: 'some user' });
                expect(addUserToQuoteDispatchSpy).toHaveBeenCalledWith({ user: 'some user' });
            });
        });
        describe('accountSelect()', function () {
            it('dispatches addBillingAccountToQuote with an Account', function () {
                componentUnderTest.accountSelect({ account: 'some account' });
                expect(addBillingAccountToQuoteDispatchSpy).toHaveBeenCalledWith({ account: 'some account' });
            });
        });
        describe('invoiceContactSelect()', function () {
            it('dispatches addInvoiceContactToQuote with a value from event', function () {
                componentUnderTest.invoiceContactSelect({ value: 'some contact' });
                expect(addInvoiceContactToQuoteDispatchSpy).toHaveBeenCalledWith('some contact');
            });
        });
        describe('onBlur()', function () {
            it('dispatchs updateSalesManagerFormOnQuote with the sales manager form', function () {
                componentUnderTest.onBlur({ salesManger: 'some sales manager' });
                expect(updateSalesManagerFormOnQuoteDispatchSpy).toHaveBeenCalledWith({ salesManger: 'some sales manager' });
            });
        });
        describe('get allBillingSelectionComplete()', function () {
            beforeEach(function () {
                componentUnderTest.salesManagerForm = mockForm;
                componentUnderTest.billingAccountForm = mockForm;
                componentUnderTest.recipientForm = mockForm;
            });
            it('returns true if the user account matches the selected billing account', function () {
                var billingSectionsComplete;
                mockStore.createStateSection('quoteEdit', {
                    sendDetails: {
                        user: {
                            accountName: 'Test Account',
                        },
                        billingAccount: {
                            name: 'Test Account',
                        }
                    }
                });
                componentUnderTest.allBillingSelectionComplete.subscribe(function (complete) { return billingSectionsComplete = complete; });
                expect(billingSectionsComplete).toEqual(true);
            });
            it('returns true when invoice contact is selected and the user account doesnt match billing account', function () {
                var billingSectionsComplete;
                mockStore.createStateSection('quoteEdit', {
                    sendDetails: {
                        user: {
                            accountName: 'Test Account',
                        },
                        billingAccount: {
                            name: 'Test 2 Account',
                            id: 1
                        },
                        invoiceContact: {
                            id: 3
                        }
                    }
                });
                componentUnderTest.allBillingSelectionComplete.subscribe(function (complete) { return billingSectionsComplete = complete; });
                expect(billingSectionsComplete).toEqual(true);
            });
            it('returns false if the user account does not match the selected billing account and there is no invoice contact', function () {
                var billingSectionsComplete = false;
                mockStore.createStateSection('quoteEdit', {
                    sendDetails: {
                        user: {
                            accountName: 'Test 2 Account',
                        },
                        billingAccount: {
                            name: 'Test Account',
                        }
                    }
                });
                componentUnderTest.allBillingSelectionComplete.subscribe(function (complete) { return billingSectionsComplete = complete; });
                expect(billingSectionsComplete).toEqual(false);
            });
        });
        describe('onEditableFeldChange()', function () {
            it('dispatches the proper action', function () {
                componentUnderTest.onEditableFieldChange({ some: 'change' });
                mockStore.expectDispatchFor(updateBillingAccountDispatchSpy, { some: 'change' });
            });
        });
        describe('onCheckboxChange()', function () {
            describe('when the checkbox has been checked', function () {
                beforeEach(function () {
                    componentUnderTest.invoiceContactform = mockForm;
                    componentUnderTest.onCheckboxChange({ checked: true });
                });
                it('disables the form\s controls', function () {
                    expect(mockForm.form.controls['someControl'].disable).toHaveBeenCalled();
                });
                it('dispatches the proper action', function () {
                    mockStore.expectDispatchFor(overrideInvoiceContactDispatchSpy, { id: 10, contactEmail: 'test email', name: 'test user' });
                });
            });
            describe('when the checkbox has been un-checked', function () {
                beforeEach(function () {
                    componentUnderTest.invoiceContactform = mockForm;
                    componentUnderTest.onCheckboxChange({ checked: false });
                });
                it('enables the form\s controls', function () {
                    expect(mockForm.form.controls['someControl'].enable).toHaveBeenCalled();
                });
                it('dispatches the proper action', function () {
                    mockStore.expectDispatchFor(addInvoiceContactToQuoteDispatchSpy, { name: 'Ross Edfort', contactEmail: 'ross@ross.com' });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXJlY2lwaWVudC10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtRkFBZ0Y7QUFDaEYsMkZBQXNGO0FBUXRGLHFCQUFxQixJQUFZO0lBQy9CLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVEO0lBQ0UsUUFBUSxDQUFDLG9DQUFvQyxFQUFFO1FBQzdDLElBQUksa0JBQWtELENBQUM7UUFDdkQsSUFBSSx5QkFBc0MsQ0FBQztRQUMzQyxJQUFJLG1DQUFnRCxDQUFDO1FBQ3JELElBQUksbUNBQWdELENBQUM7UUFDckQsSUFBSSx3Q0FBcUQsQ0FBQztRQUMxRCxJQUFJLDRDQUF5RCxDQUFDO1FBQzlELElBQUksaUNBQThDLENBQUM7UUFDbkQsSUFBSSwrQkFBNEMsQ0FBQztRQUNqRCxJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFFL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDeEMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRTt3QkFDSixZQUFZLEVBQUUsSUFBSTt3QkFDbEIsV0FBVyxFQUFFLElBQUk7cUJBQ2xCO29CQUNELGNBQWMsRUFB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QUM7b0JBQ1Qsa0JBQWtCLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO29CQUNqRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQVMsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUMxRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7b0JBQ2pDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FDekIsbUNBQW1DLEVBQ25DLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLENBQ3ZELENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBM1ZELG9CQTJWQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS8rZWRpdC9jb21wb25lbnRzL3RhYnMvcXVvdGUtZWRpdC1yZWNpcGllbnQtdGFiLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUXVvdGVFZGl0UmVjaXBpZW50VGFiQ29tcG9uZW50IH0gZnJvbSAnLi9xdW90ZS1lZGl0LXJlY2lwaWVudC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQsXG4gIFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3QsXG4gIFNlbmREZXRhaWxzU2FsZXNNYW5hZ2VyLFxuICBTZW5kRGV0YWlsc1VzZXIsXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbmZ1bmN0aW9uIGRlZmF1bHREYXRlKGRheXM6IG51bWJlcikge1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGRheXMpO1xuICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKS5yZXBsYWNlKC8tL2csICcvJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBSZWNpcGllbnQgVGFiIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBRdW90ZUVkaXRSZWNpcGllbnRUYWJDb21wb25lbnQ7XG4gICAgbGV0IGFkZFVzZXJUb1F1b3RlRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBhZGRCaWxsaW5nQWNjb3VudFRvUXVvdGVEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGFkZEludm9pY2VDb250YWN0VG9RdW90ZURpc3BhdGNoU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgdXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGVEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGluaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZURpc3BhdGNoU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgb3ZlcnJpZGVJbnZvaWNlQ29udGFjdERpc3BhdGNoU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgdXBkYXRlQmlsbGluZ0FjY291bnREaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IG1vY2tGb3JtOiBhbnk7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcblxuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0Jywge1xuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgc2VuZERldGFpbHM6IHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBjdXN0b21lck5hbWU6IG51bGwsXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYmlsbGluZ0FjY291bnQ6IHtcbiAgICAgICAgICAgIHNhbGVzT3duZXI6IG51bGwsXG4gICAgICAgICAgICBwdXJjaGFzZU9uQ3JlZGl0OiBudWxsLFxuICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgcGF5bWVudFRlcm1zRGF5czogbnVsbCxcbiAgICAgICAgICAgIGxpY2Vuc2luZ1ZlcnRpY2FsOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge1xuICAgICAgICAgICAgY29udGFjdEVtYWlsOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzYWxlc01hbmFnZXI6IHtcbiAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBudWxsLFxuICAgICAgICAgICAgc2FsZXNNYW5hZ2VyOiBudWxsLFxuICAgICAgICAgICAgb2ZmbGluZUFncmVlbWVudDogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICBhZGRVc2VyVG9RdW90ZURpc3BhdGNoU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdhZGRVc2VyVG9RdW90ZScpO1xuICAgICAgYWRkQmlsbGluZ0FjY291bnRUb1F1b3RlRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ2FkZEJpbGxpbmdBY2NvdW50VG9RdW90ZScpO1xuICAgICAgYWRkSW52b2ljZUNvbnRhY3RUb1F1b3RlRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ2FkZEludm9pY2VDb250YWN0VG9RdW90ZScpO1xuICAgICAgdXBkYXRlQmlsbGluZ0FjY291bnREaXNwYXRjaFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAndXBkYXRlQmlsbGluZ0FjY291bnQnKTtcbiAgICAgIG92ZXJyaWRlSW52b2ljZUNvbnRhY3REaXNwYXRjaFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnb3ZlcnJpZGVJbnZvaWNlQ29udGFjdCcpO1xuXG4gICAgICB1cGRhdGVTYWxlc01hbmFnZXJGb3JtT25RdW90ZURpc3BhdGNoU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoXG4gICAgICAgICdxdW90ZUVkaXQnLFxuICAgICAgICAndXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUnXG4gICAgICApO1xuXG4gICAgICBpbml0aWFsaXplU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGVEaXNwYXRjaFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKFxuICAgICAgICAncXVvdGVFZGl0JyxcbiAgICAgICAgJ2luaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSdcbiAgICAgICk7XG5cbiAgICAgIG1vY2tGb3JtID0ge1xuICAgICAgICByZXNldEZvcm06IGphc21pbmUuY3JlYXRlU3B5KCdyZXNldEZvcm0nKSxcbiAgICAgICAgbWFya0ZpZWxkc0FzVG91Y2hlZDogamFzbWluZS5jcmVhdGVTcHkoJ21hcmtGaWVsZHNBc1RvdWNoZWQnKSxcbiAgICAgICAgZm9ybToge1xuICAgICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiB7IGludm9pY2VDb250YWN0OiB7IG5hbWU6ICdSb3NzIEVkZm9ydCcsIGNvbnRhY3RFbWFpbDogJ3Jvc3NAcm9zcy5jb20nIH0gfSxcbiAgICAgICAgICBjb250cm9sczogeyBzb21lQ29udHJvbDogeyBkaXNhYmxlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGlzYWJsZScpLCBlbmFibGU6IGphc21pbmUuY3JlYXRlU3B5KCdlbmFibGUnKSB9IH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgc3RhdGU6IHsgaWQ6IDEwLCBlbWFpbEFkZHJlc3M6ICd0ZXN0IGVtYWlsJywgZmlyc3ROYW1lOiAndGVzdCcsIGxhc3ROYW1lOiAndXNlcicgfSB9O1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVFZGl0UmVjaXBpZW50VGFiQ29tcG9uZW50KFxuICAgICAgICBtb2NrU3RvcmUsXG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2VcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdpbml0aWFsaXplU2FsZXNNYW5hZ2VySW5TdGF0ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgcHJvcGVyIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlRGlzcGF0Y2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0ZXN0IGVtYWlsJywgZGVmYXVsdERhdGUoMTUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3VwZGF0ZUZvcm1WYWxpZGl0eSgpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaW52b2ljZUNvbnRhY3Rmb3JtID0gbW9ja0Zvcm07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmJpbGxpbmdBY2NvdW50Rm9ybSA9IG1vY2tGb3JtO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVzZXRzIHRoZSBmb3JtcyBpZiB0aGUgdXNlciBhY2NvdW50IG5hbWUgbWF0Y2hlcyB0aGUgYmlsbGluZyBhY2NvdW50JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ1Rlc3QgQWNjb3VudCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGJpbGxpbmdBY2NvdW50OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgaWQ6IDFcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmludm9pY2VDb250YWN0Zm9ybS5yZXNldEZvcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmludm9pY2VDb250YWN0Zm9ybS5tYXJrRmllbGRzQXNUb3VjaGVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYmlsbGluZ0FjY291bnRGb3JtLnJlc2V0Rm9ybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYmlsbGluZ0FjY291bnRGb3JtLm1hcmtGaWVsZHNBc1RvdWNoZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcuaW52b2ljZUNvbnRhY3RbMF0udmFsaWRhdGlvbikudG9FcXVhbCgnT1BUSU9OQUwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYG1hcmtzIHRoZSBmb3JtcyBhcyB0b3VjaGVkIGlmIHRoZSB1c2VyIGFjY291bnQgbmFtZSBkb2VzIG5vdCBtYXRjaCB0aGUgYmlsbGluZyBhY2NvdW50YCwgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ1Rlc3QgMiBBY2NvdW50JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYmlsbGluZ0FjY291bnQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnVGVzdCBBY2NvdW50JyxcbiAgICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpbnZvaWNlQ29udGFjdDoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW52b2ljZUNvbnRhY3Rmb3JtLnJlc2V0Rm9ybSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmludm9pY2VDb250YWN0Zm9ybS5tYXJrRmllbGRzQXNUb3VjaGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5iaWxsaW5nQWNjb3VudEZvcm0ucmVzZXRGb3JtKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYmlsbGluZ0FjY291bnRGb3JtLm1hcmtGaWVsZHNBc1RvdWNoZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZy5pbnZvaWNlQ29udGFjdFswXS52YWxpZGF0aW9uKS50b0VxdWFsKCdSRVFVSVJFRCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnbWVyZ2VGb3JtVmFsdWVzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCd1cGRhdGVzIHRoZSBjb25maWcgd2hlbiB0aGUgYmlsbGluZ0FjY291bnQgY2hhbmdlcyBpbiB0aGUgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0Jywge1xuICAgICAgICAgICAgc2VuZERldGFpbHM6IHtcbiAgICAgICAgICAgICAgYmlsbGluZ0FjY291bnQ6IHsgaWQ6IDEsIHJlYWRvbmx5UGF5bWVudFRlcm1zRGF5czogMzAsIHNhbGVzT3duZXI6ICdSb3NzJyB9LFxuICAgICAgICAgICAgICB1c2VyOiB7IGVtYWlsOiAnc29tZS1lbWFpbCcgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZy5iaWxsaW5nQWNjb3VudFsxXS52YWx1ZSkudG9CZSgnUm9zcycpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnLmJpbGxpbmdBY2NvdW50WzJdLm1heCkudG9CZSgzMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1cGRhdHMgdGhlIGNvbmZpZyB3aGVuIHRoZSBpbnZvaWNlQ29udGFjdCBjaGFuZ2VzIGluIHRoZSBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7XG4gICAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgICBiaWxsaW5nQWNjb3VudDogeyBpbnZvaWNlQ29udGFjdElkOiAxMyB9LFxuICAgICAgICAgICAgICB1c2VyOiB7IGVtYWlsOiAnc29tZS1lbWFpbCcgfSxcbiAgICAgICAgICAgICAgaW52b2ljZUNvbnRhY3Q6IHsgY29udGFjdHM6IFt7IGlkOiAxMywgc29tZTogJ3VzZXInIH1dIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnLmludm9pY2VDb250YWN0WzBdLnZhbHVlKS50b0VxdWFsKHsgaWQ6IDEzLCBzb21lOiAndXNlcicgfSk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcuaW52b2ljZUNvbnRhY3RbMF0ub3B0aW9ucykudG9FcXVhbChbeyBpZDogMTMsIHNvbWU6ICd1c2VyJyB9XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHVzZXIoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlbmQgZGV0YWlscyB1c2VyJywgKCkgPT4ge1xuICAgICAgICBsZXQgdXNlcjogU2VuZERldGFpbHNVc2VyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlci5zdWJzY3JpYmUocmV0dXJuZWRVc2VyID0+IHVzZXIgPSByZXR1cm5lZFVzZXIpO1xuICAgICAgICBleHBlY3QodXNlcikudG9FcXVhbCh7XG4gICAgICAgICAgY3VzdG9tZXJOYW1lOiBudWxsLFxuICAgICAgICAgIGFjY291bnROYW1lOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGJpbGxpbmdBY2NvdW50KCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIHRoZSBzZW5kIGRldGFpbHMgdXNlcicsICgpID0+IHtcbiAgICAgICAgbGV0IGJpbGxpbmdBY2NvdW50OiBTZW5kRGV0YWlsc0JpbGxpbmdBY2NvdW50O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYmlsbGluZ0FjY291bnQuc3Vic2NyaWJlKHJldHVybmVkQmlsbGluZ0FjY291bnQgPT4gYmlsbGluZ0FjY291bnQgPSByZXR1cm5lZEJpbGxpbmdBY2NvdW50KTtcbiAgICAgICAgZXhwZWN0KGJpbGxpbmdBY2NvdW50KS50b0VxdWFsKHtcbiAgICAgICAgICBzYWxlc093bmVyOiBudWxsLFxuICAgICAgICAgIHB1cmNoYXNlT25DcmVkaXQ6IG51bGwsXG4gICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiBudWxsLFxuICAgICAgICAgIHBheW1lbnRUZXJtc0RheXM6IG51bGwsXG4gICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgaW52b2ljZUNvbnRhY3QoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlbmQgZGV0YWlscyB1c2VyJywgKCkgPT4ge1xuICAgICAgICBsZXQgaW52b2ljZUNvbnRhY3Q6IFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3Q7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5pbnZvaWNlQ29udGFjdC5zdWJzY3JpYmUocmV0dXJuZWRJbnZvaWNlQ29udGFjdCA9PiBpbnZvaWNlQ29udGFjdCA9IHJldHVybmVkSW52b2ljZUNvbnRhY3QpO1xuICAgICAgICBleHBlY3QoaW52b2ljZUNvbnRhY3QpLnRvRXF1YWwoe1xuICAgICAgICAgIGNvbnRhY3RFbWFpbDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBzYWxlc01hbmFnZXIoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgdGhlIHNlbmQgZGV0YWlscyB1c2VyJywgKCkgPT4ge1xuICAgICAgICBsZXQgc2FsZXNNYW5hZ2VyOiBTZW5kRGV0YWlsc1NhbGVzTWFuYWdlcjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNhbGVzTWFuYWdlci5zdWJzY3JpYmUocmV0dXJuZWRTYWxlc01hbmFnZXIgPT4gc2FsZXNNYW5hZ2VyID0gcmV0dXJuZWRTYWxlc01hbmFnZXIpO1xuICAgICAgICBleHBlY3Qoc2FsZXNNYW5hZ2VyKS50b0VxdWFsKHtcbiAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogbnVsbCxcbiAgICAgICAgICBzYWxlc01hbmFnZXI6IG51bGwsXG4gICAgICAgICAgb2ZmbGluZUFncmVlbWVudDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3VzZXJTZWxlY3QoKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaGVzIGFkZFVzZXJUb1F1b3RlIHdpdGggYSBVc2VyJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlclNlbGVjdCh7IHVzZXI6ICdzb21lIHVzZXInIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KGFkZFVzZXJUb1F1b3RlRGlzcGF0Y2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdXNlcjogJ3NvbWUgdXNlcicgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhY2NvdW50U2VsZWN0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGF0Y2hlcyBhZGRCaWxsaW5nQWNjb3VudFRvUXVvdGUgd2l0aCBhbiBBY2NvdW50JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWNjb3VudFNlbGVjdCh7IGFjY291bnQ6ICdzb21lIGFjY291bnQnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KGFkZEJpbGxpbmdBY2NvdW50VG9RdW90ZURpc3BhdGNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGFjY291bnQ6ICdzb21lIGFjY291bnQnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW52b2ljZUNvbnRhY3RTZWxlY3QoKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaGVzIGFkZEludm9pY2VDb250YWN0VG9RdW90ZSB3aXRoIGEgdmFsdWUgZnJvbSBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmludm9pY2VDb250YWN0U2VsZWN0KHsgdmFsdWU6ICdzb21lIGNvbnRhY3QnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KGFkZEludm9pY2VDb250YWN0VG9RdW90ZURpc3BhdGNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc29tZSBjb250YWN0Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkJsdXIoKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaHMgdXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUgd2l0aCB0aGUgc2FsZXMgbWFuYWdlciBmb3JtJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25CbHVyKHsgc2FsZXNNYW5nZXI6ICdzb21lIHNhbGVzIG1hbmFnZXInIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KHVwZGF0ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlRGlzcGF0Y2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc2FsZXNNYW5nZXI6ICdzb21lIHNhbGVzIG1hbmFnZXInIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGFsbEJpbGxpbmdTZWxlY3Rpb25Db21wbGV0ZSgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zYWxlc01hbmFnZXJGb3JtID0gbW9ja0Zvcm07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5iaWxsaW5nQWNjb3VudEZvcm0gPSBtb2NrRm9ybTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlY2lwaWVudEZvcm0gPSBtb2NrRm9ybTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSB1c2VyIGFjY291bnQgbWF0Y2hlcyB0aGUgc2VsZWN0ZWQgYmlsbGluZyBhY2NvdW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgYmlsbGluZ1NlY3Rpb25zQ29tcGxldGU6IEJvb2xlYW47XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ1Rlc3QgQWNjb3VudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmlsbGluZ0FjY291bnQ6IHtcbiAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgQWNjb3VudCcsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFsbEJpbGxpbmdTZWxlY3Rpb25Db21wbGV0ZS5zdWJzY3JpYmUoY29tcGxldGUgPT4gYmlsbGluZ1NlY3Rpb25zQ29tcGxldGUgPSBjb21wbGV0ZSk7XG4gICAgICAgIGV4cGVjdChiaWxsaW5nU2VjdGlvbnNDb21wbGV0ZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gaW52b2ljZSBjb250YWN0IGlzIHNlbGVjdGVkIGFuZCB0aGUgdXNlciBhY2NvdW50IGRvZXNudCBtYXRjaCBiaWxsaW5nIGFjY291bnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBiaWxsaW5nU2VjdGlvbnNDb21wbGV0ZTogQm9vbGVhbjtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0Jywge1xuICAgICAgICAgIHNlbmREZXRhaWxzOiB7XG4gICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgIGFjY291bnROYW1lOiAnVGVzdCBBY2NvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaWxsaW5nQWNjb3VudDoge1xuICAgICAgICAgICAgICBuYW1lOiAnVGVzdCAyIEFjY291bnQnLFxuICAgICAgICAgICAgICBpZDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludm9pY2VDb250YWN0OiB7XG4gICAgICAgICAgICAgIGlkOiAzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFsbEJpbGxpbmdTZWxlY3Rpb25Db21wbGV0ZS5zdWJzY3JpYmUoY29tcGxldGUgPT4gYmlsbGluZ1NlY3Rpb25zQ29tcGxldGUgPSBjb21wbGV0ZSk7XG4gICAgICAgIGV4cGVjdChiaWxsaW5nU2VjdGlvbnNDb21wbGV0ZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgdXNlciBhY2NvdW50IGRvZXMgbm90IG1hdGNoIHRoZSBzZWxlY3RlZCBiaWxsaW5nIGFjY291bnQgYW5kIHRoZXJlIGlzIG5vIGludm9pY2UgY29udGFjdCcsICgpID0+IHtcbiAgICAgICAgbGV0IGJpbGxpbmdTZWN0aW9uc0NvbXBsZXRlOiBCb29sZWFuID0gZmFsc2U7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ1Rlc3QgMiBBY2NvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaWxsaW5nQWNjb3VudDoge1xuICAgICAgICAgICAgICBuYW1lOiAnVGVzdCBBY2NvdW50JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWxsQmlsbGluZ1NlbGVjdGlvbkNvbXBsZXRlLnN1YnNjcmliZShjb21wbGV0ZSA9PiBiaWxsaW5nU2VjdGlvbnNDb21wbGV0ZSA9IGNvbXBsZXRlKTtcbiAgICAgICAgZXhwZWN0KGJpbGxpbmdTZWN0aW9uc0NvbXBsZXRlKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uRWRpdGFibGVGZWxkQ2hhbmdlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgcHJvcGVyIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uRWRpdGFibGVGaWVsZENoYW5nZSh7IHNvbWU6ICdjaGFuZ2UnIH0pO1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IodXBkYXRlQmlsbGluZ0FjY291bnREaXNwYXRjaFNweSwgeyBzb21lOiAnY2hhbmdlJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2hlY2tib3hDaGFuZ2UoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSBjaGVja2JveCBoYXMgYmVlbiBjaGVja2VkJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaW52b2ljZUNvbnRhY3Rmb3JtID0gbW9ja0Zvcm07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2hlY2tib3hDaGFuZ2UoeyBjaGVja2VkOiB0cnVlIH0gYXMgYW55KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Rpc2FibGVzIHRoZSBmb3JtXFxzIGNvbnRyb2xzJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrRm9ybS5mb3JtLmNvbnRyb2xzWydzb21lQ29udHJvbCddLmRpc2FibGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIHByb3BlciBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKFxuICAgICAgICAgICAgb3ZlcnJpZGVJbnZvaWNlQ29udGFjdERpc3BhdGNoU3B5LFxuICAgICAgICAgICAgeyBpZDogMTAsIGNvbnRhY3RFbWFpbDogJ3Rlc3QgZW1haWwnLCBuYW1lOiAndGVzdCB1c2VyJyB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGNoZWNrYm94IGhhcyBiZWVuIHVuLWNoZWNrZWQnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5pbnZvaWNlQ29udGFjdGZvcm0gPSBtb2NrRm9ybTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DaGVja2JveENoYW5nZSh7IGNoZWNrZWQ6IGZhbHNlIH0gYXMgYW55KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VuYWJsZXMgdGhlIGZvcm1cXHMgY29udHJvbHMnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tGb3JtLmZvcm0uY29udHJvbHNbJ3NvbWVDb250cm9sJ10uZW5hYmxlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBwcm9wZXIgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihcbiAgICAgICAgICAgIGFkZEludm9pY2VDb250YWN0VG9RdW90ZURpc3BhdGNoU3B5LFxuICAgICAgICAgICAgeyBuYW1lOiAnUm9zcyBFZGZvcnQnLCBjb250YWN0RW1haWw6ICdyb3NzQHJvc3MuY29tJyB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
