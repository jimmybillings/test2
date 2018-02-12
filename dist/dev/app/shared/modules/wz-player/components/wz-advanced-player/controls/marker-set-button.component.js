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
var MarkerSetButtonComponent = (function () {
    function MarkerSetButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(MarkerSetButtonComponent.prototype, "title", {
        get: function () {
            return this.type === 'in' ? 'ASSET.ADV_PLAYER.SET_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SET_OUT_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSetButtonComponent.prototype, "alreadyAtMarker", {
        get: function () {
            return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    MarkerSetButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: this.type });
    };
    Object.defineProperty(MarkerSetButtonComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MarkerSetButtonComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MarkerSetButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MarkerSetButtonComponent.prototype, "request", void 0);
    MarkerSetButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-marker-set-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-button\n      class=\"is-outlined set-marker\"\n      [disabled]=\"alreadyAtMarker\"\n      title=\"{{ title | translate }}\"\n      (click)=\"onClick()\">\n        {{ type }}\n    </button>\n  "
        })
    ], MarkerSetButtonComponent);
    return MarkerSetButtonComponent;
}());
exports.MarkerSetButtonComponent = MarkerSetButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNldC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBb0JoRztJQWZBO1FBa0JZLFlBQU8sR0FBaUQsSUFBSSxtQkFBWSxFQUFrQyxDQUFDO0lBaUJ2SCxDQUFDO0lBZkMsc0JBQVcsMkNBQUs7YUFBaEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQztRQUN6RyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHFEQUFlO2FBQTFCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzdILENBQUM7OztPQUFBO0lBRU0sMENBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsc0JBQVksMkNBQUs7YUFBakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUMvRixDQUFDOzs7T0FBQTtJQWxCUTtRQUFSLFlBQUssRUFBRTs7MERBQWtCO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOztpRUFBMEI7SUFDeEI7UUFBVCxhQUFNLEVBQUU7a0NBQVUsbUJBQVk7NkRBQXNGO0lBSDFHLHdCQUF3QjtRQWZwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLHNOQVFUO1NBQ0YsQ0FBQztPQUVXLHdCQUF3QixDQW9CcEM7SUFBRCwrQkFBQztDQXBCRCxBQW9CQyxJQUFBO0FBcEJZLDREQUF3QiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlci1zZXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBNYXJrZXJUeXBlLCBQbGF5ZXJTdGF0ZSwgU2V0TWFya2VyVG9DdXJyZW50RnJhbWVSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otbWFya2VyLXNldC1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIG1hdC1idXR0b25cbiAgICAgIGNsYXNzPVwiaXMtb3V0bGluZWQgc2V0LW1hcmtlclwiXG4gICAgICBbZGlzYWJsZWRdPVwiYWxyZWFkeUF0TWFya2VyXCJcbiAgICAgIHRpdGxlPVwie3sgdGl0bGUgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgICB7eyB0eXBlIH19XG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNYXJrZXJTZXRCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSB0eXBlOiBNYXJrZXJUeXBlO1xuICBASW5wdXQoKSBwbGF5ZXJTdGF0ZTogUGxheWVyU3RhdGU7XG4gIEBPdXRwdXQoKSByZXF1ZXN0OiBFdmVudEVtaXR0ZXI8U2V0TWFya2VyVG9DdXJyZW50RnJhbWVSZXF1ZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2V0TWFya2VyVG9DdXJyZW50RnJhbWVSZXF1ZXN0PigpO1xuXG4gIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSAnaW4nID8gJ0FTU0VULkFEVl9QTEFZRVIuU0VUX0lOX0JUTl9USVRMRScgOiAnQVNTRVQuQURWX1BMQVlFUi5TRVRfT1VUX0JUTl9USVRMRSc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFscmVhZHlBdE1hcmtlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZSAmJiB0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZSAmJiB0aGlzLmZyYW1lLmZyYW1lTnVtYmVyID09PSB0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZS5mcmFtZU51bWJlcjtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFVF9NQVJLRVJfVE9fQ1VSUkVOVF9GUkFNRScsIG1hcmtlclR5cGU6IHRoaXMudHlwZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZyYW1lKCk6IEZyYW1lIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSAnaW4nID8gdGhpcy5wbGF5ZXJTdGF0ZS5pbk1hcmtlckZyYW1lIDogdGhpcy5wbGF5ZXJTdGF0ZS5vdXRNYXJrZXJGcmFtZTtcbiAgfVxufVxuIl19
