"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_highlights_component_1 = require("./home-highlights.component");
function main() {
    describe('Home Highlights Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new home_highlights_component_1.HomeHighlightsComponent();
        });
        it('Should remove any empty properties in the configurable search params incase HUMANS forgot to put them in there', function () {
            expect(componentUnderTest.buildSearchContext(JSON.stringify({ q: '', i: 0, n: 100 }))).toEqual({ i: 0, n: 100 });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtaGlnaGxpZ2h0cy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlFQUFzRTtBQUV0RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLGtCQUEyQyxDQUFDO1FBRWhELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksbURBQXVCLEVBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnSEFBZ0gsRUFBRTtZQUNuSCxNQUFNLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNuSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVhELG9CQVdDIiwiZmlsZSI6ImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtaGlnaGxpZ2h0cy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSG9tZUhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2hvbWUtaGlnaGxpZ2h0cy5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0hvbWUgSGlnaGxpZ2h0cyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogSG9tZUhpZ2hsaWdodHNDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBIb21lSGlnaGxpZ2h0c0NvbXBvbmVudCgpO1xuICAgIH0pO1xuICAgIGl0KCdTaG91bGQgcmVtb3ZlIGFueSBlbXB0eSBwcm9wZXJ0aWVzIGluIHRoZSBjb25maWd1cmFibGUgc2VhcmNoIHBhcmFtcyBpbmNhc2UgSFVNQU5TIGZvcmdvdCB0byBwdXQgdGhlbSBpbiB0aGVyZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYnVpbGRTZWFyY2hDb250ZXh0KEpTT04uc3RyaW5naWZ5KHsgcTogJycsIGk6IDAsIG46IDEwMCB9KSkpLnRvRXF1YWwoeyBpOiAwLCBuOiAxMDAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
