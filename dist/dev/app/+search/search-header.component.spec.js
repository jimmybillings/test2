"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_header_component_1 = require("./search-header.component");
function main() {
    describe('Search Header Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new search_header_component_1.SearchHeaderComponent();
        });
        describe('get titleForAssetViewBtn()', function () {
            it('returns \'SEARCH.ASSET_VIEW_LIST_BTN_TITLE\' when assetView is \'grid\'', function () {
                componentUnderTest.assetView = 'grid';
                expect(componentUnderTest.titleForAssetViewBtn).toBe('SEARCH.ASSET_VIEW_LIST_BTN_TITLE');
            });
            it('returns \'SEARCH.ASSET_VIEW_GRID_BTN_TITLE\' when assetView is not \'grid\'', function () {
                componentUnderTest.assetView = 'list';
                expect(componentUnderTest.titleForAssetViewBtn).toBe('SEARCH.ASSET_VIEW_GRID_BTN_TITLE');
            });
        });
        describe('get iconForAssetViewBtn()', function () {
            it('returns \'view_list\' when assetView is \'grid\'', function () {
                componentUnderTest.assetView = 'grid';
                expect(componentUnderTest.iconForAssetViewBtn).toBe('view_list');
            });
            it('returns \'view_comfy\' when assetView is not \'grid\'', function () {
                componentUnderTest.assetView = 'list';
                expect(componentUnderTest.iconForAssetViewBtn).toBe('view_comfy');
            });
        });
        describe('onClickAssetViewBtn()', function () {
            beforeEach(function () {
                spyOn(componentUnderTest.onChangeAssetView, 'emit');
            });
            it('emits the event with \'list\' when the current assetView is \'grid\'', function () {
                componentUnderTest.assetView = 'grid';
                componentUnderTest.onClickAssetViewBtn();
                expect(componentUnderTest.onChangeAssetView.emit).toHaveBeenCalledWith('list');
            });
            it('emits the event with \'grid\' when the current assetView is \'list\'', function () {
                componentUnderTest.assetView = 'list';
                componentUnderTest.onClickAssetViewBtn();
                expect(componentUnderTest.onChangeAssetView.emit).toHaveBeenCalledWith('grid');
            });
        });
        describe('onClickAddAllBtn()', function () {
            it('emits the \'clickAddAllButton\' event', function () {
                spyOn(componentUnderTest.clickAddAllBtn, 'emit');
                componentUnderTest.onClickAddAllBtn();
                expect(componentUnderTest.clickAddAllBtn.emit).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlYXJjaC1oZWFkZXIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBa0U7QUFFbEU7SUFDRSxRQUFRLENBQUMseUJBQXlCLEVBQUU7UUFDbEMsSUFBSSxrQkFBeUMsQ0FBQztRQUU5QyxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLCtDQUFxQixFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7WUFDckMsRUFBRSxDQUFDLHlFQUF5RSxFQUFFO2dCQUM1RSxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUMzRixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRTtnQkFDaEYsa0JBQWtCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDdEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtZQUNwQyxFQUFFLENBQUMsa0RBQWtELEVBQUU7Z0JBQ3JELGtCQUFrQixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtnQkFDMUQsa0JBQWtCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDdEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsVUFBVSxDQUFDO2dCQUNULEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtnQkFDekUsa0JBQWtCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDdEMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHNFQUFzRSxFQUFFO2dCQUN6RSxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN0QyxrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixFQUFFLENBQUMsdUNBQXVDLEVBQUU7Z0JBQzFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMURELG9CQTBEQyIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZWFyY2gtaGVhZGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtaGVhZGVyLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU2VhcmNoIEhlYWRlciBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogU2VhcmNoSGVhZGVyQ29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgU2VhcmNoSGVhZGVyQ29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRpdGxlRm9yQXNzZXRWaWV3QnRuKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBcXCdTRUFSQ0guQVNTRVRfVklFV19MSVNUX0JUTl9USVRMRVxcJyB3aGVuIGFzc2V0VmlldyBpcyBcXCdncmlkXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRWaWV3ID0gJ2dyaWQnO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpdGxlRm9yQXNzZXRWaWV3QnRuKS50b0JlKCdTRUFSQ0guQVNTRVRfVklFV19MSVNUX0JUTl9USVRMRScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFxcJ1NFQVJDSC5BU1NFVF9WSUVXX0dSSURfQlROX1RJVExFXFwnIHdoZW4gYXNzZXRWaWV3IGlzIG5vdCBcXCdncmlkXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRWaWV3ID0gJ2xpc3QnO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpdGxlRm9yQXNzZXRWaWV3QnRuKS50b0JlKCdTRUFSQ0guQVNTRVRfVklFV19HUklEX0JUTl9USVRMRScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGljb25Gb3JBc3NldFZpZXdCdG4oKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIFxcJ3ZpZXdfbGlzdFxcJyB3aGVuIGFzc2V0VmlldyBpcyBcXCdncmlkXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRWaWV3ID0gJ2dyaWQnO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmljb25Gb3JBc3NldFZpZXdCdG4pLnRvQmUoJ3ZpZXdfbGlzdCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFxcJ3ZpZXdfY29tZnlcXCcgd2hlbiBhc3NldFZpZXcgaXMgbm90IFxcJ2dyaWRcXCcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFZpZXcgPSAnbGlzdCc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaWNvbkZvckFzc2V0Vmlld0J0bikudG9CZSgndmlld19jb21meScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0Fzc2V0Vmlld0J0bigpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5vbkNoYW5nZUFzc2V0VmlldywgJ2VtaXQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZW1pdHMgdGhlIGV2ZW50IHdpdGggXFwnbGlzdFxcJyB3aGVuIHRoZSBjdXJyZW50IGFzc2V0VmlldyBpcyBcXCdncmlkXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRWaWV3ID0gJ2dyaWQnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGlja0Fzc2V0Vmlld0J0bigpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2hhbmdlQXNzZXRWaWV3LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdsaXN0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2VtaXRzIHRoZSBldmVudCB3aXRoIFxcJ2dyaWRcXCcgd2hlbiB0aGUgY3VycmVudCBhc3NldFZpZXcgaXMgXFwnbGlzdFxcJycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0VmlldyA9ICdsaXN0JztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2tBc3NldFZpZXdCdG4oKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vbkNoYW5nZUFzc2V0Vmlldy5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnZ3JpZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0FkZEFsbEJ0bigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBcXCdjbGlja0FkZEFsbEJ1dHRvblxcJyBldmVudCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmNsaWNrQWRkQWxsQnRuLCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGlja0FkZEFsbEJ0bigpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNsaWNrQWRkQWxsQnRuLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
