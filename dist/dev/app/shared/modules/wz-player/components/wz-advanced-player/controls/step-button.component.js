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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StepButtonComponent.prototype, "size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StepButtonComponent.prototype, "playerState", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StepButtonComponent.prototype, "request", void 0);
    StepButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-step-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button \n      mat-icon-button \n      [disabled]=\"!canStep\" \n      class=\"mat-icon-button {{ direction }}\" \n      title=\"{{ title | translate }}\" \n      (click)=\"onClick()\">\n      <mat-icon class=\"{{ iconClass }} material-icons\">play_arrow</mat-icon>\n    </button>\n  "
        })
    ], StepButtonComponent);
    return StepButtonComponent;
}());
exports.StepButtonComponent = StepButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvc3RlcC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBRWhHLGlFQUFnRTtBQXFCaEU7SUFoQkE7UUE4RFksWUFBTyxHQUFxQyxJQUFJLG1CQUFZLEVBQXNCLENBQUM7SUF3RC9GLENBQUM7SUFwR0Msc0JBQVcscUNBQUk7YUFBZixVQUFnQixJQUFjO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUV4QixJQUFBLG1CQUF3QyxFQUF2QyxZQUFJLEVBQUUsaUJBQVMsRUFBRSxZQUFJLENBQW1CO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUV6RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUM7Z0JBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsMkJBQXlCLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLGdCQUFZLENBQUM7WUFDdEgsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFHLFNBQVMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFJLElBQUksQ0FBQyxJQUFNLENBQUM7WUFFdEUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyw0Q0FBVzthQUF0QixVQUF1QixRQUFxQjtZQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFdEIsSUFBSSxpQkFBaUIsR0FBWSxLQUFLLENBQUM7WUFFdkMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO2dCQUNoRCxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFNLHNCQUFzQixHQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO2dCQUUxRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsS0FBSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsc0JBQXNCLENBQUM7b0JBQ2xELGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQWVELHNCQUFXLHdDQUFPO2FBQWxCO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFFckMsSUFBTSxZQUFZLEdBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUVoQyxJQUFNLGtCQUFrQixHQUFXLFlBQVksQ0FBQyxXQUFXLENBQUM7WUFFNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUztnQkFDakMsQ0FBQyxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ2hELENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFFTSxxQ0FBTyxHQUFkO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVPLCtDQUFpQixHQUF6QjtRQUNFLElBQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEYsSUFBTSxLQUFLLEdBQVUsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUztZQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVc7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBWSwyQ0FBVTthQUF0QjtZQUNFLElBQU0sVUFBVSxHQUFVLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV6SCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUVELE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFuR0Q7UUFEQyxZQUFLLEVBQUU7OzttREFtQlA7SUFHRDtRQURDLFlBQUssRUFBRTs7OzBEQXNCUDtJQUVTO1FBQVQsYUFBTSxFQUFFO2tDQUFVLG1CQUFZO3dEQUE4RDtJQTlDbEYsbUJBQW1CO1FBaEIvQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLHFTQVNUO1NBQ0YsQ0FBQztPQUVXLG1CQUFtQixDQXNHL0I7SUFBRCwwQkFBQztDQXRHRCxBQXNHQyxJQUFBO0FBdEdZLGtEQUFtQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3N0ZXAtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBQbGF5ZXJTdGF0ZSwgU2Vla1RvRnJhbWVSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IHR5cGUgU3RlcFNpemUgPSAnLTVzJyB8ICctMXMnIHwgJy0xZicgfCAnKzFmJyB8ICcrMXMnIHwgJys1cyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXN0ZXAtYnV0dG9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiBcbiAgICAgIG1hdC1pY29uLWJ1dHRvbiBcbiAgICAgIFtkaXNhYmxlZF09XCIhY2FuU3RlcFwiIFxuICAgICAgY2xhc3M9XCJtYXQtaWNvbi1idXR0b24ge3sgZGlyZWN0aW9uIH19XCIgXG4gICAgICB0aXRsZT1cInt7IHRpdGxlIHwgdHJhbnNsYXRlIH19XCIgXG4gICAgICAoY2xpY2spPVwib25DbGljaygpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJ7eyBpY29uQ2xhc3MgfX0gbWF0ZXJpYWwtaWNvbnNcIj5wbGF5X2Fycm93PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFN0ZXBCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNpemUoc2l6ZTogU3RlcFNpemUpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNpemUubGVuZ3RoICE9PSAzKSByZXR1cm47XG5cbiAgICBjb25zdCBbc2lnbiwgbWFnbml0dWRlLCB1bml0XSA9IHNpemUuc3BsaXQoJycpO1xuICAgIGlmICghc2lnbi5tYXRjaCgvXlstK10kLykgfHwgIW1hZ25pdHVkZS5tYXRjaCgvXlsxNV0kLykgfHwgIXVuaXQubWF0Y2goL15bZnNdJC8pKSByZXR1cm47XG5cbiAgICB0aGlzLmRpcmVjdGlvbiA9IHNpZ24gPT09ICctJyA/ICdyZXZlcnNlJyA6ICdmb3J3YXJkJztcbiAgICB0aGlzLnZlY3RvciA9IHBhcnNlSW50KG1hZ25pdHVkZSk7XG4gICAgaWYgKHNpZ24gPT09ICctJykgdGhpcy52ZWN0b3IgKj0gLTE7XG4gICAgdGhpcy51bml0ID0gdW5pdCA9PT0gJ2YnID8gJ2ZyYW1lJyA6ICdzZWNvbmQnO1xuICAgIHRoaXMudGl0bGUgPSBgQVNTRVQuQURWX1BMQVlFUi5TS0lQXyR7bWFnbml0dWRlfSR7dW5pdC50b1VwcGVyQ2FzZSgpfV8ke3NpZ24gPT09ICctJyA/ICdCQUNLJyA6ICdGT1JXQVJEJ31fQlROX1RJVExFYDtcbiAgICB0aGlzLmljb25DbGFzcyA9IGAke21hZ25pdHVkZSA9PT0gJzUnID8gJ2ZpdmUnIDogJ29uZSd9LSR7dGhpcy51bml0fWA7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kYXJ5KCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBsYXllclN0YXRlKG5ld1N0YXRlOiBQbGF5ZXJTdGF0ZSkge1xuICAgIHRoaXMuX3BsYXllclN0YXRlID0gbmV3U3RhdGU7XG4gICAgaWYgKCFuZXdTdGF0ZSkgcmV0dXJuO1xuXG4gICAgbGV0IG5lZWRUb1JlY2FsY3VsYXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAobmV3U3RhdGUuZnJhbWVzUGVyU2Vjb25kICE9PSB0aGlzLmZyYW1lc1BlclNlY29uZCkge1xuICAgICAgdGhpcy5mcmFtZXNQZXJTZWNvbmQgPSBuZXdTdGF0ZS5mcmFtZXNQZXJTZWNvbmQ7XG4gICAgICBuZWVkVG9SZWNhbGN1bGF0ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlLmR1cmF0aW9uRnJhbWUpIHtcbiAgICAgIGNvbnN0IG5ld0R1cmF0aW9uRnJhbWVOdW1iZXI6IG51bWJlciA9IG5ld1N0YXRlLmR1cmF0aW9uRnJhbWUuZnJhbWVOdW1iZXI7XG5cbiAgICAgIGlmIChuZXdEdXJhdGlvbkZyYW1lTnVtYmVyICE9PSB0aGlzLmR1cmF0aW9uRnJhbWVOdW1iZXIpIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbkZyYW1lTnVtYmVyID0gbmV3RHVyYXRpb25GcmFtZU51bWJlcjtcbiAgICAgICAgbmVlZFRvUmVjYWxjdWxhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZWVkVG9SZWNhbGN1bGF0ZSkgdGhpcy5jYWxjdWxhdGVCb3VuZGFyeSgpO1xuICB9XG5cbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxTZWVrVG9GcmFtZVJlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWVrVG9GcmFtZVJlcXVlc3Q+KCk7XG5cbiAgcHVibGljIGRpcmVjdGlvbjogJ3JldmVyc2UnIHwgJ2ZvcndhcmQnO1xuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgcHVibGljIGljb25DbGFzczogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3BsYXllclN0YXRlOiBQbGF5ZXJTdGF0ZTtcbiAgcHJpdmF0ZSB2ZWN0b3I6IG51bWJlcjtcbiAgcHJpdmF0ZSB1bml0OiAnZnJhbWUnIHwgJ3NlY29uZCc7XG4gIHByaXZhdGUgZnJhbWVzUGVyU2Vjb25kOiBudW1iZXI7XG4gIHByaXZhdGUgZHVyYXRpb25GcmFtZU51bWJlcjogbnVtYmVyO1xuICBwcml2YXRlIGJvdW5kYXJ5RnJhbWVOdW1iZXI6IG51bWJlcjtcblxuICBwdWJsaWMgZ2V0IGNhblN0ZXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9wbGF5ZXJTdGF0ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY3VycmVudEZyYW1lOiBGcmFtZSA9IHRoaXMuX3BsYXllclN0YXRlLmN1cnJlbnRGcmFtZTtcbiAgICBpZiAoIWN1cnJlbnRGcmFtZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY3VycmVudEZyYW1lTnVtYmVyOiBudW1iZXIgPSBjdXJyZW50RnJhbWUuZnJhbWVOdW1iZXI7XG5cbiAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09ICdyZXZlcnNlJ1xuICAgICAgPyBjdXJyZW50RnJhbWVOdW1iZXIgPj0gdGhpcy5ib3VuZGFyeUZyYW1lTnVtYmVyXG4gICAgICA6IGN1cnJlbnRGcmFtZU51bWJlciA8PSB0aGlzLmJvdW5kYXJ5RnJhbWVOdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5TdGVwKSB0aGlzLnJlcXVlc3QuZW1pdCh7IHR5cGU6ICdTRUVLX1RPX0ZSQU1FJywgZnJhbWU6IHRoaXMuc2Vla1RhcmdldCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQm91bmRhcnkoKTogdm9pZCB7XG4gICAgY29uc3QgbWFnbml0dWRlOiBudW1iZXIgPSB0aGlzLmRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnID8gLXRoaXMudmVjdG9yIDogdGhpcy52ZWN0b3I7XG4gICAgY29uc3QgZnJhbWU6IEZyYW1lID0gbmV3IEZyYW1lKHRoaXMuZnJhbWVzUGVyU2Vjb25kKTtcblxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdmcmFtZScpIHtcbiAgICAgIGZyYW1lLnNldEZyb21GcmFtZU51bWJlcihtYWduaXR1ZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFtZS5zZXRGcm9tU2Vjb25kcyhtYWduaXR1ZGUpO1xuICAgIH1cblxuICAgIHRoaXMuYm91bmRhcnlGcmFtZU51bWJlciA9IHRoaXMuZGlyZWN0aW9uID09PSAncmV2ZXJzZSdcbiAgICAgID8gZnJhbWUuZnJhbWVOdW1iZXJcbiAgICAgIDogdGhpcy5kdXJhdGlvbkZyYW1lTnVtYmVyIC0gZnJhbWUuZnJhbWVOdW1iZXI7XG4gIH1cblxuICBwcml2YXRlIGdldCBzZWVrVGFyZ2V0KCk6IEZyYW1lIHtcbiAgICBjb25zdCBzZWVrVGFyZ2V0OiBGcmFtZSA9IG5ldyBGcmFtZSh0aGlzLmZyYW1lc1BlclNlY29uZCkuc2V0RnJvbUZyYW1lTnVtYmVyKHRoaXMuX3BsYXllclN0YXRlLmN1cnJlbnRGcmFtZS5mcmFtZU51bWJlcik7XG5cbiAgICBpZiAodGhpcy51bml0ID09PSAnZnJhbWUnKSB7XG4gICAgICBzZWVrVGFyZ2V0LmFkZEZyYW1lcyh0aGlzLnZlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZWtUYXJnZXQuc2V0RnJvbVNlY29uZHMoc2Vla1RhcmdldC5hc1NlY29uZHMoKSArIHRoaXMudmVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2Vla1RhcmdldDtcbiAgfVxufVxuIl19
