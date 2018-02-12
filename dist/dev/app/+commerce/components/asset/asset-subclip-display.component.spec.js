"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_subclip_display_component_1 = require("./asset-subclip-display.component");
var EnhancedMock = require("../../../shared/interfaces/enhanced-asset");
var mock_asset_1 = require("../../../shared/mocks/mock-asset");
function main() {
    describe('Asset Subclip Display Component', function () {
        var componentUnderTest;
        var mockEnhancedAsset;
        beforeEach(function () {
            mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAsset, null);
            componentUnderTest = new asset_subclip_display_component_1.AssetSubclipDisplayComponent();
            componentUnderTest.asset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAsset, null);
        });
        describe('isSubclipped getter', function () {
            it('returns true if the asset is subclipped', function () {
                expect(componentUnderTest.isSubclipped).toBe(mockEnhancedAsset.isSubclipped);
            });
        });
        describe('subclipSegmentStyles getter', function () {
            it('returns styles based on the asset', function () {
                expect(componentUnderTest.subclipSegmentStyles).toEqual({
                    'margin-left.%': mockEnhancedAsset.inMarkerPercentage,
                    'width.%': mockEnhancedAsset.subclipDurationPercentage,
                    'min-width.px': 2
                });
            });
        });
        describe('inMarkerFrame getter', function () {
            it('returns the in marker frame from the asset', function () {
                expect(componentUnderTest.inMarkerFrame).toEqual(mockEnhancedAsset.inMarkerFrame);
            });
        });
        describe('outMarkerFrame getter', function () {
            it('returns the out marker frame from the asset', function () {
                expect(componentUnderTest.outMarkerFrame).toEqual(mockEnhancedAsset.outMarkerFrame);
            });
        });
        describe('subclipDurationFrame getter', function () {
            it('returns the subclip duration frame from the asset', function () {
                expect(componentUnderTest.subclipDurationFrame).toEqual(mockEnhancedAsset.subclipDurationFrame);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1zdWJjbGlwLWRpc3BsYXkuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRkFBaUY7QUFDakYsd0VBQTBFO0FBQzFFLCtEQUFxRTtBQUVyRTtJQUNFLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTtRQUMxQyxJQUFJLGtCQUFnRCxDQUFDO1FBQ3JELElBQUksaUJBQTZDLENBQUM7UUFFbEQsVUFBVSxDQUFDO1lBQ1QsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyw4QkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RSxrQkFBa0IsR0FBRyxJQUFJLDhEQUE0QixFQUFFLENBQUM7WUFDeEQsa0JBQWtCLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsOEJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO2dCQUM1QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNkJBQTZCLEVBQUU7WUFDdEMsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO2dCQUN0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ3RELGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxrQkFBa0I7b0JBQ3JELFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyx5QkFBeUI7b0JBQ3RELGNBQWMsRUFBRSxDQUFDO2lCQUNsQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtnQkFDL0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtnQkFDdEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEcsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdDRCxvQkE2Q0MiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2Fzc2V0L2Fzc2V0LXN1YmNsaXAtZGlzcGxheS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0U3ViY2xpcERpc3BsYXlDb21wb25lbnQgfSBmcm9tICcuL2Fzc2V0LXN1YmNsaXAtZGlzcGxheS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgRW5oYW5jZWRNb2NrIGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IG1vY2tDb21tZXJjZUFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vY2tzL21vY2stYXNzZXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0Fzc2V0IFN1YmNsaXAgRGlzcGxheSBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogQXNzZXRTdWJjbGlwRGlzcGxheUNvbXBvbmVudDtcbiAgICBsZXQgbW9ja0VuaGFuY2VkQXNzZXQ6IEVuaGFuY2VkTW9jay5FbmhhbmNlZEFzc2V0O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRW5oYW5jZWRBc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0NvbW1lcmNlQXNzZXQsIG51bGwpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEFzc2V0U3ViY2xpcERpc3BsYXlDb21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0NvbW1lcmNlQXNzZXQsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU3ViY2xpcHBlZCBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldCBpcyBzdWJjbGlwcGVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmlzU3ViY2xpcHBlZCkudG9CZShtb2NrRW5oYW5jZWRBc3NldC5pc1N1YmNsaXBwZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3ViY2xpcFNlZ21lbnRTdHlsZXMgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgc3R5bGVzIGJhc2VkIG9uIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zdWJjbGlwU2VnbWVudFN0eWxlcykudG9FcXVhbCh7XG4gICAgICAgICAgJ21hcmdpbi1sZWZ0LiUnOiBtb2NrRW5oYW5jZWRBc3NldC5pbk1hcmtlclBlcmNlbnRhZ2UsXG4gICAgICAgICAgJ3dpZHRoLiUnOiBtb2NrRW5oYW5jZWRBc3NldC5zdWJjbGlwRHVyYXRpb25QZXJjZW50YWdlLFxuICAgICAgICAgICdtaW4td2lkdGgucHgnOiAyXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5NYXJrZXJGcmFtZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgaW4gbWFya2VyIGZyYW1lIGZyb20gdGhlIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmluTWFya2VyRnJhbWUpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQuaW5NYXJrZXJGcmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvdXRNYXJrZXJGcmFtZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgb3V0IG1hcmtlciBmcmFtZSBmcm9tIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vdXRNYXJrZXJGcmFtZSkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldC5vdXRNYXJrZXJGcmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJjbGlwRHVyYXRpb25GcmFtZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgc3ViY2xpcCBkdXJhdGlvbiBmcmFtZSBmcm9tIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zdWJjbGlwRHVyYXRpb25GcmFtZSkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldC5zdWJjbGlwRHVyYXRpb25GcmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
