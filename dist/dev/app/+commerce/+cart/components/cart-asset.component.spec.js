"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_asset_component_1 = require("./cart-asset.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Cart Asset Component', function () {
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', {
                components: { cartComment: { config: { form: { items: [{ some: 'field' }] } } } }
            });
            componentUnderTest = new cart_asset_component_1.CartAssetComponent(mockStore);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy9jYXJ0LWFzc2V0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsK0RBQTREO0FBQzVELDZFQUEwRTtBQUUxRTtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGtCQUFzQyxDQUFDO1FBQzNDLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFDdkMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTthQUNsRixDQUFDLENBQUM7WUFDSCxrQkFBa0IsR0FBRyxJQUFJLHlDQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixFQUFFLENBQUMsMEJBQTBCLEVBQUU7Z0JBQzdCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUU5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXJCRCxvQkFxQkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jb21wb25lbnRzL2NhcnQtYXNzZXQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQ2FydEFzc2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LWFzc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NhcnQgQXNzZXQgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENhcnRBc3NldENvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IGNhcnRDb21tZW50OiB7IGNvbmZpZzogeyBmb3JtOiB7IGl0ZW1zOiBbeyBzb21lOiAnZmllbGQnIH1dIH0gfSB9IH1cbiAgICAgIH0pO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRBc3NldENvbXBvbmVudChtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25nT25Jbml0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnZ2V0cyB0aGUgcmlnaHQgdWkgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRGb3JtQ29uZmlnKS50b0VxdWFsKFt7IHNvbWU6ICdmaWVsZCcgfV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
