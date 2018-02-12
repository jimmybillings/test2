"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var player_state_service_1 = require("../../services/player-state.service");
var wz_player_component_1 = require("../wz-player/wz.player.component");
var index_1 = require("../../../wazee-frame-formatter/index");
var WzAdvancedPlayerComponent = (function () {
    function WzAdvancedPlayerComponent(playerStateService) {
        this.playerStateService = playerStateService;
        this.displayAllControls = true;
        this.markersInitialization = new core_1.EventEmitter();
        this.markerChange = new core_1.EventEmitter();
        this.currentAsset = null;
        this.currentState = null;
        this.playerReady = false;
    }
    Object.defineProperty(WzAdvancedPlayerComponent.prototype, "asset", {
        get: function () {
            return this.currentAsset;
        },
        set: function (newAsset) {
            this.playerStateService.reset();
            this.playerStateService.updateWith({ sourceBasedOffset: newAsset.getMetadataValueFor('Format.TimeStart') });
            this.currentState = null;
            this.playerReady = false;
            this.currentAsset = newAsset;
        },
        enumerable: true,
        configurable: true
    });
    WzAdvancedPlayerComponent.prototype.assetIsVideo = function () {
        return !!this.currentAsset && this.currentAsset.resourceClass !== 'Image';
    };
    Object.defineProperty(WzAdvancedPlayerComponent.prototype, "playerState", {
        get: function () {
            return this.playerStateService.state;
        },
        enumerable: true,
        configurable: true
    });
    WzAdvancedPlayerComponent.prototype.ngOnInit = function () {
        this.playerStateSubscription = this.playerStateService.state.subscribe(this.onStateChange.bind(this));
    };
    WzAdvancedPlayerComponent.prototype.ngOnDestroy = function () {
        this.playerStateSubscription.unsubscribe();
    };
    WzAdvancedPlayerComponent.prototype.onStateChangeRequest = function (changes) {
        this.playerStateService.updateWith(changes);
    };
    WzAdvancedPlayerComponent.prototype.handle = function (request) {
        switch (request.type) {
            case 'CLEAR_MARKERS':
                this.player.clearMarkers();
                break;
            case 'PLAY_AT_SPEED':
                this.player.playAtSpeed(request.speed, request.direction);
                break;
            case 'PAUSE':
                this.player.pause();
                break;
            case 'SEEK_TO_FRAME':
                if (request.frame)
                    this.player.seekTo(request.frame.asSeconds());
                break;
            case 'SEEK_TO_TIME_STRING':
                if (request.time)
                    this.player.seekTo(this.toSeconds(request.time));
                break;
            case 'SEEK_TO_MARKER':
                request.markerType === 'in' ? this.player.seekToInMarker() : this.player.seekToOutMarker();
                break;
            case 'SET_MARKER_TO_CURRENT_FRAME':
                request.markerType === 'in' ? this.player.setInMarkerToCurrentTime() : this.player.setOutMarkerToCurrentTime();
                break;
            case 'SET_VOLUME':
                this.player.setVolumeTo(request.volume);
                break;
            case 'TOGGLE_MARKERS_PLAYBACK':
                this.player.toggleMarkersPlayback();
                break;
            case 'TOGGLE_MUTE':
                this.player.toggleMute();
                break;
            case 'TOGGLE_PLAYBACK':
                this.player.togglePlayback();
                break;
            case 'CHANGE_TIMECODE_DISPLAY':
                this.playerStateService.updateWith({ timecodeFormat: request.format, timecodeBase: request.base });
                break;
        }
    };
    WzAdvancedPlayerComponent.prototype.onStateChange = function (newState) {
        if (!this.playerReady && newState.ready) {
            this.markersInitialization.emit({ in: newState.inMarkerFrame, out: newState.outMarkerFrame });
            this.playerReady = true;
        }
        else if (this.markersChangedIn(newState)) {
            this.markerChange.emit({ in: newState.inMarkerFrame, out: newState.outMarkerFrame });
        }
        this.currentState = newState;
    };
    WzAdvancedPlayerComponent.prototype.markersChangedIn = function (newState) {
        if (!this.currentState)
            return false;
        return !this.areEqual(newState.inMarkerFrame, this.currentState.inMarkerFrame) ||
            !this.areEqual(newState.outMarkerFrame, this.currentState.outMarkerFrame);
    };
    WzAdvancedPlayerComponent.prototype.areEqual = function (frame1, frame2) {
        if (frame1 && !frame2)
            return false;
        if (!frame1 && frame2)
            return false;
        if (!frame1 && !frame2)
            return true;
        return frame1.frameNumber === frame2.frameNumber;
    };
    WzAdvancedPlayerComponent.prototype.toSeconds = function (time) {
        return new index_1.Frame(this.currentState.framesPerSecond, this.currentState.sourceBasedOffset)
            .setFromString(time, this.currentState.timecodeFormat, this.currentState.timecodeBase)
            .asSeconds(3);
    };
    WzAdvancedPlayerComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-advanced-player',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [player_state_service_1.PlayerStateService],
                    templateUrl: './wz.advanced-player.html'
                },] },
    ];
    WzAdvancedPlayerComponent.ctorParameters = function () { return [
        { type: player_state_service_1.PlayerStateService, },
    ]; };
    WzAdvancedPlayerComponent.propDecorators = {
        'window': [{ type: core_1.Input },],
        'displayAllControls': [{ type: core_1.Input },],
        'asset': [{ type: core_1.Input },],
        'markersInitialization': [{ type: core_1.Output },],
        'markerChange': [{ type: core_1.Output },],
        'player': [{ type: core_1.ViewChild, args: [wz_player_component_1.WzPlayerComponent,] },],
    };
    return WzAdvancedPlayerComponent;
}());
exports.WzAdvancedPlayerComponent = WzAdvancedPlayerComponent;
//# sourceMappingURL=wz.advanced-player.component.js.map