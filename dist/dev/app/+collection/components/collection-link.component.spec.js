"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_link_component_1 = require("./collection-link.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Collection Link Component', function () {
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new collection_link_component_1.CollectionLinkComponent(mockStore);
        });
        describe('onCopyLegacyLinkButtonClick()', function () {
            it('displays a snackbar with the expected message', function () {
                var snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
                componentUnderTest.onCopyLegacyLinkButtonClick();
                expect(snackbarSpy).toHaveBeenCalledWith('COLLECTION.LINK_COPIED_TOAST');
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlFQUFzRTtBQUN0RSwwRUFBdUU7QUFFdkU7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBSSxrQkFBMkMsQ0FBQztRQUNoRCxJQUFJLFNBQXVCLENBQUM7UUFFNUIsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLGtCQUFrQixHQUFHLElBQUksbURBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsK0JBQStCLEVBQUU7WUFDeEMsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUUvRSxrQkFBa0IsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUVqRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsb0JBQW9CLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUMzRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcEJELG9CQW9CQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saW5rLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogVW5jb21tZW50IGFsbCBjb21tZW50ZWQgbGluZXMgYWZ0ZXIgZml4aW5nICdyZXF1aXJlJyBpc3N1ZS5cbmltcG9ydCB7IENvbGxlY3Rpb25MaW5rQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xsZWN0aW9uLWxpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29sbGVjdGlvbiBMaW5rIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBDb2xsZWN0aW9uTGlua0NvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uTGlua0NvbXBvbmVudChtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ29weUxlZ2FjeUxpbmtCdXR0b25DbGljaygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BsYXlzIGEgc25hY2tiYXIgd2l0aCB0aGUgZXhwZWN0ZWQgbWVzc2FnZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc25hY2tiYXJTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnc25hY2tiYXInLCAnZGlzcGxheScpO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNvcHlMZWdhY3lMaW5rQnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3Qoc25hY2tiYXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdDT0xMRUNUSU9OLkxJTktfQ09QSUVEX1RPQVNUJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19
