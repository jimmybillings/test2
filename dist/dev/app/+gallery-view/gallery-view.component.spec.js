"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var gallery_view_component_1 = require("./gallery-view.component");
function main() {
    describe('Gallery View Component', function () {
        var componentUnderTest;
        var mockData, mockUserPreference, mockService, mockRouter, mockSearch;
        beforeEach(function () {
            mockData = Observable_1.Observable.of({ some: 'data' });
            mockUserPreference = { state: { sortId: 1 } };
            mockService = {
                data: mockData,
                state: { path: [{ names: ['Name 1'], ids: [1] }, { names: ['Name 2'], ids: [2] }] },
                stringifyPathForSearch: jasmine.createSpy('stringifyPathForSearch').and.returnValue('3:"Name 3"')
            };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockSearch = { new: jasmine.createSpy('new') };
            componentUnderTest = new gallery_view_component_1.GalleryViewComponent(mockUserPreference, mockService, mockRouter, mockSearch);
        });
        describe('ngOnInit()', function () {
            it('connects the data Observable to that of the service', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.data.subscribe(function (data) { return expect(data).toEqual({ some: 'data' }); }));
            });
        });
        describe('onClickBreadcrumb()', function () {
            it('tells the router to navigate home with index 0', function () {
                componentUnderTest.onClickBreadcrumb(0);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
            });
            it('tells the router to navigate to the first path segment with index 1', function () {
                componentUnderTest.onClickBreadcrumb(1);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/gallery-view', { path: '[{"names":["Name 1"],"ids":[1]}]' }]);
            });
        });
        describe('onNavigate()', function () {
            it('tells the router to navigate to the full path with a new segment added', function () {
                componentUnderTest.onNavigate({ pathSegment: { names: ['Name 3'], ids: [3] }, method: 'nextLevel' });
                expect(mockRouter.navigate).toHaveBeenCalledWith([
                    '/gallery-view',
                    { path: '[{"names":["Name 1"],"ids":[1]},{"names":["Name 2"],"ids":[2]},{"names":["Name 3"],"ids":[3]}]' }
                ]);
            });
            it('should do a search if the method is search', function () {
                componentUnderTest.onNavigate({ pathSegment: { names: ['Name 3'], ids: [3] }, method: 'search' });
                expect(mockSearch.new).toHaveBeenCalledWith({
                    gq: '[{"names":["Name 1"],"ids":[1]},{"names":["Name 2"],"ids":[2]},{"names":["Name 3"],"ids":[3]}]',
                    n: 100,
                    i: 1,
                    sortId: 1
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L2dhbGxlcnktdmlldy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3QyxtRUFBZ0U7QUFHaEU7SUFDRSxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDakMsSUFBSSxrQkFBd0MsQ0FBQztRQUM3QyxJQUFJLFFBQWEsRUFBRSxrQkFBdUIsRUFBRSxXQUFnQixFQUFFLFVBQWUsRUFBRSxVQUFlLENBQUM7UUFFL0YsVUFBVSxDQUFDO1lBQ1QsUUFBUSxHQUFHLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDM0Msa0JBQWtCLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxXQUFXLEdBQUc7Z0JBQ1osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNuRixzQkFBc0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7YUFDbEcsQ0FBQztZQUNGLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDekQsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMvQyxrQkFBa0IsR0FBRyxJQUFJLDZDQUFvQixDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekcsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRTlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUMsQ0FBQztZQUM1RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtnQkFDbkQsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHFFQUFxRSxFQUFFO2dCQUN4RSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN2QixFQUFFLENBQUMsd0VBQXdFLEVBQUU7Z0JBQzNFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBRXJHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUM7b0JBQy9DLGVBQWU7b0JBQ2YsRUFBRSxJQUFJLEVBQUUsZ0dBQWdHLEVBQUU7aUJBQzNHLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO2dCQUMvQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUVsRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO29CQUMxQyxFQUFFLEVBQUUsZ0dBQWdHO29CQUNwRyxDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsQ0FBQztvQkFDSixNQUFNLEVBQUUsQ0FBQztpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0RELG9CQStEQyIsImZpbGUiOiJhcHAvK2dhbGxlcnktdmlldy9nYWxsZXJ5LXZpZXcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgR2FsbGVyeVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2dhbGxlcnktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeVBhdGhTZWdtZW50IH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMvZ2FsbGVyeS12aWV3LmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnR2FsbGVyeSBWaWV3IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBHYWxsZXJ5Vmlld0NvbXBvbmVudDtcbiAgICBsZXQgbW9ja0RhdGE6IGFueSwgbW9ja1VzZXJQcmVmZXJlbmNlOiBhbnksIG1vY2tTZXJ2aWNlOiBhbnksIG1vY2tSb3V0ZXI6IGFueSwgbW9ja1NlYXJjaDogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRGF0YSA9IE9ic2VydmFibGUub2YoeyBzb21lOiAnZGF0YScgfSk7XG4gICAgICBtb2NrVXNlclByZWZlcmVuY2UgPSB7IHN0YXRlOiB7IHNvcnRJZDogMSB9IH07XG4gICAgICBtb2NrU2VydmljZSA9IHtcbiAgICAgICAgZGF0YTogbW9ja0RhdGEsXG4gICAgICAgIHN0YXRlOiB7IHBhdGg6IFt7IG5hbWVzOiBbJ05hbWUgMSddLCBpZHM6IFsxXSB9LCB7IG5hbWVzOiBbJ05hbWUgMiddLCBpZHM6IFsyXSB9XSB9LFxuICAgICAgICBzdHJpbmdpZnlQYXRoRm9yU2VhcmNoOiBqYXNtaW5lLmNyZWF0ZVNweSgnc3RyaW5naWZ5UGF0aEZvclNlYXJjaCcpLmFuZC5yZXR1cm5WYWx1ZSgnMzpcIk5hbWUgM1wiJylcbiAgICAgIH07XG4gICAgICBtb2NrUm91dGVyID0geyBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykgfTtcbiAgICAgIG1vY2tTZWFyY2ggPSB7IG5ldzogamFzbWluZS5jcmVhdGVTcHkoJ25ldycpIH07XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgR2FsbGVyeVZpZXdDb21wb25lbnQobW9ja1VzZXJQcmVmZXJlbmNlLCBtb2NrU2VydmljZSwgbW9ja1JvdXRlciwgbW9ja1NlYXJjaCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjb25uZWN0cyB0aGUgZGF0YSBPYnNlcnZhYmxlIHRvIHRoYXQgb2YgdGhlIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiBleHBlY3QoZGF0YSkudG9FcXVhbCh7IHNvbWU6ICdkYXRhJyB9KSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0JyZWFkY3J1bWIoKScsICgpID0+IHtcbiAgICAgIGl0KCd0ZWxscyB0aGUgcm91dGVyIHRvIG5hdmlnYXRlIGhvbWUgd2l0aCBpbmRleCAwJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGlja0JyZWFkY3J1bWIoMCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnLyddKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGVsbHMgdGhlIHJvdXRlciB0byBuYXZpZ2F0ZSB0byB0aGUgZmlyc3QgcGF0aCBzZWdtZW50IHdpdGggaW5kZXggMScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2tCcmVhZGNydW1iKDEpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbJy9nYWxsZXJ5LXZpZXcnLCB7IHBhdGg6ICdbe1wibmFtZXNcIjpbXCJOYW1lIDFcIl0sXCJpZHNcIjpbMV19XScgfV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25OYXZpZ2F0ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3RlbGxzIHRoZSByb3V0ZXIgdG8gbmF2aWdhdGUgdG8gdGhlIGZ1bGwgcGF0aCB3aXRoIGEgbmV3IHNlZ21lbnQgYWRkZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5hdmlnYXRlKHsgcGF0aFNlZ21lbnQ6IHsgbmFtZXM6IFsnTmFtZSAzJ10sIGlkczogWzNdIH0sIG1ldGhvZDogJ25leHRMZXZlbCcgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFtcbiAgICAgICAgICAnL2dhbGxlcnktdmlldycsXG4gICAgICAgICAgeyBwYXRoOiAnW3tcIm5hbWVzXCI6W1wiTmFtZSAxXCJdLFwiaWRzXCI6WzFdfSx7XCJuYW1lc1wiOltcIk5hbWUgMlwiXSxcImlkc1wiOlsyXX0se1wibmFtZXNcIjpbXCJOYW1lIDNcIl0sXCJpZHNcIjpbM119XScgfVxuICAgICAgICBdKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGRvIGEgc2VhcmNoIGlmIHRoZSBtZXRob2QgaXMgc2VhcmNoJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25OYXZpZ2F0ZSh7IHBhdGhTZWdtZW50OiB7IG5hbWVzOiBbJ05hbWUgMyddLCBpZHM6IFszXSB9LCBtZXRob2Q6ICdzZWFyY2gnIH0pO1xuXG4gICAgICAgIGV4cGVjdChtb2NrU2VhcmNoLm5ldykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGdxOiAnW3tcIm5hbWVzXCI6W1wiTmFtZSAxXCJdLFwiaWRzXCI6WzFdfSx7XCJuYW1lc1wiOltcIk5hbWUgMlwiXSxcImlkc1wiOlsyXX0se1wibmFtZXNcIjpbXCJOYW1lIDNcIl0sXCJpZHNcIjpbM119XScsXG4gICAgICAgICAgbjogMTAwLFxuICAgICAgICAgIGk6IDEsXG4gICAgICAgICAgc29ydElkOiAxXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59XG4iXX0=
