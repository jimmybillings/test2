"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var time_display_component_1 = require("./time-display.component");
var index_1 = require("../../../../wazee-frame-formatter/index");
function main() {
    describe('Time Display Component', function () {
        var componentUnderTest;
        var focused = false;
        var mockKeyboardEvent;
        beforeEach(function () {
            componentUnderTest = new time_display_component_1.TimeDisplayComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
            componentUnderTest.timeInput = {
                nativeElement: {
                    value: '01:02:03;04',
                    focus: function () { return focused = true; },
                    blur: function () { return focused = false; }
                }
            };
            var realHandler = componentUnderTest.onTimeInputClick.bind(componentUnderTest);
            spyOn(componentUnderTest, 'onTimeInputClick').and.callFake(function () {
                focused = true;
                realHandler();
            });
            mockKeyboardEvent = {
                key: '',
                preventDefault: jasmine.createSpy('preventDefault')
            };
        });
        describe('playerState setter', function () {
            it('(generally) cancels editing mode', function () {
                simulateAlreadyEditing();
                componentUnderTest.playerState = { some: 'state' };
                expectEditingModeToBeInactiveWithFocusedSetTo(false);
            });
            it('updates the current frame', function () {
                var updatedCurrentFrame = null;
                componentUnderTest.currentFrame.subscribe(function (newFrame) { return updatedCurrentFrame = newFrame; });
                componentUnderTest.playerState = { currentFrame: new index_1.Frame(30).setFromFrameNumber(123) };
                expect(updatedCurrentFrame).toEqual(new index_1.Frame(30).setFromFrameNumber(123));
            });
        });
        describe('playerState getter', function () {
            it('returns the current player state', function () {
                componentUnderTest.playerState = { some: 'state' };
                expect(componentUnderTest.playerState).toEqual({ some: 'state' });
            });
        });
        describe('editing getter', function () {
            it('returns false when not editing', function () {
                expect(componentUnderTest.editing).toBe(false);
            });
            it('returns true when editing', function () {
                simulateAlreadyEditing();
                expect(componentUnderTest.editing).toBe(true);
            });
        });
        describe('durationFrame getter', function () {
            it('returns the current player state\'s durationFrame property', function () {
                componentUnderTest.playerState = { durationFrame: { some: 'frame' } };
                expect(componentUnderTest.durationFrame).toEqual({ some: 'frame' });
            });
        });
        describe('timeInputTitleTranslationKey getter', function () {
            it('returns the expected string when not editing', function () {
                expect(componentUnderTest.timeInputTitleTranslationKey).toBe('ASSET.ADV_PLAYER.TIME_DISPLAY.MAIN_TITLE');
            });
            it('returns the empty string when editing', function () {
                simulateAlreadyEditing();
                expect(componentUnderTest.timeInputTitleTranslationKey).toBe('');
            });
        });
        describe('canApply getter', function () {
            beforeEach(function () {
                simulateAlreadyEditing();
            });
            it('returns false when the input is empty', function () {
                componentUnderTest.timeInput.nativeElement.value = '';
                expect(componentUnderTest.canApply).toBe(false);
            });
            it('returns false when the input hasn\'t changed', function () {
                componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';
                expect(componentUnderTest.canApply).toBe(false);
            });
            it('returns false when the input is invalid', function () {
                componentUnderTest.timeInput.nativeElement.value = 'xyz';
                expect(componentUnderTest.canApply).toBe(false);
            });
            it('returns false when the input is the same as the current value, but without colons', function () {
                componentUnderTest.timeInput.nativeElement.value = '01020304';
                expect(componentUnderTest.canApply).toBe(false);
            });
            it('returns true when the input is non-empty, is valid, and has changed', function () {
                componentUnderTest.timeInput.nativeElement.value = '01:02';
                expect(componentUnderTest.canApply).toBe(true);
            });
        });
        describe('isEmpty getter', function () {
            it('returns true when the input is empty', function () {
                componentUnderTest.timeInput.nativeElement.value = '';
                expect(componentUnderTest.isEmpty).toBe(true);
            });
            it('returns false when the input is not empty', function () {
                componentUnderTest.timeInput.nativeElement.value = '1';
                expect(componentUnderTest.isEmpty).toBe(false);
            });
        });
        describe('containerClass getter', function () {
            it('returns the empty string when not editing', function () {
                expect(componentUnderTest.containerClass).toBe('');
            });
            it('returns \'editing\' when editing', function () {
                simulateAlreadyEditing();
                expect(componentUnderTest.containerClass).toBe('editing');
            });
        });
        describe('onTimeInputClick()', function () {
            describe('when not yet editing', function () {
                describe('when playing', function () {
                    beforeEach(function () {
                        componentUnderTest.playerState = { playing: true };
                    });
                    it('emits a player pause request', function () {
                        componentUnderTest.onTimeInputClick();
                        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'PAUSE' });
                    });
                    it('does not immediately set editing mode', function () {
                        componentUnderTest.onTimeInputClick();
                        expectEditingModeToBeInactiveWithFocusedSetTo(true);
                    });
                    it('does not set editing mode when player state is updated but is still not paused', function () {
                        componentUnderTest.onTimeInputClick();
                        componentUnderTest.playerState = { playing: true, whatever: 'else' };
                        expectEditingModeToBeInactiveWithFocusedSetTo(true);
                    });
                    it('sets editing mode once player state is updated and is paused', function () {
                        componentUnderTest.onTimeInputClick();
                        componentUnderTest.playerState = { playing: false };
                        expectEditingModeToBeActive();
                    });
                });
                describe('when paused', function () {
                    beforeEach(function () {
                        componentUnderTest.playerState = { playing: false };
                    });
                    it('does not emit any player requests', function () {
                        componentUnderTest.onTimeInputClick();
                        expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
                    });
                    it('sets editing mode', function () {
                        componentUnderTest.onTimeInputClick();
                        expectEditingModeToBeActive();
                    });
                });
            });
            describe('when already editing', function () {
                beforeEach(simulateAlreadyEditing);
                it('does not emit any player requests', function () {
                    componentUnderTest.onTimeInputClick();
                    expect(componentUnderTest.request.emit).not.toHaveBeenCalled();
                });
                it('does not affect editing mode', function () {
                    componentUnderTest.onTimeInputClick();
                    expectEditingModeToBeActive();
                });
            });
        });
        describe('onKeyDown()', function () {
            beforeEach(simulateAlreadyEditing);
            describe('without Control or Meta key down', function () {
                ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Control', 'Meta'].forEach(function (key) {
                    it("passes '" + key + "' through", function () {
                        expectKeyDownToPassThroughFor(key);
                    });
                });
                it("suppresses 'Enter' and does not apply the input when it is empty", function () {
                    componentUnderTest.timeInput.nativeElement.value = '';
                    expectKeyDownToBeSuppressedFor('Enter');
                    expectEditingModeToBeActive();
                });
                it("suppresses 'Enter' and does not apply the input when it hasn't changed", function () {
                    componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';
                    expectKeyDownToBeSuppressedFor('Enter');
                    expectEditingModeToBeActive();
                });
                it("suppresses 'Enter' and does not apply the input when it is invalid", function () {
                    componentUnderTest.timeInput.nativeElement.value = 'xyz';
                    expectKeyDownToBeSuppressedFor('Enter');
                    expectEditingModeToBeActive();
                });
                it("suppresses 'Enter' and does not apply the input when it is the same value, but without colons", function () {
                    componentUnderTest.timeInput.nativeElement.value = '01020304';
                    expectKeyDownToBeSuppressedFor('Enter');
                    expectEditingModeToBeActive();
                });
                it("suppresses 'Enter' and applies the input when it is non-empty, is valid, and has changed", function () {
                    componentUnderTest.timeInput.nativeElement.value = '1:02';
                    expectKeyDownToBeSuppressedFor('Enter');
                    expectInputValueToHaveBeenAppliedAs('1:02');
                });
                it("suppresses 'Escape' and cancels edit mode", function () {
                    expectKeyDownToBeSuppressedFor('Escape');
                    expectEditingModeToBeInactiveWithFocusedSetTo(false);
                });
                ['c', 'C'].forEach(function (character) {
                    it("suppresses '" + character + "' and clears the input", function () {
                        expectKeyDownToBeSuppressedFor(character);
                        expectEditingModeToBeActive();
                        expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
                    });
                });
                describe('when in timecode mode', function () {
                    '0123456789:;'.split('').forEach(function (character) {
                        it("passes through '" + character + "'", function () {
                            expectKeyDownToPassThroughFor(character);
                        });
                    });
                    '.a'.split('').forEach(function (character) {
                        it("suppresses '" + character + "'", function () {
                            expectKeyDownToBeSuppressedFor(character);
                        });
                    });
                });
                describe('when in seconds mode', function () {
                    beforeEach(function () {
                        simulateAlreadyEditingWithState({ timecodeFormat: index_1.TimecodeFormat.SECONDS });
                    });
                    '0123456789.'.split('').forEach(function (character) {
                        it("passes through '" + character + "'", function () {
                            expectKeyDownToPassThroughFor(character);
                        });
                    });
                    ':;a'.split('').forEach(function (character) {
                        it("suppresses '" + character + "'", function () {
                            expectKeyDownToBeSuppressedFor(character);
                        });
                    });
                });
            });
            ['Control', 'Meta'].forEach(function (controlKey) {
                describe("with " + controlKey + " key down", function () {
                    beforeEach(function () {
                        simulateKeyDownFor(controlKey);
                    });
                    ['a', 'c', 'v', 'x', 'z'].forEach(function (key) {
                        it("passes '" + key + "' through", function () {
                            expectKeyDownToPassThroughFor(key);
                        });
                    });
                    it("suppresses 'b'", function () {
                        expectKeyDownToBeSuppressedFor('b');
                    });
                });
            });
        });
        describe('onKeyUp()', function () {
            ['Control', 'Meta'].forEach(function (controlKey) {
                it('properly switches out of control mode', function () {
                    simulateAlreadyEditing();
                    expectKeyDownToPassThroughFor(controlKey);
                    expectKeyDownToPassThroughFor('c');
                    expect(componentUnderTest.timeInput.nativeElement.value).toBe('1');
                    mockKeyboardEvent.key = controlKey;
                    componentUnderTest.onKeyUp(mockKeyboardEvent);
                    expectKeyDownToBeSuppressedFor('c');
                    expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
                });
            });
        });
        describe('onApplyButtonClick()', function () {
            beforeEach(simulateAlreadyEditing);
            it("does not apply the input when it is empty", function () {
                componentUnderTest.timeInput.nativeElement.value = '';
                componentUnderTest.onApplyButtonClick();
                expectEditingModeToBeActive();
            });
            it("does not apply the input when it hasn't changed", function () {
                componentUnderTest.timeInput.nativeElement.value = '01:02:03;04';
                componentUnderTest.onApplyButtonClick();
                expectEditingModeToBeActive();
            });
            it("does not apply the input when it is invalid", function () {
                componentUnderTest.timeInput.nativeElement.value = 'xyz';
                componentUnderTest.onApplyButtonClick();
                expectEditingModeToBeActive();
            });
            it("does not apply the input when it is the same value, but without colons", function () {
                componentUnderTest.timeInput.nativeElement.value = '01020304';
                componentUnderTest.onApplyButtonClick();
                expectEditingModeToBeActive();
            });
            it("applies the input when it is non-empty, is valid, and has changed", function () {
                componentUnderTest.timeInput.nativeElement.value = '1:02';
                componentUnderTest.onApplyButtonClick();
                expectInputValueToHaveBeenAppliedAs('1:02');
            });
        });
        describe('onClearButtonClick()', function () {
            it('clears the input field', function () {
                simulateAlreadyEditing();
                componentUnderTest.onClearButtonClick();
                expectEditingModeToBeActive();
                expect(componentUnderTest.timeInput.nativeElement.value).toBe('');
            });
        });
        describe('onCancelButtonClick()', function () {
            it('cancels editing mode', function () {
                simulateAlreadyEditing();
                componentUnderTest.onCancelButtonClick();
                expectEditingModeToBeInactiveWithFocusedSetTo(false);
            });
        });
        function simulateAlreadyEditing() {
            simulateAlreadyEditingWithState({});
        }
        function simulateAlreadyEditingWithState(state) {
            componentUnderTest.playerState = __assign({}, state, { playing: false });
            componentUnderTest.onTimeInputClick();
            componentUnderTest.timeInput.nativeElement.value = '1';
        }
        function expectEditingModeToBeActive() {
            expect(componentUnderTest.editing).toBe(true);
            expect(focused).toBe(true);
        }
        function expectEditingModeToBeInactiveWithFocusedSetTo(expectedFocusedValue) {
            expect(componentUnderTest.editing).toBe(false);
            expect(focused).toBe(expectedFocusedValue);
            expect(componentUnderTest.timeInput.nativeElement.value).toBe('01:02:03;04');
        }
        function expectInputValueToHaveBeenAppliedAs(timeString) {
            expect(componentUnderTest.editing).toBe(false);
            expect(focused).toBe(false);
            expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_TIME_STRING', time: timeString });
        }
        function simulateKeyDownFor(key) {
            mockKeyboardEvent.key = key;
            componentUnderTest.onKeyDown(mockKeyboardEvent);
        }
        function expectKeyDownToPassThroughFor(key) {
            simulateKeyDownFor(key);
            expect(mockKeyboardEvent.preventDefault).not.toHaveBeenCalled();
        }
        function expectKeyDownToBeSuppressedFor(key) {
            simulateKeyDownFor(key);
            expect(mockKeyboardEvent.preventDefault).toHaveBeenCalled();
        }
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdGltZS1kaXNwbGF5LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtRUFBZ0U7QUFFaEUsaUVBQWdGO0FBR2hGO0lBQ0UsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQUksa0JBQXdDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO1FBQzdCLElBQUksaUJBQXNCLENBQUM7UUFFM0IsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSw2Q0FBb0IsRUFBRSxDQUFDO1lBQ2hELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZFLGtCQUFrQixDQUFDLFNBQVMsR0FBRztnQkFDN0IsYUFBYSxFQUFFO29CQUNiLEtBQUssRUFBRSxhQUFhO29CQUNwQixLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sR0FBRyxJQUFJLEVBQWQsQ0FBYztvQkFDM0IsSUFBSSxFQUFFLGNBQU0sT0FBQSxPQUFPLEdBQUcsS0FBSyxFQUFmLENBQWU7aUJBQzVCO2FBQ0ssQ0FBQztZQUlULElBQU0sV0FBVyxHQUFhLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzNGLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3pELE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQkFBaUIsR0FBRztnQkFDbEIsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7YUFDcEQsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBRTdCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMsc0JBQXNCLEVBQUUsQ0FBQztnQkFFekIsa0JBQWtCLENBQUMsV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBUyxDQUFDO2dCQUUxRCw2Q0FBNkMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtnQkFDOUIsSUFBSSxtQkFBbUIsR0FBVSxJQUFJLENBQUM7Z0JBQ3RDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxtQkFBbUIsR0FBRyxRQUFRLEVBQTlCLENBQThCLENBQUMsQ0FBQztnQkFFdEYsa0JBQWtCLENBQUMsV0FBVyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxFQUFTLENBQUM7Z0JBRWhHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO2dCQUNyQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFTLENBQUM7Z0JBRTFELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtnQkFDOUIsc0JBQXNCLEVBQUUsQ0FBQztnQkFFekIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyw0REFBNEQsRUFBRTtnQkFDL0Qsa0JBQWtCLENBQUMsV0FBVyxHQUFHLEVBQUUsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFTLENBQUM7Z0JBRTdFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHFDQUFxQyxFQUFFO1lBQzlDLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDM0csQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7Z0JBQzFDLHNCQUFzQixFQUFFLENBQUM7Z0JBRXpCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLFVBQVUsQ0FBQztnQkFDVCxzQkFBc0IsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO2dCQUMxQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBRXRELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsOENBQThDLEVBQUU7Z0JBQ2pELGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztnQkFFakUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtnQkFDNUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUV6RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLG1GQUFtRixFQUFFO2dCQUN0RixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBRTlELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUU7Z0JBQ3hFLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFFM0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDekMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUV0RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO2dCQUM5QyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBRXZELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxFQUFFLENBQUMsMkNBQTJDLEVBQUU7Z0JBQzlDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsa0NBQWtDLEVBQUU7Z0JBQ3JDLHNCQUFzQixFQUFFLENBQUM7Z0JBRXpCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixRQUFRLENBQUMsc0JBQXNCLEVBQUU7Z0JBQy9CLFFBQVEsQ0FBQyxjQUFjLEVBQUU7b0JBQ3ZCLFVBQVUsQ0FBQzt3QkFDVCxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFTLENBQUM7b0JBQzVELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTt3QkFDakMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFFdEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNsRixDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7d0JBQzFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBRXRDLDZDQUE2QyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0RCxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsZ0ZBQWdGLEVBQUU7d0JBQ25GLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3RDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBUyxDQUFDO3dCQUU1RSw2Q0FBNkMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLDhEQUE4RCxFQUFFO3dCQUNqRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN0QyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFTLENBQUM7d0JBRTNELDJCQUEyQixFQUFFLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLFVBQVUsQ0FBQzt3QkFDVCxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFTLENBQUM7b0JBQzdELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTt3QkFDdEMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFFdEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDakUsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFO3dCQUN0QixrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUV0QywyQkFBMkIsRUFBRSxDQUFDO29CQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO2dCQUMvQixVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFFbkMsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO29CQUN0QyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUV0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNqRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7b0JBQ2pDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBRXRDLDJCQUEyQixFQUFFLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFbkMsUUFBUSxDQUFDLGtDQUFrQyxFQUFFO2dCQUMzQyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUM5RixFQUFFLENBQUMsYUFBVyxHQUFHLGNBQVcsRUFBRTt3QkFDNUIsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRTtvQkFDckUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUV0RCw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO29CQUMzRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7b0JBRWpFLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QywyQkFBMkIsRUFBRSxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsb0VBQW9FLEVBQUU7b0JBQ3ZFLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFFekQsOEJBQThCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLDJCQUEyQixFQUFFLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywrRkFBK0YsRUFBRTtvQkFDbEcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO29CQUU5RCw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDBGQUEwRixFQUFFO29CQUM3RixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7b0JBRTFELDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxtQ0FBbUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO29CQUM5Qyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekMsNkNBQTZDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2dCQUVILENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7b0JBQzFCLEVBQUUsQ0FBQyxpQkFBZSxTQUFTLDJCQUF3QixFQUFFO3dCQUNuRCw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDMUMsMkJBQTJCLEVBQUUsQ0FBQzt3QkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwRSxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7b0JBQ2hDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUzt3QkFDeEMsRUFBRSxDQUFDLHFCQUFtQixTQUFTLE1BQUcsRUFBRTs0QkFDbEMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUdILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUzt3QkFDOUIsRUFBRSxDQUFDLGlCQUFlLFNBQVMsTUFBRyxFQUFFOzRCQUM5Qiw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO29CQUMvQixVQUFVLENBQUM7d0JBQ1QsK0JBQStCLENBQUMsRUFBRSxjQUFjLEVBQUUsc0JBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUM5RSxDQUFDLENBQUMsQ0FBQztvQkFFSCxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7d0JBQ3ZDLEVBQUUsQ0FBQyxxQkFBbUIsU0FBUyxNQUFHLEVBQUU7NEJBQ2xDLDZCQUE2QixDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMzQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFHSCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7d0JBQy9CLEVBQUUsQ0FBQyxpQkFBZSxTQUFTLE1BQUcsRUFBRTs0QkFDOUIsOEJBQThCLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzVDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFHSCxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUNwQyxRQUFRLENBQUMsVUFBUSxVQUFVLGNBQVcsRUFBRTtvQkFDdEMsVUFBVSxDQUFDO3dCQUNULGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQyxDQUFDLENBQUMsQ0FBQztvQkFFSCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO3dCQUNuQyxFQUFFLENBQUMsYUFBVyxHQUFHLGNBQVcsRUFBRTs0QkFDNUIsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUdILEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDbkIsOEJBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtnQkFDcEMsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO29CQUMxQyxzQkFBc0IsRUFBRSxDQUFDO29CQUd6Qiw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFHMUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBR25DLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFHbkUsaUJBQWlCLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztvQkFDbkMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBRzlDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUdwQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUVuQyxFQUFFLENBQUMsMkNBQTJDLEVBQUU7Z0JBQzlDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFFdEQsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFFeEMsMkJBQTJCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtnQkFDcEQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO2dCQUVqRSxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4QywyQkFBMkIsRUFBRSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO2dCQUNoRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBRXpELGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBRXhDLDJCQUEyQixFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUU7Z0JBQzNFLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztnQkFFOUQsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFFeEMsMkJBQTJCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRTtnQkFDdEUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUUxRCxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4QyxtQ0FBbUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDM0Isc0JBQXNCLEVBQUUsQ0FBQztnQkFFekIsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFFeEMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsRUFBRSxDQUFDLHNCQUFzQixFQUFFO2dCQUN6QixzQkFBc0IsRUFBRSxDQUFDO2dCQUV6QixrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUV6Qyw2Q0FBNkMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBSUg7WUFDRSwrQkFBK0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQseUNBQXlDLEtBQVc7WUFDbEQsa0JBQWtCLENBQUMsV0FBVyxHQUFHLGFBQUssS0FBSyxJQUFFLE9BQU8sRUFBRSxLQUFLLEdBQVMsQ0FBQztZQUNyRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN6RCxDQUFDO1FBRUQ7WUFDRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELHVEQUF1RCxvQkFBNkI7WUFDbEYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFRCw2Q0FBNkMsVUFBa0I7WUFDN0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDbEgsQ0FBQztRQUVELDRCQUE0QixHQUFXO1lBQ3JDLGlCQUFpQixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDNUIsa0JBQWtCLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELHVDQUF1QyxHQUFXO1lBQ2hELGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsRSxDQUFDO1FBRUQsd0NBQXdDLEdBQVc7WUFDakQsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUQsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNkRCxvQkEyZEMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy90aW1lLWRpc3BsYXkuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lRGlzcGxheUNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1kaXNwbGF5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjb21wb25lbnRGYWN0b3J5TmFtZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL2NvbXBpbGVyJztcbmltcG9ydCB7IEZyYW1lLCBUaW1lY29kZUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdUaW1lIERpc3BsYXkgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFRpbWVEaXNwbGF5Q29tcG9uZW50O1xuICAgIGxldCBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IG1vY2tLZXlib2FyZEV2ZW50OiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBUaW1lRGlzcGxheUNvbXBvbmVudCgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXF1ZXN0IGVtaXR0ZXInKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQgPSB7XG4gICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogJzAxOjAyOjAzOzA0JyxcbiAgICAgICAgICBmb2N1czogKCkgPT4gZm9jdXNlZCA9IHRydWUsXG4gICAgICAgICAgYmx1cjogKCkgPT4gZm9jdXNlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gYXMgYW55O1xuXG4gICAgICAvLyBXZSB3YW50IHRvIHNpbXVsYXRlIHRoZSBmYWN0IHRoYXQgY2xpY2tpbmcgb24gdGhlIGlucHV0IHNldHMgaXQgdG8gZm9jdXNlZCwgYnV0IGFsc28gY2FsbCB0aGVcbiAgICAgIC8vIHJlYWwgaGFuZGxlciB3aXRob3V0IG90aGVyd2lzZSBpbnRlcmZlcmluZyB3aXRoIGl0LlxuICAgICAgY29uc3QgcmVhbEhhbmRsZXI6IEZ1bmN0aW9uID0gY29tcG9uZW50VW5kZXJUZXN0Lm9uVGltZUlucHV0Q2xpY2suYmluZChjb21wb25lbnRVbmRlclRlc3QpO1xuICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LCAnb25UaW1lSW5wdXRDbGljaycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgIGZvY3VzZWQgPSB0cnVlO1xuICAgICAgICByZWFsSGFuZGxlcigpO1xuICAgICAgfSk7XG5cbiAgICAgIG1vY2tLZXlib2FyZEV2ZW50ID0ge1xuICAgICAgICBrZXk6ICcnLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogamFzbWluZS5jcmVhdGVTcHkoJ3ByZXZlbnREZWZhdWx0JylcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGxheWVyU3RhdGUgc2V0dGVyJywgKCkgPT4ge1xuICAgICAgLy8gTm90ZTogT3RoZXIgc3BlY3MgZm9yIHBsYXllclN0YXRlIGNoYW5nZXMgYW5kIGVkaXRpbmcgbW9kZSBhcmUgaW4gdGhlICdvblRpbWVJbnB1dENsaWNrKCknIHNlY3Rpb24gYmVsb3cuXG4gICAgICBpdCgnKGdlbmVyYWxseSkgY2FuY2VscyBlZGl0aW5nIG1vZGUnLCAoKSA9PiB7XG4gICAgICAgIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmcoKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7IHNvbWU6ICdzdGF0ZScgfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0RWRpdGluZ01vZGVUb0JlSW5hY3RpdmVXaXRoRm9jdXNlZFNldFRvKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXBkYXRlcyB0aGUgY3VycmVudCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgbGV0IHVwZGF0ZWRDdXJyZW50RnJhbWU6IEZyYW1lID0gbnVsbDtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmN1cnJlbnRGcmFtZS5zdWJzY3JpYmUobmV3RnJhbWUgPT4gdXBkYXRlZEN1cnJlbnRGcmFtZSA9IG5ld0ZyYW1lKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7IGN1cnJlbnRGcmFtZTogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoMTIzKSB9IGFzIGFueTtcblxuICAgICAgICBleHBlY3QodXBkYXRlZEN1cnJlbnRGcmFtZSkudG9FcXVhbChuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcigxMjMpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3BsYXllclN0YXRlIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBjdXJyZW50IHBsYXllciBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0geyBzb21lOiAnc3RhdGUnIH0gYXMgYW55O1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUpLnRvRXF1YWwoeyBzb21lOiAnc3RhdGUnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdGluZyBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIG5vdCBlZGl0aW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmVkaXRpbmcpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBlZGl0aW5nJywgKCkgPT4ge1xuICAgICAgICBzaW11bGF0ZUFscmVhZHlFZGl0aW5nKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0aW5nKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZHVyYXRpb25GcmFtZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgY3VycmVudCBwbGF5ZXIgc3RhdGVcXCdzIGR1cmF0aW9uRnJhbWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgZHVyYXRpb25GcmFtZTogeyBzb21lOiAnZnJhbWUnIH0gfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kdXJhdGlvbkZyYW1lKS50b0VxdWFsKHsgc29tZTogJ2ZyYW1lJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RpbWVJbnB1dFRpdGxlVHJhbnNsYXRpb25LZXkgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGV4cGVjdGVkIHN0cmluZyB3aGVuIG5vdCBlZGl0aW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dFRpdGxlVHJhbnNsYXRpb25LZXkpLnRvQmUoJ0FTU0VULkFEVl9QTEFZRVIuVElNRV9ESVNQTEFZLk1BSU5fVElUTEUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgZW1wdHkgc3RyaW5nIHdoZW4gZWRpdGluZycsICgpID0+IHtcbiAgICAgICAgc2ltdWxhdGVBbHJlYWR5RWRpdGluZygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0VGl0bGVUcmFuc2xhdGlvbktleSkudG9CZSgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5BcHBseSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc2ltdWxhdGVBbHJlYWR5RWRpdGluZygpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkFwcGx5KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBpbnB1dCBoYXNuXFwndCBjaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnMDE6MDI6MDM7MDQnO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuQXBwbHkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGlucHV0IGlzIGludmFsaWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICd4eXonO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuQXBwbHkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGlucHV0IGlzIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IHZhbHVlLCBidXQgd2l0aG91dCBjb2xvbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcwMTAyMDMwNCc7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5BcHBseSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZSBpbnB1dCBpcyBub24tZW1wdHksIGlzIHZhbGlkLCBhbmQgaGFzIGNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcwMTowMic7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5BcHBseSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRW1wdHkgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc0VtcHR5KS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGlucHV0IGlzIG5vdCBlbXB0eScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJzEnO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXNFbXB0eSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb250YWluZXJDbGFzcyBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZW1wdHkgc3RyaW5nIHdoZW4gbm90IGVkaXRpbmcnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29udGFpbmVyQ2xhc3MpLnRvQmUoJycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFxcJ2VkaXRpbmdcXCcgd2hlbiBlZGl0aW5nJywgKCkgPT4ge1xuICAgICAgICBzaW11bGF0ZUFscmVhZHlFZGl0aW5nKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb250YWluZXJDbGFzcykudG9CZSgnZWRpdGluZycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25UaW1lSW5wdXRDbGljaygpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3doZW4gbm90IHlldCBlZGl0aW5nJywgKCkgPT4ge1xuICAgICAgICBkZXNjcmliZSgnd2hlbiBwbGF5aW5nJywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0geyBwbGF5aW5nOiB0cnVlIH0gYXMgYW55O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ2VtaXRzIGEgcGxheWVyIHBhdXNlIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25UaW1lSW5wdXRDbGljaygpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnUEFVU0UnIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ2RvZXMgbm90IGltbWVkaWF0ZWx5IHNldCBlZGl0aW5nIG1vZGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25UaW1lSW5wdXRDbGljaygpO1xuXG4gICAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVJbmFjdGl2ZVdpdGhGb2N1c2VkU2V0VG8odHJ1ZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnZG9lcyBub3Qgc2V0IGVkaXRpbmcgbW9kZSB3aGVuIHBsYXllciBzdGF0ZSBpcyB1cGRhdGVkIGJ1dCBpcyBzdGlsbCBub3QgcGF1c2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uVGltZUlucHV0Q2xpY2soKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgcGxheWluZzogdHJ1ZSwgd2hhdGV2ZXI6ICdlbHNlJyB9IGFzIGFueTtcblxuICAgICAgICAgICAgZXhwZWN0RWRpdGluZ01vZGVUb0JlSW5hY3RpdmVXaXRoRm9jdXNlZFNldFRvKHRydWUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3NldHMgZWRpdGluZyBtb2RlIG9uY2UgcGxheWVyIHN0YXRlIGlzIHVwZGF0ZWQgYW5kIGlzIHBhdXNlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblRpbWVJbnB1dENsaWNrKCk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7IHBsYXlpbmc6IGZhbHNlIH0gYXMgYW55O1xuXG4gICAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gcGF1c2VkJywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0geyBwbGF5aW5nOiBmYWxzZSB9IGFzIGFueTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdkb2VzIG5vdCBlbWl0IGFueSBwbGF5ZXIgcmVxdWVzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25UaW1lSW5wdXRDbGljaygpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlcXVlc3QuZW1pdCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzZXRzIGVkaXRpbmcgbW9kZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblRpbWVJbnB1dENsaWNrKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUFjdGl2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2hlbiBhbHJlYWR5IGVkaXRpbmcnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goc2ltdWxhdGVBbHJlYWR5RWRpdGluZyk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGVtaXQgYW55IHBsYXllciByZXF1ZXN0cycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25UaW1lSW5wdXRDbGljaygpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBhZmZlY3QgZWRpdGluZyBtb2RlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblRpbWVJbnB1dENsaWNrKCk7XG5cbiAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbktleURvd24oKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goc2ltdWxhdGVBbHJlYWR5RWRpdGluZyk7XG5cbiAgICAgIGRlc2NyaWJlKCd3aXRob3V0IENvbnRyb2wgb3IgTWV0YSBrZXkgZG93bicsICgpID0+IHtcbiAgICAgICAgWydCYWNrc3BhY2UnLCAnRGVsZXRlJywgJ0Fycm93TGVmdCcsICdBcnJvd1JpZ2h0JywgJ0hvbWUnLCAnRW5kJywgJ0NvbnRyb2wnLCAnTWV0YSddLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpdChgcGFzc2VzICcke2tleX0nIHRocm91Z2hgLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3RLZXlEb3duVG9QYXNzVGhyb3VnaEZvcihrZXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChgc3VwcHJlc3NlcyAnRW50ZXInIGFuZCBkb2VzIG5vdCBhcHBseSB0aGUgaW5wdXQgd2hlbiBpdCBpcyBlbXB0eWAsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcblxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcignRW50ZXInKTtcbiAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYHN1cHByZXNzZXMgJ0VudGVyJyBhbmQgZG9lcyBub3QgYXBwbHkgdGhlIGlucHV0IHdoZW4gaXQgaGFzbid0IGNoYW5nZWRgLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJzAxOjAyOjAzOzA0JztcblxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcignRW50ZXInKTtcbiAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYHN1cHByZXNzZXMgJ0VudGVyJyBhbmQgZG9lcyBub3QgYXBwbHkgdGhlIGlucHV0IHdoZW4gaXQgaXMgaW52YWxpZGAsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAneHl6JztcblxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcignRW50ZXInKTtcbiAgICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYHN1cHByZXNzZXMgJ0VudGVyJyBhbmQgZG9lcyBub3QgYXBwbHkgdGhlIGlucHV0IHdoZW4gaXQgaXMgdGhlIHNhbWUgdmFsdWUsIGJ1dCB3aXRob3V0IGNvbG9uc2AsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnMDEwMjAzMDQnO1xuXG4gICAgICAgICAgZXhwZWN0S2V5RG93blRvQmVTdXBwcmVzc2VkRm9yKCdFbnRlcicpO1xuICAgICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUFjdGl2ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChgc3VwcHJlc3NlcyAnRW50ZXInIGFuZCBhcHBsaWVzIHRoZSBpbnB1dCB3aGVuIGl0IGlzIG5vbi1lbXB0eSwgaXMgdmFsaWQsIGFuZCBoYXMgY2hhbmdlZGAsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnMTowMic7XG5cbiAgICAgICAgICBleHBlY3RLZXlEb3duVG9CZVN1cHByZXNzZWRGb3IoJ0VudGVyJyk7XG4gICAgICAgICAgZXhwZWN0SW5wdXRWYWx1ZVRvSGF2ZUJlZW5BcHBsaWVkQXMoJzE6MDInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYHN1cHByZXNzZXMgJ0VzY2FwZScgYW5kIGNhbmNlbHMgZWRpdCBtb2RlYCwgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcignRXNjYXBlJyk7XG4gICAgICAgICAgZXhwZWN0RWRpdGluZ01vZGVUb0JlSW5hY3RpdmVXaXRoRm9jdXNlZFNldFRvKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgWydjJywgJ0MnXS5mb3JFYWNoKGNoYXJhY3RlciA9PiB7XG4gICAgICAgICAgaXQoYHN1cHByZXNzZXMgJyR7Y2hhcmFjdGVyfScgYW5kIGNsZWFycyB0aGUgaW5wdXRgLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3RLZXlEb3duVG9CZVN1cHByZXNzZWRGb3IoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUFjdGl2ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSkudG9CZSgnJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGluIHRpbWVjb2RlIG1vZGUnLCAoKSA9PiB7XG4gICAgICAgICAgJzAxMjM0NTY3ODk6Oycuc3BsaXQoJycpLmZvckVhY2goY2hhcmFjdGVyID0+IHtcbiAgICAgICAgICAgIGl0KGBwYXNzZXMgdGhyb3VnaCAnJHtjaGFyYWN0ZXJ9J2AsICgpID0+IHtcbiAgICAgICAgICAgICAgZXhwZWN0S2V5RG93blRvUGFzc1Rocm91Z2hGb3IoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gTm90ZTogV2UncmUgbm90IHRlc3RpbmcgYWxsIHRoZSBzdXBwcmVzc2VkIGtleXMgaGVyZS4gIEp1c3QgYSBjb3VwbGUuXG4gICAgICAgICAgJy5hJy5zcGxpdCgnJykuZm9yRWFjaChjaGFyYWN0ZXIgPT4ge1xuICAgICAgICAgICAgaXQoYHN1cHByZXNzZXMgJyR7Y2hhcmFjdGVyfSdgLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcihjaGFyYWN0ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGluIHNlY29uZHMgbW9kZScsICgpID0+IHtcbiAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmdXaXRoU3RhdGUoeyB0aW1lY29kZUZvcm1hdDogVGltZWNvZGVGb3JtYXQuU0VDT05EUyB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICcwMTIzNDU2Nzg5Licuc3BsaXQoJycpLmZvckVhY2goY2hhcmFjdGVyID0+IHtcbiAgICAgICAgICAgIGl0KGBwYXNzZXMgdGhyb3VnaCAnJHtjaGFyYWN0ZXJ9J2AsICgpID0+IHtcbiAgICAgICAgICAgICAgZXhwZWN0S2V5RG93blRvUGFzc1Rocm91Z2hGb3IoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gTm90ZTogV2UncmUgbm90IHRlc3RpbmcgYWxsIHRoZSBzdXBwcmVzc2VkIGtleXMgaGVyZS4gIEp1c3QgYSBjb3VwbGUuXG4gICAgICAgICAgJzo7YScuc3BsaXQoJycpLmZvckVhY2goY2hhcmFjdGVyID0+IHtcbiAgICAgICAgICAgIGl0KGBzdXBwcmVzc2VzICcke2NoYXJhY3Rlcn0nYCwgKCkgPT4ge1xuICAgICAgICAgICAgICBleHBlY3RLZXlEb3duVG9CZVN1cHByZXNzZWRGb3IoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyAnQ29udHJvbCcgZm9yIFdpbmRvd3MgQ09OVFJPTCBrZXksICdNZXRhJyBmb3IgTWFjIENPTU1BTkQga2V5LiAgKFllYWgsIFRIQVQgbWFrZXMgc2Vuc2UuKVxuICAgICAgWydDb250cm9sJywgJ01ldGEnXS5mb3JFYWNoKGNvbnRyb2xLZXkgPT4ge1xuICAgICAgICBkZXNjcmliZShgd2l0aCAke2NvbnRyb2xLZXl9IGtleSBkb3duYCwgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgc2ltdWxhdGVLZXlEb3duRm9yKGNvbnRyb2xLZXkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgWydhJywgJ2MnLCAndicsICd4JywgJ3onXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpdChgcGFzc2VzICcke2tleX0nIHRocm91Z2hgLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGV4cGVjdEtleURvd25Ub1Bhc3NUaHJvdWdoRm9yKGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIE5vdGU6IFdlJ3JlIG5vdCB0ZXN0aW5nIGFsbCB0aGUgc3VwcHJlc3NlZCBrZXlzIGhlcmUuICBKdXN0IG9uZS5cbiAgICAgICAgICBpdChgc3VwcHJlc3NlcyAnYidgLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3RLZXlEb3duVG9CZVN1cHByZXNzZWRGb3IoJ2InKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbktleVVwKCknLCAoKSA9PiB7XG4gICAgICBbJ0NvbnRyb2wnLCAnTWV0YSddLmZvckVhY2goY29udHJvbEtleSA9PiB7XG4gICAgICAgIGl0KCdwcm9wZXJseSBzd2l0Y2hlcyBvdXQgb2YgY29udHJvbCBtb2RlJywgKCkgPT4ge1xuICAgICAgICAgIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmcoKTtcblxuICAgICAgICAgIC8vIFVzZXIgcHJlc3NlcyBjb250cm9sIGtleSBkb3duLlxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub1Bhc3NUaHJvdWdoRm9yKGNvbnRyb2xLZXkpO1xuXG4gICAgICAgICAgLy8gVXNlciBwcmVzc2VzICdjJyBrZXkgZG93bi4gIENPTlRST0wtQyBpcyBhbGxvd2VkLlxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub1Bhc3NUaHJvdWdoRm9yKCdjJyk7XG5cbiAgICAgICAgICAvLyBJbnB1dCB2YWx1ZSBkb2Vzbid0IGNoYW5nZSBmb3IgQ09OVFJPTC1DLlxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpLnRvQmUoJzEnKTtcblxuICAgICAgICAgIC8vIFVzZXIgcmVsZWFzZXMgY29udHJvbCBrZXksIHdoaWNoIGlzIHdoYXQgd2UncmUgYWN0dWFsbHkgdGVzdGluZy5cbiAgICAgICAgICBtb2NrS2V5Ym9hcmRFdmVudC5rZXkgPSBjb250cm9sS2V5O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbktleVVwKG1vY2tLZXlib2FyZEV2ZW50KTtcblxuICAgICAgICAgIC8vIFVzZXIgcHJlc3NlcyAnYycga2V5IGRvd24uICAnYycgY2xlYXJzIHRoZSBpbnB1dCwgYnV0IGlzIG90aGVyd2lzZSBzdXBwcmVzc2VkLlxuICAgICAgICAgIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcignYycpO1xuXG4gICAgICAgICAgLy8gUHJvdmUgdGhhdCB0aGlzIHdhcyAnYycgYW5kIG5vdCBDT05UUk9MLUMuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSkudG9CZSgnJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25BcHBseUJ1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKHNpbXVsYXRlQWxyZWFkeUVkaXRpbmcpO1xuXG4gICAgICBpdChgZG9lcyBub3QgYXBwbHkgdGhlIGlucHV0IHdoZW4gaXQgaXMgZW1wdHlgLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkFwcGx5QnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChgZG9lcyBub3QgYXBwbHkgdGhlIGlucHV0IHdoZW4gaXQgaGFzbid0IGNoYW5nZWRgLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcwMTowMjowMzswNCc7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQXBwbHlCdXR0b25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUFjdGl2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGBkb2VzIG5vdCBhcHBseSB0aGUgaW5wdXQgd2hlbiBpdCBpcyBpbnZhbGlkYCwgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAneHl6JztcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25BcHBseUJ1dHRvbkNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0RWRpdGluZ01vZGVUb0JlQWN0aXZlKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYGRvZXMgbm90IGFwcGx5IHRoZSBpbnB1dCB3aGVuIGl0IGlzIHRoZSBzYW1lIHZhbHVlLCBidXQgd2l0aG91dCBjb2xvbnNgLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcwMTAyMDMwNCc7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQXBwbHlCdXR0b25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUFjdGl2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGBhcHBsaWVzIHRoZSBpbnB1dCB3aGVuIGl0IGlzIG5vbi1lbXB0eSwgaXMgdmFsaWQsIGFuZCBoYXMgY2hhbmdlZGAsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJzE6MDInO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkFwcGx5QnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3RJbnB1dFZhbHVlVG9IYXZlQmVlbkFwcGxpZWRBcygnMTowMicpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGVhckJ1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2xlYXJzIHRoZSBpbnB1dCBmaWVsZCcsICgpID0+IHtcbiAgICAgICAgc2ltdWxhdGVBbHJlYWR5RWRpdGluZygpO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsZWFyQnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSkudG9CZSgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkNhbmNlbEJ1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FuY2VscyBlZGl0aW5nIG1vZGUnLCAoKSA9PiB7XG4gICAgICAgIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmcoKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DYW5jZWxCdXR0b25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdEVkaXRpbmdNb2RlVG9CZUluYWN0aXZlV2l0aEZvY3VzZWRTZXRUbyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vLy8gVGVzdCBoZWxwZXJzIGZyb20gaGVyZSBkb3duLlxuXG4gICAgZnVuY3Rpb24gc2ltdWxhdGVBbHJlYWR5RWRpdGluZygpOiB2b2lkIHtcbiAgICAgIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmdXaXRoU3RhdGUoe30pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNpbXVsYXRlQWxyZWFkeUVkaXRpbmdXaXRoU3RhdGUoc3RhdGU6IFBvam8pOiB2b2lkIHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgLi4uc3RhdGUsIHBsYXlpbmc6IGZhbHNlIH0gYXMgYW55O1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uVGltZUlucHV0Q2xpY2soKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcxJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBlY3RFZGl0aW5nTW9kZVRvQmVBY3RpdmUoKTogdm9pZCB7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmVkaXRpbmcpLnRvQmUodHJ1ZSk7XG4gICAgICBleHBlY3QoZm9jdXNlZCkudG9CZSh0cnVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBlY3RFZGl0aW5nTW9kZVRvQmVJbmFjdGl2ZVdpdGhGb2N1c2VkU2V0VG8oZXhwZWN0ZWRGb2N1c2VkVmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZWRpdGluZykudG9CZShmYWxzZSk7XG4gICAgICBleHBlY3QoZm9jdXNlZCkudG9CZShleHBlY3RlZEZvY3VzZWRWYWx1ZSk7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlKS50b0JlKCcwMTowMjowMzswNCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdElucHV0VmFsdWVUb0hhdmVCZWVuQXBwbGllZEFzKHRpbWVTdHJpbmc6IHN0cmluZyk6IHZvaWQge1xuICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0aW5nKS50b0JlKGZhbHNlKTtcbiAgICAgIGV4cGVjdChmb2N1c2VkKS50b0JlKGZhbHNlKTtcbiAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdTRUVLX1RPX1RJTUVfU1RSSU5HJywgdGltZTogdGltZVN0cmluZyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaW11bGF0ZUtleURvd25Gb3Ioa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIG1vY2tLZXlib2FyZEV2ZW50LmtleSA9IGtleTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbktleURvd24obW9ja0tleWJvYXJkRXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdEtleURvd25Ub1Bhc3NUaHJvdWdoRm9yKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICBzaW11bGF0ZUtleURvd25Gb3Ioa2V5KTtcblxuICAgICAgZXhwZWN0KG1vY2tLZXlib2FyZEV2ZW50LnByZXZlbnREZWZhdWx0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGVjdEtleURvd25Ub0JlU3VwcHJlc3NlZEZvcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgc2ltdWxhdGVLZXlEb3duRm9yKGtleSk7XG5cbiAgICAgIGV4cGVjdChtb2NrS2V5Ym9hcmRFdmVudC5wcmV2ZW50RGVmYXVsdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=
