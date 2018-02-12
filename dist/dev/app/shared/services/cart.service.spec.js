"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var mock_api_service_1 = require("../mocks/mock-api.service");
var api_interface_1 = require("../interfaces/api.interface");
var cart_service_1 = require("./cart.service");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Cart Service', function () {
        var mockProject = {
            id: '123',
            name: 'Fred',
            clientName: 'Barney',
            subtotal: 0
        };
        var mockProjectB = {
            name: 'Project A',
            clientName: 'Ross Edfort',
            id: '111',
            subtotal: 0
        };
        var mockLineItem = {
            id: '456',
            price: 0,
            rightsManaged: 'Rights Managed'
        };
        var serviceUnderTest;
        var mockApi;
        var mockStore;
        var mockCurrentUserServiceService;
        var loadSpy;
        var loadSuccessSpy;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApi = new mock_api_service_1.MockApiService();
            mockStore = new mock_app_store_1.MockAppStore();
            loadSuccessSpy = mockStore.createActionFactoryMethod('cart', 'loadSuccess');
            mockStore.createStateSection('cart', { data: { some: 'data' } });
            mockCurrentUserServiceService = {
                fullName: jasmine.createSpy('fullName').and.returnValue(Observable_1.Observable.of('Ross Edfort'))
            };
            serviceUnderTest = new cart_service_1.CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
        });
        describe('data getter', function () {
            it('returns the data from the cart store', function () {
                serviceUnderTest.data.subscribe(function (data) { return expect(data).toEqual({ data: { some: 'data' } }); });
            });
        });
        describe('state getter', function () {
            it('returns the state from the cart store', function () {
                expect(serviceUnderTest.state).toEqual({ data: { some: 'data' } });
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
        describe('cart getter', function () {
            it('returns the data from the cart store', function () {
                serviceUnderTest.cart.subscribe(function (cart) { return expect(cart).toEqual({ some: 'data' }); });
            });
            it('returns a cloned object', function () {
                serviceUnderTest.cart.subscribe(function (cart) { return expect(cart).not.toBe(mockStore.snapshot(function (state) { return state.cart.data; })); });
            });
        });
        describe('addAssetToProjectInCart()', function () {
            var snackbarSpy;
            beforeEach(function () {
                mockStore.createStateSection('cart', { data: { projects: [mockProjectB] } });
                snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
            });
            it('calls the api service correctly', function () {
                var body = {
                    lineItem: { asset: { assetId: 10836, timeStart: -1, timeEnd: -2 }, selectedTranscodeTarget: '1080p', price: 100.5 },
                    attributes: [{ priceAttributeName: 'key', selectedAttributeValue: 'value' }]
                };
                var parameters = { projectName: 'Project A', region: 'AAA' };
                var addAssetParameters = {
                    lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p', price: 100.5 },
                    attributes: [{ priceAttributeName: 'key', selectedAttributeValue: 'value' }]
                };
                serviceUnderTest.addAssetToProjectInCart(addAssetParameters);
                expect(mockApi.put)
                    .toHaveBeenCalledWith(api_interface_1.Api.Orders, 'cart/asset/lineItem', { body: body, parameters: parameters, loadingIndicator: true });
            });
            it('calls the api service correctly - no transcode target', function () {
                var body = { lineItem: { asset: { assetId: 10836, timeStart: -1, timeEnd: -2 } } };
                var parameters = { projectName: 'Project A', region: 'AAA' };
                var addAssetParameters = { lineItem: { asset: { assetId: 10836 } } };
                serviceUnderTest.addAssetToProjectInCart(addAssetParameters);
                expect(mockApi.put)
                    .toHaveBeenCalledWith(api_interface_1.Api.Orders, 'cart/asset/lineItem', { body: body, parameters: parameters, loadingIndicator: true });
            });
            it('adds the asset to the cart store', function () {
                mockApi.putResponse = { lineItem: { asset: { assetId: 10836 } } };
                var addAssetParameters = {
                    lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p' }
                };
                serviceUnderTest.addAssetToProjectInCart(addAssetParameters);
                expect(loadSuccessSpy)
                    .toHaveBeenCalledWith({ lineItem: { asset: { assetId: 10836 } } });
            });
            it('displays a snackbar with the expected message', function () {
                var addAssetParameters = {
                    lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p' }
                };
                serviceUnderTest.addAssetToProjectInCart(addAssetParameters);
                expect(snackbarSpy).toHaveBeenCalledWith('ASSET.ADD_TO_CART_TOAST', { assetId: 10836 });
            });
        });
        describe('addProject()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.addProject();
                expect(mockApi.post).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/project');
                expect(mockApi.post).toHaveBeenCalledWithBody({ clientName: 'Ross Edfort' });
                expect(mockApi.post).toHaveBeenCalledWithLoading(true);
            });
            it('names new projects based on existing names', function () {
                mockStore.createStateSection('cart', { data: { projects: [{ name: 'Project A', clientName: 'Ross Edfort' }] } });
                serviceUnderTest.addProject();
                expect(mockApi.post).toHaveBeenCalledWithBody({ clientName: 'Ross Edfort' });
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.addProject();
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.postResponse);
            });
        });
        describe('removeProject()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.removeProject(mockProject);
                expect(mockApi.delete).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.delete).toHaveBeenCalledWithEndpoint('cart/project/123');
                expect(mockApi.delete).toHaveBeenCalledWithLoading(true);
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.removeProject(mockProject);
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.deleteResponse);
            });
        });
        describe('updateProject()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.updateProject(mockProject);
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/project');
                expect(mockApi.put).toHaveBeenCalledWithBody(mockProject);
                expect(mockApi.put).toHaveBeenCalledWithLoading(true);
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.updateProject(mockProject);
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
            });
        });
        describe('moveLineItemTo()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.moveLineItemTo(mockProject, mockLineItem);
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/move/lineItem');
                expect(mockApi.put).toHaveBeenCalledWithParameters({ lineItemId: '456', projectId: '123' });
                expect(mockApi.put).toHaveBeenCalledWithLoading(true);
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.moveLineItemTo(mockProject, mockLineItem);
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
            });
        });
        describe('cloneLineItem()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.cloneLineItem(mockLineItem);
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/clone/lineItem');
                expect(mockApi.put).toHaveBeenCalledWithParameters({ lineItemId: '456' });
                expect(mockApi.put).toHaveBeenCalledWithLoading(true);
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.cloneLineItem(mockLineItem);
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
            });
        });
        describe('removeLineItem()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.removeLineItem(mockLineItem);
                expect(mockApi.delete).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.delete).toHaveBeenCalledWithEndpoint('cart/asset/456');
                expect(mockApi.delete).toHaveBeenCalledWithLoading(true);
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.removeLineItem(mockLineItem);
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.deleteResponse);
            });
        });
        describe('purchase()', function () {
            var mockCheckoutStoreState;
            var setCheckoutStateSpy;
            describe('for a credit card', function () {
                beforeEach(function () {
                    setCheckoutStateSpy = mockStore.createActionFactoryMethod('order', 'setCheckoutState');
                    mockStore.createStateSection('checkout', {
                        selectedPaymentType: 'CreditCard', authorization: { id: 123 }, selectedAddress: { addressEntityId: 12 }
                    });
                    serviceUnderTest = new cart_service_1.CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
                });
                it('calls the API service correctly', function () {
                    serviceUnderTest.purchase();
                    expect(mockApi.post).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/stripe/process');
                    expect(mockApi.post).toHaveBeenCalledWithLoading(true);
                });
                it('returns an observable of the back-end response', function () {
                    serviceUnderTest.purchase()
                        .subscribe(function (response) { return expect(response).toEqual(mockApi.postResponse); });
                });
                it('dispatches the proper action', function () {
                    serviceUnderTest.purchase().subscribe();
                    expect(setCheckoutStateSpy).toHaveBeenCalledWith(true);
                });
            });
            describe('for purchase on credit', function () {
                beforeEach(function () {
                    setCheckoutStateSpy = mockStore.createActionFactoryMethod('order', 'setCheckoutState');
                    mockStore.createStateSection('checkout', {
                        selectedPaymentType: 'PurchaseOnCredit', authorization: { id: 123 }, selectedAddress: { addressEntityId: 12 }
                    });
                    serviceUnderTest = new cart_service_1.CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
                });
                it('should call the API service correctly', function () {
                    serviceUnderTest.purchase();
                    expect(mockApi.post).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/checkout/purchaseOnCredit');
                    expect(mockApi.post).toHaveBeenCalledWithLoading(true);
                });
                it('return an observable of the order id', function () {
                    mockApi.postResponse = { id: 1, createdOn: null, total: 10000.00 };
                    serviceUnderTest.purchase().take(1).subscribe(function (response) {
                        expect(response).toEqual(1);
                    });
                });
                it('dispatches the proper action', function () {
                    serviceUnderTest.purchase().subscribe();
                    expect(setCheckoutStateSpy).toHaveBeenCalledWith(true);
                });
            });
        });
        describe('editLineItem()', function () {
            it('calls the API service correctly', function () {
                serviceUnderTest.editLineItem(mockLineItem, { selectedTranscodeTarget: '1080i' });
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/456');
                expect(mockApi.put).toHaveBeenCalledWithBody({
                    id: '456', price: 0, rightsManaged: 'Rights Managed', selectedTranscodeTarget: '1080i'
                });
            });
            it('replaces the cart store with the response', function () {
                serviceUnderTest.editLineItem(mockLineItem, { selectedTranscodeTarget: '1080i' });
                expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
            });
        });
        describe('retrieveLicenseAgreements()', function () {
            it('should call the api service correctly', function () {
                serviceUnderTest.retrieveLicenseAgreements();
                expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApi.get).toHaveBeenCalledWithEndpoint('cart/licensing');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsOERBQTRFO0FBQzVFLDZEQUEwRTtBQUMxRSwrQ0FBNkM7QUFHN0MsMEVBQXVFO0FBRXZFO0lBQ0UsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN2QixJQUFNLFdBQVcsR0FBWTtZQUMzQixFQUFFLEVBQUUsS0FBSztZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFLFFBQVE7WUFDcEIsUUFBUSxFQUFFLENBQUM7U0FDWixDQUFDO1FBRUYsSUFBTSxZQUFZLEdBQVk7WUFDNUIsSUFBSSxFQUFFLFdBQVc7WUFDakIsVUFBVSxFQUFFLGFBQWE7WUFDekIsRUFBRSxFQUFFLEtBQUs7WUFDVCxRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFFRixJQUFNLFlBQVksR0FBa0I7WUFDbEMsRUFBRSxFQUFFLEtBQUs7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLGFBQWEsRUFBRSxnQkFBZ0I7U0FDaEMsQ0FBQztRQUVGLElBQUksZ0JBQTZCLENBQUM7UUFDbEMsSUFBSSxPQUF1QixDQUFDO1FBQzVCLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLDZCQUFrQyxDQUFDO1FBQ3ZDLElBQUksT0FBb0IsQ0FBQztRQUN6QixJQUFJLGNBQTJCLENBQUM7UUFFaEMsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7WUFFckMsT0FBTyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBRS9CLFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUUvQixjQUFjLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUM1RSxTQUFTLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxF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QztnQkFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNWRCxvQkEyVkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9jYXJ0LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vbW9ja3MvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGksIEFwaUJvZHksIEFwaVBhcmFtZXRlcnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3QWRkcmVzcywgQWRkcmVzcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHJvamVjdCwgQXNzZXRMaW5lSXRlbSwgQWRkQXNzZXRQYXJhbWV0ZXJzLCBDYXJ0U3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NhcnQgU2VydmljZScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrUHJvamVjdDogUHJvamVjdCA9IHtcbiAgICAgIGlkOiAnMTIzJyxcbiAgICAgIG5hbWU6ICdGcmVkJyxcbiAgICAgIGNsaWVudE5hbWU6ICdCYXJuZXknLFxuICAgICAgc3VidG90YWw6IDBcbiAgICB9O1xuXG4gICAgY29uc3QgbW9ja1Byb2plY3RCOiBQcm9qZWN0ID0ge1xuICAgICAgbmFtZTogJ1Byb2plY3QgQScsXG4gICAgICBjbGllbnROYW1lOiAnUm9zcyBFZGZvcnQnLFxuICAgICAgaWQ6ICcxMTEnLFxuICAgICAgc3VidG90YWw6IDBcbiAgICB9O1xuXG4gICAgY29uc3QgbW9ja0xpbmVJdGVtOiBBc3NldExpbmVJdGVtID0ge1xuICAgICAgaWQ6ICc0NTYnLFxuICAgICAgcHJpY2U6IDAsXG4gICAgICByaWdodHNNYW5hZ2VkOiAnUmlnaHRzIE1hbmFnZWQnXG4gICAgfTtcblxuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBDYXJ0U2VydmljZTtcbiAgICBsZXQgbW9ja0FwaTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlU2VydmljZTogYW55O1xuICAgIGxldCBsb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgbG9hZFN1Y2Nlc3NTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG5cbiAgICAgIG1vY2tBcGkgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuXG4gICAgICBsb2FkU3VjY2Vzc1NweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjYXJ0JywgJ2xvYWRTdWNjZXNzJyk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjYXJ0JywgeyBkYXRhOiB7IHNvbWU6ICdkYXRhJyB9IH0pO1xuXG4gICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlU2VydmljZSA9IHtcbiAgICAgICAgZnVsbE5hbWU6IGphc21pbmUuY3JlYXRlU3B5KCdmdWxsTmFtZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKCdSb3NzIEVkZm9ydCcpKVxuICAgICAgfTtcblxuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBDYXJ0U2VydmljZShtb2NrU3RvcmUsIG1vY2tBcGkuaW5qZWN0b3IsIG1vY2tDdXJyZW50VXNlclNlcnZpY2VTZXJ2aWNlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkYXRhIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBkYXRhIGZyb20gdGhlIGNhcnQgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiBleHBlY3QoZGF0YSkudG9FcXVhbCh7IGRhdGE6IHsgc29tZTogJ2RhdGEnIH0gfSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3RhdGUgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIHN0YXRlIGZyb20gdGhlIGNhcnQgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKHsgZGF0YTogeyBzb21lOiAnZGF0YScgfSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrb3V0U3RhdGUoKSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY2hlY2tvdXQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NoZWNrb3V0Jywge1xuICAgICAgICAgIHB1cmNoYXNlT3JkZXJJZDogJzEyMzQtNTYnLFxuICAgICAgICAgIHNlbGVjdGVkUGF5bWVudFR5cGU6ICdDcmVkaXRDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QuY2hlY2tvdXRTdGF0ZSkudG9FcXVhbCh7IHB1cmNoYXNlT3JkZXJJZDogJzEyMzQtNTYnLCBzZWxlY3RlZFBheW1lbnRUeXBlOiAnQ3JlZGl0Q2FyZCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYXJ0IGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBkYXRhIGZyb20gdGhlIGNhcnQgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuY2FydC5zdWJzY3JpYmUoY2FydCA9PiBleHBlY3QoY2FydCkudG9FcXVhbCh7IHNvbWU6ICdkYXRhJyB9KSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYSBjbG9uZWQgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmNhcnQuc3Vic2NyaWJlKGNhcnQgPT4gZXhwZWN0KGNhcnQpLm5vdC50b0JlKG1vY2tTdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5jYXJ0LmRhdGEpKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRBc3NldFRvUHJvamVjdEluQ2FydCgpJywgKCkgPT4ge1xuICAgICAgbGV0IHNuYWNrYmFyU3B5OiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NhcnQnLCB7IGRhdGE6IHsgcHJvamVjdHM6IFttb2NrUHJvamVjdEJdIH0gfSk7XG4gICAgICAgIHNuYWNrYmFyU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3NuYWNrYmFyJywgJ2Rpc3BsYXknKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgY29uc3QgYm9keTogQXBpQm9keSA9IHtcbiAgICAgICAgICBsaW5lSXRlbTogeyBhc3NldDogeyBhc3NldElkOiAxMDgzNiwgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfSwgc2VsZWN0ZWRUcmFuc2NvZGVUYXJnZXQ6ICcxMDgwcCcsIHByaWNlOiAxMDAuNSB9LFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFt7IHByaWNlQXR0cmlidXRlTmFtZTogJ2tleScsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICd2YWx1ZScgfV1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcGFyYW1ldGVyczogQXBpUGFyYW1ldGVycyA9IHsgcHJvamVjdE5hbWU6ICdQcm9qZWN0IEEnLCByZWdpb246ICdBQUEnIH07XG4gICAgICAgIGNvbnN0IGFkZEFzc2V0UGFyYW1ldGVyczogQWRkQXNzZXRQYXJhbWV0ZXJzID0ge1xuICAgICAgICAgIGxpbmVJdGVtOiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEwODM2IH0sIHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnMTA4MHAnLCBwcmljZTogMTAwLjUgfSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbeyBwcmljZUF0dHJpYnV0ZU5hbWU6ICdrZXknLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAndmFsdWUnIH1dXG4gICAgICAgIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRBc3NldFRvUHJvamVjdEluQ2FydChhZGRBc3NldFBhcmFtZXRlcnMpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dClcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgQXBpLk9yZGVycyxcbiAgICAgICAgICAnY2FydC9hc3NldC9saW5lSXRlbScsXG4gICAgICAgICAgeyBib2R5OiBib2R5LCBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyB0aGUgYXBpIHNlcnZpY2UgY29ycmVjdGx5IC0gbm8gdHJhbnNjb2RlIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYm9keTogQXBpQm9keSA9IHsgbGluZUl0ZW06IHsgYXNzZXQ6IHsgYXNzZXRJZDogMTA4MzYsIHRpbWVTdGFydDogLTEsIHRpbWVFbmQ6IC0yIH0gfSB9O1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzOiBBcGlQYXJhbWV0ZXJzID0geyBwcm9qZWN0TmFtZTogJ1Byb2plY3QgQScsIHJlZ2lvbjogJ0FBQScgfTtcbiAgICAgICAgY29uc3QgYWRkQXNzZXRQYXJhbWV0ZXJzOiBBZGRBc3NldFBhcmFtZXRlcnMgPSB7IGxpbmVJdGVtOiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEwODM2IH0gfSB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQoYWRkQXNzZXRQYXJhbWV0ZXJzKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpXG4gICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIEFwaS5PcmRlcnMsXG4gICAgICAgICAgJ2NhcnQvYXNzZXQvbGluZUl0ZW0nLFxuICAgICAgICAgIHsgYm9keTogYm9keSwgcGFyYW1ldGVyczogcGFyYW1ldGVycywgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWRkcyB0aGUgYXNzZXQgdG8gdGhlIGNhcnQgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBcGkucHV0UmVzcG9uc2UgPSB7IGxpbmVJdGVtOiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEwODM2IH0gfSB9O1xuICAgICAgICBjb25zdCBhZGRBc3NldFBhcmFtZXRlcnM6IEFkZEFzc2V0UGFyYW1ldGVycyA9IHtcbiAgICAgICAgICBsaW5lSXRlbTogeyBhc3NldDogeyBhc3NldElkOiAxMDgzNiB9LCBzZWxlY3RlZFRyYW5zY29kZVRhcmdldDogJzEwODBwJyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRBc3NldFRvUHJvamVjdEluQ2FydChhZGRBc3NldFBhcmFtZXRlcnMpO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3VjY2Vzc1NweSlcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBsaW5lSXRlbTogeyBhc3NldDogeyBhc3NldElkOiAxMDgzNiB9IH0gfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rpc3BsYXlzIGEgc25hY2tiYXIgd2l0aCB0aGUgZXhwZWN0ZWQgbWVzc2FnZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkQXNzZXRQYXJhbWV0ZXJzOiBBZGRBc3NldFBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgbGluZUl0ZW06IHsgYXNzZXQ6IHsgYXNzZXRJZDogMTA4MzYgfSwgc2VsZWN0ZWRUcmFuc2NvZGVUYXJnZXQ6ICcxMDgwcCcgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQoYWRkQXNzZXRQYXJhbWV0ZXJzKTtcblxuICAgICAgICBleHBlY3Qoc25hY2tiYXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdBU1NFVC5BRERfVE9fQ0FSVF9UT0FTVCcsIHsgYXNzZXRJZDogMTA4MzYgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRQcm9qZWN0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIEFQSSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRQcm9qZWN0KCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NhcnQvcHJvamVjdCcpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoeyBjbGllbnROYW1lOiAnUm9zcyBFZGZvcnQnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ25hbWVzIG5ldyBwcm9qZWN0cyBiYXNlZCBvbiBleGlzdGluZyBuYW1lcycsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY2FydCcsIHsgZGF0YTogeyBwcm9qZWN0czogW3sgbmFtZTogJ1Byb2plY3QgQScsIGNsaWVudE5hbWU6ICdSb3NzIEVkZm9ydCcgfV0gfSB9KTtcbiAgICAgICAgLy8gc2VydmljZVVuZGVyVGVzdCA9IG5ldyBDYXJ0U2VydmljZShtb2NrQXAsIG1vY2tDaGVja291dFN0b3JlLCBtb2NrQXBpLmluamVjdG9yLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlU2VydmljZSk7XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRQcm9qZWN0KCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgY2xpZW50TmFtZTogJ1Jvc3MgRWRmb3J0JyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVwbGFjZXMgdGhlIGNhcnQgc3RvcmUgd2l0aCB0aGUgcmVzcG9uc2UnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuYWRkUHJvamVjdCgpO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3VjY2Vzc1NweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0FwaS5wb3N0UmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVtb3ZlUHJvamVjdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVtb3ZlUHJvamVjdChtb2NrUHJvamVjdCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZGVsZXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZGVsZXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjYXJ0L3Byb2plY3QvMTIzJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXBsYWNlcyB0aGUgY2FydCBzdG9yZSB3aXRoIHRoZSByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZW1vdmVQcm9qZWN0KG1vY2tQcm9qZWN0KTtcblxuICAgICAgICBleHBlY3QobG9hZFN1Y2Nlc3NTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tBcGkuZGVsZXRlUmVzcG9uc2UpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1cGRhdGVQcm9qZWN0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIEFQSSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC51cGRhdGVQcm9qZWN0KG1vY2tQcm9qZWN0KTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NhcnQvcHJvamVjdCcpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keShtb2NrUHJvamVjdCk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXBsYWNlcyB0aGUgY2FydCBzdG9yZSB3aXRoIHRoZSByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC51cGRhdGVQcm9qZWN0KG1vY2tQcm9qZWN0KTtcblxuICAgICAgICBleHBlY3QobG9hZFN1Y2Nlc3NTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tBcGkucHV0UmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbW92ZUxpbmVJdGVtVG8oKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm1vdmVMaW5lSXRlbVRvKG1vY2tQcm9qZWN0LCBtb2NrTGluZUl0ZW0pO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY2FydC9tb3ZlL2xpbmVJdGVtJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgbGluZUl0ZW1JZDogJzQ1NicsIHByb2plY3RJZDogJzEyMycgfSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXBsYWNlcyB0aGUgY2FydCBzdG9yZSB3aXRoIHRoZSByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5tb3ZlTGluZUl0ZW1Ubyhtb2NrUHJvamVjdCwgbW9ja0xpbmVJdGVtKTtcblxuICAgICAgICBleHBlY3QobG9hZFN1Y2Nlc3NTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tBcGkucHV0UmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2xvbmVMaW5lSXRlbSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuY2xvbmVMaW5lSXRlbShtb2NrTGluZUl0ZW0pO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY2FydC9jbG9uZS9saW5lSXRlbScpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7IGxpbmVJdGVtSWQ6ICc0NTYnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVwbGFjZXMgdGhlIGNhcnQgc3RvcmUgd2l0aCB0aGUgcmVzcG9uc2UnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuY2xvbmVMaW5lSXRlbShtb2NrTGluZUl0ZW0pO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3VjY2Vzc1NweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0FwaS5wdXRSZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdmVMaW5lSXRlbSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVtb3ZlTGluZUl0ZW0obW9ja0xpbmVJdGVtKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NhcnQvYXNzZXQvNDU2Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXBsYWNlcyB0aGUgY2FydCBzdG9yZSB3aXRoIHRoZSByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZW1vdmVMaW5lSXRlbShtb2NrTGluZUl0ZW0pO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3VjY2Vzc1NweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0FwaS5kZWxldGVSZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwdXJjaGFzZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IG1vY2tDaGVja291dFN0b3JlU3RhdGU6IGFueTtcbiAgICAgIGxldCBzZXRDaGVja291dFN0YXRlU3B5OiBqYXNtaW5lLlNweTtcblxuICAgICAgZGVzY3JpYmUoJ2ZvciBhIGNyZWRpdCBjYXJkJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBzZXRDaGVja291dFN0YXRlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ29yZGVyJywgJ3NldENoZWNrb3V0U3RhdGUnKTtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjaGVja291dCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkUGF5bWVudFR5cGU6ICdDcmVkaXRDYXJkJywgYXV0aG9yaXphdGlvbjogeyBpZDogMTIzIH0sIHNlbGVjdGVkQWRkcmVzczogeyBhZGRyZXNzRW50aXR5SWQ6IDEyIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IENhcnRTZXJ2aWNlKG1vY2tTdG9yZSwgbW9ja0FwaS5pbmplY3RvciwgbW9ja0N1cnJlbnRVc2VyU2VydmljZVNlcnZpY2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhlIEFQSSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnB1cmNoYXNlKCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjYXJ0L3N0cmlwZS9wcm9jZXNzJyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGkucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIHRoZSBiYWNrLWVuZCByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnB1cmNoYXNlKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzcG9uc2UgPT4gZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKG1vY2tBcGkucG9zdFJlc3BvbnNlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBwcm9wZXIgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QucHVyY2hhc2UoKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICAgIGV4cGVjdChzZXRDaGVja291dFN0YXRlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2ZvciBwdXJjaGFzZSBvbiBjcmVkaXQnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIHNldENoZWNrb3V0U3RhdGVTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnb3JkZXInLCAnc2V0Q2hlY2tvdXRTdGF0ZScpO1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWRQYXltZW50VHlwZTogJ1B1cmNoYXNlT25DcmVkaXQnLCBhdXRob3JpemF0aW9uOiB7IGlkOiAxMjMgfSwgc2VsZWN0ZWRBZGRyZXNzOiB7IGFkZHJlc3NFbnRpdHlJZDogMTIgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ2FydFNlcnZpY2UobW9ja1N0b3JlLCBtb2NrQXBpLmluamVjdG9yLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlU2VydmljZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgQVBJIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QucHVyY2hhc2UoKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NhcnQvY2hlY2tvdXQvcHVyY2hhc2VPbkNyZWRpdCcpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybiBhbiBvYnNlcnZhYmxlIG9mIHRoZSBvcmRlciBpZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnBvc3RSZXNwb25zZSA9IHsgaWQ6IDEsIGNyZWF0ZWRPbjogbnVsbCwgdG90YWw6IDEwMDAwLjAwIH07XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5wdXJjaGFzZSgpLnRha2UoMSkuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBwcm9wZXIgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QucHVyY2hhc2UoKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICAgIGV4cGVjdChzZXRDaGVja291dFN0YXRlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0TGluZUl0ZW0oKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmVkaXRMaW5lSXRlbShtb2NrTGluZUl0ZW0sIHsgc2VsZWN0ZWRUcmFuc2NvZGVUYXJnZXQ6ICcxMDgwaScgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjYXJ0L3VwZGF0ZS9saW5lSXRlbS80NTYnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoe1xuICAgICAgICAgIGlkOiAnNDU2JywgcHJpY2U6IDAsIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcsIHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnMTA4MGknXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXBsYWNlcyB0aGUgY2FydCBzdG9yZSB3aXRoIHRoZSByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5lZGl0TGluZUl0ZW0obW9ja0xpbmVJdGVtLCB7IHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnMTA4MGknIH0pO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3VjY2Vzc1NweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0FwaS5wdXRSZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjYXJ0L2xpY2Vuc2luZycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
