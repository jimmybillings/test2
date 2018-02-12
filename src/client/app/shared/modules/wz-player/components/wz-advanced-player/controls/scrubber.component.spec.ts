import { ScrubberComponent } from './scrubber.component';
import { Frame } from '../../../../wazee-frame-formatter/index';
import { PlayerState } from '../../../interfaces/player.interface';

export function main() {
  describe('Scrubber Component', () => {
    let componentUnderTest: ScrubberComponent;
    let mockElementRef: any;
    let mockRenderer: any;
    let mockChangeDetectorRef: any;
    let mockDocument: any;

    const scrubberOffset: number = 25 + 25 + 50;
    const scrubberWidth: number = 400;
    const durationInFrames: number = 1600;
    const framesPerPixel: number = durationInFrames / scrubberWidth;

    beforeEach(() => {
      mockElementRef = {
        nativeElement: {
          offsetLeft: 25,
          offsetParent: {
            offsetLeft: 25,
            offsetParent: {
              offsetLeft: 50,
              offsetParent: null
            }
          },
          children: [
            {
              classList: ['scrubber'],
              offsetWidth: scrubberWidth,
              children: [
                {
                  classList: ['mat-slider-wrapper'],
                  offsetWidth: scrubberWidth
                }
              ]
            },
            {
              classList: ['hover-frame-display']
            }
          ]
        }
      };

      mockRenderer = {
        elements: {},
        callbacks: {},
        removers: {},
        listen: (element: any, eventName: string, callback: Function) => {
          mockRenderer.elements[eventName] = element;
          mockRenderer.callbacks[eventName] = callback;

          const remover = jasmine.createSpy(`${eventName} remover`);
          mockRenderer.removers[eventName] = remover;
          return remover;
        },
        trigger: (eventName: string, args: any) => {
          mockRenderer.callbacks[eventName](args);
        }
      };

      mockChangeDetectorRef = {
        markForCheck: jasmine.createSpy('markForCheck')
      };

      componentUnderTest = new ScrubberComponent(mockElementRef, mockRenderer, mockChangeDetectorRef);
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');

      componentUnderTest.playerState = {
        durationFrame: new Frame(29.97).setFromFrameNumber(durationInFrames),
        framesPerSecond: 29.97
      } as PlayerState;

      mockDocument = {};

      componentUnderTest.window = {
        getComputedStyle: () => {
          return {
            getPropertyValue: (propertyName: string): string => {
              switch (propertyName) {
                case 'border-left-width': return '1';
                case 'border-right-width': return '1';
                case 'padding-left': return '5';
                case 'padding-right': return '5';
                case 'width': return `50`;
              }

              throw new Error('unexpected propertyName');
            }
          };
        },
        document: mockDocument
      };

      componentUnderTest.ngOnInit();
    });

    describe('ngOnInit()', () => {
      it('sets up document mouse move listener', () => {
        expect(mockRenderer.elements['mousemove']).toEqual(mockDocument);
      });

      it('sets up document mouse up listener', () => {
        expect(mockRenderer.elements['mouseup']).toEqual(mockDocument);
      });
    });

    describe('ngOnDestroy()', () => {
      it('removes document mouse move listener', () => {
        componentUnderTest.ngOnDestroy();

        expect(mockRenderer.removers['mousemove']).toHaveBeenCalled();
      });

      it('removes document mouse up listener', () => {
        componentUnderTest.ngOnDestroy();

        expect(mockRenderer.removers['mouseup']).toHaveBeenCalled();
      });
    });

    describe('readyToDisplay getter', () => {
      it('returns false if there is no player state', () => {
        componentUnderTest.playerState = undefined;

        expect(componentUnderTest.readyToDisplay).toBe(false);
      });

      it('returns false if there is no duration and no current frame', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.readyToDisplay).toBe(false);
      });

      it('returns false if there is a duration but no current frame', () => {
        componentUnderTest.playerState = { durationFrame: new Frame(29.97).setFromFrameNumber(1600) } as PlayerState;

        expect(componentUnderTest.readyToDisplay).toBe(false);
      });

      it('returns false if there is a current frame but no duration', () => {
        componentUnderTest.playerState = { currentFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.readyToDisplay).toBe(false);
      });

      it('returns true if there is a current frame and a duration', () => {
        componentUnderTest.playerState = {
          durationFrame: new Frame(29.97).setFromFrameNumber(1600),
          currentFrame: new Frame(29.97).setFromFrameNumber(42)
        } as PlayerState;

        expect(componentUnderTest.readyToDisplay).toBe(true);
      });
    });

    describe('largestFrameNumber getter', () => {
      it('returns a number one less than the current clip\'s duration in frames', () => {
        expect(componentUnderTest.largestFrameNumber).toBe(1599);
      });

      it('returns undefined if the player state is undefined', () => {
        componentUnderTest.playerState = undefined;

        expect(componentUnderTest.largestFrameNumber).toBeUndefined();
      });

      it('returns undefined if the duration is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.largestFrameNumber).toBeUndefined();
      });
    });

    describe('currentFrameNumber getter', () => {
      it('returns the number of the current frame', () => {
        componentUnderTest.playerState = { currentFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.currentFrameNumber).toBe(42);
      });

      it('returns undefined if the player state is undefined', () => {
        componentUnderTest.playerState = undefined;

        expect(componentUnderTest.currentFrameNumber).toBeUndefined();
      });

      it('returns undefined if the current frame is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.currentFrameNumber).toBeUndefined();
      });
    });

    describe('inMarkerIsSet getter', () => {
      it('returns true if the in marker is defined', () => {
        componentUnderTest.playerState = { inMarkerFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.inMarkerIsSet).toBe(true);
      });

      it('returns false if the player state is undefined', () => {
        componentUnderTest.playerState = null;

        expect(componentUnderTest.inMarkerIsSet).toBe(false);
      });

      it('returns false if the in marker is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.inMarkerIsSet).toBe(false);
      });
    });

    describe('inMarkerFrameNumber getter', () => {
      it('returns the number of the in marker frame', () => {
        componentUnderTest.playerState = { inMarkerFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.inMarkerFrameNumber).toBe(42);
      });

      it('returns undefined if the player state is undefined', () => {
        componentUnderTest.playerState = undefined;

        expect(componentUnderTest.inMarkerFrameNumber).toBeUndefined();
      });

      it('returns undefined if the in marker is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.inMarkerFrameNumber).toBeUndefined();
      });
    });

    describe('outMarkerIsSet getter', () => {
      it('returns true if the out marker is defined', () => {
        componentUnderTest.playerState = { outMarkerFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.outMarkerIsSet).toBe(true);
      });

      it('returns false if the player state is undefined', () => {
        componentUnderTest.playerState = null;

        expect(componentUnderTest.outMarkerIsSet).toBe(false);
      });

      it('returns false if the out marker is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.outMarkerIsSet).toBe(false);
      });
    });

    describe('outMarkerFrameNumber getter', () => {
      it('returns the number of the out marker frame', () => {
        componentUnderTest.playerState = { outMarkerFrame: new Frame(29.97).setFromFrameNumber(42) } as PlayerState;

        expect(componentUnderTest.outMarkerFrameNumber).toBe(42);
      });

      it('returns undefined if the player state is undefined', () => {
        componentUnderTest.playerState = undefined;

        expect(componentUnderTest.outMarkerFrameNumber).toBeUndefined();
      });

      it('returns undefined if the out marker is undefined', () => {
        componentUnderTest.playerState = {} as PlayerState;

        expect(componentUnderTest.outMarkerFrameNumber).toBeUndefined();
      });
    });

    describe('onSliderInput()', () => {
      it('requests a seek to the frame represented by the mouse\'s scrubber-relative X position', () => {
        // When the scrubber slider drags, that also creates mouse move events on the main slider, so that's
        // how we know where we are on the scrubber.
        componentUnderTest.onMouseOver();
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 200 });

        componentUnderTest.onSliderInput();

        expect(componentUnderTest.request.emit)
          .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new Frame(29.97).setFromFrameNumber(200 * framesPerPixel) });
      });
    });

    describe('mousemove handler', () => {
      const frameDisplayWidth: number = 50 + 1 + 1 + 5 + 5;
      const halfFrameDisplayWidth: number = frameDisplayWidth / 2;

      beforeEach(() => componentUnderTest.onMouseOver());

      it('sets the hover frame to the frame represented by the mouse\'s scrubber-relative X position', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });

        expect(componentUnderTest.hoverFrame).toEqual(new Frame(29.97).setFromFrameNumber(300 * framesPerPixel));
      });

      it('constrains the hover frame to >= 0', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset - 1 });

        expect(componentUnderTest.hoverFrame).toEqual(new Frame(29.97).setFromFrameNumber(0));
      });

      it('constrains the hover frame to <= the asset duration', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + scrubberWidth + 1 });

        expect(componentUnderTest.hoverFrame).toEqual(new Frame(29.97).setFromFrameNumber(durationInFrames));
      });

      it('sets the hover frame\'s source based offset if the playerState has one', () => {
        (componentUnderTest.playerState as any).sourceBasedOffset = '00:00:01:00';
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });

        expect(componentUnderTest.hoverFrame.sourceBasedOffsetFrames).toEqual(30);
      });

      it('sets the hover frame\'s source based offset if the playerState doesn\'t have one', () => {
        (componentUnderTest.playerState as any).sourceBasedOffset = '00:00:00:00';
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });

        expect(componentUnderTest.hoverFrame.sourceBasedOffsetFrames).toEqual(0);
      });

      it('sets the hover frame display position to center above the cursor', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });

        expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(300 - halfFrameDisplayWidth);
      });

      it('constrains the hover frame display position to >= 0', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + halfFrameDisplayWidth - 1 });

        expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(0);
      });

      it('constrains the hover frame display position to <= (right edge - display width)', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + scrubberWidth - halfFrameDisplayWidth + 1 });

        expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(scrubberWidth - frameDisplayWidth);
      });

      it('marks the component for change detection', () => {
        mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });

        expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
      });

      describe('when no longer hovering', () => {
        beforeEach(() => {
          // Set hover frame to verify later, then reset our spy.
          mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
          mockChangeDetectorRef.markForCheck.calls.reset();

          componentUnderTest.onMouseOut();
        });

        it('doesn\'t update the hover frame', () => {
          mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 500 });

          // same position as before the "mouseout" event
          expect(componentUnderTest.hoverFrame).toEqual(new Frame(29.97).setFromFrameNumber(300 * framesPerPixel));
        });

        it('doesn\'t mark the component for change detection', () => {
          mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 500 });

          expect(mockChangeDetectorRef.markForCheck).not.toHaveBeenCalled();
        });
      });

    });

    describe('onInMarkerClick()', () => {
      it('requests a seek to the in marker frame', () => {
        componentUnderTest.onInMarkerClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'in' });
      });
    });

    describe('onOutMarkerClick()', () => {
      it('requests a seek to the in marker frame', () => {
        componentUnderTest.onOutMarkerClick();

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'out' });
      });
    });

    describe('hoverFrameDisplayIsVisible getter', () => {
      it('returns false when neither hovering nor scrubbing', () => {
        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
      });

      it('returns true when just hovering', () => {
        componentUnderTest.onMouseOver();

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
      });

      it('returns true when hovering and scrubbing', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseDown();

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
      });

      it('returns true when hovering and scrubbing, then no longer scrubbing', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseDown();
        mockRenderer.trigger('mouseup');

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
      });

      it('returns true when hovering and scrubbing, then no longer hovering', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseDown();
        componentUnderTest.onMouseOut();

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
      });

      it('returns false when hovering and scrubbing, then no longer scrubbing, then no longer hovering', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseDown();
        mockRenderer.trigger('mouseup');
        componentUnderTest.onMouseOut();

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
      });

      it('returns false when hovering and scrubbing, then no longer hovering, then no longer scrubbing', () => {
        componentUnderTest.onMouseOver();
        componentUnderTest.onMouseDown();
        componentUnderTest.onMouseOut();
        mockRenderer.trigger('mouseup');

        expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
      });
    });
  });
}
