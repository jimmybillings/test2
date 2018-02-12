import { FastPlaybackButtonComponent } from './fast-playback-button.component';

export function main() {
  describe('Fast Playback Button Component', () => {
    let componentUnderTest: FastPlaybackButtonComponent;
    let mockPlayerState: any;

    beforeEach(() => {
      componentUnderTest = new FastPlaybackButtonComponent();
      mockPlayerState = { playbackSpeed: 1 };
      componentUnderTest.playerState = mockPlayerState;
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
    });

    describe('direction input', () => {
      it('defaults to forward', () => {
        expect(componentUnderTest.direction).toEqual('forward');
      });
    });

    describe('iconName getter', () => {
      it('returns the proper value for direction = forward', () => {
        expect(componentUnderTest.iconName).toEqual('fast_forward');
      });

      it('returns the proper value for direction = reverse', () => {
        componentUnderTest.direction = 'reverse';

        expect(componentUnderTest.iconName).toEqual('fast_rewind');
      });
    });

    describe('title getter', () => {
      it('returns the proper value for direction = forward', () => {
        expect(componentUnderTest.title).toEqual('ASSET.ADV_PLAYER.FAST_FORWARD_BTN_TITLE');
      });

      it('returns the proper value for direction = reverse', () => {
        componentUnderTest.direction = 'reverse';

        expect(componentUnderTest.title).toEqual('ASSET.ADV_PLAYER.FAST_REWIND_BTN_TITLE');
      });
    });

    describe('canPlayFast()', () => {
      describe('when direction = forward', () => {
        it('returns true when current speed is fast reverse', () => {
          mockPlayerState.playbackSpeed = -2;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is normal reverse', () => {
          mockPlayerState.playbackSpeed = -1;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is slow reverse', () => {
          mockPlayerState.playbackSpeed = -0.5;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is slow forward', () => {
          mockPlayerState.playbackSpeed = 0.5;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is normal forward', () => {
          mockPlayerState.playbackSpeed = 1;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns false when current speed is fast forward', () => {
          mockPlayerState.playbackSpeed = 2;

          expect(componentUnderTest.canPlayFast()).toBe(false);
        });
      });

      describe('when direction = reverse', () => {
        beforeEach(() => {
          componentUnderTest.direction = 'reverse';
        });

        it('returns false when current speed is fast reverse', () => {
          mockPlayerState.playbackSpeed = -2;

          expect(componentUnderTest.canPlayFast()).toBe(false);
        });

        it('returns true when current speed is normal reverse', () => {
          mockPlayerState.playbackSpeed = -1;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is slow reverse', () => {
          mockPlayerState.playbackSpeed = -0.5;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is slow forward', () => {
          mockPlayerState.playbackSpeed = 0.5;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is normal forward', () => {
          mockPlayerState.playbackSpeed = 1;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });

        it('returns true when current speed is fast forward', () => {
          mockPlayerState.playbackSpeed = 2;

          expect(componentUnderTest.canPlayFast()).toBe(true);
        });
      });
    });

    describe('onClick()', () => {
      it('requests 4x playback when direction = forward', () => {
        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit)
          .toHaveBeenCalledWith({ type: 'PLAY_AT_SPEED', speed: 4, direction: 'forward' });
      });

      it('requests -4x playback when direction = reverse', () => {
        componentUnderTest.direction = 'reverse';

        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit)
          .toHaveBeenCalledWith({ type: 'PLAY_AT_SPEED', speed: 4, direction: 'reverse' });
      });
    });
  });
}
