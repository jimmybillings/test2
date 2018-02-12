"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../components/license-agreement/license-agreement.component");
var InvoiceComponent = (function () {
    function InvoiceComponent(store, route, dialogService) {
        this.store = store;
        this.route = route;
        this.dialogService = dialogService;
        this.isShared = this.route.params.map(function (params) { return !!params['share_key']; });
        this.invoiceObservable = this.store.select(function (state) { return state.invoice.invoice; })
            .map(function (currentInvoice) {
            var invoice = common_functions_1.Common.clone(currentInvoice);
            invoice.order.projects = invoice.order.projects.map(function (project) {
                if (project.lineItems) {
                    project.lineItems = project.lineItems.map(function (lineItem) {
                        lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'order', invoice.order.id);
                        return lineItem;
                    });
                }
                return project;
            });
            return invoice;
        });
    }
    InvoiceComponent.prototype.hasProp = function (obj) {
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        if (props.length > 0) {
            if (obj && obj.hasOwnProperty(props[0])) {
                if (obj[props[0]] === '' || obj[props[0]] === 0 || JSON.stringify(obj[props[0]]) === JSON.stringify({})) {
                    return false;
                }
                else {
                    var prop = props.shift();
                    return this.hasProp.apply(this, [obj[prop]].concat(props));
                }
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    InvoiceComponent.prototype.shouldDisplayRights = function (lineItem, invoice) {
        return lineItem.rightsManaged === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(invoice.order.orderType);
    };
    InvoiceComponent.prototype.shouldShowLicenseDetailsBtn = function (licenseAgreements) {
        return !!licenseAgreements.items;
    };
    InvoiceComponent.prototype.showLicenseAgreements = function (licenseAgreements) {
        this.dialogService.openComponentInDialog({
            componentType: license_agreement_component_1.LicenseAgreementComponent,
            dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
            inputOptions: {
                assetType: 'order',
                licenses: licenseAgreements
            },
            outputOptions: [
                {
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }
            ]
        });
    };
    InvoiceComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'invoice-component',
                    templateUrl: 'invoice.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    InvoiceComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: router_1.ActivatedRoute, },
        { type: wz_dialog_service_1.WzDialogService, },
    ]; };
    return InvoiceComponent;
}());
exports.InvoiceComponent = InvoiceComponent;
//# sourceMappingURL=invoice.component.js.map