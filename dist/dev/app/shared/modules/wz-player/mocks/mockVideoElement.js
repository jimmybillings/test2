"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockVideoElement = (function () {
    function MockVideoElement(autoplay) {
        this.paused = false;
        this.ended = false;
        this._currentTime = 0;
        this._duration = 0;
        this._playbackRate = 1;
        this.seekingTo = null;
        this._volume = 1;
        this._muted = false;
        this.eventCallbacks = {
            durationchange: new Array(),
            ended: new Array(),
            pause: new Array(),
            playing: new Array(),
            ratechange: new Array(),
            timeupdate: new Array(),
            seeked: new Array(),
            seeking: new Array(),
            volumechange: new Array()
        };
        this.paused = !autoplay;
    }
    MockVideoElement.prototype.play = function () {
        if (!this.paused)
            return;
        this.paused = false;
        this.ended = false;
        this.trigger('playing');
    };
    MockVideoElement.prototype.pause = function () {
        if (this.paused)
            return;
        this.paused = true;
        this.trigger('pause');
    };
    Object.defineProperty(MockVideoElement.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockVideoElement.prototype, "currentTime", {
        get: function () {
            return this._currentTime;
        },
        set: function (newTime) {
            this.seekingTo = newTime;
            this.trigger('seeking');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockVideoElement.prototype, "playbackRate", {
        get: function () {
            return this._playbackRate;
        },
        set: function (newRate) {
            this._playbackRate = newRate;
            this.trigger('ratechange');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockVideoElement.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (newVolume) {
            this._volume = newVolume;
            this.trigger('volumechange');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockVideoElement.prototype, "muted", {
        get: function () {
            return this._muted;
        },
        set: function (newValue) {
            this._muted = newValue;
            this.trigger('volumechange');
        },
        enumerable: true,
        configurable: true
    });
    MockVideoElement.prototype.simulateDurationChangeTo = function (newDuration) {
        this._duration = newDuration;
        this.trigger('durationchange');
    };
    MockVideoElement.prototype.simulateTimeChangeTo = function (newTime) {
        this._currentTime = newTime;
        this.trigger('timeupdate');
    };
    MockVideoElement.prototype.simulateSeekCompletion = function () {
        if (!this.seekingTo)
            throw new Error('Tried to simulate seek completion, but not currently seeking!');
        this._currentTime = this.seekingTo;
        this.seekingTo = null;
        this.trigger('seeked');
        this.trigger('timeupdate');
    };
    MockVideoElement.prototype.simulatePlaybackEnded = function () {
        this.paused = true;
        this.ended = true;
        this.trigger('ended');
        this.trigger('pause');
    };
    Object.defineProperty(MockVideoElement.prototype, "numberOfDefinedEventCallbacks", {
        get: function () {
            var _this = this;
            return Object.keys(this.eventCallbacks)
                .map(function (eventName) { return _this.eventCallbacks[eventName].length; })
                .reduce(function (a, b) { return a + b; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    MockVideoElement.prototype.on = function (eventName, callback) {
        this.eventCallbacks[eventName].push(callback);
        return this;
    };
    MockVideoElement.prototype.off = function (eventName) {
        this.eventCallbacks[eventName] = [];
        return this;
    };
    MockVideoElement.prototype.trigger = function (eventName) {
        this.eventCallbacks[eventName].forEach(function (callback) { return callback(); });
        return this;
    };
    return MockVideoElement;
}());
exports.MockVideoElement = MockVideoElement;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvbW9ja3MvbW9ja1ZpZGVvRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BO0lBdUJFLDBCQUFZLFFBQWlCO1FBdEJ0QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFFdEIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV4QixtQkFBYyxHQUF1QjtZQUMzQyxjQUFjLEVBQUUsSUFBSSxLQUFLLEVBQVk7WUFDckMsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFZO1lBQzVCLEtBQUssRUFBRSxJQUFJLEtBQUssRUFBWTtZQUM1QixPQUFPLEVBQUUsSUFBSSxLQUFLLEVBQVk7WUFDOUIsVUFBVSxFQUFFLElBQUksS0FBSyxFQUFZO1lBQ2pDLFVBQVUsRUFBRSxJQUFJLEtBQUssRUFBWTtZQUNqQyxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQVk7WUFDN0IsT0FBTyxFQUFFLElBQUksS0FBSyxFQUFZO1lBQzlCLFlBQVksRUFBRSxJQUFJLEtBQUssRUFBWTtTQUNwQyxDQUFDO1FBR0EsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBRU0sK0JBQUksR0FBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUV6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7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QUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFyQyxDQUFxQyxDQUFDO2lCQUN2RCxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFTSw2QkFBRSxHQUFULFVBQVUsU0FBNkIsRUFBRSxRQUFrQjtRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLDhCQUFHLEdBQVYsVUFBVyxTQUE2QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLGtDQUFPLEdBQWQsVUFBZSxTQUE2QjtRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FoSUEsQUFnSUMsSUFBQTtBQWhJWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9tb2Nrcy9tb2NrVmlkZW9FbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIE1vY2tWaWRlb0NhbGxiYWNrcyB7XG4gIFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IEZ1bmN0aW9uW107XG59XG5cbmV4cG9ydCB0eXBlIE1vY2tWaWRlb0V2ZW50TmFtZSA9XG4gICdkdXJhdGlvbmNoYW5nZScgfCAnZW5kZWQnIHwgJ3BhdXNlJyB8ICdwbGF5aW5nJyB8ICdyYXRlY2hhbmdlJyB8ICd0aW1ldXBkYXRlJyB8ICdzZWVrZWQnIHwgJ3NlZWtpbmcnIHwgJ3ZvbHVtZWNoYW5nZSc7XG5cbmV4cG9ydCBjbGFzcyBNb2NrVmlkZW9FbGVtZW50IHtcbiAgcHVibGljIHBhdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIG9uY29udGV4dG1lbnU6IEZ1bmN0aW9uO1xuICBwcml2YXRlIF9jdXJyZW50VGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZHVyYXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3BsYXliYWNrUmF0ZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBzZWVraW5nVG86IG51bWJlciA9IG51bGw7XG4gIHByaXZhdGUgX3ZvbHVtZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfbXV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGV2ZW50Q2FsbGJhY2tzOiBNb2NrVmlkZW9DYWxsYmFja3MgPSB7XG4gICAgZHVyYXRpb25jaGFuZ2U6IG5ldyBBcnJheTxGdW5jdGlvbj4oKSxcbiAgICBlbmRlZDogbmV3IEFycmF5PEZ1bmN0aW9uPigpLFxuICAgIHBhdXNlOiBuZXcgQXJyYXk8RnVuY3Rpb24+KCksXG4gICAgcGxheWluZzogbmV3IEFycmF5PEZ1bmN0aW9uPigpLFxuICAgIHJhdGVjaGFuZ2U6IG5ldyBBcnJheTxGdW5jdGlvbj4oKSxcbiAgICB0aW1ldXBkYXRlOiBuZXcgQXJyYXk8RnVuY3Rpb24+KCksXG4gICAgc2Vla2VkOiBuZXcgQXJyYXk8RnVuY3Rpb24+KCksXG4gICAgc2Vla2luZzogbmV3IEFycmF5PEZ1bmN0aW9uPigpLFxuICAgIHZvbHVtZWNoYW5nZTogbmV3IEFycmF5PEZ1bmN0aW9uPigpXG4gIH07XG5cbiAgY29uc3RydWN0b3IoYXV0b3BsYXk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnBhdXNlZCA9ICFhdXRvcGxheTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wYXVzZWQpIHJldHVybjtcblxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlcigncGxheWluZycpO1xuICB9XG5cbiAgcHVibGljIHBhdXNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcigncGF1c2UnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHNldCBjdXJyZW50VGltZShuZXdUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnNlZWtpbmdUbyA9IG5ld1RpbWU7XG4gICAgdGhpcy50cmlnZ2VyKCdzZWVraW5nJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGxheWJhY2tSYXRlKG5ld1JhdGU6IG51bWJlcikge1xuICAgIHRoaXMuX3BsYXliYWNrUmF0ZSA9IG5ld1JhdGU7XG4gICAgdGhpcy50cmlnZ2VyKCdyYXRlY2hhbmdlJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBsYXliYWNrUmF0ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wbGF5YmFja1JhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZvbHVtZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHZvbHVtZShuZXdWb2x1bWU6IG51bWJlcikge1xuICAgIHRoaXMuX3ZvbHVtZSA9IG5ld1ZvbHVtZTtcbiAgICB0aGlzLnRyaWdnZXIoJ3ZvbHVtZWNoYW5nZScpO1xuICB9XG5cbiAgcHVibGljIGdldCBtdXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXV0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IG11dGVkKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXV0ZWQgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnRyaWdnZXIoJ3ZvbHVtZWNoYW5nZScpO1xuICB9XG5cbiAgcHVibGljIHNpbXVsYXRlRHVyYXRpb25DaGFuZ2VUbyhuZXdEdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fZHVyYXRpb24gPSBuZXdEdXJhdGlvbjtcbiAgICB0aGlzLnRyaWdnZXIoJ2R1cmF0aW9uY2hhbmdlJyk7XG4gIH1cblxuICBwdWJsaWMgc2ltdWxhdGVUaW1lQ2hhbmdlVG8obmV3VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSBuZXdUaW1lO1xuICAgIHRoaXMudHJpZ2dlcigndGltZXVwZGF0ZScpO1xuICB9XG5cbiAgcHVibGljIHNpbXVsYXRlU2Vla0NvbXBsZXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLnNlZWtpbmdUbykgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBzaW11bGF0ZSBzZWVrIGNvbXBsZXRpb24sIGJ1dCBub3QgY3VycmVudGx5IHNlZWtpbmchJyk7XG5cbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IHRoaXMuc2Vla2luZ1RvO1xuICAgIHRoaXMuc2Vla2luZ1RvID0gbnVsbDtcbiAgICB0aGlzLnRyaWdnZXIoJ3NlZWtlZCcpO1xuICAgIHRoaXMudHJpZ2dlcigndGltZXVwZGF0ZScpO1xuICB9XG5cbiAgcHVibGljIHNpbXVsYXRlUGxheWJhY2tFbmRlZCgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKCdlbmRlZCcpO1xuICAgIHRoaXMudHJpZ2dlcigncGF1c2UnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbnVtYmVyT2ZEZWZpbmVkRXZlbnRDYWxsYmFja3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5ldmVudENhbGxiYWNrcylcbiAgICAgIC5tYXAoZXZlbnROYW1lID0+IHRoaXMuZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXS5sZW5ndGgpXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gIH1cblxuICBwdWJsaWMgb24oZXZlbnROYW1lOiBNb2NrVmlkZW9FdmVudE5hbWUsIGNhbGxiYWNrOiBGdW5jdGlvbik6IE1vY2tWaWRlb0VsZW1lbnQge1xuICAgIHRoaXMuZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBvZmYoZXZlbnROYW1lOiBNb2NrVmlkZW9FdmVudE5hbWUpOiBNb2NrVmlkZW9FbGVtZW50IHtcbiAgICB0aGlzLmV2ZW50Q2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyKGV2ZW50TmFtZTogTW9ja1ZpZGVvRXZlbnROYW1lKTogTW9ja1ZpZGVvRWxlbWVudCB7XG4gICAgdGhpcy5ldmVudENhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goKGNhbGxiYWNrOiBGdW5jdGlvbikgPT4gY2FsbGJhY2soKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==
