"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commerce_capabilities_1 = require("../services/commerce.capabilities");
var app_store_1 = require("../../app.store");
var cart_service_1 = require("../../shared/services/cart.service");
var CartComponent = (function () {
    function CartComponent(userCan, store, cartService, detector) {
        this.userCan = userCan;
        this.store = store;
        this.cartService = cartService;
        this.detector = detector;
        this.showComments = null;
    }
    CartComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.reset(); });
        this.tabLabelKeys = ['cart', 'billing', 'payment', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
        this.commentParentObject = { objectType: 'cart', objectId: this.cartService.state.data.id };
    };
    CartComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'GO_TO_NEXT_TAB': {
                this.goToNextTab();
                break;
            }
            case 'GO_TO_PREVIOUS_TAB': {
                this.goToPreviousTab();
                break;
            }
            case 'GO_TO_TAB': {
                this.goToTab(message.payload);
                break;
            }
            case 'DISABLE_TAB': {
                this.disableTab(message.payload);
            }
        }
    };
    CartComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(CartComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.cart.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    CartComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    CartComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    CartComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    CartComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    CartComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-component',
                    templateUrl: 'cart.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: app_store_1.AppStore, },
        { type: cart_service_1.CartService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map