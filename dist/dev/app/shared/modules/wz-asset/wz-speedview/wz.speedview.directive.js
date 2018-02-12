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
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var enhanced_asset_1 = require("../../../interfaces/enhanced-asset");
var wz_speedview_position_calculator_1 = require("./wz.speedview-position-calculator");
var wz_speedview_component_1 = require("./wz.speedview.component");
var app_store_1 = require("../../../../app.store");
var WzSpeedviewDirective = (function () {
    function WzSpeedviewDirective(viewContainerRef, overlay, renderer, store) {
        this.viewContainerRef = viewContainerRef;
        this.overlay = overlay;
        this.renderer = renderer;
        this.store = store;
    }
    Object.defineProperty(WzSpeedviewDirective.prototype, "wzSpeedview", {
        set: function (value) {
            this.enhancedAsset = value;
        },
        enumerable: true,
        configurable: true
    });
    WzSpeedviewDirective.prototype.ngOnInit = function () {
        this.config = new overlay_1.OverlayConfig();
    };
    WzSpeedviewDirective.prototype.ngOnDestroy = function () {
        this.destroySpeedView();
    };
    WzSpeedviewDirective.prototype.onMouseEnter = function ($event) {
        this.loadOverlay($event.currentTarget.getBoundingClientRect());
        this.loadSpeedView();
    };
    WzSpeedviewDirective.prototype.onMouseLeave = function () {
        this.destroySpeedView();
    };
    WzSpeedviewDirective.prototype.onClick = function () {
        this.destroySpeedView();
    };
    WzSpeedviewDirective.prototype.loadOverlay = function (viewPort) {
        var coords = wz_speedview_position_calculator_1.SpeedViewPositionCalculator.calculate(viewPort);
        this.config.positionStrategy = this.positionStrategy(coords);
        this.overlayRef = this.overlay.create(this.config);
    };
    WzSpeedviewDirective.prototype.loadSpeedView = function () {
        var _this = this;
        this.displaySpeedViewDialog();
        this.speedViewDataSubscription = this.loadSpeedViewData
            .subscribe();
        this.scollListener = this.renderer
            .listenGlobal('document', 'scroll', function () { return _this.destroySpeedView(); });
    };
    WzSpeedviewDirective.prototype.displaySpeedViewDialog = function () {
        this.speedViewInstance = this.overlayRef.attach(this.speedViewComponent).instance;
        this.speedViewInstance.merge({ posterUrl: this.enhancedAsset.thumbnailUrl });
        this.speedViewInstance.show();
    };
    WzSpeedviewDirective.prototype.destroySpeedView = function () {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        if (this.speedViewDataSubscription) {
            this.speedViewDataSubscription.unsubscribe();
        }
        if (this.scollListener) {
            this.scollListener();
        }
        this.speedViewInstance = null;
    };
    WzSpeedviewDirective.prototype.positionStrategy = function (coordinates) {
        return this.overlay
            .position()
            .global()
            .top(coordinates.y + "px")
            .left(coordinates.x + "px");
    };
    Object.defineProperty(WzSpeedviewDirective.prototype, "speedViewComponent", {
        get: function () {
            return new portal_1.ComponentPortal(wz_speedview_component_1.WzSpeedviewComponent, this.viewContainerRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSpeedviewDirective.prototype, "speedViewData", {
        get: function () {
            var _this = this;
            return this.store.snapshot(function (state) { return state.speedPreview[_this.enhancedAsset.assetId]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSpeedviewDirective.prototype, "loadSpeedViewData", {
        get: function () {
            var _this = this;
            return this.store.blockUntil(function (state) { return !!state.speedPreview[_this.enhancedAsset.assetId]; })
                .do(function () { return _this.speedViewInstance.merge(_this.speedViewData); });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset),
        __metadata("design:paramtypes", [enhanced_asset_1.EnhancedAsset])
    ], WzSpeedviewDirective.prototype, "wzSpeedview", null);
    __decorate([
        core_1.HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WzSpeedviewDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WzSpeedviewDirective.prototype, "onMouseLeave", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WzSpeedviewDirective.prototype, "onClick", null);
    WzSpeedviewDirective = __decorate([
        core_1.Directive({ selector: '[wzSpeedview]' }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            overlay_1.Overlay,
            core_1.Renderer,
            app_store_1.AppStore])
    ], WzSpeedviewDirective);
    return WzSpeedviewDirective;
}());
exports.WzSpeedviewDirective = WzSpeedviewDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1zcGVlZHZpZXcvd3ouc3BlZWR2aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQVV1QjtBQUV2QixnREFLOEI7QUFFOUIsOENBRzZCO0FBVzdCLHFFQUFtRTtBQUNuRSx1RkFBaUY7QUFDakYsbUVBQWdFO0FBRWhFLG1EQUFpRDtBQUdqRDtJQWNFLDhCQUNVLGdCQUFrQyxFQUNsQyxPQUFnQixFQUNoQixRQUFrQixFQUNsQixLQUFlO1FBSGYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUN6QixDQUFDO0lBaEJELHNCQUFJLDZDQUFXO2FBQWYsVUFBZ0IsS0FBb0I7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFnQkQsdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx1QkFBYSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBR00sMkNBQVksR0FBbkIsVUFBb0IsTUFBVztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBR00sMkNBQVksR0FBbkI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBR00sc0NBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTywwQ0FBVyxHQUFuQixVQUFvQixR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QU8sQ0FBQyxFQUFoRCxDQUFnRCxDQUFDO2lCQUNwRixFQUFFLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUFwR0Q7UUFEQyxZQUFLLEVBQUU7a0NBQ2UsOEJBQWE7eUNBQWIsOEJBQWE7MkRBRW5DO0lBeUJEO1FBREMsbUJBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs0REFJdEM7SUFHRDtRQURDLG1CQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7NERBR3RDO0lBR0Q7UUFEQyxtQkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3VEQUdqQztJQTNDVSxvQkFBb0I7UUFEaEMsZ0JBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQzt5Q0FnQlgsdUJBQWdCO1lBQ3pCLGlCQUFPO1lBQ04sZUFBUTtZQUNYLG9CQUFRO09BbEJkLG9CQUFvQixDQXdHaEM7SUFBRCwyQkFBQztDQXhHRCxBQXdHQyxJQUFBO0FBeEdZLG9EQUFvQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otc3BlZWR2aWV3L3d6LnNwZWVkdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE92ZXJsYXlDb25maWcsXG4gIE92ZXJsYXlSZWYsXG4gIE92ZXJsYXksXG4gIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxuaW1wb3J0IHtcbiAgVGVtcGxhdGVQb3J0YWxEaXJlY3RpdmUsXG4gIENvbXBvbmVudFBvcnRhbFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7XG4gIFNwZWVkdmlld0RhdGEsXG4gIFNwZWVkdmlld0V2ZW50XG59IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvYXNzZXQuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ29vcmRzLCBWaWV3cG9ydCwgQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRW5oYW5jZWRBc3NldCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgU3BlZWRWaWV3UG9zaXRpb25DYWxjdWxhdG9yIH0gZnJvbSAnLi93ei5zcGVlZHZpZXctcG9zaXRpb24tY2FsY3VsYXRvcic7XG5pbXBvcnQgeyBXelNwZWVkdmlld0NvbXBvbmVudCB9IGZyb20gJy4vd3ouc3BlZWR2aWV3LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3d6U3BlZWR2aWV3XScgfSlcbmV4cG9ydCBjbGFzcyBXelNwZWVkdmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgd3pTcGVlZHZpZXcodmFsdWU6IEVuaGFuY2VkQXNzZXQpIHtcbiAgICB0aGlzLmVuaGFuY2VkQXNzZXQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY29uZmlnOiBPdmVybGF5Q29uZmlnO1xuICBwcml2YXRlIHNwZWVkVmlld0luc3RhbmNlOiBXelNwZWVkdmlld0NvbXBvbmVudDtcbiAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIHNwZWVkVmlld0RhdGFTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzY29sbExpc3RlbmVyOiBGdW5jdGlvbjtcbiAgcHJpdmF0ZSBlbmhhbmNlZEFzc2V0OiBFbmhhbmNlZEFzc2V0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveVNwZWVkVmlldygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlRW50ZXIoJGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRPdmVybGF5KCRldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICB0aGlzLmxvYWRTcGVlZFZpZXcoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveVNwZWVkVmlldygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3lTcGVlZFZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZE92ZXJsYXkodmlld1BvcnQ6IFZpZXdwb3J0KTogdm9pZCB7XG4gICAgY29uc3QgY29vcmRzOiBDb29yZHMgPSBTcGVlZFZpZXdQb3NpdGlvbkNhbGN1bGF0b3IuY2FsY3VsYXRlKHZpZXdQb3J0KTtcbiAgICB0aGlzLmNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5wb3NpdGlvblN0cmF0ZWd5KGNvb3Jkcyk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTcGVlZFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5U3BlZWRWaWV3RGlhbG9nKCk7XG5cbiAgICB0aGlzLnNwZWVkVmlld0RhdGFTdWJzY3JpcHRpb24gPSB0aGlzLmxvYWRTcGVlZFZpZXdEYXRhXG4gICAgICAuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnNjb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyXG4gICAgICAubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdzY3JvbGwnLCAoKSA9PiB0aGlzLmRlc3Ryb3lTcGVlZFZpZXcoKSk7XG4gIH1cblxuICBwcml2YXRlIGRpc3BsYXlTcGVlZFZpZXdEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5zcGVlZFZpZXdJbnN0YW5jZSA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5zcGVlZFZpZXdDb21wb25lbnQpLmluc3RhbmNlO1xuICAgIHRoaXMuc3BlZWRWaWV3SW5zdGFuY2UubWVyZ2UoeyBwb3N0ZXJVcmw6IHRoaXMuZW5oYW5jZWRBc3NldC50aHVtYm5haWxVcmwgfSk7XG4gICAgdGhpcy5zcGVlZFZpZXdJbnN0YW5jZSEuc2hvdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95U3BlZWRWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNwZWVkVmlld0RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3BlZWRWaWV3RGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjb2xsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuc2NvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHRoaXMuc3BlZWRWaWV3SW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblN0cmF0ZWd5KGNvb3JkaW5hdGVzOiBDb29yZHMpOiBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5XG4gICAgICAucG9zaXRpb24oKVxuICAgICAgLmdsb2JhbCgpXG4gICAgICAudG9wKGAke2Nvb3JkaW5hdGVzLnl9cHhgKVxuICAgICAgLmxlZnQoYCR7Y29vcmRpbmF0ZXMueH1weGApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgc3BlZWRWaWV3Q29tcG9uZW50KCk6IENvbXBvbmVudFBvcnRhbDxXelNwZWVkdmlld0NvbXBvbmVudD4ge1xuICAgIHJldHVybiBuZXcgQ29tcG9uZW50UG9ydGFsKFd6U3BlZWR2aWV3Q29tcG9uZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgc3BlZWRWaWV3RGF0YSgpOiBTcGVlZHZpZXdEYXRhIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5zcGVlZFByZXZpZXdbdGhpcy5lbmhhbmNlZEFzc2V0LmFzc2V0SWRdKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGxvYWRTcGVlZFZpZXdEYXRhKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gISFzdGF0ZS5zcGVlZFByZXZpZXdbdGhpcy5lbmhhbmNlZEFzc2V0LmFzc2V0SWRdKVxuICAgICAgLmRvKCgpID0+IHRoaXMuc3BlZWRWaWV3SW5zdGFuY2UubWVyZ2UodGhpcy5zcGVlZFZpZXdEYXRhKSk7XG4gIH1cbn1cbiJdfQ==
