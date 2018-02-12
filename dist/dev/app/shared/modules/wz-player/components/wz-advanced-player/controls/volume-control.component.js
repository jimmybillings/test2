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
var VolumeControlComponent = (function () {
    function VolumeControlComponent() {
        this.request = new core_1.EventEmitter();
        this.volumeState = 'inactive';
        this.buttonTitle = 'ASSET.ADV_PLAYER.SOUND_BTN_TITLE';
    }
    Object.defineProperty(VolumeControlComponent.prototype, "iconName", {
        get: function () {
            var volume = this.playerState.volume;
            if (volume > 66)
                return 'volume_up';
            if (volume > 33)
                return 'volume_down';
            if (volume > 0)
                return 'volume_mute';
            return 'volume_off';
        },
        enumerable: true,
        configurable: true
    });
    VolumeControlComponent.prototype.onMouseOver = function () {
        this.volumeState = 'active';
    };
    VolumeControlComponent.prototype.onMouseLeave = function () {
        this.volumeState = 'inactive';
    };
    VolumeControlComponent.prototype.onSliderInput = function (event) {
        this.request.emit({ type: 'SET_VOLUME', volume: event.value });
    };
    VolumeControlComponent.prototype.onButtonClick = function () {
        this.request.emit({ type: 'TOGGLE_MUTE' });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VolumeControlComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VolumeControlComponent.prototype, "request", void 0);
    VolumeControlComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-volume-control',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button *ngIf=\"volumeState ==='inactive'\" title=\"{{ buttonTitle | translate }}\" (mouseover)=\"onMouseOver()\">\n      <mat-icon>{{ iconName }}</mat-icon>\n    </button>\n    <div class=\"volume-control\" [@volumeState]=\"volumeState\" (mouseleave)=\"onMouseLeave()\">\n      <mat-slider vertical min=\"0\" max=\"100\" value=\"{{ playerState.volume }}\" (input)=\"onSliderInput($event)\"></mat-slider>\n      <button mat-icon-button title=\"{{ buttonTitle | translate }}\" (click)=\"onButtonClick()\">\n        <mat-icon>{{ iconName }}</mat-icon>\n      </button>\n    </div>\n  ",
            animations: [
                core_1.trigger('volumeState', [
                    core_1.state('inactive', core_1.style({
                        opacity: '0',
                        zIndex: '-1'
                    })),
                    core_1.state('active', core_1.style({
                        opacity: '1',
                        zIndex: '1'
                    })),
                    core_1.transition('inactive => active', core_1.animate('250ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
                    core_1.transition('active => inactive', core_1.animate('360ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
                ])
            ]
        })
    ], VolumeControlComponent);
    return VolumeControlComponent;
}());
exports.VolumeControlComponent = VolumeControlComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdm9sdW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBV3VCO0FBcUN2QjtJQWpDQTtRQW1DWSxZQUFPLEdBQXNDLElBQUksbUJBQVksRUFBdUIsQ0FBQztRQUN4RixnQkFBVyxHQUFXLFVBQVUsQ0FBQztRQUNqQyxnQkFBVyxHQUFXLGtDQUFrQyxDQUFDO0lBMkJsRSxDQUFDO0lBekJDLHNCQUFXLDRDQUFRO2FBQW5CO1lBQ0UsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFFL0MsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVNLDRDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVNLDZDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVNLDhDQUFhLEdBQXBCLFVBQXFCLEtBQVU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sOENBQWEsR0FBcEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUE1QlE7UUFBUixZQUFLLEVBQUU7OytEQUEwQjtJQUN4QjtRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTsyREFBZ0U7SUFGcEYsc0JBQXNCO1FBakNsQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLDhsQkFVVDtZQUVELFVBQVUsRUFBRTtnQkFDVixjQUFPLENBQUMsYUFBYSxFQUFFO29CQUNyQixZQUFLLENBQUMsVUFBVSxFQUFFLFlBQUssQ0FBQzt3QkFDdEIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILFlBQUssQ0FBQyxRQUFRLEVBQUUsWUFBSyxDQUFDO3dCQUNwQixPQUFPLEVBQUUsR0FBRzt3QkFDWixNQUFNLEVBQUUsR0FBRztxQkFDWixDQUFDLENBQUM7b0JBQ0gsaUJBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztvQkFDekYsaUJBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQztpQkFDcEYsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUdXLHNCQUFzQixDQStCbEM7SUFBRCw2QkFBQztDQS9CRCxBQStCQyxJQUFBO0FBL0JZLHdEQUFzQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3ZvbHVtZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGF5ZXJTdGF0ZSwgUGxheWVyVm9sdW1lUmVxdWVzdCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcGxheWVyLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXZvbHVtZS1jb250cm9sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKm5nSWY9XCJ2b2x1bWVTdGF0ZSA9PT0naW5hY3RpdmUnXCIgdGl0bGU9XCJ7eyBidXR0b25UaXRsZSB8IHRyYW5zbGF0ZSB9fVwiIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IGljb25OYW1lIH19PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLWNvbnRyb2xcIiBbQHZvbHVtZVN0YXRlXT1cInZvbHVtZVN0YXRlXCIgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlKClcIj5cbiAgICAgIDxtYXQtc2xpZGVyIHZlcnRpY2FsIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cInt7IHBsYXllclN0YXRlLnZvbHVtZSB9fVwiIChpbnB1dCk9XCJvblNsaWRlcklucHV0KCRldmVudClcIj48L21hdC1zbGlkZXI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cInt7IGJ1dHRvblRpdGxlIHwgdHJhbnNsYXRlIH19XCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soKVwiPlxuICAgICAgICA8bWF0LWljb24+e3sgaWNvbk5hbWUgfX08L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG5cbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3ZvbHVtZVN0YXRlJywgW1xuICAgICAgc3RhdGUoJ2luYWN0aXZlJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICAgIHpJbmRleDogJy0xJ1xuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogJzEnLFxuICAgICAgICB6SW5kZXg6ICcxJ1xuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgYW5pbWF0ZSgnMjUwbXMgMTAwbXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAsIDAuNTUsIDAuMiknKSksXG4gICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gaW5hY3RpdmUnLCBhbmltYXRlKCczNjBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpKVxuICAgIF0pXG4gIF1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIFZvbHVtZUNvbnRyb2xDb21wb25lbnQge1xuICBASW5wdXQoKSBwbGF5ZXJTdGF0ZTogUGxheWVyU3RhdGU7XG4gIEBPdXRwdXQoKSByZXF1ZXN0OiBFdmVudEVtaXR0ZXI8UGxheWVyVm9sdW1lUmVxdWVzdD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBsYXllclZvbHVtZVJlcXVlc3Q+KCk7XG4gIHB1YmxpYyB2b2x1bWVTdGF0ZTogc3RyaW5nID0gJ2luYWN0aXZlJztcbiAgcHVibGljIGJ1dHRvblRpdGxlOiBzdHJpbmcgPSAnQVNTRVQuQURWX1BMQVlFUi5TT1VORF9CVE5fVElUTEUnO1xuXG4gIHB1YmxpYyBnZXQgaWNvbk5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB2b2x1bWU6IG51bWJlciA9IHRoaXMucGxheWVyU3RhdGUudm9sdW1lO1xuXG4gICAgaWYgKHZvbHVtZSA+IDY2KSByZXR1cm4gJ3ZvbHVtZV91cCc7XG4gICAgaWYgKHZvbHVtZSA+IDMzKSByZXR1cm4gJ3ZvbHVtZV9kb3duJztcbiAgICBpZiAodm9sdW1lID4gMCkgcmV0dXJuICd2b2x1bWVfbXV0ZSc7XG4gICAgcmV0dXJuICd2b2x1bWVfb2ZmJztcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLnZvbHVtZVN0YXRlID0gJ2FjdGl2ZSc7XG4gIH1cblxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMudm9sdW1lU3RhdGUgPSAnaW5hY3RpdmUnO1xuICB9XG5cbiAgcHVibGljIG9uU2xpZGVySW5wdXQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFVF9WT0xVTUUnLCB2b2x1bWU6IGV2ZW50LnZhbHVlIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0LmVtaXQoeyB0eXBlOiAnVE9HR0xFX01VVEUnIH0pO1xuICB9XG5cbn1cbiJdfQ==
