"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    PlayerStateService = __decorate([
        core_1.Injectable()
    ], PlayerStateService);
    return PlayerStateService;
}());
exports.PlayerStateService = PlayerStateService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvc2VydmljZXMvcGxheWVyLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0Msd0RBQXVEO0FBRXZELDJEQUF3RjtBQUl4RjtJQURBO1FBRVUsaUJBQVksR0FBaUMsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRixtQkFBYyxHQUF1QixFQUFFLENBQUM7SUE4SmxELENBQUM7SUE1SkMsc0JBQVcscUNBQUs7YUFBaEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFRO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFTSx1Q0FBVSxHQUFqQixVQUFrQixPQUEyQjtRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU0sa0NBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0JBQVksNENBQVk7YUFBeEI7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osd0JBQXdCLEVBQUUsSUFBSTtnQkFDOUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixlQUFlLEVBQUUsS0FBSztnQkFDdEIsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLGFBQWEsRUFBRSxTQUFTO2dCQUN4QixhQUFhLEVBQUUsU0FBUztnQkFDeEIsY0FB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RixDQUFDOzs7T0FBQTtJQS9KVSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTtPQUNBLGtCQUFrQixDQWdLOUI7SUFBRCx5QkFBQztDQWhLRCxBQWdLQyxJQUFBO0FBaEtZLGdEQUFrQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL3NlcnZpY2VzL3BsYXllci1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmltcG9ydCB7IEZyYW1lLCBUaW1lY29kZUZvcm1hdCwgVGltZWNvZGVCYXNlIH0gZnJvbSAnLi4vLi4vd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcbmltcG9ydCB7IFBsYXllclN0YXRlLCBQbGF5ZXJTdGF0ZUNoYW5nZXMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxheWVyU3RhdGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxQbGF5ZXJTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgcHJpdmF0ZSBjaGFuZ2VzVG9BcHBseTogUGxheWVyU3RhdGVDaGFuZ2VzID0ge307XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBPYnNlcnZhYmxlPFBsYXllclN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBzbmFwc2hvdCgpOiBQbGF5ZXJTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVTdWJqZWN0LmdldFZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV2l0aChjaGFuZ2VzOiBQbGF5ZXJTdGF0ZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlU3ViamVjdC5uZXh0KHRoaXMuY3JlYXRlTmV3U3RhdGVXaXRoKGNoYW5nZXMpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlU3ViamVjdC5uZXh0KHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGluaXRpYWxWYWx1ZSgpOiBQbGF5ZXJTdGF0ZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgIGNhblN1cHBvcnRDdXN0b21Db250cm9sczogdHJ1ZSxcbiAgICAgIHBsYXlpbmc6IGZhbHNlLFxuICAgICAgcGxheWluZ01hcmtlcnM6IGZhbHNlLFxuICAgICAgcGxheWJhY2tTcGVlZDogMSxcbiAgICAgIGZyYW1lc1BlclNlY29uZDogMjkuOTcsXG4gICAgICBjdXJyZW50RnJhbWU6IHVuZGVmaW5lZCxcbiAgICAgIGR1cmF0aW9uRnJhbWU6IHVuZGVmaW5lZCxcbiAgICAgIGluTWFya2VyRnJhbWU6IHVuZGVmaW5lZCxcbiAgICAgIG91dE1hcmtlckZyYW1lOiB1bmRlZmluZWQsXG4gICAgICB2b2x1bWU6IDEwMCxcbiAgICAgIHNvdXJjZUJhc2VkT2Zmc2V0OiAnMDA6MDA6MDA6MDAnLFxuICAgICAgdGltZWNvZGVGb3JtYXQ6IFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04sXG4gICAgICB0aW1lY29kZUJhc2U6IFRpbWVjb2RlQmFzZS5TVFJFQU1fQkFTRUQsXG4gICAgICBjaGFuZ2VEZXRlY3Rpb25FbmFibGVyOiAwXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTmV3U3RhdGVXaXRoKHJlcXVlc3RlZENoYW5nZXM6IFBsYXllclN0YXRlQ2hhbmdlcyk6IFBsYXllclN0YXRlIHtcbiAgICAvLyBJdCdzIHRlbXB0aW5nIHRvIHVzZSBDb21tb24uY2xvbmUoKSBoZXJlLCBidXQgdGhhdCBkb2Vzbid0IHByZXNlcnZlIHByb3BlcnRpZXMgd2l0aCBleHBsaWNpdCB1bmRlZmluZWQgdmFsdWVzLlxuICAgIC8vIChBbmQgd2UgbmVlZCBpbk1hcmtlciBhbmQgb3V0TWFya2VyIHRvIGNvbWUgaW4gYXMgdW5kZWZpbmVkIGJlY2F1c2UgdGhpcyBpcyBob3cgbWFya2VycyBhcmUgY2xlYXJlZC4pXG4gICAgdGhpcy5jaGFuZ2VzVG9BcHBseSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHJlcXVlc3RlZENoYW5nZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiAodGhpcy5jaGFuZ2VzVG9BcHBseSBhcyBhbnkpW2tleV0gPSAocmVxdWVzdGVkQ2hhbmdlcyBhcyBhbnkpW2tleV0pO1xuXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2VJbnRlcmRlcGVuZGVuY2llcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlYWR5OiB0aGlzLmxhdGVzdCgncmVhZHknKSxcbiAgICAgIGNhblN1cHBvcnRDdXN0b21Db250cm9sczogdGhpcy5sYXRlc3QoJ2NhblN1cHBvcnRDdXN0b21Db250cm9scycpLFxuICAgICAgcGxheWluZzogdGhpcy5sYXRlc3QoJ3BsYXlpbmcnKSxcbiAgICAgIHBsYXlpbmdNYXJrZXJzOiB0aGlzLmxhdGVzdCgncGxheWluZ01hcmtlcnMnKSxcbiAgICAgIHBsYXliYWNrU3BlZWQ6IHRoaXMubGF0ZXN0KCdwbGF5YmFja1NwZWVkJyksXG4gICAgICBmcmFtZXNQZXJTZWNvbmQ6IHRoaXMubGF0ZXN0KCdmcmFtZXNQZXJTZWNvbmQnKSxcbiAgICAgIGN1cnJlbnRGcmFtZTogdGhpcy5uZXdGcmFtZUZyb20odGhpcy5sYXRlc3QoJ2N1cnJlbnRGcmFtZScpKSxcbiAgICAgIGR1cmF0aW9uRnJhbWU6IHRoaXMubmV3RnJhbWVGcm9tKHRoaXMubGF0ZXN0KCdkdXJhdGlvbkZyYW1lJykpLFxuICAgICAgaW5NYXJrZXJGcmFtZTogdGhpcy5uZXdGcmFtZUZyb20odGhpcy5sYXRlc3QoJ2luTWFya2VyRnJhbWUnKSksXG4gICAgICBvdXRNYXJrZXJGcmFtZTogdGhpcy5uZXdGcmFtZUZyb20odGhpcy5sYXRlc3QoJ291dE1hcmtlckZyYW1lJykpLFxuICAgICAgdm9sdW1lOiB0aGlzLmxhdGVzdCgndm9sdW1lJyksXG4gICAgICBzb3VyY2VCYXNlZE9mZnNldDogdGhpcy5sYXRlc3QoJ3NvdXJjZUJhc2VkT2Zmc2V0JykgfHwgdGhpcy5pbml0aWFsVmFsdWUuc291cmNlQmFzZWRPZmZzZXQsXG4gICAgICB0aW1lY29kZUZvcm1hdDogdGhpcy5sYXRlc3QoJ3RpbWVjb2RlRm9ybWF0JyksXG4gICAgICB0aW1lY29kZUJhc2U6IHRoaXMubGF0ZXN0KCd0aW1lY29kZUJhc2UnKSxcbiAgICAgIGNoYW5nZURldGVjdGlvbkVuYWJsZXI6IHRoaXMuc25hcHNob3QuY2hhbmdlRGV0ZWN0aW9uRW5hYmxlciArIDFcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDaGFuZ2VJbnRlcmRlcGVuZGVuY2llcygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUluTWFya2VyRnJhbWVVcGRhdGUoKTtcbiAgICB0aGlzLmhhbmRsZU91dE1hcmtlckZyYW1lVXBkYXRlKCk7XG4gICAgdGhpcy5oYW5kbGVDdXJyZW50VGltZVVwZGF0ZSgpO1xuICAgIHRoaXMuaGFuZGxlRHVyYXRpb25VcGRhdGUoKTtcbiAgICB0aGlzLmhhbmRsZUluTWFya2VyVXBkYXRlKCk7XG4gICAgdGhpcy5oYW5kbGVPdXRNYXJrZXJVcGRhdGUoKTtcbiAgICB0aGlzLmhhbmRsZU1hcmtlck9yZGVyaW5nSXNzdWVzKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUluTWFya2VyRnJhbWVVcGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNoYW5nZXNUb0FwcGx5Lmhhc093blByb3BlcnR5KCdpbk1hcmtlckZyYW1lTnVtYmVyJykpIHJldHVybjtcblxuICAgIHRoaXMuY2hhbmdlc1RvQXBwbHkuaW5NYXJrZXJGcmFtZSA9IHRoaXMubmV3RnJhbWUuc2V0RnJvbUZyYW1lTnVtYmVyKHRoaXMuY2hhbmdlc1RvQXBwbHkuaW5NYXJrZXJGcmFtZU51bWJlcik7XG4gICAgZGVsZXRlIHRoaXMuY2hhbmdlc1RvQXBwbHkuaW5NYXJrZXJGcmFtZU51bWJlcjtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlT3V0TWFya2VyRnJhbWVVcGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNoYW5nZXNUb0FwcGx5Lmhhc093blByb3BlcnR5KCdvdXRNYXJrZXJGcmFtZU51bWJlcicpKSByZXR1cm47XG5cbiAgICB0aGlzLmNoYW5nZXNUb0FwcGx5Lm91dE1hcmtlckZyYW1lID0gdGhpcy5uZXdGcmFtZS5zZXRGcm9tRnJhbWVOdW1iZXIodGhpcy5jaGFuZ2VzVG9BcHBseS5vdXRNYXJrZXJGcmFtZU51bWJlcik7XG4gICAgZGVsZXRlIHRoaXMuY2hhbmdlc1RvQXBwbHkub3V0TWFya2VyRnJhbWVOdW1iZXI7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUN1cnJlbnRUaW1lVXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jaGFuZ2VzVG9BcHBseS5oYXNPd25Qcm9wZXJ0eSgnY3VycmVudFRpbWUnKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5jaGFuZ2VzVG9BcHBseS5jdXJyZW50RnJhbWUgPSB0aGlzLm5ld0ZyYW1lRnJvbSh0aGlzLmNoYW5nZXNUb0FwcGx5LmN1cnJlbnRUaW1lKTtcbiAgICBkZWxldGUgdGhpcy5jaGFuZ2VzVG9BcHBseS5jdXJyZW50VGltZTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRHVyYXRpb25VcGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNoYW5nZXNUb0FwcGx5Lmhhc093blByb3BlcnR5KCdkdXJhdGlvbicpKSByZXR1cm47XG5cbiAgICB0aGlzLmNoYW5nZXNUb0FwcGx5LmR1cmF0aW9uRnJhbWUgPSB0aGlzLm5ld0ZyYW1lRnJvbSh0aGlzLmNoYW5nZXNUb0FwcGx5LmR1cmF0aW9uKTtcbiAgICBkZWxldGUgdGhpcy5jaGFuZ2VzVG9BcHBseS5kdXJhdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlSW5NYXJrZXJVcGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNoYW5nZXNUb0FwcGx5Lmhhc093blByb3BlcnR5KCdpbk1hcmtlcicpKSByZXR1cm47XG5cbiAgICB0aGlzLmNoYW5nZXNUb0FwcGx5LmluTWFya2VyRnJhbWUgPSB0aGlzLm5ld0ZyYW1lRnJvbSh0aGlzLmNoYW5nZXNUb0FwcGx5LmluTWFya2VyKTtcbiAgICBkZWxldGUgdGhpcy5jaGFuZ2VzVG9BcHBseS5pbk1hcmtlcjtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlT3V0TWFya2VyVXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jaGFuZ2VzVG9BcHBseS5oYXNPd25Qcm9wZXJ0eSgnb3V0TWFya2VyJykpIHJldHVybjtcblxuICAgIHRoaXMuY2hhbmdlc1RvQXBwbHkub3V0TWFya2VyRnJhbWUgPSB0aGlzLm5ld0ZyYW1lRnJvbSh0aGlzLmNoYW5nZXNUb0FwcGx5Lm91dE1hcmtlcik7XG4gICAgZGVsZXRlIHRoaXMuY2hhbmdlc1RvQXBwbHkub3V0TWFya2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVNYXJrZXJPcmRlcmluZ0lzc3VlcygpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdJbk1hcmtlckZyYW1lOiBGcmFtZSA9IHRoaXMuY2hhbmdlc1RvQXBwbHkuaW5NYXJrZXJGcmFtZTtcblxuICAgIGlmIChuZXdJbk1hcmtlckZyYW1lKSB7XG4gICAgICBjb25zdCBsYXRlc3RPdXRNYXJrZXJGcmFtZTogRnJhbWUgPSB0aGlzLmxhdGVzdCgnb3V0TWFya2VyRnJhbWUnKTtcblxuICAgICAgaWYgKGxhdGVzdE91dE1hcmtlckZyYW1lICYmIG5ld0luTWFya2VyRnJhbWUuZnJhbWVOdW1iZXIgPiBsYXRlc3RPdXRNYXJrZXJGcmFtZS5mcmFtZU51bWJlcikge1xuICAgICAgICB0aGlzLmNoYW5nZXNUb0FwcGx5Lm91dE1hcmtlckZyYW1lID0gdGhpcy5uZXdGcmFtZUZyb20obmV3SW5NYXJrZXJGcmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdPdXRNYXJrZXJGcmFtZTogRnJhbWUgPSB0aGlzLmNoYW5nZXNUb0FwcGx5Lm91dE1hcmtlckZyYW1lO1xuXG4gICAgaWYgKG5ld091dE1hcmtlckZyYW1lKSB7XG4gICAgICBjb25zdCBsYXRlc3RJbk1hcmtlckZyYW1lOiBGcmFtZSA9IHRoaXMubGF0ZXN0KCdpbk1hcmtlckZyYW1lJyk7XG5cbiAgICAgIGlmIChsYXRlc3RJbk1hcmtlckZyYW1lICYmIG5ld091dE1hcmtlckZyYW1lLmZyYW1lTnVtYmVyIDwgbGF0ZXN0SW5NYXJrZXJGcmFtZS5mcmFtZU51bWJlcikge1xuICAgICAgICB0aGlzLmNoYW5nZXNUb0FwcGx5LmluTWFya2VyRnJhbWUgPSB0aGlzLm5ld0ZyYW1lRnJvbShuZXdPdXRNYXJrZXJGcmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsYXRlc3Qoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZXNUb0FwcGx5Lmhhc093blByb3BlcnR5KGtleSkgPyAodGhpcy5jaGFuZ2VzVG9BcHBseSBhcyBhbnkpW2tleV0gOiAodGhpcy5zbmFwc2hvdCBhcyBhbnkpW2tleV07XG4gIH1cblxuICBwcml2YXRlIG5ld0ZyYW1lRnJvbShpbnB1dDogbnVtYmVyIHwgRnJhbWUpOiBGcmFtZSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLm5ld0ZyYW1lLnNldEZyb21TZWNvbmRzKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKCFpbnB1dCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubmV3RnJhbWUuc2V0RnJvbUZyYW1lTnVtYmVyKGlucHV0LmZyYW1lTnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBuZXdGcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIG5ldyBGcmFtZSh0aGlzLmxhdGVzdCgnZnJhbWVzUGVyU2Vjb25kJyksIHRoaXMubGF0ZXN0KCdzb3VyY2VCYXNlZE9mZnNldCcpKTtcbiAgfVxufVxuIl19
