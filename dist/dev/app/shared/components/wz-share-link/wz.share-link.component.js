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
var app_store_1 = require("../../../app.store");
var WzShareLinkComponent = (function () {
    function WzShareLinkComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    WzShareLinkComponent.prototype.selectInputForCopy = function (event) {
        event.target.select();
    };
    WzShareLinkComponent.prototype.onCopyShareLinkButtonClick = function () {
        this.store.dispatch(function (factory) { return factory.snackbar.display('SHARING.SHARE_LINK.COPIED_CONFIRMED_MESSAGE'); });
    };
    WzShareLinkComponent.prototype.onPreviousButtonClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.onCloseButtonClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.onOutsideClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.requestClose = function () {
        this.closeRequest.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzShareLinkComponent.prototype, "shareLink", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzShareLinkComponent.prototype, "closeRequest", void 0);
    WzShareLinkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-share-link',
            templateUrl: 'wz.share-link.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], WzShareLinkComponent);
    return WzShareLinkComponent;
}());
exports.WzShareLinkComponent = WzShareLinkComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS1saW5rL3d6LnNoYXJlLWxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBRWhHLGdEQUE4QztBQVM5QztJQUlFLDhCQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUZ6QixpQkFBWSxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUV6QixDQUFDO0lBRWpDLGlEQUFrQixHQUF6QixVQUEwQixLQUFVO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLHlEQUEwQixHQUFqQztRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsNkNBQTZDLENBQUMsRUFBdkUsQ0FBdUUsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxvREFBcUIsR0FBNUI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLGlEQUFrQixHQUF6QjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sNkNBQWMsR0FBckI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLDJDQUFZLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBM0JRO1FBQVIsWUFBSyxFQUFFOzsyREFBbUI7SUFDakI7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7OERBQTRCO0lBRnJELG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FNMkIsb0JBQVE7T0FKeEIsb0JBQW9CLENBNkJoQztJQUFELDJCQUFDO0NBN0JELEFBNkJDLElBQUE7QUE3Qlksb0RBQW9CIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS1saW5rL3d6LnNoYXJlLWxpbmsuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otc2hhcmUtbGluaycsXG4gIHRlbXBsYXRlVXJsOiAnd3ouc2hhcmUtbGluay5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBXelNoYXJlTGlua0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNoYXJlTGluazogc3RyaW5nO1xuICBAT3V0cHV0KCkgY2xvc2VSZXF1ZXN0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBzZWxlY3RJbnB1dEZvckNvcHkoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGV2ZW50LnRhcmdldC5zZWxlY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvcHlTaGFyZUxpbmtCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdTSEFSSU5HLlNIQVJFX0xJTksuQ09QSUVEX0NPTkZJUk1FRF9NRVNTQUdFJykpO1xuICB9XG5cbiAgcHVibGljIG9uUHJldmlvdXNCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2VCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIG9uT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlUmVxdWVzdC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==
