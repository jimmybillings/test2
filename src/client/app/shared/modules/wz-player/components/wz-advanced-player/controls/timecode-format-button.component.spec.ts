import { TimecodeFormatButtonComponent } from './timecode-format-button.component';
import { TimecodeFormat, TimecodeBase } from '../../../../wazee-frame-formatter/index';

export function main() {
  describe('Timecode Format Button Component', () => {
    let componentUnderTest: TimecodeFormatButtonComponent;

    beforeEach(() => {
      componentUnderTest = new TimecodeFormatButtonComponent();
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
    });

    describe('currentTimecodeFormatBaseTranslationKey getter', () => {
      it('returns the correct key for stream-based timecode', () => {
        componentUnderTest.playerState = {
          timecodeBase: TimecodeBase.STREAM_BASED, timecodeFormat: TimecodeFormat.SIMPLE_TIME_CONVERSION
        } as any;

        expect(componentUnderTest.currentTimecodeFormatBaseTranslationKey)
          .toBe('ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY.STREAM_BASED_TIMECODE');
      });

      it('returns the correct key for source-based timecode', () => {
        componentUnderTest.playerState = {
          timecodeBase: TimecodeBase.SOURCE_BASED, timecodeFormat: TimecodeFormat.SIMPLE_TIME_CONVERSION
        } as any;

        expect(componentUnderTest.currentTimecodeFormatBaseTranslationKey)
          .toBe('ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY.SOURCE_BASED_TIMECODE');
      });

      it('returns the correct key for stream-based seconds', () => {
        componentUnderTest.playerState = {
          timecodeBase: TimecodeBase.STREAM_BASED, timecodeFormat: TimecodeFormat.SECONDS
        } as any;

        expect(componentUnderTest.currentTimecodeFormatBaseTranslationKey)
          .toBe('ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY.STREAM_BASED_SECONDS');
      });

      it('returns the correct key for source-based seconds', () => {
        // Even though we don't currently allow the user to select this.
        componentUnderTest.playerState = {
          timecodeBase: TimecodeBase.SOURCE_BASED, timecodeFormat: TimecodeFormat.SECONDS
        } as any;

        expect(componentUnderTest.currentTimecodeFormatBaseTranslationKey)
          .toBe('ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY.SOURCE_BASED_SECONDS');
      });
    });

    describe('currentFrame getter', () => {
      it('returns the expected frame', () => {
        componentUnderTest.playerState = { currentFrame: { some: 'frame' } } as any;

        expect(componentUnderTest.currentFrame).toEqual({ some: 'frame' });
      });
    });

    describe('canSelectSourceBased getter', () => {
      it('returns false if the player state has no current frame', () => {
        componentUnderTest.playerState = {} as any;

        expect(componentUnderTest.canSelectSourceBased).toBe(false);
      });

      it('returns false if the player state\'s current frame has a zero offset', () => {
        componentUnderTest.playerState = { currentFrame: { sourceBasedOffsetFrames: 0 } } as any;

        expect(componentUnderTest.canSelectSourceBased).toBe(false);
      });

      it('returns true if the player state\'s current frame has an offset greater than 0', () => {
        componentUnderTest.playerState = { currentFrame: { sourceBasedOffsetFrames: 1 } } as any;

        expect(componentUnderTest.canSelectSourceBased).toBe(true);
      });
    });

    describe('selectStreamBasedTimecode()', () => {
      it('emits the expected request', () => {
        componentUnderTest.selectStreamBasedTimecode();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({
          type: 'CHANGE_TIMECODE_DISPLAY',
          format: TimecodeFormat.SIMPLE_TIME_CONVERSION,
          base: TimecodeBase.STREAM_BASED
        });
      });
    });

    describe('selectSourceBasedTimecode()', () => {
      it('emits the expected request', () => {
        componentUnderTest.selectSourceBasedTimecode();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({
          type: 'CHANGE_TIMECODE_DISPLAY',
          format: TimecodeFormat.SIMPLE_TIME_CONVERSION,
          base: TimecodeBase.SOURCE_BASED
        });
      });
    });

    describe('selectStreamBasedSeconds()', () => {
      it('emits the expected request', () => {
        componentUnderTest.selectStreamBasedSeconds();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({
          type: 'CHANGE_TIMECODE_DISPLAY',
          format: TimecodeFormat.SECONDS,
          base: TimecodeBase.STREAM_BASED
        });
      });
    });
  });
}
