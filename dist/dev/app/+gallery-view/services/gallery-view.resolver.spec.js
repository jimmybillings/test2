"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var gallery_view_resolver_1 = require("./gallery-view.resolver");
function main() {
    describe('Gallery View Resolver', function () {
        var resolverUnderTest;
        var mockService;
        var mockRoute;
        var mockEmptyRoute;
        beforeEach(function () {
            mockService = { load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({ some: 'object' })) };
            mockRoute = { params: { path: '[{"names":["Name 1"],"ids":[1]},{"names":["Name 2"],"ids":[2]}]' } };
            mockEmptyRoute = { params: {} };
            resolverUnderTest = new gallery_view_resolver_1.GalleryViewResolver(mockService);
        });
        describe('resolve()', function () {
            it('tells the service to load children for the appropriate path', function () {
                resolverUnderTest.resolve(mockRoute);
                expect(mockService.load).toHaveBeenCalledWith([{ ids: [1], names: ['Name 1'] }, { ids: [2], names: ['Name 2'] }]);
            });
            it('returns the service\'s returned observable', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(function (returnObject) { return expect(returnObject).toEqual({ some: 'object' }); });
            });
            it('tells the service to load an empty path if there are no route parameters', function () {
                resolverUnderTest.resolve(mockEmptyRoute);
                expect(mockService.load).toHaveBeenCalledWith([]);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L3NlcnZpY2VzL2dhbGxlcnktdmlldy5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLGlFQUE4RDtBQUU5RDtJQUNFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxJQUFJLGlCQUFzQyxDQUFDO1FBQzNDLElBQUksV0FBZ0IsQ0FBQztRQUNyQixJQUFJLFNBQWMsQ0FBQztRQUNuQixJQUFJLGNBQW1CLENBQUM7UUFFeEIsVUFBVSxDQUFDO1lBQ1QsV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUVBQWlFLEVBQUUsRUFBRSxDQUFDO1lBQ3BHLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUVoQyxpQkFBaUIsR0FBRyxJQUFJLDJDQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixFQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQ2hFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BILENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO2dCQUMvQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsWUFBWSxJQUFJLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7WUFDbkgsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMEVBQTBFLEVBQUU7Z0JBQzdFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakNELG9CQWlDQyIsImZpbGUiOiJhcHAvK2dhbGxlcnktdmlldy9zZXJ2aWNlcy9nYWxsZXJ5LXZpZXcucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBHYWxsZXJ5Vmlld1Jlc29sdmVyIH0gZnJvbSAnLi9nYWxsZXJ5LXZpZXcucmVzb2x2ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0dhbGxlcnkgVmlldyBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IEdhbGxlcnlWaWV3UmVzb2x2ZXI7XG4gICAgbGV0IG1vY2tTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tSb3V0ZTogYW55O1xuICAgIGxldCBtb2NrRW1wdHlSb3V0ZTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU2VydmljZSA9IHsgbG9hZDogamFzbWluZS5jcmVhdGVTcHkoJ2xvYWQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7IHNvbWU6ICdvYmplY3QnIH0pKSB9O1xuICAgICAgbW9ja1JvdXRlID0geyBwYXJhbXM6IHsgcGF0aDogJ1t7XCJuYW1lc1wiOltcIk5hbWUgMVwiXSxcImlkc1wiOlsxXX0se1wibmFtZXNcIjpbXCJOYW1lIDJcIl0sXCJpZHNcIjpbMl19XScgfSB9O1xuICAgICAgbW9ja0VtcHR5Um91dGUgPSB7IHBhcmFtczoge30gfTtcblxuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgR2FsbGVyeVZpZXdSZXNvbHZlcihtb2NrU2VydmljZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3RlbGxzIHRoZSBzZXJ2aWNlIHRvIGxvYWQgY2hpbGRyZW4gZm9yIHRoZSBhcHByb3ByaWF0ZSBwYXRoJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTZXJ2aWNlLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFt7IGlkczogWzFdLCBuYW1lczogWydOYW1lIDEnXSB9LCB7IGlkczogWzJdLCBuYW1lczogWydOYW1lIDInXSB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHNlcnZpY2VcXCdzIHJldHVybmVkIG9ic2VydmFibGUnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmV0dXJuT2JqZWN0ID0+IGV4cGVjdChyZXR1cm5PYmplY3QpLnRvRXF1YWwoeyBzb21lOiAnb2JqZWN0JyB9KSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RlbGxzIHRoZSBzZXJ2aWNlIHRvIGxvYWQgYW4gZW1wdHkgcGF0aCBpZiB0aGVyZSBhcmUgbm8gcm91dGUgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrRW1wdHlSb3V0ZSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTZXJ2aWNlLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFtdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
