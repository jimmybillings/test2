"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marker_set_button_component_1 = require("./marker-set-button.component");
var index_1 = require("../../../../wazee-frame-formatter/index");
function main() {
    describe('Marker Set Button Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new marker_set_button_component_1.MarkerSetButtonComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
            componentUnderTest.playerState = {
                inMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(18),
                outMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(58)
            };
        });
        describe('For type \'in\'', function () {
            beforeEach(function () {
                componentUnderTest.type = 'in';
            });
            it('the title getter returns the expected value', function () {
                expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SET_IN_BTN_TITLE');
            });
            describe('the alreadyAtMarker getter', function () {
                it('returns true if the in marker is the same as the current frame', function () {
                    componentUnderTest.playerState =
                        Object.assign({}, componentUnderTest.playerState, { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(18) });
                    expect(componentUnderTest.alreadyAtMarker).toBe(true);
                });
                it('returns false if the in marker is not the same as the current frame', function () {
                    componentUnderTest.playerState =
                        Object.assign({}, componentUnderTest.playerState, { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(42) });
                    expect(componentUnderTest.alreadyAtMarker).toBe(false);
                });
            });
            it('onClick() emits the expected event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'in' });
            });
        });
        describe('For type \'out\'', function () {
            beforeEach(function () {
                componentUnderTest.type = 'out';
            });
            it('the title getter returns the expected value', function () {
                expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SET_OUT_BTN_TITLE');
            });
            describe('the alreadyAtMarker getter', function () {
                it('returns true if the out marker is the same as the current frame', function () {
                    componentUnderTest.playerState =
                        Object.assign({}, componentUnderTest.playerState, { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(58) });
                    expect(componentUnderTest.alreadyAtMarker).toBe(true);
                });
                it('returns false if the out marker is not the same as the current frame', function () {
                    componentUnderTest.playerState =
                        Object.assign({}, componentUnderTest.playerState, { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(42) });
                    expect(componentUnderTest.alreadyAtMarker).toBe(false);
                });
            });
            it('onClick() emits the expected event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'out' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNldC1idXR0b24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBeUU7QUFFekUsaUVBQWdFO0FBRWhFO0lBQ0UsUUFBUSxDQUFDLDZCQUE2QixFQUFFO1FBQ3RDLElBQUksa0JBQTRDLENBQUM7UUFFakQsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1lBQ3BELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXZFLGtCQUFrQixDQUFDLFdBQVcsR0FBRztnQkFDL0IsYUFBYSxFQUFFLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztnQkFDdEQsY0FBYyxFQUFFLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQzthQUN6QyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLFVBQVUsQ0FBQztnQkFDVCxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO2dCQUNoRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDN0UsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7Z0JBQ3JDLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtvQkFDbkUsa0JBQWtCLENBQUMsV0FBVzt3QkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVB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QUFDLENBQUM7QUFDTCxDQUFDO0FBOUVELG9CQThFQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlci1zZXQtYnV0dG9uLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFya2VyU2V0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZXItc2V0LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ01hcmtlciBTZXQgQnV0dG9uIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBNYXJrZXJTZXRCdXR0b25Db21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBNYXJrZXJTZXRCdXR0b25Db21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVxdWVzdCBlbWl0dGVyJyk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHtcbiAgICAgICAgaW5NYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoMTgpLFxuICAgICAgICBvdXRNYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNTgpXG4gICAgICB9IGFzIFBsYXllclN0YXRlO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0ZvciB0eXBlIFxcJ2luXFwnJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ2luJztcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhlIHRpdGxlIGdldHRlciByZXR1cm5zIHRoZSBleHBlY3RlZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aXRsZSkudG9CZSgnQVNTRVQuQURWX1BMQVlFUi5TRVRfSU5fQlROX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RoZSBhbHJlYWR5QXRNYXJrZXIgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBpbiBtYXJrZXIgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID1cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSwgeyBjdXJyZW50RnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDE4KSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeUF0TWFya2VyKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgaW4gbWFya2VyIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlLCB7IGN1cnJlbnRGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hbHJlYWR5QXRNYXJrZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnb25DbGljaygpIGVtaXRzIHRoZSBleHBlY3RlZCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnU0VUX01BUktFUl9UT19DVVJSRU5UX0ZSQU1FJywgbWFya2VyVHlwZTogJ2luJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0ZvciB0eXBlIFxcJ291dFxcJycsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdvdXQnO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aGUgdGl0bGUgZ2V0dGVyIHJldHVybnMgdGhlIGV4cGVjdGVkIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpdGxlKS50b0JlKCdBU1NFVC5BRFZfUExBWUVSLlNFVF9PVVRfQlROX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RoZSBhbHJlYWR5QXRNYXJrZXIgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBvdXQgbWFya2VyIGlzIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IGZyYW1lJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUsIHsgY3VycmVudEZyYW1lOiBuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcig1OCkgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFscmVhZHlBdE1hcmtlcikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG91dCBtYXJrZXIgaXMgbm90IHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IGZyYW1lJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUsIHsgY3VycmVudEZyYW1lOiBuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcig0MikgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFscmVhZHlBdE1hcmtlcikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdvbkNsaWNrKCkgZW1pdHMgdGhlIGV4cGVjdGVkIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdTRVRfTUFSS0VSX1RPX0NVUlJFTlRfRlJBTUUnLCBtYXJrZXJUeXBlOiAnb3V0JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
