"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marker_time_display_component_1 = require("./marker-time-display.component");
var index_1 = require("../../../../wazee-frame-formatter/index");
function main() {
    describe('Marker Time Display Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new marker_time_display_component_1.MarkerTimeDisplayComponent();
        });
        describe('frame getter', function () {
            beforeEach(function () {
                componentUnderTest.playerState = {
                    inMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(17),
                    outMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(42)
                };
            });
            it('returns the player state\'s in marker frame for type=\'in\'', function () {
                componentUnderTest.type = 'in';
                expect(componentUnderTest.frame.frameNumber).toBe(17);
            });
            it('returns the player state\'s out marker frame for type=\'out\'', function () {
                componentUnderTest.type = 'out';
                expect(componentUnderTest.frame.frameNumber).toBe(42);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXRpbWUtZGlzcGxheS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlGQUE2RTtBQUU3RSxpRUFBZ0U7QUFFaEU7SUFDRSxRQUFRLENBQUMsK0JBQStCLEVBQUU7UUFDeEMsSUFBSSxrQkFBOEMsQ0FBQztRQUVuRCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLDBEQUEwQixFQUFFLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLFVBQVUsQ0FBQztnQkFDVCxrQkFBa0IsQ0FBQyxXQUFXLEdBQUc7b0JBQy9CLGFBQWEsRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7b0JBQ3RELGNBQWMsRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7aUJBQ3pDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQ2hFLGtCQUFrQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBRS9CLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtEQUErRCxFQUFFO2dCQUNsRSxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUVoQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0JELG9CQTZCQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlci10aW1lLWRpc3BsYXkuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXJrZXJUaW1lRGlzcGxheUNvbXBvbmVudCB9IGZyb20gJy4vbWFya2VyLXRpbWUtZGlzcGxheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ01hcmtlciBUaW1lIERpc3BsYXkgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IE1hcmtlclRpbWVEaXNwbGF5Q29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgTWFya2VyVGltZURpc3BsYXlDb21wb25lbnQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmcmFtZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge1xuICAgICAgICAgIGluTWFya2VyRnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDE3KSxcbiAgICAgICAgICBvdXRNYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpXG4gICAgICAgIH0gYXMgUGxheWVyU3RhdGU7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHBsYXllciBzdGF0ZVxcJ3MgaW4gbWFya2VyIGZyYW1lIGZvciB0eXBlPVxcJ2luXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdpbic7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mcmFtZS5mcmFtZU51bWJlcikudG9CZSgxNyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHBsYXllciBzdGF0ZVxcJ3Mgb3V0IG1hcmtlciBmcmFtZSBmb3IgdHlwZT1cXCdvdXRcXCcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ291dCc7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mcmFtZS5mcmFtZU51bWJlcikudG9CZSg0Mik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
