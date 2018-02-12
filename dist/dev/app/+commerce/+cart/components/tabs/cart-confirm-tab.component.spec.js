"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var cart_confirm_tab_component_1 = require("./cart-confirm-tab.component");
var mock_app_store_1 = require("../../../../store/spec-helpers/mock-app.store");
function main() {
    var _this = this;
    describe('Cart Confirm Tab Component', function () {
        var componentUnderTest;
        var mockCartService;
        var mockDialogService;
        var mockCapabilities;
        var mockStore;
        beforeEach(function () {
            mockCartService = {
                state: { data: { id: 1 } },
                data: Observable_1.Observable.of(_this.state),
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
            componentUnderTest = new cart_confirm_tab_component_1.CartConfirmTabComponent(null, mockCartService, mockDialogService, mockCapabilities, mockStore);
        });
        describe('showLicenseAgreements()', function () {
            it('calls retrieveLicenseAgreements() on the cart service', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockCartService.retrieveLicenseAgreements).toHaveBeenCalled();
            });
            it('calls openComponentInDialog() on the dialog service (with the right config)', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                    inputOptions: {
                        assetType: 'cart',
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
        describe('showPricing() getter', function () {
            it('always returns Observable of true - because we\'re in the cart', function () {
                var showPricing;
                componentUnderTest.showPricing.take(1).subscribe(function (result) { return showPricing = result; });
                expect(showPricing).toBe(true);
            });
        });
        describe('quoteIsTrial() getter', function () {
            it('always returns Observable of false - because we\'re in the cart', function () {
                var quoteIsTrial;
                componentUnderTest.quoteIsTrial.take(1).subscribe(function (result) { return quoteIsTrial = result; });
                expect(quoteIsTrial).toBe(false);
            });
        });
        describe('canPurchase getter', function () {
            describe('returns true', function () {
                it('when the licenseAgreement checkbox has been checked, the cart has lineItems, and the capability returns true', function () {
                    componentUnderTest.licensesAreAgreedTo = true;
                    expect(componentUnderTest.canPurchase).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the licenseAgreement checkbox has not been checked', function () {
                    componentUnderTest.licensesAreAgreedTo = false;
                    expect(componentUnderTest.canPurchase).toBe(false);
                });
                it('when the checkbox has been checked, the cart has lineItems, but the capability returns false', function () {
                    mockCartService = { hasAssetLineItems: true };
                    mockCapabilities = {
                        viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(false)
                    };
                    componentUnderTest = new cart_confirm_tab_component_1.CartConfirmTabComponent(null, mockCartService, null, mockCapabilities, mockStore);
                    componentUnderTest.licensesAreAgreedTo = true;
                    expect(componentUnderTest.canPurchase).toBe(false);
                });
                it('when the checkbox has not been checked, the cart does not have lineItems, and the capability returns false', function () {
                    mockCartService = { hasAssetLineItems: false };
                    mockCapabilities = {
                        viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(false)
                    };
                    componentUnderTest = new cart_confirm_tab_component_1.CartConfirmTabComponent(null, mockCartService, null, mockCapabilities, mockStore);
                    componentUnderTest.licensesAreAgreedTo = false;
                    expect(componentUnderTest.canPurchase).toBe(false);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtY29uZmlybS10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0MsMkVBQXVFO0FBQ3ZFLGdGQUE2RTtBQUU3RTtJQUFBLGlCQW9IQztJQW5IQyxRQUFRLENBQUMsNEJBQTRCLEVBQUU7UUFDckMsSUFBSSxrQkFBMkMsQ0FBQztRQUNoRCxJQUFJLGVBQW9CLENBQUM7UUFDekIsSUFBSSxpQkFBc0IsQ0FBQztRQUMzQixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxlQUFlLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQy9CLHlCQUF5QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUM7cUJBQ3JFLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDdkQsaUJBQWlCLEVBQUUsSUFBSTthQUN4QixDQUFDO1lBRUYsZ0JBQWdCLEdBQUc7Z0JBQ2pCLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzthQUNwRyxDQUFDO1lBRUYsaUJBQWlCLEdBQUc7Z0JBQ2xCLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQUMsT0FBWTtvQkFDMUYsaUJBQWlCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUN4RSxDQUFDLENBQUM7YUFDSCxDQUFDO1lBRUYsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBRS9CLGtCQUFrQixHQUFHLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxSCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxFQUFFLENBQUMsdURBQXVELEVBQUU7Z0JBQzFELGtCQUFrQixDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRTNDLE1BQU0sQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO2dCQUNoRixrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUUzQyxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDbkUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO29CQUNwQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDdEUsWUFBWSxFQUFFO3dCQUNaLFNBQVMsRUFBRSxNQUFNO3dCQUNqQixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3FCQUMvQjtvQkFDRCxhQUFhLEVBQUU7d0JBQ2I7NEJBQ0UsS0FBSyxFQUFFLE9BQU87NEJBQ2QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzRCQUMvQixZQUFZLEVBQUUsSUFBSTt5QkFDbkI7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixFQUFFLENBQUMsZ0VBQWdFLEVBQUU7Z0JBQ25FLElBQUksV0FBb0IsQ0FBQztnQkFDekIsa0JBQWtCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxXQUFXLEdBQUcsTUFBTSxFQUFwQixDQUFvQixDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxFQUFFLENBQUMsaUVBQWlFLEVBQUU7Z0JBQ3BFLElBQUksWUFBcUIsQ0FBQztnQkFDMUIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxZQUFZLEdBQUcsTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQUM7Z0JBQ25GLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUN2QixFQUFFLENBQUMsOEdBQThHLEVBQUU7b0JBQ2pILGtCQUFrQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztvQkFDOUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyx5REFBeUQsRUFBRTtvQkFDNUQsa0JBQWtCLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO29CQUMvQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsOEZBQThGLEVBQUU7b0JBQ2pHLGVBQWUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO29CQUM5QyxnQkFBZ0IsR0FBRzt3QkFDakIsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO3FCQUNyRyxDQUFDO29CQUVGLGtCQUFrQixHQUFHLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzNHLGtCQUFrQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztvQkFFOUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDRHQUE0RyxFQUFFO29CQUMvRyxlQUFlLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDL0MsZ0JBQWdCLEdBQUc7d0JBQ2pCLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztxQkFDckcsQ0FBQztvQkFFRixrQkFBa0IsR0FBRyxJQUFJLG9EQUF1QixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMzRyxrQkFBa0IsQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7b0JBRS9DLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBIRCxvQkFvSEMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jb21wb25lbnRzL3RhYnMvY2FydC1jb25maXJtLXRhYi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ2FydENvbmZpcm1UYWJDb21wb25lbnQgfSBmcm9tICcuL2NhcnQtY29uZmlybS10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ2FydCBDb25maXJtIFRhYiBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogQ2FydENvbmZpcm1UYWJDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tDYXJ0U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrRGlhbG9nU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2FwYWJpbGl0aWVzOiBhbnk7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7XG4gICAgICAgIHN0YXRlOiB7IGRhdGE6IHsgaWQ6IDEgfSB9LFxuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RhdGUpLFxuICAgICAgICByZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzOiBqYXNtaW5lLmNyZWF0ZVNweSgncmV0cml2ZUxpY2Vuc2VBZ3JlZW1lbnRzJylcbiAgICAgICAgICAuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoeyBzb21lOiAnbGljZW5zZXMnIH0pKSxcbiAgICAgICAgaGFzQXNzZXRMaW5lSXRlbXM6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIG1vY2tDYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbjogamFzbWluZS5jcmVhdGVTcHkoJ3ZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKVxuICAgICAgfTtcblxuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7XG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLmFuZC5jYWxsRmFrZSgob3B0aW9uczogYW55KSA9PiB7XG4gICAgICAgICAgbW9ja0RpYWxvZ1NlcnZpY2Uub25DbG9zZUNhbGxiYWNrID0gb3B0aW9ucy5vdXRwdXRPcHRpb25zWzBdLmNhbGxiYWNrO1xuICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQ2FydENvbmZpcm1UYWJDb21wb25lbnQobnVsbCwgbW9ja0NhcnRTZXJ2aWNlLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja0NhcGFiaWxpdGllcywgbW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93TGljZW5zZUFncmVlbWVudHMoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyByZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCkgb24gdGhlIGNhcnQgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dMaWNlbnNlQWdyZWVtZW50cygpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQ2FydFNlcnZpY2UucmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyBvcGVuQ29tcG9uZW50SW5EaWFsb2coKSBvbiB0aGUgZGlhbG9nIHNlcnZpY2UgKHdpdGggdGhlIHJpZ2h0IGNvbmZpZyknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93TGljZW5zZUFncmVlbWVudHMoKTtcblxuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwYW5lbENsYXNzOiAnbGljZW5zZS1wYW5lJywgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9IH0sXG4gICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICBhc3NldFR5cGU6ICdjYXJ0JyxcbiAgICAgICAgICAgIGxpY2Vuc2VzOiB7IHNvbWU6ICdsaWNlbnNlcycgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBldmVudDogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dQcmljaW5nKCkgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ2Fsd2F5cyByZXR1cm5zIE9ic2VydmFibGUgb2YgdHJ1ZSAtIGJlY2F1c2Ugd2VcXCdyZSBpbiB0aGUgY2FydCcsICgpID0+IHtcbiAgICAgICAgbGV0IHNob3dQcmljaW5nOiBib29sZWFuO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2hvd1ByaWNpbmcudGFrZSgxKS5zdWJzY3JpYmUocmVzdWx0ID0+IHNob3dQcmljaW5nID0gcmVzdWx0KTtcbiAgICAgICAgZXhwZWN0KHNob3dQcmljaW5nKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncXVvdGVJc1RyaWFsKCkgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ2Fsd2F5cyByZXR1cm5zIE9ic2VydmFibGUgb2YgZmFsc2UgLSBiZWNhdXNlIHdlXFwncmUgaW4gdGhlIGNhcnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBxdW90ZUlzVHJpYWw6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZUlzVHJpYWwudGFrZSgxKS5zdWJzY3JpYmUocmVzdWx0ID0+IHF1b3RlSXNUcmlhbCA9IHJlc3VsdCk7XG4gICAgICAgIGV4cGVjdChxdW90ZUlzVHJpYWwpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuUHVyY2hhc2UgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGxpY2Vuc2VBZ3JlZW1lbnQgY2hlY2tib3ggaGFzIGJlZW4gY2hlY2tlZCwgdGhlIGNhcnQgaGFzIGxpbmVJdGVtcywgYW5kIHRoZSBjYXBhYmlsaXR5IHJldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubGljZW5zZXNBcmVBZ3JlZWRUbyA9IHRydWU7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QdXJjaGFzZSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaWNlbnNlQWdyZWVtZW50IGNoZWNrYm94IGhhcyBub3QgYmVlbiBjaGVja2VkJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5saWNlbnNlc0FyZUFncmVlZFRvID0gZmFsc2U7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QdXJjaGFzZSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBjaGVja2JveCBoYXMgYmVlbiBjaGVja2VkLCB0aGUgY2FydCBoYXMgbGluZUl0ZW1zLCBidXQgdGhlIGNhcGFiaWxpdHkgcmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7IGhhc0Fzc2V0TGluZUl0ZW1zOiB0cnVlIH07XG4gICAgICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgICAgIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbjogamFzbWluZS5jcmVhdGVTcHkoJ3ZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSlcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRDb25maXJtVGFiQ29tcG9uZW50KG51bGwsIG1vY2tDYXJ0U2VydmljZSwgbnVsbCwgbW9ja0NhcGFiaWxpdGllcywgbW9ja1N0b3JlKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubGljZW5zZXNBcmVBZ3JlZWRUbyA9IHRydWU7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhblB1cmNoYXNlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGNoZWNrYm94IGhhcyBub3QgYmVlbiBjaGVja2VkLCB0aGUgY2FydCBkb2VzIG5vdCBoYXZlIGxpbmVJdGVtcywgYW5kIHRoZSBjYXBhYmlsaXR5IHJldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0NhcnRTZXJ2aWNlID0geyBoYXNBc3NldExpbmVJdGVtczogZmFsc2UgfTtcbiAgICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgdmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uOiBqYXNtaW5lLmNyZWF0ZVNweSgndmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQ2FydENvbmZpcm1UYWJDb21wb25lbnQobnVsbCwgbW9ja0NhcnRTZXJ2aWNlLCBudWxsLCBtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrU3RvcmUpO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5saWNlbnNlc0FyZUFncmVlZFRvID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhblB1cmNoYXNlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
