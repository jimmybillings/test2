"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var playback_toggle_button_component_1 = require("./playback-toggle-button.component");
function main() {
    describe('Playback Toggle Button Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new playback_toggle_button_component_1.PlaybackToggleButtonComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('onClick()', function () {
            it('emits the expected request event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'TOGGLE_PLAYBACK' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvcGxheWJhY2stdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVGQUFtRjtBQUVuRjtJQUNFLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRTtRQUMzQyxJQUFJLGtCQUFpRCxDQUFDO1FBRXRELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksZ0VBQTZCLEVBQUUsQ0FBQztZQUN6RCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO2dCQUNyQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDNUYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpCRCxvQkFpQkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9wbGF5YmFjay10b2dnbGUtYnV0dG9uLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWJhY2tUb2dnbGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3BsYXliYWNrLXRvZ2dsZS1idXR0b24uY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQbGF5YmFjayBUb2dnbGUgQnV0dG9uIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBQbGF5YmFja1RvZ2dsZUJ1dHRvbkNvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFBsYXliYWNrVG9nZ2xlQnV0dG9uQ29tcG9uZW50KCk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0ID0gamFzbWluZS5jcmVhdGVTcHkoJ3JlcXVlc3QgZW1pdHRlcicpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgZXhwZWN0ZWQgcmVxdWVzdCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnVE9HR0xFX1BMQVlCQUNLJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
