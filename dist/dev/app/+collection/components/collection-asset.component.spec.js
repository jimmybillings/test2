"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_asset_component_1 = require("./collection-asset.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Collection Asset Component', function () {
        var componentUnderTest;
        var mockAppStore;
        beforeEach(function () {
            mockAppStore = new mock_app_store_1.MockAppStore();
            mockAppStore.createStateSection('uiConfig', {
                components: { collectionComment: { config: { form: { items: [{ some: 'field' }] } } } }
            });
            componentUnderTest = new collection_asset_component_1.CollectionAssetComponent(mockAppStore);
        });
        describe('ngOnInit()', function () {
            it('gets the right ui config', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'field' }]);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tYXNzZXQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyRUFBd0U7QUFDeEUsMEVBQXVFO0FBRXZFO0lBQ0UsUUFBUSxDQUFDLDRCQUE0QixFQUFFO1FBQ3JDLElBQUksa0JBQTRDLENBQUM7UUFDakQsSUFBSSxZQUEwQixDQUFDO1FBRS9CLFVBQVUsQ0FBQztZQUNULFlBQVksR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUVsQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO2dCQUMxQyxVQUFVLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7YUFDeEYsQ0FBQyxDQUFDO1lBRUgsa0JBQWtCLEdBQUcsSUFBSSxxREFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLDBCQUEwQixFQUFFO2dCQUM3QixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2QkQsb0JBdUJDIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tYXNzZXQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbGxlY3Rpb25Bc3NldENvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1hc3NldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb2xsZWN0aW9uIEFzc2V0IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBDb2xsZWN0aW9uQXNzZXRDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tBcHBTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG5cbiAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IGNvbGxlY3Rpb25Db21tZW50OiB7IGNvbmZpZzogeyBmb3JtOiB7IGl0ZW1zOiBbeyBzb21lOiAnZmllbGQnIH1dIH0gfSB9IH1cbiAgICAgIH0pO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQ29sbGVjdGlvbkFzc2V0Q29tcG9uZW50KG1vY2tBcHBTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdnZXRzIHRoZSByaWdodCB1aSBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudEZvcm1Db25maWcpLnRvRXF1YWwoW3sgc29tZTogJ2ZpZWxkJyB9XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
