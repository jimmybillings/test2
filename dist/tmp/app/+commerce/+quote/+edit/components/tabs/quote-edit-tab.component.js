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
var wz_pricing_component_1 = require("../../../../../shared/components/wz-pricing/wz.pricing.component");
var wz_subclip_editor_component_1 = require("../../../../../shared/components/wz-subclip-editor/wz.subclip-editor.component");
var tab_1 = require("../../../../components/tabs/tab");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var wz_dialog_service_1 = require("../../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var capabilities_service_1 = require("../../../../../shared/services/capabilities.service");
var user_preference_service_1 = require("../../../../../shared/services/user-preference.service");
var window_ref_service_1 = require("../../../../../shared/services/window-ref.service");
var commerce_interface_1 = require("../../../../../shared/interfaces/commerce.interface");
var app_store_1 = require("../../../../../app.store");
var QuoteEditTabComponent = (function (_super) {
    __extends(QuoteEditTabComponent, _super);
    function QuoteEditTabComponent(userCan, dialogService, window, userPreference, document, store) {
        var _this = _super.call(this) || this;
        _this.userCan = userCan;
        _this.dialogService = dialogService;
        _this.window = window;
        _this.userPreference = userPreference;
        _this.document = document;
        _this.store = store;
        _this.priceAttributes = null;
        return _this;
    }
    QuoteEditTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.preferencesSubscription = this.userPreference.data.subscribe(function (data) {
            _this.pricingPreferences = data.pricingPreferences;
        });
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
    };
    QuoteEditTabComponent.prototype.ngOnDestroy = function () {
        this.preferencesSubscription.unsubscribe();
    };
    QuoteEditTabComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'ADD_QUOTE_FEE':
                this.store.dispatch(function (factory) { return factory.quoteEdit.addFeeTo(message.payload.project, message.payload.fee); });
                break;
            case 'REMOVE_QUOTE_FEE':
                this.store.dispatch(function (factory) {
                    return factory.quoteEdit.removeFee(message.payload);
                });
                break;
            case 'SHOW_COST_MULTIPLIER_DIALOG':
                this.openCostMultiplierDialog(message.payload);
                break;
            case 'REMOVE_COST_MULTIPLIER':
                this.store.dispatch(function (factory) {
                    return factory.quoteEdit.editLineItem(message.payload, { multiplier: 1 });
                });
                break;
            case 'OPEN_BULK_IMPORT_DIALOG':
                this.onOpenBulkImportDialog(message.payload);
                break;
            case 'ADD_CUSTOM_PRICE':
                this.onAddCustomPriceTo(message.payload);
                break;
            case 'OPEN_DELETE_DIALOG':
            case 'SAVE_AND_NEW':
            case 'CLONE_QUOTE':
                this.notify.emit(message);
                break;
            case 'ADD_PROJECT':
                this.store.dispatch(function (factory) { return factory.quoteEdit.addProject(); });
                break;
            case 'REMOVE_PROJECT':
                this.store.dispatch(function (factory) { return factory.quoteEdit.removeProject(message.payload.id); });
                break;
            case 'UPDATE_PROJECT':
                this.updateProject(message.payload);
                break;
            case 'MOVE_LINE_ITEM':
                this.store.dispatch(function (factory) {
                    return factory.quoteEdit.moveLineItem(message.payload.otherProject, message.payload.lineItem);
                });
                break;
            case 'CLONE_LINE_ITEM':
                this.store.dispatch(function (factory) { return factory.quoteEdit.cloneLineItem(message.payload); });
                break;
            case 'REMOVE_LINE_ITEM':
                this.store.dispatch(function (factory) { return factory.quoteEdit.removeAsset(message.payload.asset); });
                break;
            case 'EDIT_LINE_ITEM':
                this.store.dispatch(function (factory) {
                    return factory.quoteEdit.editLineItem(message.payload.lineItem, message.payload.fieldToEdit);
                });
                break;
            case 'EDIT_LINE_ITEM_MARKERS':
                this.editLineItemMarkers(message.payload);
                break;
            case 'SHOW_PRICING_DIALOG':
                this.showPricingDialog(message.payload);
                break;
            case 'EDIT_PROJECT_PRICING':
                this.editProjectPricing(message.payload);
                break;
            case 'ADD_NOTE':
                this.openNoteDialog(message.payload);
                break;
            case 'REMOVE_NOTE':
                this.removeNoteFrom(message.payload);
                break;
            case 'GO_TO_NEXT_TAB':
                this.goToNextTab();
                break;
        }
        ;
    };
    Object.defineProperty(QuoteEditTabComponent.prototype, "quoteType", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteEdit.data.purchaseType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "showUsageWarning", {
        get: function () {
            return !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType) && (this.quoteContainsAssets && !this.rmAssetsHaveRightsPackage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "userCanProceed", {
        get: function () {
            if (this.quoteOnlyHasFeeItems)
                return commerce_interface_1.quotesAllowedToHaveFeesOnly.includes(this.quoteType);
            if (commerce_interface_1.quotesWithoutPricing.includes(this.quoteType))
                return this.quoteHasItems;
            return this.quoteHasItems && this.rmAssetsHaveRightsPackage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "quoteHasItems", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteEdit.data.projects || []; })
                .every(function (project) {
                return (project.hasOwnProperty('lineItems') && project.lineItems.length > 0) ||
                    (project.hasOwnProperty('feeLineItems') && project.feeLineItems.length > 0);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "quoteContainsAssets", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteEdit.data.projects || []; })
                .every(function (project) { return project.hasOwnProperty('lineItems'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "total", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.total; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "subTotal", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.subTotal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "discount", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.discount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "showTotal", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.total > 0; }) &&
                !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "showDiscount", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.discount > 0; }) &&
                !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "shouldShowCloneButton", {
        get: function () {
            return this.userCan.cloneQuote(this.store.select(function (state) { return state.quoteEdit; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "purchaseTypeConfig", {
        get: function () {
            return this.config.quotePurchaseType.items;
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditTabComponent.prototype.onSelectQuoteType = function (event) {
        this.store.dispatch(function (factory) { return factory.quoteEdit.updateQuoteField(event); });
    };
    Object.defineProperty(QuoteEditTabComponent.prototype, "rmAssetsHaveRightsPackage", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteEdit.data.projects || []; })
                .every(function (project) { return (project.lineItems || []).every(function (lineItem) {
                return lineItem.rightsManaged !== 'Rights Managed' || lineItem.hasOwnProperty('attributes');
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditTabComponent.prototype, "quoteOnlyHasFeeItems", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteEdit.data.projects || []; })
                .every(function (project) {
                return project.hasOwnProperty('feeLineItems') && !project.hasOwnProperty('lineItems');
            });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditTabComponent.prototype.onOpenBulkImportDialog = function (projectId) {
        var _this = this;
        this.dialogService.openFormDialog(this.config.bulkImport.items, { title: 'QUOTE.BULK_IMPORT.TITLE', submitLabel: 'QUOTE.BULK_IMPORT.SUBMIT_BTN', autocomplete: 'off' }, function (rawAssets) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.bulkImport(rawAssets, projectId); });
        });
    };
    QuoteEditTabComponent.prototype.onAddCustomPriceTo = function (lineItem) {
        var _this = this;
        this.dialogService.openFormDialog([{
                name: 'price',
                label: 'Price',
                value: String(lineItem.grossAssetPrice),
                type: 'number',
                min: '0',
                validation: 'GREATER_THAN'
            }], { title: 'QUOTE.ADD_CUSTOM_PRICE_TITLE', submitLabel: 'QUOTE.ADD_CUSTOM_PRICE_SUBMIT', autocomplete: 'off' }, function (form) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.addCustomPriceToLineItem(lineItem, form.price); });
        });
    };
    QuoteEditTabComponent.prototype.updateProject = function (project) {
        var _this = this;
        this.dialogService.openFormDialog(project.items, {
            dialogConfig: { position: { top: '10%' }, disableClose: false },
            title: 'CART.PROJECTS.FORM.TITLE',
            submitLabel: 'CART.PROJECTS.FORM.SUBMIT_LABEL',
            autocomplete: 'off'
        }, function (data) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.updateProject(Object.assign(project.project, data)); });
        });
    };
    QuoteEditTabComponent.prototype.editLineItemMarkers = function (lineItem) {
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
                            _this.store.dispatch(function (factory) {
                                return factory.quoteEdit.editLineItemMarkers(lineItem, newMarkers);
                            });
                        },
                        closeOnEvent: true
                    }
                ]
            }).subscribe(function () {
                _this.document.body.classList.remove('subclipping-edit-open');
            });
        });
    };
    QuoteEditTabComponent.prototype.editProjectPricing = function (project) {
        var _this = this;
        var preferences = project.attributes ? this.mapAttributesToPreferences(project.attributes) : this.pricingPreferences;
        this.store.dispatch(function (factory) { return factory.pricing.setPriceForDialog(null); });
        this.store.dispatch(function (factory) { return factory.pricing.initializePricing('Rights Managed', _this.projectPricingOptions(preferences, project)); });
    };
    QuoteEditTabComponent.prototype.projectPricingOptions = function (preferences, project) {
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
    QuoteEditTabComponent.prototype.showPricingDialog = function (lineItem) {
        var _this = this;
        var preferences = lineItem.attributes ? this.mapAttributesToPreferences(lineItem.attributes) : this.pricingPreferences;
        this.store.dispatch(function (factory) { return factory.pricing.initializePricing('Rights Managed', _this.lineitemPricingOptions(preferences, lineItem)); });
    };
    QuoteEditTabComponent.prototype.lineitemPricingOptions = function (preferences, lineItem) {
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
    QuoteEditTabComponent.prototype.openProjectPricingDialog = function (priceAttributes, preferences, project) {
        var _this = this;
        this.dialogService.openComponentInDialog({
            componentType: wz_pricing_component_1.WzPricingComponent,
            inputOptions: {
                attributes: priceAttributes,
                pricingPreferences: preferences,
                usagePrice: null
            },
            outputOptions: [
                {
                    event: 'pricingEvent',
                    callback: function (event, dialogRef) {
                        _this.applyProjectPricing(event, dialogRef, project);
                    }
                }
            ]
        });
    };
    QuoteEditTabComponent.prototype.applyProjectPricing = function (event, dialogRef, project) {
        switch (event.type) {
            case 'APPLY_PRICE':
                this.store.dispatch(function (factory) {
                    return factory.quoteEdit.updateProjectPriceAttributes(event.payload.attributes, project);
                });
                if (event.payload.updatePrefs) {
                    this.userPreference.updatePricingPreferences(event.payload.preferences);
                }
                dialogRef.close();
                break;
            case 'ERROR':
                this.store.dispatch(function (factory) { return factory.error.handleCustomError(event.payload); });
                break;
            default:
                break;
        }
    };
    QuoteEditTabComponent.prototype.applyPricing = function (event, dialogRef, lineItem) {
        var _this = this;
        switch (event.type) {
            case 'CALCULATE_PRICE':
                this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(event.payload, lineItem.asset.assetId, _this.markersFrom(lineItem.asset)); });
                break;
            case 'APPLY_PRICE':
                if (event.payload.updatePrefs) {
                    this.userPreference.updatePricingPreferences(event.payload.preferences);
                }
                this.store.dispatch(function (factory) { return factory.quoteEdit.editLineItem(lineItem, { pricingAttributes: event.payload.attributes }); });
                dialogRef.close();
                break;
            case 'ERROR':
                this.store.dispatch(function (factory) { return factory.error.handleCustomError(event.payload); });
                break;
            default:
                break;
        }
    };
    QuoteEditTabComponent.prototype.mapAttributesToPreferences = function (attributes) {
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
    QuoteEditTabComponent.prototype.openCostMultiplierDialog = function (lineItem) {
        var _this = this;
        this.dialogService.openFormDialog(this.costMultiplierFormItems(lineItem), { title: this.costMultiplierFormTitle(lineItem), submitLabel: this.costMultiplierFormSubmitLabel(lineItem) }, function (result) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.editLineItem(lineItem, result); });
        });
    };
    QuoteEditTabComponent.prototype.costMultiplierFormItems = function (lineItem) {
        return lineItem.multiplier > 1 ?
            [Object.assign({}, this.config.addCostMultiplier.items[0], { value: lineItem.multiplier })] :
            this.config.addCostMultiplier.items;
    };
    QuoteEditTabComponent.prototype.costMultiplierFormTitle = function (lineItem) {
        return lineItem.multiplier > 1 ? 'QUOTE.EDIT_MULTIPLIER_TITLE' : 'QUOTE.ADD_MULTIPLIER_TITLE';
    };
    QuoteEditTabComponent.prototype.costMultiplierFormSubmitLabel = function (lineItem) {
        return lineItem.multiplier > 1 ? 'QUOTE.EDIT_MULTIPLIER_FORM_SUBMIT' : 'QUOTE.ADD_MULTIPLIER_FORM_SUBMIT';
    };
    QuoteEditTabComponent.prototype.markersFrom = function (asset) {
        return asset.isSubclipped ? {
            in: asset.inMarkerFrame,
            out: asset.outMarkerFrame
        } : null;
    };
    QuoteEditTabComponent.prototype.calculatePrice = function (attributes, lineItem) {
        var markers = this.markersFrom(lineItem.asset);
        this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(attributes, lineItem.asset.assetId, markers); });
    };
    QuoteEditTabComponent.prototype.openNoteDialog = function (lineItem) {
        var _this = this;
        var hasNote = lineItem.hasOwnProperty('notes') &&
            lineItem.notes.length > 0 &&
            lineItem.notes[0].hasOwnProperty('notes') &&
            lineItem.notes[0].notes.length > 0;
        var title = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
        var label = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
        var value = hasNote ? lineItem.notes[0].notes[0] : '';
        this.dialogService.openFormDialog([{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: label, value: value }], { title: title }, function (form) { return _this.store.dispatch(function (factory) { return factory.quoteEdit.addNote(form.note, lineItem); }); });
    };
    QuoteEditTabComponent.prototype.removeNoteFrom = function (lineItem) {
        var _this = this;
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.DELETE_NOTES.TITLE',
            message: 'QUOTE.DELETE_NOTES.MESSAGE',
            accept: 'QUOTE.DELETE_NOTES.ACCEPT',
            decline: 'QUOTE.DELETE_NOTES.DECLINE'
        }, function () { return _this.store.dispatch(function (factory) { return factory.quoteEdit.removeNoteFrom(lineItem); }); });
    };
    QuoteEditTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-edit-tab-component',
                    templateUrl: 'quote-edit-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteEditTabComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: window_ref_service_1.WindowRef, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
        { type: app_store_1.AppStore, },
    ]; };
    QuoteEditTabComponent.propDecorators = {
        'projects': [{ type: core_1.Input },],
    };
    return QuoteEditTabComponent;
}(tab_1.Tab));
exports.QuoteEditTabComponent = QuoteEditTabComponent;
//# sourceMappingURL=quote-edit-tab.component.js.map