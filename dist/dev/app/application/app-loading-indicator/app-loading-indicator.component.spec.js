"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_loading_indicator_component_1 = require("./app-loading-indicator.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('App Loading Indicator Component', function () {
        var componentUnderTest;
        var mockAppStore;
        beforeEach(function () {
            mockAppStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new app_loading_indicator_component_1.AppLoadingIndicatorComponent(mockAppStore);
        });
        describe('showLoadingIndicator getter', function () {
            it('returns true when the value in the store is true', function () {
                mockAppStore.createStateSection('loadingIndicator', { show: true });
                var showLoading;
                componentUnderTest.showLoadingIndicator.take(1).subscribe(function (loading) { return showLoading = loading; });
                expect(showLoading).toBe(true);
            });
            it('returns false when the value in the store is false', function () {
                mockAppStore.createStateSection('loadingIndicator', { show: false });
                var showLoading;
                componentUnderTest.showLoadingIndicator.take(1).subscribe(function (loading) { return showLoading = loading; });
                expect(showLoading).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9hcHAtbG9hZGluZy1pbmRpY2F0b3IvYXBwLWxvYWRpbmctaW5kaWNhdG9yLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUZBQWlGO0FBQ2pGLDBFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTtRQUMxQyxJQUFJLGtCQUFnRCxDQUFDO1FBQ3JELElBQUksWUFBMEIsQ0FBQztRQUUvQixVQUFVLENBQUM7WUFDVCxZQUFZLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDbEMsa0JBQWtCLEdBQUcsSUFBSSw4REFBNEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtZQUN0QyxFQUFFLENBQUMsa0RBQWtELEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLFdBQW9CLENBQUM7Z0JBQ3pCLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxXQUFXLEdBQUcsT0FBTyxFQUFyQixDQUFxQixDQUFDLENBQUM7Z0JBQzVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7Z0JBQ3ZELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLFdBQW9CLENBQUM7Z0JBQ3pCLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxXQUFXLEdBQUcsT0FBTyxFQUFyQixDQUFxQixDQUFDLENBQUM7Z0JBQzVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFCRCxvQkEwQkMiLCJmaWxlIjoiYXBwL2FwcGxpY2F0aW9uL2FwcC1sb2FkaW5nLWluZGljYXRvci9hcHAtbG9hZGluZy1pbmRpY2F0b3IuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFwcExvYWRpbmdJbmRpY2F0b3JDb21wb25lbnQgfSBmcm9tICcuL2FwcC1sb2FkaW5nLWluZGljYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBcHAgTG9hZGluZyBJbmRpY2F0b3IgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEFwcExvYWRpbmdJbmRpY2F0b3JDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tBcHBTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQXBwTG9hZGluZ0luZGljYXRvckNvbXBvbmVudChtb2NrQXBwU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dMb2FkaW5nSW5kaWNhdG9yIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWUgaW4gdGhlIHN0b3JlIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2xvYWRpbmdJbmRpY2F0b3InLCB7IHNob3c6IHRydWUgfSk7XG4gICAgICAgIGxldCBzaG93TG9hZGluZzogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dMb2FkaW5nSW5kaWNhdG9yLnRha2UoMSkuc3Vic2NyaWJlKGxvYWRpbmcgPT4gc2hvd0xvYWRpbmcgPSBsb2FkaW5nKTtcbiAgICAgICAgZXhwZWN0KHNob3dMb2FkaW5nKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIHZhbHVlIGluIHRoZSBzdG9yZSBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignbG9hZGluZ0luZGljYXRvcicsIHsgc2hvdzogZmFsc2UgfSk7XG4gICAgICAgIGxldCBzaG93TG9hZGluZzogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dMb2FkaW5nSW5kaWNhdG9yLnRha2UoMSkuc3Vic2NyaWJlKGxvYWRpbmcgPT4gc2hvd0xvYWRpbmcgPSBsb2FkaW5nKTtcbiAgICAgICAgZXhwZWN0KHNob3dMb2FkaW5nKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
