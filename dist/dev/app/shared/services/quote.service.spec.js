"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_service_1 = require("./quote.service");
var mock_api_service_1 = require("../mocks/mock-api.service");
var api_interface_1 = require("../interfaces/api.interface");
var Observable_1 = require("rxjs/Observable");
var common_functions_1 = require("../utilities/common.functions");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Service', function () {
        var serviceUnderTest;
        var mockApi;
        var mockCartService;
        var mockStore;
        var mockPaymentOptions;
        var mockUserService;
        var quoteLoadSuccessSpy;
        var mockQuoteResponse = {
            createdUserId: 1,
            ownerUserId: 2,
            lastUpdated: '2017-07-23T18:41:21Z',
            createdOn: '2017-07-23T18:20:00Z',
            id: 282,
            siteName: 'commerce',
            projects: [
                {
                    name: '2017-04-27',
                    id: '390bec17-929b-452d-a2f4-27b7b04cb6ea',
                    lineItems: [
                        {
                            asset: {
                                assetId: 33737670
                            },
                            id: 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
                            subTotal: 159
                        }
                    ],
                    assetLineItemSubtotal: 159,
                    feeLineItemSubtotal: 0,
                    totalAmount: 79.5,
                    subTotal: 159
                }
            ]
        };
        function setupFor(options) {
            if (options === void 0) { options = null; }
            mockPaymentOptions = options ? {
                paymentOptions: options,
                explanation: 'Please select either of the payment options below',
                noCheckout: false
            } : null;
            mockStore.createStateSection('checkout', { paymentOptions: mockPaymentOptions });
            return new quote_service_1.QuoteService(null, null, mockStore, mockUserService);
        }
        beforeEach(function () {
            mockApi = new mock_api_service_1.MockApiService();
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('quoteShow', { data: { id: 3, ownerUserId: 10, itemCount: 1 } });
            quoteLoadSuccessSpy = mockStore.createActionFactoryMethod('quoteShow', 'loadSuccess');
            mockCartService = {
                data: Observable_1.Observable.of({ cart: { projects: [] } }),
                state: { cart: { projects: [] } }
            };
            mockUserService = {
                getById: jasmine.createSpy('getById').and.returnValue(Observable_1.Observable.of({ emailAddress: 'test@gmail.com', firstName: 'best', lastName: 'tester' }))
            };
            serviceUnderTest = new quote_service_1.QuoteService(mockApi.injector, mockCartService, mockStore, mockUserService);
        });
        describe('data getter', function () {
            it('should return the right data', function () {
                serviceUnderTest.data.take(1).subscribe(function (d) {
                    expect(d).toEqual({ data: { id: 3, ownerUserId: 10, itemCount: 1 } });
                });
            });
        });
        describe('state getter', function () {
            it('should return the right state', function () {
                expect(serviceUnderTest.state).toEqual({ data: { id: 3, ownerUserId: 10, itemCount: 1 } });
            });
        });
        describe('checkoutState() getter', function () {
            it('should return the checkout state', function () {
                mockStore.createStateSection('checkout', {
                    purchaseOrderId: '1234-56',
                    selectedPaymentType: 'CreditCard'
                });
                expect(serviceUnderTest.checkoutState).toEqual({ purchaseOrderId: '1234-56', selectedPaymentType: 'CreditCard' });
            });
        });
        describe('get hasAssets', function () {
            it('should return true if there are assets in the quote', function () {
                serviceUnderTest.hasAssets.take(1).subscribe(function (has) { return expect(has).toBe(true); });
            });
        });
        describe('paymentOptionsEqual()', function () {
            describe('returns false', function () {
                it('when the store\'s paymentOptions don\'t contain the option to check', function () {
                    serviceUnderTest = setupFor(['Hold']);
                    serviceUnderTest.paymentOptionsEqual(['CreditCard']).take(1).subscribe(function (result) {
                        expect(result).toBe(false);
                    });
                });
                it('when the store\'s paymentOptions DO contain the option to check, but the lengths are different', function () {
                    serviceUnderTest = setupFor(['Hold']);
                    serviceUnderTest.paymentOptionsEqual(['Hold', 'CreditCard']).take(1).subscribe(function (result) {
                        expect(result).toBe(false);
                    });
                });
            });
            describe('returns true', function () {
                it('when the store\'s paymentOptions contain only the option to check', function () {
                    serviceUnderTest = setupFor(['Hold']);
                    serviceUnderTest.paymentOptionsEqual(['Hold']).take(1).subscribe(function (result) {
                        expect(result).toBe(true);
                    });
                });
                it('when the payment options contain both options AND the lengths are the same', function () {
                    serviceUnderTest = setupFor(['CreditCard', 'PurchaseOnCredit']);
                    serviceUnderTest.paymentOptionsEqual(['CreditCard', 'PurchaseOnCredit']).take(1).subscribe(function (result) {
                        expect(result).toBe(true);
                    });
                });
            });
        });
        describe('retrieveLicenseAgreements()', function () {
            it('should call the api service correctly', function () {
                serviceUnderTest.retrieveLicenseAgreements();
                expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.get).toHaveBeenCalledWithEndpoint('quote/licensing/3');
                expect(mockApi.get).toHaveBeenCalledWithLoading(true);
            });
        });
        describe('expireQuote()', function () {
            it('should call the api service correctly', function () {
                serviceUnderTest.expireQuote();
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/3');
                expect(mockApi.put).toHaveBeenCalledWithLoading('onBeforeRequest');
            });
        });
        describe('rejectQuote()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.rejectQuote();
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/reject/3');
                expect(mockApi.put).toHaveBeenCalledWithLoading(true);
            });
        });
        describe('extendExpiration()', function () {
            beforeEach(function () {
                mockApi.putResponse = common_functions_1.Common.clone(mockQuoteResponse);
            });
            it('should call the api service correctly', function () {
                serviceUnderTest.extendExpirationDate('2017-01-01');
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/3');
                expect(mockApi.put).toHaveBeenCalledWithBody({
                    id: 3, ownerUserId: 10, itemCount: 1, expirationDate: new Date('2017-01-01').toISOString(), quoteStatus: 'ACTIVE'
                });
                expect(mockApi.put).toHaveBeenCalledWithLoading('onBeforeRequest');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcXVvdGUuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQStDO0FBQy9DLDhEQUE0RTtBQUM1RSw2REFBa0Q7QUFDbEQsOENBQTZDO0FBRTdDLGtFQUF1RDtBQUN2RCwwRUFBdUU7QUFFdkU7SUFDRSxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLElBQUksZ0JBQThCLENBQUM7UUFDbkMsSUFBSSxPQUF1QixDQUFDO1FBQzVCLElBQUksZUFBb0IsQ0FBQztRQUN6QixJQUFJLFNBQXVCLENBQUM7UUFDNUIsSUFBSSxrQkFBdUIsQ0FBQztRQUM1QixJQUFJLGVBQW9CLENBQUM7UUFDekIsSUFBSSxtQkFBZ0MsQ0FBQztRQUVyQyxJQUFNLGlCQUFpQixHQUFHO1lBQ3hCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLEVBQUUsRUFBRSxHQUFHO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFO2dCQUNSO29CQUNFLElBQUksRUFBRSxZQUFZO29CQUNsQixFQUFFLEVBQUUsc0NBQXNDO29CQUMxQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsS0FBSyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxRQUFROzZCQUNsQjs0QkFDRCxFQUFFLEVBQUUsc0NBQXNDOzRCQUMxQyxRQUFRLEVBQUUsR0FBRzt5QkFDZDtxQkFDRjtvQkFDRCxxQkFBcUIsRUFBRSxHQUFHO29CQUMxQixtQkFBbUIsRUFBRSxDQUFDO29CQUN0QixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEdBQUc7aUJBQ2Q7YUFDRjtTQUNGLENBQUM7UUFFRixrQkFBa0IsT0FBcUM7WUFBckMsd0JBQUEsRUFBQSxjQUFxQztZQUNyRCxrQkFBa0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixjQUFjLEVBQUUsT0FBTztnQkFDdkIsV0FBVyxFQUFFLG1EQUFtRDtnQkFDaEUsVUFBVSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1QsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7WUFDakYsTUFBTSxDQUFDLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsVUFBVSxDQUFDO1lBQ1QsT0FBTyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUYsbUJBQW1CLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUV0RixlQUFlLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUU7YUFDbEMsQ0FBQztZQUVGLGVBQWUsR0FBRztnQkFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FDakUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM5RSxDQUFDO1lBRUYsZ0JBQWdCLEdBQUcsSUFBSSw0QkFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNyRyxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsRUFBRSxDQUFDLDhCQUE4QixFQUFFO2dCQUNqQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN2QixFQUFFLENBQUMsK0JBQStCLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtvQkFDdkMsZUFBZSxFQUFFLFNBQVM7b0JBQzFCLG1CQUFtQixFQUFFLFlBQVk7aUJBQ2xDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3BILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7WUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUN4QixFQUFFLENBQUMscUVBQXFFLEVBQUU7b0JBQ3hFLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBUSxDQUFDLENBQUM7b0JBQzdDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBZTt3QkFDckYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGdHQUFnRyxFQUFFO29CQUNuRyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQVEsQ0FBQyxDQUFDO29CQUM3QyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFlO3dCQUM3RixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO29CQUN0RSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQVEsQ0FBQyxDQUFDO29CQUM3QyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWU7d0JBQy9FLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw0RUFBNEUsRUFBRTtvQkFDL0UsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFRLENBQUMsQ0FBQztvQkFDdkUsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFlO3dCQUN6RyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNkJBQTZCLEVBQUU7WUFDdEMsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO2dCQUMxQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2dCQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixFQUFFLENBQUMsdUNBQXVDLEVBQUU7Z0JBQzFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUUvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVyRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixFQUFFLENBQUMsaUNBQWlDLEVBQUU7Z0JBQ3BDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUUvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLFVBQVUsQ0FBQztnQkFDVCxPQUFPLENBQUMsV0FBVyxHQUFHLHlCQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7Z0JBQzFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUM7b0JBQzNDLEVBQUUsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUTtpQkFDbEgsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcExELG9CQW9MQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL3F1b3RlLnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4vcXVvdGUuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vbW9ja3MvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBRdW90ZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IFF1b3RlU2VydmljZTtcbiAgICBsZXQgbW9ja0FwaTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IG1vY2tDYXJ0U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja1BheW1lbnRPcHRpb25zOiBhbnk7XG4gICAgbGV0IG1vY2tVc2VyU2VydmljZTogYW55O1xuICAgIGxldCBxdW90ZUxvYWRTdWNjZXNzU3B5OiBqYXNtaW5lLlNweTtcblxuICAgIGNvbnN0IG1vY2tRdW90ZVJlc3BvbnNlID0ge1xuICAgICAgY3JlYXRlZFVzZXJJZDogMSxcbiAgICAgIG93bmVyVXNlcklkOiAyLFxuICAgICAgbGFzdFVwZGF0ZWQ6ICcyMDE3LTA3LTIzVDE4OjQxOjIxWicsXG4gICAgICBjcmVhdGVkT246ICcyMDE3LTA3LTIzVDE4OjIwOjAwWicsXG4gICAgICBpZDogMjgyLFxuICAgICAgc2l0ZU5hbWU6ICdjb21tZXJjZScsXG4gICAgICBwcm9qZWN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJzIwMTctMDQtMjcnLFxuICAgICAgICAgIGlkOiAnMzkwYmVjMTctOTI5Yi00NTJkLWEyZjQtMjdiN2IwNGNiNmVhJyxcbiAgICAgICAgICBsaW5lSXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXNzZXQ6IHtcbiAgICAgICAgICAgICAgICBhc3NldElkOiAzMzczNzY3MFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpZDogJ2Y2NDJmODkzLWY0Y2YtNGEzYy1hZDVlLWRjMmQwY2QxYTMyMScsXG4gICAgICAgICAgICAgIHN1YlRvdGFsOiAxNTlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGFzc2V0TGluZUl0ZW1TdWJ0b3RhbDogMTU5LFxuICAgICAgICAgIGZlZUxpbmVJdGVtU3VidG90YWw6IDAsXG4gICAgICAgICAgdG90YWxBbW91bnQ6IDc5LjUsXG4gICAgICAgICAgc3ViVG90YWw6IDE1OVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwRm9yKG9wdGlvbnM6IEFycmF5PFBheW1lbnRPcHRpb25zPiA9IG51bGwpIHtcbiAgICAgIG1vY2tQYXltZW50T3B0aW9ucyA9IG9wdGlvbnMgPyB7XG4gICAgICAgIHBheW1lbnRPcHRpb25zOiBvcHRpb25zLFxuICAgICAgICBleHBsYW5hdGlvbjogJ1BsZWFzZSBzZWxlY3QgZWl0aGVyIG9mIHRoZSBwYXltZW50IG9wdGlvbnMgYmVsb3cnLFxuICAgICAgICBub0NoZWNrb3V0OiBmYWxzZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjaGVja291dCcsIHsgcGF5bWVudE9wdGlvbnM6IG1vY2tQYXltZW50T3B0aW9ucyB9KTtcbiAgICAgIHJldHVybiBuZXcgUXVvdGVTZXJ2aWNlKG51bGwsIG51bGwsIG1vY2tTdG9yZSwgbW9ja1VzZXJTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tBcGkgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKTtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlU2hvdycsIHsgZGF0YTogeyBpZDogMywgb3duZXJVc2VySWQ6IDEwLCBpdGVtQ291bnQ6IDEgfSB9KTtcbiAgICAgIHF1b3RlTG9hZFN1Y2Nlc3NTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVTaG93JywgJ2xvYWRTdWNjZXNzJyk7XG5cbiAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGNhcnQ6IHsgcHJvamVjdHM6IFtdIH0gfSksXG4gICAgICAgIHN0YXRlOiB7IGNhcnQ6IHsgcHJvamVjdHM6IFtdIH0gfVxuICAgICAgfTtcblxuICAgICAgbW9ja1VzZXJTZXJ2aWNlID0ge1xuICAgICAgICBnZXRCeUlkOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0QnlJZCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKFxuICAgICAgICAgIHsgZW1haWxBZGRyZXNzOiAndGVzdEBnbWFpbC5jb20nLCBmaXJzdE5hbWU6ICdiZXN0JywgbGFzdE5hbWU6ICd0ZXN0ZXInIH0pKVxuICAgICAgfTtcblxuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBRdW90ZVNlcnZpY2UobW9ja0FwaS5pbmplY3RvciwgbW9ja0NhcnRTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tVc2VyU2VydmljZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGF0YSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcmlnaHQgZGF0YScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5kYXRhLnRha2UoMSkuc3Vic2NyaWJlKGQgPT4ge1xuICAgICAgICAgIGV4cGVjdChkKS50b0VxdWFsKHsgZGF0YTogeyBpZDogMywgb3duZXJVc2VySWQ6IDEwLCBpdGVtQ291bnQ6IDEgfSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdGF0ZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcmlnaHQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKHsgZGF0YTogeyBpZDogMywgb3duZXJVc2VySWQ6IDEwLCBpdGVtQ291bnQ6IDEgfSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrb3V0U3RhdGUoKSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY2hlY2tvdXQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NoZWNrb3V0Jywge1xuICAgICAgICAgIHB1cmNoYXNlT3JkZXJJZDogJzEyMzQtNTYnLFxuICAgICAgICAgIHNlbGVjdGVkUGF5bWVudFR5cGU6ICdDcmVkaXRDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QuY2hlY2tvdXRTdGF0ZSkudG9FcXVhbCh7IHB1cmNoYXNlT3JkZXJJZDogJzEyMzQtNTYnLCBzZWxlY3RlZFBheW1lbnRUeXBlOiAnQ3JlZGl0Q2FyZCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgaGFzQXNzZXRzJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYXNzZXRzIGluIHRoZSBxdW90ZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5oYXNBc3NldHMudGFrZSgxKS5zdWJzY3JpYmUoKGhhczogYm9vbGVhbikgPT4gZXhwZWN0KGhhcykudG9CZSh0cnVlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwYXltZW50T3B0aW9uc0VxdWFsKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHN0b3JlXFwncyBwYXltZW50T3B0aW9ucyBkb25cXCd0IGNvbnRhaW4gdGhlIG9wdGlvbiB0byBjaGVjaycsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gc2V0dXBGb3IoWydIb2xkJ10gYXMgYW55KTtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnBheW1lbnRPcHRpb25zRXF1YWwoWydDcmVkaXRDYXJkJ10pLnRha2UoMSkuc3Vic2NyaWJlKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgc3RvcmVcXCdzIHBheW1lbnRPcHRpb25zIERPIGNvbnRhaW4gdGhlIG9wdGlvbiB0byBjaGVjaywgYnV0IHRoZSBsZW5ndGhzIGFyZSBkaWZmZXJlbnQnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdCA9IHNldHVwRm9yKFsnSG9sZCddIGFzIGFueSk7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5wYXltZW50T3B0aW9uc0VxdWFsKFsnSG9sZCcsICdDcmVkaXRDYXJkJ10pLnRha2UoMSkuc3Vic2NyaWJlKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgc3RvcmVcXCdzIHBheW1lbnRPcHRpb25zIGNvbnRhaW4gb25seSB0aGUgb3B0aW9uIHRvIGNoZWNrJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBzZXR1cEZvcihbJ0hvbGQnXSBhcyBhbnkpO1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QucGF5bWVudE9wdGlvbnNFcXVhbChbJ0hvbGQnXSkudGFrZSgxKS5zdWJzY3JpYmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZSh0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHBheW1lbnQgb3B0aW9ucyBjb250YWluIGJvdGggb3B0aW9ucyBBTkQgdGhlIGxlbmd0aHMgYXJlIHRoZSBzYW1lJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBzZXR1cEZvcihbJ0NyZWRpdENhcmQnLCAnUHVyY2hhc2VPbkNyZWRpdCddIGFzIGFueSk7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5wYXltZW50T3B0aW9uc0VxdWFsKFsnQ3JlZGl0Q2FyZCcsICdQdXJjaGFzZU9uQ3JlZGl0J10pLnRha2UoMSkuc3Vic2NyaWJlKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBhcGkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgncXVvdGUvbGljZW5zaW5nLzMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdleHBpcmVRdW90ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBhcGkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZXhwaXJlUXVvdGUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3F1b3RlLzMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcoJ29uQmVmb3JlUmVxdWVzdCcpO1xuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWplY3RRdW90ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBhcGkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVqZWN0UXVvdGUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3F1b3RlL3JlamVjdC8zJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZXh0ZW5kRXhwaXJhdGlvbigpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tBcGkucHV0UmVzcG9uc2UgPSBDb21tb24uY2xvbmUobW9ja1F1b3RlUmVzcG9uc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgYXBpIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmV4dGVuZEV4cGlyYXRpb25EYXRlKCcyMDE3LTAxLTAxJyk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdxdW90ZS8zJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICBpZDogMywgb3duZXJVc2VySWQ6IDEwLCBpdGVtQ291bnQ6IDEsIGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgnMjAxNy0wMS0wMScpLnRvSVNPU3RyaW5nKCksIHF1b3RlU3RhdHVzOiAnQUNUSVZFJ1xuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcoJ29uQmVmb3JlUmVxdWVzdCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
