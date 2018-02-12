"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_show_component_1 = require("./quote-show.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var Observable_1 = require("rxjs/Observable");
function main() {
    describe('Quote Show Component', function () {
        var componentUnderTest;
        var mockAppStore;
        var mockCapabilities;
        var mockQuoteService;
        var mockChangeDetectorRef;
        beforeEach(function () {
            mockCapabilities = { administerQuotes: function () { return false; } };
            mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { purchaseType: 'blah', id: 7 } } };
            mockAppStore = new mock_app_store_1.MockAppStore();
            mockAppStore.createStateSection('uiConfig', { components: { quoteComment: { config: { form: { items: ['wow'] } } } } });
            mockAppStore.createActionFactoryMethod('checkout', 'reset');
            mockChangeDetectorRef = { markForCheck: function () { } };
            componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, mockAppStore, mockChangeDetectorRef);
        });
        describe('Initialization', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            it('defines the expected tabs', function () {
                expect(componentUnderTest.tabLabelKeys).toEqual(['quote', 'billing', 'payment', 'confirm']);
            });
            it('disables all but the first tab', function () {
                expect(componentUnderTest.tabEnabled).toEqual([true, false, false, false]);
            });
            it('selects the first tab', function () {
                expect(componentUnderTest.selectedTabIndex).toBe(0);
            });
            it('assigns the commentFormConfig instance variable', function () {
                expect(componentUnderTest.commentFormConfig).toEqual(['wow']);
            });
            it('assigns the commentParentObject instance variable', function () {
                expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'quote', objectId: 7 });
            });
        });
        describe('onNotification()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            describe('GO_TO_NEXT_TAB', function () {
                it('enables the next tab, but no others', function () {
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    expect(componentUnderTest.tabEnabled).toEqual([true, true, false, false]);
                });
                it('selects the next tab', function (done) {
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    setTimeout(function (_) {
                        expect(componentUnderTest.selectedTabIndex).toBe(1);
                        done();
                    }, 100);
                });
                it('does not advance beyond the last tab', function (done) {
                    componentUnderTest.selectedTabIndex = 4;
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    setTimeout(function (_) {
                        expect(componentUnderTest.selectedTabIndex).toBe(4);
                        done();
                    }, 100);
                });
            });
            describe('GO_TO_PREVIOUS_TAB', function () {
                it('selects the previous tab', function () {
                    componentUnderTest.selectedTabIndex = 1;
                    componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });
                    expect(componentUnderTest.selectedTabIndex).toBe(0);
                });
                it('does not go back beyond the first tab', function () {
                    componentUnderTest.selectedTabIndex = 0;
                    componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });
                    expect(componentUnderTest.selectedTabIndex).toBe(0);
                });
            });
        });
        describe('hasDiscount()', function () {
            it('is true when discount exists in quoteService state data', function () {
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { discount: 20 } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.hasDiscount).toBe(true);
            });
            it('is false when discount does not exist in quoteService state data', function () {
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: {} } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.hasDiscount).toBe(false);
            });
        });
        describe('hasPurchaseType()', function () {
            it('is true when purchase type exists in quoteService state data', function () {
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { purchaseType: 'Standard' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.hasPurchaseType).toBe(true);
            });
            it('is false when purchase type does not exist in quoteService state data', function () {
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: {} } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.hasPurchaseType).toBe(false);
            });
        });
        describe('shouldDisplayReview()', function () {
            it('is true if the user can administer quotes', function () {
                mockCapabilities = { administerQuotes: function () { return true; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: {} } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayReview).toBe(true);
            });
            it('is true if the quote status is not active', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { quoteStatus: 'EXPIRED' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayReview).toBe(true);
            });
            it('is false when the user cannot administer quotes and the quote status is active', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayReview).toBe(false);
            });
        });
        describe('shouldDisplayPurchaseHeader()', function () {
            it('is true if the user cannot administer quotes and the quote status is active', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(true);
            });
            it('is false if the user can administer quotes and the quote status is active', function () {
                mockCapabilities = { administerQuotes: function () { return true; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(false);
            });
            it('is false if the user cannot administer quotes and the quote status is not active', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { quoteStatus: 'EXPIRED' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(false);
            });
        });
        describe('displayActiveOfflineAgreementToPurchaser()', function () {
            it('is true if the user cannot administer quotes and the quote status is active, and lineItems have externalAgreementIds ', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = {
                    data: Observable_1.Observable.of({ data: {} }),
                    state: {
                        data: {
                            quoteStatus: 'ACTIVE',
                            projects: [
                                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
                            ]
                        }
                    }
                };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(true);
            });
            it('is false if lineItems do NOT have externalAgreementIds ', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = {
                    data: Observable_1.Observable.of({ data: {} }),
                    state: {
                        data: {
                            quoteStatus: 'ACTIVE',
                            projects: [
                                { lineItems: [{}] }
                            ]
                        }
                    }
                };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
            });
            it('is false if the user can administer quotes', function () {
                mockCapabilities = { administerQuotes: function () { return true; } };
                mockQuoteService = {
                    data: Observable_1.Observable.of({ data: {} }),
                    state: {
                        data: {
                            quoteStatus: 'ACTIVE',
                            projects: [
                                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
                            ]
                        }
                    }
                };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
            });
            it('is false if the quoteStaus is not ACTIVE', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                mockQuoteService = {
                    data: Observable_1.Observable.of({ data: {} }),
                    state: {
                        data: {
                            quoteStatus: 'EXPIRED',
                            projects: [
                                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
                            ]
                        }
                    }
                };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
            });
        });
        describe('shouldShowRecipientInfo()', function () {
            it('is true if the user can administer quotes', function () {
                mockCapabilities = { administerQuotes: function () { return true; } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldShowRecipientInfo).toBe(true);
            });
            it('is false if the user cannot administer quotes', function () {
                mockCapabilities = { administerQuotes: function () { return false; } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.shouldShowRecipientInfo).toBe(false);
            });
        });
        describe('trStringForPurchaseType()', function () {
            it('is whatever the purchase type is for set purchase types', function () {
                mockQuoteService = { data: Observable_1.Observable.of({}), state: { data: { purchaseType: 'Trial' } } };
                componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                expect(componentUnderTest.trStringForPurchaseType).toBe('QUOTE.Trial');
            });
        });
        describe('toggleCommentVisibility', function () {
            it('should toggle the showComments flag', function () {
                expect(componentUnderTest.showComments).toBe(null);
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(true);
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(false);
            });
        });
        describe('commentCount', function () {
            it('should get the count from the correct part of the store', function () {
                mockAppStore.createStateSection('comment', { quote: { pagination: { totalCount: 10 } } });
                componentUnderTest.commentCount.take(1).subscribe(function (count) { return expect(count).toBe(10); });
            });
        });
        describe('offlineAgreementIds getter', function () {
            describe('should return any externalAgreementIds from the quote\'s lineItems', function () {
                it('for 1 lineItem in 1 project', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: { data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }] }] } }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123');
                });
                it('for 1 lineItem in many projects', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: {
                                projects: [
                                    { lineItems: [{ externalAgreementIds: ['abc-123'] }] },
                                    { lineItems: [{ externalAgreementIds: ['def-456'] }] }
                                ]
                            }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456');
                });
                it('for many lineItems in 1 project', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] }] }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456');
                });
                it('for many lineItems in many projects', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: {
                                projects: [
                                    { lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] },
                                    { lineItems: [{ externalAgreementIds: ['fgh-789'] }, { externalAgreementIds: ['ijk-012'] }] }
                                ]
                            }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456, fgh-789, ijk-012');
                });
                it('with duplicate identifiers', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['abc-123'] }] }] }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123');
                });
                it('with no identifiers', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: { projects: [{ lineItems: [{ some: 'lineItem' }, { some: 'lineItem' }] }] }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('');
                });
                it('with no lineItems', function () {
                    mockQuoteService = {
                        data: Observable_1.Observable.of({ data: {} }),
                        state: {
                            data: { projects: [{ feeLineItems: [{ some: 'feeLineItem' }] }] }
                        }
                    };
                    componentUnderTest = new quote_show_component_1.QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
                    expect(componentUnderTest.offlineAgreementIds).toEqual('');
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytzaG93L3F1b3RlLXNob3cuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBNEQ7QUFDNUQsNkVBQTBFO0FBQzFFLDhDQUE2QztBQUc3QztJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGtCQUFzQyxDQUFDO1FBQzNDLElBQUksWUFBMEIsQ0FBQztRQUMvQixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxxQkFBMEIsQ0FBQztRQUUvQixVQUFVLENBQUM7WUFDVCxnQkFBZ0IsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxFQUFFLENBQUM7WUFFckQsZ0JBQWdCLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBRWpHLFlBQVksR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUNsQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEgsWUFBWSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU1RCxxQkFBcUIsR0FBRyxFQUFFLFlBQVksRUFBRSxjQUFRLENBQUMsRUFBRSxDQUFDO1lBRXBELGtCQUFrQixHQUFHLElBQUkseUNBQWtCLENBQ3pDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFlB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QkFDRixrQkFBa0IsR0FBRyxJQUFJLHlDQUFrQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQztvQkFFakcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE5WEQsb0JBOFhDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytzaG93L3F1b3RlLXNob3cuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdW90ZVNob3dDb21wb25lbnQgfSBmcm9tICcuL3F1b3RlLXNob3cuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlIFNob3cgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFF1b3RlU2hvd0NvbXBvbmVudDtcbiAgICBsZXQgbW9ja0FwcFN0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IG1vY2tDYXBhYmlsaXRpZXM6IGFueTtcbiAgICBsZXQgbW9ja1F1b3RlU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWY6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHsgYWRtaW5pc3RlclF1b3RlczogKCkgPT4gZmFsc2UgfTtcblxuICAgICAgbW9ja1F1b3RlU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7fSksIHN0YXRlOiB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnYmxhaCcsIGlkOiA3IH0gfSB9O1xuXG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrQXBwU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHsgY29tcG9uZW50czogeyBxdW90ZUNvbW1lbnQ6IHsgY29uZmlnOiB7IGZvcm06IHsgaXRlbXM6IFsnd293J10gfSB9IH0gfSB9KTtcbiAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjaGVja291dCcsICdyZXNldCcpO1xuXG4gICAgICBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYgPSB7IG1hcmtGb3JDaGVjazogKCkgPT4geyB9IH07XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQoXG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG1vY2tBcHBTdG9yZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0luaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkZWZpbmVzIHRoZSBleHBlY3RlZCB0YWJzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRhYkxhYmVsS2V5cykudG9FcXVhbChbJ3F1b3RlJywgJ2JpbGxpbmcnLCAncGF5bWVudCcsICdjb25maXJtJ10pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNhYmxlcyBhbGwgYnV0IHRoZSBmaXJzdCB0YWInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGFiRW5hYmxlZCkudG9FcXVhbChbdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZWxlY3RzIHRoZSBmaXJzdCB0YWInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYXNzaWducyB0aGUgY29tbWVudEZvcm1Db25maWcgaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudEZvcm1Db25maWcpLnRvRXF1YWwoWyd3b3cnXSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Fzc2lnbnMgdGhlIGNvbW1lbnRQYXJlbnRPYmplY3QgaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudFBhcmVudE9iamVjdCkudG9FcXVhbCh7IG9iamVjdFR5cGU6ICdxdW90ZScsIG9iamVjdElkOiA3IH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Ob3RpZmljYXRpb24oKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnR09fVE9fTkVYVF9UQUInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdlbmFibGVzIHRoZSBuZXh0IHRhYiwgYnV0IG5vIG90aGVycycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fTkVYVF9UQUInIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50YWJFbmFibGVkKS50b0VxdWFsKFt0cnVlLCB0cnVlLCBmYWxzZSwgZmFsc2VdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NlbGVjdHMgdGhlIG5leHQgdGFiJywgKGRvbmUpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fTkVYVF9UQUInIH0pO1xuXG4gICAgICAgICAgc2V0VGltZW91dChfID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgYWR2YW5jZSBiZXlvbmQgdGhlIGxhc3QgdGFiJywgKGRvbmUpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCA9IDQ7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fTkVYVF9UQUInIH0pO1xuXG4gICAgICAgICAgc2V0VGltZW91dChfID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSg0KTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnR09fVE9fUFJFVklPVVNfVEFCJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2VsZWN0cyB0aGUgcHJldmlvdXMgdGFiJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZWxlY3RlZFRhYkluZGV4ID0gMTtcblxuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdHT19UT19QUkVWSU9VU19UQUInIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWxlY3RlZFRhYkluZGV4KS50b0JlKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgZ28gYmFjayBiZXlvbmQgdGhlIGZpcnN0IHRhYicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCA9IDA7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fUFJFVklPVVNfVEFCJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNEaXNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIHRydWUgd2hlbiBkaXNjb3VudCBleGlzdHMgaW4gcXVvdGVTZXJ2aWNlIHN0YXRlIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2Yoe30pLCBzdGF0ZTogeyBkYXRhOiB7IGRpc2NvdW50OiAyMCB9IH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc0Rpc2NvdW50KS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpcyBmYWxzZSB3aGVuIGRpc2NvdW50IGRvZXMgbm90IGV4aXN0IGluIHF1b3RlU2VydmljZSBzdGF0ZSBkYXRhJywgKCkgPT4ge1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YToge30gfSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG51bGwsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzRGlzY291bnQpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzUHVyY2hhc2VUeXBlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnaXMgdHJ1ZSB3aGVuIHB1cmNoYXNlIHR5cGUgZXhpc3RzIGluIHF1b3RlU2VydmljZSBzdGF0ZSBkYXRhJywgKCkgPT4ge1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdTdGFuZGFyZCcgfSB9IH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobnVsbCwgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNQdXJjaGFzZVR5cGUpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gcHVyY2hhc2UgdHlwZSBkb2VzIG5vdCBleGlzdCBpbiBxdW90ZVNlcnZpY2Ugc3RhdGUgZGF0YScsICgpID0+IHtcbiAgICAgICAgbW9ja1F1b3RlU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7fSksIHN0YXRlOiB7IGRhdGE6IHt9IH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc1B1cmNoYXNlVHlwZSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGREaXNwbGF5UmV2aWV3KCknLCAoKSA9PiB7XG4gICAgICBpdCgnaXMgdHJ1ZSBpZiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMgPSB7IGFkbWluaXN0ZXJRdW90ZXM6ICgpID0+IHRydWUgfTtcbiAgICAgICAgbW9ja1F1b3RlU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7fSksIHN0YXRlOiB7IGRhdGE6IHt9IH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZERpc3BsYXlSZXZpZXcpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIHRydWUgaWYgdGhlIHF1b3RlIHN0YXR1cyBpcyBub3QgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YTogeyBxdW90ZVN0YXR1czogJ0VYUElSRUQnIH0gfSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkRGlzcGxheVJldmlldykudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaXMgZmFsc2Ugd2hlbiB0aGUgdXNlciBjYW5ub3QgYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBxdW90ZSBzdGF0dXMgaXMgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YTogeyBxdW90ZVN0YXR1czogJ0FDVElWRScgfSB9IH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobW9ja0NhcGFiaWxpdGllcywgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGREaXNwbGF5UmV2aWV3KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZERpc3BsYXlQdXJjaGFzZUhlYWRlcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIHRydWUgaWYgdGhlIHVzZXIgY2Fubm90IGFkbWluaXN0ZXIgcXVvdGVzIGFuZCB0aGUgcXVvdGUgc3RhdHVzIGlzIGFjdGl2ZScsICgpID0+IHtcbiAgICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHsgYWRtaW5pc3RlclF1b3RlczogKCkgPT4gZmFsc2UgfTtcbiAgICAgICAgbW9ja1F1b3RlU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7fSksIHN0YXRlOiB7IGRhdGE6IHsgcXVvdGVTdGF0dXM6ICdBQ1RJVkUnIH0gfSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkRGlzcGxheVB1cmNoYXNlSGVhZGVyKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpcyBmYWxzZSBpZiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBxdW90ZSBzdGF0dXMgaXMgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiB0cnVlIH07XG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2Yoe30pLCBzdGF0ZTogeyBkYXRhOiB7IHF1b3RlU3RhdHVzOiAnQUNUSVZFJyB9IH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZERpc3BsYXlQdXJjaGFzZUhlYWRlcikudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIGZhbHNlIGlmIHRoZSB1c2VyIGNhbm5vdCBhZG1pbmlzdGVyIHF1b3RlcyBhbmQgdGhlIHF1b3RlIHN0YXR1cyBpcyBub3QgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YTogeyBxdW90ZVN0YXR1czogJ0VYUElSRUQnIH0gfSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkRGlzcGxheVB1cmNoYXNlSGVhZGVyKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Rpc3BsYXlBY3RpdmVPZmZsaW5lQWdyZWVtZW50VG9QdXJjaGFzZXIoKScsICgpID0+IHtcbiAgICAgIGl0KCdpcyB0cnVlIGlmIHRoZSB1c2VyIGNhbm5vdCBhZG1pbmlzdGVyIHF1b3RlcyBhbmQgdGhlIHF1b3RlIHN0YXR1cyBpcyBhY3RpdmUsIGFuZCBsaW5lSXRlbXMgaGF2ZSBleHRlcm5hbEFncmVlbWVudElkcyAnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMgPSB7IGFkbWluaXN0ZXJRdW90ZXM6ICgpID0+IGZhbHNlIH07XG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHF1b3RlU3RhdHVzOiAnQUNUSVZFJyxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgZXh0ZXJuYWxBZ3JlZW1lbnRJZHM6IFsnYWJjLTEyMyddIH1dIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlBY3RpdmVPZmZsaW5lQWdyZWVtZW50VG9QdXJjaGFzZXIpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIGZhbHNlIGlmIGxpbmVJdGVtcyBkbyBOT1QgaGF2ZSBleHRlcm5hbEFncmVlbWVudElkcyAnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMgPSB7IGFkbWluaXN0ZXJRdW90ZXM6ICgpID0+IGZhbHNlIH07XG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHF1b3RlU3RhdHVzOiAnQUNUSVZFJyxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3t9XSB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobW9ja0NhcGFiaWxpdGllcywgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kaXNwbGF5QWN0aXZlT2ZmbGluZUFncmVlbWVudFRvUHVyY2hhc2VyKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaXMgZmFsc2UgaWYgdGhlIHVzZXIgY2FuIGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiB0cnVlIH07XG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHF1b3RlU3RhdHVzOiAnQUNUSVZFJyxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgZXh0ZXJuYWxBZ3JlZW1lbnRJZHM6IFsnYWJjLTEyMyddIH1dIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlBY3RpdmVPZmZsaW5lQWdyZWVtZW50VG9QdXJjaGFzZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpcyBmYWxzZSBpZiB0aGUgcXVvdGVTdGF1cyBpcyBub3QgQUNUSVZFJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0ge1xuICAgICAgICAgIGRhdGE6IE9ic2VydmFibGUub2YoeyBkYXRhOiB7fSB9KSxcbiAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBxdW90ZVN0YXR1czogJ0VYUElSRUQnLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfV0gfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheUFjdGl2ZU9mZmxpbmVBZ3JlZW1lbnRUb1B1cmNoYXNlcikudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93UmVjaXBpZW50SW5mbygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIHRydWUgaWYgdGhlIHVzZXIgY2FuIGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiB0cnVlIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobW9ja0NhcGFiaWxpdGllcywgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UmVjaXBpZW50SW5mbykudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaXMgZmFsc2UgaWYgdGhlIHVzZXIgY2Fubm90IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1JlY2lwaWVudEluZm8pLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJTdHJpbmdGb3JQdXJjaGFzZVR5cGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdpcyB3aGF0ZXZlciB0aGUgcHVyY2hhc2UgdHlwZSBpcyBmb3Igc2V0IHB1cmNoYXNlIHR5cGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHt9KSwgc3RhdGU6IHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdUcmlhbCcgfSB9IH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobnVsbCwgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50clN0cmluZ0ZvclB1cmNoYXNlVHlwZSkudG9CZSgnUVVPVEUuVHJpYWwnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUNvbW1lbnRWaXNpYmlsaXR5JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgdGhlIHNob3dDb21tZW50cyBmbGFnJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZShudWxsKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZSh0cnVlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21tZW50Q291bnQnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGdldCB0aGUgY291bnQgZnJvbSB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY29tbWVudCcsIHsgcXVvdGU6IHsgcGFnaW5hdGlvbjogeyB0b3RhbENvdW50OiAxMCB9IH0gfSk7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRDb3VudC50YWtlKDEpLnN1YnNjcmliZShjb3VudCA9PiBleHBlY3QoY291bnQpLnRvQmUoMTApKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29mZmxpbmVBZ3JlZW1lbnRJZHMgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3Nob3VsZCByZXR1cm4gYW55IGV4dGVybmFsQWdyZWVtZW50SWRzIGZyb20gdGhlIHF1b3RlXFwncyBsaW5lSXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdmb3IgMSBsaW5lSXRlbSBpbiAxIHByb2plY3QnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1F1b3RlU2VydmljZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IE9ic2VydmFibGUub2YoeyBkYXRhOiB7fSB9KSxcbiAgICAgICAgICAgIHN0YXRlOiB7IGRhdGE6IHsgcHJvamVjdHM6IFt7IGxpbmVJdGVtczogW3sgZXh0ZXJuYWxBZ3JlZW1lbnRJZHM6IFsnYWJjLTEyMyddIH1dIH1dIH0gfVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzKS50b0VxdWFsKCdhYmMtMTIzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgMSBsaW5lSXRlbSBpbiBtYW55IHByb2plY3RzJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgZGF0YToge30gfSksXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfV0gfSxcbiAgICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydkZWYtNDU2J10gfV0gfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzKS50b0VxdWFsKCdhYmMtMTIzLCBkZWYtNDU2Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgbWFueSBsaW5lSXRlbXMgaW4gMSBwcm9qZWN0JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgZGF0YToge30gfSksXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICBkYXRhOiB7IHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGV4dGVybmFsQWdyZWVtZW50SWRzOiBbJ2FiYy0xMjMnXSB9LCB7IGV4dGVybmFsQWdyZWVtZW50SWRzOiBbJ2RlZi00NTYnXSB9XSB9XSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93Q29tcG9uZW50KG51bGwsIG1vY2tRdW90ZVNlcnZpY2UsIG51bGwsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9mZmxpbmVBZ3JlZW1lbnRJZHMpLnRvRXF1YWwoJ2FiYy0xMjMsIGRlZi00NTYnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBtYW55IGxpbmVJdGVtcyBpbiBtYW55IHByb2plY3RzJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgZGF0YToge30gfSksXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydkZWYtNDU2J10gfV0gfSxcbiAgICAgICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydmZ2gtNzg5J10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydpamstMDEyJ10gfV0gfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzKS50b0VxdWFsKCdhYmMtMTIzLCBkZWYtNDU2LCBmZ2gtNzg5LCBpamstMDEyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRoIGR1cGxpY2F0ZSBpZGVudGlmaWVycycsICgpID0+IHtcbiAgICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0ge1xuICAgICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgZGF0YTogeyBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfV0gfV0gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlU2hvd0NvbXBvbmVudChudWxsLCBtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzKS50b0VxdWFsKCdhYmMtMTIzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRoIG5vIGlkZW50aWZpZXJzJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgZGF0YToge30gfSksXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICBkYXRhOiB7IHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IHNvbWU6ICdsaW5lSXRlbScgfSwgeyBzb21lOiAnbGluZUl0ZW0nIH1dIH1dIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobnVsbCwgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub2ZmbGluZUFncmVlbWVudElkcykudG9FcXVhbCgnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRoIG5vIGxpbmVJdGVtcycsICgpID0+IHtcbiAgICAgICAgICBtb2NrUXVvdGVTZXJ2aWNlID0ge1xuICAgICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgZGF0YTogeyBwcm9qZWN0czogW3sgZmVlTGluZUl0ZW1zOiBbeyBzb21lOiAnZmVlTGluZUl0ZW0nIH1dIH1dIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dDb21wb25lbnQobnVsbCwgbW9ja1F1b3RlU2VydmljZSwgbnVsbCwgbW9ja0NoYW5nZURldGVjdG9yUmVmKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub2ZmbGluZUFncmVlbWVudElkcykudG9FcXVhbCgnJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
