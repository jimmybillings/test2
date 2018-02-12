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
var MarkersClearButtonComponent = (function () {
    function MarkersClearButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    MarkersClearButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'CLEAR_MARKERS' });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MarkersClearButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MarkersClearButtonComponent.prototype, "request", void 0);
    MarkersClearButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-markers-clear-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button\n      [disabled]=\"!playerState.inMarkerFrame && !playerState.outMarkerFrame\"\n      title=\"{{ 'ASSET.ADV_PLAYER.CLEAR_IN_OUT_BTN_TITLE' | translate }}\"\n      (click)=\"onClick()\">\n      <mat-icon>cancel</mat-icon>\n    </button>\n  "
        })
    ], MarkersClearButtonComponent);
    return MarkersClearButtonComponent;
}());
exports.MarkersClearButtonComponent = MarkersClearButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2Vycy1jbGVhci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBa0JoRztJQWRBO1FBZ0JZLFlBQU8sR0FBc0MsSUFBSSxtQkFBWSxFQUF1QixDQUFDO0lBS2pHLENBQUM7SUFIUSw2Q0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBTFE7UUFBUixZQUFLLEVBQUU7O29FQUEwQjtJQUN4QjtRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTtnRUFBZ0U7SUFGcEYsMkJBQTJCO1FBZHZDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsZ1JBT1Q7U0FDRixDQUFDO09BRVcsMkJBQTJCLENBT3ZDO0lBQUQsa0NBQUM7Q0FQRCxBQU9DLElBQUE7QUFQWSxrRUFBMkIiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9tYXJrZXJzLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGxheWVyU3RhdGUsIFBsYXllclJlcXVlc3QsIENsZWFyTWFya2Vyc1JlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1tYXJrZXJzLWNsZWFyLWJ1dHRvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiIXBsYXllclN0YXRlLmluTWFya2VyRnJhbWUgJiYgIXBsYXllclN0YXRlLm91dE1hcmtlckZyYW1lXCJcbiAgICAgIHRpdGxlPVwie3sgJ0FTU0VULkFEVl9QTEFZRVIuQ0xFQVJfSU5fT1VUX0JUTl9USVRMRScgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPG1hdC1pY29uPmNhbmNlbDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNYXJrZXJzQ2xlYXJCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBwbGF5ZXJTdGF0ZTogUGxheWVyU3RhdGU7XG4gIEBPdXRwdXQoKSByZXF1ZXN0OiBFdmVudEVtaXR0ZXI8Q2xlYXJNYXJrZXJzUmVxdWVzdD4gPSBuZXcgRXZlbnRFbWl0dGVyPENsZWFyTWFya2Vyc1JlcXVlc3Q+KCk7XG5cbiAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0LmVtaXQoeyB0eXBlOiAnQ0xFQVJfTUFSS0VSUycgfSk7XG4gIH1cbn1cbiJdfQ==
