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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var quote_service_1 = require("../../../../shared/services/quote.service");
var commerce_interface_1 = require("../../../../shared/interfaces/commerce.interface");
var tab_1 = require("../../../components/tabs/tab");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var QuoteTabComponent = (function (_super) {
    __extends(QuoteTabComponent, _super);
    function QuoteTabComponent(quoteService, userCan, dialogService, router, store) {
        var _this = _super.call(this) || this;
        _this.quoteService = quoteService;
        _this.userCan = userCan;
        _this.dialogService = dialogService;
        _this.router = router;
        _this.store = store;
        _this.extendQuoteExpiration = function (newDate) {
            _this.quoteService
                .extendExpirationDate(newDate.expirationDate)
                .subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.expireQuote = function () {
            _this.quoteService.expireQuote().subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.rejectQuote = function () {
            _this.quoteService.rejectQuote().take(1).subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.quote = _this.quoteService.data.map(function (state) { return state.data; });
        _this.projectSubscription = _this.quoteService.projects.subscribe(function (projects) { return _this.projects = projects; });
        _this.config = _this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
        return _this;
    }
    QuoteTabComponent.prototype.ngOnDestroy = function () {
        this.projectSubscription.unsubscribe();
    };
    Object.defineProperty(QuoteTabComponent.prototype, "hasDiscount", {
        get: function () {
            return !!this.quoteService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent.prototype.checkout = function () {
        this.quoteService.getPaymentOptions();
        this.goToNextTab();
    };
    QuoteTabComponent.prototype.onCloneQuote = function () {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.quoteEdit.cloneQuote(_this.store.snapshotCloned(function (state) { return state.quoteShow.data; }));
        });
    };
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowCloneButton", {
        get: function () {
            return this.userCan.cloneQuote(this.quoteService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowLicenseDetailsBtn", {
        get: function () {
            return this.userCan.viewLicenseAgreementsButton(this.quoteService.hasAssetLineItems) &&
                this.store.snapshot(function (state) { return state.quoteShow.data.purchaseType !== 'RevenueOnly'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowExpireQuoteButton", {
        get: function () {
            return this.userCan.administerQuotes() && this.isActiveQuote;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowCheckoutOptions", {
        get: function () {
            return !this.userCan.administerQuotes() && this.isActiveQuote;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowRejectQuoteButton", {
        get: function () {
            return !this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowResendButton", {
        get: function () {
            return this.userCan.administerQuotes() && (this.isExpiredQuote || this.isActiveQuote);
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.quoteService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'quoteShow',
                    parentId: _this.quoteService.state.data.id,
                    licenses: common_functions_1.Common.clone(agreements)
                },
                outputOptions: [
                    {
                        event: 'close',
                        callback: function () { return true; },
                        closeOnEvent: true
                    }
                ]
            });
        });
    };
    QuoteTabComponent.prototype.showExpireConfirmationDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.EXPIRE.TITLE',
            message: 'QUOTE.EXPIRE.MESSAGE',
            accept: 'QUOTE.EXPIRE.ACCEPT',
            decline: 'QUOTE.EXPIRE.DECLINE'
        }, this.expireQuote);
    };
    QuoteTabComponent.prototype.openRejectQuoteDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.REJECT.TITLE',
            message: 'QUOTE.REJECT.MESSAGE',
            accept: 'QUOTE.REJECT.ACCEPT',
            decline: 'QUOTE.REJECT.DECLINE'
        }, this.rejectQuote);
    };
    QuoteTabComponent.prototype.openResendDialog = function () {
        this.dialogService.openFormDialog(this.config.extendQuote.items, { title: 'QUOTE.EXTEND_EXPIRATION' }, this.extendQuoteExpiration);
    };
    Object.defineProperty(QuoteTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow.data.purchaseType === 'Trial'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "showPricing", {
        get: function () {
            return this.store.select(function (state) { return !commerce_interface_1.quotesWithoutPricing.includes(state.quoteShow.data.purchaseType); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "isActiveQuote", {
        get: function () {
            return this.quoteService.state.data.quoteStatus === 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "isExpiredQuote", {
        get: function () {
            return this.quoteService.state.data.quoteStatus === 'EXPIRED';
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-tab',
                    templateUrl: 'quote-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteTabComponent.ctorParameters = function () { return [
        { type: quote_service_1.QuoteService, },
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: router_1.Router, },
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteTabComponent;
}(tab_1.Tab));
exports.QuoteTabComponent = QuoteTabComponent;
//# sourceMappingURL=quote-tab.component.js.map