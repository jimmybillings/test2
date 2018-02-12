"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fast_playback_button_component_1 = require("./fast-playback-button.component");
function main() {
    describe('Fast Playback Button Component', function () {
        var componentUnderTest;
        var mockPlayerState;
        beforeEach(function () {
            componentUnderTest = new fast_playback_button_component_1.FastPlaybackButtonComponent();
            mockPlayerState = { playbackSpeed: 1 };
            componentUnderTest.playerState = mockPlayerState;
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('direction input', function () {
            it('defaults to forward', function () {
                expect(componentUnderTest.direction).toEqual('forward');
            });
        });
        describe('iconName getter', function () {
            it('returns the proper value for direction = forward', function () {
                expect(componentUnderTest.iconName).toEqual('fast_forward');
            });
            it('returns the proper value for direction = reverse', function () {
                componentUnderTest.direction = 'reverse';
                expect(componentUnderTest.iconName).toEqual('fast_rewind');
            });
        });
        describe('title getter', function () {
            it('returns the proper value for direction = forward', function () {
                expect(componentUnderTest.title).toEqual('ASSET.ADV_PLAYER.FAST_FORWARD_BTN_TITLE');
            });
            it('returns the proper value for direction = reverse', function () {
                componentUnderTest.direction = 'reverse';
                expect(componentUnderTest.title).toEqual('ASSET.ADV_PLAYER.FAST_REWIND_BTN_TITLE');
            });
        });
        describe('canPlayFast()', function () {
            describe('when direction = forward', function () {
                it('returns true when current speed is fast reverse', function () {
                    mockPlayerState.playbackSpeed = -2;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is normal reverse', function () {
                    mockPlayerState.playbackSpeed = -1;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is slow reverse', function () {
                    mockPlayerState.playbackSpeed = -0.5;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is slow forward', function () {
                    mockPlayerState.playbackSpeed = 0.5;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is normal forward', function () {
                    mockPlayerState.playbackSpeed = 1;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns false when current speed is fast forward', function () {
                    mockPlayerState.playbackSpeed = 2;
                    expect(componentUnderTest.canPlayFast()).toBe(false);
                });
            });
            describe('when direction = reverse', function () {
                beforeEach(function () {
                    componentUnderTest.direction = 'reverse';
                });
                it('returns false when current speed is fast reverse', function () {
                    mockPlayerState.playbackSpeed = -2;
                    expect(componentUnderTest.canPlayFast()).toBe(false);
                });
                it('returns true when current speed is normal reverse', function () {
                    mockPlayerState.playbackSpeed = -1;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is slow reverse', function () {
                    mockPlayerState.playbackSpeed = -0.5;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is slow forward', function () {
                    mockPlayerState.playbackSpeed = 0.5;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is normal forward', function () {
                    mockPlayerState.playbackSpeed = 1;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
                it('returns true when current speed is fast forward', function () {
                    mockPlayerState.playbackSpeed = 2;
                    expect(componentUnderTest.canPlayFast()).toBe(true);
                });
            });
        });
        describe('onClick()', function () {
            it('requests 4x playback when direction = forward', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit)
                    .toHaveBeenCalledWith({ type: 'PLAY_AT_SPEED', speed: 4, direction: 'forward' });
            });
            it('requests -4x playback when direction = reverse', function () {
                componentUnderTest.direction = 'reverse';
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit)
                    .toHaveBeenCalledWith({ type: 'PLAY_AT_SPEED', speed: 4, direction: 'reverse' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvZmFzdC1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0U7QUFFL0U7SUFDRSxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7UUFDekMsSUFBSSxrQkFBK0MsQ0FBQztRQUNwRCxJQUFJLGVBQW9CLENBQUM7UUFFekIsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSw0REFBMkIsRUFBRSxDQUFDO1lBQ3ZELGVBQWUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1lBQ2pELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtnQkFDckQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtnQkFDckQsa0JBQWtCLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFFekMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxD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QUFJLENBQUM7cUJBQ3BDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO2dCQUNuRCxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUV6QyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ3BDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE5SUQsb0JBOElDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvZmFzdC1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGYXN0UGxheWJhY2tCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Zhc3QtcGxheWJhY2stYnV0dG9uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRmFzdCBQbGF5YmFjayBCdXR0b24gQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEZhc3RQbGF5YmFja0J1dHRvbkNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1BsYXllclN0YXRlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBGYXN0UGxheWJhY2tCdXR0b25Db21wb25lbnQoKTtcbiAgICAgIG1vY2tQbGF5ZXJTdGF0ZSA9IHsgcGxheWJhY2tTcGVlZDogMSB9O1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0gbW9ja1BsYXllclN0YXRlO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXF1ZXN0IGVtaXR0ZXInKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkaXJlY3Rpb24gaW5wdXQnLCAoKSA9PiB7XG4gICAgICBpdCgnZGVmYXVsdHMgdG8gZm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kaXJlY3Rpb24pLnRvRXF1YWwoJ2ZvcndhcmQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ljb25OYW1lIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGRpcmVjdGlvbiA9IGZvcndhcmQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaWNvbk5hbWUpLnRvRXF1YWwoJ2Zhc3RfZm9yd2FyZCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGRpcmVjdGlvbiA9IHJldmVyc2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kaXJlY3Rpb24gPSAncmV2ZXJzZSc7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pY29uTmFtZSkudG9FcXVhbCgnZmFzdF9yZXdpbmQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RpdGxlIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGRpcmVjdGlvbiA9IGZvcndhcmQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGl0bGUpLnRvRXF1YWwoJ0FTU0VULkFEVl9QTEFZRVIuRkFTVF9GT1JXQVJEX0JUTl9USVRMRScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGRpcmVjdGlvbiA9IHJldmVyc2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kaXJlY3Rpb24gPSAncmV2ZXJzZSc7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aXRsZSkudG9FcXVhbCgnQVNTRVQuQURWX1BMQVlFUi5GQVNUX1JFV0lORF9CVE5fVElUTEUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhblBsYXlGYXN0KCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnd2hlbiBkaXJlY3Rpb24gPSBmb3J3YXJkJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gY3VycmVudCBzcGVlZCBpcyBmYXN0IHJldmVyc2UnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1BsYXllclN0YXRlLnBsYXliYWNrU3BlZWQgPSAtMjtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUGxheUZhc3QoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgbm9ybWFsIHJldmVyc2UnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1BsYXllclN0YXRlLnBsYXliYWNrU3BlZWQgPSAtMTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUGxheUZhc3QoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgc2xvdyByZXZlcnNlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tQbGF5ZXJTdGF0ZS5wbGF5YmFja1NwZWVkID0gLTAuNTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUGxheUZhc3QoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgc2xvdyBmb3J3YXJkJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tQbGF5ZXJTdGF0ZS5wbGF5YmFja1NwZWVkID0gMC41O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QbGF5RmFzdCgpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gY3VycmVudCBzcGVlZCBpcyBub3JtYWwgZm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrUGxheWVyU3RhdGUucGxheWJhY2tTcGVlZCA9IDE7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhblBsYXlGYXN0KCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gY3VycmVudCBzcGVlZCBpcyBmYXN0IGZvcndhcmQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1BsYXllclN0YXRlLnBsYXliYWNrU3BlZWQgPSAyO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QbGF5RmFzdCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gZGlyZWN0aW9uID0gcmV2ZXJzZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpcmVjdGlvbiA9ICdyZXZlcnNlJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBjdXJyZW50IHNwZWVkIGlzIGZhc3QgcmV2ZXJzZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrUGxheWVyU3RhdGUucGxheWJhY2tTcGVlZCA9IC0yO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QbGF5RmFzdCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgbm9ybWFsIHJldmVyc2UnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1BsYXllclN0YXRlLnBsYXliYWNrU3BlZWQgPSAtMTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUGxheUZhc3QoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgc2xvdyByZXZlcnNlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tQbGF5ZXJTdGF0ZS5wbGF5YmFja1NwZWVkID0gLTAuNTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuUGxheUZhc3QoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGN1cnJlbnQgc3BlZWQgaXMgc2xvdyBmb3J3YXJkJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tQbGF5ZXJTdGF0ZS5wbGF5YmFja1NwZWVkID0gMC41O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5QbGF5RmFzdCgpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gY3VycmVudCBzcGVlZCBpcyBub3JtYWwgZm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrUGxheWVyU3RhdGUucGxheWJhY2tTcGVlZCA9IDE7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhblBsYXlGYXN0KCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBjdXJyZW50IHNwZWVkIGlzIGZhc3QgZm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrUGxheWVyU3RhdGUucGxheWJhY2tTcGVlZCA9IDI7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhblBsYXlGYXN0KCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGljaygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JlcXVlc3RzIDR4IHBsYXliYWNrIHdoZW4gZGlyZWN0aW9uID0gZm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdClcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnUExBWV9BVF9TUEVFRCcsIHNwZWVkOiA0LCBkaXJlY3Rpb246ICdmb3J3YXJkJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVxdWVzdHMgLTR4IHBsYXliYWNrIHdoZW4gZGlyZWN0aW9uID0gcmV2ZXJzZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpcmVjdGlvbiA9ICdyZXZlcnNlJztcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KVxuICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdQTEFZX0FUX1NQRUVEJywgc3BlZWQ6IDQsIGRpcmVjdGlvbjogJ3JldmVyc2UnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
