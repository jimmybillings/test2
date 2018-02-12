import { StepButtonComponent } from './step-button.component';
import { Frame } from '../../../../wazee-frame-formatter/index';
import { PlayerState } from '../../../interfaces/player.interface';

export function main() {
  describe('Step Button Component', () => {
    let componentUnderTest: StepButtonComponent;
    let mockPlayerState: any;

    const tests: any = [
      {
        size: '-5s', direction: 'reverse', iconClass: 'five-second', title: 'ASSET.ADV_PLAYER.SKIP_5S_BACK_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromSeconds(5)
      },
      {
        size: '-1s', direction: 'reverse', iconClass: 'one-second', title: 'ASSET.ADV_PLAYER.SKIP_1S_BACK_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromSeconds(1)
      },
      {
        size: '-1f', direction: 'reverse', iconClass: 'one-frame', title: 'ASSET.ADV_PLAYER.SKIP_1F_BACK_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromFrameNumber(1)
      },
      {
        size: '+1f', direction: 'forward', iconClass: 'one-frame', title: 'ASSET.ADV_PLAYER.SKIP_1F_FORWARD_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromSeconds(30).addFrames(-1)
      },
      {
        size: '+1s', direction: 'forward', iconClass: 'one-second', title: 'ASSET.ADV_PLAYER.SKIP_1S_FORWARD_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromSeconds(30 - 1)
      },
      {
        size: '+5s', direction: 'forward', iconClass: 'five-second', title: 'ASSET.ADV_PLAYER.SKIP_5S_FORWARD_BTN_TITLE',
        boundaryFrame: new Frame(29.97).setFromSeconds(30 - 5)
      },
      { size: 'blah', direction: undefined, iconClass: undefined, title: undefined },
      { size: 'x1f', direction: undefined, iconClass: undefined, title: undefined },
      { size: '-7f', direction: undefined, iconClass: undefined, title: undefined },
      { size: '-1z', direction: undefined, iconClass: undefined, title: undefined },
      { size: '+1fgh', direction: undefined, iconClass: undefined, title: undefined }
    ];

    beforeEach(() => {
      mockPlayerState = {
        durationFrame: new Frame(29.97).setFromSeconds(30),
        framesPerSecond: 29.97
      } as PlayerState;

      componentUnderTest = new StepButtonComponent();
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
      componentUnderTest.playerState = mockPlayerState;
    });

    tests.forEach((test: any) => {
      describe(`for size '${test.size}'`, () => {
        beforeEach(() => {
          componentUnderTest.size = test.size;
        });

        it(`sets direction to '${test.direction}'`, () => {
          expect(componentUnderTest.direction).toBe(test.direction);
        });

        it(`sets iconClass to '${test.iconClass}'`, () => {
          expect(componentUnderTest.iconClass).toBe(test.iconClass);
        });

        it(`sets title to '${test.title}'`, () => {
          expect(componentUnderTest.title).toBe(test.title);
        });

        describe('canStep getter', () => {
          describe('when the player state is undefined', () => {
            it('returns false', () => {
              componentUnderTest.playerState = undefined;

              expect(componentUnderTest.canStep).toBe(false);
            });
          });

          describe('when the current frame is undefined', () => {
            it('returns false', () => {
              componentUnderTest.playerState = {} as PlayerState;

              expect(componentUnderTest.canStep).toBe(false);
            });
          });

          describe('when the current frame is at the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign({}, mockPlayerState, { currentFrame: test.boundaryFrame });
            });

            if (test.direction) {
              it('returns true', () => {
                expect(componentUnderTest.canStep).toBe(true);
              });
            } else {
              it('returns false', () => {
                expect(componentUnderTest.canStep).toBe(false);
              });
            }
          });

          describe('when the current frame is before the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign(
                {},
                mockPlayerState,
                { currentFrame: new Frame(29.97).setFromFrameNumber(test.boundaryFrame ? test.boundaryFrame.frameNumber - 1 : 0) }
              );
            });

            if (test.direction === 'reverse') {
              it('returns false', () => {
                expect(componentUnderTest.canStep).toBe(false);
              });
            } else if (test.direction === 'forward') {
              it('returns true', () => {
                expect(componentUnderTest.canStep).toBe(true);
              });
            } else {
              it('returns false', () => {
                expect(componentUnderTest.canStep).toBe(false);
              });
            }
          });

          describe('when the current frame is after the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign(
                {},
                mockPlayerState,
                { currentFrame: new Frame(29.97).setFromFrameNumber(test.boundaryFrame ? test.boundaryFrame.frameNumber + 1 : 0) }
              );
            });

            if (test.direction === 'reverse') {
              it('returns true', () => {
                expect(componentUnderTest.canStep).toBe(true);
              });
            } else if (test.direction === 'forward') {
              it('returns false', () => {
                expect(componentUnderTest.canStep).toBe(false);
              });
            } else {
              it('returns false', () => {
                expect(componentUnderTest.canStep).toBe(false);
              });
            }
          });
        });

        describe('onClick()', () => {
          describe('when the player state is undefined', () => {
            it('does nothing', () => {
              componentUnderTest.playerState = undefined;

              componentUnderTest.onClick();

              expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
            });
          });

          describe('when the current frame is undefined', () => {
            it('does nothing', () => {
              componentUnderTest.playerState = {} as PlayerState;

              componentUnderTest.onClick();

              expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
            });
          });

          describe('when the current frame is at the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign({}, mockPlayerState, { currentFrame: test.boundaryFrame });

              componentUnderTest.onClick();
            });

            if (test.direction === 'reverse') {
              it('requests a seek to frame 0', () => {
                expect(componentUnderTest.request.emit)
                  .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new Frame(29.97).setFromFrameNumber(0) });
              });
            } else if (test.direction === 'forward') {
              it('requests a seek to the final frame', () => {
                expect(componentUnderTest.request.emit)
                  .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new Frame(29.97).setFromFrameNumber(899) });
              });
            } else {
              it('does nothing', () => {
                expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
              });
            }
          });

          describe('when the current frame is before the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign(
                {},
                mockPlayerState,
                { currentFrame: new Frame(29.97).setFromFrameNumber(test.boundaryFrame ? test.boundaryFrame.frameNumber - 1 : 0) }
              );

              componentUnderTest.onClick();
            });

            if (test.direction === 'reverse') {
              it('does nothing', () => {
                expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
              });
            } else if (test.direction === 'forward') {
              it('requests a seek to the final frame minus 1', () => {
                expect(componentUnderTest.request.emit)
                  .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new Frame(29.97).setFromFrameNumber(899 - 1) });
              });
            } else {
              it('does nothing', () => {
                expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
              });
            }
          });

          describe('when the current frame is after the boundary', () => {
            beforeEach(() => {
              componentUnderTest.playerState = Object.assign(
                {},
                mockPlayerState,
                { currentFrame: new Frame(29.97).setFromFrameNumber(test.boundaryFrame ? test.boundaryFrame.frameNumber + 1 : 0) }
              );

              componentUnderTest.onClick();
            });

            if (test.direction === 'reverse') {
              it('requests a seek to frame 1', () => {
                expect(componentUnderTest.request.emit)
                  .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new Frame(29.97).setFromFrameNumber(1) });
              });
            } else if (test.direction === 'forward') {
              it('does nothing', () => {
                expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
              });
            } else {
              it('does nothing', () => {
                expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
              });
            }
          });
        });
      });
    });
  });
}
