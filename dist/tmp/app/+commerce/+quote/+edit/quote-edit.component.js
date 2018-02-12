"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var core_1 = require("@angular/core");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var capabilities_service_1 = require("../../../shared/services/capabilities.service");
var app_store_1 = require("../../../app.store");
var QuoteEditComponent = (function () {
    function QuoteEditComponent(userCan, dialogService, store, detector) {
        var _this = this;
        this.userCan = userCan;
        this.dialogService = dialogService;
        this.store = store;
        this.detector = detector;
        this.showComments = null;
        this.updateQuoteField = function (options) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.updateQuoteField(options); });
        };
        this.deleteQuote = function () {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.delete(); });
        };
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
        this.commentParentObject = { objectType: 'quote', objectId: this.store.snapshot(function (state) { return state.quoteEdit.data.id; }) };
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
    }
    QuoteEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tabLabelKeys = ['quote', 'recipient', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.projectSubscription = this.store.select(function (state) { return state.quoteEdit.data.projects; })
            .subscribe(function (projects) { return _this.projects = _this.enhanceAssetsInProjects(projects); });
    };
    QuoteEditComponent.prototype.ngOnDestroy = function () {
        this.projectSubscription.unsubscribe();
    };
    QuoteEditComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'OPEN_DELETE_DIALOG':
                this.onOpenDeleteQuoteDialog();
                break;
            case 'SAVE_AND_NEW':
                this.onCreateQuote();
                break;
            case 'CLONE_QUOTE':
                this.onCloneQuote();
                break;
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
    Object.defineProperty(QuoteEditComponent.prototype, "hasBulkOrderId", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data; })
                .map(function (quote) { return (quote.bulkOrderId) ? quote.bulkOrderId : false; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "bulkOrderIdActionLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.bulkOrderId; }) ?
                'QUOTE.EDIT_BULK_ORDER_ID_TITLE' : 'QUOTE.ADD_BULK_ORDER_ID_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "discountActionLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.discount; }) ?
                'QUOTE.EDIT_DISCOUNT_TITLE' : 'QUOTE.ADD_DISCOUNT_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "bulkOrderIdSubmitLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.bulkOrderId; }) ?
                'QUOTE.EDIT_BULK_ORDER_FORM_SUBMIT' : 'QUOTE.ADD_BULK_ORDER_FORM_SUBMIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "discountSubmitLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.discount; }) ?
                'QUOTE.EDIT_DISCOUNT_FORM_SUBMIT' : 'QUOTE.ADD_DISCOUNT_FORM_SUBMIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "shouldShowCloneButton", {
        get: function () {
            return this.userCan.cloneQuote(this.store.select(function (state) { return state.quoteEdit; }));
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(QuoteEditComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.quote.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditComponent.prototype.addBulkOrderId = function () {
        this.dialogService.openFormDialog(this.mergeFormValues(this.config.addBulkOrderId.items, 'bulkOrderId'), {
            title: this.bulkOrderIdActionLabel,
            submitLabel: this.bulkOrderIdSubmitLabel,
            autocomplete: 'off'
        }, this.updateQuoteField);
    };
    QuoteEditComponent.prototype.editDiscount = function () {
        this.dialogService.openFormDialog(this.mergeFormValues(this.config.addDiscount.items, 'discount'), {
            title: this.discountActionLabel,
            submitLabel: this.discountSubmitLabel,
            autocomplete: 'off'
        }, this.updateQuoteField);
    };
    QuoteEditComponent.prototype.onOpenDeleteQuoteDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.DELETE.TITLE',
            message: 'QUOTE.DELETE.MESSAGE',
            accept: 'QUOTE.DELETE.ACCEPT',
            decline: 'QUOTE.DELETE.DECLINE'
        }, this.deleteQuote);
    };
    QuoteEditComponent.prototype.onCloneQuote = function () {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.quoteEdit.cloneQuote(_this.store.snapshotCloned(function (state) { return state.quoteEdit.data; }));
        });
    };
    QuoteEditComponent.prototype.onCreateQuote = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.createQuote(); });
    };
    QuoteEditComponent.prototype.enhanceAssetsInProjects = function (projects) {
        if (!projects)
            return [];
        var clonedProjects = common_functions_1.Common.clone(projects);
        return clonedProjects.map(function (project) {
            if (project.lineItems) {
                project.lineItems = project.lineItems.map(function (lineItem) {
                    lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'quoteEdit');
                    return lineItem;
                });
            }
            return project;
        });
    };
    QuoteEditComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.mergeFormValues = function (fields, property) {
        var _this = this;
        return fields.map(function (item) {
            var value = _this.store.snapshot(function (factory) { return factory.quoteEdit.data; });
            item.value = value[property] ? value[property] : '';
            return item;
        });
    };
    QuoteEditComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-edit-component',
                    templateUrl: 'quote-edit.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteEditComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return QuoteEditComponent;
}());
exports.QuoteEditComponent = QuoteEditComponent;
//# sourceMappingURL=quote-edit.component.js.map