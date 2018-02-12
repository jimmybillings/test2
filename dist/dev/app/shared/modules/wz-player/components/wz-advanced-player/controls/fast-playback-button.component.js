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
var FastPlaybackButtonComponent = (function () {
    function FastPlaybackButtonComponent() {
        this.direction = 'forward';
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(FastPlaybackButtonComponent.prototype, "iconName", {
        get: function () {
            return this.direction === 'reverse' ? 'fast_rewind' : 'fast_forward';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastPlaybackButtonComponent.prototype, "title", {
        get: function () {
            return "ASSET.ADV_PLAYER." + this.iconName.toUpperCase() + "_BTN_TITLE";
        },
        enumerable: true,
        configurable: true
    });
    FastPlaybackButtonComponent.prototype.canPlayFast = function () {
        var currentSpeed = this.playerState.playbackSpeed;
        return (this.direction === 'reverse' && currentSpeed >= -1) || (this.direction === 'forward' && currentSpeed <= 1);
    };
    FastPlaybackButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'PLAY_AT_SPEED', speed: 4, direction: this.direction });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FastPlaybackButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FastPlaybackButtonComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FastPlaybackButtonComponent.prototype, "request", void 0);
    FastPlaybackButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-fast-playback-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button [disabled]=\"!canPlayFast()\" title=\"{{ title | translate }}\" (click)=\"onClick()\">\n      <mat-icon>{{ iconName }}</mat-icon>\n    </button>\n  "
        })
    ], FastPlaybackButtonComponent);
    return FastPlaybackButtonComponent;
}());
exports.FastPlaybackButtonComponent = FastPlaybackButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvZmFzdC1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBZWhHO0lBWEE7UUFhVyxjQUFTLEdBQXNCLFNBQVMsQ0FBQztRQUN4QyxZQUFPLEdBQXFDLElBQUksbUJBQVksRUFBc0IsQ0FBQztJQW1CL0YsQ0FBQztJQWpCQyxzQkFBVyxpREFBUTthQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFDdkUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4Q0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsZUFBWSxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBRU0saURBQVcsR0FBbEI7UUFDRSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUVwRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNySCxDQUFDO0lBRU0sNkNBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBcEJRO1FBQVIsWUFBSyxFQUFFOztvRUFBMEI7SUFDekI7UUFBUixZQUFLLEVBQUU7O2tFQUEwQztJQUN4QztRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTtnRUFBOEQ7SUFIbEYsMkJBQTJCO1FBWHZDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsb0xBSVQ7U0FDRixDQUFDO09BRVcsMkJBQTJCLENBc0J2QztJQUFELGtDQUFDO0NBdEJELEFBc0JDLElBQUE7QUF0Qlksa0VBQTJCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvZmFzdC1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBsYXllclN0YXRlLCBQbGF5YmFja0RpcmVjdGlvbiwgUGxheUF0U3BlZWRSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otZmFzdC1wbGF5YmFjay1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiIWNhblBsYXlGYXN0KClcIiB0aXRsZT1cInt7IHRpdGxlIHwgdHJhbnNsYXRlIH19XCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IGljb25OYW1lIH19PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIEZhc3RQbGF5YmFja0J1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYXllclN0YXRlOiBQbGF5ZXJTdGF0ZTtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBQbGF5YmFja0RpcmVjdGlvbiA9ICdmb3J3YXJkJztcbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxQbGF5QXRTcGVlZFJlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGF5QXRTcGVlZFJlcXVlc3Q+KCk7XG5cbiAgcHVibGljIGdldCBpY29uTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnID8gJ2Zhc3RfcmV3aW5kJyA6ICdmYXN0X2ZvcndhcmQnO1xuICB9XG5cbiAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgQVNTRVQuQURWX1BMQVlFUi4ke3RoaXMuaWNvbk5hbWUudG9VcHBlckNhc2UoKX1fQlROX1RJVExFYDtcbiAgfVxuXG4gIHB1YmxpYyBjYW5QbGF5RmFzdCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdXJyZW50U3BlZWQgPSB0aGlzLnBsYXllclN0YXRlLnBsYXliYWNrU3BlZWQ7XG5cbiAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAncmV2ZXJzZScgJiYgY3VycmVudFNwZWVkID49IC0xKSB8fCAodGhpcy5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyAmJiBjdXJyZW50U3BlZWQgPD0gMSk7XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3QuZW1pdCh7IHR5cGU6ICdQTEFZX0FUX1NQRUVEJywgc3BlZWQ6IDQsIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24gfSk7XG4gIH1cbn1cbiJdfQ==
