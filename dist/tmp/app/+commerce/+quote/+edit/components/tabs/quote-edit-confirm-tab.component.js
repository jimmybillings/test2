"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var commerce_interface_1 = require("../../../../../shared/interfaces/commerce.interface");
var core_1 = require("@angular/core");
var capabilities_service_1 = require("../../../../../shared/services/capabilities.service");
var app_store_1 = require("../../../../../app.store");
var tab_1 = require("../../../../components/tabs/tab");
var QuoteEditConfirmTabComponent = (function (_super) {
    __extends(QuoteEditConfirmTabComponent, _super);
    function QuoteEditConfirmTabComponent(userCan, store) {
        var _this = _super.call(this) || this;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "sendDetails", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditConfirmTabComponent.prototype.sendQuote = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.sendQuote(); });
    };
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "discount", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.discount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "showDiscount", {
        get: function () {
            return this.store.snapshot(function (state) {
                return state.quoteEdit.data.discount > 0 && !commerce_interface_1.quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "subTotal", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.subTotal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "total", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.total; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "showTotal", {
        get: function () {
            return this.store.snapshot(function (state) {
                return state.quoteEdit.data.total > 0 && !commerce_interface_1.quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "quoteType", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.purchaseType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "quoteTypeTranslationKey", {
        get: function () {
            return this.quoteType.map(function (quoteType) { return "QUOTE." + quoteType; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditConfirmTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-edit-confirm-tab-component',
                    templateUrl: 'quote-edit-confirm-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteEditConfirmTabComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: app_store_1.AppStore, },
    ]; };
    QuoteEditConfirmTabComponent.propDecorators = {
        'projects': [{ type: core_1.Input },],
    };
    return QuoteEditConfirmTabComponent;
}(tab_1.Tab));
exports.QuoteEditConfirmTabComponent = QuoteEditConfirmTabComponent;
//# sourceMappingURL=quote-edit-confirm-tab.component.js.map