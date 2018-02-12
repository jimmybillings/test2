"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../../../wazee-frame-formatter/index");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var TimeDisplayComponent = (function () {
    function TimeDisplayComponent() {
        this.request = new core_1.EventEmitter();
        this.currentFrame = new BehaviorSubject_1.BehaviorSubject(null);
        this._editing = false;
        this.controlKeyIsDown = false;
        this.awaitingPause = false;
        this.numberCharacters = '0123456789';
        this.timecodeAppropriateCharacters = ':;' + this.numberCharacters;
        this.secondsAppropriateCharacters = '.' + this.numberCharacters;
        this.currentlyAppropriateCharacters = this.timecodeAppropriateCharacters;
    }
    Object.defineProperty(TimeDisplayComponent.prototype, "playerState", {
        get: function () {
            return this._playerState;
        },
        set: function (newState) {
            this._playerState = newState;
            this.updateEditMode();
            this.updateCurrentFrame();
            this.updateCurrentlyAppropriateCharacters();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "editing", {
        get: function () {
            return this._editing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "durationFrame", {
        get: function () {
            return this._playerState.durationFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "timeInputTitleTranslationKey", {
        get: function () {
            return this._editing ? '' : 'ASSET.ADV_PLAYER.TIME_DISPLAY.MAIN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "canApply", {
        get: function () {
            return ![this.preEditValue.replace(/;/g, ':'), ''].includes(this.normalizedInputTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "isEmpty", {
        get: function () {
            return this.timeInput.nativeElement.value === '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeDisplayComponent.prototype, "containerClass", {
        get: function () {
            return this._editing ? 'editing' : '';
        },
        enumerable: true,
        configurable: true
    });
    TimeDisplayComponent.prototype.onTimeInputClick = function () {
        if (this._editing)
            return;
        if (this._playerState.playing) {
            this.awaitingPause = true;
            this.request.emit({ type: 'PAUSE' });
        }
        else {
            this.awaitingPause = false;
            this.edit();
        }
    };
    TimeDisplayComponent.prototype.onKeyDown = function (event) {
        var lowercasedKey = event.key.toLowerCase();
        if (this.controlKeyIsDown) {
            switch (lowercasedKey) {
                case 'a':
                case 'c':
                case 'v':
                case 'x':
                case 'z':
                    return;
            }
            event.preventDefault();
            return;
        }
        switch (lowercasedKey) {
            case 'backspace':
            case 'delete':
            case 'arrowleft':
            case 'arrowright':
            case 'home':
            case 'end':
                return;
            case 'control':
            case 'meta':
                this.controlKeyIsDown = true;
                return;
            case 'enter':
                event.preventDefault();
                if (this.canApply)
                    this.apply();
                return;
            case 'escape':
                event.preventDefault();
                this.cancel();
                return;
            case 'c':
                event.preventDefault();
                this.clear();
                return;
        }
        if (!this.isAppropriate(lowercasedKey))
            event.preventDefault();
    };
    TimeDisplayComponent.prototype.onKeyUp = function (event) {
        switch (event.key.toLowerCase()) {
            case 'control':
            case 'meta':
                this.controlKeyIsDown = false;
        }
    };
    TimeDisplayComponent.prototype.onApplyButtonClick = function () {
        if (this.canApply)
            this.apply();
    };
    TimeDisplayComponent.prototype.onClearButtonClick = function () {
        this.clear();
    };
    TimeDisplayComponent.prototype.onCancelButtonClick = function () {
        this.cancel();
    };
    TimeDisplayComponent.prototype.updateEditMode = function () {
        if (this.awaitingPause && !this._playerState.playing) {
            this.awaitingPause = false;
            this.edit();
            return;
        }
        if (this._editing) {
            this.cancel();
        }
    };
    TimeDisplayComponent.prototype.updateCurrentFrame = function () {
        this.currentFrame.next(this._playerState.currentFrame);
    };
    TimeDisplayComponent.prototype.updateCurrentlyAppropriateCharacters = function () {
        this.currentlyAppropriateCharacters = this._playerState.timecodeFormat === index_1.TimecodeFormat.SECONDS
            ? this.secondsAppropriateCharacters
            : this.timecodeAppropriateCharacters;
    };
    Object.defineProperty(TimeDisplayComponent.prototype, "normalizedInputTime", {
        get: function () {
            var _this = this;
            var value = this.timeInput.nativeElement.value;
            var normalizedCharacters = value
                .split('')
                .filter(function (character) { return _this.isAppropriate(character); })
                .map(function (character) { return character === ';' ? ':' : character; });
            if (this._playerState.timecodeFormat === index_1.TimecodeFormat.SECONDS || normalizedCharacters.includes(':')) {
                return normalizedCharacters.join('');
            }
            var lastIndex = normalizedCharacters.length - 1;
            return normalizedCharacters
                .reverse()
                .map(function (character, index) { return (index % 2 === 0 || index >= lastIndex) ? character : ":" + character; })
                .reverse()
                .join('');
        },
        enumerable: true,
        configurable: true
    });
    TimeDisplayComponent.prototype.edit = function () {
        this._editing = true;
        this.preEditValue = this.timeInput.nativeElement.value;
    };
    TimeDisplayComponent.prototype.apply = function () {
        this._editing = false;
        this.timeInput.nativeElement.blur();
        this.request.emit({ type: 'SEEK_TO_TIME_STRING', time: this.normalizedInputTime });
    };
    TimeDisplayComponent.prototype.clear = function () {
        this.timeInput.nativeElement.focus();
        this.timeInput.nativeElement.value = '';
    };
    TimeDisplayComponent.prototype.cancel = function () {
        this._editing = false;
        this.timeInput.nativeElement.blur();
        this.timeInput.nativeElement.value = this.preEditValue;
    };
    TimeDisplayComponent.prototype.isAppropriate = function (key) {
        return key.length === 1 && this.currentlyAppropriateCharacters.includes(key);
    };
    TimeDisplayComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-time-display',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div [class]=\"containerClass\">\n      <input #time\n        type=\"text\"\n        class=\"current\"\n        title=\"{{ timeInputTitleTranslationKey | translate}}\"\n        [value]=\"currentFrame | async | playerTimecode:playerState\"\n        (click)=\"onTimeInputClick()\"\n        (keydown)=\"onKeyDown($event)\"\n        (keyup)=\"onKeyUp($event)\"\n      />\n\n      <ng-container *ngIf=\"editing\">\n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.APPLY_BTN_TITLE' | translate }}\"\n          [disabled]=\"!canApply\"\n          (click)=\"onApplyButtonClick()\"\n        >\n          <mat-icon>check</mat-icon>\n        </button>\n        \n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CLEAR_BTN_TITLE' | translate }}\"\n          [disabled]=\"isEmpty\"\n          (click)=\"onClearButtonClick()\"\n        >\n          <mat-icon>remove</mat-icon>\n        </button>\n        \n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CANCEL_BTN_TITLE' | translate }}\"\n          (click)=\"onCancelButtonClick()\"\n        >\n          <mat-icon>close</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n\n    <span class=\"timecode divider\">/</span>\n    <span class=\"timecode duration\">{{ durationFrame | playerTimecode:playerState }}</span>\n  "
                },] },
    ];
    TimeDisplayComponent.ctorParameters = function () { return []; };
    TimeDisplayComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
        'timeInput': [{ type: core_1.ViewChild, args: ['time',] },],
    };
    return TimeDisplayComponent;
}());
exports.TimeDisplayComponent = TimeDisplayComponent;
//# sourceMappingURL=time-display.component.js.map