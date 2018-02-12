"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var quote_confirm_tab_component_1 = require("./quote-confirm-tab.component");
var mock_app_store_1 = require("../../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Confirm Tab Component', function () {
        var componentUnderTest;
        var mockQuoteService;
        var mockDialogService;
        var mockCapabilities;
        var mockStore;
        beforeEach(function () {
            mockQuoteService = {
                state: { data: { id: 1, purchaseType: 'Trial' } },
                data: Observable_1.Observable.of({ data: { id: 1, purchaseType: 'Trial' } }),
                retrieveLicenseAgreements: jasmine.createSpy('retriveLicenseAgreements')
                    .and.returnValue(Observable_1.Observable.of({ some: 'licenses' })),
                hasAssetLineItems: true
            };
            mockCapabilities = {
                viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(true)
            };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake(function (options) {
                    mockDialogService.onCloseCallback = options.outputOptions[0].callback;
                })
            };
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new quote_confirm_tab_component_1.QuoteConfirmTabComponent(null, mockQuoteService, mockDialogService, mockCapabilities, mockStore);
        });
        describe('showLicenseAgreements()', function () {
            it('calls retrieveLicenseAgreements() on the quote service', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockQuoteService.retrieveLicenseAgreements).toHaveBeenCalled();
            });
            it('calls openComponentInDialog() on the dialog service (with the right config)', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                    inputOptions: {
                        assetType: 'quoteShow',
                        parentId: 1,
                        licenses: { some: 'licenses' }
                    },
                    outputOptions: [
                        {
                            event: 'close',
                            callback: jasmine.any(Function),
                            closeOnEvent: true
                        }
                    ]
                });
            });
        });
        describe('quoteIsTrial() getter', function () {
            describe('returns Observable of true', function () {
                it('when the quote is trial', function () {
                    mockStore.createStateSection('quoteShow', { data: { purchaseType: 'Trial' } });
                    var quoteIsTrial;
                    componentUnderTest.quoteIsTrial.take(1).subscribe(function (result) { return quoteIsTrial = result; });
                    expect(quoteIsTrial).toBe(true);
                });
            });
        });
        describe('canPurchase() getter', function () {
            describe('returns true', function () {
                it('when the quote is of type \'RevenueOnly\'', function () {
                    mockStore.createStateSection('quoteShow', { data: { purchaseType: 'RevenueOnly' } });
                    expect(componentUnderTest.canPurchase).toBe(true);
                });
                it('when the licenses are agreed to and the license button is showing', function () {
                    mockStore.createStateSection('quoteShow', { data: { purchaseType: 'NotRevenueOnly' } });
                    componentUnderTest.licensesAreAgreedTo = true;
                    expect(componentUnderTest.canPurchase).toBe(true);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS1jb25maXJtLXRhYi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyw2RUFBeUU7QUFDekUsZ0ZBQTZFO0FBRTdFO0lBQ0UsUUFBUSxDQUFDLDZCQUE2QixFQUFFO1FBQ3RDLElBQUksa0JBQTRDLENBQUM7UUFDakQsSUFBSSxnQkFBcUIsQ0FBQztRQUMxQixJQUFJLGlCQUFzQixDQUFDO1FBQzNCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUF1QixDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUNULGdCQUFnQixHQUFHO2dCQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDL0QseUJBQXlCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQztxQkFDckUsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RCxpQkFBaUIsRUFBRSxJQUFJO2FBQ3hCLENBQUM7WUFFRixnQkFBZ0IsR0FBRztnQkFDakIsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3BHLENBQUM7WUFFRixpQkFBaUIsR0FBRztnQkFDbEIscUJBQXFCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxR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QUUsRUFBRSxDQUFDLENBQUM7b0JBQ3hGLGtCQUFrQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztvQkFDOUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekZELG9CQXlGQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3RhYnMvcXVvdGUtY29uZmlybS10YWIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFF1b3RlQ29uZmlybVRhYkNvbXBvbmVudCB9IGZyb20gJy4vcXVvdGUtY29uZmlybS10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgQ29uZmlybSBUYWIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFF1b3RlQ29uZmlybVRhYkNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1F1b3RlU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrRGlhbG9nU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2FwYWJpbGl0aWVzOiBhbnk7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrUXVvdGVTZXJ2aWNlID0ge1xuICAgICAgICBzdGF0ZTogeyBkYXRhOiB7IGlkOiAxLCBwdXJjaGFzZVR5cGU6ICdUcmlhbCcgfSB9LFxuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgZGF0YTogeyBpZDogMSwgcHVyY2hhc2VUeXBlOiAnVHJpYWwnIH0gfSksXG4gICAgICAgIHJldHJpZXZlTGljZW5zZUFncmVlbWVudHM6IGphc21pbmUuY3JlYXRlU3B5KCdyZXRyaXZlTGljZW5zZUFncmVlbWVudHMnKVxuICAgICAgICAgIC5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7IHNvbWU6ICdsaWNlbnNlcycgfSkpLFxuICAgICAgICBoYXNBc3NldExpbmVJdGVtczogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgdmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uOiBqYXNtaW5lLmNyZWF0ZVNweSgndmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpXG4gICAgICB9O1xuXG4gICAgICBtb2NrRGlhbG9nU2VydmljZSA9IHtcbiAgICAgICAgb3BlbkNvbXBvbmVudEluRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbXBvbmVudEluRGlhbG9nJykuYW5kLmNhbGxGYWtlKChvcHRpb25zOiBhbnkpID0+IHtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vbkNsb3NlQ2FsbGJhY2sgPSBvcHRpb25zLm91dHB1dE9wdGlvbnNbMF0uY2FsbGJhY2s7XG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZUNvbmZpcm1UYWJDb21wb25lbnQobnVsbCwgbW9ja1F1b3RlU2VydmljZSwgbW9ja0RpYWxvZ1NlcnZpY2UsIG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0xpY2Vuc2VBZ3JlZW1lbnRzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgcmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpIG9uIHRoZSBxdW90ZSBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2hvd0xpY2Vuc2VBZ3JlZW1lbnRzKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tRdW90ZVNlcnZpY2UucmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyBvcGVuQ29tcG9uZW50SW5EaWFsb2coKSBvbiB0aGUgZGlhbG9nIHNlcnZpY2UgKHdpdGggdGhlIHJpZ2h0IGNvbmZpZyknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93TGljZW5zZUFncmVlbWVudHMoKTtcblxuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwYW5lbENsYXNzOiAnbGljZW5zZS1wYW5lJywgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9IH0sXG4gICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICBhc3NldFR5cGU6ICdxdW90ZVNob3cnLFxuICAgICAgICAgICAgcGFyZW50SWQ6IDEsXG4gICAgICAgICAgICBsaWNlbnNlczogeyBzb21lOiAnbGljZW5zZXMnIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdxdW90ZUlzVHJpYWwoKSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyBPYnNlcnZhYmxlIG9mIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBpcyB0cmlhbCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnVHJpYWwnIH0gfSk7XG5cbiAgICAgICAgICBsZXQgcXVvdGVJc1RyaWFsOiBib29sZWFuO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZUlzVHJpYWwudGFrZSgxKS5zdWJzY3JpYmUocmVzdWx0ID0+IHF1b3RlSXNUcmlhbCA9IHJlc3VsdCk7XG4gICAgICAgICAgZXhwZWN0KHF1b3RlSXNUcmlhbCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5QdXJjaGFzZSgpIGdldHRlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBpcyBvZiB0eXBlIFxcJ1JldmVudWVPbmx5XFwnJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlU2hvdycsIHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdSZXZlbnVlT25seScgfSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUHVyY2hhc2UpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaWNlbnNlcyBhcmUgYWdyZWVkIHRvIGFuZCB0aGUgbGljZW5zZSBidXR0b24gaXMgc2hvd2luZycsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnTm90UmV2ZW51ZU9ubHknIH0gfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmxpY2Vuc2VzQXJlQWdyZWVkVG8gPSB0cnVlO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUHVyY2hhc2UpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
