"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_service_1 = require("./search.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Search Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var mockCurrentUserService;
        var mockGalleryViewService;
        var mockUserPreferenceService;
        var loggedIn;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            mockCurrentUserService = { loggedIn: function () { return loggedIn; } };
            mockGalleryViewService = { stringifyPathForSearch: function () { return 'some-path'; } };
            mockUserPreferenceService = { state: { assetView: 'grid' } };
            serviceUnderTest = new search_service_1.SearchService(mockApiService.injector, mockCurrentUserService, mockGalleryViewService, mockUserPreferenceService);
        });
        describe('loadResults()', function () {
            describe('calls the apiService correctly', function () {
                it('for a logged in user - without a query', function () {
                    loggedIn = true;
                    serviceUnderTest.loadResults({ i: 1, n: 100 });
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search');
                    expect(mockApiService.get).toHaveBeenCalledWithParameters({
                        i: '0',
                        n: '100',
                        q: 'itemType:clip',
                        viewType: 'grid'
                    });
                    expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                });
                it('for a logged out user - with a query', function () {
                    loggedIn = false;
                    serviceUnderTest.loadResults({ i: 1, n: 100, q: 'dog' });
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search/anonymous');
                    expect(mockApiService.get).toHaveBeenCalledWithParameters({
                        i: '0',
                        n: '100',
                        q: 'dog',
                        viewType: 'grid'
                    });
                    expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                });
                it('for a logged in user - with a gallery view query', function () {
                    loggedIn = true;
                    serviceUnderTest.loadResults({
                        i: 1,
                        n: 100,
                        gq: '[{\"ids\":[15,7],\"names\":[\"tournament week events\",\"press building images\"]}]'
                    });
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search');
                    expect(mockApiService.get).toHaveBeenCalledWithParameters({
                        i: '0',
                        n: '100',
                        gq: 'some-path',
                        q: 'itemType:clip',
                        viewType: 'grid'
                    });
                    expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                });
            });
            describe('normalize()', function () {
                it('normalizes the results', function () {
                    mockApiService.getResponse = {
                        items: [{ some: 'items' }],
                        totalCount: 1,
                        pageSize: 20,
                        currentPage: 0,
                        numberOfPages: 1,
                        hasNextPage: false,
                        hasPreviousPage: false
                    };
                    var normalized;
                    serviceUnderTest.loadResults({ i: 1, n: 100 }).subscribe(function (results) { return normalized = results; });
                    expect(normalized).toEqual({
                        items: [{ some: 'items' }],
                        pagination: {
                            totalCount: 1,
                            pageSize: 20,
                            currentPage: 1,
                            numberOfPages: 1,
                            hasNextPage: false,
                            hasPreviousPage: false
                        }
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFpRDtBQUNqRCxxRUFBbUY7QUFDbkYsdUVBQTREO0FBRTVEO0lBQ0UsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQUksZ0JBQStCLENBQUM7UUFDcEMsSUFBSSxjQUE4QixDQUFDO1FBQ25DLElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxzQkFBMkIsQ0FBQztRQUNoQyxJQUFJLHlCQUE4QixDQUFDO1FBQ25DLElBQUksUUFBaUIsQ0FBQztRQUV0QixVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7WUFDdEMsc0JBQXNCLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBTSxPQUFBLFFBQVEsRUFBUixDQUFRLEVBQUUsQ0FBQztZQUN0RCxzQkFBc0IsR0FBRyxFQUFFLHNCQUFzQixFQUFFLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxFQUFFLENBQUM7WUFDdkUseUJBQXlCLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztZQUM3RCxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFhLENBQ2xDLGNBQWMsQ0FBQyxRQUFRLEVBQ3ZCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIseUJBQXlCLENBQzFCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDeEIsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO2dCQUN6QyxFQUFFLENBQUMsd0NBQXdDLEVBQUU7b0JBQzNDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ2hCLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFB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RSxLQUFLO3dCQUNsQixlQUFlLEVBQUUsS0FBSztxQkFDdkIsQ0FBQztvQkFFRixJQUFJLFVBQWUsQ0FBQztvQkFDcEIsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxVQUFVLEdBQUcsT0FBTyxFQUFwQixDQUFvQixDQUFDLENBQUM7b0JBQzFGLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3pCLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO3dCQUMxQixVQUFVLEVBQUU7NEJBQ1YsVUFBVSxFQUFFLENBQUM7NEJBQ2IsUUFBUSxFQUFFLEVBQUU7NEJBQ1osV0FBVyxFQUFFLENBQUM7NEJBQ2QsYUFBYSxFQUFFLENBQUM7NEJBQ2hCLFdBQVcsRUFBRSxLQUFLOzRCQUNsQixlQUFlLEVBQUUsS0FBSzt5QkFDdkI7cUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXpHRCxvQkF5R0MiLCJmaWxlIjoiYXBwL3N0b3JlL3NlYXJjaC9zZWFyY2guc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NlYXJjaCBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBTZWFyY2hTZXJ2aWNlO1xuICAgIGxldCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0dhbGxlcnlWaWV3U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrVXNlclByZWZlcmVuY2VTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IGxvZ2dlZEluOiBib29sZWFuO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgbG9nZ2VkSW46ICgpID0+IGxvZ2dlZEluIH07XG4gICAgICBtb2NrR2FsbGVyeVZpZXdTZXJ2aWNlID0geyBzdHJpbmdpZnlQYXRoRm9yU2VhcmNoOiAoKSA9PiAnc29tZS1wYXRoJyB9O1xuICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZSA9IHsgc3RhdGU6IHsgYXNzZXRWaWV3OiAnZ3JpZCcgfSB9O1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBTZWFyY2hTZXJ2aWNlKFxuICAgICAgICBtb2NrQXBpU2VydmljZS5pbmplY3RvcixcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSxcbiAgICAgICAgbW9ja0dhbGxlcnlWaWV3U2VydmljZSxcbiAgICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkUmVzdWx0cygpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2NhbGxzIHRoZSBhcGlTZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgaXQoJ2ZvciBhIGxvZ2dlZCBpbiB1c2VyIC0gd2l0aG91dCBhIHF1ZXJ5JywgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWRSZXN1bHRzKHsgaTogMSwgbjogMTAwIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnc2VhcmNoJyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHtcbiAgICAgICAgICAgIGk6ICcwJyxcbiAgICAgICAgICAgIG46ICcxMDAnLFxuICAgICAgICAgICAgcTogJ2l0ZW1UeXBlOmNsaXAnLFxuICAgICAgICAgICAgdmlld1R5cGU6ICdncmlkJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIGxvZ2dlZCBvdXQgdXNlciAtIHdpdGggYSBxdWVyeScsICgpID0+IHtcbiAgICAgICAgICBsb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZFJlc3VsdHMoeyBpOiAxLCBuOiAxMDAsIHE6ICdkb2cnIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnc2VhcmNoL2Fub255bW91cycpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7XG4gICAgICAgICAgICBpOiAnMCcsXG4gICAgICAgICAgICBuOiAnMTAwJyxcbiAgICAgICAgICAgIHE6ICdkb2cnLFxuICAgICAgICAgICAgdmlld1R5cGU6ICdncmlkJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIGxvZ2dlZCBpbiB1c2VyIC0gd2l0aCBhIGdhbGxlcnkgdmlldyBxdWVyeScsICgpID0+IHtcbiAgICAgICAgICBsb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkUmVzdWx0cyh7XG4gICAgICAgICAgICBpOiAxLFxuICAgICAgICAgICAgbjogMTAwLFxuICAgICAgICAgICAgZ3E6ICdbe1xcXCJpZHNcXFwiOlsxNSw3XSxcXFwibmFtZXNcXFwiOltcXFwidG91cm5hbWVudCB3ZWVrIGV2ZW50c1xcXCIsXFxcInByZXNzIGJ1aWxkaW5nIGltYWdlc1xcXCJdfV0nXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdzZWFyY2gnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoe1xuICAgICAgICAgICAgaTogJzAnLFxuICAgICAgICAgICAgbjogJzEwMCcsXG4gICAgICAgICAgICBncTogJ3NvbWUtcGF0aCcsXG4gICAgICAgICAgICBxOiAnaXRlbVR5cGU6Y2xpcCcsXG4gICAgICAgICAgICB2aWV3VHlwZTogJ2dyaWQnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnbm9ybWFsaXplKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdub3JtYWxpemVzIHRoZSByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgaXRlbXM6IFt7IHNvbWU6ICdpdGVtcycgfV0sXG4gICAgICAgICAgICB0b3RhbENvdW50OiAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IDIwLFxuICAgICAgICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxLFxuICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBsZXQgbm9ybWFsaXplZDogYW55O1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZFJlc3VsdHMoeyBpOiAxLCBuOiAxMDAgfSkuc3Vic2NyaWJlKHJlc3VsdHMgPT4gbm9ybWFsaXplZCA9IHJlc3VsdHMpO1xuICAgICAgICAgIGV4cGVjdChub3JtYWxpemVkKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGl0ZW1zOiBbeyBzb21lOiAnaXRlbXMnIH1dLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICB0b3RhbENvdW50OiAxLFxuICAgICAgICAgICAgICBwYWdlU2l6ZTogMjAsXG4gICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxLFxuICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
