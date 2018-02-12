import { MarkerSeekButtonComponent } from './marker-seek-button.component';
import { PlayerState } from '../../../interfaces/player.interface';
import { Frame } from '../../../../wazee-frame-formatter/index';

export function main() {
  describe('Marker Seek Button Component', () => {
    let componentUnderTest: MarkerSeekButtonComponent;

    beforeEach(() => {
      componentUnderTest = new MarkerSeekButtonComponent();
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');

      componentUnderTest.playerState = {
        inMarkerFrame: new Frame(29.97).setFromFrameNumber(18),
        outMarkerFrame: new Frame(29.97).setFromFrameNumber(58)
      } as PlayerState;
    });

    describe('For type \'in\'', () => {
      beforeEach(() => {
        componentUnderTest.type = 'in';
      });

      it('the frame getter returns the expected value', () => {
        expect(componentUnderTest.frame.frameNumber).toBe(18);
      });

      describe('the alreadyAtMarker getter', () => {
        it('returns true if the in marker is the same as the current frame', () => {
          componentUnderTest.playerState =
            Object.assign({}, componentUnderTest.playerState, { currentFrame: new Frame(29.97).setFromFrameNumber(18) });

          expect(componentUnderTest.alreadyAtMarker).toBe(true);
        });

        it('returns false if the in marker is not the same as the current frame', () => {
          componentUnderTest.playerState =
            Object.assign({}, componentUnderTest.playerState, { currentFrame: new Frame(29.97).setFromFrameNumber(42) });

          expect(componentUnderTest.alreadyAtMarker).toBe(false);
        });
      });

      it('the class getter returns the expected value', () => {
        expect(componentUnderTest.class).toBe('seek-in');
      });

      it('the title getter returns the expected value', () => {
        expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SEEK_IN_BTN_TITLE');
      });

      it('onClick() emits the expected event', () => {
        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'in' });
      });
    });

    describe('For type \'out\'', () => {
      beforeEach(() => {
        componentUnderTest.type = 'out';
      });

      it('the frame getter returns the expected value', () => {
        expect(componentUnderTest.frame.frameNumber).toBe(58);
      });

      describe('the alreadyAtMarker getter', () => {
        it('returns true if the out marker is the same as the current frame', () => {
          componentUnderTest.playerState =
            Object.assign({}, componentUnderTest.playerState, { currentFrame: new Frame(29.97).setFromFrameNumber(58) });

          expect(componentUnderTest.alreadyAtMarker).toBe(true);
        });

        it('returns false if the out marker is not the same as the current frame', () => {
          componentUnderTest.playerState =
            Object.assign({}, componentUnderTest.playerState, { currentFrame: new Frame(29.97).setFromFrameNumber(42) });

          expect(componentUnderTest.alreadyAtMarker).toBe(false);
        });
      });

      it('the class getter returns the expected value', () => {
        expect(componentUnderTest.class).toBe('seek-out');
      });

      it('the title getter returns the expected value', () => {
        expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SEEK_OUT_BTN_TITLE');
      });

      it('onClick() emits the expected event', () => {
        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'out' });
      });
    });
  });
}
