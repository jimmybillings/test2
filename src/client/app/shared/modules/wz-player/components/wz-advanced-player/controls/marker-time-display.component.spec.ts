import { MarkerTimeDisplayComponent } from './marker-time-display.component';
import { PlayerState } from '../../../interfaces/player.interface';
import { Frame } from '../../../../wazee-frame-formatter/index';

export function main() {
  describe('Marker Time Display Component', () => {
    let componentUnderTest: MarkerTimeDisplayComponent;

    beforeEach(() => {
      componentUnderTest = new MarkerTimeDisplayComponent();
    });

    describe('frame getter', () => {
      beforeEach(() => {
        componentUnderTest.playerState = {
          inMarkerFrame: new Frame(29.97).setFromFrameNumber(17),
          outMarkerFrame: new Frame(29.97).setFromFrameNumber(42)
        } as PlayerState;
      });

      it('returns the player state\'s in marker frame for type=\'in\'', () => {
        componentUnderTest.type = 'in';

        expect(componentUnderTest.frame.frameNumber).toBe(17);
      });

      it('returns the player state\'s out marker frame for type=\'out\'', () => {
        componentUnderTest.type = 'out';

        expect(componentUnderTest.frame.frameNumber).toBe(42);
      });
    });
  });
}
