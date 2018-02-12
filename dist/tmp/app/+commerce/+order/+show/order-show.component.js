"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var window_ref_service_1 = require("../../../shared/services/window-ref.service");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var OrderShowComponent = (function () {
    function OrderShowComponent(window, store) {
        this.window = window;
        this.store = store;
        this.noteVisibilityMap = {};
        this.orderObservable = this.store.select(function (state) { return state.order.activeOrder; })
            .map(function (currentOrder) {
            var order = common_functions_1.Common.clone(currentOrder);
            order.projects = order.projects.map(function (project) {
                if (project.lineItems) {
                    project.lineItems = project.lineItems.map(function (lineItem) {
                        lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'order', order.id);
                        return lineItem;
                    });
                }
                return project;
            });
            return order;
        });
    }
    OrderShowComponent.prototype.download = function (url) {
        this.window.nativeWindow.location.href = url;
    };
    OrderShowComponent.prototype.assetCountLabelKeyFor = function (count) {
        switch (count) {
            case 0: return 'ORDER.SHOW.PROJECTS.NO_ASSETS';
            case 1: return 'ORDER.SHOW.PROJECTS.ONLY_ONE_ASSET';
            default: return 'ORDER.SHOW.PROJECTS.MORE_THAN_ONE_ASSET';
        }
    };
    OrderShowComponent.prototype.isRefundedLineItem = function (lineItem) {
        return lineItem.price < 0;
    };
    OrderShowComponent.prototype.isRefundedProject = function (project) {
        return !!project.creditMemoForProjectId;
    };
    OrderShowComponent.prototype.isRefundedOrder = function (order) {
        return !!order.creditMemoForOrderId;
    };
    OrderShowComponent.prototype.shouldShowPaymentBalanceFor = function (item) {
        return !!item.paymentDueDate && !!item.paymentBalance && item.paymentBalance > 0;
    };
    OrderShowComponent.prototype.shouldShowDiscountFor = function (order) {
        return (order.discount || 0) > 0 && !order.creditMemoForOrderId;
    };
    OrderShowComponent.prototype.offlineAgreementIdsFor = function (order) {
        var ids = [];
        order.projects.forEach(function (project) { return project.lineItems.forEach(function (lineItem) {
            if (lineItem.externalAgreementIds)
                lineItem.externalAgreementIds.forEach(function (id) { return ids.push(id); });
        }); });
        return ids.filter(function (id, index, ids) { return id !== ids[index - 1]; }).join(', ');
    };
    OrderShowComponent.prototype.shouldDisplayRights = function (lineItem, order) {
        return lineItem.rightsManaged === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(order.orderType);
    };
    OrderShowComponent.prototype.showDownloadButtonFor = function (lineItem) {
        return !!lineItem.downloadUrl;
    };
    OrderShowComponent.prototype.nothingToDownload = function (lineItem) {
        return !lineItem.downloadUrl && lineItem.transcodeStatus === 'Completed';
    };
    OrderShowComponent.prototype.showSpinnerIcon = function (lineItem) {
        return lineItem.transcodeStatus === 'Submitted';
    };
    OrderShowComponent.prototype.showAsperaButtonFor = function (lineItem) {
        return lineItem.transcodeStatus === 'Completed' && !!lineItem.asperaSpec;
    };
    OrderShowComponent.prototype.iconForNotesButton = function (lineItem) {
        return this.noteVisibilityMap[lineItem.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    };
    OrderShowComponent.prototype.toggleNotesVisibilityFor = function (lineItem) {
        this.noteVisibilityMap[lineItem.id] = !this.noteVisibilityMap[lineItem.id];
    };
    OrderShowComponent.prototype.hasNotes = function (lineItem) {
        return lineItem.hasOwnProperty('notes') &&
            lineItem.notes.length > 0 &&
            lineItem.notes[0].hasOwnProperty('notes') &&
            lineItem.notes[0].notes.length > 0;
    };
    OrderShowComponent.prototype.shouldShowNoteFor = function (lineItem) {
        return this.hasNotes(lineItem) && !!this.noteVisibilityMap[lineItem.id];
    };
    OrderShowComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'order-show-component',
                    templateUrl: 'order-show.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    OrderShowComponent.ctorParameters = function () { return [
        { type: window_ref_service_1.WindowRef, },
        { type: app_store_1.AppStore, },
    ]; };
    return OrderShowComponent;
}());
exports.OrderShowComponent = OrderShowComponent;
//# sourceMappingURL=order-show.component.js.map