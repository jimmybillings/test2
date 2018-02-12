"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../../../wazee-frame-formatter/index");
var StepButtonComponent = (function () {
    function StepButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(StepButtonComponent.prototype, "size", {
        set: function (size) {
            this.direction = undefined;
            this.title = undefined;
            this.iconClass = undefined;
            if (size.length !== 3)
                return;
            var _a = size.split(''), sign = _a[0], magnitude = _a[1], unit = _a[2];
            if (!sign.match(/^[-+]$/) || !magnitude.match(/^[15]$/) || !unit.match(/^[fs]$/))
                return;
            this.direction = sign === '-' ? 'reverse' : 'forward';
            this.vector = parseInt(magnitude);
            if (sign === '-')
                this.vector *= -1;
            this.unit = unit === 'f' ? 'frame' : 'second';
            this.title = "ASSET.ADV_PLAYER.SKIP_" + magnitude + unit.toUpperCase() + "_" + (sign === '-' ? 'BACK' : 'FORWARD') + "_BTN_TITLE";
            this.iconClass = (magnitude === '5' ? 'five' : 'one') + "-" + this.unit;
            this.calculateBoundary();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepButtonComponent.prototype, "playerState", {
        set: function (newState) {
            this._playerState = newState;
            if (!newState)
                return;
            var needToRecalculate = false;
            if (newState.framesPerSecond !== this.framesPerSecond) {
                this.framesPerSecond = newState.framesPerSecond;
                needToRecalculate = true;
            }
            if (newState.durationFrame) {
                var newDurationFrameNumber = newState.durationFrame.frameNumber;
                if (newDurationFrameNumber !== this.durationFrameNumber) {
                    this.durationFrameNumber = newDurationFrameNumber;
                    needToRecalculate = true;
                }
            }
            if (needToRecalculate)
                this.calculateBoundary();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepButtonComponent.prototype, "canStep", {
        get: function () {
            if (!this._playerState)
                return false;
            var currentFrame = this._playerState.currentFrame;
            if (!currentFrame)
                return false;
            var currentFrameNumber = currentFrame.frameNumber;
            return this.direction === 'reverse'
                ? currentFrameNumber >= this.boundaryFrameNumber
                : currentFrameNumber <= this.boundaryFrameNumber;
        },
        enumerable: true,
        configurable: true
    });
    StepButtonComponent.prototype.onClick = function () {
        if (this.canStep)
            this.request.emit({ type: 'SEEK_TO_FRAME', frame: this.seekTarget });
    };
    StepButtonComponent.prototype.calculateBoundary = function () {
        var magnitude = this.direction === 'reverse' ? -this.vector : this.vector;
        var frame = new index_1.Frame(this.framesPerSecond);
        if (this.unit === 'frame') {
            frame.setFromFrameNumber(magnitude);
        }
        else {
            frame.setFromSeconds(magnitude);
        }
        this.boundaryFrameNumber = this.direction === 'reverse'
            ? frame.frameNumber
            : this.durationFrameNumber - frame.frameNumber;
    };
    Object.defineProperty(StepButtonComponent.prototype, "seekTarget", {
        get: function () {
            var seekTarget = new index_1.Frame(this.framesPerSecond).setFromFrameNumber(this._playerState.currentFrame.frameNumber);
            if (this.unit === 'frame') {
                seekTarget.addFrames(this.vector);
            }
            else {
                seekTarget.setFromSeconds(seekTarget.asSeconds() + this.vector);
            }
            return seekTarget;
        },
        enumerable: true,
        configurable: true
    });
    StepButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-step-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button \n      mat-icon-button \n      [disabled]=\"!canStep\" \n      class=\"mat-icon-button {{ direction }}\" \n      title=\"{{ title | translate }}\" \n      (click)=\"onClick()\">\n      <mat-icon class=\"{{ iconClass }} material-icons\">play_arrow</mat-icon>\n    </button>\n  "
                },] },
    ];
    StepButtonComponent.ctorParameters = function () { return []; };
    StepButtonComponent.propDecorators = {
        'size': [{ type: core_1.Input },],
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return StepButtonComponent;
}());
exports.StepButtonComponent = StepButtonComponent;
//# sourceMappingURL=step-button.component.js.map