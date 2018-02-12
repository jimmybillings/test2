"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_show_asset_component_1 = require("./quote-show-asset.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Show Asset Component', function () {
        var componentUnderTest;
        var mockAppStore;
        beforeEach(function () {
            mockAppStore = new mock_app_store_1.MockAppStore();
            mockAppStore.createStateSection('uiConfig', {
                components: { quoteComment: { config: { form: { items: [{ some: 'field' }] } } } }
            });
            componentUnderTest = new quote_show_asset_component_1.QuoteShowAssetComponent(mockAppStore);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtc2hvdy1hc3NldC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUF1RTtBQUN2RSw2RUFBMEU7QUFHMUU7SUFDRSxRQUFRLENBQUMsNEJBQTRCLEVBQUU7UUFDckMsSUFBSSxrQkFBMkMsQ0FBQztRQUNoRCxJQUFJLFlBQTBCLENBQUM7UUFFL0IsVUFBVSxDQUFDO1lBQ1QsWUFBWSxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7YUFDbkYsQ0FBQyxDQUFDO1lBQ0gsa0JBQWtCLEdBQUcsSUFBSSxvREFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLDBCQUEwQixFQUFFO2dCQUM3QixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQkQsb0JBcUJDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtc2hvdy1hc3NldC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1b3RlU2hvd0Fzc2V0Q29tcG9uZW50IH0gZnJvbSAnLi9xdW90ZS1zaG93LWFzc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgU2hvdyBBc3NldCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogUXVvdGVTaG93QXNzZXRDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tBcHBTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrQXBwU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHtcbiAgICAgICAgY29tcG9uZW50czogeyBxdW90ZUNvbW1lbnQ6IHsgY29uZmlnOiB7IGZvcm06IHsgaXRlbXM6IFt7IHNvbWU6ICdmaWVsZCcgfV0gfSB9IH0gfVxuICAgICAgfSk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUXVvdGVTaG93QXNzZXRDb21wb25lbnQobW9ja0FwcFN0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2dldHMgdGhlIHJpZ2h0IHVpIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50Rm9ybUNvbmZpZykudG9FcXVhbChbeyBzb21lOiAnZmllbGQnIH1dKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
