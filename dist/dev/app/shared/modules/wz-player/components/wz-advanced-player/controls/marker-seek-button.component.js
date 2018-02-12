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
var MarkerSeekButtonComponent = (function () {
    function MarkerSeekButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "alreadyAtMarker", {
        get: function () {
            return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "class", {
        get: function () {
            return "seek-" + this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "title", {
        get: function () {
            return this.type === 'in' ? 'ASSET.ADV_PLAYER.SEEK_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SEEK_OUT_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    MarkerSeekButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'SEEK_TO_MARKER', markerType: this.type });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MarkerSeekButtonComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MarkerSeekButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MarkerSeekButtonComponent.prototype, "request", void 0);
    MarkerSeekButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-marker-seek-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button\n      [disabled]=\"!frame || alreadyAtMarker\" \n      class=\"mat-icon-button {{ class }}\" \n      title=\"{{ title | translate }}\" \n      (click)=\"onClick()\">\n        <mat-icon>keyboard_tab</mat-icon>\n    </button>\n  "
        })
    ], MarkerSeekButtonComponent);
    return MarkerSeekButtonComponent;
}());
exports.MarkerSeekButtonComponent = MarkerSeekButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNlZWstYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQW9CaEc7SUFmQTtRQWtCWSxZQUFPLEdBQXNDLElBQUksbUJBQVksRUFBdUIsQ0FBQztJQXFCakcsQ0FBQztJQW5CQyxzQkFBVyw0Q0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQy9GLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0RBQWU7YUFBMUI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDN0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxVQUFRLElBQUksQ0FBQyxJQUFNLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDO1FBQzNHLENBQUM7OztPQUFBO0lBRU0sMkNBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBdEJRO1FBQVIsWUFBSyxFQUFFOzsyREFBa0I7SUFDakI7UUFBUixZQUFLLEVBQUU7O2tFQUEwQjtJQUN4QjtRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTs4REFBZ0U7SUFIcEYseUJBQXlCO1FBZnJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsb1FBUVQ7U0FDRixDQUFDO09BRVcseUJBQXlCLENBd0JyQztJQUFELGdDQUFDO0NBeEJELEFBd0JDLElBQUE7QUF4QlksOERBQXlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNlZWstYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBQbGF5ZXJTdGF0ZSwgTWFya2VyVHlwZSwgU2Vla1RvTWFya2VyUmVxdWVzdCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcGxheWVyLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LW1hcmtlci1zZWVrLWJ1dHRvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiIWZyYW1lIHx8IGFscmVhZHlBdE1hcmtlclwiIFxuICAgICAgY2xhc3M9XCJtYXQtaWNvbi1idXR0b24ge3sgY2xhc3MgfX1cIiBcbiAgICAgIHRpdGxlPVwie3sgdGl0bGUgfCB0cmFuc2xhdGUgfX1cIiBcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX3RhYjwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNYXJrZXJTZWVrQnV0dG9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdHlwZTogTWFya2VyVHlwZTtcbiAgQElucHV0KCkgcGxheWVyU3RhdGU6IFBsYXllclN0YXRlO1xuICBAT3V0cHV0KCkgcmVxdWVzdDogRXZlbnRFbWl0dGVyPFNlZWtUb01hcmtlclJlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWVrVG9NYXJrZXJSZXF1ZXN0PigpO1xuXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICdpbicgPyB0aGlzLnBsYXllclN0YXRlLmluTWFya2VyRnJhbWUgOiB0aGlzLnBsYXllclN0YXRlLm91dE1hcmtlckZyYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBhbHJlYWR5QXRNYXJrZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWUgJiYgdGhpcy5wbGF5ZXJTdGF0ZS5jdXJyZW50RnJhbWUgJiYgdGhpcy5mcmFtZS5mcmFtZU51bWJlciA9PT0gdGhpcy5wbGF5ZXJTdGF0ZS5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBzZWVrLSR7dGhpcy50eXBlfWA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2luJyA/ICdBU1NFVC5BRFZfUExBWUVSLlNFRUtfSU5fQlROX1RJVExFJyA6ICdBU1NFVC5BRFZfUExBWUVSLlNFRUtfT1VUX0JUTl9USVRMRSc7XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3QuZW1pdCh7IHR5cGU6ICdTRUVLX1RPX01BUktFUicsIG1hcmtlclR5cGU6IHRoaXMudHlwZSB9KTtcbiAgfVxufVxuIl19
