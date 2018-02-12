"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pricing_service_1 = require("./pricing.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Pricing Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var mockMarkers = {
            in: {
                asMilliseconds: function () { return 1000; }
            },
            out: {
                asMilliseconds: function () { return 10000; }
            }
        };
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new pricing_service_1.PricingService(mockApiService.injector);
        });
        describe('getPrice()', function () {
            describe('calls the apiService correctly', function () {
                it('with markers', function () {
                    serviceUnderTest.getPrice({ some: 'attribute' }, 12345, mockMarkers);
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/price/12345');
                    expect(mockApiService.get).toHaveBeenCalledWithParameters({
                        region: 'AAA',
                        attributes: 'some:attribute',
                        startSecond: 1000,
                        endSecond: 10000
                    });
                });
                it('without markers', function () {
                    serviceUnderTest.getPrice({ some: 'attribute' }, 12345);
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/price/12345');
                    expect(mockApiService.get).toHaveBeenCalledWithParameters({
                        region: 'AAA',
                        attributes: 'some:attribute'
                    });
                });
            });
            it('maps the response to a number', function () {
                mockApiService.getResponse = { price: 1000, some: 'other data', that: 'we dont care about' };
                serviceUnderTest.getPrice({ some: 'attributes' }, 12345, mockMarkers).subscribe(function (res) {
                    expect(res).toBe(1000);
                });
            });
        });
        describe('getPriceAttributes', function () {
            it('calls the apiService correctly', function () {
                serviceUnderTest.getPriceAttributes('Rights Managed');
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/priceAttributes');
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ region: 'AAA', priceModel: 'RightsManaged' });
            });
            it('maps the response to an array of price attributes', function () {
                mockApiService.getResponse = { list: [{ some: 'attribute' }, { some: 'otherAttribute' }] };
                serviceUnderTest.getPriceAttributes('Rights Managed').subscribe(function (res) {
                    expect(res).toEqual([{ some: 'attribute', primary: true }, { some: 'otherAttribute' }]);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBSSxnQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLGNBQThCLENBQUM7UUFDbkMsSUFBTSxXQUFXLEdBQVE7WUFDdkIsRUFBRSxFQUFFO2dCQUNGLGNBQWMsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7YUFDM0I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsY0FBYyxFQUFFLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSzthQUM1QjtTQUNGLENBQUM7UUFFRixVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7WUFDdEMsZ0JBQWdCLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO2dCQUN6QyxFQUFFLENBQUMsY0FBYyxFQUFFO29CQUNqQixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUVyRSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDakYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw4QkFB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ZW50IjpbImltcG9ydCB7IFByaWNpbmdTZXJ2aWNlIH0gZnJvbSAnLi9wcmljaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1ByaWNpbmcgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogUHJpY2luZ1NlcnZpY2U7XG4gICAgbGV0IG1vY2tBcGlTZXJ2aWNlOiBNb2NrQXBpU2VydmljZTtcbiAgICBjb25zdCBtb2NrTWFya2VyczogYW55ID0ge1xuICAgICAgaW46IHtcbiAgICAgICAgYXNNaWxsaXNlY29uZHM6ICgpID0+IDEwMDBcbiAgICAgIH0sXG4gICAgICBvdXQ6IHtcbiAgICAgICAgYXNNaWxsaXNlY29uZHM6ICgpID0+IDEwMDAwXG4gICAgICB9XG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgUHJpY2luZ1NlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFByaWNlKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnY2FsbHMgdGhlIGFwaVNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBpdCgnd2l0aCBtYXJrZXJzJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0UHJpY2UoeyBzb21lOiAnYXR0cmlidXRlJyB9LCAxMjM0NSwgbW9ja01hcmtlcnMpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgncHJpY2VCb29rL3ByaWNlLzEyMzQ1Jyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHtcbiAgICAgICAgICAgIHJlZ2lvbjogJ0FBQScsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAnc29tZTphdHRyaWJ1dGUnLFxuICAgICAgICAgICAgc3RhcnRTZWNvbmQ6IDEwMDAsXG4gICAgICAgICAgICBlbmRTZWNvbmQ6IDEwMDAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRob3V0IG1hcmtlcnMnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRQcmljZSh7IHNvbWU6ICdhdHRyaWJ1dGUnIH0sIDEyMzQ1KTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3ByaWNlQm9vay9wcmljZS8xMjM0NScpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7XG4gICAgICAgICAgICByZWdpb246ICdBQUEnLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3NvbWU6YXR0cmlidXRlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIGl0KCdtYXBzIHRoZSByZXNwb25zZSB0byBhIG51bWJlcicsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7IHByaWNlOiAxMDAwLCBzb21lOiAnb3RoZXIgZGF0YScsIHRoYXQ6ICd3ZSBkb250IGNhcmUgYWJvdXQnIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRQcmljZSh7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9LCAxMjM0NSwgbW9ja01hcmtlcnMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgIGV4cGVjdChyZXMpLnRvQmUoMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UHJpY2VBdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBhcGlTZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRQcmljZUF0dHJpYnV0ZXMoJ1JpZ2h0cyBNYW5hZ2VkJyk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLk9yZGVycyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3ByaWNlQm9vay9wcmljZUF0dHJpYnV0ZXMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgcmVnaW9uOiAnQUFBJywgcHJpY2VNb2RlbDogJ1JpZ2h0c01hbmFnZWQnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdtYXBzIHRoZSByZXNwb25zZSB0byBhbiBhcnJheSBvZiBwcmljZSBhdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHsgbGlzdDogW3sgc29tZTogJ2F0dHJpYnV0ZScgfSwgeyBzb21lOiAnb3RoZXJBdHRyaWJ1dGUnIH1dIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRQcmljZUF0dHJpYnV0ZXMoJ1JpZ2h0cyBNYW5hZ2VkJykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlcykudG9FcXVhbChbeyBzb21lOiAnYXR0cmlidXRlJywgcHJpbWFyeTogdHJ1ZSB9LCB7IHNvbWU6ICdvdGhlckF0dHJpYnV0ZScgfV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
