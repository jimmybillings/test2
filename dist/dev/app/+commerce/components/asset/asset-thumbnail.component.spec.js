"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_thumbnail_component_1 = require("./asset-thumbnail.component");
var EnhancedMock = require("../../../shared/interfaces/enhanced-asset");
var mock_asset_1 = require("../../../shared/mocks/mock-asset");
function main() {
    describe('Asset Thumbnail Component', function () {
        var componentUnderTest;
        var mockEnhancedAsset;
        beforeEach(function () {
            mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAsset, 'cart');
            componentUnderTest = new asset_thumbnail_component_1.AssetThumbnailComponent();
            componentUnderTest.asset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAsset, 'cart');
        });
        describe('routerLink()', function () {
            it('returns the enhanced asset\'s router link array', function () {
                expect(componentUnderTest.routerLink).toEqual(mockEnhancedAsset.routerLink);
            });
        });
        describe('durationFrame()', function () {
            it('returns the enhanced asset\'s subclip duration frame', function () {
                expect(componentUnderTest.durationFrame).toEqual(mockEnhancedAsset.durationFrame);
            });
        });
        describe('isImage()', function () {
            it('returns true for an image', function () {
                expect(componentUnderTest.isImage).toBe(mockEnhancedAsset.isImage);
            });
        });
        describe('thumbnailUrl()', function () {
            it('returns the enhanced asset\'s thumbnail URL', function () {
                expect(componentUnderTest.thumbnailUrl).toEqual(mockEnhancedAsset.thumbnailUrl);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC10aHVtYm5haWwuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5RUFBc0U7QUFDdEUsd0VBQTBFO0FBQzFFLCtEQUFxRTtBQUVyRTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLGtCQUEyQyxDQUFDO1FBQ2hELElBQUksaUJBQTZDLENBQUM7UUFFbEQsVUFBVSxDQUFDO1lBQ1QsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyw4QkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RSxrQkFBa0IsR0FBRyxJQUFJLG1EQUF1QixFQUFFLENBQUM7WUFDbkQsa0JBQWtCLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsOEJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtnQkFDcEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLEVBQUUsQ0FBQyxzREFBc0QsRUFBRTtnQkFDekQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixFQUFFLENBQUMsMkJBQTJCLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsNkNBQTZDLEVBQUU7Z0JBQ2hELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5DRCxvQkFtQ0MiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2Fzc2V0L2Fzc2V0LXRodW1ibmFpbC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0VGh1bWJuYWlsQ29tcG9uZW50IH0gZnJvbSAnLi9hc3NldC10aHVtYm5haWwuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIEVuaGFuY2VkTW9jayBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBtb2NrQ29tbWVyY2VBc3NldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2Nrcy9tb2NrLWFzc2V0JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBc3NldCBUaHVtYm5haWwgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEFzc2V0VGh1bWJuYWlsQ29tcG9uZW50O1xuICAgIGxldCBtb2NrRW5oYW5jZWRBc3NldDogRW5oYW5jZWRNb2NrLkVuaGFuY2VkQXNzZXQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tFbmhhbmNlZEFzc2V0ID0gRW5oYW5jZWRNb2NrLmVuaGFuY2VBc3NldChtb2NrQ29tbWVyY2VBc3NldCwgJ2NhcnQnKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBc3NldFRodW1ibmFpbENvbXBvbmVudCgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0gRW5oYW5jZWRNb2NrLmVuaGFuY2VBc3NldChtb2NrQ29tbWVyY2VBc3NldCwgJ2NhcnQnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyb3V0ZXJMaW5rKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZW5oYW5jZWQgYXNzZXRcXCdzIHJvdXRlciBsaW5rIGFycmF5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJvdXRlckxpbmspLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQucm91dGVyTGluayk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkdXJhdGlvbkZyYW1lKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZW5oYW5jZWQgYXNzZXRcXCdzIHN1YmNsaXAgZHVyYXRpb24gZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZHVyYXRpb25GcmFtZSkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldC5kdXJhdGlvbkZyYW1lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzSW1hZ2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIGltYWdlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmlzSW1hZ2UpLnRvQmUobW9ja0VuaGFuY2VkQXNzZXQuaXNJbWFnZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHVtYm5haWxVcmwoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBlbmhhbmNlZCBhc3NldFxcJ3MgdGh1bWJuYWlsIFVSTCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aHVtYm5haWxVcmwpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQudGh1bWJuYWlsVXJsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
