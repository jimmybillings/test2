"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enhanced_asset_1 = require("../../../../interfaces/enhanced-asset");
var app_store_1 = require("../../../../../app.store");
var WzPlayerComponent = (function () {
    function WzPlayerComponent(element, renderer, zone, store) {
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.store = store;
        this.mode = 'basic';
        this.stateChangeRequest = new core_1.EventEmitter();
        this.currentAssetType = 'unknown';
        this.markersPlaybackMode = 'off';
        this.inMarker = undefined;
        this.outMarker = undefined;
        this.waitingForSeek = false;
        this.pendingSeekRequest = null;
        this.readOverlayConfig();
    }
    Object.defineProperty(WzPlayerComponent.prototype, "asset", {
        get: function () {
            return this.currentAsset;
        },
        set: function (asset) {
            this.reset();
            this.currentAsset = asset;
            this.enhancedAsset = Object.assign(new enhanced_asset_1.EnhancedAsset(), asset).normalize();
            this.enhancedAsset.isImage ? this.setupImage() : this.setupVideo();
        },
        enumerable: true,
        configurable: true
    });
    WzPlayerComponent.prototype.ngOnDestroy = function () {
        this.reset();
    };
    WzPlayerComponent.prototype.togglePlayback = function () {
        this.verifyCustomControlsSupport();
        this.setPlaybackRateTo(1);
        this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();
    };
    WzPlayerComponent.prototype.playAtSpeed = function (speed, direction) {
        if (direction === void 0) { direction = 'forward'; }
        this.verifyCustomControlsSupport();
        if (direction === 'reverse')
            throw new Error('Reverse playback is not yet supported.');
        this.setPlaybackRateTo(speed);
        if (this.videoElement.paused)
            this.videoElement.play();
    };
    WzPlayerComponent.prototype.pause = function () {
        this.verifyCustomControlsSupport();
        if (!this.videoElement.paused)
            this.videoElement.pause();
    };
    WzPlayerComponent.prototype.seekTo = function (timeInSeconds) {
        this.verifyCustomControlsSupport();
        this.videoElement.ended ? this.resetPlaybackAndSeekTo(timeInSeconds) : this.simplySeekTo(timeInSeconds);
    };
    WzPlayerComponent.prototype.seekToInMarker = function () {
        this.verifyCustomControlsSupport();
        if (!this.inMarker)
            throw new Error('Cannot seek to in marker because it is not set.');
        this.seekTo(this.inMarker);
    };
    WzPlayerComponent.prototype.seekToOutMarker = function () {
        this.verifyCustomControlsSupport();
        if (!this.outMarker)
            throw new Error('Cannot seek to out marker because it is not set.');
        this.seekTo(this.outMarker);
    };
    WzPlayerComponent.prototype.setInMarkerToCurrentTime = function () {
        this.verifyCustomControlsSupport();
        this.inMarker = this.videoElement.currentTime;
        if (this.outMarker && this.outMarker < this.inMarker) {
            this.outMarker = this.inMarker;
            this.emitStateChangeRequestWith({ inMarker: this.inMarker, outMarker: this.outMarker });
        }
        else {
            this.emitStateChangeRequestWith({ inMarker: this.inMarker });
        }
    };
    WzPlayerComponent.prototype.setOutMarkerToCurrentTime = function () {
        this.verifyCustomControlsSupport();
        if (this.markersPlaybackMode === 'on') {
            this.videoElement.pause();
            this.markersPlaybackMode = 'off';
            this.emitStateChangeRequestWith({ playingMarkers: false });
        }
        this.outMarker = this.videoElement.currentTime;
        if (this.inMarker && this.inMarker > this.outMarker) {
            this.inMarker = this.outMarker;
            this.emitStateChangeRequestWith({ inMarker: this.inMarker, outMarker: this.outMarker });
        }
        else {
            this.emitStateChangeRequestWith({ outMarker: this.outMarker });
        }
    };
    WzPlayerComponent.prototype.clearMarkers = function () {
        this.verifyCustomControlsSupport();
        if (this.markersPlaybackMode === 'on') {
            this.markersPlaybackMode = 'off';
            this.emitStateChangeRequestWith({ playingMarkers: false });
        }
        this.inMarker = undefined;
        this.outMarker = undefined;
        this.emitStateChangeRequestWith({ inMarker: undefined, outMarker: undefined });
    };
    WzPlayerComponent.prototype.toggleMarkersPlayback = function () {
        this.verifyCustomControlsSupport();
        if (this.markersPlaybackMode === 'on') {
            this.togglePlayback();
        }
        else if (this.markersPlaybackMode === 'off') {
            if (!this.inMarker || !this.outMarker)
                throw new Error('Cannot play between markers unless they are both set.');
            this.markersPlaybackMode = 'initializing';
            this.seekTo(this.inMarker);
        }
    };
    WzPlayerComponent.prototype.toggleMute = function () {
        this.verifyCustomControlsSupport();
        this.videoElement.muted = !this.videoElement.muted;
    };
    WzPlayerComponent.prototype.setVolumeTo = function (newVolume) {
        this.verifyCustomControlsSupport();
        if (this.videoElement.muted) {
            this.stopVideoEventListenerFor('volumechange');
            this.videoElement.muted = false;
            this.startVideoEventListenerFor('volumechange', this.onVolumeChange);
        }
        this.videoElement.volume = newVolume / 100;
    };
    WzPlayerComponent.prototype.verifyCustomControlsSupport = function () {
        if (this.mode === 'basic')
            throw new Error('Basic mode does not support custom controls.');
        if (this.currentAssetType !== 'html5Video')
            throw new Error('Current asset does not support custom controls.');
    };
    WzPlayerComponent.prototype.setupVideo = function () {
        var _this = this;
        this.currentAssetType = 'video';
        this.jwPlayer = this.window.jwplayer(this.element.nativeElement);
        this.setupInMarker();
        this.setupOutMarker();
        var autostartInAdvancedMode = !this.inMarker || !this.outMarker;
        this.jwPlayer.setup({
            image: this.enhancedAsset.thumbnailUrl || null,
            file: this.enhancedAsset.clipUrl,
            autostart: this.mode === 'basic' || autostartInAdvancedMode,
            controls: false
        });
        this.jwPlayer.on('ready', function () {
            if (_this.mode === 'advanced') {
                var jwPlayerProvider = _this.jwPlayer.getProvider();
                if (jwPlayerProvider && jwPlayerProvider.name === 'html5') {
                    _this.currentAssetType = 'html5Video';
                    _this.jwPlayer.on('displayClick', _this.togglePlayback.bind(_this));
                    _this.videoElement = _this.window.document.querySelector('video');
                    _this.videoElement.oncontextmenu = function () { return false; };
                    _this.startVideoEventListeners();
                    _this.emitStateChangeRequestWith({
                        ready: true,
                        canSupportCustomControls: true,
                        framesPerSecond: _this.enhancedAsset.framesPerSecond,
                        inMarker: _this.inMarker,
                        outMarker: _this.outMarker,
                        volume: _this.currentVolume
                    });
                    if (!autostartInAdvancedMode)
                        _this.toggleMarkersPlayback();
                }
                else {
                    if (!autostartInAdvancedMode)
                        _this.jwPlayer.play(true);
                    _this.jwPlayer.setControls(true);
                    _this.emitStateChangeRequestWith({ ready: true, canSupportCustomControls: false });
                }
            }
            else {
                _this.jwPlayer.setControls(true);
            }
        });
    };
    WzPlayerComponent.prototype.setupInMarker = function () {
        this.inMarker =
            this.enhancedAsset.inMarkerFrame && this.enhancedAsset.inMarkerFrameNumber !== 0
                ? this.enhancedAsset.inMarkerFrame.asSeconds(3)
                : undefined;
    };
    WzPlayerComponent.prototype.setupOutMarker = function () {
        this.outMarker =
            this.enhancedAsset.outMarkerFrame && this.enhancedAsset.outMarkerFrameNumber !== this.enhancedAsset.durationFrameNumber
                ? this.enhancedAsset.outMarkerFrame.asSeconds(3)
                : undefined;
    };
    WzPlayerComponent.prototype.startVideoEventListeners = function () {
        this.startVideoEventListenerFor('durationchange', this.onDurationChange);
        this.startVideoEventListenerFor('ended', this.onEnded);
        this.startVideoEventListenerFor('pause', this.onPause);
        this.startVideoEventListenerFor('playing', this.onPlaying);
        this.startVideoEventListenerFor('ratechange', this.onRateChange);
        this.startVideoEventListenerFor('timeupdate', this.onTimeUpdate);
        this.startVideoEventListenerFor('seeked', this.onSeeked);
        this.startVideoEventListenerFor('seeking', this.onSeeking);
        this.startVideoEventListenerFor('volumechange', this.onVolumeChange);
    };
    WzPlayerComponent.prototype.startVideoEventListenerFor = function (eventName, callback) {
        if (!this.videoElementListenerRemovers)
            this.videoElementListenerRemovers = {};
        this.videoElementListenerRemovers[eventName] = this.renderer.listen(this.videoElement, eventName, callback.bind(this));
    };
    WzPlayerComponent.prototype.stopVideoEventListeners = function () {
        for (var eventName in this.videoElementListenerRemovers) {
            this.stopVideoEventListenerFor(eventName);
        }
        this.videoElementListenerRemovers = {};
    };
    WzPlayerComponent.prototype.stopVideoEventListenerFor = function (eventName) {
        this.videoElementListenerRemovers[eventName]();
    };
    WzPlayerComponent.prototype.onDurationChange = function () {
        this.emitStateChangeRequestWith({ duration: this.videoElement.duration });
    };
    WzPlayerComponent.prototype.onEnded = function () {
        this.setPlaybackRateTo(1);
    };
    WzPlayerComponent.prototype.onPause = function () {
        this.emitStateChangeRequestWith({ playing: false });
    };
    WzPlayerComponent.prototype.onPlaying = function () {
        this.emitStateChangeRequestWith({ playing: true });
    };
    WzPlayerComponent.prototype.onRateChange = function () {
        this.emitStateChangeRequestWith({ playbackSpeed: this.videoElement.playbackRate });
    };
    WzPlayerComponent.prototype.onSeeked = function () {
        if (this.markersPlaybackMode === 'initializing') {
            this.markersPlaybackMode = 'on';
            this.emitStateChangeRequestWith({ playingMarkers: true });
            if (this.videoElement.paused)
                this.videoElement.play();
        }
        this.waitingForSeek = false;
        if (this.pendingSeekRequest) {
            var newTime = this.pendingSeekRequest;
            this.pendingSeekRequest = null;
            this.seekTo(newTime);
        }
    };
    WzPlayerComponent.prototype.onSeeking = function () {
        if (this.markersPlaybackMode === 'on') {
            this.markersPlaybackMode = 'off';
            this.emitStateChangeRequestWith({ playingMarkers: false });
        }
    };
    WzPlayerComponent.prototype.onTimeUpdate = function () {
        var currentTime = this.videoElement.currentTime;
        this.emitStateChangeRequestWith({ currentTime: currentTime });
        if (this.markersPlaybackMode === 'on' && currentTime >= this.outMarker) {
            this.videoElement.pause();
            this.markersPlaybackMode = 'off';
            this.emitStateChangeRequestWith({ playingMarkers: false });
            if (currentTime > this.outMarker)
                this.seekTo(this.outMarker);
        }
    };
    WzPlayerComponent.prototype.onVolumeChange = function () {
        this.emitStateChangeRequestWith({ volume: this.currentVolume });
    };
    Object.defineProperty(WzPlayerComponent.prototype, "currentVolume", {
        get: function () {
            return this.videoElement.muted ? 0 : Math.round(this.videoElement.volume * 100);
        },
        enumerable: true,
        configurable: true
    });
    WzPlayerComponent.prototype.emitStateChangeRequestWith = function (changes) {
        var _this = this;
        this.zone.run(function () { return _this.stateChangeRequest.emit(changes); });
    };
    WzPlayerComponent.prototype.setupImage = function () {
        this.currentAssetType = 'image';
        var imgWrapper = document.createElement('div');
        imgWrapper.className = 'photo-container';
        var elem = document.createElement('img');
        elem.src = this.enhancedAsset.clipUrl;
        imgWrapper.appendChild(elem);
        this.element.nativeElement.appendChild(imgWrapper);
    };
    WzPlayerComponent.prototype.reset = function () {
        if (this.currentAssetType.match(/^video|html5Video$/)) {
            if (this.currentAssetType === 'html5Video') {
                this.stopVideoEventListeners();
            }
            this.videoElement = null;
            this.jwPlayer.remove();
            this.jwPlayer = null;
            this.inMarker = undefined;
            this.outMarker = undefined;
            this.waitingForSeek = false;
            this.pendingSeekRequest = null;
        }
        this.currentAssetType = 'unknown';
        this.markersPlaybackMode = 'off';
        this.element.nativeElement.innerHTML = '';
    };
    WzPlayerComponent.prototype.setPlaybackRateTo = function (newRate) {
        if (newRate !== this.videoElement.playbackRate)
            this.videoElement.playbackRate = newRate;
    };
    WzPlayerComponent.prototype.resetPlaybackAndSeekTo = function (timeInSeconds) {
        var _this = this;
        var oneTimeListenerRemover = this.renderer.listen(this.videoElement, 'playing', function () {
            _this.videoElement.pause();
            oneTimeListenerRemover();
            _this.simplySeekTo(timeInSeconds);
        });
        this.videoElement.play();
    };
    WzPlayerComponent.prototype.simplySeekTo = function (timeInSeconds) {
        if (this.waitingForSeek) {
            this.pendingSeekRequest = timeInSeconds;
        }
        else if (this.videoElement.currentTime === timeInSeconds) {
            this.emitStateChangeRequestWith({ currentTime: timeInSeconds });
        }
        else {
            this.waitingForSeek = true;
            this.videoElement.currentTime = timeInSeconds;
        }
    };
    WzPlayerComponent.prototype.readOverlayConfig = function () {
        var components = this.store.snapshotCloned(function (state) { return state.uiConfig.components; });
        if (!components.hasOwnProperty('playerOverlay') || !components.playerOverlay.hasOwnProperty('config')) {
            console.log('No playerOverlay configuration found');
            return;
        }
        var rawConfig = components.playerOverlay.config;
        console.log('playerOverlay configuration:');
        [
            'enabled', 'userDisplayText', 'position', 'fontSizeInPixels', 'textColor', 'textOpacity', 'backgroundColor',
            'backgroundOpacity'
        ].forEach(function (key) {
            console.log("  " + key + ": " + (rawConfig[key] ? "\"" + rawConfig[key].value + "\"" : undefined));
        });
    };
    WzPlayerComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-player',
                    template: ' ',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    WzPlayerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: core_1.NgZone, },
        { type: app_store_1.AppStore, },
    ]; };
    WzPlayerComponent.propDecorators = {
        'mode': [{ type: core_1.Input },],
        'window': [{ type: core_1.Input },],
        'asset': [{ type: core_1.Input },],
        'stateChangeRequest': [{ type: core_1.Output },],
    };
    return WzPlayerComponent;
}());
exports.WzPlayerComponent = WzPlayerComponent;
//# sourceMappingURL=wz.player.component.js.map