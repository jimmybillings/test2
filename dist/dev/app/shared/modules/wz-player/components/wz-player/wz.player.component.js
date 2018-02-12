"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzPlayerComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzPlayerComponent.prototype, "window", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzPlayerComponent.prototype, "asset", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzPlayerComponent.prototype, "stateChangeRequest", void 0);
    WzPlayerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-player',
            template: ' ',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.NgZone, app_store_1.AppStore])
    ], WzPlayerComponent);
    return WzPlayerComponent;
}());
exports.WzPlayerComponent = WzPlayerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1wbGF5ZXIvd3oucGxheWVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUV1QjtBQUN2Qix3RUFBc0U7QUFFdEUsc0RBQW9EO0FBZXBEO0lBK0JFLDJCQUFvQixPQUFtQixFQUFVLFFBQWtCLEVBQVUsSUFBWSxFQUFVLEtBQWU7UUFBOUYsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQTlCekcsU0FBSSxHQUFlLE9BQU8sQ0FBQztRQWdCMUIsdUJBQWtCLEdBQXFDLElBQUksbUJBQVksRUFBc0IsQ0FBQztRQU1oRyxxQkFBZ0IsR0FBYyxTQUFTLENBQUM7UUFDeEMsd0JBQW1CLEdBQXdCLEtBQUssQ0FBQztRQUNqRCxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBR3hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUE1QkQsc0JBQVcsb0NBQUs7YUFRaEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDO2FBVkQsVUFBaUIsS0FBVTtZQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSw4QkFBYSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFD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cGxheWVyL2NvbXBvbmVudHMvd3otcGxheWVyL3d6LnBsYXllci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlciwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IFBsYXllck1vZGUsIFBsYXliYWNrRGlyZWN0aW9uLCBQbGF5ZXJTdGF0ZUNoYW5nZXMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5kZWNsYXJlIHZhciBqd3BsYXllcjogYW55O1xuXG50eXBlIEFzc2V0VHlwZSA9ICd1bmtub3duJyB8ICdpbWFnZScgfCAndmlkZW8nIHwgJ2h0bWw1VmlkZW8nO1xudHlwZSBNYXJrZXJzUGxheWJhY2tNb2RlID0gJ29mZicgfCAnaW5pdGlhbGl6aW5nJyB8ICdvbic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXBsYXllcicsXG4gIHRlbXBsYXRlOiAnICcsXG4gIC8vIHN0eWxlczogWydpbWcgeyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgfSddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5cbmV4cG9ydCBjbGFzcyBXelBsYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG1vZGU6IFBsYXllck1vZGUgPSAnYmFzaWMnO1xuICBASW5wdXQoKSB3aW5kb3c6IGFueTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGFzc2V0KGFzc2V0OiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5jdXJyZW50QXNzZXQgPSBhc3NldDtcbiAgICB0aGlzLmVuaGFuY2VkQXNzZXQgPSBPYmplY3QuYXNzaWduKG5ldyBFbmhhbmNlZEFzc2V0KCksIGFzc2V0KS5ub3JtYWxpemUoKTtcblxuICAgIHRoaXMuZW5oYW5jZWRBc3NldC5pc0ltYWdlID8gdGhpcy5zZXR1cEltYWdlKCkgOiB0aGlzLnNldHVwVmlkZW8oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYXNzZXQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50QXNzZXQ7XG4gIH1cblxuICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VSZXF1ZXN0OiBFdmVudEVtaXR0ZXI8UGxheWVyU3RhdGVDaGFuZ2VzPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxheWVyU3RhdGVDaGFuZ2VzPigpO1xuXG4gIHByaXZhdGUgY3VycmVudEFzc2V0OiBhbnk7XG4gIHByaXZhdGUgZW5oYW5jZWRBc3NldDogRW5oYW5jZWRBc3NldDtcbiAgcHJpdmF0ZSBqd1BsYXllcjogYW55O1xuICBwcml2YXRlIHZpZGVvRWxlbWVudDogYW55O1xuICBwcml2YXRlIGN1cnJlbnRBc3NldFR5cGU6IEFzc2V0VHlwZSA9ICd1bmtub3duJztcbiAgcHJpdmF0ZSBtYXJrZXJzUGxheWJhY2tNb2RlOiBNYXJrZXJzUGxheWJhY2tNb2RlID0gJ29mZic7XG4gIHByaXZhdGUgaW5NYXJrZXI6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBvdXRNYXJrZXI6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB2aWRlb0VsZW1lbnRMaXN0ZW5lclJlbW92ZXJzOiBhbnk7XG4gIHByaXZhdGUgd2FpdGluZ0ZvclNlZWs6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwZW5kaW5nU2Vla1JlcXVlc3Q6IG51bWJlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7XG4gICAgdGhpcy5yZWFkT3ZlcmxheUNvbmZpZygpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVQbGF5YmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLnZlcmlmeUN1c3RvbUNvbnRyb2xzU3VwcG9ydCgpO1xuXG4gICAgdGhpcy5zZXRQbGF5YmFja1JhdGVUbygxKTtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5wYXVzZWQgPyB0aGlzLnZpZGVvRWxlbWVudC5wbGF5KCkgOiB0aGlzLnZpZGVvRWxlbWVudC5wYXVzZSgpO1xuICB9XG5cbiAgcHVibGljIHBsYXlBdFNwZWVkKHNwZWVkOiBudW1iZXIsIGRpcmVjdGlvbjogUGxheWJhY2tEaXJlY3Rpb24gPSAnZm9yd2FyZCcpOiB2b2lkIHtcbiAgICB0aGlzLnZlcmlmeUN1c3RvbUNvbnRyb2xzU3VwcG9ydCgpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdyZXZlcnNlJykgdGhyb3cgbmV3IEVycm9yKCdSZXZlcnNlIHBsYXliYWNrIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLicpO1xuXG4gICAgLy8gdGhpcy5zZXRQbGF5YmFja1JhdGVUbygoZGlyZWN0aW9uID09PSAncmV2ZXJzZScgPyAtMSA6IDEpICogc3BlZWQpO1xuICAgIHRoaXMuc2V0UGxheWJhY2tSYXRlVG8oc3BlZWQpO1xuXG4gICAgaWYgKHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZCkgdGhpcy52aWRlb0VsZW1lbnQucGxheSgpO1xuICB9XG5cbiAgcHVibGljIHBhdXNlKCk6IHZvaWQge1xuICAgIHRoaXMudmVyaWZ5Q3VzdG9tQ29udHJvbHNTdXBwb3J0KCk7XG5cbiAgICBpZiAoIXRoaXMudmlkZW9FbGVtZW50LnBhdXNlZCkgdGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWVrVG8odGltZUluU2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52ZXJpZnlDdXN0b21Db250cm9sc1N1cHBvcnQoKTtcblxuICAgIHRoaXMudmlkZW9FbGVtZW50LmVuZGVkID8gdGhpcy5yZXNldFBsYXliYWNrQW5kU2Vla1RvKHRpbWVJblNlY29uZHMpIDogdGhpcy5zaW1wbHlTZWVrVG8odGltZUluU2Vjb25kcyk7XG4gIH1cblxuICBwdWJsaWMgc2Vla1RvSW5NYXJrZXIoKTogdm9pZCB7XG4gICAgdGhpcy52ZXJpZnlDdXN0b21Db250cm9sc1N1cHBvcnQoKTtcbiAgICBpZiAoIXRoaXMuaW5NYXJrZXIpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNlZWsgdG8gaW4gbWFya2VyIGJlY2F1c2UgaXQgaXMgbm90IHNldC4nKTtcblxuICAgIHRoaXMuc2Vla1RvKHRoaXMuaW5NYXJrZXIpO1xuICB9XG5cbiAgcHVibGljIHNlZWtUb091dE1hcmtlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZlcmlmeUN1c3RvbUNvbnRyb2xzU3VwcG9ydCgpO1xuICAgIGlmICghdGhpcy5vdXRNYXJrZXIpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNlZWsgdG8gb3V0IG1hcmtlciBiZWNhdXNlIGl0IGlzIG5vdCBzZXQuJyk7XG5cbiAgICB0aGlzLnNlZWtUbyh0aGlzLm91dE1hcmtlcik7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5NYXJrZXJUb0N1cnJlbnRUaW1lKCk6IHZvaWQge1xuICAgIHRoaXMudmVyaWZ5Q3VzdG9tQ29udHJvbHNTdXBwb3J0KCk7XG5cbiAgICB0aGlzLmluTWFya2VyID0gdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWU7XG5cbiAgICBpZiAodGhpcy5vdXRNYXJrZXIgJiYgdGhpcy5vdXRNYXJrZXIgPCB0aGlzLmluTWFya2VyKSB7XG4gICAgICB0aGlzLm91dE1hcmtlciA9IHRoaXMuaW5NYXJrZXI7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgaW5NYXJrZXI6IHRoaXMuaW5NYXJrZXIsIG91dE1hcmtlcjogdGhpcy5vdXRNYXJrZXIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlUmVxdWVzdFdpdGgoeyBpbk1hcmtlcjogdGhpcy5pbk1hcmtlciB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0T3V0TWFya2VyVG9DdXJyZW50VGltZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZlcmlmeUN1c3RvbUNvbnRyb2xzU3VwcG9ydCgpO1xuXG4gICAgaWYgKHRoaXMubWFya2Vyc1BsYXliYWNrTW9kZSA9PT0gJ29uJykge1xuICAgICAgLy8gV2UgaGF2ZSBhdXRvbWF0aWNhbGx5IGp1c3QgcmVhY2hlZCB0aGUgb3V0IG1hcmtlciBiZWNhdXNlIHdlIGp1c3QgbW92ZWQgaXQgdG8gY3VycmVudFRpbWUuXG4gICAgICB0aGlzLnZpZGVvRWxlbWVudC5wYXVzZSgpO1xuICAgICAgdGhpcy5tYXJrZXJzUGxheWJhY2tNb2RlID0gJ29mZic7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcGxheWluZ01hcmtlcnM6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHRoaXMub3V0TWFya2VyID0gdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWU7XG5cbiAgICBpZiAodGhpcy5pbk1hcmtlciAmJiB0aGlzLmluTWFya2VyID4gdGhpcy5vdXRNYXJrZXIpIHtcbiAgICAgIHRoaXMuaW5NYXJrZXIgPSB0aGlzLm91dE1hcmtlcjtcbiAgICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlUmVxdWVzdFdpdGgoeyBpbk1hcmtlcjogdGhpcy5pbk1hcmtlciwgb3V0TWFya2VyOiB0aGlzLm91dE1hcmtlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2VSZXF1ZXN0V2l0aCh7IG91dE1hcmtlcjogdGhpcy5vdXRNYXJrZXIgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyTWFya2VycygpOiB2b2lkIHtcbiAgICB0aGlzLnZlcmlmeUN1c3RvbUNvbnRyb2xzU3VwcG9ydCgpO1xuXG4gICAgaWYgKHRoaXMubWFya2Vyc1BsYXliYWNrTW9kZSA9PT0gJ29uJykge1xuICAgICAgLy8gQ2xlYXJpbmcgdGhlIG1hcmtlcnMgaW1tZWRpYXRlbHkga2lsbHMgbWFya2VycyBwbGF5YmFjayBtb2RlLlxuICAgICAgdGhpcy5tYXJrZXJzUGxheWJhY2tNb2RlID0gJ29mZic7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcGxheWluZ01hcmtlcnM6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaW5NYXJrZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vdXRNYXJrZXIgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgaW5NYXJrZXI6IHVuZGVmaW5lZCwgb3V0TWFya2VyOiB1bmRlZmluZWQgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlTWFya2Vyc1BsYXliYWNrKCk6IHZvaWQge1xuICAgIHRoaXMudmVyaWZ5Q3VzdG9tQ29udHJvbHNTdXBwb3J0KCk7XG5cbiAgICBpZiAodGhpcy5tYXJrZXJzUGxheWJhY2tNb2RlID09PSAnb24nKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBsYXliYWNrKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlcnNQbGF5YmFja01vZGUgPT09ICdvZmYnKSB7XG4gICAgICBpZiAoIXRoaXMuaW5NYXJrZXIgfHwgIXRoaXMub3V0TWFya2VyKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBwbGF5IGJldHdlZW4gbWFya2VycyB1bmxlc3MgdGhleSBhcmUgYm90aCBzZXQuJyk7XG5cbiAgICAgIHRoaXMubWFya2Vyc1BsYXliYWNrTW9kZSA9ICdpbml0aWFsaXppbmcnO1xuXG4gICAgICB0aGlzLnNlZWtUbyh0aGlzLmluTWFya2VyKTtcbiAgICAgIC8vIC4uLiBleGVjdXRpb24gY29udGludWVzIGluIG9uU2Vla2VkKCkuXG4gICAgICAvLyBGcm9tIHRoZXJlLCBtYXJrZXJzIHBsYXliYWNrIHN0b3BzIGluIG9uU2Vla2luZygpIG9yIG9uVGltZVVwZGF0ZSgpLlxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVNdXRlKCk6IHZvaWQge1xuICAgIHRoaXMudmVyaWZ5Q3VzdG9tQ29udHJvbHNTdXBwb3J0KCk7XG5cbiAgICB0aGlzLnZpZGVvRWxlbWVudC5tdXRlZCA9ICF0aGlzLnZpZGVvRWxlbWVudC5tdXRlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWb2x1bWVUbyhuZXdWb2x1bWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudmVyaWZ5Q3VzdG9tQ29udHJvbHNTdXBwb3J0KCk7XG5cbiAgICBpZiAodGhpcy52aWRlb0VsZW1lbnQubXV0ZWQpIHtcbiAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gcmVwb3J0IGFueSBjaGFuZ2VzIHVudGlsIHdlJ3JlIGFsbCBkb25lLlxuICAgICAgdGhpcy5zdG9wVmlkZW9FdmVudExpc3RlbmVyRm9yKCd2b2x1bWVjaGFuZ2UnKTtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50Lm11dGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnN0YXJ0VmlkZW9FdmVudExpc3RlbmVyRm9yKCd2b2x1bWVjaGFuZ2UnLCB0aGlzLm9uVm9sdW1lQ2hhbmdlKTtcbiAgICB9XG5cbiAgICAvLyBuZXdWb2x1bWUgaXMgaW4gdGhlIHJhbmdlIDAgdG8gMTAwLiAgVGhlIDx2aWRlbz4gZWxlbWVudCBuZWVkcyAwIHRvIDEuXG4gICAgdGhpcy52aWRlb0VsZW1lbnQudm9sdW1lID0gbmV3Vm9sdW1lIC8gMTAwO1xuICB9XG5cbiAgcHJpdmF0ZSB2ZXJpZnlDdXN0b21Db250cm9sc1N1cHBvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2Jhc2ljJykgdGhyb3cgbmV3IEVycm9yKCdCYXNpYyBtb2RlIGRvZXMgbm90IHN1cHBvcnQgY3VzdG9tIGNvbnRyb2xzLicpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRBc3NldFR5cGUgIT09ICdodG1sNVZpZGVvJykgdGhyb3cgbmV3IEVycm9yKCdDdXJyZW50IGFzc2V0IGRvZXMgbm90IHN1cHBvcnQgY3VzdG9tIGNvbnRyb2xzLicpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFZpZGVvKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEFzc2V0VHlwZSA9ICd2aWRlbyc7XG4gICAgdGhpcy5qd1BsYXllciA9IHRoaXMud2luZG93Lmp3cGxheWVyKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnNldHVwSW5NYXJrZXIoKTtcbiAgICB0aGlzLnNldHVwT3V0TWFya2VyKCk7XG5cbiAgICBjb25zdCBhdXRvc3RhcnRJbkFkdmFuY2VkTW9kZTogYm9vbGVhbiA9ICF0aGlzLmluTWFya2VyIHx8ICF0aGlzLm91dE1hcmtlcjtcblxuICAgIHRoaXMuandQbGF5ZXIuc2V0dXAoe1xuICAgICAgaW1hZ2U6IHRoaXMuZW5oYW5jZWRBc3NldC50aHVtYm5haWxVcmwgfHwgbnVsbCxcbiAgICAgIGZpbGU6IHRoaXMuZW5oYW5jZWRBc3NldC5jbGlwVXJsLFxuICAgICAgYXV0b3N0YXJ0OiB0aGlzLm1vZGUgPT09ICdiYXNpYycgfHwgYXV0b3N0YXJ0SW5BZHZhbmNlZE1vZGUsXG4gICAgICBjb250cm9sczogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuandQbGF5ZXIub24oJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2FkdmFuY2VkJykge1xuICAgICAgICBjb25zdCBqd1BsYXllclByb3ZpZGVyID0gdGhpcy5qd1BsYXllci5nZXRQcm92aWRlcigpO1xuICAgICAgICBpZiAoandQbGF5ZXJQcm92aWRlciAmJiBqd1BsYXllclByb3ZpZGVyLm5hbWUgPT09ICdodG1sNScpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldFR5cGUgPSAnaHRtbDVWaWRlbyc7XG4gICAgICAgICAgdGhpcy5qd1BsYXllci5vbignZGlzcGxheUNsaWNrJywgdGhpcy50b2dnbGVQbGF5YmFjay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgIC8vIFNlZW1zIGxpa2UgdGhlIFwiY29ycmVjdFwiIEFuZ3VsYXIteSB3YXkgdG8gZG8gdGhpcyB3b3VsZCBiZSB0b1xuICAgICAgICAgIC8vIGZpbmQgdGhlIDx2aWRlbz4gdGFnIGluc2lkZSAndGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQnLiAgQnV0XG4gICAgICAgICAgLy8gdGhhdCBkb2Vzbid0IHNlZW0gdG8gd29yaywgc28gd2UnbGwgcmVzb3J0IHRvIHRoaXMgZm9yIG5vdy5cbiAgICAgICAgICAvLyBBU1NVTVBUSU9OOiAgVGhlcmUgaXMgb25lIDx2aWRlbz4gZWxlbWVudCBpbiB0aGUgZG9jdW1lbnQhXG4gICAgICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSB0aGlzLndpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICAgIC8vIG1ha2UgaXQgaGFyZGVyIGZvciB1c2VycyB0byBkb3dubG9hZCB0aGUgdmlkZW8gYnkgZGlzYWJsaW5nIHRoZSBjb250ZXh0IG1lbnUsIHRha2VuIGZyb21cbiAgICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85NzU2ODM3L3ByZXZlbnQtaHRtbDUtdmlkZW8tZnJvbS1iZWluZy1kb3dubG9hZGVkLXJpZ2h0LWNsaWNrLXNhdmVkXG4gICAgICAgICAgdGhpcy52aWRlb0VsZW1lbnQub25jb250ZXh0bWVudSA9ICgpID0+IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc3RhcnRWaWRlb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHtcbiAgICAgICAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgICAgICAgY2FuU3VwcG9ydEN1c3RvbUNvbnRyb2xzOiB0cnVlLFxuICAgICAgICAgICAgZnJhbWVzUGVyU2Vjb25kOiB0aGlzLmVuaGFuY2VkQXNzZXQuZnJhbWVzUGVyU2Vjb25kLFxuICAgICAgICAgICAgaW5NYXJrZXI6IHRoaXMuaW5NYXJrZXIsXG4gICAgICAgICAgICBvdXRNYXJrZXI6IHRoaXMub3V0TWFya2VyLFxuICAgICAgICAgICAgdm9sdW1lOiB0aGlzLmN1cnJlbnRWb2x1bWVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghYXV0b3N0YXJ0SW5BZHZhbmNlZE1vZGUpIHRoaXMudG9nZ2xlTWFya2Vyc1BsYXliYWNrKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWF1dG9zdGFydEluQWR2YW5jZWRNb2RlKSB0aGlzLmp3UGxheWVyLnBsYXkodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5qd1BsYXllci5zZXRDb250cm9scyh0cnVlKTtcbiAgICAgICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcmVhZHk6IHRydWUsIGNhblN1cHBvcnRDdXN0b21Db250cm9sczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERlZmF1bHQgY29udHJvbCBzZXR0aW5nIGlzIGZhbHNlLCBzbyB3ZSB0dXJuIHRoZW1cbiAgICAgICAgLy8gb24gaGVyZSBpZiB3ZSdyZSB1c2luZyB0aGUgc2ltcGxlIHBsYXllci5cbiAgICAgICAgdGhpcy5qd1BsYXllci5zZXRDb250cm9scyh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBJbk1hcmtlcigpOiB2b2lkIHtcbiAgICB0aGlzLmluTWFya2VyID1cbiAgICAgIHRoaXMuZW5oYW5jZWRBc3NldC5pbk1hcmtlckZyYW1lICYmIHRoaXMuZW5oYW5jZWRBc3NldC5pbk1hcmtlckZyYW1lTnVtYmVyICE9PSAwXG4gICAgICAgID8gdGhpcy5lbmhhbmNlZEFzc2V0LmluTWFya2VyRnJhbWUuYXNTZWNvbmRzKDMpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE91dE1hcmtlcigpOiB2b2lkIHtcbiAgICB0aGlzLm91dE1hcmtlciA9XG4gICAgICB0aGlzLmVuaGFuY2VkQXNzZXQub3V0TWFya2VyRnJhbWUgJiYgdGhpcy5lbmhhbmNlZEFzc2V0Lm91dE1hcmtlckZyYW1lTnVtYmVyICE9PSB0aGlzLmVuaGFuY2VkQXNzZXQuZHVyYXRpb25GcmFtZU51bWJlclxuICAgICAgICA/IHRoaXMuZW5oYW5jZWRBc3NldC5vdXRNYXJrZXJGcmFtZS5hc1NlY29uZHMoMylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VmlkZW9FdmVudExpc3RlbmVycygpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0VmlkZW9FdmVudExpc3RlbmVyRm9yKCdkdXJhdGlvbmNoYW5nZScsIHRoaXMub25EdXJhdGlvbkNoYW5nZSk7XG4gICAgdGhpcy5zdGFydFZpZGVvRXZlbnRMaXN0ZW5lckZvcignZW5kZWQnLCB0aGlzLm9uRW5kZWQpO1xuICAgIHRoaXMuc3RhcnRWaWRlb0V2ZW50TGlzdGVuZXJGb3IoJ3BhdXNlJywgdGhpcy5vblBhdXNlKTtcbiAgICB0aGlzLnN0YXJ0VmlkZW9FdmVudExpc3RlbmVyRm9yKCdwbGF5aW5nJywgdGhpcy5vblBsYXlpbmcpO1xuICAgIHRoaXMuc3RhcnRWaWRlb0V2ZW50TGlzdGVuZXJGb3IoJ3JhdGVjaGFuZ2UnLCB0aGlzLm9uUmF0ZUNoYW5nZSk7XG4gICAgdGhpcy5zdGFydFZpZGVvRXZlbnRMaXN0ZW5lckZvcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICB0aGlzLnN0YXJ0VmlkZW9FdmVudExpc3RlbmVyRm9yKCdzZWVrZWQnLCB0aGlzLm9uU2Vla2VkKTtcbiAgICB0aGlzLnN0YXJ0VmlkZW9FdmVudExpc3RlbmVyRm9yKCdzZWVraW5nJywgdGhpcy5vblNlZWtpbmcpO1xuICAgIHRoaXMuc3RhcnRWaWRlb0V2ZW50TGlzdGVuZXJGb3IoJ3ZvbHVtZWNoYW5nZScsIHRoaXMub25Wb2x1bWVDaGFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFZpZGVvRXZlbnRMaXN0ZW5lckZvcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZpZGVvRWxlbWVudExpc3RlbmVyUmVtb3ZlcnMpIHRoaXMudmlkZW9FbGVtZW50TGlzdGVuZXJSZW1vdmVycyA9IHt9O1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzUwODAzODcvZHluYW1pY2FsbHktYWRkLWV2ZW50LWxpc3RlbmVyLWluLWFuZ3VsYXItMlxuICAgIHRoaXMudmlkZW9FbGVtZW50TGlzdGVuZXJSZW1vdmVyc1tldmVudE5hbWVdID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy52aWRlb0VsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BWaWRlb0V2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgZXZlbnROYW1lIGluIHRoaXMudmlkZW9FbGVtZW50TGlzdGVuZXJSZW1vdmVycykge1xuICAgICAgdGhpcy5zdG9wVmlkZW9FdmVudExpc3RlbmVyRm9yKGV2ZW50TmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy52aWRlb0VsZW1lbnRMaXN0ZW5lclJlbW92ZXJzID0ge307XG4gIH1cblxuICBwcml2YXRlIHN0b3BWaWRlb0V2ZW50TGlzdGVuZXJGb3IoZXZlbnROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZGVvRWxlbWVudExpc3RlbmVyUmVtb3ZlcnNbZXZlbnROYW1lXSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkR1cmF0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlUmVxdWVzdFdpdGgoeyBkdXJhdGlvbjogdGhpcy52aWRlb0VsZW1lbnQuZHVyYXRpb24gfSk7XG4gIH1cblxuICBwcml2YXRlIG9uRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRQbGF5YmFja1JhdGVUbygxKTtcbiAgfVxuXG4gIHByaXZhdGUgb25QYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcGxheWluZzogZmFsc2UgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uUGxheWluZygpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcGxheWluZzogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25SYXRlQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlUmVxdWVzdFdpdGgoeyBwbGF5YmFja1NwZWVkOiB0aGlzLnZpZGVvRWxlbWVudC5wbGF5YmFja1JhdGUgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uU2Vla2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtlcnNQbGF5YmFja01vZGUgPT09ICdpbml0aWFsaXppbmcnKSB7XG4gICAgICB0aGlzLm1hcmtlcnNQbGF5YmFja01vZGUgPSAnb24nO1xuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2VSZXF1ZXN0V2l0aCh7IHBsYXlpbmdNYXJrZXJzOiB0cnVlIH0pO1xuICAgICAgaWYgKHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZCkgdGhpcy52aWRlb0VsZW1lbnQucGxheSgpO1xuICAgIH1cblxuICAgIHRoaXMud2FpdGluZ0ZvclNlZWsgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnBlbmRpbmdTZWVrUmVxdWVzdCkge1xuICAgICAgY29uc3QgbmV3VGltZTogbnVtYmVyID0gdGhpcy5wZW5kaW5nU2Vla1JlcXVlc3Q7XG4gICAgICB0aGlzLnBlbmRpbmdTZWVrUmVxdWVzdCA9IG51bGw7XG4gICAgICB0aGlzLnNlZWtUbyhuZXdUaW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uU2Vla2luZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrZXJzUGxheWJhY2tNb2RlID09PSAnb24nKSB7XG4gICAgICAvLyBBbnkgc2VlayBpbW1lZGlhdGVseSBraWxscyByYW5nZSBwbGF5YmFjayBtb2RlLlxuICAgICAgdGhpcy5tYXJrZXJzUGxheWJhY2tNb2RlID0gJ29mZic7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgcGxheWluZ01hcmtlcnM6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25UaW1lVXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWU7XG5cbiAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKHsgY3VycmVudFRpbWU6IGN1cnJlbnRUaW1lIH0pO1xuXG4gICAgaWYgKHRoaXMubWFya2Vyc1BsYXliYWNrTW9kZSA9PT0gJ29uJyAmJiBjdXJyZW50VGltZSA+PSB0aGlzLm91dE1hcmtlcikge1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgIHRoaXMubWFya2Vyc1BsYXliYWNrTW9kZSA9ICdvZmYnO1xuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2VSZXF1ZXN0V2l0aCh7IHBsYXlpbmdNYXJrZXJzOiBmYWxzZSB9KTtcblxuICAgICAgaWYgKGN1cnJlbnRUaW1lID4gdGhpcy5vdXRNYXJrZXIpIHRoaXMuc2Vla1RvKHRoaXMub3V0TWFya2VyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVm9sdW1lQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlUmVxdWVzdFdpdGgoeyB2b2x1bWU6IHRoaXMuY3VycmVudFZvbHVtZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGN1cnJlbnRWb2x1bWUoKTogbnVtYmVyIHtcbiAgICAvLyBUaGUgPHZpZGVvPiBlbGVtZW50IHNlcGFyYXRlbHkgdHJhY2tzIHZhbHVlcyBmb3IgXCJtdXRlZFwiICh0cnVlL2ZhbHNlKSBhbmQgXCJ2b2x1bWVcIiAoMCB0byAxLjApLlxuICAgIC8vIFRvIG1ha2UgdGhpbmdzIHNpbXBsZXIgZm9yIG91ciBldmVudCBjb25zdW1lcnMsIGNvbWJpbmUgdGhlc2UgaW50byBhIHNpbmdsZSB2YWx1ZSBmcm9tIDAgdG8gMTAwLlxuICAgIHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5tdXRlZCA/IDAgOiBNYXRoLnJvdW5kKHRoaXMudmlkZW9FbGVtZW50LnZvbHVtZSAqIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRTdGF0ZUNoYW5nZVJlcXVlc3RXaXRoKGNoYW5nZXM6IFBsYXllclN0YXRlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIFJ1biB0aGVzZSBpbiBcInRoZSBBbmd1bGFyIHpvbmVcIiBzbyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3Igc2VlcyBjaGFuZ2VzIG5vdywgbm90IG9uIHRoZSBuZXh0IGN5Y2xlLlxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZVJlcXVlc3QuZW1pdChjaGFuZ2VzKSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwSW1hZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50QXNzZXRUeXBlID0gJ2ltYWdlJztcbiAgICBsZXQgaW1nV3JhcHBlcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbWdXcmFwcGVyLmNsYXNzTmFtZSA9ICdwaG90by1jb250YWluZXInO1xuICAgIGxldCBlbGVtOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWxlbS5zcmMgPSB0aGlzLmVuaGFuY2VkQXNzZXQuY2xpcFVybDtcbiAgICBpbWdXcmFwcGVyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGltZ1dyYXBwZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50QXNzZXRUeXBlLm1hdGNoKC9edmlkZW98aHRtbDVWaWRlbyQvKSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEFzc2V0VHlwZSA9PT0gJ2h0bWw1VmlkZW8nKSB7XG4gICAgICAgIHRoaXMuc3RvcFZpZGVvRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5qd1BsYXllci5yZW1vdmUoKTtcbiAgICAgIHRoaXMuandQbGF5ZXIgPSBudWxsO1xuICAgICAgdGhpcy5pbk1hcmtlciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMub3V0TWFya2VyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy53YWl0aW5nRm9yU2VlayA9IGZhbHNlO1xuICAgICAgdGhpcy5wZW5kaW5nU2Vla1JlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudEFzc2V0VHlwZSA9ICd1bmtub3duJztcbiAgICB0aGlzLm1hcmtlcnNQbGF5YmFja01vZGUgPSAnb2ZmJztcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgc2V0UGxheWJhY2tSYXRlVG8obmV3UmF0ZTogbnVtYmVyKSB7XG4gICAgaWYgKG5ld1JhdGUgIT09IHRoaXMudmlkZW9FbGVtZW50LnBsYXliYWNrUmF0ZSkgdGhpcy52aWRlb0VsZW1lbnQucGxheWJhY2tSYXRlID0gbmV3UmF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRQbGF5YmFja0FuZFNlZWtUbyh0aW1lSW5TZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBUaGlzIGlzIGEgd2VpcmQgc3RhdGUuICBJZiB3ZSBtZXJlbHkgc2VlayBhZnRlciB0aGUgdmlkZW8gaGFzIGVuZGVkLCB3ZSB3aWxsIGdldCBhICd0aW1ldXBkYXRlJ1xuICAgIC8vIGV2ZW50IHRoYXQgU0FZUyB0aGUgc2VlayBoYXMgaGFwcGVuZWQsIGJ1dCB0aGUgdmlkZW8gc3RheXMgc3R1Y2sgYXQgdGhlIGVuZC4gIFRodXMsIHdlIG5lZWQgdG9cbiAgICAvLyBcInByaW1lIHRoZSBwdW1wXCIgYW5kIGRvIGEgcXVpY2sgcGxheS9wYXVzZSBjeWNsZSBmaXJzdC4gIFRoYXQgc2VlbXMgdG8gcmVzZXQgdGhpbmdzIHByb3Blcmx5IHNvIHRoYXRcbiAgICAvLyB0aGUgc2VlayB3aWxsIGFjdHVhbGx5IHVwZGF0ZSB0aGUgdmlkZW8uXG5cbiAgICBjb25zdCBvbmVUaW1lTGlzdGVuZXJSZW1vdmVyOiBGdW5jdGlvbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMudmlkZW9FbGVtZW50LCAncGxheWluZycsICgpID0+IHtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlKCk7XG4gICAgICBvbmVUaW1lTGlzdGVuZXJSZW1vdmVyKCk7XG4gICAgICB0aGlzLnNpbXBseVNlZWtUbyh0aW1lSW5TZWNvbmRzKTtcbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IHBsYXliYWNrLCB3aGljaCB3aWxsIGltbWVkaWF0ZWx5IHBhdXNlIGFuZCBzZWVrIGR1ZSB0byB0aGUgb25lLXRpbWUgbGlzdGVuZXIgYWJvdmUuXG4gICAgdGhpcy52aWRlb0VsZW1lbnQucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaW1wbHlTZWVrVG8odGltZUluU2Vjb25kczogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMud2FpdGluZ0ZvclNlZWspIHtcbiAgICAgIC8vIElmIHdlIGdldCBzZXZlcmFsIHNlZWsgcmVxdWVzdHMgd2hpbGUgd2UgYXJlIHdhaXRpbmcgZm9yIG9uZSB0byBjb21wbGV0ZSwgd2UnbGwgcmVtZW1iZXJcbiAgICAgIC8vIGp1c3QgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3QgKHRocm93aW5nIGF3YXkgYWxsIG90aGVycyksIGFuZCBzZWVrIHRoZXJlIGFzIHNvb24gYXMgdGhlIGN1cnJlbnRcbiAgICAgIC8vIHNlZWsgaXMgZG9uZS4gIFRoaXMgbGV0cyB1cyByZXBlYXRlZGx5IHNlZWsganVzdCBhcyBmYXN0IGFzIHRoZSBicm93c2VyIGNhbiBoYW5kbGUgaXQuXG4gICAgICB0aGlzLnBlbmRpbmdTZWVrUmVxdWVzdCA9IHRpbWVJblNlY29uZHM7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lID09PSB0aW1lSW5TZWNvbmRzKSB7XG4gICAgICAvLyBXZSdyZSBhbHJlYWR5IHdoZXJlIHdlIHdhbnQgdG8gYmUsIHNvIHdlIGRvbid0IG5lZWQgdG8gYWN0dWFsbHkgc2Vlay4gIEJ1dCBsZXQncyBzZW5kIGEgc3RhdGUgdXBkYXRlXG4gICAgICAvLyBpbiBjYXNlIGNvbnN1bWVycyBvZiB0aGlzIGNvbXBvbmVudCBuZWVkIHRvIGJlIHVwZGF0ZWQgd2l0aCB0aGUgY3VycmVudCB0aW1lLlxuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2VSZXF1ZXN0V2l0aCh7IGN1cnJlbnRUaW1lOiB0aW1lSW5TZWNvbmRzIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FpdGluZ0ZvclNlZWsgPSB0cnVlO1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWUgPSB0aW1lSW5TZWNvbmRzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVhZE92ZXJsYXlDb25maWcoKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50czogUG9qbyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cyk7XG5cbiAgICBpZiAoIWNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoJ3BsYXllck92ZXJsYXknKSB8fCAhY29tcG9uZW50cy5wbGF5ZXJPdmVybGF5Lmhhc093blByb3BlcnR5KCdjb25maWcnKSkge1xuICAgICAgY29uc29sZS5sb2coJ05vIHBsYXllck92ZXJsYXkgY29uZmlndXJhdGlvbiBmb3VuZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NvbmZpZzogUG9qbyA9IGNvbXBvbmVudHMucGxheWVyT3ZlcmxheS5jb25maWc7XG4gICAgY29uc29sZS5sb2coJ3BsYXllck92ZXJsYXkgY29uZmlndXJhdGlvbjonKTtcbiAgICBbXG4gICAgICAnZW5hYmxlZCcsICd1c2VyRGlzcGxheVRleHQnLCAncG9zaXRpb24nLCAnZm9udFNpemVJblBpeGVscycsICd0ZXh0Q29sb3InLCAndGV4dE9wYWNpdHknLCAnYmFja2dyb3VuZENvbG9yJyxcbiAgICAgICdiYWNrZ3JvdW5kT3BhY2l0eSdcbiAgICBdLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAgICR7a2V5fTogJHtyYXdDb25maWdba2V5XSA/IGBcIiR7cmF3Q29uZmlnW2tleV0udmFsdWV9XCJgIDogdW5kZWZpbmVkfWApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
