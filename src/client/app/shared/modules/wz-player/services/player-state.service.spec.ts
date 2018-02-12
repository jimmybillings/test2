import { PlayerStateService } from './player-state.service';
import { Frame, TimecodeFormat, TimecodeBase } from '../../wazee-frame-formatter/index';
import { PlayerState, PlayerStateChanges } from '../interfaces/player.interface';

export function main() {
  const initialState = (): PlayerState => {
    return {
      ready: false,
      canSupportCustomControls: true,
      playing: false,
      playingMarkers: false,
      playbackSpeed: 1,
      framesPerSecond: 29.97,
      currentFrame: undefined,
      durationFrame: undefined,
      inMarkerFrame: undefined,
      outMarkerFrame: undefined,
      sourceBasedOffset: '00:00:00:00',
      timecodeFormat: TimecodeFormat.SIMPLE_TIME_CONVERSION,
      timecodeBase: TimecodeBase.STREAM_BASED,
      volume: 100,
      changeDetectionEnabler: 0
    };
  };

  const frameNumberFor = (seconds: number, framesPerSecond: number = 29.97): number => {
    return new Frame(framesPerSecond).setFromSeconds(seconds).asFrameNumber();
  };

  describe('Player State Service', () => {
    let serviceUnderTest: PlayerStateService;

    beforeEach(() => {
      serviceUnderTest = new PlayerStateService();
    });

    describe('state getter', () => {
      it('returns an Observable of the current state', () => {
        serviceUnderTest.state.subscribe((state: PlayerState) => {
          expect(state).toEqual(initialState());
        });
      });
    });

    describe('snapshot getter', () => {
      it('returns a one-time copy of the current state', () => {
        expect(serviceUnderTest.snapshot).toEqual(initialState());
      });
    });

    describe('updateWith()', () => {
      const updates: any = [
        { key: 'ready', value: true },
        { key: 'canSupportCustomControls', value: false },
        { key: 'playing', value: true },
        { key: 'playingMarkers', value: true },
        { key: 'playbackSpeed', value: 4 },
        { key: 'framesPerSecond', value: 23.976 },
        { key: 'currentFrame', value: new Frame(29.97).setFromFrameNumber(20) },
        { key: 'durationFrame', value: new Frame(29.97).setFromFrameNumber(21) },
        { key: 'inMarkerFrame', value: new Frame(29.97).setFromFrameNumber(22) },
        { key: 'outMarkerFrame', value: new Frame(29.97).setFromFrameNumber(23) },
        { key: 'sourceBasedOffset', value: '01:02:03:04' },
        { key: 'sourceBasedOffset', value: undefined, expected: '00:00:00:00' },
        { key: 'timecodeFormat', value: TimecodeFormat.SECONDS },
        { key: 'timecodeBase', value: TimecodeBase.SOURCE_BASED },
        { key: 'volume', value: 11 }
      ];

      updates.forEach((update: any) => {
        describe(`for ${update.key}`, () => {
          const updateObject: any = {};
          updateObject[update.key] = update.value;

          const expectedNewState: any = {
            ...initialState(),
            ...updateObject,
            changeDetectionEnabler: 1
          };
          expectedNewState[update.key] = update.expected || update.value;

          it('updates the current state Observable', () => {
            serviceUnderTest.updateWith(updateObject);

            let returnedState: PlayerState;
            serviceUnderTest.state.subscribe((state: PlayerState) => returnedState = state);
            expect(returnedState).toEqual(expectedNewState);
          });

          it('updates the snapshot', () => {
            serviceUnderTest.updateWith(updateObject);

            expect(serviceUnderTest.snapshot).toEqual(expectedNewState);
          });
        });
      });
    });

    describe('reset()', () => {
      it('reverts to the initial state', () => {
        serviceUnderTest.updateWith({ playing: true, duration: 1234.123, currentTime: 173.174 });

        serviceUnderTest.reset();

        expect(serviceUnderTest.snapshot).toEqual(initialState());
      });
    });

    describe('Interdependencies', () => {
      describe('Updating with currentTime', () => {
        it('causes currentFrame to be updated', () => {
          serviceUnderTest.updateWith({ currentTime: 42.43 });

          expect(serviceUnderTest.snapshot.currentFrame.frameNumber).toBe(frameNumberFor(42.43));
        });
      });

      describe('Updating with duration', () => {
        it('causes durationFrame to be updated', () => {
          serviceUnderTest.updateWith({ duration: 24.25 });

          expect(serviceUnderTest.snapshot.durationFrame.frameNumber).toBe(frameNumberFor(24.25));
        });
      });

      describe('Updating with inMarker', () => {
        it('causes inMarkerFrame to be updated', () => {
          serviceUnderTest.updateWith({ inMarker: 1.23 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(frameNumberFor(1.23));
        });
      });

      describe('Updating with outMarker', () => {
        it('causes outMarkerFrame to be updated', () => {
          serviceUnderTest.updateWith({ outMarker: 4.56 });

          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(frameNumberFor(4.56));
        });

        it('moves in marker if new out marker is before old in marker', () => {
          serviceUnderTest.updateWith({ inMarker: 10 });

          serviceUnderTest.updateWith({ outMarker: 7 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(frameNumberFor(7));
          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(frameNumberFor(7));
        });
      });

      describe('Updating with inMarker and outMarker undefined', () => {
        it('causes inMarkerFrame and outMarkerFrame to be cleared', () => {
          serviceUnderTest.updateWith({ inMarker: 1.23 });
          serviceUnderTest.updateWith({ outMarker: 4.56 });

          serviceUnderTest.updateWith({ inMarker: undefined, outMarker: undefined });

          expect(serviceUnderTest.snapshot.inMarkerFrame).toBeUndefined();
          expect(serviceUnderTest.snapshot.outMarkerFrame).toBeUndefined();
        });
      });

      describe('Updating with inMarkerFrameNumber', () => {
        it('causes inMarkerFrame to be updated', () => {
          serviceUnderTest.updateWith({ inMarkerFrameNumber: 6.78 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(6.78);
        });

        it('moves out marker if new in marker is after old out marker', () => {
          serviceUnderTest.updateWith({ outMarker: 15 });

          serviceUnderTest.updateWith({ inMarker: 20 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(frameNumberFor(20));
          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(frameNumberFor(20));
        });
      });

      describe('Updating with outMarkerFrameNumber', () => {
        it('causes outMarkerFrame to be updated', () => {
          serviceUnderTest.updateWith({ outMarkerFrameNumber: 7.89 });

          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(7.89);
        });
      });

      describe('Updating both inMarker and outMarker', () => {
        it('sets as expected if markers are in order', () => {
          serviceUnderTest.updateWith({ inMarker: 2, outMarker: 3 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(frameNumberFor(2));
          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(frameNumberFor(3));
        });

        it('moves out to in if markers are out of order', () => {
          serviceUnderTest.updateWith({ inMarker: 5, outMarker: 4 });

          expect(serviceUnderTest.snapshot.inMarkerFrame.frameNumber).toBe(frameNumberFor(5));
          expect(serviceUnderTest.snapshot.outMarkerFrame.frameNumber).toBe(frameNumberFor(5));
        });
      });
    });

    describe('Source-based offset', () => {
      it('defaults as expected when not specified', () => {
        serviceUnderTest.updateWith({ currentTime: 42.43 });

        expect(serviceUnderTest.snapshot.currentFrame.sourceBasedOffsetFrames).toBe(0);
      });

      it('is used as expected when specified', () => {
        serviceUnderTest.updateWith({ currentTime: 42.43, sourceBasedOffset: '00:00:01:00' });

        expect(serviceUnderTest.snapshot.currentFrame.sourceBasedOffsetFrames).toBe(30);
      });
    });
  });
}
