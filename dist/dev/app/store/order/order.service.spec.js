"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_service_1 = require("./order.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Order Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var backEndOrder;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            backEndOrder = {
                projects: [
                    { lineItems: [{ some: 'lineItem' }, { another: 'lineItem' }] },
                    { lineItems: [{ oneMore: 'lineItem' }, { yetAnother: 'lineItem' }] }
                ],
                other: 'stuff'
            };
            mockApiService.getResponse = backEndOrder;
            serviceUnderTest = new order_service_1.OrderService(mockApiService.injector);
        });
        describe('load()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.load(47);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/47');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('returns an observable of the back end\'s order', function () {
                var retrievedOrder;
                serviceUnderTest.load(47).subscribe(function (order) { return retrievedOrder = order; });
                expect(retrievedOrder).toEqual(backEndOrder);
            });
            it('fills in missing line items with an empty array', function () {
                delete backEndOrder.projects[1].lineItems;
                var expectedRetrievedOrder = {
                    projects: [
                        { lineItems: [{ some: 'lineItem' }, { another: 'lineItem' }] },
                        { lineItems: [] }
                    ],
                    other: 'stuff'
                };
                var retrievedOrder;
                serviceUnderTest.load(47).subscribe(function (order) { return retrievedOrder = order; });
                expect(retrievedOrder).toEqual(expectedRetrievedOrder);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxpREFBK0M7QUFDL0MscUVBQW1GO0FBQ25GLHVFQUE0RDtBQUU1RDtJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBSSxnQkFBOEIsQ0FBQztRQUNuQyxJQUFJLGNBQThCLENBQUM7UUFDbkMsSUFBSSxZQUFpQixDQUFDO1FBRXRCLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUV0QyxZQUFZLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRTtvQkFDOUQsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFO2lCQUNyRTtnQkFDRCxLQUFLLEVBQUUsT0FBTzthQUNmLENBQUM7WUFFRixjQUFjLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztZQUUxQyxnQkFBZ0IsR0FBRyxJQUFJLDRCQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqQixFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO2dCQUNuRCxJQUFJLGNBQW1CLENBQUM7Z0JBQ3hCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxjQUFjLEdBQUcsS0FBSyxFQUF0QixDQUFzQixDQUFDLENBQUM7Z0JBRXJFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUU7Z0JBQ3BELE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBRTFDLElBQU0sc0JBQXNCLEdBQVE7b0JBQ2xDLFFBQVEsRUFBRTt3QkFDUixFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUU7d0JBQzlELEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtxQkFDbEI7b0JBQ0QsS0FBSyxFQUFFLE9BQU87aUJBQ2YsQ0FBQztnQkFFRixJQUFJLGNBQW1CLENBQUM7Z0JBQ3hCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxjQUFjLEdBQUcsS0FBSyxFQUF0QixDQUFzQixDQUFDLENBQUM7Z0JBRXJFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekRELG9CQXlEQyIsImZpbGUiOiJhcHAvc3RvcmUvb3JkZXIvb3JkZXIuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4vb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnT3JkZXIgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogT3JkZXJTZXJ2aWNlO1xuICAgIGxldCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IGJhY2tFbmRPcmRlcjogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuXG4gICAgICBiYWNrRW5kT3JkZXIgPSB7XG4gICAgICAgIHByb2plY3RzOiBbXG4gICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IHNvbWU6ICdsaW5lSXRlbScgfSwgeyBhbm90aGVyOiAnbGluZUl0ZW0nIH1dIH0sXG4gICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IG9uZU1vcmU6ICdsaW5lSXRlbScgfSwgeyB5ZXRBbm90aGVyOiAnbGluZUl0ZW0nIH1dIH1cbiAgICAgICAgXSxcbiAgICAgICAgb3RoZXI6ICdzdHVmZidcbiAgICAgIH07XG5cbiAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0gYmFja0VuZE9yZGVyO1xuXG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IE9yZGVyU2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3Rvcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoNDcpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdvcmRlci80NycpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiB0aGUgYmFjayBlbmRcXCdzIG9yZGVyJywgKCkgPT4ge1xuICAgICAgICBsZXQgcmV0cmlldmVkT3JkZXI6IGFueTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKDQ3KS5zdWJzY3JpYmUob3JkZXIgPT4gcmV0cmlldmVkT3JkZXIgPSBvcmRlcik7XG5cbiAgICAgICAgZXhwZWN0KHJldHJpZXZlZE9yZGVyKS50b0VxdWFsKGJhY2tFbmRPcmRlcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2ZpbGxzIGluIG1pc3NpbmcgbGluZSBpdGVtcyB3aXRoIGFuIGVtcHR5IGFycmF5JywgKCkgPT4ge1xuICAgICAgICBkZWxldGUgYmFja0VuZE9yZGVyLnByb2plY3RzWzFdLmxpbmVJdGVtcztcblxuICAgICAgICBjb25zdCBleHBlY3RlZFJldHJpZXZlZE9yZGVyOiBhbnkgPSB7XG4gICAgICAgICAgcHJvamVjdHM6IFtcbiAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBzb21lOiAnbGluZUl0ZW0nIH0sIHsgYW5vdGhlcjogJ2xpbmVJdGVtJyB9XSB9LFxuICAgICAgICAgICAgeyBsaW5lSXRlbXM6IFtdIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG90aGVyOiAnc3R1ZmYnXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJldHJpZXZlZE9yZGVyOiBhbnk7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCg0Nykuc3Vic2NyaWJlKG9yZGVyID0+IHJldHJpZXZlZE9yZGVyID0gb3JkZXIpO1xuXG4gICAgICAgIGV4cGVjdChyZXRyaWV2ZWRPcmRlcikudG9FcXVhbChleHBlY3RlZFJldHJpZXZlZE9yZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
