"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_controlbar_component_1 = require("./player-controlbar.component");
function main() {
    describe('Player Controlbar Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new player_controlbar_component_1.PlayerControlbarComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('forward()', function () {
            it('forwards request events', function () {
                var mockRequest = {};
                componentUnderTest.forward(mockRequest);
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith(mockRequest);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbGJhcnMvcGxheWVyLWNvbnRyb2xiYXIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBMEU7QUFHMUU7SUFDRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFDdEMsSUFBSSxrQkFBNkMsQ0FBQztRQUVsRCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLHVEQUF5QixFQUFFLENBQUM7WUFDckQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDNUIsSUFBTSxXQUFXLEdBQWtCLEVBQW1CLENBQUM7Z0JBRXZELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFeEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkJELG9CQW1CQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xiYXJzL3BsYXllci1jb250cm9sYmFyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyQ29udHJvbGJhckNvbXBvbmVudCB9IGZyb20gJy4vcGxheWVyLWNvbnRyb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBsYXllclJlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1BsYXllciBDb250cm9sYmFyIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBQbGF5ZXJDb250cm9sYmFyQ29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUGxheWVyQ29udHJvbGJhckNvbXBvbmVudCgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXF1ZXN0IGVtaXR0ZXInKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmb3J3YXJkKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZm9yd2FyZHMgcmVxdWVzdCBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vY2tSZXF1ZXN0OiBQbGF5ZXJSZXF1ZXN0ID0ge30gYXMgUGxheWVyUmVxdWVzdDtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZm9yd2FyZChtb2NrUmVxdWVzdCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tSZXF1ZXN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
