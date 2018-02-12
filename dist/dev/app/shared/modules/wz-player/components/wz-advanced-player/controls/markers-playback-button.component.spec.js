"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markers_playback_button_component_1 = require("./markers-playback-button.component");
function main() {
    describe('Markers Playback Button Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new markers_playback_button_component_1.MarkersPlaybackButtonComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('onClick()', function () {
            it('emits the expected request event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'TOGGLE_MARKERS_PLAYBACK' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2Vycy1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5RkFBcUY7QUFFckY7SUFDRSxRQUFRLENBQUMsbUNBQW1DLEVBQUU7UUFDNUMsSUFBSSxrQkFBa0QsQ0FBQztRQUV2RCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLGtFQUE4QixFQUFFLENBQUM7WUFDMUQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQkQsb0JBaUJDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2Vycy1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXJrZXJzUGxheWJhY2tCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL21hcmtlcnMtcGxheWJhY2stYnV0dG9uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnTWFya2VycyBQbGF5YmFjayBCdXR0b24gQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IE1hcmtlcnNQbGF5YmFja0J1dHRvbkNvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IE1hcmtlcnNQbGF5YmFja0J1dHRvbkNvbXBvbmVudCgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXF1ZXN0IGVtaXR0ZXInKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIGV4cGVjdGVkIHJlcXVlc3QgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ1RPR0dMRV9NQVJLRVJTX1BMQVlCQUNLJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
