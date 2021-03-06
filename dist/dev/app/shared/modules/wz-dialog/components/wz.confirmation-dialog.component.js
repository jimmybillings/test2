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
var WzConfirmationDialogComponent = (function () {
    function WzConfirmationDialogComponent() {
        this.accept = new core_1.EventEmitter();
        this.decline = new core_1.EventEmitter();
    }
    WzConfirmationDialogComponent.prototype.onClickAccept = function () {
        this.accept.emit();
    };
    WzConfirmationDialogComponent.prototype.onClickDecline = function () {
        this.decline.emit();
    };
    Object.defineProperty(WzConfirmationDialogComponent.prototype, "title", {
        get: function () {
            return this.toTrString(this.strings.title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzConfirmationDialogComponent.prototype, "message", {
        get: function () {
            return this.toTrString(this.strings.message);
        },
        enumerable: true,
        configurable: true
    });
    WzConfirmationDialogComponent.prototype.toTrString = function (s) {
        if (typeof s === 'string')
            return { key: s, values: {} };
        return s;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzConfirmationDialogComponent.prototype, "strings", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzConfirmationDialogComponent.prototype, "accept", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzConfirmationDialogComponent.prototype, "decline", void 0);
    WzConfirmationDialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-confirmation-dialog',
            template: "\n    <h1 mat-dialog-title>{{ title.key | translate:title.values }}</h1>\n    <mat-dialog-content layout=\"row\">\n      <div flex>{{ message.key | translate:message.values }}</div>\n    </mat-dialog-content>\n    <mat-dialog-actions layout=\"row\" layout-align=\"end end\">\n      <button (click)=\"onClickDecline()\" mat-button mat-dialog-close color=\"primary\">\n        {{ strings.decline | translate }}\n      </button>\n      <button (click)=\"onClickAccept()\" mat-button mat-dialog-close color=\"primary\">\n        {{ strings.accept | translate }}\n      </button>\n    </mat-dialog-actions>\n  "
        })
    ], WzConfirmationDialogComponent);
    return WzConfirmationDialogComponent;
}());
exports.WzConfirmationDialogComponent = WzConfirmationDialogComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF1RTtBQXFCdkU7SUFsQkE7UUFvQlksV0FBTSxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRCxZQUFPLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBc0I3RCxDQUFDO0lBcEJRLHFEQUFhLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sc0RBQWMsR0FBckI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBVyxnREFBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrREFBTzthQUFsQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFFTyxrREFBVSxHQUFsQixVQUFtQixDQUFtQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUN6RCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXZCUTtRQUFSLFlBQUssRUFBRTs7a0VBQW9DO0lBQ2xDO1FBQVQsYUFBTSxFQUFFO2tDQUFTLG1CQUFZO2lFQUE0QjtJQUNoRDtRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTtrRUFBNEI7SUFIaEQsNkJBQTZCO1FBbEJ6QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsUUFBUSxFQUFFLCtsQkFhVDtTQUNGLENBQUM7T0FDVyw2QkFBNkIsQ0F5QnpDO0lBQUQsb0NBQUM7Q0F6QkQsQUF5QkMsSUFBQTtBQXpCWSxzRUFBNkIiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9jb21wb25lbnRzL3d6LmNvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ1N0cmluZ3MsIFRyYW5zbGF0aW9uS2V5QW5kVmFsdWVzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otY29uZmlybWF0aW9uLWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxIG1hdC1kaWFsb2ctdGl0bGU+e3sgdGl0bGUua2V5IHwgdHJhbnNsYXRlOnRpdGxlLnZhbHVlcyB9fTwvaDE+XG4gICAgPG1hdC1kaWFsb2ctY29udGVudCBsYXlvdXQ9XCJyb3dcIj5cbiAgICAgIDxkaXYgZmxleD57eyBtZXNzYWdlLmtleSB8IHRyYW5zbGF0ZTptZXNzYWdlLnZhbHVlcyB9fTwvZGl2PlxuICAgIDwvbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxtYXQtZGlhbG9nLWFjdGlvbnMgbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwiZW5kIGVuZFwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25DbGlja0RlY2xpbmUoKVwiIG1hdC1idXR0b24gbWF0LWRpYWxvZy1jbG9zZSBjb2xvcj1cInByaW1hcnlcIj5cbiAgICAgICAge3sgc3RyaW5ncy5kZWNsaW5lIHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tBY2NlcHQoKVwiIG1hdC1idXR0b24gbWF0LWRpYWxvZy1jbG9zZSBjb2xvcj1cInByaW1hcnlcIj5cbiAgICAgICAge3sgc3RyaW5ncy5hY2NlcHQgfCB0cmFuc2xhdGUgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc3RyaW5nczogQ29uZmlybWF0aW9uRGlhbG9nU3RyaW5ncztcbiAgQE91dHB1dCgpIGFjY2VwdDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVjbGluZTogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBvbkNsaWNrQWNjZXB0KCk6IHZvaWQge1xuICAgIHRoaXMuYWNjZXB0LmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrRGVjbGluZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlY2xpbmUuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGdldCB0aXRsZSgpOiBUcmFuc2xhdGlvbktleUFuZFZhbHVlcyB7XG4gICAgcmV0dXJuIHRoaXMudG9UclN0cmluZyh0aGlzLnN0cmluZ3MudGl0bGUpO1xuICB9XG5cbiAgcHVibGljIGdldCBtZXNzYWdlKCk6IFRyYW5zbGF0aW9uS2V5QW5kVmFsdWVzIHtcbiAgICByZXR1cm4gdGhpcy50b1RyU3RyaW5nKHRoaXMuc3RyaW5ncy5tZXNzYWdlKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9UclN0cmluZyhzOiBzdHJpbmcgfCBUcmFuc2xhdGlvbktleUFuZFZhbHVlcyk6IFRyYW5zbGF0aW9uS2V5QW5kVmFsdWVzIHtcbiAgICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnKSByZXR1cm4geyBrZXk6IHMsIHZhbHVlczoge30gfTtcbiAgICByZXR1cm4gcztcbiAgfVxufVxuIl19
