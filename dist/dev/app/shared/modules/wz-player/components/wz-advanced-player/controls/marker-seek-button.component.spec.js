"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marker_seek_button_component_1 = require("./marker-seek-button.component");
var index_1 = require("../../../../wazee-frame-formatter/index");
function main() {
    describe('Marker Seek Button Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new marker_seek_button_component_1.MarkerSeekButtonComponent();
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
            it('the frame getter returns the expected value', function () {
                expect(componentUnderTest.frame.frameNumber).toBe(18);
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
            it('the class getter returns the expected value', function () {
                expect(componentUnderTest.class).toBe('seek-in');
            });
            it('the title getter returns the expected value', function () {
                expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SEEK_IN_BTN_TITLE');
            });
            it('onClick() emits the expected event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'in' });
            });
        });
        describe('For type \'out\'', function () {
            beforeEach(function () {
                componentUnderTest.type = 'out';
            });
            it('the frame getter returns the expected value', function () {
                expect(componentUnderTest.frame.frameNumber).toBe(58);
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
            it('the class getter returns the expected value', function () {
                expect(componentUnderTest.class).toBe('seek-out');
            });
            it('the title getter returns the expected value', function () {
                expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SEEK_OUT_BTN_TITLE');
            });
            it('onClick() emits the expected event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'out' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNlZWstYnV0dG9uLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0VBQTJFO0FBRTNFLGlFQUFnRTtBQUVoRTtJQUNFLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRTtRQUN2QyxJQUFJLGtCQUE2QyxDQUFDO1FBRWxELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksd0RBQXlCLEVBQUUsQ0FBQztZQUNyRCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUV2RSxrQkFBa0IsQ0FBQyxXQUFXLEdBQUc7Z0JBQy9CLGFBQWEsRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RELGNBQWMsRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7YUFDekMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixVQUFVLENBQUM7Z0JBQ1Qsa0JBQWtCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7Z0JBQ3JDLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtvQkFDbkUsa0JBQWtCLENBQUMsV0FBVzt3QkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FB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TCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO2dCQUN2QyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUZELG9CQThGQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlci1zZWVrLWJ1dHRvbi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcmtlclNlZWtCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL21hcmtlci1zZWVrLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ01hcmtlciBTZWVrIEJ1dHRvbiBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogTWFya2VyU2Vla0J1dHRvbkNvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IE1hcmtlclNlZWtCdXR0b25Db21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVxdWVzdCBlbWl0dGVyJyk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHtcbiAgICAgICAgaW5NYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoMTgpLFxuICAgICAgICBvdXRNYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNTgpXG4gICAgICB9IGFzIFBsYXllclN0YXRlO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0ZvciB0eXBlIFxcJ2luXFwnJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ2luJztcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhlIGZyYW1lIGdldHRlciByZXR1cm5zIHRoZSBleHBlY3RlZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mcmFtZS5mcmFtZU51bWJlcikudG9CZSgxOCk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RoZSBhbHJlYWR5QXRNYXJrZXIgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBpbiBtYXJrZXIgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID1cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSwgeyBjdXJyZW50RnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDE4KSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeUF0TWFya2VyKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgaW4gbWFya2VyIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlLCB7IGN1cnJlbnRGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hbHJlYWR5QXRNYXJrZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhlIGNsYXNzIGdldHRlciByZXR1cm5zIHRoZSBleHBlY3RlZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jbGFzcykudG9CZSgnc2Vlay1pbicpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aGUgdGl0bGUgZ2V0dGVyIHJldHVybnMgdGhlIGV4cGVjdGVkIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpdGxlKS50b0JlKCdBU1NFVC5BRFZfUExBWUVSLlNFRUtfSU5fQlROX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29uQ2xpY2soKSBlbWl0cyB0aGUgZXhwZWN0ZWQgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ1NFRUtfVE9fTUFSS0VSJywgbWFya2VyVHlwZTogJ2luJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0ZvciB0eXBlIFxcJ291dFxcJycsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdvdXQnO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aGUgZnJhbWUgZ2V0dGVyIHJldHVybnMgdGhlIGV4cGVjdGVkIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmZyYW1lLmZyYW1lTnVtYmVyKS50b0JlKDU4KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndGhlIGFscmVhZHlBdE1hcmtlciBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIG91dCBtYXJrZXIgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID1cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSwgeyBjdXJyZW50RnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDU4KSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeUF0TWFya2VyKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgb3V0IG1hcmtlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID1cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSwgeyBjdXJyZW50RnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDQyKSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeUF0TWFya2VyKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RoZSBjbGFzcyBnZXR0ZXIgcmV0dXJucyB0aGUgZXhwZWN0ZWQgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2xhc3MpLnRvQmUoJ3NlZWstb3V0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RoZSB0aXRsZSBnZXR0ZXIgcmV0dXJucyB0aGUgZXhwZWN0ZWQgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGl0bGUpLnRvQmUoJ0FTU0VULkFEVl9QTEFZRVIuU0VFS19PVVRfQlROX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29uQ2xpY2soKSBlbWl0cyB0aGUgZXhwZWN0ZWQgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ1NFRUtfVE9fTUFSS0VSJywgbWFya2VyVHlwZTogJ291dCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
