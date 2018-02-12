import { MarkerSetButtonComponent } from './marker-set-button.component';
import { PlayerState } from '../../../interfaces/player.interface';
import { Frame } from '../../../../wazee-frame-formatter/index';

export function main() {
  describe('Marker Set Button Component', () => {
    let componentUnderTest: MarkerSetButtonComponent;

    beforeEach(() => {
      componentUnderTest = new MarkerSetButtonComponent();
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

      it('the title getter returns the expected value', () => {
        expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SET_IN_BTN_TITLE');
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

      it('onClick() emits the expected event', () => {
        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'in' });
      });
    });

    describe('For type \'out\'', () => {
      beforeEach(() => {
        componentUnderTest.type = 'out';
      });

      it('the title getter returns the expected value', () => {
        expect(componentUnderTest.title).toBe('ASSET.ADV_PLAYER.SET_OUT_BTN_TITLE');
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

      it('onClick() emits the expected event', () => {
        componentUnderTest.onClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'out' });
      });
    });
  });
}
