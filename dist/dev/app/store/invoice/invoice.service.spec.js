"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invoice_service_1 = require("./invoice.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Invoice Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var invoice;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            invoice = {
                documents: ['doc1', 'doc2'],
                order: { some: 'order' },
                payee: { some: 'payee' }
            };
            mockApiService.getResponse = invoice;
            serviceUnderTest = new invoice_service_1.InvoiceService(mockApiService.injector);
        });
        describe('load()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.load(47);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/invoiceData/47');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('calls the API correctly - with a share token', function () {
                serviceUnderTest.load(47, 'abc-123');
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/invoiceData/47');
                expect(mockApiService.get).toHaveBeenCalledWithOverridingToken('abc-123');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('returns an observable of the back end\'s invoice', function () {
                var receivedInvoice;
                serviceUnderTest.load(47).subscribe(function (invoice) { return receivedInvoice = invoice; });
                expect(receivedInvoice).toEqual(invoice);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBSSxnQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLGNBQThCLENBQUM7UUFDbkMsSUFBSSxPQUFZLENBQUM7UUFFakIsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7WUFDckMsY0FBYyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBRXRDLE9BQU8sR0FBRztnQkFDUixTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO2dCQUMzQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUN4QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCLENBQUM7WUFFRixjQUFjLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUVyQyxnQkFBZ0IsR0FBRyxJQUFJLGdDQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqQixFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2hGLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsOENBQThDLEVBQUU7Z0JBQ2pELGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFO2dCQUNyRCxJQUFJLGVBQW9CLENBQUM7Z0JBQ3pCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxlQUFlLEdBQUcsT0FBTyxFQUF6QixDQUF5QixDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTlDRCxvQkE4Q0MiLCJmaWxlIjoiYXBwL3N0b3JlL2ludm9pY2UvaW52b2ljZS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgSW52b2ljZVNlcnZpY2UgfSBmcm9tICcuL2ludm9pY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnSW52b2ljZSBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBJbnZvaWNlU2VydmljZTtcbiAgICBsZXQgbW9ja0FwaVNlcnZpY2U6IE1vY2tBcGlTZXJ2aWNlO1xuICAgIGxldCBpbnZvaWNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKTtcbiAgICAgIG1vY2tBcGlTZXJ2aWNlID0gbmV3IE1vY2tBcGlTZXJ2aWNlKCk7XG5cbiAgICAgIGludm9pY2UgPSB7XG4gICAgICAgIGRvY3VtZW50czogWydkb2MxJywgJ2RvYzInXSxcbiAgICAgICAgb3JkZXI6IHsgc29tZTogJ29yZGVyJyB9LFxuICAgICAgICBwYXllZTogeyBzb21lOiAncGF5ZWUnIH1cbiAgICAgIH07XG5cbiAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0gaW52b2ljZTtcblxuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBJbnZvaWNlU2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3Rvcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoNDcpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdvcmRlci9pbnZvaWNlRGF0YS80NycpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5IC0gd2l0aCBhIHNoYXJlIHRva2VuJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoNDcsICdhYmMtMTIzJyk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ29yZGVyL2ludm9pY2VEYXRhLzQ3Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoT3ZlcnJpZGluZ1Rva2VuKCdhYmMtMTIzJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIHRoZSBiYWNrIGVuZFxcJ3MgaW52b2ljZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlY2VpdmVkSW52b2ljZTogYW55O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoNDcpLnN1YnNjcmliZShpbnZvaWNlID0+IHJlY2VpdmVkSW52b2ljZSA9IGludm9pY2UpO1xuICAgICAgICBleHBlY3QocmVjZWl2ZWRJbnZvaWNlKS50b0VxdWFsKGludm9pY2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
