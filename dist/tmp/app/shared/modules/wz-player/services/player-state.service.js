"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var index_1 = require("../../wazee-frame-formatter/index");
var PlayerStateService = (function () {
    function PlayerStateService() {
        this.stateSubject = new BehaviorSubject_1.BehaviorSubject(this.initialValue);
        this.changesToApply = {};
    }
    Object.defineProperty(PlayerStateService.prototype, "state", {
        get: function () {
            return this.stateSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerStateService.prototype, "snapshot", {
        get: function () {
            return this.stateSubject.getValue();
        },
        enumerable: true,
        configurable: true
    });
    PlayerStateService.prototype.updateWith = function (changes) {
        this.stateSubject.next(this.createNewStateWith(changes));
    };
    PlayerStateService.prototype.reset = function () {
        this.stateSubject.next(this.initialValue);
    };
    Object.defineProperty(PlayerStateService.prototype, "initialValue", {
        get: function () {
            return {
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
        },
        enumerable: true,
        configurable: true
    });
    PlayerStateService.prototype.createNewStateWith = function (requestedChanges) {
        var _this = this;
        this.changesToApply = {};
        Object.keys(requestedChanges).forEach(function (key) { return _this.changesToApply[key] = requestedChanges[key]; });
        this.handleChangeInterdependencies();
        return {
            ready: this.latest('ready'),
            canSupportCustomControls: this.latest('canSupportCustomControls'),
            playing: this.latest('playing'),
            playingMarkers: this.latest('playingMarkers'),
            playbackSpeed: this.latest('playbackSpeed'),
            framesPerSecond: this.latest('framesPerSecond'),
            currentFrame: this.newFrameFrom(this.latest('currentFrame')),
            durationFrame: this.newFrameFrom(this.latest('durationFrame')),
            inMarkerFrame: this.newFrameFrom(this.latest('inMarkerFrame')),
            outMarkerFrame: this.newFrameFrom(this.latest('outMarkerFrame')),
            volume: this.latest('volume'),
            sourceBasedOffset: this.latest('sourceBasedOffset') || this.initialValue.sourceBasedOffset,
            timecodeFormat: this.latest('timecodeFormat'),
            timecodeBase: this.latest('timecodeBase'),
            changeDetectionEnabler: this.snapshot.changeDetectionEnabler + 1
        };
    };
    PlayerStateService.prototype.handleChangeInterdependencies = function () {
        this.handleInMarkerFrameUpdate();
        this.handleOutMarkerFrameUpdate();
        this.handleCurrentTimeUpdate();
        this.handleDurationUpdate();
        this.handleInMarkerUpdate();
        this.handleOutMarkerUpdate();
        this.handleMarkerOrderingIssues();
    };
    PlayerStateService.prototype.handleInMarkerFrameUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('inMarkerFrameNumber'))
            return;
        this.changesToApply.inMarkerFrame = this.newFrame.setFromFrameNumber(this.changesToApply.inMarkerFrameNumber);
        delete this.changesToApply.inMarkerFrameNumber;
    };
    PlayerStateService.prototype.handleOutMarkerFrameUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('outMarkerFrameNumber'))
            return;
        this.changesToApply.outMarkerFrame = this.newFrame.setFromFrameNumber(this.changesToApply.outMarkerFrameNumber);
        delete this.changesToApply.outMarkerFrameNumber;
    };
    PlayerStateService.prototype.handleCurrentTimeUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('currentTime'))
            return;
        this.changesToApply.currentFrame = this.newFrameFrom(this.changesToApply.currentTime);
        delete this.changesToApply.currentTime;
    };
    PlayerStateService.prototype.handleDurationUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('duration'))
            return;
        this.changesToApply.durationFrame = this.newFrameFrom(this.changesToApply.duration);
        delete this.changesToApply.duration;
    };
    PlayerStateService.prototype.handleInMarkerUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('inMarker'))
            return;
        this.changesToApply.inMarkerFrame = this.newFrameFrom(this.changesToApply.inMarker);
        delete this.changesToApply.inMarker;
    };
    PlayerStateService.prototype.handleOutMarkerUpdate = function () {
        if (!this.changesToApply.hasOwnProperty('outMarker'))
            return;
        this.changesToApply.outMarkerFrame = this.newFrameFrom(this.changesToApply.outMarker);
        delete this.changesToApply.outMarker;
    };
    PlayerStateService.prototype.handleMarkerOrderingIssues = function () {
        var newInMarkerFrame = this.changesToApply.inMarkerFrame;
        if (newInMarkerFrame) {
            var latestOutMarkerFrame = this.latest('outMarkerFrame');
            if (latestOutMarkerFrame && newInMarkerFrame.frameNumber > latestOutMarkerFrame.frameNumber) {
                this.changesToApply.outMarkerFrame = this.newFrameFrom(newInMarkerFrame);
            }
            return;
        }
        var newOutMarkerFrame = this.changesToApply.outMarkerFrame;
        if (newOutMarkerFrame) {
            var latestInMarkerFrame = this.latest('inMarkerFrame');
            if (latestInMarkerFrame && newOutMarkerFrame.frameNumber < latestInMarkerFrame.frameNumber) {
                this.changesToApply.inMarkerFrame = this.newFrameFrom(newOutMarkerFrame);
            }
        }
    };
    PlayerStateService.prototype.latest = function (key) {
        return this.changesToApply.hasOwnProperty(key) ? this.changesToApply[key] : this.snapshot[key];
    };
    PlayerStateService.prototype.newFrameFrom = function (input) {
        if (typeof input === 'number') {
            return this.newFrame.setFromSeconds(input);
        }
        else if (!input) {
            return undefined;
        }
        else {
            return this.newFrame.setFromFrameNumber(input.frameNumber);
        }
    };
    Object.defineProperty(PlayerStateService.prototype, "newFrame", {
        get: function () {
            return new index_1.Frame(this.latest('framesPerSecond'), this.latest('sourceBasedOffset'));
        },
        enumerable: true,
        configurable: true
    });
    PlayerStateService.decorators = [
        { type: core_1.Injectable },
    ];
    PlayerStateService.ctorParameters = function () { return []; };
    return PlayerStateService;
}());
exports.PlayerStateService = PlayerStateService;
//# sourceMappingURL=player-state.service.js.map