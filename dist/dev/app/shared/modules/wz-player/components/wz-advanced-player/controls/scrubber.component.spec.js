"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrubber_component_1 = require("./scrubber.component");
var index_1 = require("../../../../wazee-frame-formatter/index");
function main() {
    describe('Scrubber Component', function () {
        var componentUnderTest;
        var mockElementRef;
        var mockRenderer;
        var mockChangeDetectorRef;
        var mockDocument;
        var scrubberOffset = 25 + 25 + 50;
        var scrubberWidth = 400;
        var durationInFrames = 1600;
        var framesPerPixel = durationInFrames / scrubberWidth;
        beforeEach(function () {
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
                listen: function (element, eventName, callback) {
                    mockRenderer.elements[eventName] = element;
                    mockRenderer.callbacks[eventName] = callback;
                    var remover = jasmine.createSpy(eventName + " remover");
                    mockRenderer.removers[eventName] = remover;
                    return remover;
                },
                trigger: function (eventName, args) {
                    mockRenderer.callbacks[eventName](args);
                }
            };
            mockChangeDetectorRef = {
                markForCheck: jasmine.createSpy('markForCheck')
            };
            componentUnderTest = new scrubber_component_1.ScrubberComponent(mockElementRef, mockRenderer, mockChangeDetectorRef);
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
            componentUnderTest.playerState = {
                durationFrame: new index_1.Frame(29.97).setFromFrameNumber(durationInFrames),
                framesPerSecond: 29.97
            };
            mockDocument = {};
            componentUnderTest.window = {
                getComputedStyle: function () {
                    return {
                        getPropertyValue: function (propertyName) {
                            switch (propertyName) {
                                case 'border-left-width': return '1';
                                case 'border-right-width': return '1';
                                case 'padding-left': return '5';
                                case 'padding-right': return '5';
                                case 'width': return "50";
                            }
                            throw new Error('unexpected propertyName');
                        }
                    };
                },
                document: mockDocument
            };
            componentUnderTest.ngOnInit();
        });
        describe('ngOnInit()', function () {
            it('sets up document mouse move listener', function () {
                expect(mockRenderer.elements['mousemove']).toEqual(mockDocument);
            });
            it('sets up document mouse up listener', function () {
                expect(mockRenderer.elements['mouseup']).toEqual(mockDocument);
            });
        });
        describe('ngOnDestroy()', function () {
            it('removes document mouse move listener', function () {
                componentUnderTest.ngOnDestroy();
                expect(mockRenderer.removers['mousemove']).toHaveBeenCalled();
            });
            it('removes document mouse up listener', function () {
                componentUnderTest.ngOnDestroy();
                expect(mockRenderer.removers['mouseup']).toHaveBeenCalled();
            });
        });
        describe('readyToDisplay getter', function () {
            it('returns false if there is no player state', function () {
                componentUnderTest.playerState = undefined;
                expect(componentUnderTest.readyToDisplay).toBe(false);
            });
            it('returns false if there is no duration and no current frame', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.readyToDisplay).toBe(false);
            });
            it('returns false if there is a duration but no current frame', function () {
                componentUnderTest.playerState = { durationFrame: new index_1.Frame(29.97).setFromFrameNumber(1600) };
                expect(componentUnderTest.readyToDisplay).toBe(false);
            });
            it('returns false if there is a current frame but no duration', function () {
                componentUnderTest.playerState = { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.readyToDisplay).toBe(false);
            });
            it('returns true if there is a current frame and a duration', function () {
                componentUnderTest.playerState = {
                    durationFrame: new index_1.Frame(29.97).setFromFrameNumber(1600),
                    currentFrame: new index_1.Frame(29.97).setFromFrameNumber(42)
                };
                expect(componentUnderTest.readyToDisplay).toBe(true);
            });
        });
        describe('largestFrameNumber getter', function () {
            it('returns a number one less than the current clip\'s duration in frames', function () {
                expect(componentUnderTest.largestFrameNumber).toBe(1599);
            });
            it('returns undefined if the player state is undefined', function () {
                componentUnderTest.playerState = undefined;
                expect(componentUnderTest.largestFrameNumber).toBeUndefined();
            });
            it('returns undefined if the duration is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.largestFrameNumber).toBeUndefined();
            });
        });
        describe('currentFrameNumber getter', function () {
            it('returns the number of the current frame', function () {
                componentUnderTest.playerState = { currentFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.currentFrameNumber).toBe(42);
            });
            it('returns undefined if the player state is undefined', function () {
                componentUnderTest.playerState = undefined;
                expect(componentUnderTest.currentFrameNumber).toBeUndefined();
            });
            it('returns undefined if the current frame is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.currentFrameNumber).toBeUndefined();
            });
        });
        describe('inMarkerIsSet getter', function () {
            it('returns true if the in marker is defined', function () {
                componentUnderTest.playerState = { inMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.inMarkerIsSet).toBe(true);
            });
            it('returns false if the player state is undefined', function () {
                componentUnderTest.playerState = null;
                expect(componentUnderTest.inMarkerIsSet).toBe(false);
            });
            it('returns false if the in marker is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.inMarkerIsSet).toBe(false);
            });
        });
        describe('inMarkerFrameNumber getter', function () {
            it('returns the number of the in marker frame', function () {
                componentUnderTest.playerState = { inMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.inMarkerFrameNumber).toBe(42);
            });
            it('returns undefined if the player state is undefined', function () {
                componentUnderTest.playerState = undefined;
                expect(componentUnderTest.inMarkerFrameNumber).toBeUndefined();
            });
            it('returns undefined if the in marker is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.inMarkerFrameNumber).toBeUndefined();
            });
        });
        describe('outMarkerIsSet getter', function () {
            it('returns true if the out marker is defined', function () {
                componentUnderTest.playerState = { outMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.outMarkerIsSet).toBe(true);
            });
            it('returns false if the player state is undefined', function () {
                componentUnderTest.playerState = null;
                expect(componentUnderTest.outMarkerIsSet).toBe(false);
            });
            it('returns false if the out marker is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.outMarkerIsSet).toBe(false);
            });
        });
        describe('outMarkerFrameNumber getter', function () {
            it('returns the number of the out marker frame', function () {
                componentUnderTest.playerState = { outMarkerFrame: new index_1.Frame(29.97).setFromFrameNumber(42) };
                expect(componentUnderTest.outMarkerFrameNumber).toBe(42);
            });
            it('returns undefined if the player state is undefined', function () {
                componentUnderTest.playerState = undefined;
                expect(componentUnderTest.outMarkerFrameNumber).toBeUndefined();
            });
            it('returns undefined if the out marker is undefined', function () {
                componentUnderTest.playerState = {};
                expect(componentUnderTest.outMarkerFrameNumber).toBeUndefined();
            });
        });
        describe('onSliderInput()', function () {
            it('requests a seek to the frame represented by the mouse\'s scrubber-relative X position', function () {
                componentUnderTest.onMouseOver();
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 200 });
                componentUnderTest.onSliderInput();
                expect(componentUnderTest.request.emit)
                    .toHaveBeenCalledWith({ type: 'SEEK_TO_FRAME', frame: new index_1.Frame(29.97).setFromFrameNumber(200 * framesPerPixel) });
            });
        });
        describe('mousemove handler', function () {
            var frameDisplayWidth = 50 + 1 + 1 + 5 + 5;
            var halfFrameDisplayWidth = frameDisplayWidth / 2;
            beforeEach(function () { return componentUnderTest.onMouseOver(); });
            it('sets the hover frame to the frame represented by the mouse\'s scrubber-relative X position', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                expect(componentUnderTest.hoverFrame).toEqual(new index_1.Frame(29.97).setFromFrameNumber(300 * framesPerPixel));
            });
            it('constrains the hover frame to >= 0', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset - 1 });
                expect(componentUnderTest.hoverFrame).toEqual(new index_1.Frame(29.97).setFromFrameNumber(0));
            });
            it('constrains the hover frame to <= the asset duration', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + scrubberWidth + 1 });
                expect(componentUnderTest.hoverFrame).toEqual(new index_1.Frame(29.97).setFromFrameNumber(durationInFrames));
            });
            it('sets the hover frame\'s source based offset if the playerState has one', function () {
                componentUnderTest.playerState.sourceBasedOffset = '00:00:01:00';
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                expect(componentUnderTest.hoverFrame.sourceBasedOffsetFrames).toEqual(30);
            });
            it('sets the hover frame\'s source based offset if the playerState doesn\'t have one', function () {
                componentUnderTest.playerState.sourceBasedOffset = '00:00:00:00';
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                expect(componentUnderTest.hoverFrame.sourceBasedOffsetFrames).toEqual(0);
            });
            it('sets the hover frame display position to center above the cursor', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(300 - halfFrameDisplayWidth);
            });
            it('constrains the hover frame display position to >= 0', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + halfFrameDisplayWidth - 1 });
                expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(0);
            });
            it('constrains the hover frame display position to <= (right edge - display width)', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + scrubberWidth - halfFrameDisplayWidth + 1 });
                expect(componentUnderTest.hoverFrameDisplayPosition).toEqual(scrubberWidth - frameDisplayWidth);
            });
            it('marks the component for change detection', function () {
                mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
            });
            describe('when no longer hovering', function () {
                beforeEach(function () {
                    mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 300 });
                    mockChangeDetectorRef.markForCheck.calls.reset();
                    componentUnderTest.onMouseOut();
                });
                it('doesn\'t update the hover frame', function () {
                    mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 500 });
                    expect(componentUnderTest.hoverFrame).toEqual(new index_1.Frame(29.97).setFromFrameNumber(300 * framesPerPixel));
                });
                it('doesn\'t mark the component for change detection', function () {
                    mockRenderer.trigger('mousemove', { pageX: scrubberOffset + 500 });
                    expect(mockChangeDetectorRef.markForCheck).not.toHaveBeenCalled();
                });
            });
        });
        describe('onInMarkerClick()', function () {
            it('requests a seek to the in marker frame', function () {
                componentUnderTest.onInMarkerClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'in' });
            });
        });
        describe('onOutMarkerClick()', function () {
            it('requests a seek to the in marker frame', function () {
                componentUnderTest.onOutMarkerClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'SEEK_TO_MARKER', markerType: 'out' });
            });
        });
        describe('hoverFrameDisplayIsVisible getter', function () {
            it('returns false when neither hovering nor scrubbing', function () {
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
            });
            it('returns true when just hovering', function () {
                componentUnderTest.onMouseOver();
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
            });
            it('returns true when hovering and scrubbing', function () {
                componentUnderTest.onMouseOver();
                componentUnderTest.onMouseDown();
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
            });
            it('returns true when hovering and scrubbing, then no longer scrubbing', function () {
                componentUnderTest.onMouseOver();
                componentUnderTest.onMouseDown();
                mockRenderer.trigger('mouseup');
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
            });
            it('returns true when hovering and scrubbing, then no longer hovering', function () {
                componentUnderTest.onMouseOver();
                componentUnderTest.onMouseDown();
                componentUnderTest.onMouseOut();
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(true);
            });
            it('returns false when hovering and scrubbing, then no longer scrubbing, then no longer hovering', function () {
                componentUnderTest.onMouseOver();
                componentUnderTest.onMouseDown();
                mockRenderer.trigger('mouseup');
                componentUnderTest.onMouseOut();
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
            });
            it('returns false when hovering and scrubbing, then no longer hovering, then no longer scrubbing', function () {
                componentUnderTest.onMouseOver();
                componentUnderTest.onMouseDown();
                componentUnderTest.onMouseOut();
                mockRenderer.trigger('mouseup');
                expect(componentUnderTest.hoverFrameDisplayIsVisible).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvc2NydWJiZXIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBeUQ7QUFDekQsaUVBQWdFO0FBR2hFO0lBQ0UsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLElBQUksa0JBQXFDLENBQUM7UUFDMUMsSUFBSSxjQUFtQixDQUFDO1FBQ3hCLElBQUksWUFBaUIsQ0FBQztRQUN0QixJQUFJLHFCQUEwQixDQUFDO1FBQy9CLElBQUksWUFBaUIsQ0FBQztRQUV0QixJQUFNLGNBQWMsR0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUM1QyxJQUFNLGFBQWEsR0FBVyxHQUFHLENBQUM7UUFDbEMsSUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFDdEMsSUFBTSxjQUFjLEdBQVcsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDO1FBRWhFLFVBQVUsQ0FBQztZQUNULGNBQWMsR0FBRztnQkFDZixhQUFhLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLFVBQVUsRUFBRSxFQUFFO3dCQUNkLFlBQVksRUFBRTs0QkFDWixVQUFVLEVBQUUsRUFBRTs0QkFDZCxZQUFZLEVBQUUsSUFBSTt5QkFDbkI7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFO3dCQUNSOzRCQUNFLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs0QkFDdkIsV0FBVyxFQUFFLGFBQWE7NEJBQzFCLFFBQVEsRUFBRTtnQ0FDUjtvQ0FDRSxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQ0FDakMsV0FBVyxFQUFFLGFBQWE7aUNBQzNCOzZCQUNGO3lCQUNGO3dCQUNEOzRCQUNFLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3lCQUNuQztxQkFDRjtpQkFDRjthQUNGLENBQUM7WUFFRixZQUFZ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Q0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDhGQUE4RixFQUFFO2dCQUNqRyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2pDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNoQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVoQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFiRCxvQkEwYkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9zY3J1YmJlci5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjcnViYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zY3J1YmJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NjcnViYmVyIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBTY3J1YmJlckNvbXBvbmVudDtcbiAgICBsZXQgbW9ja0VsZW1lbnRSZWY6IGFueTtcbiAgICBsZXQgbW9ja1JlbmRlcmVyOiBhbnk7XG4gICAgbGV0IG1vY2tDaGFuZ2VEZXRlY3RvclJlZjogYW55O1xuICAgIGxldCBtb2NrRG9jdW1lbnQ6IGFueTtcblxuICAgIGNvbnN0IHNjcnViYmVyT2Zmc2V0OiBudW1iZXIgPSAyNSArIDI1ICsgNTA7XG4gICAgY29uc3Qgc2NydWJiZXJXaWR0aDogbnVtYmVyID0gNDAwO1xuICAgIGNvbnN0IGR1cmF0aW9uSW5GcmFtZXM6IG51bWJlciA9IDE2MDA7XG4gICAgY29uc3QgZnJhbWVzUGVyUGl4ZWw6IG51bWJlciA9IGR1cmF0aW9uSW5GcmFtZXMgLyBzY3J1YmJlcldpZHRoO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRWxlbWVudFJlZiA9IHtcbiAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgIG9mZnNldExlZnQ6IDI1LFxuICAgICAgICAgIG9mZnNldFBhcmVudDoge1xuICAgICAgICAgICAgb2Zmc2V0TGVmdDogMjUsXG4gICAgICAgICAgICBvZmZzZXRQYXJlbnQ6IHtcbiAgICAgICAgICAgICAgb2Zmc2V0TGVmdDogNTAsXG4gICAgICAgICAgICAgIG9mZnNldFBhcmVudDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3NMaXN0OiBbJ3NjcnViYmVyJ10sXG4gICAgICAgICAgICAgIG9mZnNldFdpZHRoOiBzY3J1YmJlcldpZHRoLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTGlzdDogWydtYXQtc2xpZGVyLXdyYXBwZXInXSxcbiAgICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoOiBzY3J1YmJlcldpZHRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc0xpc3Q6IFsnaG92ZXItZnJhbWUtZGlzcGxheSddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrUmVuZGVyZXIgPSB7XG4gICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgY2FsbGJhY2tzOiB7fSxcbiAgICAgICAgcmVtb3ZlcnM6IHt9LFxuICAgICAgICBsaXN0ZW46IChlbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICBtb2NrUmVuZGVyZXIuZWxlbWVudHNbZXZlbnROYW1lXSA9IGVsZW1lbnQ7XG4gICAgICAgICAgbW9ja1JlbmRlcmVyLmNhbGxiYWNrc1tldmVudE5hbWVdID0gY2FsbGJhY2s7XG5cbiAgICAgICAgICBjb25zdCByZW1vdmVyID0gamFzbWluZS5jcmVhdGVTcHkoYCR7ZXZlbnROYW1lfSByZW1vdmVyYCk7XG4gICAgICAgICAgbW9ja1JlbmRlcmVyLnJlbW92ZXJzW2V2ZW50TmFtZV0gPSByZW1vdmVyO1xuICAgICAgICAgIHJldHVybiByZW1vdmVyO1xuICAgICAgICB9LFxuICAgICAgICB0cmlnZ2VyOiAoZXZlbnROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueSkgPT4ge1xuICAgICAgICAgIG1vY2tSZW5kZXJlci5jYWxsYmFja3NbZXZlbnROYW1lXShhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmID0ge1xuICAgICAgICBtYXJrRm9yQ2hlY2s6IGphc21pbmUuY3JlYXRlU3B5KCdtYXJrRm9yQ2hlY2snKVxuICAgICAgfTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFNjcnViYmVyQ29tcG9uZW50KG1vY2tFbGVtZW50UmVmLCBtb2NrUmVuZGVyZXIsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0ID0gamFzbWluZS5jcmVhdGVTcHkoJ3JlcXVlc3QgZW1pdHRlcicpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7XG4gICAgICAgIGR1cmF0aW9uRnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKGR1cmF0aW9uSW5GcmFtZXMpLFxuICAgICAgICBmcmFtZXNQZXJTZWNvbmQ6IDI5Ljk3XG4gICAgICB9IGFzIFBsYXllclN0YXRlO1xuXG4gICAgICBtb2NrRG9jdW1lbnQgPSB7fTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LndpbmRvdyA9IHtcbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZTogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlOiAocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvcmRlci1sZWZ0LXdpZHRoJzogcmV0dXJuICcxJztcbiAgICAgICAgICAgICAgICBjYXNlICdib3JkZXItcmlnaHQtd2lkdGgnOiByZXR1cm4gJzEnO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmctbGVmdCc6IHJldHVybiAnNSc7XG4gICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZy1yaWdodCc6IHJldHVybiAnNSc7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOiByZXR1cm4gYDUwYDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCBwcm9wZXJ0eU5hbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBkb2N1bWVudDogbW9ja0RvY3VtZW50XG4gICAgICB9O1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3NldHMgdXAgZG9jdW1lbnQgbW91c2UgbW92ZSBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tSZW5kZXJlci5lbGVtZW50c1snbW91c2Vtb3ZlJ10pLnRvRXF1YWwobW9ja0RvY3VtZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyB1cCBkb2N1bWVudCBtb3VzZSB1cCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tSZW5kZXJlci5lbGVtZW50c1snbW91c2V1cCddKS50b0VxdWFsKG1vY2tEb2N1bWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uRGVzdHJveSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JlbW92ZXMgZG9jdW1lbnQgbW91c2UgbW92ZSBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tSZW5kZXJlci5yZW1vdmVyc1snbW91c2Vtb3ZlJ10pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVtb3ZlcyBkb2N1bWVudCBtb3VzZSB1cCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tSZW5kZXJlci5yZW1vdmVyc1snbW91c2V1cCddKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWFkeVRvRGlzcGxheSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBubyBwbGF5ZXIgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlYWR5VG9EaXNwbGF5KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBubyBkdXJhdGlvbiBhbmQgbm8gY3VycmVudCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge30gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZWFkeVRvRGlzcGxheSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgYSBkdXJhdGlvbiBidXQgbm8gY3VycmVudCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0geyBkdXJhdGlvbkZyYW1lOiBuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcigxNjAwKSB9IGFzIFBsYXllclN0YXRlO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVhZHlUb0Rpc3BsYXkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGlzIGEgY3VycmVudCBmcmFtZSBidXQgbm8gZHVyYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgY3VycmVudEZyYW1lOiBuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcig0MikgfSBhcyBQbGF5ZXJTdGF0ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJlYWR5VG9EaXNwbGF5KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGEgY3VycmVudCBmcmFtZSBhbmQgYSBkdXJhdGlvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge1xuICAgICAgICAgIGR1cmF0aW9uRnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDE2MDApLFxuICAgICAgICAgIGN1cnJlbnRGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpXG4gICAgICAgIH0gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZWFkeVRvRGlzcGxheSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xhcmdlc3RGcmFtZU51bWJlciBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBhIG51bWJlciBvbmUgbGVzcyB0aGFuIHRoZSBjdXJyZW50IGNsaXBcXCdzIGR1cmF0aW9uIGluIGZyYW1lcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5sYXJnZXN0RnJhbWVOdW1iZXIpLnRvQmUoMTU5OSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBwbGF5ZXIgc3RhdGUgaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5sYXJnZXN0RnJhbWVOdW1iZXIpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGR1cmF0aW9uIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge30gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5sYXJnZXN0RnJhbWVOdW1iZXIpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2N1cnJlbnRGcmFtZU51bWJlciBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIG9mIHRoZSBjdXJyZW50IGZyYW1lJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7IGN1cnJlbnRGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpIH0gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jdXJyZW50RnJhbWVOdW1iZXIpLnRvQmUoNDIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgcGxheWVyIHN0YXRlIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY3VycmVudEZyYW1lTnVtYmVyKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBjdXJyZW50IGZyYW1lIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge30gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jdXJyZW50RnJhbWVOdW1iZXIpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2luTWFya2VySXNTZXQgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgaW4gbWFya2VyIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgaW5NYXJrZXJGcmFtZTogbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDIpIH0gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pbk1hcmtlcklzU2V0KS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBwbGF5ZXIgc3RhdGUgaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSBudWxsO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5NYXJrZXJJc1NldCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGluIG1hcmtlciBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHt9IGFzIFBsYXllclN0YXRlO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5NYXJrZXJJc1NldCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbk1hcmtlckZyYW1lTnVtYmVyIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIGluIG1hcmtlciBmcmFtZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0geyBpbk1hcmtlckZyYW1lOiBuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcig0MikgfSBhcyBQbGF5ZXJTdGF0ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmluTWFya2VyRnJhbWVOdW1iZXIpLnRvQmUoNDIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgcGxheWVyIHN0YXRlIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5NYXJrZXJGcmFtZU51bWJlcikudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgaW4gbWFya2VyIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0ge30gYXMgUGxheWVyU3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pbk1hcmtlckZyYW1lTnVtYmVyKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvdXRNYXJrZXJJc1NldCBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBvdXQgbWFya2VyIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgb3V0TWFya2VyRnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDQyKSB9IGFzIFBsYXllclN0YXRlO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub3V0TWFya2VySXNTZXQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIHBsYXllciBzdGF0ZSBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IG51bGw7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vdXRNYXJrZXJJc1NldCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG91dCBtYXJrZXIgaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7fSBhcyBQbGF5ZXJTdGF0ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm91dE1hcmtlcklzU2V0KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ291dE1hcmtlckZyYW1lTnVtYmVyIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIG91dCBtYXJrZXIgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSA9IHsgb3V0TWFya2VyRnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDQyKSB9IGFzIFBsYXllclN0YXRlO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub3V0TWFya2VyRnJhbWVOdW1iZXIpLnRvQmUoNDIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgcGxheWVyIHN0YXRlIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub3V0TWFya2VyRnJhbWVOdW1iZXIpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIG91dCBtYXJrZXIgaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyU3RhdGUgPSB7fSBhcyBQbGF5ZXJTdGF0ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm91dE1hcmtlckZyYW1lTnVtYmVyKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblNsaWRlcklucHV0KCknLCAoKSA9PiB7XG4gICAgICBpdCgncmVxdWVzdHMgYSBzZWVrIHRvIHRoZSBmcmFtZSByZXByZXNlbnRlZCBieSB0aGUgbW91c2VcXCdzIHNjcnViYmVyLXJlbGF0aXZlIFggcG9zaXRpb24nLCAoKSA9PiB7XG4gICAgICAgIC8vIFdoZW4gdGhlIHNjcnViYmVyIHNsaWRlciBkcmFncywgdGhhdCBhbHNvIGNyZWF0ZXMgbW91c2UgbW92ZSBldmVudHMgb24gdGhlIG1haW4gc2xpZGVyLCBzbyB0aGF0J3NcbiAgICAgICAgLy8gaG93IHdlIGtub3cgd2hlcmUgd2UgYXJlIG9uIHRoZSBzY3J1YmJlci5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTW91c2VPdmVyKCk7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIDIwMCB9KTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TbGlkZXJJbnB1dCgpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KVxuICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdTRUVLX1RPX0ZSQU1FJywgZnJhbWU6IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDIwMCAqIGZyYW1lc1BlclBpeGVsKSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ21vdXNlbW92ZSBoYW5kbGVyJywgKCkgPT4ge1xuICAgICAgY29uc3QgZnJhbWVEaXNwbGF5V2lkdGg6IG51bWJlciA9IDUwICsgMSArIDEgKyA1ICsgNTtcbiAgICAgIGNvbnN0IGhhbGZGcmFtZURpc3BsYXlXaWR0aDogbnVtYmVyID0gZnJhbWVEaXNwbGF5V2lkdGggLyAyO1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3ZlcigpKTtcblxuICAgICAgaXQoJ3NldHMgdGhlIGhvdmVyIGZyYW1lIHRvIHRoZSBmcmFtZSByZXByZXNlbnRlZCBieSB0aGUgbW91c2VcXCdzIHNjcnViYmVyLXJlbGF0aXZlIFggcG9zaXRpb24nLCAoKSA9PiB7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIDMwMCB9KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmhvdmVyRnJhbWUpLnRvRXF1YWwobmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoMzAwICogZnJhbWVzUGVyUGl4ZWwpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY29uc3RyYWlucyB0aGUgaG92ZXIgZnJhbWUgdG8gPj0gMCcsICgpID0+IHtcbiAgICAgICAgbW9ja1JlbmRlcmVyLnRyaWdnZXIoJ21vdXNlbW92ZScsIHsgcGFnZVg6IHNjcnViYmVyT2Zmc2V0IC0gMSB9KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmhvdmVyRnJhbWUpLnRvRXF1YWwobmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoMCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb25zdHJhaW5zIHRoZSBob3ZlciBmcmFtZSB0byA8PSB0aGUgYXNzZXQgZHVyYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIHNjcnViYmVyV2lkdGggKyAxIH0pO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZSkudG9FcXVhbChuZXcgRnJhbWUoMjkuOTcpLnNldEZyb21GcmFtZU51bWJlcihkdXJhdGlvbkluRnJhbWVzKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIGhvdmVyIGZyYW1lXFwncyBzb3VyY2UgYmFzZWQgb2Zmc2V0IGlmIHRoZSBwbGF5ZXJTdGF0ZSBoYXMgb25lJywgKCkgPT4ge1xuICAgICAgICAoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlIGFzIGFueSkuc291cmNlQmFzZWRPZmZzZXQgPSAnMDA6MDA6MDE6MDAnO1xuICAgICAgICBtb2NrUmVuZGVyZXIudHJpZ2dlcignbW91c2Vtb3ZlJywgeyBwYWdlWDogc2NydWJiZXJPZmZzZXQgKyAzMDAgfSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ob3ZlckZyYW1lLnNvdXJjZUJhc2VkT2Zmc2V0RnJhbWVzKS50b0VxdWFsKDMwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyB0aGUgaG92ZXIgZnJhbWVcXCdzIHNvdXJjZSBiYXNlZCBvZmZzZXQgaWYgdGhlIHBsYXllclN0YXRlIGRvZXNuXFwndCBoYXZlIG9uZScsICgpID0+IHtcbiAgICAgICAgKGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXJTdGF0ZSBhcyBhbnkpLnNvdXJjZUJhc2VkT2Zmc2V0ID0gJzAwOjAwOjAwOjAwJztcbiAgICAgICAgbW9ja1JlbmRlcmVyLnRyaWdnZXIoJ21vdXNlbW92ZScsIHsgcGFnZVg6IHNjcnViYmVyT2Zmc2V0ICsgMzAwIH0pO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZS5zb3VyY2VCYXNlZE9mZnNldEZyYW1lcykudG9FcXVhbCgwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyB0aGUgaG92ZXIgZnJhbWUgZGlzcGxheSBwb3NpdGlvbiB0byBjZW50ZXIgYWJvdmUgdGhlIGN1cnNvcicsICgpID0+IHtcbiAgICAgICAgbW9ja1JlbmRlcmVyLnRyaWdnZXIoJ21vdXNlbW92ZScsIHsgcGFnZVg6IHNjcnViYmVyT2Zmc2V0ICsgMzAwIH0pO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZURpc3BsYXlQb3NpdGlvbikudG9FcXVhbCgzMDAgLSBoYWxmRnJhbWVEaXNwbGF5V2lkdGgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb25zdHJhaW5zIHRoZSBob3ZlciBmcmFtZSBkaXNwbGF5IHBvc2l0aW9uIHRvID49IDAnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIGhhbGZGcmFtZURpc3BsYXlXaWR0aCAtIDEgfSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ob3ZlckZyYW1lRGlzcGxheVBvc2l0aW9uKS50b0VxdWFsKDApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb25zdHJhaW5zIHRoZSBob3ZlciBmcmFtZSBkaXNwbGF5IHBvc2l0aW9uIHRvIDw9IChyaWdodCBlZGdlIC0gZGlzcGxheSB3aWR0aCknLCAoKSA9PiB7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIHNjcnViYmVyV2lkdGggLSBoYWxmRnJhbWVEaXNwbGF5V2lkdGggKyAxIH0pO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZURpc3BsYXlQb3NpdGlvbikudG9FcXVhbChzY3J1YmJlcldpZHRoIC0gZnJhbWVEaXNwbGF5V2lkdGgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdtYXJrcyB0aGUgY29tcG9uZW50IGZvciBjaGFuZ2UgZGV0ZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrUmVuZGVyZXIudHJpZ2dlcignbW91c2Vtb3ZlJywgeyBwYWdlWDogc2NydWJiZXJPZmZzZXQgKyAzMDAgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tDaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2hlbiBubyBsb25nZXIgaG92ZXJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIC8vIFNldCBob3ZlciBmcmFtZSB0byB2ZXJpZnkgbGF0ZXIsIHRoZW4gcmVzZXQgb3VyIHNweS5cbiAgICAgICAgICBtb2NrUmVuZGVyZXIudHJpZ2dlcignbW91c2Vtb3ZlJywgeyBwYWdlWDogc2NydWJiZXJPZmZzZXQgKyAzMDAgfSk7XG4gICAgICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjay5jYWxscy5yZXNldCgpO1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTW91c2VPdXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXNuXFwndCB1cGRhdGUgdGhlIGhvdmVyIGZyYW1lJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZW1vdmUnLCB7IHBhZ2VYOiBzY3J1YmJlck9mZnNldCArIDUwMCB9KTtcblxuICAgICAgICAgIC8vIHNhbWUgcG9zaXRpb24gYXMgYmVmb3JlIHRoZSBcIm1vdXNlb3V0XCIgZXZlbnRcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmhvdmVyRnJhbWUpLnRvRXF1YWwobmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoMzAwICogZnJhbWVzUGVyUGl4ZWwpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXNuXFwndCBtYXJrIHRoZSBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1JlbmRlcmVyLnRyaWdnZXIoJ21vdXNlbW92ZScsIHsgcGFnZVg6IHNjcnViYmVyT2Zmc2V0ICsgNTAwIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tDaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2spLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkluTWFya2VyQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXF1ZXN0cyBhIHNlZWsgdG8gdGhlIGluIG1hcmtlciBmcmFtZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uSW5NYXJrZXJDbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdTRUVLX1RPX01BUktFUicsIG1hcmtlclR5cGU6ICdpbicgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk91dE1hcmtlckNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmVxdWVzdHMgYSBzZWVrIHRvIHRoZSBpbiBtYXJrZXIgZnJhbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk91dE1hcmtlckNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ1NFRUtfVE9fTUFSS0VSJywgbWFya2VyVHlwZTogJ291dCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdob3ZlckZyYW1lRGlzcGxheUlzVmlzaWJsZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIG5laXRoZXIgaG92ZXJpbmcgbm9yIHNjcnViYmluZycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ob3ZlckZyYW1lRGlzcGxheUlzVmlzaWJsZSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGp1c3QgaG92ZXJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3ZlcigpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZURpc3BsYXlJc1Zpc2libGUpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGhvdmVyaW5nIGFuZCBzY3J1YmJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3ZlcigpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Nb3VzZURvd24oKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBob3ZlcmluZyBhbmQgc2NydWJiaW5nLCB0aGVuIG5vIGxvbmdlciBzY3J1YmJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3ZlcigpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Nb3VzZURvd24oKTtcbiAgICAgICAgbW9ja1JlbmRlcmVyLnRyaWdnZXIoJ21vdXNldXAnKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBob3ZlcmluZyBhbmQgc2NydWJiaW5nLCB0aGVuIG5vIGxvbmdlciBob3ZlcmluZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTW91c2VPdmVyKCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlRG93bigpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Nb3VzZU91dCgpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaG92ZXJGcmFtZURpc3BsYXlJc1Zpc2libGUpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBob3ZlcmluZyBhbmQgc2NydWJiaW5nLCB0aGVuIG5vIGxvbmdlciBzY3J1YmJpbmcsIHRoZW4gbm8gbG9uZ2VyIGhvdmVyaW5nJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Nb3VzZU92ZXIoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTW91c2VEb3duKCk7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZXVwJyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3V0KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ob3ZlckZyYW1lRGlzcGxheUlzVmlzaWJsZSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBob3ZlcmluZyBhbmQgc2NydWJiaW5nLCB0aGVuIG5vIGxvbmdlciBob3ZlcmluZywgdGhlbiBubyBsb25nZXIgc2NydWJiaW5nJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Nb3VzZU92ZXIoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTW91c2VEb3duKCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk1vdXNlT3V0KCk7XG4gICAgICAgIG1vY2tSZW5kZXJlci50cmlnZ2VyKCdtb3VzZXVwJyk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ob3ZlckZyYW1lRGlzcGxheUlzVmlzaWJsZSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
