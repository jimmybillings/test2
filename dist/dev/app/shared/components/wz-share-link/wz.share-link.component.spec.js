"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_share_link_component_1 = require("./wz.share-link.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Wz Share Link Component', function () {
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new wz_share_link_component_1.WzShareLinkComponent(mockStore);
        });
        describe('onCopyShareLinkButtonClick()', function () {
            it('displays a snackbar with the expected message', function () {
                var snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
                componentUnderTest.onCopyShareLinkButtonClick();
                expect(snackbarSpy).toHaveBeenCalledWith('SHARING.SHARE_LINK.COPIED_CONFIRMED_MESSAGE');
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS1saW5rL3d6LnNoYXJlLWxpbmsuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBaUU7QUFDakUsNkVBQTBFO0FBRTFFO0lBQ0UsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2xDLElBQUksa0JBQXdDLENBQUM7UUFDN0MsSUFBSSxTQUF1QixDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixrQkFBa0IsR0FBRyxJQUFJLDhDQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLDhCQUE4QixFQUFFO1lBQ3ZDLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtnQkFDbEQsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFFL0Usa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFFaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDMUYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXJCRCxvQkFxQkM7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS1saW5rL3d6LnNoYXJlLWxpbmsuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXelNoYXJlTGlua0NvbXBvbmVudCB9IGZyb20gJy4vd3ouc2hhcmUtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBTaGFyZSBMaW5rIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBXelNoYXJlTGlua0NvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXelNoYXJlTGlua0NvbXBvbmVudChtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ29weVNoYXJlTGlua0J1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGxheXMgYSBzbmFja2JhciB3aXRoIHRoZSBleHBlY3RlZCBtZXNzYWdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzbmFja2JhclNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdzbmFja2JhcicsICdkaXNwbGF5Jyk7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ29weVNoYXJlTGlua0J1dHRvbkNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KHNuYWNrYmFyU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnU0hBUklORy5TSEFSRV9MSU5LLkNPUElFRF9DT05GSVJNRURfTUVTU0FHRScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59O1xuXG4iXX0=
