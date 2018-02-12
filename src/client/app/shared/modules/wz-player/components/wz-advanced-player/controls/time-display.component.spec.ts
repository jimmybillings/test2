import { TimeDisplayComponent } from './time-display.component';
import { componentFactoryName } from '@angular/compiler/compiler';
import { Frame, TimecodeFormat } from '../../../../wazee-frame-formatter/index';
import { Pojo } from '../../../../../interfaces/common.interface';

export function main() {
  describe('Time Display Component', () => {
    let componentUnderTest: TimeDisplayComponent;
    let focused: boolean = false;
    let mockKeyboardEvent: any;

    beforeEach(() => {
      componentUnderTest = new TimeDisplayComponent();
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
      componentUnderTest.timeInput = {
        nativeElement: {
          value: '01:02:03;04',
          focus: () => focused = true,
          blur: () => focused = false
        }
      } as any;

      // We want to simulate the fact that clicking on the input sets it to focused, but also call the
      // real handler without otherwise interfering with it.
      const realHandler: Function = componentUnderTest.onTimeInputClick.bind(componentUnderTest);
      spyOn(componentUnderTest, 'onTimeInputClick').and.callFake(() => {
        focused = true;
        realHandler();
      });

      mockKeyboardEvent = {
        key: '',
        preventDefault: jasmine.createSpy('preventDefault')
      };
    });

    describe('playerState setter', () => {
      // Note: Other specs for playerState changes and editing mode are in the 'onTimeInputClick()' section below.
      it('(generally) cancels editing mode', () => {
        simulateAlreadyEditing();

        componentUnderTest.playerState = { some: 'state' } as any;

        expectEditingModeToBeInactiveWithFocusedSetTo(false);
      });

      it('updates the current frame', () => {
        let updatedCurrentFrame: Frame = null;
        componentUnderTest.currentFrame.subscribe(newFrame => updatedCurrentFrame = newFrame);

        componentUnderTest.playerState = { currentFrame: new Frame(30).setFromFrameNumber(123) } as any;

        expect(updatedCurrentFrame).toEqual(new Frame(30).setFromFrameNumber(123));
      });
    });

    describe('playerState getter', () => {
      it('returns the current player state', () => {
        componentUnderTest.playerState = { some: 'state' } as any;

        expect(componentUnderTest.playerState).toEqual({ some: 'state' });
      });
    });

    describe('editing getter', () => {
      it('returns false when not editing', () => {
        expect(componentUnderTest.editing).toBe(false);
      });

      it('returns true when editing', () => {
        simulateAlreadyEditing();

        expect(componentUnderTest.editing).toBe(true);
      });
    });

    describe('durationFrame getter', () => {
      it('returns the current player state\'s durationFrame property', () => {
        componentUnderTest.playerState = { durationFrame: { some: 'frame' } } as any;

        expect(componentUnderTest.durationFrame).toEqual({ some: 'frame' });
      });
    });

    describe('timeInputTitleTranslationKey getter', () => {
      it('returns the expected string when not editing', () => {
        expect(componentUnderTest.timeInputTitleTranslationKey).toBe('ASSET.ADV_PLAYER.TIME_DISPLAY.MAIN_TITLE');
      });

      it('returns the empty string when editing', () => {
        simulateAlreadyEditing();

        expect(componentUnderTest.timeInputTitleTranslationKey).toBe('');
      });
    });

    describe('canApply getter', () => {
      beforeEach(() => {
        simulateAlreadyEditing();
      });

      it('returns false when the input is empty', () => {
        componentUnderTest.timeInput.nativeElement.value = '';

        expect(componentUnderTest.canApply).toBe(false);
      });

      it('returns false when the input hasn\'t changed', () => {
        componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';

        expect(componentUnderTest.canApply).toBe(false);
      });

      it('returns false when the input is invalid', () => {
        componentUnderTest.timeInput.nativeElement.value = 'xyz';

        expect(componentUnderTest.canApply).toBe(false);
      });

      it('returns false when the input is the same as the current value, but without colons', () => {
        componentUnderTest.timeInput.nativeElement.value = '01020304';

        expect(componentUnderTest.canApply).toBe(false);
      });

      it('returns true when the input is non-empty, is valid, and has changed', () => {
        componentUnderTest.timeInput.nativeElement.value = '01:02';

        expect(componentUnderTest.canApply).toBe(true);
      });
    });

    describe('isEmpty getter', () => {
      it('returns true when the input is empty', () => {
        componentUnderTest.timeInput.nativeElement.value = '';

        expect(componentUnderTest.isEmpty).toBe(true);
      });

      it('returns false when the input is not empty', () => {
        componentUnderTest.timeInput.nativeElement.value = '1';

        expect(componentUnderTest.isEmpty).toBe(false);
      });
    });

    describe('containerClass getter', () => {
      it('returns the empty string when not editing', () => {
        expect(componentUnderTest.containerClass).toBe('');
      });

      it('returns \'editing\' when editing', () => {
        simulateAlreadyEditing();

        expect(componentUnderTest.containerClass).toBe('editing');
      });
    });

    describe('onTimeInputClick()', () => {
      describe('when not yet editing', () => {
        describe('when playing', () => {
          beforeEach(() => {
            componentUnderTest.playerState = { playing: true } as any;
          });

          it('emits a player pause request', () => {
            componentUnderTest.onTimeInputClick();

            expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'PAUSE' });
          });

          it('does not immediately set editing mode', () => {
            componentUnderTest.onTimeInputClick();

            expectEditingModeToBeInactiveWithFocusedSetTo(true);
          });

          it('does not set editing mode when player state is updated but is still not paused', () => {
            componentUnderTest.onTimeInputClick();
            componentUnderTest.playerState = { playing: true, whatever: 'else' } as any;

            expectEditingModeToBeInactiveWithFocusedSetTo(true);
          });

          it('sets editing mode once player state is updated and is paused', () => {
            componentUnderTest.onTimeInputClick();
            componentUnderTest.playerState = { playing: false } as any;

            expectEditingModeToBeActive();
          });
        });

        describe('when paused', () => {
          beforeEach(() => {
            componentUnderTest.playerState = { playing: false } as any;
          });

          it('does not emit any player requests', () => {
            componentUnderTest.onTimeInputClick();

            expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
          });

          it('sets editing mode', () => {
            componentUnderTest.onTimeInputClick();

            expectEditingModeToBeActive();
          });
        });
      });

      describe('when already editing', () => {
        beforeEach(simulateAlreadyEditing);

        it('does not emit any player requests', () => {
          componentUnderTest.onTimeInputClick();

          expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
        });

        it('does not affect editing mode', () => {
          componentUnderTest.onTimeInputClick();

          expectEditingModeToBeActive();
        });
      });
    });

    describe('onKeyDown()', () => {
      beforeEach(simulateAlreadyEditing);

      describe('without Control or Meta key down', () => {
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Control', 'Meta'].forEach(key => {
          it(`passes '${key}' through`, () => {
            expectKeyDownToPassThroughFor(key);
          });
        });

        it(`suppresses 'Enter' and does not apply the input when it is empty`, () => {
          componentUnderTest.timeInput.nativeElement.value = '';

          expectKeyDownToBeSuppressedFor('Enter');
          expectEditingModeToBeActive();
        });

        it(`suppresses 'Enter' and does not apply the input when it hasn't changed`, () => {
          componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';

          expectKeyDownToBeSuppressedFor('Enter');
          expectEditingModeToBeActive();
        });

        it(`suppresses 'Enter' and does not apply the input when it is invalid`, () => {
          componentUnderTest.timeInput.nativeElement.value = 'xyz';

          expectKeyDownToBeSuppressedFor('Enter');
          expectEditingModeToBeActive();
        });

        it(`suppresses 'Enter' and does not apply the input when it is the same value, but without colons`, () => {
          componentUnderTest.timeInput.nativeElement.value = '01020304';

          expectKeyDownToBeSuppressedFor('Enter');
          expectEditingModeToBeActive();
        });

        it(`suppresses 'Enter' and applies the input when it is non-empty, is valid, and has changed`, () => {
          componentUnderTest.timeInput.nativeElement.value = '1:02';

          expectKeyDownToBeSuppressedFor('Enter');
          expectInputValueToHaveBeenAppliedAs('1:02');
        });

        it(`suppresses 'Escape' and cancels edit mode`, () => {
          expectKeyDownToBeSuppressedFor('Escape');
          expectEditingModeToBeInactiveWithFocusedSetTo(false);
        });

        ['c', 'C'].forEach(character => {
          it(`suppresses '${character}' and clears the input`, () => {
            expectKeyDownToBeSuppressedFor(character);
            expectEditingModeToBeActive();
            expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
          });
        });

        describe('when in timecode mode', () => {
          '0123456789:;'.split('').forEach(character => {
            it(`passes through '${character}'`, () => {
              expectKeyDownToPassThroughFor(character);
            });
          });

          // Note: We're not testing all the suppressed keys here.  Just a couple.
          '.a'.split('').forEach(character => {
            it(`suppresses '${character}'`, () => {
              expectKeyDownToBeSuppressedFor(character);
            });
          });
        });

        describe('when in seconds mode', () => {
          beforeEach(() => {
            simulateAlreadyEditingWithState({ timecodeFormat: TimecodeFormat.SECONDS });
          });

          '0123456789.'.split('').forEach(character => {
            it(`passes through '${character}'`, () => {
              expectKeyDownToPassThroughFor(character);
            });
          });

          // Note: We're not testing all the suppressed keys here.  Just a couple.
          ':;a'.split('').forEach(character => {
            it(`suppresses '${character}'`, () => {
              expectKeyDownToBeSuppressedFor(character);
            });
          });
        });
      });

      // 'Control' for Windows CONTROL key, 'Meta' for Mac COMMAND key.  (Yeah, THAT makes sense.)
      ['Control', 'Meta'].forEach(controlKey => {
        describe(`with ${controlKey} key down`, () => {
          beforeEach(() => {
            simulateKeyDownFor(controlKey);
          });

          ['a', 'c', 'v', 'x', 'z'].forEach(key => {
            it(`passes '${key}' through`, () => {
              expectKeyDownToPassThroughFor(key);
            });
          });

          // Note: We're not testing all the suppressed keys here.  Just one.
          it(`suppresses 'b'`, () => {
            expectKeyDownToBeSuppressedFor('b');
          });
        });
      });
    });

    describe('onKeyUp()', () => {
      ['Control', 'Meta'].forEach(controlKey => {
        it('properly switches out of control mode', () => {
          simulateAlreadyEditing();

          // User presses control key down.
          expectKeyDownToPassThroughFor(controlKey);

          // User presses 'c' key down.  CONTROL-C is allowed.
          expectKeyDownToPassThroughFor('c');

          // Input value doesn't change for CONTROL-C.
          expect(componentUnderTest.timeInput.nativeElement.value).toBe('1');

          // User releases control key, which is what we're actually testing.
          mockKeyboardEvent.key = controlKey;
          componentUnderTest.onKeyUp(mockKeyboardEvent);

          // User presses 'c' key down.  'c' clears the input, but is otherwise suppressed.
          expectKeyDownToBeSuppressedFor('c');

          // Prove that this was 'c' and not CONTROL-C.
          expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
        });
      });
    });

    describe('onApplyButtonClick()', () => {
      beforeEach(simulateAlreadyEditing);

      it(`does not apply the input when it is empty`, () => {
        componentUnderTest.timeInput.nativeElement.value = '';

        componentUnderTest.onApplyButtonClick();

        expectEditingModeToBeActive();
      });

      it(`does not apply the input when it hasn't changed`, () => {
        componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';

        componentUnderTest.onApplyButtonClick();

        expectEditingModeToBeActive();
      });

      it(`does not apply the input when it is invalid`, () => {
        componentUnderTest.timeInput.nativeElement.value = 'xyz';

        componentUnderTest.onApplyButtonClick();

        expectEditingModeToBeActive();
      });

      it(`does not apply the input when it is the same value, but without colons`, () => {
        componentUnderTest.timeInput.nativeElement.value = '01020304';

        componentUnderTest.onApplyButtonClick();

        expectEditingModeToBeActive();
      });

      it(`applies the input when it is non-empty, is valid, and has changed`, () => {
        componentUnderTest.timeInput.nativeElement.value = '1:02';

        componentUnderTest.onApplyButtonClick();

        expectInputValueToHaveBeenAppliedAs('1:02');
      });
    });

    describe('onClearButtonClick()', () => {
      it('clears the input field', () => {
        simulateAlreadyEditing();

        componentUnderTest.onClearButtonClick();

        expectEditingModeToBeActive();
        expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
      });
    });

    describe('onCancelButtonClick()', () => {
      it('cancels editing mode', () => {
        simulateAlreadyEditing();

        componentUnderTest.onCancelButtonClick();

        expectEditingModeToBeInactiveWithFocusedSetTo(false);
      });
    });

    //// Test helpers from here down.

    function simulateAlreadyEditing(): void {
      simulateAlreadyEditingWithState({});
    }

    function simulateAlreadyEditingWithState(state: Pojo): void {
      componentUnderTest.playerState = { ...state, playing: false } as any;
      componentUnderTest.onTimeInputClick();
      componentUnderTest.timeInput.nativeElement.value = '1';
    }

    function expectEditingModeToBeActive(): void {
      expect(componentUnderTest.editing).toBe(true);
      expect(focused).toBe(true);
    }

    function expectEditingModeToBeInactiveWithFocusedSetTo(expectedFocusedValue: boolean): void {
      expect(componentUnderTest.editing).toBe(false);
      expect(focused).toBe(expectedFocusedValue);
      expect(componentUnderTest.timeInput.nativeElement.value).toBe('01:02:03;04');
    }

    function expectInputValueToHaveBeenAppliedAs(timeString: string): void {
      expect(componentUnderTest.editing).toBe(false);
      expect(focused).toBe(false);
      expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_TIME_STRING', time: timeString });
    }

    function simulateKeyDownFor(key: string): void {
      mockKeyboardEvent.key = key;
      componentUnderTest.onKeyDown(mockKeyboardEvent);
    }

    function expectKeyDownToPassThroughFor(key: string): void {
      simulateKeyDownFor(key);

      expect(mockKeyboardEvent.preventDefault).not.toHaveBeenCalled();
    }

    function expectKeyDownToBeSuppressedFor(key: string): void {
      simulateKeyDownFor(key);

      expect(mockKeyboardEvent.preventDefault).toHaveBeenCalled();
    }
  });
}
