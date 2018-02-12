"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
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
    WzSpeedviewDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[wzSpeedview]' },] },
    ];
    WzSpeedviewDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: overlay_1.Overlay, },
        { type: core_1.Renderer, },
        { type: app_store_1.AppStore, },
    ]; };
    WzSpeedviewDirective.propDecorators = {
        'wzSpeedview': [{ type: core_1.Input },],
        'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter', ['$event'],] },],
        'onMouseLeave': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    };
    return WzSpeedviewDirective;
}());
exports.WzSpeedviewDirective = WzSpeedviewDirective;
//# sourceMappingURL=wz.speedview.directive.js.map