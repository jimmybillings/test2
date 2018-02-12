"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delivery_options_service_1 = require("./delivery-options.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var frame_1 = require("../../shared/modules/wazee-frame-formatter/frame");
function main() {
    describe('Delivery Options Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var mockAsperaService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            mockAsperaService = { initConnect: jasmine.createSpy('initConnect') };
            serviceUnderTest = new delivery_options_service_1.DeliveryOptionsService(mockApiService.injector, mockAsperaService);
        });
        describe('getDeliveryOptions()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.getDeliveryOptions(47);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('renditionType/deliveryOptions/47');
            });
            it('calls the API correctly, with a shareKey', function () {
                serviceUnderTest.getDeliveryOptions(47, 'abc-123');
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('renditionType/deliveryOptions/47');
                expect(mockApiService.get).toHaveBeenCalledWithOverridingToken('abc-123');
            });
            it('maps the data to a more suitable format for the UI', function () {
                mockApiService.getResponse = mockApiDeliveryOptions();
                var formattedDeliveryOptions;
                serviceUnderTest.getDeliveryOptions(111).take(1).subscribe(function (options) { return formattedDeliveryOptions = options; });
                expect(formattedDeliveryOptions).toEqual(mockFormattedDeliveryOptions());
            });
            it('returns an observable of an empty array if no options are returned by the API', function () {
                mockApiService.getResponse = {};
                var formattedDeliveryOptions;
                serviceUnderTest.getDeliveryOptions(111).take(1).subscribe(function (options) { return formattedDeliveryOptions = options; });
                expect(formattedDeliveryOptions).toEqual([]);
            });
        });
        describe('deliverAsset()', function () {
            describe('should call the API service correctly', function () {
                it('when markers do not exist', function () {
                    serviceUnderTest.deliverAsset(123, 456);
                    expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApiService.post).toHaveBeenCalledWithEndpoint('order/deliverAsset/123');
                    expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
                    expect(mockApiService.post).toHaveBeenCalledWithParameters({
                        region: 'AAA',
                        optionId: '456'
                    });
                });
                it('when markers do exist', function () {
                    serviceUnderTest.deliverAsset(123, 456, {
                        in: new frame_1.Frame(30).setFromSeconds(1),
                        out: new frame_1.Frame(30).setFromSeconds(10)
                    });
                    expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApiService.post).toHaveBeenCalledWithEndpoint('order/deliverAsset/123');
                    expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
                    expect(mockApiService.post).toHaveBeenCalledWithParameters({
                        region: 'AAA',
                        optionId: '456',
                        startTime: '1000',
                        endTime: '10000'
                    });
                });
            });
        });
        describe('initializeAsperaConnection', function () {
            it('calls \'initConnect()\' on the aspera service', function () {
                serviceUnderTest.initializeAsperaConnection('wow');
                expect(mockAsperaService.initConnect).toHaveBeenCalledWith('wow');
            });
        });
    });
    function mockApiDeliveryOptions() {
        return {
            list: [
                {
                    deliveryOptionId: 5,
                    deliveryOptionLabel: 'Watermarked Comp',
                    renditionUrl: 'someUrl'
                },
                {
                    deliveryOptionId: 7,
                    deliveryOptionLabel: 'On Demand Comp'
                },
                {
                    deliveryOptionId: 8,
                    deliveryOptionLabel: 'Direct Download',
                    deliveryOptionGroupId: 'directDown',
                    deliveryOptionGroupOrder: '2',
                    renditionUrl: 'someUrl'
                },
                {
                    deliveryOptionId: 9,
                    deliveryOptionLabel: 'Direct Download Aspera',
                    deliveryOptionGroupId: 'directDown',
                    deliveryOptionGroupOrder: '1',
                    renditionUrl: 'someUrl'
                }
            ]
        };
    }
    function mockFormattedDeliveryOptions() {
        return [
            [
                {
                    deliveryOptionId: 5,
                    deliveryOptionLabel: 'Watermarked Comp',
                    renditionUrl: 'someUrl'
                }
            ],
            [
                {
                    deliveryOptionId: 7,
                    deliveryOptionLabel: 'On Demand Comp'
                }
            ],
            [
                {
                    deliveryOptionId: 9,
                    deliveryOptionLabel: 'Direct Download Aspera',
                    deliveryOptionGroupId: 'directDown',
                    deliveryOptionGroupOrder: '1',
                    renditionUrl: 'someUrl'
                },
                {
                    deliveryOptionId: 8,
                    deliveryOptionLabel: 'Direct Download',
                    deliveryOptionGroupId: 'directDown',
                    deliveryOptionGroupOrder: '2',
                    renditionUrl: 'someUrl'
                }
            ]
        ];
    }
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQW9FO0FBQ3BFLHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFDNUQsMEVBQXlFO0FBRXpFO0lBQ0UsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1FBQ25DLElBQUksZ0JBQXdDLENBQUM7UUFDN0MsSUFBSSxjQUE4QixDQUFDO1FBQ25DLElBQUksaUJBQXNCLENBQUM7UUFFM0IsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7WUFDckMsY0FBYyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBQ3RDLGlCQUFpQixHQUFHLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUN0RSxnQkFBZ0IsR0FBRyxJQUFJLGlEQUFzQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUM5RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTtnQkFDN0MsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLENBQUMsY0FB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aUJBQ3hCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEO1FBQ0UsTUFBTSxDQUFDO1lBQ0w7Z0JBQ0U7b0JBQ0UsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsbUJBQW1CLEVBQUUsa0JBQWtCO29CQUN2QyxZQUFZLEVBQUUsU0FBUztpQkFDeEI7YUFDRjtZQUNEO2dCQUNFO29CQUNFLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLG1CQUFtQixFQUFFLGdCQUFnQjtpQkFDdEM7YUFDRjtZQUNEO2dCQUNFO29CQUNFLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLG1CQUFtQixFQUFFLHdCQUF3QjtvQkFDN0MscUJBQXFCLEVBQUUsWUFBWTtvQkFDbkMsd0JBQXdCLEVBQUUsR0FBRztvQkFDN0IsWUFBWSxFQUFFLFNBQVM7aUJBQ3hCO2dCQUNEO29CQUNFLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLG1CQUFtQixFQUFFLGlCQUFpQjtvQkFDdEMscUJBQXFCLEVBQUUsWUFBWTtvQkFDbkMsd0JBQXdCLEVBQUUsR0FBRztvQkFDN0IsWUFBWSxFQUFFLFNBQVM7aUJBQ3hCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFySkQsb0JBcUpDIiwiZmlsZSI6ImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVsaXZlcnlPcHRpb25zU2VydmljZSB9IGZyb20gJy4vZGVsaXZlcnktb3B0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE1vY2tBcGlTZXJ2aWNlLCBtb2NrQXBpTWF0Y2hlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2ZyYW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdEZWxpdmVyeSBPcHRpb25zIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IERlbGl2ZXJ5T3B0aW9uc1NlcnZpY2U7XG4gICAgbGV0IG1vY2tBcGlTZXJ2aWNlOiBNb2NrQXBpU2VydmljZTtcbiAgICBsZXQgbW9ja0FzcGVyYVNlcnZpY2U6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIG1vY2tBc3BlcmFTZXJ2aWNlID0geyBpbml0Q29ubmVjdDogamFzbWluZS5jcmVhdGVTcHkoJ2luaXRDb25uZWN0JykgfTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgRGVsaXZlcnlPcHRpb25zU2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3RvciwgbW9ja0FzcGVyYVNlcnZpY2UpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldERlbGl2ZXJ5T3B0aW9ucygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldERlbGl2ZXJ5T3B0aW9ucyg0Nyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdyZW5kaXRpb25UeXBlL2RlbGl2ZXJ5T3B0aW9ucy80NycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseSwgd2l0aCBhIHNoYXJlS2V5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldERlbGl2ZXJ5T3B0aW9ucyg0NywgJ2FiYy0xMjMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3JlbmRpdGlvblR5cGUvZGVsaXZlcnlPcHRpb25zLzQ3Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoT3ZlcnJpZGluZ1Rva2VuKCdhYmMtMTIzJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ21hcHMgdGhlIGRhdGEgdG8gYSBtb3JlIHN1aXRhYmxlIGZvcm1hdCBmb3IgdGhlIFVJJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IG1vY2tBcGlEZWxpdmVyeU9wdGlvbnMoKTtcblxuICAgICAgICBsZXQgZm9ybWF0dGVkRGVsaXZlcnlPcHRpb25zOiBhbnk7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0RGVsaXZlcnlPcHRpb25zKDExMSkudGFrZSgxKS5zdWJzY3JpYmUob3B0aW9ucyA9PiBmb3JtYXR0ZWREZWxpdmVyeU9wdGlvbnMgPSBvcHRpb25zKTtcbiAgICAgICAgZXhwZWN0KGZvcm1hdHRlZERlbGl2ZXJ5T3B0aW9ucykudG9FcXVhbChtb2NrRm9ybWF0dGVkRGVsaXZlcnlPcHRpb25zKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgYW4gZW1wdHkgYXJyYXkgaWYgbm8gb3B0aW9ucyBhcmUgcmV0dXJuZWQgYnkgdGhlIEFQSScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7fTtcblxuICAgICAgICBsZXQgZm9ybWF0dGVkRGVsaXZlcnlPcHRpb25zOiBhbnk7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0RGVsaXZlcnlPcHRpb25zKDExMSkudGFrZSgxKS5zdWJzY3JpYmUob3B0aW9ucyA9PiBmb3JtYXR0ZWREZWxpdmVyeU9wdGlvbnMgPSBvcHRpb25zKTtcbiAgICAgICAgZXhwZWN0KGZvcm1hdHRlZERlbGl2ZXJ5T3B0aW9ucykudG9FcXVhbChbXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkZWxpdmVyQXNzZXQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdzaG91bGQgY2FsbCB0aGUgQVBJIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiBtYXJrZXJzIGRvIG5vdCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmRlbGl2ZXJBc3NldCgxMjMsIDQ1Nik7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ29yZGVyL2RlbGl2ZXJBc3NldC8xMjMnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoe1xuICAgICAgICAgICAgcmVnaW9uOiAnQUFBJyxcbiAgICAgICAgICAgIG9wdGlvbklkOiAnNDU2J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiBtYXJrZXJzIGRvIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGVsaXZlckFzc2V0KDEyMywgNDU2LCB7XG4gICAgICAgICAgICBpbjogbmV3IEZyYW1lKDMwKS5zZXRGcm9tU2Vjb25kcygxKSxcbiAgICAgICAgICAgIG91dDogbmV3IEZyYW1lKDMwKS5zZXRGcm9tU2Vjb25kcygxMClcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuT3JkZXJzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnb3JkZXIvZGVsaXZlckFzc2V0LzEyMycpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7XG4gICAgICAgICAgICByZWdpb246ICdBQUEnLFxuICAgICAgICAgICAgb3B0aW9uSWQ6ICc0NTYnLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAnMTAwMCcsXG4gICAgICAgICAgICBlbmRUaW1lOiAnMTAwMDAnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZUFzcGVyYUNvbm5lY3Rpb24nLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgXFwnaW5pdENvbm5lY3QoKVxcJyBvbiB0aGUgYXNwZXJhIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuaW5pdGlhbGl6ZUFzcGVyYUNvbm5lY3Rpb24oJ3dvdycpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXNwZXJhU2VydmljZS5pbml0Q29ubmVjdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3dvdycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIG1vY2tBcGlEZWxpdmVyeU9wdGlvbnMoKTogeyBsaXN0OiBhbnlbXSB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25JZDogNSxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkxhYmVsOiAnV2F0ZXJtYXJrZWQgQ29tcCcsXG4gICAgICAgICAgcmVuZGl0aW9uVXJsOiAnc29tZVVybCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uSWQ6IDcsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25MYWJlbDogJ09uIERlbWFuZCBDb21wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25JZDogOCxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkxhYmVsOiAnRGlyZWN0IERvd25sb2FkJyxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkdyb3VwSWQ6ICdkaXJlY3REb3duJyxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkdyb3VwT3JkZXI6ICcyJyxcbiAgICAgICAgICByZW5kaXRpb25Vcmw6ICdzb21lVXJsJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25JZDogOSxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkxhYmVsOiAnRGlyZWN0IERvd25sb2FkIEFzcGVyYScsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25Hcm91cElkOiAnZGlyZWN0RG93bicsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25Hcm91cE9yZGVyOiAnMScsXG4gICAgICAgICAgcmVuZGl0aW9uVXJsOiAnc29tZVVybCdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtb2NrRm9ybWF0dGVkRGVsaXZlcnlPcHRpb25zKCk6IEFycmF5PGFueVtdPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uSWQ6IDUsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25MYWJlbDogJ1dhdGVybWFya2VkIENvbXAnLFxuICAgICAgICAgIHJlbmRpdGlvblVybDogJ3NvbWVVcmwnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbklkOiA3LFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uTGFiZWw6ICdPbiBEZW1hbmQgQ29tcCdcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uSWQ6IDksXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25MYWJlbDogJ0RpcmVjdCBEb3dubG9hZCBBc3BlcmEnLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uR3JvdXBJZDogJ2RpcmVjdERvd24nLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uR3JvdXBPcmRlcjogJzEnLFxuICAgICAgICAgIHJlbmRpdGlvblVybDogJ3NvbWVVcmwnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbklkOiA4LFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uTGFiZWw6ICdEaXJlY3QgRG93bmxvYWQnLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uR3JvdXBJZDogJ2RpcmVjdERvd24nLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uR3JvdXBPcmRlcjogJzInLFxuICAgICAgICAgIHJlbmRpdGlvblVybDogJ3NvbWVVcmwnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICBdO1xuICB9XG59XG5cblxuIl19
