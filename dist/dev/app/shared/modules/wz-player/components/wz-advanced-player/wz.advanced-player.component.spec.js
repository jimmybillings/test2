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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var wz_advanced_player_component_1 = require("./wz.advanced-player.component");
var index_1 = require("../../../wazee-frame-formatter/index");
function main() {
    describe('Wazee Advanced Player Component', function () {
        var initialPlayerState = {
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
            volume: 100,
            sourceBasedOffset: '00:00:00:00',
            timecodeFormat: index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION,
            timecodeBase: index_1.TimecodeBase.STREAM_BASED,
            changeDetectionEnabler: 0
        };
        var componentUnderTest;
        var mockPlayerStateService;
        var mockAsset;
        var simulatedStateSubject;
        var simulatedStateObservable;
        beforeEach(function () {
            simulatedStateSubject = new BehaviorSubject_1.BehaviorSubject(initialPlayerState);
            simulatedStateObservable = simulatedStateSubject.asObservable();
            mockPlayerStateService = {
                reset: jasmine.createSpy('reset'),
                updateWith: jasmine.createSpy('updateWith'),
                state: simulatedStateObservable
            };
            mockAsset = {
                some: 'asset',
                getMetadataValueFor: jasmine.createSpy('getMetadataValueFor').and.returnValue('01:02:03:04')
            };
            componentUnderTest = new wz_advanced_player_component_1.WzAdvancedPlayerComponent(mockPlayerStateService);
            componentUnderTest.markersInitialization.emit = jasmine.createSpy('markersInitialization emitter');
            componentUnderTest.markerChange.emit = jasmine.createSpy('markerChange emitter');
            componentUnderTest.player = {
                clearMarkers: jasmine.createSpy('clearMarkers'),
                playAtSpeed: jasmine.createSpy('playAtSpeed'),
                pause: jasmine.createSpy('pause'),
                seekTo: jasmine.createSpy('seekTo'),
                seekToInMarker: jasmine.createSpy('seekToInMarker'),
                seekToOutMarker: jasmine.createSpy('seekToOutMarker'),
                setInMarkerToCurrentTime: jasmine.createSpy('setInMarkerToCurrentTime'),
                setOutMarkerToCurrentTime: jasmine.createSpy('setOutMarkerToCurrentTime'),
                setVolumeTo: jasmine.createSpy('setVolumeTo'),
                toggleMarkersPlayback: jasmine.createSpy('toggleMarkersPlayback'),
                toggleMute: jasmine.createSpy('toggleMute'),
                togglePlayback: jasmine.createSpy('togglePlayback')
            };
            componentUnderTest.ngOnInit();
        });
        describe('asset setter', function () {
            it('sets the current asset', function () {
                componentUnderTest.asset = mockAsset;
                expect(componentUnderTest.asset).toEqual(mockAsset);
            });
            it('gets the Format.TimeStart metadata from the asset', function () {
                componentUnderTest.asset = mockAsset;
                expect(mockAsset.getMetadataValueFor).toHaveBeenCalledWith('Format.TimeStart');
            });
            it('updates the player state with the source-based offset', function () {
                componentUnderTest.asset = mockAsset;
                expect(mockPlayerStateService.updateWith).toHaveBeenCalledWith({ sourceBasedOffset: '01:02:03:04' });
            });
        });
        describe('assetIsVideo()', function () {
            it('returns true if the asset\'s resource type is anything but \'Image\'', function () {
                componentUnderTest.asset = __assign({}, mockAsset, { resourceClass: 'whatever' });
                expect(componentUnderTest.assetIsVideo()).toBe(true);
            });
            it('returns true if the asset has no resourceClass property', function () {
                componentUnderTest.asset = mockAsset;
                expect(componentUnderTest.assetIsVideo()).toBe(true);
            });
            it('returns false if the asset\'s resource type is \'Image\'', function () {
                componentUnderTest.asset = __assign({}, mockAsset, { resourceClass: 'Image' });
                expect(componentUnderTest.assetIsVideo()).toBe(false);
            });
            it('returns false if the asset has not been set', function () {
                expect(componentUnderTest.assetIsVideo()).toBe(false);
            });
        });
        describe('playerState getter', function () {
            it('returns the state from the PlayerStateService', function () {
                expect(componentUnderTest.playerState).toBe(mockPlayerStateService.state);
            });
        });
        describe('markersInitialization output', function () {
            describe('when an asset is loaded', function () {
                beforeEach(function () {
                    componentUnderTest.asset = mockAsset;
                });
                describe('before the player is ready', function () {
                    it('is not emitted yet', function () {
                        expect(componentUnderTest.markersInitialization.emit).not.toHaveBeenCalled();
                    });
                });
                describe('when the player is ready', function () {
                    beforeEach(function () {
                        simulatedStateSubject.next({
                            ready: true,
                            inMarkerFrame: { some: 'in marker' },
                            outMarkerFrame: { some: 'out marker' }
                        });
                    });
                    it('is emitted', function () {
                        expect(componentUnderTest.markersInitialization.emit)
                            .toHaveBeenCalledWith({ in: { some: 'in marker' }, out: { some: 'out marker' } });
                    });
                    describe('and the player state is updated again', function () {
                        beforeEach(function () {
                            simulatedStateSubject.next({
                                inMarkerFrame: { some: 'other in marker' },
                                outMarkerFrame: { some: 'other out marker' }
                            });
                        });
                        it('is not emitted again', function () {
                            expect(componentUnderTest.markersInitialization.emit).toHaveBeenCalledTimes(1);
                        });
                    });
                    describe('and a different asset is loaded', function () {
                        beforeEach(function () {
                            componentUnderTest.asset = __assign({}, mockAsset, { some: 'other asset' });
                        });
                        describe('and when the player is not ready yet', function () {
                            it('is not emitted again yet', function () {
                                expect(componentUnderTest.markersInitialization.emit).toHaveBeenCalledTimes(1);
                            });
                        });
                        describe('and when the player is ready', function () {
                            beforeEach(function () {
                                simulatedStateSubject.next({
                                    ready: true,
                                    inMarkerFrame: { some: 'new in marker' },
                                    outMarkerFrame: { some: 'new out marker' }
                                });
                            });
                            it('is emitted again', function () {
                                expect(componentUnderTest.markersInitialization.emit).toHaveBeenCalledTimes(2);
                                expect(componentUnderTest.markersInitialization.emit.calls.mostRecent().args)
                                    .toEqual([{ in: { some: 'new in marker' }, out: { some: 'new out marker' } }]);
                            });
                        });
                    });
                });
            });
            describe('markerChange output', function () {
                describe('when an asset is loaded', function () {
                    beforeEach(function () {
                        componentUnderTest.asset = mockAsset;
                    });
                    describe('before the player is ready', function () {
                        it('is not emitted', function () {
                            expect(componentUnderTest.markerChange.emit).not.toHaveBeenCalled();
                        });
                    });
                    var tests = [
                        {
                            start: { inMilliseconds: 10, outMilliseconds: 20 },
                            updates: [
                                { next: { inMilliseconds: 10, outMilliseconds: 20 }, shouldEmit: false },
                                { next: { inMilliseconds: 10, outMilliseconds: 15 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: undefined }, shouldEmit: true },
                                { next: { inMilliseconds: 15, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 20, outMilliseconds: 30 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: undefined }, shouldEmit: true }
                            ]
                        },
                        {
                            start: { inMilliseconds: undefined, outMilliseconds: 20 },
                            updates: [
                                { next: { inMilliseconds: 10, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: 15 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: undefined }, shouldEmit: true },
                                { next: { inMilliseconds: 15, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: 20 }, shouldEmit: false },
                                { next: { inMilliseconds: 20, outMilliseconds: 30 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: undefined }, shouldEmit: true }
                            ]
                        },
                        {
                            start: { inMilliseconds: 10, outMilliseconds: undefined },
                            updates: [
                                { next: { inMilliseconds: 10, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: 15 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: undefined }, shouldEmit: false },
                                { next: { inMilliseconds: 15, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 20, outMilliseconds: 30 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: undefined }, shouldEmit: true }
                            ]
                        },
                        {
                            start: { inMilliseconds: undefined, outMilliseconds: undefined },
                            updates: [
                                { next: { inMilliseconds: 10, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: 15 }, shouldEmit: true },
                                { next: { inMilliseconds: 10, outMilliseconds: undefined }, shouldEmit: true },
                                { next: { inMilliseconds: 15, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: 20 }, shouldEmit: true },
                                { next: { inMilliseconds: 20, outMilliseconds: 30 }, shouldEmit: true },
                                { next: { inMilliseconds: undefined, outMilliseconds: undefined }, shouldEmit: false }
                            ]
                        }
                    ];
                    tests.forEach(function (test) {
                        describe("when the player is ready with " + JSON.stringify(test.start), function () {
                            beforeEach(function () {
                                simulatedStateSubject.next({
                                    ready: true,
                                    inMarkerFrame: test.start.inMilliseconds ? { frameNumber: test.start.inMilliseconds } : undefined,
                                    outMarkerFrame: test.start.outMilliseconds ? { frameNumber: test.start.outMilliseconds } : undefined
                                });
                            });
                            it('is not emitted', function () {
                                expect(componentUnderTest.markerChange.emit).not.toHaveBeenCalled();
                            });
                            describe('and the player state is updated', function () {
                                test.updates.forEach(function (update) {
                                    describe("with " + JSON.stringify(update.next), function () {
                                        beforeEach(function () {
                                            simulatedStateSubject.next({
                                                inMarkerFrame: update.next.inMilliseconds ? { frameNumber: update.next.inMilliseconds } : undefined,
                                                outMarkerFrame: update.next.outMilliseconds ? { frameNumber: update.next.outMilliseconds } : undefined
                                            });
                                        });
                                        if (update.shouldEmit) {
                                            it('is emitted', function () {
                                                expect(componentUnderTest.markerChange.emit).toHaveBeenCalledTimes(1);
                                            });
                                        }
                                        else {
                                            it('is not emitted', function () {
                                                expect(componentUnderTest.markerChange.emit).not.toHaveBeenCalled();
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        describe('ngOnInit()', function () {
            it('subscribes to player state changes', function () {
                spyOn(simulatedStateObservable, 'subscribe');
                componentUnderTest.ngOnInit();
                expect(simulatedStateObservable.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
            });
        });
        describe('ngOnDestroy()', function () {
            it('unsubscribes from player state changes', function () {
                var mockSubscription = { unsubscribe: jasmine.createSpy('unsubscribe') };
                simulatedStateObservable.subscribe = jasmine.createSpy('subscribe').and.returnValue(mockSubscription);
                componentUnderTest.ngOnInit();
                componentUnderTest.ngOnDestroy();
                expect(mockSubscription.unsubscribe).toHaveBeenCalled();
            });
        });
        describe('onStateChangeRequest()', function () {
            it('forwards the requested state changes to PlayerStateService', function () {
                componentUnderTest.onStateChangeRequest({ some: 'changes' });
                expect(mockPlayerStateService.updateWith).toHaveBeenCalledWith({ some: 'changes' });
            });
        });
        describe('handle()', function () {
            describe('CLEAR_MARKERS', function () {
                it('tells the player to clear its markers', function () {
                    componentUnderTest.handle({ type: 'CLEAR_MARKERS' });
                    expect(componentUnderTest.player.clearMarkers).toHaveBeenCalled();
                });
            });
            describe('PLAY_AT_SPEED', function () {
                it('tells the player to play at the requested speed', function () {
                    componentUnderTest.handle({ type: 'PLAY_AT_SPEED', speed: 42, direction: 'forward' });
                    expect(componentUnderTest.player.playAtSpeed).toHaveBeenCalledWith(42, 'forward');
                });
            });
            describe('PAUSE', function () {
                it('tells the player to pause', function () {
                    componentUnderTest.handle({ type: 'PAUSE' });
                    expect(componentUnderTest.player.pause).toHaveBeenCalledWith();
                });
            });
            describe('SEEK_TO_FRAME', function () {
                it('tells the player to seek to the requested frame', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_FRAME', frame: new index_1.Frame(30).setFromSeconds(42) });
                    expect(componentUnderTest.player.seekTo).toHaveBeenCalledWith(42);
                });
                it('does nothing if the requested frame is undefined', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_FRAME', frame: undefined });
                    expect(componentUnderTest.player.seekTo).not.toHaveBeenCalled();
                });
            });
            describe('SEEK_TO_TIME_STRING', function () {
                it('tells the player to seek to the requested time string (timecode, stream-based)', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_TIME_STRING', time: '00:00:42;00' });
                    expect(componentUnderTest.player.seekTo).toHaveBeenCalledWith(42.009);
                });
                it('tells the player to seek to the requested time string (seconds, stream-based)', function () {
                    simulatedStateSubject.next(__assign({}, initialPlayerState, { timecodeFormat: index_1.TimecodeFormat.SECONDS }));
                    componentUnderTest.handle({ type: 'SEEK_TO_TIME_STRING', time: '42.345' });
                    expect(componentUnderTest.player.seekTo).toHaveBeenCalledWith(42.342);
                });
                it('tells the player to seek to the requested time string (timecode, source-based)', function () {
                    simulatedStateSubject.next(__assign({}, initialPlayerState, { timecodeBase: index_1.TimecodeBase.SOURCE_BASED, sourceBasedOffset: '00:00:03;00' }));
                    componentUnderTest.handle({ type: 'SEEK_TO_TIME_STRING', time: '00:00:45;00' });
                    expect(componentUnderTest.player.seekTo).toHaveBeenCalledWith(42.009);
                });
                it('tells the player to seek to the requested time string (seconds, source-based)', function () {
                    simulatedStateSubject.next(__assign({}, initialPlayerState, { timecodeFormat: index_1.TimecodeFormat.SECONDS, timecodeBase: index_1.TimecodeBase.SOURCE_BASED, sourceBasedOffset: '00:00:03;00' }));
                    componentUnderTest.handle({ type: 'SEEK_TO_TIME_STRING', time: '42.345' });
                    expect(componentUnderTest.player.seekTo).toHaveBeenCalledWith(39.339);
                });
                it('does nothing if the requested frame is undefined', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_TIME_STRING', time: undefined });
                    expect(componentUnderTest.player.seekTo).not.toHaveBeenCalled();
                });
            });
            describe('SEEK_TO_MARKER', function () {
                it('tells the player to seek to the in marker if the requested marker type is \'in\'', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_MARKER', markerType: 'in' });
                    expect(componentUnderTest.player.seekToInMarker).toHaveBeenCalled();
                });
                it('tells the player to seek to the out marker if the requested marker type is \'out\'', function () {
                    componentUnderTest.handle({ type: 'SEEK_TO_MARKER', markerType: 'out' });
                    expect(componentUnderTest.player.seekToOutMarker).toHaveBeenCalled();
                });
            });
            describe('SET_MARKER_TO_CURRENT_FRAME', function () {
                it('tells the player to set the in marker to the current frame if the requested marker type is \'in\'', function () {
                    componentUnderTest.handle({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'in' });
                    expect(componentUnderTest.player.setInMarkerToCurrentTime).toHaveBeenCalled();
                });
                it('tells the player to set the out marker to the current frame if the requested marker type is \'out\'', function () {
                    componentUnderTest.handle({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: 'out' });
                    expect(componentUnderTest.player.setOutMarkerToCurrentTime).toHaveBeenCalled();
                });
            });
            describe('SET_VOLUME', function () {
                it('tells the player to set the volume to the requested level', function () {
                    componentUnderTest.handle({ type: 'SET_VOLUME', volume: 11 });
                    expect(componentUnderTest.player.setVolumeTo).toHaveBeenCalledWith(11);
                });
            });
            describe('TOGGLE_MARKERS_PLAYBACK', function () {
                it('tells the player to toggle playback between markers', function () {
                    componentUnderTest.handle({ type: 'TOGGLE_MARKERS_PLAYBACK' });
                    expect(componentUnderTest.player.toggleMarkersPlayback).toHaveBeenCalled();
                });
            });
            describe('TOGGLE_MUTE', function () {
                it('tells the player to toggle its mute state', function () {
                    componentUnderTest.handle({ type: 'TOGGLE_MUTE' });
                    expect(componentUnderTest.player.toggleMute).toHaveBeenCalled();
                });
            });
            describe('TOGGLE_PLAYBACK', function () {
                it('tells the player to toggle playback', function () {
                    componentUnderTest.handle({ type: 'TOGGLE_PLAYBACK' });
                    expect(componentUnderTest.player.togglePlayback).toHaveBeenCalled();
                });
            });
            describe('CHANGE_TIMECODE_DISPLAY', function () {
                it('updates the timecode format and base in the player state', function () {
                    componentUnderTest.handle({ type: 'CHANGE_TIMECODE_DISPLAY', format: 'some format', base: 'some base' });
                    expect(mockPlayerStateService.updateWith)
                        .toHaveBeenCalledWith({ timecodeFormat: 'some format', timecodeBase: 'some base' });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvd3ouYWR2YW5jZWQtcGxheWVyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx3REFBdUQ7QUFFdkQsK0VBQTJFO0FBQzNFLDhEQUEyRjtBQUkzRjtJQUNFLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTtRQUMxQyxJQUFNLGtCQUFrQixHQUFRO1lBQzlCLEtBQUssRUFBRSxLQUFLO1lBQ1osd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixPQUFPLEVBQUUsS0FBSztZQUNkLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLE1BQU0sRUFBRSxHQUFHO1lBQ1gsaUJBQWlCLEVBQUUsYUFBYTtZQUNoQyxjQUFjLEVBQUUsc0JBQWMsQ0FBQyxzQkFBc0I7WUFDckQsWUFBWSxFQUFFLG9CQUFZLENBQUMsWUFBWTtZQUN2QyxzQkFBc0IsRUFBRSxDQUFDO1NBQzFCLENBQUM7UUFFRixJQUFJLGtCQUE2QyxDQUFDO1FBQ2xELElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxTQUFjLENBQUM7UUFDbkIsSUFBSSxxQkFBMkMsQ0FBQztRQUNoRCxJQUFJLHdCQUF5QyxDQUFDO1FBRTlDLFVBQVUsQ0FBQztZQUNULHFCQUFxQixHQUFHLElBQUksaUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRWhFLHdCQUF3QixHQUFHLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBRWhFLHNCQUFzQixHQUFHO2dCQUN2QixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pDLFVB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QUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Z0NBQzlFLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtnQ0FDdkUsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOzZCQUN0Rjt5QkFDRjt3QkFDRDs0QkFDRSxLQUFLLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUU7NEJBQ3pELE9BQU8sRUFBRTtnQ0FDUCxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Z0NBQ3ZFLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtnQ0FDdkUsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2dDQUM5RSxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Z0NBQ3ZFLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtnQ0FDL0UsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2dDQUN2RSxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7NkJBQ3RGO3lCQUNGO3dCQUNEOzRCQUNFLEtBQUssRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRTs0QkFDekQsT0FBTyxFQUFFO2dDQUNQLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtnQ0FDdkUsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2dDQUN2RSxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7Z0NBQy9FLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtnQ0FDdkUsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2dDQUM5RSxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Z0NBQ3ZFLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs2QkFDdEY7eUJBQ0Y7d0JBQ0Q7NEJBQ0UsS0FBSyxFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFOzRCQUNoRSxPQUFPLEVBQUU7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QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzZEQsb0JBMmRDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvd3ouYWR2YW5jZWQtcGxheWVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmltcG9ydCB7IFd6QWR2YW5jZWRQbGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL3d6LmFkdmFuY2VkLXBsYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWUsIFRpbWVjb2RlRm9ybWF0LCBUaW1lY29kZUJhc2UgfSBmcm9tICcuLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGVDaGFuZ2VzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBsYXllclN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BsYXllci1zdGF0ZS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXYXplZSBBZHZhbmNlZCBQbGF5ZXIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxQbGF5ZXJTdGF0ZTogYW55ID0ge1xuICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgY2FuU3VwcG9ydEN1c3RvbUNvbnRyb2xzOiB0cnVlLFxuICAgICAgcGxheWluZzogZmFsc2UsXG4gICAgICBwbGF5aW5nTWFya2VyczogZmFsc2UsXG4gICAgICBwbGF5YmFja1NwZWVkOiAxLFxuICAgICAgZnJhbWVzUGVyU2Vjb25kOiAyOS45NyxcbiAgICAgIGN1cnJlbnRGcmFtZTogdW5kZWZpbmVkLFxuICAgICAgZHVyYXRpb25GcmFtZTogdW5kZWZpbmVkLFxuICAgICAgaW5NYXJrZXJGcmFtZTogdW5kZWZpbmVkLFxuICAgICAgb3V0TWFya2VyRnJhbWU6IHVuZGVmaW5lZCxcbiAgICAgIHZvbHVtZTogMTAwLFxuICAgICAgc291cmNlQmFzZWRPZmZzZXQ6ICcwMDowMDowMDowMCcsXG4gICAgICB0aW1lY29kZUZvcm1hdDogVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTixcbiAgICAgIHRpbWVjb2RlQmFzZTogVGltZWNvZGVCYXNlLlNUUkVBTV9CQVNFRCxcbiAgICAgIGNoYW5nZURldGVjdGlvbkVuYWJsZXI6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pBZHZhbmNlZFBsYXllckNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1BsYXllclN0YXRlU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQXNzZXQ6IGFueTtcbiAgICBsZXQgc2ltdWxhdGVkU3RhdGVTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgICBsZXQgc2ltdWxhdGVkU3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHNpbXVsYXRlZFN0YXRlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoaW5pdGlhbFBsYXllclN0YXRlKTtcblxuICAgICAgc2ltdWxhdGVkU3RhdGVPYnNlcnZhYmxlID0gc2ltdWxhdGVkU3RhdGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgICBtb2NrUGxheWVyU3RhdGVTZXJ2aWNlID0ge1xuICAgICAgICByZXNldDogamFzbWluZS5jcmVhdGVTcHkoJ3Jlc2V0JyksXG4gICAgICAgIHVwZGF0ZVdpdGg6IGphc21pbmUuY3JlYXRlU3B5KCd1cGRhdGVXaXRoJyksXG4gICAgICAgIHN0YXRlOiBzaW11bGF0ZWRTdGF0ZU9ic2VydmFibGVcbiAgICAgIH07XG5cbiAgICAgIG1vY2tBc3NldCA9IHtcbiAgICAgICAgc29tZTogJ2Fzc2V0JyxcbiAgICAgICAgZ2V0TWV0YWRhdGFWYWx1ZUZvcjogamFzbWluZS5jcmVhdGVTcHkoJ2dldE1ldGFkYXRhVmFsdWVGb3InKS5hbmQucmV0dXJuVmFsdWUoJzAxOjAyOjAzOjA0JylcbiAgICAgIH07XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXekFkdmFuY2VkUGxheWVyQ29tcG9uZW50KG1vY2tQbGF5ZXJTdGF0ZVNlcnZpY2UpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0luaXRpYWxpemF0aW9uLmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgnbWFya2Vyc0luaXRpYWxpemF0aW9uIGVtaXR0ZXInKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJDaGFuZ2UuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdtYXJrZXJDaGFuZ2UgZW1pdHRlcicpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucGxheWVyID0ge1xuICAgICAgICBjbGVhck1hcmtlcnM6IGphc21pbmUuY3JlYXRlU3B5KCdjbGVhck1hcmtlcnMnKSxcbiAgICAgICAgcGxheUF0U3BlZWQ6IGphc21pbmUuY3JlYXRlU3B5KCdwbGF5QXRTcGVlZCcpLFxuICAgICAgICBwYXVzZTogamFzbWluZS5jcmVhdGVTcHkoJ3BhdXNlJyksXG4gICAgICAgIHNlZWtUbzogamFzbWluZS5jcmVhdGVTcHkoJ3NlZWtUbycpLFxuICAgICAgICBzZWVrVG9Jbk1hcmtlcjogamFzbWluZS5jcmVhdGVTcHkoJ3NlZWtUb0luTWFya2VyJyksXG4gICAgICAgIHNlZWtUb091dE1hcmtlcjogamFzbWluZS5jcmVhdGVTcHkoJ3NlZWtUb091dE1hcmtlcicpLFxuICAgICAgICBzZXRJbk1hcmtlclRvQ3VycmVudFRpbWU6IGphc21pbmUuY3JlYXRlU3B5KCdzZXRJbk1hcmtlclRvQ3VycmVudFRpbWUnKSxcbiAgICAgICAgc2V0T3V0TWFya2VyVG9DdXJyZW50VGltZTogamFzbWluZS5jcmVhdGVTcHkoJ3NldE91dE1hcmtlclRvQ3VycmVudFRpbWUnKSxcbiAgICAgICAgc2V0Vm9sdW1lVG86IGphc21pbmUuY3JlYXRlU3B5KCdzZXRWb2x1bWVUbycpLFxuICAgICAgICB0b2dnbGVNYXJrZXJzUGxheWJhY2s6IGphc21pbmUuY3JlYXRlU3B5KCd0b2dnbGVNYXJrZXJzUGxheWJhY2snKSxcbiAgICAgICAgdG9nZ2xlTXV0ZTogamFzbWluZS5jcmVhdGVTcHkoJ3RvZ2dsZU11dGUnKSxcbiAgICAgICAgdG9nZ2xlUGxheWJhY2s6IGphc21pbmUuY3JlYXRlU3B5KCd0b2dnbGVQbGF5YmFjaycpXG4gICAgICB9IGFzIGFueTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXNzZXQgc2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3NldHMgdGhlIGN1cnJlbnQgYXNzZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldCA9IG1vY2tBc3NldDtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0KS50b0VxdWFsKG1vY2tBc3NldCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2dldHMgdGhlIEZvcm1hdC5UaW1lU3RhcnQgbWV0YWRhdGEgZnJvbSB0aGUgYXNzZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldCA9IG1vY2tBc3NldDtcblxuICAgICAgICBleHBlY3QobW9ja0Fzc2V0LmdldE1ldGFkYXRhVmFsdWVGb3IpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdGb3JtYXQuVGltZVN0YXJ0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3VwZGF0ZXMgdGhlIHBsYXllciBzdGF0ZSB3aXRoIHRoZSBzb3VyY2UtYmFzZWQgb2Zmc2V0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXQgPSBtb2NrQXNzZXQ7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tQbGF5ZXJTdGF0ZVNlcnZpY2UudXBkYXRlV2l0aCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBzb3VyY2VCYXNlZE9mZnNldDogJzAxOjAyOjAzOjA0JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Fzc2V0SXNWaWRlbygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXRcXCdzIHJlc291cmNlIHR5cGUgaXMgYW55dGhpbmcgYnV0IFxcJ0ltYWdlXFwnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXQgPSB7IC4uLm1vY2tBc3NldCwgcmVzb3VyY2VDbGFzczogJ3doYXRldmVyJyB9O1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYXNzZXRJc1ZpZGVvKCkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXQgaGFzIG5vIHJlc291cmNlQ2xhc3MgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldCA9IG1vY2tBc3NldDtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0SXNWaWRlbygpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBhc3NldFxcJ3MgcmVzb3VyY2UgdHlwZSBpcyBcXCdJbWFnZVxcJycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0geyAuLi5tb2NrQXNzZXQsIHJlc291cmNlQ2xhc3M6ICdJbWFnZScgfTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0SXNWaWRlbygpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgYXNzZXQgaGFzIG5vdCBiZWVuIHNldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldElzVmlkZW8oKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwbGF5ZXJTdGF0ZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgc3RhdGUgZnJvbSB0aGUgUGxheWVyU3RhdGVTZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllclN0YXRlKS50b0JlKG1vY2tQbGF5ZXJTdGF0ZVNlcnZpY2Uuc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWFya2Vyc0luaXRpYWxpemF0aW9uIG91dHB1dCcsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd3aGVuIGFuIGFzc2V0IGlzIGxvYWRlZCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0gbW9ja0Fzc2V0O1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnYmVmb3JlIHRoZSBwbGF5ZXIgaXMgcmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ2lzIG5vdCBlbWl0dGVkIHlldCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0luaXRpYWxpemF0aW9uLmVtaXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzaW11bGF0ZWRTdGF0ZVN1YmplY3QubmV4dCh7XG4gICAgICAgICAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgICAgICAgICBpbk1hcmtlckZyYW1lOiB7IHNvbWU6ICdpbiBtYXJrZXInIH0sXG4gICAgICAgICAgICAgIG91dE1hcmtlckZyYW1lOiB7IHNvbWU6ICdvdXQgbWFya2VyJyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdpcyBlbWl0dGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzSW5pdGlhbGl6YXRpb24uZW1pdClcbiAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaW46IHsgc29tZTogJ2luIG1hcmtlcicgfSwgb3V0OiB7IHNvbWU6ICdvdXQgbWFya2VyJyB9IH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVzY3JpYmUoJ2FuZCB0aGUgcGxheWVyIHN0YXRlIGlzIHVwZGF0ZWQgYWdhaW4nLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgc2ltdWxhdGVkU3RhdGVTdWJqZWN0Lm5leHQoe1xuICAgICAgICAgICAgICAgIGluTWFya2VyRnJhbWU6IHsgc29tZTogJ290aGVyIGluIG1hcmtlcicgfSxcbiAgICAgICAgICAgICAgICBvdXRNYXJrZXJGcmFtZTogeyBzb21lOiAnb3RoZXIgb3V0IG1hcmtlcicgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnaXMgbm90IGVtaXR0ZWQgYWdhaW4nLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0luaXRpYWxpemF0aW9uLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVzY3JpYmUoJ2FuZCBhIGRpZmZlcmVudCBhc3NldCBpcyBsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0geyAuLi5tb2NrQXNzZXQsIHNvbWU6ICdvdGhlciBhc3NldCcgfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZSgnYW5kIHdoZW4gdGhlIHBsYXllciBpcyBub3QgcmVhZHkgeWV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICBpdCgnaXMgbm90IGVtaXR0ZWQgYWdhaW4geWV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0luaXRpYWxpemF0aW9uLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzY3JpYmUoJ2FuZCB3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNpbXVsYXRlZFN0YXRlU3ViamVjdC5uZXh0KHtcbiAgICAgICAgICAgICAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5NYXJrZXJGcmFtZTogeyBzb21lOiAnbmV3IGluIG1hcmtlcicgfSxcbiAgICAgICAgICAgICAgICAgIG91dE1hcmtlckZyYW1lOiB7IHNvbWU6ICduZXcgb3V0IG1hcmtlcicgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpdCgnaXMgZW1pdHRlZCBhZ2FpbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNJbml0aWFsaXphdGlvbi5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0luaXRpYWxpemF0aW9uLmVtaXQgYXMgamFzbWluZS5TcHkpLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzKVxuICAgICAgICAgICAgICAgICAgLnRvRXF1YWwoW3sgaW46IHsgc29tZTogJ25ldyBpbiBtYXJrZXInIH0sIG91dDogeyBzb21lOiAnbmV3IG91dCBtYXJrZXInIH0gfV0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnbWFya2VyQ2hhbmdlIG91dHB1dCcsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gYW4gYXNzZXQgaXMgbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0gbW9ja0Fzc2V0O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVzY3JpYmUoJ2JlZm9yZSB0aGUgcGxheWVyIGlzIHJlYWR5JywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ2lzIG5vdCBlbWl0dGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlckNoYW5nZS5lbWl0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBsZXQgdGVzdHM6IGFueSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHsgaW5NaWxsaXNlY29uZHM6IDEwLCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sXG4gICAgICAgICAgICAgIHVwZGF0ZXM6IFtcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IDEwLCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sIHNob3VsZEVtaXQ6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiAxNSB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiB1bmRlZmluZWQgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMTUsIG91dE1pbGxpc2Vjb25kczogMjAgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogdW5kZWZpbmVkLCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IDIwLCBvdXRNaWxsaXNlY29uZHM6IDMwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IHVuZGVmaW5lZCwgb3V0TWlsbGlzZWNvbmRzOiB1bmRlZmluZWQgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXJ0OiB7IGluTWlsbGlzZWNvbmRzOiB1bmRlZmluZWQsIG91dE1pbGxpc2Vjb25kczogMjAgfSxcbiAgICAgICAgICAgICAgdXBkYXRlczogW1xuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMTAsIG91dE1pbGxpc2Vjb25kczogMjAgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMTAsIG91dE1pbGxpc2Vjb25kczogMTUgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMTAsIG91dE1pbGxpc2Vjb25kczogdW5kZWZpbmVkIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IDE1LCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IHVuZGVmaW5lZCwgb3V0TWlsbGlzZWNvbmRzOiAyMCB9LCBzaG91bGRFbWl0OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMjAsIG91dE1pbGxpc2Vjb25kczogMzAgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogdW5kZWZpbmVkLCBvdXRNaWxsaXNlY29uZHM6IHVuZGVmaW5lZCB9LCBzaG91bGRFbWl0OiB0cnVlIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHsgaW5NaWxsaXNlY29uZHM6IDEwLCBvdXRNaWxsaXNlY29uZHM6IHVuZGVmaW5lZCB9LFxuICAgICAgICAgICAgICB1cGRhdGVzOiBbXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiAyMCB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiAxNSB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiB1bmRlZmluZWQgfSwgc2hvdWxkRW1pdDogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IDE1LCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IHVuZGVmaW5lZCwgb3V0TWlsbGlzZWNvbmRzOiAyMCB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAyMCwgb3V0TWlsbGlzZWNvbmRzOiAzMCB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiB1bmRlZmluZWQsIG91dE1pbGxpc2Vjb25kczogdW5kZWZpbmVkIH0sIHNob3VsZEVtaXQ6IHRydWUgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGFydDogeyBpbk1pbGxpc2Vjb25kczogdW5kZWZpbmVkLCBvdXRNaWxsaXNlY29uZHM6IHVuZGVmaW5lZCB9LFxuICAgICAgICAgICAgICB1cGRhdGVzOiBbXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiAyMCB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiAxNSB9LCBzaG91bGRFbWl0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBuZXh0OiB7IGluTWlsbGlzZWNvbmRzOiAxMCwgb3V0TWlsbGlzZWNvbmRzOiB1bmRlZmluZWQgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogMTUsIG91dE1pbGxpc2Vjb25kczogMjAgfSwgc2hvdWxkRW1pdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgbmV4dDogeyBpbk1pbGxpc2Vjb25kczogdW5kZWZpbmVkLCBvdXRNaWxsaXNlY29uZHM6IDIwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IDIwLCBvdXRNaWxsaXNlY29uZHM6IDMwIH0sIHNob3VsZEVtaXQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IG5leHQ6IHsgaW5NaWxsaXNlY29uZHM6IHVuZGVmaW5lZCwgb3V0TWlsbGlzZWNvbmRzOiB1bmRlZmluZWQgfSwgc2hvdWxkRW1pdDogZmFsc2UgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIHRlc3RzLmZvckVhY2goKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgZGVzY3JpYmUoYHdoZW4gdGhlIHBsYXllciBpcyByZWFkeSB3aXRoICR7SlNPTi5zdHJpbmdpZnkodGVzdC5zdGFydCl9YCwgKCkgPT4ge1xuICAgICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzaW11bGF0ZWRTdGF0ZVN1YmplY3QubmV4dCh7XG4gICAgICAgICAgICAgICAgICByZWFkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGluTWFya2VyRnJhbWU6IHRlc3Quc3RhcnQuaW5NaWxsaXNlY29uZHMgPyB7IGZyYW1lTnVtYmVyOiB0ZXN0LnN0YXJ0LmluTWlsbGlzZWNvbmRzIH0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBvdXRNYXJrZXJGcmFtZTogdGVzdC5zdGFydC5vdXRNaWxsaXNlY29uZHMgPyB7IGZyYW1lTnVtYmVyOiB0ZXN0LnN0YXJ0Lm91dE1pbGxpc2Vjb25kcyB9IDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGl0KCdpcyBub3QgZW1pdHRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlckNoYW5nZS5lbWl0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBkZXNjcmliZSgnYW5kIHRoZSBwbGF5ZXIgc3RhdGUgaXMgdXBkYXRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXN0LnVwZGF0ZXMuZm9yRWFjaCgodXBkYXRlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGRlc2NyaWJlKGB3aXRoICR7SlNPTi5zdHJpbmdpZnkodXBkYXRlLm5leHQpfWAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2ltdWxhdGVkU3RhdGVTdWJqZWN0Lm5leHQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5NYXJrZXJGcmFtZTogdXBkYXRlLm5leHQuaW5NaWxsaXNlY29uZHMgPyB7IGZyYW1lTnVtYmVyOiB1cGRhdGUubmV4dC5pbk1pbGxpc2Vjb25kcyB9IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0TWFya2VyRnJhbWU6IHVwZGF0ZS5uZXh0Lm91dE1pbGxpc2Vjb25kcyA/IHsgZnJhbWVOdW1iZXI6IHVwZGF0ZS5uZXh0Lm91dE1pbGxpc2Vjb25kcyB9IDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGUuc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgIGl0KCdpcyBlbWl0dGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJDaGFuZ2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGl0KCdpcyBub3QgZW1pdHRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2VyQ2hhbmdlLmVtaXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25nT25Jbml0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnc3Vic2NyaWJlcyB0byBwbGF5ZXIgc3RhdGUgY2hhbmdlcycsICgpID0+IHtcbiAgICAgICAgc3B5T24oc2ltdWxhdGVkU3RhdGVPYnNlcnZhYmxlLCAnc3Vic2NyaWJlJyk7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgZXhwZWN0KHNpbXVsYXRlZFN0YXRlT2JzZXJ2YWJsZS5zdWJzY3JpYmUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGphc21pbmUuYW55KEZ1bmN0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uRGVzdHJveSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Vuc3Vic2NyaWJlcyBmcm9tIHBsYXllciBzdGF0ZSBjaGFuZ2VzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW9ja1N1YnNjcmlwdGlvbiA9IHsgdW5zdWJzY3JpYmU6IGphc21pbmUuY3JlYXRlU3B5KCd1bnN1YnNjcmliZScpIH07XG4gICAgICAgIHNpbXVsYXRlZFN0YXRlT2JzZXJ2YWJsZS5zdWJzY3JpYmUgPSBqYXNtaW5lLmNyZWF0ZVNweSgnc3Vic2NyaWJlJykuYW5kLnJldHVyblZhbHVlKG1vY2tTdWJzY3JpcHRpb24pO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBleHBlY3QobW9ja1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdGF0ZUNoYW5nZVJlcXVlc3QoKScsICgpID0+IHtcbiAgICAgIGl0KCdmb3J3YXJkcyB0aGUgcmVxdWVzdGVkIHN0YXRlIGNoYW5nZXMgdG8gUGxheWVyU3RhdGVTZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdGF0ZUNoYW5nZVJlcXVlc3QoeyBzb21lOiAnY2hhbmdlcycgfSBhcyBQbGF5ZXJTdGF0ZUNoYW5nZXMpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrUGxheWVyU3RhdGVTZXJ2aWNlLnVwZGF0ZVdpdGgpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ2NoYW5nZXMnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFuZGxlKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnQ0xFQVJfTUFSS0VSUycsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gY2xlYXIgaXRzIG1hcmtlcnMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdDTEVBUl9NQVJLRVJTJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLmNsZWFyTWFya2VycykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnUExBWV9BVF9TUEVFRCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gcGxheSBhdCB0aGUgcmVxdWVzdGVkIHNwZWVkJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnUExBWV9BVF9TUEVFRCcsIHNwZWVkOiA0MiwgZGlyZWN0aW9uOiAnZm9yd2FyZCcgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5wbGF5QXRTcGVlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoNDIsICdmb3J3YXJkJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdQQVVTRScsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gcGF1c2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdQQVVTRScgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5wYXVzZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1NFRUtfVE9fRlJBTUUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0ZWxscyB0aGUgcGxheWVyIHRvIHNlZWsgdG8gdGhlIHJlcXVlc3RlZCBmcmFtZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1NFRUtfVE9fRlJBTUUnLCBmcmFtZTogbmV3IEZyYW1lKDMwKS5zZXRGcm9tU2Vjb25kcyg0MikgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5zZWVrVG8pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDQyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGUgcmVxdWVzdGVkIGZyYW1lIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1NFRUtfVE9fRlJBTUUnLCBmcmFtZTogdW5kZWZpbmVkIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXIuc2Vla1RvKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnU0VFS19UT19USU1FX1NUUklORycsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gc2VlayB0byB0aGUgcmVxdWVzdGVkIHRpbWUgc3RyaW5nICh0aW1lY29kZSwgc3RyZWFtLWJhc2VkKScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1NFRUtfVE9fVElNRV9TVFJJTkcnLCB0aW1lOiAnMDA6MDA6NDI7MDAnIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wbGF5ZXIuc2Vla1RvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCg0Mi4wMDkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGVsbHMgdGhlIHBsYXllciB0byBzZWVrIHRvIHRoZSByZXF1ZXN0ZWQgdGltZSBzdHJpbmcgKHNlY29uZHMsIHN0cmVhbS1iYXNlZCknLCAoKSA9PiB7XG4gICAgICAgICAgc2ltdWxhdGVkU3RhdGVTdWJqZWN0Lm5leHQoeyAuLi5pbml0aWFsUGxheWVyU3RhdGUsIHRpbWVjb2RlRm9ybWF0OiBUaW1lY29kZUZvcm1hdC5TRUNPTkRTIH0pO1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdTRUVLX1RPX1RJTUVfU1RSSU5HJywgdGltZTogJzQyLjM0NScgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5zZWVrVG8pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDQyLjM0Mik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0ZWxscyB0aGUgcGxheWVyIHRvIHNlZWsgdG8gdGhlIHJlcXVlc3RlZCB0aW1lIHN0cmluZyAodGltZWNvZGUsIHNvdXJjZS1iYXNlZCknLCAoKSA9PiB7XG4gICAgICAgICAgc2ltdWxhdGVkU3RhdGVTdWJqZWN0Lm5leHQoe1xuICAgICAgICAgICAgLi4uaW5pdGlhbFBsYXllclN0YXRlLFxuICAgICAgICAgICAgdGltZWNvZGVCYXNlOiBUaW1lY29kZUJhc2UuU09VUkNFX0JBU0VELFxuICAgICAgICAgICAgc291cmNlQmFzZWRPZmZzZXQ6ICcwMDowMDowMzswMCdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnU0VFS19UT19USU1FX1NUUklORycsIHRpbWU6ICcwMDowMDo0NTswMCcgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5zZWVrVG8pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDQyLjAwOSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0ZWxscyB0aGUgcGxheWVyIHRvIHNlZWsgdG8gdGhlIHJlcXVlc3RlZCB0aW1lIHN0cmluZyAoc2Vjb25kcywgc291cmNlLWJhc2VkKScsICgpID0+IHtcbiAgICAgICAgICBzaW11bGF0ZWRTdGF0ZVN1YmplY3QubmV4dCh7XG4gICAgICAgICAgICAuLi5pbml0aWFsUGxheWVyU3RhdGUsXG4gICAgICAgICAgICB0aW1lY29kZUZvcm1hdDogVGltZWNvZGVGb3JtYXQuU0VDT05EUyxcbiAgICAgICAgICAgIHRpbWVjb2RlQmFzZTogVGltZWNvZGVCYXNlLlNPVVJDRV9CQVNFRCxcbiAgICAgICAgICAgIHNvdXJjZUJhc2VkT2Zmc2V0OiAnMDA6MDA6MDM7MDAnXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1NFRUtfVE9fVElNRV9TVFJJTkcnLCB0aW1lOiAnNDIuMzQ1JyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnNlZWtUbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMzkuMzM5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGUgcmVxdWVzdGVkIGZyYW1lIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1NFRUtfVE9fVElNRV9TVFJJTkcnLCB0aW1lOiB1bmRlZmluZWQgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5zZWVrVG8pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdTRUVLX1RPX01BUktFUicsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gc2VlayB0byB0aGUgaW4gbWFya2VyIGlmIHRoZSByZXF1ZXN0ZWQgbWFya2VyIHR5cGUgaXMgXFwnaW5cXCcnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdTRUVLX1RPX01BUktFUicsIG1hcmtlclR5cGU6ICdpbicgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllci5zZWVrVG9Jbk1hcmtlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGVsbHMgdGhlIHBsYXllciB0byBzZWVrIHRvIHRoZSBvdXQgbWFya2VyIGlmIHRoZSByZXF1ZXN0ZWQgbWFya2VyIHR5cGUgaXMgXFwnb3V0XFwnJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnU0VFS19UT19NQVJLRVInLCBtYXJrZXJUeXBlOiAnb3V0JyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnNlZWtUb091dE1hcmtlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnU0VUX01BUktFUl9UT19DVVJSRU5UX0ZSQU1FJywgKCkgPT4ge1xuICAgICAgICBpdCgndGVsbHMgdGhlIHBsYXllciB0byBzZXQgdGhlIGluIG1hcmtlciB0byB0aGUgY3VycmVudCBmcmFtZSBpZiB0aGUgcmVxdWVzdGVkIG1hcmtlciB0eXBlIGlzIFxcJ2luXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnU0VUX01BUktFUl9UT19DVVJSRU5UX0ZSQU1FJywgbWFya2VyVHlwZTogJ2luJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnNldEluTWFya2VyVG9DdXJyZW50VGltZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGVsbHMgdGhlIHBsYXllciB0byBzZXQgdGhlIG91dCBtYXJrZXIgdG8gdGhlIGN1cnJlbnQgZnJhbWUgaWYgdGhlIHJlcXVlc3RlZCBtYXJrZXIgdHlwZSBpcyBcXCdvdXRcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdTRVRfTUFSS0VSX1RPX0NVUlJFTlRfRlJBTUUnLCBtYXJrZXJUeXBlOiAnb3V0JyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnNldE91dE1hcmtlclRvQ3VycmVudFRpbWUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1NFVF9WT0xVTUUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0ZWxscyB0aGUgcGxheWVyIHRvIHNldCB0aGUgdm9sdW1lIHRvIHRoZSByZXF1ZXN0ZWQgbGV2ZWwnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhhbmRsZSh7IHR5cGU6ICdTRVRfVk9MVU1FJywgdm9sdW1lOiAxMSB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnNldFZvbHVtZVRvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxMSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdUT0dHTEVfTUFSS0VSU19QTEFZQkFDSycsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gdG9nZ2xlIHBsYXliYWNrIGJldHdlZW4gbWFya2VycycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1RPR0dMRV9NQVJLRVJTX1BMQVlCQUNLJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnRvZ2dsZU1hcmtlcnNQbGF5YmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnVE9HR0xFX01VVEUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0ZWxscyB0aGUgcGxheWVyIHRvIHRvZ2dsZSBpdHMgbXV0ZSBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlKHsgdHlwZTogJ1RPR0dMRV9NVVRFJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnRvZ2dsZU11dGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1RPR0dMRV9QTEFZQkFDSycsICgpID0+IHtcbiAgICAgICAgaXQoJ3RlbGxzIHRoZSBwbGF5ZXIgdG8gdG9nZ2xlIHBsYXliYWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnVE9HR0xFX1BMQVlCQUNLJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGxheWVyLnRvZ2dsZVBsYXliYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdDSEFOR0VfVElNRUNPREVfRElTUExBWScsICgpID0+IHtcbiAgICAgICAgaXQoJ3VwZGF0ZXMgdGhlIHRpbWVjb2RlIGZvcm1hdCBhbmQgYmFzZSBpbiB0aGUgcGxheWVyIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYW5kbGUoeyB0eXBlOiAnQ0hBTkdFX1RJTUVDT0RFX0RJU1BMQVknLCBmb3JtYXQ6ICdzb21lIGZvcm1hdCcgYXMgYW55LCBiYXNlOiAnc29tZSBiYXNlJyBhcyBhbnkgfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja1BsYXllclN0YXRlU2VydmljZS51cGRhdGVXaXRoKVxuICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdGltZWNvZGVGb3JtYXQ6ICdzb21lIGZvcm1hdCcsIHRpbWVjb2RlQmFzZTogJ3NvbWUgYmFzZScgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
