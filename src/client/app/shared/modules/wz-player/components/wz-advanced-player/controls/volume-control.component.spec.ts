import { VolumeControlComponent } from './volume-control.component';

export function main() {
  describe('Volume Control Component', () => {
    let componentUnderTest: VolumeControlComponent;
    let mockPlayerState: any;

    beforeEach(() => {
      componentUnderTest = new VolumeControlComponent();
      mockPlayerState = { volume: 100 };
      componentUnderTest.playerState = mockPlayerState;
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
    });

    it('starts with volumeState === inactive', () => {
      expect(componentUnderTest.volumeState).toBe('inactive');
    });

    it('starts with expected buttonTitle', () => {
      expect(componentUnderTest.buttonTitle).toBe('ASSET.ADV_PLAYER.SOUND_BTN_TITLE');
    });

    describe('iconName getter', () => {
      const tests = [
        { volume: 100, expectedResult: 'volume_up' },
        { volume: 67, expectedResult: 'volume_up' },
        { volume: 66, expectedResult: 'volume_down' },
        { volume: 65, expectedResult: 'volume_down' },
        { volume: 34, expectedResult: 'volume_down' },
        { volume: 33, expectedResult: 'volume_mute' },
        { volume: 32, expectedResult: 'volume_mute' },
        { volume: 1, expectedResult: 'volume_mute' },
        { volume: 0, expectedResult: 'volume_off' }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for volume = ${test.volume}`, () => {
          mockPlayerState.volume = test.volume;

          expect(componentUnderTest.iconName).toEqual(test.expectedResult);
        });
      });
    });

    describe('onMouseOver()', () => {
      it('sets volumeState to active', () => {
        componentUnderTest.onMouseOver();

        expect(componentUnderTest.volumeState).toBe('active');
      });
    });

    describe('onMouseLeave()', () => {
      it('restores volumeState to inactive', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseLeave();

        expect(componentUnderTest.volumeState).toBe('inactive');
      });
    });

    describe('onSliderInput()', () => {
      it('requests a volume change', () => {
        componentUnderTest.onSliderInput({ value: 42 });

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SET_VOLUME', volume: 42 });
      });
    });

    describe('onButtonClick()', () => {
      it('requests a mute toggle', () => {
        componentUnderTest.onButtonClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'TOGGLE_MUTE' });
      });
    });
  });
}
