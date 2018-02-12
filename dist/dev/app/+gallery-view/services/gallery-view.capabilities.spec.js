"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gallery_view_capabilities_1 = require("./gallery-view.capabilities");
function main() {
    describe('Gallery View Capabilities', function () {
        var capabilitiesUnderTest;
        beforeEach(function () {
            capabilitiesUnderTest = new gallery_view_capabilities_1.GalleryViewCapabilities();
        });
        it('canHaveGalleryView() should return a fake true for now', function () {
            expect(capabilitiesUnderTest.haveGalleryView()).toBe(true);
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L3NlcnZpY2VzL2dhbGxlcnktdmlldy5jYXBhYmlsaXRpZXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFzRTtBQUV0RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLHFCQUE4QyxDQUFDO1FBRW5ELFVBQVUsQ0FBQztZQUNULHFCQUFxQixHQUFHLElBQUksbURBQXVCLEVBQUUsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtZQUMzRCxNQUFNLENBQUMscUJBQXFCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFaRCxvQkFZQyIsImZpbGUiOiJhcHAvK2dhbGxlcnktdmlldy9zZXJ2aWNlcy9nYWxsZXJ5LXZpZXcuY2FwYWJpbGl0aWVzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYWxsZXJ5Vmlld0NhcGFiaWxpdGllcyB9IGZyb20gJy4vZ2FsbGVyeS12aWV3LmNhcGFiaWxpdGllcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnR2FsbGVyeSBWaWV3IENhcGFiaWxpdGllcycsICgpID0+IHtcbiAgICBsZXQgY2FwYWJpbGl0aWVzVW5kZXJUZXN0OiBHYWxsZXJ5Vmlld0NhcGFiaWxpdGllcztcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0ID0gbmV3IEdhbGxlcnlWaWV3Q2FwYWJpbGl0aWVzKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuSGF2ZUdhbGxlcnlWaWV3KCkgc2hvdWxkIHJldHVybiBhIGZha2UgdHJ1ZSBmb3Igbm93JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC5oYXZlR2FsbGVyeVZpZXcoKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
