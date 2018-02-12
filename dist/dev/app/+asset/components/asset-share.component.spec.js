"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_share_component_1 = require("./asset-share.component");
var mock_asset_1 = require("../../shared/mocks/mock-asset");
var EnhancedMock = require("../../shared/interfaces/enhanced-asset");
function main() {
    describe('Asset Share Component', function () {
        var componentUnderTest;
        var mockEnhancedAsset;
        beforeEach(function () {
            componentUnderTest = new asset_share_component_1.AssetShareComponent(null);
        });
        describe('enhancedAsset setter', function () {
            beforeEach(function () {
                spyOn(componentUnderTest, 'closeAssetShare');
                mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAssetLineItem.asset, null);
                componentUnderTest.enhancedAsset = mockEnhancedAsset;
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvY29tcG9uZW50cy9hc3NldC1zaGFyZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUE4RDtBQUM5RCw0REFBMEU7QUFDMUUscUVBQXVFO0FBR3ZFO0lBQ0UsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ2hDLElBQUksa0JBQXVDLENBQUM7UUFDNUMsSUFBSSxpQkFBNkMsQ0FBQztRQUVsRCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLDJDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLFVBQVUsQ0FBQztnQkFDVCxLQUFLLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0MsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQ0FBeUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztRQVNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekJELG9CQXlCQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLythc3NldC9jb21wb25lbnRzL2Fzc2V0LXNoYXJlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXRTaGFyZUNvbXBvbmVudCB9IGZyb20gJy4vYXNzZXQtc2hhcmUuY29tcG9uZW50JztcbmltcG9ydCB7IG1vY2tDb21tZXJjZUFzc2V0TGluZUl0ZW0gfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9ja3MvbW9jay1hc3NldCc7XG5pbXBvcnQgKiBhcyBFbmhhbmNlZE1vY2sgZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQXNzZXQgU2hhcmUgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEFzc2V0U2hhcmVDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tFbmhhbmNlZEFzc2V0OiBFbmhhbmNlZE1vY2suRW5oYW5jZWRBc3NldDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEFzc2V0U2hhcmVDb21wb25lbnQobnVsbCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZW5oYW5jZWRBc3NldCBzZXR0ZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LCAnY2xvc2VBc3NldFNoYXJlJyk7XG4gICAgICAgIG1vY2tFbmhhbmNlZEFzc2V0ID0gRW5oYW5jZWRNb2NrLmVuaGFuY2VBc3NldChtb2NrQ29tbWVyY2VBc3NldExpbmVJdGVtLmFzc2V0LCBudWxsKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSBtb2NrRW5oYW5jZWRBc3NldDtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpdCgnc2hvdWxkIHNldCB0aGUgY3VycmVudEFzc2V0JywgKCkgPT4ge1xuICAgICAgLy8gICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmN1cnJlbnRBc3NldCkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldCk7XG4gICAgICAvLyB9KTtcblxuICAgICAgLy8gaXQoJ3Nob3VsZCBjYWxsIGNsb3NlQXNzZXRTaGFyZSgpJywgKCkgPT4ge1xuICAgICAgLy8gICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNsb3NlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
