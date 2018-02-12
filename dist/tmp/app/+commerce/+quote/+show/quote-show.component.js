"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var quote_service_1 = require("../../../shared/services/quote.service");
var app_store_1 = require("../../../app.store");
var QuoteShowComponent = (function () {
    function QuoteShowComponent(userCan, quoteService, store, detector) {
        this.userCan = userCan;
        this.quoteService = quoteService;
        this.store = store;
        this.detector = detector;
        this.showComments = null;
        this.quote = this.quoteService.data.map(function (state) { return state.data; });
    }
    QuoteShowComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.reset(); });
        this.tabLabelKeys = ['quote', 'billing', 'payment', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
        this.commentParentObject = { objectType: 'quote', objectId: this.quoteService.state.data.id };
    };
    Object.defineProperty(QuoteShowComponent.prototype, "hasPurchaseType", {
        get: function () {
            return !!this.quoteService.state.data.purchaseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "hasDiscount", {
        get: function () {
            return !!this.quoteService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldDisplayReview", {
        get: function () {
            return this.userCan.administerQuotes() || this.quoteService.state.data.quoteStatus !== 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldDisplayPurchaseHeader", {
        get: function () {
            return !this.userCan.administerQuotes() && this.quoteService.state.data.quoteStatus === 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "displayActiveOfflineAgreementToPurchaser", {
        get: function () {
            return !this.userCan.administerQuotes() &&
                this.quoteService.state.data.quoteStatus === 'ACTIVE' &&
                this.offlineAgreementIds.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldShowRecipientInfo", {
        get: function () {
            return this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "trStringForPurchaseType", {
        get: function () {
            return "QUOTE." + this.quoteService.state.data.purchaseType;
        },
        enumerable: true,
        configurable: true
    });
    QuoteShowComponent.prototype.onNotification = function (message) {
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
    QuoteShowComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(QuoteShowComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.quote.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "offlineAgreementIds", {
        get: function () {
            var ids = [];
            this.quoteService.state.data.projects.forEach(function (project) {
                if (project.lineItems)
                    project.lineItems.forEach(function (lineItem) {
                        if (lineItem.externalAgreementIds)
                            lineItem.externalAgreementIds.forEach(function (id) { return ids.push(id); });
                    });
            });
            return ids.filter(function (id, index, ids) { return id !== ids[index - 1]; }).join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "salesManager", {
        get: function () {
            var _this = this;
            return this.quote.map(function (quote) {
                return {
                    salesManager: quote.salesManager,
                    expirationDate: quote.expirationDate,
                    offlineAgreement: _this.offlineAgreementIds
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "quoteRecipient", {
        get: function () {
            return this.quote.map(function (quote) {
                return {
                    customerName: quote.ownerData.firstName + " " + quote.ownerData.lastName,
                    email: quote.ownerData.email,
                    accountName: quote.ownerData.accountName
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "invoiceContact", {
        get: function () {
            return this.quote.map(function (quote) {
                return quote.invoiceContact ? {
                    name: quote.invoiceContact.firstName + " " + quote.invoiceContact.lastName,
                    contactEmail: quote.invoiceContact.email
                } : null;
            });
        },
        enumerable: true,
        configurable: true
    });
    QuoteShowComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    QuoteShowComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-show-component',
                    templateUrl: 'quote-show.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteShowComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: quote_service_1.QuoteService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return QuoteShowComponent;
}());
exports.QuoteShowComponent = QuoteShowComponent;
//# sourceMappingURL=quote-show.component.js.map