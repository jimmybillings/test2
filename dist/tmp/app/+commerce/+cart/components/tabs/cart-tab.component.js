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
var platform_browser_1 = require("@angular/platform-browser");
var tab_1 = require("../../../components/tabs/tab");
var wz_pricing_component_1 = require("../../../../shared/components/wz-pricing/wz.pricing.component");
var cart_service_1 = require("../../../../shared/services/cart.service");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var user_preference_service_1 = require("../../../../shared/services/user-preference.service");
var window_ref_service_1 = require("../../../../shared/services/window-ref.service");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var wz_subclip_editor_component_1 = require("../../../../shared/components/wz-subclip-editor/wz.subclip-editor.component");
var app_store_1 = require("../../../../app.store");
var CartTabComponent = (function (_super) {
    __extends(CartTabComponent, _super);
    function CartTabComponent(userCan, cartService, dialogService, window, userPreference, document, store, detector) {
        var _this = _super.call(this) || this;
        _this.userCan = userCan;
        _this.cartService = cartService;
        _this.dialogService = dialogService;
        _this.window = window;
        _this.userPreference = userPreference;
        _this.document = document;
        _this.store = store;
        _this.detector = detector;
        return _this;
    }
    CartTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.preferencesSubscription = this.userPreference.data.subscribe(function (data) {
            _this.pricingPreferences = data.pricingPreferences;
        });
        this.projectSubscription = this.cartService.projects.subscribe(function (projects) {
            _this.projects = projects;
            _this.detector.markForCheck();
        });
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
    };
    CartTabComponent.prototype.ngOnDestroy = function () {
        this.projectSubscription.unsubscribe();
        this.preferencesSubscription.unsubscribe();
    };
    CartTabComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'ADD_PROJECT': {
                this.cartService.addProject();
                break;
            }
            case 'REMOVE_PROJECT': {
                this.cartService.removeProject(message.payload);
                break;
            }
            case 'UPDATE_PROJECT': {
                this.updateProject(message.payload);
                break;
            }
            case 'MOVE_LINE_ITEM': {
                this.cartService.moveLineItemTo(message.payload.otherProject, message.payload.lineItem);
                break;
            }
            case 'CLONE_LINE_ITEM': {
                this.cartService.cloneLineItem(message.payload);
                break;
            }
            case 'REMOVE_LINE_ITEM': {
                this.store.dispatch(function (factory) { return factory.cart.removeAsset(message.payload.asset); });
                break;
            }
            case 'EDIT_LINE_ITEM': {
                this.cartService.editLineItem(message.payload.lineItem, message.payload.fieldToEdit);
                break;
            }
            case 'EDIT_LINE_ITEM_MARKERS': {
                this.editAsset(message.payload);
                break;
            }
            case 'SHOW_PRICING_DIALOG': {
                this.showPricingDialog(message.payload);
                break;
            }
            case 'EDIT_PROJECT_PRICING': {
                this.editProjectPricing(message.payload);
                break;
            }
            case 'ADD_NOTE': {
                this.openNoteDialog(message.payload);
                break;
            }
            case 'REMOVE_NOTE': {
                this.removeNoteFrom(message.payload);
                break;
            }
        }
        ;
    };
    CartTabComponent.prototype.checkout = function () {
        this.goToNextTab();
        this.cartService.getPaymentOptions();
    };
    CartTabComponent.prototype.shouldShowLicenseDetailsBtn = function () {
        return this.userCan.viewLicenseAgreementsButton(this.cartService.hasAssetLineItems);
    };
    Object.defineProperty(CartTabComponent.prototype, "total", {
        get: function () {
            return this.cartService.total;
        },
        enumerable: true,
        configurable: true
    });
    CartTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.cartService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'cart',
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
    Object.defineProperty(CartTabComponent.prototype, "userCanProceed", {
        get: function () {
            return this.rmAssetsHaveAttributes && !this.cartContainsNoAssets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartTabComponent.prototype, "rmAssetsHaveAttributes", {
        get: function () {
            if (this.cartService.state.data.itemCount === 0)
                return true;
            var validAssets = [];
            this.cartService.state.data.projects.forEach(function (project) {
                if (project.lineItems) {
                    project.lineItems.forEach(function (lineItem) {
                        validAssets.push(lineItem.rightsManaged === 'Rights Managed' ? !!lineItem.attributes : true);
                    });
                }
            });
            return validAssets.indexOf(false) === -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartTabComponent.prototype, "showTotal", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.cart.data.total > 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartTabComponent.prototype, "cartContainsNoAssets", {
        get: function () {
            return (this.cartService.state.data.itemCount === 0) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartTabComponent.prototype, "showUsageWarning", {
        get: function () {
            return !this.cartContainsNoAssets && !this.rmAssetsHaveAttributes;
        },
        enumerable: true,
        configurable: true
    });
    CartTabComponent.prototype.editProjectPricing = function (project) {
        var _this = this;
        var preferences = project.attributes ? this.mapAttributesToPreferences(project.attributes) : this.pricingPreferences;
        this.store.dispatch(function (factory) { return factory.pricing.setPriceForDialog(null); });
        this.store.dispatch(function (factory) { return factory.pricing.initializePricing('Rights Managed', _this.projectPricingOptions(preferences, project)); });
    };
    CartTabComponent.prototype.showPricingDialog = function (lineItem) {
        var _this = this;
        var preferences = lineItem.attributes ? this.mapAttributesToPreferences(lineItem.attributes) : this.pricingPreferences;
        this.store.dispatch(function (factory) { return factory.pricing.initializePricing('Rights Managed', _this.lineitemPricingOptions(preferences, lineItem)); });
    };
    CartTabComponent.prototype.mapAttributesToPreferences = function (attributes) {
        if (Array.isArray(attributes)) {
            var mapped_1 = {};
            attributes.forEach(function (attr) {
                mapped_1[attr.priceAttributeName] = attr.selectedAttributeValue;
            });
            delete mapped_1['siteName'];
            return mapped_1;
        }
        else {
            delete attributes['siteName'];
            return attributes;
        }
    };
    CartTabComponent.prototype.projectPricingOptions = function (preferences, project) {
        var _this = this;
        return {
            componentType: wz_pricing_component_1.WzPricingComponent,
            inputOptions: {
                pricingPreferences: preferences,
                userCanCustomizeRights: this.userCan.administerQuotes()
            },
            outputOptions: [
                {
                    event: 'pricingEvent',
                    callback: function (event, dialogRef) {
                        _this.applyProjectPricing(event, dialogRef, project);
                    }
                }
            ]
        };
    };
    CartTabComponent.prototype.applyProjectPricing = function (event, dialogRef, project) {
        switch (event.type) {
            case 'APPLY_PRICE':
                if (event.payload.updatePrefs) {
                    this.userPreference.updatePricingPreferences(event.payload.preferences);
                }
                this.cartService.updateProjectPriceAttributes(event.payload.attributes, project);
                dialogRef.close();
                break;
            case 'ERROR':
                this.store.dispatch(function (factory) { return factory.error.handleCustomError(event.payload); });
                break;
            default:
                break;
        }
    };
    CartTabComponent.prototype.lineitemPricingOptions = function (preferences, lineItem) {
        var _this = this;
        return {
            componentType: wz_pricing_component_1.WzPricingComponent,
            inputOptions: {
                pricingPreferences: preferences,
                userCanCustomizeRights: this.userCan.administerQuotes()
            },
            outputOptions: [
                {
                    event: 'pricingEvent',
                    callback: function (event, dialogRef) {
                        _this.applyPricing(event, dialogRef, lineItem);
                    }
                }
            ]
        };
    };
    CartTabComponent.prototype.applyPricing = function (event, dialogRef, lineItem) {
        var _this = this;
        switch (event.type) {
            case 'CALCULATE_PRICE':
                this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(event.payload, lineItem.asset.assetId, _this.markersFrom(lineItem.asset)); });
                break;
            case 'APPLY_PRICE':
                if (event.payload.updatePrefs) {
                    this.userPreference.updatePricingPreferences(event.payload.preferences);
                }
                this.cartService.editLineItem(lineItem, { pricingAttributes: event.payload.attributes });
                dialogRef.close();
                break;
            case 'ERROR':
                this.store.dispatch(function (factory) { return factory.error.handleCustomError(event.payload); });
                break;
            default:
                break;
        }
    };
    CartTabComponent.prototype.editAsset = function (lineItem) {
        var _this = this;
        this.store.callLegacyServiceMethod(function (service) { return service.asset.getClipPreviewData(lineItem.asset.assetId); })
            .subscribe(function (data) {
            _this.document.body.classList.add('subclipping-edit-open');
            lineItem.asset.clipUrl = data.url;
            _this.dialogService.openComponentInDialog({
                componentType: wz_subclip_editor_component_1.WzSubclipEditorComponent,
                dialogConfig: { width: '530px', position: { top: '14%' } },
                inputOptions: {
                    window: _this.window.nativeWindow,
                    enhancedAsset: lineItem.asset,
                    usagePrice: null
                },
                outputOptions: [
                    {
                        event: 'cancel',
                        callback: function (event) { return true; },
                        closeOnEvent: true
                    },
                    {
                        event: 'save',
                        callback: function (newMarkers) {
                            _this.cartService.editLineItemMarkers(lineItem, newMarkers);
                        },
                        closeOnEvent: true
                    }
                ]
            }).subscribe(function () {
                _this.document.body.classList.remove('subclipping-edit-open');
            });
        });
    };
    CartTabComponent.prototype.updateProject = function (project) {
        var _this = this;
        this.dialogService.openFormDialog(project.items, {
            dialogConfig: { position: { top: '10%' }, disableClose: false },
            title: 'CART.PROJECTS.FORM.TITLE',
            submitLabel: 'CART.PROJECTS.FORM.SUBMIT_LABEL',
            autocomplete: 'off'
        }, function (data) {
            _this.cartService.updateProject(Object.assign(project.project, data));
        });
    };
    CartTabComponent.prototype.calculatePrice = function (attributes, lineItem) {
        var markers = this.markersFrom(lineItem.asset);
        this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(attributes, lineItem.asset.assetId, markers); });
    };
    CartTabComponent.prototype.markersFrom = function (asset) {
        return asset.isSubclipped ? {
            in: asset.inMarkerFrame,
            out: asset.outMarkerFrame
        } : null;
    };
    CartTabComponent.prototype.openNoteDialog = function (lineItem) {
        var _this = this;
        var hasNote = lineItem.hasOwnProperty('notes') &&
            lineItem.notes.length > 0 &&
            lineItem.notes[0].hasOwnProperty('notes') &&
            lineItem.notes[0].notes.length > 0;
        var title = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
        var label = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
        var value = hasNote ? lineItem.notes[0].notes[0] : '';
        this.dialogService.openFormDialog([{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: label, value: value }], { title: title }, function (form) { return _this.store.dispatch(function (factory) { return factory.cart.addNote(form.note, lineItem); }); });
    };
    CartTabComponent.prototype.removeNoteFrom = function (lineItem) {
        var _this = this;
        this.dialogService.openConfirmationDialog({
            title: 'CART.DELETE_NOTES.TITLE',
            message: 'CART.DELETE_NOTES.MESSAGE',
            accept: 'CART.DELETE_NOTES.ACCEPT',
            decline: 'CART.DELETE_NOTES.DECLINE'
        }, function () { return _this.store.dispatch(function (factory) { return factory.cart.removeNoteFrom(lineItem); }); });
    };
    CartTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-tab-component',
                    templateUrl: 'cart-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartTabComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: cart_service_1.CartService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: window_ref_service_1.WindowRef, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return CartTabComponent;
}(tab_1.Tab));
exports.CartTabComponent = CartTabComponent;
//# sourceMappingURL=cart-tab.component.js.map