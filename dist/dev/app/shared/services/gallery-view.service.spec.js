"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var gallery_view_service_1 = require("./gallery-view.service");
var mock_api_service_1 = require("../mocks/mock-api.service");
var api_interface_1 = require("../interfaces/api.interface");
function main() {
    describe('Gallery View Service', function () {
        var serviceUnderTest;
        var mockStore;
        var mockApi;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockStore = { data: Observable_1.Observable.of('some data'), state: 'some state', replaceWith: jasmine.createSpy('replaceWith') };
            mockApi = new mock_api_service_1.MockApiService();
            mockApi.getResponse = { list: { some: 'response' } };
            serviceUnderTest = new gallery_view_service_1.GalleryViewService(mockStore, mockApi.injector);
        });
        describe('data getter', function () {
            it('returns the store\'s data', function () {
                serviceUnderTest.data.subscribe(function (returnedData) { return expect(returnedData).toEqual('some data'); });
            });
        });
        describe('state getter', function () {
            it('returns the store\'s state', function () {
                expect(serviceUnderTest.state).toEqual('some state');
            });
        });
        describe('load()', function () {
            it('calls the apiService as expected', function () {
                serviceUnderTest.load([{ ids: [1, 2], names: ['Name 1', 'Name 2'] }, { ids: [3], names: ['Name 3'] }]);
                expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApi.get).toHaveBeenCalledWithEndpoint('galleryResult');
                expect(mockApi.get).toHaveBeenCalledWithParameters({ query: '1:"Name 1",2:"Name 2",3:"Name 3"' });
            });
            it('calls the apiService with a null query when the path is null', function () {
                serviceUnderTest.load(null);
                expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
            });
            it('calls the apiService with a null query when the path is undefined', function () {
                serviceUnderTest.load(undefined);
                expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
            });
            it('calls the apiService with a null query when the path is empty', function () {
                serviceUnderTest.load([]);
                expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
            });
            it('returns the API service\'s Observable', function () {
                var path = [{ ids: [1], names: ['Name 1'] }];
                serviceUnderTest.load(path).subscribe(function (response) {
                    expect(response).toEqual({ list: { some: 'response' } });
                });
            });
            it('updates the store with the server\'s response', function () {
                var path = [{ ids: [1], names: ['Name 1'] }];
                serviceUnderTest.load(path).subscribe(function (response) {
                    expect(mockStore.replaceWith).toHaveBeenCalledWith({ some: 'response' }, path);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvZ2FsbGVyeS12aWV3LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3QywrREFBNEQ7QUFDNUQsOERBQTRFO0FBQzVFLDZEQUFrRDtBQUVsRDtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGdCQUFvQyxDQUFDO1FBQ3pDLElBQUksU0FBYyxDQUFDO1FBQ25CLElBQUksT0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUVyQyxTQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3JILE9BQU8sR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFFckQsZ0JBQWdCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixFQUFFLENBQUMsMkJBQTJCLEVBQUU7Z0JBQzlCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDdkIs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RSxJQUFJLENBQUMsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeEVELG9CQXdFQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2dhbGxlcnktdmlldy5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgR2FsbGVyeVZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9nYWxsZXJ5LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vbW9ja3MvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0dhbGxlcnkgVmlldyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBHYWxsZXJ5Vmlld1NlcnZpY2U7XG4gICAgbGV0IG1vY2tTdG9yZTogYW55O1xuICAgIGxldCBtb2NrQXBpOiBNb2NrQXBpU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuXG4gICAgICBtb2NrU3RvcmUgPSB7IGRhdGE6IE9ic2VydmFibGUub2YoJ3NvbWUgZGF0YScpLCBzdGF0ZTogJ3NvbWUgc3RhdGUnLCByZXBsYWNlV2l0aDogamFzbWluZS5jcmVhdGVTcHkoJ3JlcGxhY2VXaXRoJykgfTtcbiAgICAgIG1vY2tBcGkgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIG1vY2tBcGkuZ2V0UmVzcG9uc2UgPSB7IGxpc3Q6IHsgc29tZTogJ3Jlc3BvbnNlJyB9IH07XG5cbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgR2FsbGVyeVZpZXdTZXJ2aWNlKG1vY2tTdG9yZSwgbW9ja0FwaS5pbmplY3Rvcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGF0YSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgc3RvcmVcXCdzIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUocmV0dXJuZWREYXRhID0+IGV4cGVjdChyZXR1cm5lZERhdGEpLnRvRXF1YWwoJ3NvbWUgZGF0YScpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0YXRlIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBzdG9yZVxcJ3Mgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKCdzb21lIHN0YXRlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaVNlcnZpY2UgYXMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZChbeyBpZHM6IFsxLCAyXSwgbmFtZXM6IFsnTmFtZSAxJywgJ05hbWUgMiddIH0sIHsgaWRzOiBbM10sIG5hbWVzOiBbJ05hbWUgMyddIH1dKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2dhbGxlcnlSZXN1bHQnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyBxdWVyeTogJzE6XCJOYW1lIDFcIiwyOlwiTmFtZSAyXCIsMzpcIk5hbWUgM1wiJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaVNlcnZpY2Ugd2l0aCBhIG51bGwgcXVlcnkgd2hlbiB0aGUgcGF0aCBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQobnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyBxdWVyeTogbnVsbCB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaVNlcnZpY2Ugd2l0aCBhIG51bGwgcXVlcnkgd2hlbiB0aGUgcGF0aCBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCh1bmRlZmluZWQpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgcXVlcnk6IG51bGwgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHRoZSBhcGlTZXJ2aWNlIHdpdGggYSBudWxsIHF1ZXJ5IHdoZW4gdGhlIHBhdGggaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZChbXSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyBxdWVyeTogbnVsbCB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgQVBJIHNlcnZpY2VcXCdzIE9ic2VydmFibGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBbeyBpZHM6IFsxXSwgbmFtZXM6IFsnTmFtZSAxJ10gfV07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKHBhdGgpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHsgbGlzdDogeyBzb21lOiAncmVzcG9uc2UnIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBzdG9yZSB3aXRoIHRoZSBzZXJ2ZXJcXCdzIHJlc3BvbnNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gW3sgaWRzOiBbMV0sIG5hbWVzOiBbJ05hbWUgMSddIH1dO1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZChwYXRoKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrU3RvcmUucmVwbGFjZVdpdGgpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ3Jlc3BvbnNlJyB9LCBwYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
