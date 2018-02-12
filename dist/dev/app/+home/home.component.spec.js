"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var home_component_1 = require("./home.component");
var mock_app_store_1 = require("../store/spec-helpers/mock-app.store");
function main() {
    describe('Home Component', function () {
        var componentUnderTest;
        var loggedIn;
        var mockCurrentUser;
        var mockSearchContext;
        var mockUserPreference;
        var mockGalleryView;
        var mockHomeVideo;
        var mockRouter;
        var mockFilter;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', {
                components: {
                    home: {
                        config: {
                            pageSize: { value: '100' },
                            notifications: { items: [{ trString: 'NOTIFICATION.NEW_USER' }] },
                            heroContentType: { value: 'image' }
                        }
                    }
                }
            });
            mockGalleryView = {
                get: jasmine.createSpy('data').and.returnValue(Observable_1.Observable.of({
                    'results': [{ 'id': 10, 'name': 'Tee offs', 'resultCount': 6, 'thumbnailUrl': '', 'hasMore': false }]
                }))
            };
            mockHomeVideo = {
                get: jasmine.createSpy('data').and.returnValue(Observable_1.Observable.of({
                    'results': [{ 'feedid': 'qKeeO3ld', 'kind': 'manual', 'playlist': [], 'title': 'commerce-hero' }]
                }))
            };
            mockCurrentUser = { loggedIn: function () { return loggedIn; } };
            mockSearchContext = { new: jasmine.createSpy('new') };
            mockUserPreference = { state: { sortId: 0 } };
            mockFilter = { set: jasmine.createSpy('set'), clear: jasmine.createSpy('clear') };
            componentUnderTest = new home_component_1.HomeComponent(mockCurrentUser, mockSearchContext, mockUserPreference, mockGalleryView, mockHomeVideo, null, mockFilter, mockStore);
        });
        describe('ngOnInit()', function () {
            it('get the correct config from the app store', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({
                    'pageSize': { 'value': '100' },
                    'notifications': { 'items': [{ 'trString': 'NOTIFICATION.NEW_USER' }] },
                    'heroContentType': { 'value': 'image' }
                });
            });
        });
        describe('buildSearchContext()', function () {
            it('Should create a new search context - anon user', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.newSearchContext('cat');
                expect(mockSearchContext.new).toHaveBeenCalledWith({ q: 'cat', i: 1, n: '100', sortId: 0 });
                expect(mockFilter.clear).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9ob21lLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQTZDO0FBQzdDLG1EQUFpRDtBQUNqRCx1RUFBb0U7QUFFcEU7SUFDRSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDekIsSUFBSSxrQkFBaUMsQ0FBQztRQUN0QyxJQUFJLFFBQWlCLENBQUM7UUFDdEIsSUFBSSxlQUFvQixDQUFDO1FBQ3pCLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxrQkFBdUIsQ0FBQztRQUM1QixJQUFJLGVBQW9CLENBQUM7UUFDekIsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFDdkMsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs0QkFDMUIsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxFQUFFOzRCQUNqRSxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO3lCQUNwQztxQkFDRjtpQkFDRjthQUNGLENBQUMsQ0FBQztZQUVILGVBQWUsR0FBRztnQkFDaEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDM0QsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDdEcsQ0FBQyxDQUFDO2FBQ0osQ0FBQztZQUVGLGFBQWEsR0FBRztnQkFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDO29CQUMzRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztpQkFDbEcsQ0FBQyxDQUFDO2FBQ0osQ0FBQztZQUVGLGVBQWUsR0FBRyxFQUFFLFFBQVEsRUFBRSxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsRUFBRSxDQUFDO1lBRS9DLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUV0RCxrQkFBa0IsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBRTlDLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFFbEYsa0JBQWtCLEdBQUcsSUFBSSw4QkFBYSxDQUNwQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FDcEgsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixFQUFFLENBQUMsMkNBQTJDLEVBQUU7Z0JBQzlDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUN2QztvQkFDRSxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO29CQUM5QixlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLEVBQUU7b0JBQ3ZFLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtpQkFDeEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixFQUFFLENBQUMsZ0RBQWdELEVBQUU7Z0JBQ25ELGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVGLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekVELG9CQXlFQyIsImZpbGUiOiJhcHAvK2hvbWUvaG9tZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0hvbWUgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEhvbWVDb21wb25lbnQ7XG4gICAgbGV0IGxvZ2dlZEluOiBib29sZWFuO1xuICAgIGxldCBtb2NrQ3VycmVudFVzZXI6IGFueTtcbiAgICBsZXQgbW9ja1NlYXJjaENvbnRleHQ6IGFueTtcbiAgICBsZXQgbW9ja1VzZXJQcmVmZXJlbmNlOiBhbnk7XG4gICAgbGV0IG1vY2tHYWxsZXJ5VmlldzogYW55O1xuICAgIGxldCBtb2NrSG9tZVZpZGVvOiBhbnk7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja0ZpbHRlcjogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICBob21lOiB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgcGFnZVNpemU6IHsgdmFsdWU6ICcxMDAnIH0sXG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHsgaXRlbXM6IFt7IHRyU3RyaW5nOiAnTk9USUZJQ0FUSU9OLk5FV19VU0VSJyB9XSB9LFxuICAgICAgICAgICAgICBoZXJvQ29udGVudFR5cGU6IHsgdmFsdWU6ICdpbWFnZScgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1vY2tHYWxsZXJ5VmlldyA9IHtcbiAgICAgICAgZ2V0OiBqYXNtaW5lLmNyZWF0ZVNweSgnZGF0YScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHtcbiAgICAgICAgICAncmVzdWx0cyc6IFt7ICdpZCc6IDEwLCAnbmFtZSc6ICdUZWUgb2ZmcycsICdyZXN1bHRDb3VudCc6IDYsICd0aHVtYm5haWxVcmwnOiAnJywgJ2hhc01vcmUnOiBmYWxzZSB9XVxuICAgICAgICB9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tIb21lVmlkZW8gPSB7XG4gICAgICAgIGdldDogamFzbWluZS5jcmVhdGVTcHkoJ2RhdGEnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7XG4gICAgICAgICAgJ3Jlc3VsdHMnOiBbeyAnZmVlZGlkJzogJ3FLZWVPM2xkJywgJ2tpbmQnOiAnbWFudWFsJywgJ3BsYXlsaXN0JzogW10sICd0aXRsZSc6ICdjb21tZXJjZS1oZXJvJyB9XVxuICAgICAgICB9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tDdXJyZW50VXNlciA9IHsgbG9nZ2VkSW46ICgpID0+IGxvZ2dlZEluIH07XG5cbiAgICAgIG1vY2tTZWFyY2hDb250ZXh0ID0geyBuZXc6IGphc21pbmUuY3JlYXRlU3B5KCduZXcnKSB9O1xuXG4gICAgICBtb2NrVXNlclByZWZlcmVuY2UgPSB7IHN0YXRlOiB7IHNvcnRJZDogMCB9IH07XG5cbiAgICAgIG1vY2tGaWx0ZXIgPSB7IHNldDogamFzbWluZS5jcmVhdGVTcHkoJ3NldCcpLCBjbGVhcjogamFzbWluZS5jcmVhdGVTcHkoJ2NsZWFyJykgfTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEhvbWVDb21wb25lbnQoXG4gICAgICAgIG1vY2tDdXJyZW50VXNlciwgbW9ja1NlYXJjaENvbnRleHQsIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0dhbGxlcnlWaWV3LCBtb2NrSG9tZVZpZGVvLCBudWxsLCBtb2NrRmlsdGVyLCBtb2NrU3RvcmVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdnZXQgdGhlIGNvcnJlY3QgY29uZmlnIGZyb20gdGhlIGFwcCBzdG9yZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnKS50b0VxdWFsKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICdwYWdlU2l6ZSc6IHsgJ3ZhbHVlJzogJzEwMCcgfSxcbiAgICAgICAgICAgICdub3RpZmljYXRpb25zJzogeyAnaXRlbXMnOiBbeyAndHJTdHJpbmcnOiAnTk9USUZJQ0FUSU9OLk5FV19VU0VSJyB9XSB9LFxuICAgICAgICAgICAgJ2hlcm9Db250ZW50VHlwZSc6IHsgJ3ZhbHVlJzogJ2ltYWdlJyB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdidWlsZFNlYXJjaENvbnRleHQoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY3JlYXRlIGEgbmV3IHNlYXJjaCBjb250ZXh0IC0gYW5vbiB1c2VyJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5ld1NlYXJjaENvbnRleHQoJ2NhdCcpO1xuICAgICAgICBleHBlY3QobW9ja1NlYXJjaENvbnRleHQubmV3KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHE6ICdjYXQnLCBpOiAxLCBuOiAnMTAwJywgc29ydElkOiAwIH0pO1xuICAgICAgICBleHBlY3QobW9ja0ZpbHRlci5jbGVhcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
