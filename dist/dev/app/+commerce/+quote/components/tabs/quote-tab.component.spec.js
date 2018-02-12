"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var quote_tab_component_1 = require("./quote-tab.component");
var mock_app_store_1 = require("../../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Tab Component', function () {
        var componentUnderTest;
        var mockStore;
        var mockQuoteService;
        var mockUserCan;
        var mockDialogService;
        var mockRouter;
        var mockUiConfig;
        var mockData;
        function buildComponent(quoteHasAssets, canViewLicenses, canAdministerQuotes, quoteStatus) {
            if (quoteStatus === void 0) { quoteStatus = 'ACTIVE'; }
            mockData = { id: 1, quoteStatus: quoteStatus };
            mockQuoteService = {
                data: Observable_1.Observable.of({ data: mockData }),
                projects: Observable_1.Observable.of([]),
                state: { data: mockData },
                getPaymentOptions: jasmine.createSpy('getPaymentOptions'),
                hasAssetLineItems: quoteHasAssets,
                retrieveLicenseAgreements: jasmine.createSpy('retrieveLicenseAgreements').and.returnValue(Observable_1.Observable.of({})),
                mockRouter: { navigate: jasmine.createSpy('navigate') },
                cloneQuote: jasmine.createSpy('cloneQuote').and.returnValue(Observable_1.Observable.of({}))
            };
            mockUserCan = {
                viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(canViewLicenses),
                administerQuotes: jasmine.createSpy('administerQuotes').and.returnValue(canAdministerQuotes),
                cloneQuote: jasmine.createSpy('cloneQuote')
            };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog'),
                openConfirmationDialog: jasmine.createSpy('openConfirmationDialog'),
                openFormDialog: jasmine.createSpy('openFormDialog')
            };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', { components: { cart: { config: { extendQuote: { items: [{ some: 'config' }] } } } } });
            mockStore.createStateSection('quoteShow', { data: { purchaseType: 'Trial' } });
            return new quote_tab_component_1.QuoteTabComponent(mockQuoteService, mockUserCan, mockDialogService, mockRouter, mockStore);
        }
        describe('checkout()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should go to the next tab', function () {
                spyOn(componentUnderTest, 'goToNextTab');
                componentUnderTest.checkout();
                expect(componentUnderTest.goToNextTab).toHaveBeenCalled();
            });
            it('should retrieve the payment options', function () {
                componentUnderTest.checkout();
                expect(mockQuoteService.getPaymentOptions).toHaveBeenCalled();
            });
        });
        describe('shouldShowCloneButton()', function () {
            it('Should call the cloneQuote capability with the quote edit store', function () {
                var shouldShowCloneButton = componentUnderTest.shouldShowCloneButton;
                expect(mockUserCan.cloneQuote).toHaveBeenCalledWith(mockQuoteService.data);
            });
        });
        describe('onCloneQuote()', function () {
            var cloneQuoteSpy;
            beforeEach(function () {
                componentUnderTest = buildComponent(false, false, false);
                cloneQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'cloneQuote');
                mockStore.createStateSection('quoteShow', { data: { id: 1, quote: 'test quote' } });
            });
            it('Should dispatch an action to clone a quote', function () {
                componentUnderTest.onCloneQuote();
                expect(cloneQuoteSpy).toHaveBeenCalled();
            });
            it('Should dispatch an action to clone a quote with the given quote as an argument', function () {
                componentUnderTest.onCloneQuote();
                expect(cloneQuoteSpy).toHaveBeenCalledWith({ id: 1, quote: 'test quote' });
            });
        });
        describe('shouldShowLicenseDetailsBtn()', function () {
            describe('returns true', function () {
                it('when the user can view licenses AND the quote has asset line items', function () {
                    componentUnderTest = buildComponent(true, true, true);
                    expect(componentUnderTest.shouldShowLicenseDetailsBtn).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can\'t view licenses', function () {
                    componentUnderTest = buildComponent(false, false, true);
                    expect(componentUnderTest.shouldShowLicenseDetailsBtn).toBe(false);
                });
            });
        });
        describe('shouldShowExpireQuoteButton', function () {
            describe('returns true', function () {
                it('when the user can administer quotes and the quote is active', function () {
                    componentUnderTest = buildComponent(true, true, true);
                    expect(componentUnderTest.shouldShowExpireQuoteButton).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can\'t administer quotes', function () {
                    componentUnderTest = buildComponent(true, true, false);
                    expect(componentUnderTest.shouldShowExpireQuoteButton).toBe(false);
                });
                it('when the quote isn\'t active', function () {
                    componentUnderTest = buildComponent(true, true, true, 'CANCELLED');
                    expect(componentUnderTest.shouldShowExpireQuoteButton).toBe(false);
                });
            });
        });
        describe('shouldShowCheckoutOptions', function () {
            describe('returns true', function () {
                it('when the user can\'t administer quotes and the quote is active', function () {
                    componentUnderTest = buildComponent(true, true, false);
                    expect(componentUnderTest.shouldShowCheckoutOptions).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can administer quotes', function () {
                    componentUnderTest = buildComponent(true, true, true);
                    expect(componentUnderTest.shouldShowCheckoutOptions).toBe(false);
                });
                it('when the quote isn\'t active', function () {
                    componentUnderTest = buildComponent(true, true, false, 'EXPIRED');
                    expect(componentUnderTest.shouldShowCheckoutOptions).toBe(false);
                });
            });
        });
        describe('shouldShowRejectButton', function () {
            describe('returns true', function () {
                it('when the user can\'t administer quotes', function () {
                    componentUnderTest = buildComponent(true, true, false);
                    expect(componentUnderTest.shouldShowRejectQuoteButton).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can administer quotes', function () {
                    componentUnderTest = buildComponent(true, true, true);
                    expect(componentUnderTest.shouldShowRejectQuoteButton).toBe(false);
                });
            });
        });
        describe('shouldShowResendButton', function () {
            describe('returns true', function () {
                it('when the user can administer quotes and the quote is active', function () {
                    componentUnderTest = buildComponent(true, true, true);
                    expect(componentUnderTest.shouldShowResendButton).toBe(true);
                });
                it('when the user can administer quotes and the quote is expired', function () {
                    componentUnderTest = buildComponent(true, true, true, 'EXPIRED');
                    expect(componentUnderTest.shouldShowResendButton).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can\'t administer quotes', function () {
                    componentUnderTest = buildComponent(true, true, false);
                    expect(componentUnderTest.shouldShowResendButton).toBe(false);
                });
                it('when the quote is not expired OR active', function () {
                    componentUnderTest = buildComponent(true, true, true, 'CANCELLED');
                    expect(componentUnderTest.shouldShowResendButton).toBe(false);
                });
            });
        });
        describe('showLicenseAgreements()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should call retrieveLicenseAgreements() on the cart service', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockQuoteService.retrieveLicenseAgreements).toHaveBeenCalled();
            });
        });
        describe('showExpireConfirmationDialog', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should call openConfirmationDialog() on the dialog serice', function () {
                componentUnderTest.showExpireConfirmationDialog();
            });
        });
        describe('openRejectQuoteDialog()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should call openConfirmationDialog() on the dialog service', function () {
                componentUnderTest.openRejectQuoteDialog();
                expect(mockDialogService.openConfirmationDialog).toHaveBeenCalled();
            });
        });
        describe('openResendDialog()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should call openFormDialog on the dialog service', function () {
                componentUnderTest.openResendDialog();
                expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'config' }], { title: 'QUOTE.EXTEND_EXPIRATION' }, jasmine.any(Function));
            });
        });
        describe('hasDiscount()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('should return false when discount does NOT exists', function () {
                expect(componentUnderTest.hasDiscount).toBe(false);
            });
            it('should return true if discount has a value', function () {
                var mockState = { data: { discount: 12.0 } };
                mockQuoteService = {
                    data: Observable_1.Observable.of({ data: {} }),
                    state: mockState,
                    projects: Observable_1.Observable.of([])
                };
                componentUnderTest = new quote_tab_component_1.QuoteTabComponent(mockQuoteService, null, null, null, mockStore);
                expect(componentUnderTest.hasDiscount).toBe(true);
            });
        });
        describe('get quoteIsTrial()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('returns true when the quote is of type \'Trial\'', function () {
                mockStore.createStateSection('quoteShow', { data: { purchaseType: 'Trial' } });
                var is;
                componentUnderTest.quoteIsTrial.take(1).subscribe(function (i) { return is = i; });
                expect(is).toBe(true);
            });
            it('returns false when the quote is not of type \'Trial\'', function () {
                mockStore.createStateSection('quoteShow', { data: { purchaseType: 'NotTrial' } });
                var is;
                componentUnderTest.quoteIsTrial.take(1).subscribe(function (i) { return is = i; });
                expect(is).toBe(false);
            });
        });
        describe('get showPricing()', function () {
            beforeEach(function () {
                componentUnderTest = buildComponent(true, true, true);
            });
            it('returns true when the quote is not included in \'quotesWithoutPricing\' ', function () {
                mockStore.createStateSection('quoteShow', { data: { purchaseType: 'Trial' } });
                var show;
                componentUnderTest.showPricing.take(1).subscribe(function (s) { return show = s; });
                expect(show).toBe(false);
            });
            it('returns false when the quote is included in \'quotesWithoutPricing\'', function () {
                mockStore.createStateSection('quoteShow', { data: { purchaseType: 'NotIncluded' } });
                var show;
                componentUnderTest.showPricing.take(1).subscribe(function (s) { return show = s; });
                expect(show).toBe(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsNkRBQTBEO0FBQzFELGdGQUE2RTtBQUU3RTtJQUNFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFJLGtCQUFxQyxDQUFDO1FBQzFDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksV0FBZ0IsQ0FBQztRQUNyQixJQUFJLGlCQUFzQixDQUFDO1FBQzNCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksWUFBaUIsQ0FBQztRQUN0QixJQUFJLFFBQWEsQ0FBQztRQUVsQix3QkFDRSxjQUF1QixFQUN2QixlQUF3QixFQUN4QixtQkFBNEIsRUFDNUIsV0FBOEI7WUFBOUIsNEJBQUEsRUFBQSxzQkFBOEI7WUFFOUIsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7WUFFL0MsZ0JBQWdCLEdBQUc7Z0JBQ2pCLElBQUksRUFBRSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFDdkMsUUFBUSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDekIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekQsaUJBQWlCLEVBQUUsY0FBYztnQkFDakMseUJBQXlCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVHLFVBQVUsRUFBRSxFQUFFLFFBQVEs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Q0FBQyxzRUFBc0UsRUFBRTtnQkFDekUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksSUFBYSxDQUFDO2dCQUNsQixrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksR0FBRyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNVRCxvQkEyVUMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvY29tcG9uZW50cy90YWJzL3F1b3RlLXRhYi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBRdW90ZVRhYkNvbXBvbmVudCB9IGZyb20gJy4vcXVvdGUtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlIFRhYiBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogUXVvdGVUYWJDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBtb2NrUXVvdGVTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tVc2VyQ2FuOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja1VpQ29uZmlnOiBhbnk7XG4gICAgbGV0IG1vY2tEYXRhOiBhbnk7XG5cbiAgICBmdW5jdGlvbiBidWlsZENvbXBvbmVudChcbiAgICAgIHF1b3RlSGFzQXNzZXRzOiBib29sZWFuLFxuICAgICAgY2FuVmlld0xpY2Vuc2VzOiBib29sZWFuLFxuICAgICAgY2FuQWRtaW5pc3RlclF1b3RlczogYm9vbGVhbixcbiAgICAgIHF1b3RlU3RhdHVzOiBzdHJpbmcgPSAnQUNUSVZFJ1xuICAgICk6IFF1b3RlVGFiQ29tcG9uZW50IHtcbiAgICAgIG1vY2tEYXRhID0geyBpZDogMSwgcXVvdGVTdGF0dXM6IHF1b3RlU3RhdHVzIH07XG5cbiAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgIGRhdGE6IE9ic2VydmFibGUub2YoeyBkYXRhOiBtb2NrRGF0YSB9KSxcbiAgICAgICAgcHJvamVjdHM6IE9ic2VydmFibGUub2YoW10pLFxuICAgICAgICBzdGF0ZTogeyBkYXRhOiBtb2NrRGF0YSB9LFxuICAgICAgICBnZXRQYXltZW50T3B0aW9uczogamFzbWluZS5jcmVhdGVTcHkoJ2dldFBheW1lbnRPcHRpb25zJyksXG4gICAgICAgIGhhc0Fzc2V0TGluZUl0ZW1zOiBxdW90ZUhhc0Fzc2V0cyxcbiAgICAgICAgcmV0cmlldmVMaWNlbnNlQWdyZWVtZW50czogamFzbWluZS5jcmVhdGVTcHkoJ3JldHJpZXZlTGljZW5zZUFncmVlbWVudHMnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpLFxuICAgICAgICBtb2NrUm91dGVyOiB7IG5hdmlnYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGUnKSB9LFxuICAgICAgICBjbG9uZVF1b3RlOiBqYXNtaW5lLmNyZWF0ZVNweSgnY2xvbmVRdW90ZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tVc2VyQ2FuID0ge1xuICAgICAgICB2aWV3TGljZW5zZUFncmVlbWVudHNCdXR0b246IGphc21pbmUuY3JlYXRlU3B5KCd2aWV3TGljZW5zZUFncmVlbWVudHNCdXR0b24nKS5hbmQucmV0dXJuVmFsdWUoY2FuVmlld0xpY2Vuc2VzKSxcbiAgICAgICAgYWRtaW5pc3RlclF1b3RlczogamFzbWluZS5jcmVhdGVTcHkoJ2FkbWluaXN0ZXJRdW90ZXMnKS5hbmQucmV0dXJuVmFsdWUoY2FuQWRtaW5pc3RlclF1b3RlcyksXG4gICAgICAgIGNsb25lUXVvdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjbG9uZVF1b3RlJylcbiAgICAgIH07XG5cbiAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlID0ge1xuICAgICAgICBvcGVuQ29tcG9uZW50SW5EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29tcG9uZW50SW5EaWFsb2cnKSxcbiAgICAgICAgb3BlbkNvbmZpcm1hdGlvbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db25maXJtYXRpb25EaWFsb2cnKSxcbiAgICAgICAgb3BlbkZvcm1EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuRm9ybURpYWxvZycpXG4gICAgICB9O1xuXG4gICAgICBtb2NrUm91dGVyID0geyBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbihcbiAgICAgICAgJ3VpQ29uZmlnJyxcbiAgICAgICAgeyBjb21wb25lbnRzOiB7IGNhcnQ6IHsgY29uZmlnOiB7IGV4dGVuZFF1b3RlOiB7IGl0ZW1zOiBbeyBzb21lOiAnY29uZmlnJyB9XSB9IH0gfSB9IH1cbiAgICAgICk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnVHJpYWwnIH0gfSk7XG5cbiAgICAgIHJldHVybiBuZXcgUXVvdGVUYWJDb21wb25lbnQoXG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UsIG1vY2tVc2VyQ2FuLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja1JvdXRlciwgbW9ja1N0b3JlXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdjaGVja291dCgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgZ28gdG8gdGhlIG5leHQgdGFiJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QsICdnb1RvTmV4dFRhYicpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2hlY2tvdXQoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdvVG9OZXh0VGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSB0aGUgcGF5bWVudCBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2hlY2tvdXQoKTtcblxuICAgICAgICBleHBlY3QobW9ja1F1b3RlU2VydmljZS5nZXRQYXltZW50T3B0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd0Nsb25lQnV0dG9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGNsb25lUXVvdGUgY2FwYWJpbGl0eSB3aXRoIHRoZSBxdW90ZSBlZGl0IHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzaG91bGRTaG93Q2xvbmVCdXR0b24gPSBjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0Nsb25lQnV0dG9uO1xuICAgICAgICBleHBlY3QobW9ja1VzZXJDYW4uY2xvbmVRdW90ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja1F1b3RlU2VydmljZS5kYXRhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2xvbmVRdW90ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IGNsb25lUXVvdGVTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQoZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIGNsb25lUXVvdGVTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ2Nsb25lUXVvdGUnKTtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVTaG93JywgeyBkYXRhOiB7IGlkOiAxLCBxdW90ZTogJ3Rlc3QgcXVvdGUnIH0gfSk7XG4gICAgICB9KTtcblxuXG4gICAgICBpdCgnU2hvdWxkIGRpc3BhdGNoIGFuIGFjdGlvbiB0byBjbG9uZSBhIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbG9uZVF1b3RlKCk7XG5cbiAgICAgICAgZXhwZWN0KGNsb25lUXVvdGVTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGRpc3BhdGNoIGFuIGFjdGlvbiB0byBjbG9uZSBhIHF1b3RlIHdpdGggdGhlIGdpdmVuIHF1b3RlIGFzIGFuIGFyZ3VtZW50JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbG9uZVF1b3RlKCk7XG5cbiAgICAgICAgZXhwZWN0KGNsb25lUXVvdGVTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaWQ6IDEsIHF1b3RlOiAndGVzdCBxdW90ZScgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93TGljZW5zZURldGFpbHNCdG4oKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiB2aWV3IGxpY2Vuc2VzIEFORCB0aGUgcXVvdGUgaGFzIGFzc2V0IGxpbmUgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dMaWNlbnNlRGV0YWlsc0J0bikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhblxcJ3QgdmlldyBsaWNlbnNlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudChmYWxzZSwgZmFsc2UsIHRydWUpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93TGljZW5zZURldGFpbHNCdG4pLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dFeHBpcmVRdW90ZUJ1dHRvbicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcyBhbmQgdGhlIHF1b3RlIGlzIGFjdGl2ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0V4cGlyZVF1b3RlQnV0dG9uKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuXFwndCBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dFeHBpcmVRdW90ZUJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBpc25cXCd0IGFjdGl2ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCB0cnVlLCAnQ0FOQ0VMTEVEJyk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dFeHBpcmVRdW90ZUJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd0NoZWNrb3V0T3B0aW9ucycsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhblxcJ3QgYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBxdW90ZSBpcyBhY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQodHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Q2hlY2tvdXRPcHRpb25zKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuIGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Q2hlY2tvdXRPcHRpb25zKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHF1b3RlIGlzblxcJ3QgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIGZhbHNlLCAnRVhQSVJFRCcpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Q2hlY2tvdXRPcHRpb25zKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93UmVqZWN0QnV0dG9uJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuXFwndCBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dSZWplY3RRdW90ZUJ1dHRvbikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1JlamVjdFF1b3RlQnV0dG9uKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93UmVzZW5kQnV0dG9uJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuIGFkbWluaXN0ZXIgcXVvdGVzIGFuZCB0aGUgcXVvdGUgaXMgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UmVzZW5kQnV0dG9uKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBxdW90ZSBpcyBleHBpcmVkJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUsICdFWFBJUkVEJyk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dSZXNlbmRCdXR0b24pLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5cXCd0IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIGZhbHNlKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1Jlc2VuZEJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBpcyBub3QgZXhwaXJlZCBPUiBhY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQodHJ1ZSwgdHJ1ZSwgdHJ1ZSwgJ0NBTkNFTExFRCcpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UmVzZW5kQnV0dG9uKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93TGljZW5zZUFncmVlbWVudHMoKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgcmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpIG9uIHRoZSBjYXJ0IHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93TGljZW5zZUFncmVlbWVudHMoKTtcblxuICAgICAgICBleHBlY3QobW9ja1F1b3RlU2VydmljZS5yZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RXhwaXJlQ29uZmlybWF0aW9uRGlhbG9nJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgY2FsbCBvcGVuQ29uZmlybWF0aW9uRGlhbG9nKCkgb24gdGhlIGRpYWxvZyBzZXJpY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93RXhwaXJlQ29uZmlybWF0aW9uRGlhbG9nKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuUmVqZWN0UXVvdGVEaWFsb2coKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBidWlsZENvbXBvbmVudCh0cnVlLCB0cnVlLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgb3BlbkNvbmZpcm1hdGlvbkRpYWxvZygpIG9uIHRoZSBkaWFsb2cgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9wZW5SZWplY3RRdW90ZURpYWxvZygpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29uZmlybWF0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuUmVzZW5kRGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIG9wZW5Gb3JtRGlhbG9nIG9uIHRoZSBkaWFsb2cgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9wZW5SZXNlbmREaWFsb2coKTtcblxuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIFt7IHNvbWU6ICdjb25maWcnIH1dLFxuICAgICAgICAgIHsgdGl0bGU6ICdRVU9URS5FWFRFTkRfRVhQSVJBVElPTicgfSxcbiAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0Rpc2NvdW50KCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gYnVpbGRDb21wb25lbnQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBkaXNjb3VudCBkb2VzIE5PVCBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzRGlzY291bnQpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZGlzY291bnQgaGFzIGEgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrU3RhdGUgPSB7IGRhdGE6IHsgZGlzY291bnQ6IDEyLjAgfSB9O1xuXG4gICAgICAgIG1vY2tRdW90ZVNlcnZpY2UgPSB7XG4gICAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHt9IH0pLFxuICAgICAgICAgIHN0YXRlOiBtb2NrU3RhdGUsXG4gICAgICAgICAgcHJvamVjdHM6IE9ic2VydmFibGUub2YoW10pXG4gICAgICAgIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZVRhYkNvbXBvbmVudChtb2NrUXVvdGVTZXJ2aWNlLCBudWxsLCBudWxsLCBudWxsLCBtb2NrU3RvcmUpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc0Rpc2NvdW50KS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHF1b3RlSXNUcmlhbCgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGUgcXVvdGUgaXMgb2YgdHlwZSBcXCdUcmlhbFxcJycsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVTaG93JywgeyBkYXRhOiB7IHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICBsZXQgaXM6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZUlzVHJpYWwudGFrZSgxKS5zdWJzY3JpYmUoaSA9PiBpcyA9IGkpO1xuICAgICAgICBleHBlY3QoaXMpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgcXVvdGUgaXMgbm90IG9mIHR5cGUgXFwnVHJpYWxcXCcnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlU2hvdycsIHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdOb3RUcmlhbCcgfSB9KTtcbiAgICAgICAgbGV0IGlzOiBib29sZWFuO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucXVvdGVJc1RyaWFsLnRha2UoMSkuc3Vic2NyaWJlKGkgPT4gaXMgPSBpKTtcbiAgICAgICAgZXhwZWN0KGlzKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBzaG93UHJpY2luZygpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IGJ1aWxkQ29tcG9uZW50KHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGUgcXVvdGUgaXMgbm90IGluY2x1ZGVkIGluIFxcJ3F1b3Rlc1dpdGhvdXRQcmljaW5nXFwnICcsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVTaG93JywgeyBkYXRhOiB7IHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICBsZXQgc2hvdzogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dQcmljaW5nLnRha2UoMSkuc3Vic2NyaWJlKHMgPT4gc2hvdyA9IHMpO1xuICAgICAgICBleHBlY3Qoc2hvdykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgcXVvdGUgaXMgaW5jbHVkZWQgaW4gXFwncXVvdGVzV2l0aG91dFByaWNpbmdcXCcnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlU2hvdycsIHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdOb3RJbmNsdWRlZCcgfSB9KTtcbiAgICAgICAgbGV0IHNob3c6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93UHJpY2luZy50YWtlKDEpLnN1YnNjcmliZShzID0+IHNob3cgPSBzKTtcbiAgICAgICAgZXhwZWN0KHNob3cpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
