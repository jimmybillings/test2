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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TimeDisplayComponent.prototype, "playerState", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimeDisplayComponent.prototype, "request", void 0);
    __decorate([
        core_1.ViewChild('time'),
        __metadata("design:type", core_1.ElementRef)
    ], TimeDisplayComponent.prototype, "timeInput", void 0);
    TimeDisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-time-display',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div [class]=\"containerClass\">\n      <input #time\n        type=\"text\"\n        class=\"current\"\n        title=\"{{ timeInputTitleTranslationKey | translate}}\"\n        [value]=\"currentFrame | async | playerTimecode:playerState\"\n        (click)=\"onTimeInputClick()\"\n        (keydown)=\"onKeyDown($event)\"\n        (keyup)=\"onKeyUp($event)\"\n      />\n\n      <ng-container *ngIf=\"editing\">\n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.APPLY_BTN_TITLE' | translate }}\"\n          [disabled]=\"!canApply\"\n          (click)=\"onApplyButtonClick()\"\n        >\n          <mat-icon>check</mat-icon>\n        </button>\n        \n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CLEAR_BTN_TITLE' | translate }}\"\n          [disabled]=\"isEmpty\"\n          (click)=\"onClearButtonClick()\"\n        >\n          <mat-icon>remove</mat-icon>\n        </button>\n        \n        <button mat-icon-button\n          title=\"{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CANCEL_BTN_TITLE' | translate }}\"\n          (click)=\"onCancelButtonClick()\"\n        >\n          <mat-icon>close</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n\n    <span class=\"timecode divider\">/</span>\n    <span class=\"timecode duration\">{{ durationFrame | playerTimecode:playerState }}</span>\n  "
        })
    ], TimeDisplayComponent);
    return TimeDisplayComponent;
}());
exports.TimeDisplayComponent = TimeDisplayComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdGltZS1kaXNwbGF5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF1SDtBQUd2SCxpRUFBZ0Y7QUFDaEYsd0RBQXVEO0FBaUR2RDtJQS9DQTtRQXVEWSxZQUFPLEdBQ2YsSUFBSSxtQkFBWSxFQUEwQyxDQUFDO1FBSXRELGlCQUFZLEdBQTJCLElBQUksaUNBQWUsQ0FBUSxJQUFJLENBQUMsQ0FBQztRQUV2RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUN0QixxQkFBZ0IsR0FBVyxZQUFZLENBQUM7UUFDeEMsa0NBQTZCLEdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNyRSxpQ0FBNEIsR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzVFLG1DQUE4QixHQUFXLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztJQTJMdEYsQ0FBQztJQWpOVSxzQkFBVyw2Q0FBVzthQXdCL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDO2FBMUJRLFVBQXVCLFFBQXFCO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsb0NBQW9DLEVBQUUsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQXVCRCxzQkFBVyx5Q0FBTzthQUFsQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0NBQWE7YUFBeEI7WUFDRSxN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VztRQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBaE5RO1FBQVIsWUFBSyxFQUFFOzs7MkRBS1A7SUFFUztRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTt5REFDOEI7SUFDMUM7UUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQVksaUJBQVU7MkRBQUM7SUFWOUIsb0JBQW9CO1FBL0NoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLDQyQ0F3Q1Q7U0FDRixDQUFDO09BRVcsb0JBQW9CLENBa05oQztJQUFELDJCQUFDO0NBbE5ELEFBa05DLElBQUE7QUFsTlksb0RBQW9CIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdGltZS1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBsYXllclN0YXRlLCBTZWVrVG9UaW1lU3RyaW5nUmVxdWVzdCwgUGF1c2VSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZyYW1lLCBUaW1lY29kZUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXRpbWUtZGlzcGxheScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cImNvbnRhaW5lckNsYXNzXCI+XG4gICAgICA8aW5wdXQgI3RpbWVcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzcz1cImN1cnJlbnRcIlxuICAgICAgICB0aXRsZT1cInt7IHRpbWVJbnB1dFRpdGxlVHJhbnNsYXRpb25LZXkgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgIFt2YWx1ZV09XCJjdXJyZW50RnJhbWUgfCBhc3luYyB8IHBsYXllclRpbWVjb2RlOnBsYXllclN0YXRlXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uVGltZUlucHV0Q2xpY2soKVwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50KVwiXG4gICAgICAvPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdGluZ1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIHRpdGxlPVwie3sgJ0FTU0VULkFEVl9QTEFZRVIuVElNRV9ESVNQTEFZLkFQUExZX0JUTl9USVRMRScgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCIhY2FuQXBwbHlcIlxuICAgICAgICAgIChjbGljayk9XCJvbkFwcGx5QnV0dG9uQ2xpY2soKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+Y2hlY2s8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgdGl0bGU9XCJ7eyAnQVNTRVQuQURWX1BMQVlFUi5USU1FX0RJU1BMQVkuQ0xFQVJfQlROX1RJVExFJyB8IHRyYW5zbGF0ZSB9fVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImlzRW1wdHlcIlxuICAgICAgICAgIChjbGljayk9XCJvbkNsZWFyQnV0dG9uQ2xpY2soKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+cmVtb3ZlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIFxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIHRpdGxlPVwie3sgJ0FTU0VULkFEVl9QTEFZRVIuVElNRV9ESVNQTEFZLkNBTkNFTF9CVE5fVElUTEUnIHwgdHJhbnNsYXRlIH19XCJcbiAgICAgICAgICAoY2xpY2spPVwib25DYW5jZWxCdXR0b25DbGljaygpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiBjbGFzcz1cInRpbWVjb2RlIGRpdmlkZXJcIj4vPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwidGltZWNvZGUgZHVyYXRpb25cIj57eyBkdXJhdGlvbkZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGUgfX08L3NwYW4+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBUaW1lRGlzcGxheUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgcGxheWVyU3RhdGUobmV3U3RhdGU6IFBsYXllclN0YXRlKSB7XG4gICAgdGhpcy5fcGxheWVyU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB0aGlzLnVwZGF0ZUVkaXRNb2RlKCk7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50RnJhbWUoKTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRseUFwcHJvcHJpYXRlQ2hhcmFjdGVycygpO1xuICB9XG5cbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxTZWVrVG9UaW1lU3RyaW5nUmVxdWVzdCB8IFBhdXNlUmVxdWVzdD4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8U2Vla1RvVGltZVN0cmluZ1JlcXVlc3QgfCBQYXVzZVJlcXVlc3Q+KCk7XG4gIEBWaWV3Q2hpbGQoJ3RpbWUnKSB0aW1lSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLy8gRm9yY2UgY3VycmVudCBmcmFtZSB1cGRhdGVzIHNvIHRoYXQgdGhlIGRpc3BsYXkgZ2V0cyBmb3JtYXR0ZWQgY29ycmVjdGx5IGV2ZW4gaWYgdGhlIHBsYXllciBkaWRuJ3QgbmVlZCB0byBzZWVrLlxuICBwdWJsaWMgY3VycmVudEZyYW1lOiBCZWhhdmlvclN1YmplY3Q8RnJhbWU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGcmFtZT4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfZWRpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZUVkaXRWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIF9wbGF5ZXJTdGF0ZTogUGxheWVyU3RhdGU7XG4gIHByaXZhdGUgY29udHJvbEtleUlzRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGF3YWl0aW5nUGF1c2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSBudW1iZXJDaGFyYWN0ZXJzOiBzdHJpbmcgPSAnMDEyMzQ1Njc4OSc7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZWNvZGVBcHByb3ByaWF0ZUNoYXJhY3RlcnM6IHN0cmluZyA9ICc6OycgKyB0aGlzLm51bWJlckNoYXJhY3RlcnM7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2Vjb25kc0FwcHJvcHJpYXRlQ2hhcmFjdGVyczogc3RyaW5nID0gJy4nICsgdGhpcy5udW1iZXJDaGFyYWN0ZXJzO1xuICBwcml2YXRlIGN1cnJlbnRseUFwcHJvcHJpYXRlQ2hhcmFjdGVyczogc3RyaW5nID0gdGhpcy50aW1lY29kZUFwcHJvcHJpYXRlQ2hhcmFjdGVycztcblxuICBwdWJsaWMgZ2V0IHBsYXllclN0YXRlKCk6IFBsYXllclN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5fcGxheWVyU3RhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVkaXRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRpbmc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGR1cmF0aW9uRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXJTdGF0ZS5kdXJhdGlvbkZyYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCB0aW1lSW5wdXRUaXRsZVRyYW5zbGF0aW9uS2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRpbmcgPyAnJyA6ICdBU1NFVC5BRFZfUExBWUVSLlRJTUVfRElTUExBWS5NQUlOX1RJVExFJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuQXBwbHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFbdGhpcy5wcmVFZGl0VmFsdWUucmVwbGFjZSgvOy9nLCAnOicpLCAnJ10uaW5jbHVkZXModGhpcy5ub3JtYWxpemVkSW5wdXRUaW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9PT0gJyc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbnRhaW5lckNsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRpbmcgPyAnZWRpdGluZycgOiAnJztcbiAgfVxuXG4gIHB1YmxpYyBvblRpbWVJbnB1dENsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5fcGxheWVyU3RhdGUucGxheWluZykge1xuICAgICAgdGhpcy5hd2FpdGluZ1BhdXNlID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1BBVVNFJyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hd2FpdGluZ1BhdXNlID0gZmFsc2U7XG4gICAgICB0aGlzLmVkaXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbG93ZXJjYXNlZEtleTogc3RyaW5nID0gZXZlbnQua2V5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodGhpcy5jb250cm9sS2V5SXNEb3duKSB7XG4gICAgICBzd2l0Y2ggKGxvd2VyY2FzZWRLZXkpIHtcbiAgICAgICAgLy8gQWxsb3cgY29udHJvbC1DLCBjb250cm9sLVYsIGV0Yy4gZm9yIGVkaXRpbmcuXG4gICAgICAgIGNhc2UgJ2EnOiAvLyBzZWxlY3QgYWxsXG4gICAgICAgIGNhc2UgJ2MnOiAvLyBjb3B5XG4gICAgICAgIGNhc2UgJ3YnOiAvLyBwYXN0ZVxuICAgICAgICBjYXNlICd4JzogLy8gY3V0XG4gICAgICAgIGNhc2UgJ3onOiAvLyB1bmRvXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAobG93ZXJjYXNlZEtleSkge1xuICAgICAgLy8gQWxsb3cgZWRpdGluZyBhbmQgY3Vyc29yIHBvc2l0aW9uaW5nIGtleXMuXG4gICAgICBjYXNlICdiYWNrc3BhY2UnOlxuICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgIGNhc2UgJ2Fycm93bGVmdCc6XG4gICAgICBjYXNlICdhcnJvd3JpZ2h0JzpcbiAgICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjYXNlICdjb250cm9sJzogIC8vIFdpbmRvd3MgQ09OVFJPTCBrZXlcbiAgICAgIGNhc2UgJ21ldGEnOiAgICAgLy8gTWFjIENPTU1BTkQga2V5XG4gICAgICAgIHRoaXMuY29udHJvbEtleUlzRG93biA9IHRydWU7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgY2FzZSAnZW50ZXInOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5jYW5BcHBseSkgdGhpcy5hcHBseSgpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNhc2UgJ2VzY2FwZSc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgY2FzZSAnYyc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0FwcHJvcHJpYXRlKGxvd2VyY2FzZWRLZXkpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHVibGljIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlICdjb250cm9sJzogIC8vIFdpbmRvd3MgQ09OVFJPTCBrZXlcbiAgICAgIGNhc2UgJ21ldGEnOiAgICAgLy8gTWFjIENPTU1BTkQga2V5XG4gICAgICAgIHRoaXMuY29udHJvbEtleUlzRG93biA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkFwcGx5QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuQXBwbHkpIHRoaXMuYXBwbHkoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsZWFyQnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsQnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5jYW5jZWwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRWRpdE1vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXdhaXRpbmdQYXVzZSAmJiAhdGhpcy5fcGxheWVyU3RhdGUucGxheWluZykge1xuICAgICAgdGhpcy5hd2FpdGluZ1BhdXNlID0gZmFsc2U7XG4gICAgICB0aGlzLmVkaXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZWRpdGluZykge1xuICAgICAgLy8gQW55IHRpbWUgd2UncmUgZWRpdGluZyBhbmQgdGhlIHBsYXllciBzdGF0ZSBjaGFuZ2VzLCBjYW5jZWwgdGhlIGVkaXQuIChUaGlzIG1vc3QgbGlrZWx5IGhhcHBlbnMgYmVjYXVzZSB0aGUgdXNlciBjbGlja3NcbiAgICAgIC8vIHNvbWUgY29udHJvbCAobGlrZSBwbGF5KSB3aGlsZSBlZGl0aW5nLCBzbyB0aGUgY3VycmVudCBlZGl0IHVzdWFsbHkgYmVjb21lcyBtZWFuaW5nbGVzcy4pXG4gICAgICB0aGlzLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VycmVudEZyYW1lKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEZyYW1lLm5leHQodGhpcy5fcGxheWVyU3RhdGUuY3VycmVudEZyYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VycmVudGx5QXBwcm9wcmlhdGVDaGFyYWN0ZXJzKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudGx5QXBwcm9wcmlhdGVDaGFyYWN0ZXJzID0gdGhpcy5fcGxheWVyU3RhdGUudGltZWNvZGVGb3JtYXQgPT09IFRpbWVjb2RlRm9ybWF0LlNFQ09ORFNcbiAgICAgID8gdGhpcy5zZWNvbmRzQXBwcm9wcmlhdGVDaGFyYWN0ZXJzXG4gICAgICA6IHRoaXMudGltZWNvZGVBcHByb3ByaWF0ZUNoYXJhY3RlcnM7XG4gIH1cblxuICBwcml2YXRlIGdldCBub3JtYWxpemVkSW5wdXRUaW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ2hhcmFjdGVyczogc3RyaW5nW10gPSB2YWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLmZpbHRlcihjaGFyYWN0ZXIgPT4gdGhpcy5pc0FwcHJvcHJpYXRlKGNoYXJhY3RlcikpXG4gICAgICAubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgPT09ICc7JyA/ICc6JyA6IGNoYXJhY3Rlcik7XG5cbiAgICBpZiAodGhpcy5fcGxheWVyU3RhdGUudGltZWNvZGVGb3JtYXQgPT09IFRpbWVjb2RlRm9ybWF0LlNFQ09ORFMgfHwgbm9ybWFsaXplZENoYXJhY3RlcnMuaW5jbHVkZXMoJzonKSkge1xuICAgICAgLy8gVGhlIHVzZXIgaXMgZW50ZXJpbmcgc2Vjb25kcywgc28gd2UgZG9uJ3QgbmVlZCB0byBhZGQgY29sb25zLlxuICAgICAgLy8gT3IgdGhlIHVzZXIgaXMgZW50ZXJpbmcgYSB0aW1lY29kZSwgYW5kIGhhcyBhdCBsZWFzdCBvbmUgY29sb24gaW4gdGhlcmUsIHNvIGRvbid0IG92ZXJyaWRlIGhpcyBlbnRyeS5cbiAgICAgIHJldHVybiBub3JtYWxpemVkQ2hhcmFjdGVycy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0SW5kZXg6IG51bWJlciA9IG5vcm1hbGl6ZWRDaGFyYWN0ZXJzLmxlbmd0aCAtIDE7XG5cbiAgICAvLyBUaGVyZSBhcmUgbm8gY29sb25zIGluIHRoZSB0aW1lY29kZSwgc28gbGV0J3MgYWRkIHNvbWUgZm9yIHRoZSB1c2VyLiAgKCcxMjMnIC0+ICcxOjIzJywgJzEyMzQ1Njc4JyAtPiAnMTI6MzQ6NTY6NzgnKVxuICAgIHJldHVybiBub3JtYWxpemVkQ2hhcmFjdGVyc1xuICAgICAgLnJldmVyc2UoKVxuICAgICAgLm1hcCgoY2hhcmFjdGVyLCBpbmRleCkgPT4gKGluZGV4ICUgMiA9PT0gMCB8fCBpbmRleCA+PSBsYXN0SW5kZXgpID8gY2hhcmFjdGVyIDogYDoke2NoYXJhY3Rlcn1gKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmpvaW4oJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBlZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRpbmcgPSB0cnVlO1xuICAgIHRoaXMucHJlRWRpdFZhbHVlID0gdGhpcy50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHkoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGluZyA9IGZhbHNlO1xuICAgIHRoaXMudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFRUtfVE9fVElNRV9TVFJJTkcnLCB0aW1lOiB0aGlzLm5vcm1hbGl6ZWRJbnB1dFRpbWUgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMudGltZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLnRpbWVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy50aW1lSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy50aW1lSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucHJlRWRpdFZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FwcHJvcHJpYXRlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleS5sZW5ndGggPT09IDEgJiYgdGhpcy5jdXJyZW50bHlBcHByb3ByaWF0ZUNoYXJhY3RlcnMuaW5jbHVkZXMoa2V5KTtcbiAgfVxufVxuIl19
