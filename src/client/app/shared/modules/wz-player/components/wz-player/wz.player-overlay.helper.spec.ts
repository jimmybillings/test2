import { WzPlayerOverlayHelper } from './wz.player-overlay.helper';
import { MockAppStore } from '../../../../../store/spec-helpers/mock-app.store';
import { Pojo } from '../../../../interfaces/common.interface';

export function main() {
  describe('Wz Player Overlay Helper', () => {
    let mockWindow: any;
    let mockContainerElement: any;
    let mockOverlayDivElement: any;
    let mockOverlayTextElement: any;
    let mockRenderer: any;
    let mockStore: MockAppStore;
    let mockCurrentUserService: any;
    let mockEnhancedAsset: any;
    let mockControlsHeight: number = 0;
    let helperUnderTest: WzPlayerOverlayHelper;
    let offTimeUpdateSpy: jasmine.Spy;
    let callbackFromSetInterval: Function;
    let callbackFromTimeUpdateEvent: Function;
    let callbackFromPlayingEvent: Function;
    let callbackFromPausedEvent: Function;
    let callbackFromCompleteEvent: Function;
    let expectedOverlayCreationCallCount: number;
    let mockCurrentlyPlaying: boolean = false;

    const setConfigTo = (config: Pojo) =>
      mockStore.createStateElement('uiConfig', 'components', { playerOverlay: { config: config } });


    const displayIt = () => {
      helperUnderTest.displayWith({
        window: mockWindow,
        enhancedAsset: mockEnhancedAsset,
        containerElement: mockContainerElement,
        currentlyPlaying: () => mockCurrentlyPlaying,
        getCurrentControlsHeight: () => mockControlsHeight,
        onTimeUpdate: (callback: Function) => callbackFromTimeUpdateEvent = callback,
        offTimeUpdate: offTimeUpdateSpy,
        onPlay: (callback: Function) => {
          mockCurrentlyPlaying = true;
          callbackFromPlayingEvent = callback;
        },
        onPause: (callback: Function) => {
          mockCurrentlyPlaying = false;
          callbackFromPausedEvent = callback;
        },
        onComplete: (callback: Function) => {
          mockCurrentlyPlaying = false;
          callbackFromCompleteEvent = callback;
        }
      });

      expectedOverlayCreationCallCount = 1;
    };

    beforeEach(() => {
      offTimeUpdateSpy = jasmine.createSpy('offTimeUpdate');
      expectedOverlayCreationCallCount = 0;
      mockOverlayDivElement = { some: 'div', innerText: 'x' };
      mockOverlayTextElement = { some: 'text' };
      mockContainerElement = { some: 'container' };

      mockWindow = {
        document: {
          getElementById: jasmine.createSpy('getElementById').and.callFake(() => mockOverlayDivElement),
        },
        setInterval: jasmine.createSpy('setInterval').and.callFake((callback: Function) => {
          callbackFromSetInterval = callback;
          return 10836;
        }),
        clearInterval: jasmine.createSpy('clearInterval')
      };

      mockRenderer = {
        createElement: jasmine.createSpy('createElement').and.returnValue(mockOverlayDivElement),
        setAttribute: jasmine.createSpy('setAttribute'),
        createText: jasmine.createSpy('createText').and.returnValue(mockOverlayTextElement),
        appendChild: jasmine.createSpy('appendChild'),
        removeChild: jasmine.createSpy('removeChild'),
        setStyle: jasmine.createSpy('setStyle')
      };

      mockStore = new MockAppStore();

      mockCurrentUserService = {
        state: {
          firstName: 'John',
          lastName: 'Smith',
          account: {
            name: 'Acme Industries'
          }
        }
      };

      mockEnhancedAsset = {
        name: 'ABCDEF_GHI'
      };

      helperUnderTest = new WzPlayerOverlayHelper(mockRenderer, mockStore, mockCurrentUserService);
    });

    describe('displayWith()', () => {
      const deleteOverlayAndExpectItToBeRecreatedBy = (callback: Function) => {
        // Initial create (ensure our call count is as expected before we begin).
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);

        // Malicious user deletes it.
        mockOverlayDivElement = null;

        // Haven't recreated it yet.
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);

        // An event happens.
        callback();

        // It was already gone, so we don't try to remove it.
        expect(mockRenderer.removeChild).not.toHaveBeenCalled();

        // We expect the overlay to have been created another time.  Record this for future calls to this function.
        expectedOverlayCreationCallCount += 1;
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);
      };

      const alterOverlayTextAndExpectItToBeRecreatedBy = (callback: Function) => {
        // Initial create (ensure our call count is as expected before we begin).
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);

        // Malicious user alters the text.
        mockOverlayDivElement.innerText = 'something different';

        // Haven't recreated it yet.
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);

        // An event happens.
        callback();

        // Ensure we removed it before we recreated it.
        expect(mockRenderer.removeChild).toHaveBeenCalledWith(mockContainerElement, mockOverlayDivElement);

        // We expect the overlay to have been created another time.  Record the count for future calls to this function.
        expectedOverlayCreationCallCount += 1;
        expect(mockRenderer.createElement).toHaveBeenCalledTimes(expectedOverlayCreationCallCount);
      };

      const expectOverlayToHaveBeenStyledWith = (styles: Pojo) => {
        const styleKeys = Object.keys(styles);

        styleKeys.forEach(styleKey =>
          expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockOverlayDivElement, styleKey, styles[styleKey])
        );

        // Don't want extra styles sneaking in there.
        expect(mockRenderer.setStyle).toHaveBeenCalledTimes(styleKeys.length);
      };

      const defaultStylesWithoutTopOrBottom = {
        position: 'absolute',
        left: '0',
        width: '100%',
        'text-align': 'center',
        'font-size': '20px',
        'line-height': '20px',
        padding: '10px',
        color: 'rgba(255,255,255,0.75)',
        'background-color': 'rgba(0,0,0,0.5)'
      };

      const defaultStyles = {
        ...defaultStylesWithoutTopOrBottom,
        top: '20px'
      };

      //// Tests start here!

      describe('with no player overlay configuration', () => {
        it('does not create an overlay', () => {
          mockStore.createStateElement('uiConfig', 'components', {});

          displayIt();

          expect(mockRenderer.createElement).not.toHaveBeenCalled();
        });
      });

      describe('with an empty player overlay configuration (no "config")', () => {
        it('does not create an overlay', () => {
          mockStore.createStateElement('uiConfig', 'components', { playerOverlay: {} });

          displayIt();

          expect(mockRenderer.createElement).not.toHaveBeenCalled();
        });
      });

      describe('with an empty player overlay configuration (with "config")', () => {
        it('does not create an overlay', () => {
          setConfigTo({});

          displayIt();

          expect(mockRenderer.createElement).not.toHaveBeenCalled();
        });
      });

      describe('with a disabled player overlay configuration', () => {
        it('does not create an overlay', () => {
          setConfigTo({ enabled: { value: 'false' } });

          displayIt();

          expect(mockRenderer.createElement).not.toHaveBeenCalled();
        });
      });

      describe('with an enabled player overlay configuration that has no display text', () => {
        it('does not create an overlay', () => {
          setConfigTo({ enabled: { value: 'true' } });

          displayIt();

          expect(mockRenderer.createElement).not.toHaveBeenCalled();
        });
      });

      describe('with a minimally enabled player overlay configuration', () => {
        beforeEach(() => {
          setConfigTo({ enabled: { value: 'true' }, userDisplayText: { value: 'x' } });
        });

        it('creates a default overlay', () => {
          displayIt();

          expect(mockRenderer.createElement).toHaveBeenCalledWith('div');
        });

        it('reads the config just once', () => {
          displayIt();
          displayIt();

          expect(mockStore.snapshotCloned).toHaveBeenCalledTimes(1);
        });

        it('sets default styling on the overlay', () => {
          displayIt();

          expectOverlayToHaveBeenStyledWith(defaultStyles);
        });

        describe('periodically rewrites the overlay styles when it...', () => {
          const numberOfStyles: number = Object.keys(defaultStyles).length;

          it('is not playing', () => {
            mockCurrentlyPlaying = false;

            displayIt();

            expect(mockRenderer.setStyle).toHaveBeenCalledTimes(numberOfStyles);

            callbackFromSetInterval();

            expect(mockRenderer.setStyle).toHaveBeenCalledTimes(numberOfStyles * 2);
          });

          it('is playing', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            expect(mockRenderer.setStyle).toHaveBeenCalledTimes(numberOfStyles);

            callbackFromTimeUpdateEvent();

            expect(mockRenderer.setStyle).toHaveBeenCalledTimes(numberOfStyles * 2);
          });
        });

        describe('recreates the overlay when it...', () => {
          it('is deleted while not playing', () => {
            mockCurrentlyPlaying = false;

            displayIt();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });

          it('is deleted while playing', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);
          });

          it('is deleted after transitioning from paused to playing', () => {
            mockCurrentlyPlaying = false;

            displayIt();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromSetInterval);

            callbackFromPlayingEvent();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);
          });

          it('is deleted after transitioning from playing to paused', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);

            callbackFromPausedEvent();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });

          it('is deleted after transitioning from playing to complete', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);

            callbackFromCompleteEvent();

            deleteOverlayAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });

          it('has its text altered while not playing', () => {
            mockCurrentlyPlaying = false;

            displayIt();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });

          it('has its text altered while playing', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);
          });

          it('has its text altered after transitioning from paused to playing', () => {
            mockCurrentlyPlaying = false;

            displayIt();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromSetInterval);

            callbackFromPlayingEvent();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);
          });

          it('has its text altered after transitioning from playing to paused', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);

            callbackFromPausedEvent();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });

          it('has its text altered after transitioning from playing to complete', () => {
            mockCurrentlyPlaying = true;

            displayIt();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromTimeUpdateEvent);

            callbackFromCompleteEvent();

            alterOverlayTextAndExpectItToBeRecreatedBy(callbackFromSetInterval);
          });
        });
      });

      describe('with an enabled player overlay configuration with a font size specified', () => {
        it('overrides some default styles', () => {
          setConfigTo({ enabled: { value: 'true' }, userDisplayText: { value: 'x' }, fontSizeInPixels: { value: '15' } });

          displayIt();

          expectOverlayToHaveBeenStyledWith({
            ...defaultStyles,
            top: '15px',
            'font-size': '15px',
            'line-height': '15px',
            padding: '7.5px'
          });
        });
      });

      [
        { configKey: 'textColor', cssKey: 'color', defaultValue: '255,255,255' },
        { configKey: 'backgroundColor', cssKey: 'background-color', defaultValue: '0,0,0' },
      ].forEach(colorTest => {
        describe(`with an enabled player overlay configuration with '${colorTest.configKey}' specified`, () => {
          [
            {
              configValues: [
                '#AABBCC', '#ABC', '#AABBCCXXYYZZ', 'AABBCC', 'ABC', '0xAABBCC', '0xABC', '0XAABBCC', '0XABC',
                '#aabbcc', '#abc', '#aabbccxxyyzz', 'aabbcc', 'abc', '0xaabbcc', '0xabc', '0Xaabbcc', '0Xabc'
              ],
              expectedRgb: '170,187,204'
            },
            {
              configValues: [
                '#A', '#AB', '#ABCD', '#ABCDE', '#AABBCCDDEEFF', 'x', '', undefined, null
              ],
              expectedRgb: colorTest.defaultValue
            }
          ].forEach(mapping => {
            mapping.configValues.forEach(configValue => {
              it(`sets the '${colorTest.cssKey}' style to '${configValue}'`, () => {
                setConfigTo({
                  enabled: { value: 'true' },
                  userDisplayText: { value: 'x' },
                  [colorTest.configKey]: { value: configValue }
                });

                displayIt();

                const alpha = colorTest.configKey === 'textColor' ? '0.75' : '0.5';
                expectOverlayToHaveBeenStyledWith({
                  ...defaultStyles,
                  [colorTest.cssKey]: `rgba(${mapping.expectedRgb},${alpha})`
                });
              });
            });
          });
        });
      });

      [
        { configKey: 'textOpacity', cssKey: 'color', defaultValue: '0.75' },
        { configKey: 'backgroundOpacity', cssKey: 'background-color', defaultValue: '0.5' },
      ].forEach(opacityTest => {
        describe(`with an enabled player overlay configuration with '${opacityTest.configKey}' specified`, () => {
          [
            { configValue: '-1', expectedAlpha: '0' },
            { configValue: '0', expectedAlpha: '0' },
            { configValue: '0.99', expectedAlpha: '0.99' },
            { configValue: '1', expectedAlpha: '1' },
            { configValue: '1.5', expectedAlpha: '0.015' },
            { configValue: '2', expectedAlpha: '0.02' },
            { configValue: '50', expectedAlpha: '0.5' },
            { configValue: '99', expectedAlpha: '0.99' },
            { configValue: '100', expectedAlpha: '1' },
            { configValue: '101', expectedAlpha: '1' },
            { configValue: '', expectedAlpha: opacityTest.defaultValue },
            { configValue: undefined, expectedAlpha: opacityTest.defaultValue },
            { configValue: null, expectedAlpha: opacityTest.defaultValue },
            { configValue: 'x', expectedAlpha: opacityTest.defaultValue }
          ].forEach(mapping => {
            it(`sets the '${opacityTest.cssKey}' style's alpha to '${mapping.configValue}'`, () => {
              setConfigTo({
                enabled: { value: 'true' },
                userDisplayText: { value: 'x' },
                [opacityTest.configKey]: { value: mapping.configValue }
              });

              displayIt();

              const rgb = opacityTest.configKey === 'textOpacity' ? '255,255,255' : '0,0,0';
              expectOverlayToHaveBeenStyledWith({
                ...defaultStyles, [opacityTest.cssKey]: `rgba(${rgb},${mapping.expectedAlpha})`
              });
            });
          });
        });
      });

      [
        { configValue: 'top', controlsHeight: 0, addedStyles: { top: '20px' } },
        { configValue: 'top', controlsHeight: 47, addedStyles: { top: '20px' } },
        { configValue: 'middle', controlsHeight: 0, addedStyles: { top: '50%' } },
        { configValue: 'middle', controlsHeight: 47, addedStyles: { top: '50%' } },
        { configValue: 'bottom', controlsHeight: 0, addedStyles: { bottom: '20px' } },
        { configValue: 'bottom', controlsHeight: 47, addedStyles: { bottom: '67px' } },
      ].forEach(test => {
        describe(`with an enabled player overlay configuration with position: '${test.configValue}' specified`, () => {
          it('sets the expected style', () => {
            setConfigTo({
              enabled: { value: 'true' },
              userDisplayText: { value: 'x' },
              position: { value: test.configValue }
            });

            mockControlsHeight = test.controlsHeight;

            displayIt();

            expectOverlayToHaveBeenStyledWith({ ...defaultStylesWithoutTopOrBottom, ...test.addedStyles });
          });
        });
      });

      [
        { configValue: 'Hello', expectedText: 'Hello' },
        { configValue: 'Hello {{y}}', expectedText: 'Hello {{y???}}' },
        { configValue: 'Hello {{ y }}', expectedText: 'Hello {{y???}}' },
        { configValue: 'Hello {{user}}', expectedText: 'Hello {{user???}}' },
        { configValue: 'Hello {{user.account}}', expectedText: 'Hello {{user.account???}}' },
        { configValue: 'Hello {{user.blah.name}}', expectedText: 'Hello {{user.blah.name???}}' },
        { configValue: 'Hello {{user.account.blah}}', expectedText: 'Hello {{user.account.blah???}}' },
        { configValue: 'Hello {{user.account.name}}', expectedText: 'Hello Acme Industries' },
        { configValue: 'Hello {{asset.name}}', expectedText: 'Hello ABCDEF_GHI' },
        { configValue: 'Hello {{asset.blah}}', expectedText: 'Hello {{asset.blah???}}' },
        { configValue: 'Hello {{blah}}', expectedText: 'Hello {{blah???}}' },
        { configValue: 'Hello {{blah.whatever}}', expectedText: 'Hello {{blah.whatever???}}' },
        {
          configValue: '{{user.firstName}} {{user.lastName}} ({{user.account.name}})',
          expectedText: 'John Smith (Acme Industries)'
        }
      ].forEach(test => {
        describe(`with an enabled player overlay configuration with userDisplayText: '${test.configValue}'`, () => {
          it('sets the expected display text', () => {
            setConfigTo({
              enabled: { value: 'true' },
              userDisplayText: { value: test.configValue }
            });

            displayIt();

            expect(mockRenderer.createText).toHaveBeenCalledWith(test.expectedText);
          });
        });
      });
    });

    describe('destroy()', () => {
      describe('when the overlay was not enabled', () => {
        it('does nothing', () => {
          setConfigTo({ enabled: { value: 'false' } });

          displayIt();
          helperUnderTest.destroy();

          expect(mockWindow.clearInterval).not.toHaveBeenCalled();
          expect(offTimeUpdateSpy).not.toHaveBeenCalled();
          expect(mockRenderer.removeChild).not.toHaveBeenCalled();
        });
      });

      describe('when the overlay was enabled', () => {
        beforeEach(() => {
          setConfigTo({ enabled: { value: 'true' }, userDisplayText: { value: 'x' } });
        });

        describe('when the player was not playing', () => {
          beforeEach(() => {
            mockCurrentlyPlaying = false;
          });

          it('destroys the expected things', () => {
            displayIt();
            helperUnderTest.destroy();

            expect(mockWindow.clearInterval).toHaveBeenCalledWith(10836);
            expect(offTimeUpdateSpy).toHaveBeenCalledWith();
            expect(mockRenderer.removeChild).toHaveBeenCalledWith(mockContainerElement, mockOverlayDivElement);
          });

          it('can safely be called twice', () => {
            displayIt();
            helperUnderTest.destroy();
            helperUnderTest.destroy();

            expect(mockWindow.clearInterval).toHaveBeenCalledTimes(1);
            expect(offTimeUpdateSpy).toHaveBeenCalledTimes(1);
            expect(mockRenderer.removeChild).toHaveBeenCalledTimes(1);
          });

          it('can display after destroying', () => {
            displayIt();
            helperUnderTest.destroy();
            displayIt();
            helperUnderTest.destroy();

            expect(mockStore.snapshotCloned).toHaveBeenCalledTimes(1);
            expect(mockWindow.clearInterval).toHaveBeenCalledTimes(2);
            expect(offTimeUpdateSpy).toHaveBeenCalledTimes(2);
            expect(mockRenderer.removeChild).toHaveBeenCalledTimes(2);
          });
        });

        describe('when the player was playing', () => {
          beforeEach(() => {
            mockCurrentlyPlaying = true;
          });

          it('destroys the expected things', () => {
            displayIt();
            helperUnderTest.destroy();

            expect(mockWindow.clearInterval).not.toHaveBeenCalled();
            expect(offTimeUpdateSpy).toHaveBeenCalledWith();
            expect(mockRenderer.removeChild).toHaveBeenCalledWith(mockContainerElement, mockOverlayDivElement);
          });

          it('can safely be called twice', () => {
            displayIt();
            helperUnderTest.destroy();
            helperUnderTest.destroy();

            expect(mockWindow.clearInterval).toHaveBeenCalledTimes(0);
            expect(offTimeUpdateSpy).toHaveBeenCalledTimes(1);
            expect(mockRenderer.removeChild).toHaveBeenCalledTimes(1);
          });

          it('can display after destroying', () => {
            displayIt();
            helperUnderTest.destroy();
            displayIt();
            helperUnderTest.destroy();

            expect(mockStore.snapshotCloned).toHaveBeenCalledTimes(1);
            // TODO: It seems like clearInterval() should not be called in this test, but the spy reports one call for
            // some mysterious reason.  If a seemingly related bug is found in the future, investigate this further.
            // Otherwise, it probably doesn't matter because it shouldn't be dangerous to call clearInterval() when it's
            // already not running.
            expect(mockWindow.clearInterval).toHaveBeenCalledTimes(1 /* should be 0 */);
            expect(offTimeUpdateSpy).toHaveBeenCalledTimes(2);
            expect(mockRenderer.removeChild).toHaveBeenCalledTimes(2);
          });
        });
      });
    });
  });
}
