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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        var formFields = [
            {
                name: 'price',
                label: 'QUOTE.PRICE_LABEL',
                type: 'number',
                min: '0',
                validation: 'GREATER_THAN',
                value: (lineItem.price > 0) ? lineItem.price : null
            }, {
                name: 'priceLock',
                label: 'QUOTE.PRICE_LOCK_LABEL',
                type: 'slideToggle',
                value: (!!lineItem.overrideGrossAssetPrice) ? 'true' : ''
            }
        ];
        this.dialogService.openFormDialog(formFields, { title: 'QUOTE.ADD_CUSTOM_PRICE_TITLE', submitLabel: 'QUOTE.ADD_CUSTOM_PRICE_SUBMIT', autocomplete: 'off' }, function (form) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.addCustomPriceToLineItem(lineItem, form.price, Boolean(form.priceLock)); });
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], QuoteEditTabComponent.prototype, "projects", void 0);
    QuoteEditTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-edit-tab-component',
            templateUrl: 'quote-edit-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(4, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            wz_dialog_service_1.WzDialogService,
            window_ref_service_1.WindowRef,
            user_preference_service_1.UserPreferenceService, Object, app_store_1.AppStore])
    ], QuoteEditTabComponent);
    return QuoteEditTabComponent;
}(tab_1.Tab));
exports.QuoteEditTabComponent = QuoteEditTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EseUdBQXNHO0FBQ3RHLDhIQUEwSDtBQUMxSCx1REFBc0Q7QUFDdEQsc0NBQXFHO0FBQ3JHLDhEQUFxRDtBQUNyRCx3R0FBcUc7QUFDckcsNEZBQW1GO0FBQ25GLGtHQUErRjtBQUMvRix3RkFBOEU7QUFDOUUsMEZBRTZEO0FBRzdELHNEQUFvRDtBQVlwRDtJQUEyQyx5Q0FBRztJQU81QywrQkFDUyxPQUFxQixFQUNyQixhQUE4QixFQUM5QixNQUFpQixFQUNqQixjQUFxQyxFQUNuQixRQUFhLEVBQzVCLEtBQWU7UUFOM0IsWUFRRSxpQkFBTyxTQUNSO1FBUlEsYUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixtQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDbkIsY0FBUSxHQUFSLFFBQVEsQ0FBSztRQUM1QixXQUFLLEdBQUwsS0FBSyxDQUFVO1FBVnBCLHFCQUFlLEdBQTBCLElBQUksQ0FBQzs7SUFhckQsQ0FBQztJQUVNLHdDQUFRLEdBQWY7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFTO1lBQzFFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFB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QyxLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQTFDLENBQTBDLENBQUMsRUFBMUUsQ0FBMEUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUEvZFE7UUFBUixZQUFLLEVBQUU7OzJEQUFxQjtJQUpsQixxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztRQWFHLFdBQUEsYUFBTSxDQUFDLDJCQUFRLENBQUMsQ0FBQTt5Q0FKRCxtQ0FBWTtZQUNOLG1DQUFlO1lBQ3RCLDhCQUFTO1lBQ0QsK0NBQXFCLFVBRTNCLG9CQUFRO09BYmhCLHFCQUFxQixDQW9lakM7SUFBRCw0QkFBQztDQXBlRCxBQW9lQyxDQXBlMEMsU0FBRyxHQW9lN0M7QUFwZVksc0RBQXFCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9pbnRlcmZhY2VzL3d6LmRpYWxvZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IGVuaGFuY2VBc3NldCwgRW5oYW5jZWRBc3NldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IFd6UHJpY2luZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3d6LXByaWNpbmcvd3oucHJpY2luZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvd3otc3ViY2xpcC1lZGl0b3Ivd3ouc3ViY2xpcC1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkRlc3Ryb3ksIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJQcmVmZXJlbmNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXByZWZlcmVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEFzc2V0TGluZUl0ZW0sIFB1cmNoYXNlVHlwZSwgUHJpY2VBdHRyaWJ1dGUsIFByb2plY3QsIHF1b3Rlc1dpdGhvdXRQcmljaW5nLCBxdW90ZXNBbGxvd2VkVG9IYXZlRmVlc09ubHlcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvam8sIFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGUsIFd6RXZlbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1GaWVsZHMsIE1kU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0ICogYXMgU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncXVvdGUtZWRpdC10YWItY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdxdW90ZS1lZGl0LXRhYi5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUXVvdGVFZGl0VGFiQ29tcG9uZW50IGV4dGVuZHMgVGFiIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgY29uZmlnOiBQb2pvO1xuICBwdWJsaWMgcHJpY2luZ1ByZWZlcmVuY2VzOiBQb2pvO1xuICBwdWJsaWMgcHJpY2VBdHRyaWJ1dGVzOiBBcnJheTxQcmljZUF0dHJpYnV0ZT4gPSBudWxsO1xuICBASW5wdXQoKSBwcm9qZWN0czogUHJvamVjdFtdO1xuICBwcml2YXRlIHByZWZlcmVuY2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHVzZXJDYW46IENhcGFiaWxpdGllcyxcbiAgICBwdWJsaWMgZGlhbG9nU2VydmljZTogV3pEaWFsb2dTZXJ2aWNlLFxuICAgIHB1YmxpYyB3aW5kb3c6IFdpbmRvd1JlZixcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwdWJsaWMgZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IEFwcFN0b3JlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucHJlZmVyZW5jZXNTdWJzY3JpcHRpb24gPSB0aGlzLnVzZXJQcmVmZXJlbmNlLmRhdGEuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucHJpY2luZ1ByZWZlcmVuY2VzID0gZGF0YS5wcmljaW5nUHJlZmVyZW5jZXM7XG4gICAgfSk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMuY2FydC5jb25maWcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wcmVmZXJlbmNlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKG1lc3NhZ2U6IFd6RXZlbnQpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuXG4gICAgICBjYXNlICdBRERfUVVPVEVfRkVFJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZEZlZVRvKFxuICAgICAgICAgIG1lc3NhZ2UucGF5bG9hZC5wcm9qZWN0LFxuICAgICAgICAgIG1lc3NhZ2UucGF5bG9hZC5mZWVcbiAgICAgICAgKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdSRU1PVkVfUVVPVEVfRkVFJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVtb3ZlRmVlKG1lc3NhZ2UucGF5bG9hZClcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ1NIT1dfQ09TVF9NVUxUSVBMSUVSX0RJQUxPRyc6XG4gICAgICAgIHRoaXMub3BlbkNvc3RNdWx0aXBsaWVyRGlhbG9nKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdSRU1PVkVfQ09TVF9NVUxUSVBMSUVSJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQuZWRpdExpbmVJdGVtKG1lc3NhZ2UucGF5bG9hZCwgeyBtdWx0aXBsaWVyOiAxIH0pXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdPUEVOX0JVTEtfSU1QT1JUX0RJQUxPRyc6XG4gICAgICAgIHRoaXMub25PcGVuQnVsa0ltcG9ydERpYWxvZyhtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnQUREX0NVU1RPTV9QUklDRSc6XG4gICAgICAgIHRoaXMub25BZGRDdXN0b21QcmljZVRvKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdPUEVOX0RFTEVURV9ESUFMT0cnOlxuICAgICAgY2FzZSAnU0FWRV9BTkRfTkVXJzpcbiAgICAgIGNhc2UgJ0NMT05FX1FVT1RFJzpcbiAgICAgICAgdGhpcy5ub3RpZnkuZW1pdChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0FERF9QUk9KRUNUJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZFByb2plY3QoKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdSRU1PVkVfUFJPSkVDVCc6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5yZW1vdmVQcm9qZWN0KG1lc3NhZ2UucGF5bG9hZC5pZCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnVVBEQVRFX1BST0pFQ1QnOlxuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3QobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ01PVkVfTElORV9JVEVNJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQubW92ZUxpbmVJdGVtKG1lc3NhZ2UucGF5bG9hZC5vdGhlclByb2plY3QsIG1lc3NhZ2UucGF5bG9hZC5saW5lSXRlbSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0NMT05FX0xJTkVfSVRFTSc6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5jbG9uZUxpbmVJdGVtKG1lc3NhZ2UucGF5bG9hZCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnUkVNT1ZFX0xJTkVfSVRFTSc6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5yZW1vdmVBc3NldChtZXNzYWdlLnBheWxvYWQuYXNzZXQpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0VESVRfTElORV9JVEVNJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQuZWRpdExpbmVJdGVtKG1lc3NhZ2UucGF5bG9hZC5saW5lSXRlbSwgbWVzc2FnZS5wYXlsb2FkLmZpZWxkVG9FZGl0KVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnRURJVF9MSU5FX0lURU1fTUFSS0VSUyc6XG4gICAgICAgIHRoaXMuZWRpdExpbmVJdGVtTWFya2VycyhtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnU0hPV19QUklDSU5HX0RJQUxPRyc6XG4gICAgICAgIHRoaXMuc2hvd1ByaWNpbmdEaWFsb2cobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0VESVRfUFJPSkVDVF9QUklDSU5HJzpcbiAgICAgICAgdGhpcy5lZGl0UHJvamVjdFByaWNpbmcobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0FERF9OT1RFJzpcbiAgICAgICAgdGhpcy5vcGVuTm90ZURpYWxvZyhtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnUkVNT1ZFX05PVEUnOlxuICAgICAgICB0aGlzLnJlbW92ZU5vdGVGcm9tKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdHT19UT19ORVhUX1RBQic6XG4gICAgICAgIHRoaXMuZ29Ub05leHRUYWIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVvdGVUeXBlKCk6IFB1cmNoYXNlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEucHVyY2hhc2VUeXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1VzYWdlV2FybmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKHRoaXMucXVvdGVUeXBlKSAmJiAodGhpcy5xdW90ZUNvbnRhaW5zQXNzZXRzICYmICF0aGlzLnJtQXNzZXRzSGF2ZVJpZ2h0c1BhY2thZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldCB1c2VyQ2FuUHJvY2VlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5xdW90ZU9ubHlIYXNGZWVJdGVtcykgcmV0dXJuIHF1b3Rlc0FsbG93ZWRUb0hhdmVGZWVzT25seS5pbmNsdWRlcyh0aGlzLnF1b3RlVHlwZSk7XG4gICAgaWYgKHF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKHRoaXMucXVvdGVUeXBlKSkgcmV0dXJuIHRoaXMucXVvdGVIYXNJdGVtcztcbiAgICByZXR1cm4gdGhpcy5xdW90ZUhhc0l0ZW1zICYmIHRoaXMucm1Bc3NldHNIYXZlUmlnaHRzUGFja2FnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVvdGVIYXNJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5wcm9qZWN0cyB8fCBbXSlcbiAgICAgIC5ldmVyeSgocHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gKHByb2plY3QuaGFzT3duUHJvcGVydHkoJ2xpbmVJdGVtcycpICYmIHByb2plY3QubGluZUl0ZW1zLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgKHByb2plY3QuaGFzT3duUHJvcGVydHkoJ2ZlZUxpbmVJdGVtcycpICYmIHByb2plY3QuZmVlTGluZUl0ZW1zLmxlbmd0aCA+IDApO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHF1b3RlQ29udGFpbnNBc3NldHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEucHJvamVjdHMgfHwgW10pXG4gICAgICAuZXZlcnkoKHByb2plY3Q6IFByb2plY3QpID0+IHByb2plY3QuaGFzT3duUHJvcGVydHkoJ2xpbmVJdGVtcycpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG90YWwoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEudG90YWwpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWJUb3RhbCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5zdWJUb3RhbCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRpc2NvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmRpc2NvdW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1RvdGFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNuYXBzaG90KGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZGF0YS50b3RhbCA+IDApICYmXG4gICAgICAhcXVvdGVzV2l0aG91dFByaWNpbmcuaW5jbHVkZXModGhpcy5xdW90ZVR5cGUpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93RGlzY291bnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3QoZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5kYXRhLmRpc2NvdW50ID4gMCkgJiZcbiAgICAgICFxdW90ZXNXaXRob3V0UHJpY2luZy5pbmNsdWRlcyh0aGlzLnF1b3RlVHlwZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3VsZFNob3dDbG9uZUJ1dHRvbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmNsb25lUXVvdGUodGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHB1cmNoYXNlVHlwZUNvbmZpZygpOiBNZFNlbGVjdE9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucXVvdGVQdXJjaGFzZVR5cGUuaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RRdW90ZVR5cGUoZXZlbnQ6IHsgcHVyY2hhc2VUeXBlOiBQdXJjaGFzZVR5cGUgfSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVRdW90ZUZpZWxkKGV2ZW50KSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJtQXNzZXRzSGF2ZVJpZ2h0c1BhY2thZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEucHJvamVjdHMgfHwgW10pXG4gICAgICAuZXZlcnkoKHByb2plY3Q6IFByb2plY3QpID0+IChwcm9qZWN0LmxpbmVJdGVtcyB8fCBbXSkuZXZlcnkoKGxpbmVJdGVtOiBQb2pvKSA9PlxuICAgICAgICBsaW5lSXRlbS5yaWdodHNNYW5hZ2VkICE9PSAnUmlnaHRzIE1hbmFnZWQnIHx8IGxpbmVJdGVtLmhhc093blByb3BlcnR5KCdhdHRyaWJ1dGVzJylcbiAgICAgICkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcXVvdGVPbmx5SGFzRmVlSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEucHJvamVjdHMgfHwgW10pXG4gICAgICAuZXZlcnkoKHByb2plY3Q6IFByb2plY3QpID0+XG4gICAgICAgIHByb2plY3QuaGFzT3duUHJvcGVydHkoJ2ZlZUxpbmVJdGVtcycpICYmICFwcm9qZWN0Lmhhc093blByb3BlcnR5KCdsaW5lSXRlbXMnKVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25PcGVuQnVsa0ltcG9ydERpYWxvZyhwcm9qZWN0SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIHRoaXMuY29uZmlnLmJ1bGtJbXBvcnQuaXRlbXMsXG4gICAgICB7IHRpdGxlOiAnUVVPVEUuQlVMS19JTVBPUlQuVElUTEUnLCBzdWJtaXRMYWJlbDogJ1FVT1RFLkJVTEtfSU1QT1JULlNVQk1JVF9CVE4nLCBhdXRvY29tcGxldGU6ICdvZmYnIH0sXG4gICAgICAocmF3QXNzZXRzOiB7IGxpbmVJdGVtQXR0cmlidXRlczogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmJ1bGtJbXBvcnQocmF3QXNzZXRzLCBwcm9qZWN0SWQpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkFkZEN1c3RvbVByaWNlVG8obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICBsZXQgZm9ybUZpZWxkczogYW55ID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiAncHJpY2UnLFxuICAgICAgICBsYWJlbDogJ1FVT1RFLlBSSUNFX0xBQkVMJyxcbiAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogJzAnLFxuICAgICAgICB2YWxpZGF0aW9uOiAnR1JFQVRFUl9USEFOJyxcbiAgICAgICAgdmFsdWU6IChsaW5lSXRlbS5wcmljZSA+IDApID8gbGluZUl0ZW0ucHJpY2UgOiBudWxsXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdwcmljZUxvY2snLFxuICAgICAgICBsYWJlbDogJ1FVT1RFLlBSSUNFX0xPQ0tfTEFCRUwnLFxuICAgICAgICB0eXBlOiAnc2xpZGVUb2dnbGUnLFxuICAgICAgICB2YWx1ZTogKCEhbGluZUl0ZW0ub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UpID8gJ3RydWUnIDogJydcbiAgICAgIH1dO1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIGZvcm1GaWVsZHMsXG4gICAgICB7IHRpdGxlOiAnUVVPVEUuQUREX0NVU1RPTV9QUklDRV9USVRMRScsIHN1Ym1pdExhYmVsOiAnUVVPVEUuQUREX0NVU1RPTV9QUklDRV9TVUJNSVQnLCBhdXRvY29tcGxldGU6ICdvZmYnIH0sXG4gICAgICAoZm9ybTogeyBwcmljZTogbnVtYmVyLCBwcmljZUxvY2s6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5hZGRDdXN0b21QcmljZVRvTGluZUl0ZW0obGluZUl0ZW0sIGZvcm0ucHJpY2UsIEJvb2xlYW4oZm9ybS5wcmljZUxvY2spKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKFxuICAgICAgcHJvamVjdC5pdGVtcyxcbiAgICAgIHtcbiAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSwgZGlzYWJsZUNsb3NlOiBmYWxzZSB9LFxuICAgICAgICB0aXRsZTogJ0NBUlQuUFJPSkVDVFMuRk9STS5USVRMRScsXG4gICAgICAgIHN1Ym1pdExhYmVsOiAnQ0FSVC5QUk9KRUNUUy5GT1JNLlNVQk1JVF9MQUJFTCcsXG4gICAgICAgIGF1dG9jb21wbGV0ZTogJ29mZidcbiAgICAgIH0sXG4gICAgICAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVQcm9qZWN0KE9iamVjdC5hc3NpZ24ocHJvamVjdC5wcm9qZWN0LCBkYXRhKSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVkaXRMaW5lSXRlbU1hcmtlcnMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pIHtcbiAgICB0aGlzLnN0b3JlLmNhbGxMZWdhY3lTZXJ2aWNlTWV0aG9kKHNlcnZpY2UgPT4gc2VydmljZS5hc3NldC5nZXRDbGlwUHJldmlld0RhdGEobGluZUl0ZW0uYXNzZXQuYXNzZXRJZCkpXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc3ViY2xpcHBpbmctZWRpdC1vcGVuJyk7XG4gICAgICAgIGxpbmVJdGVtLmFzc2V0LmNsaXBVcmwgPSBkYXRhLnVybDtcbiAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBXelN1YmNsaXBFZGl0b3JDb21wb25lbnQsXG4gICAgICAgICAgICBkaWFsb2dDb25maWc6IHsgd2lkdGg6ICc1MzBweCcsIHBvc2l0aW9uOiB7IHRvcDogJzE0JScgfSB9LFxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHdpbmRvdzogdGhpcy53aW5kb3cubmF0aXZlV2luZG93LFxuICAgICAgICAgICAgICBlbmhhbmNlZEFzc2V0OiBsaW5lSXRlbS5hc3NldCxcbiAgICAgICAgICAgICAgdXNhZ2VQcmljZTogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3NhdmUnLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAobmV3TWFya2VyczogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PlxuICAgICAgICAgICAgICAgICAgICBmYWN0b3J5LnF1b3RlRWRpdC5lZGl0TGluZUl0ZW1NYXJrZXJzKGxpbmVJdGVtLCBuZXdNYXJrZXJzKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3N1YmNsaXBwaW5nLWVkaXQtb3BlbicpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlZGl0UHJvamVjdFByaWNpbmcocHJvamVjdDogUHJvamVjdCkge1xuICAgIGxldCBwcmVmZXJlbmNlczogUG9qbyA9IHByb2plY3QuYXR0cmlidXRlcyA/IHRoaXMubWFwQXR0cmlidXRlc1RvUHJlZmVyZW5jZXMocHJvamVjdC5hdHRyaWJ1dGVzKSA6IHRoaXMucHJpY2luZ1ByZWZlcmVuY2VzO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcuc2V0UHJpY2VGb3JEaWFsb2cobnVsbCkpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcuaW5pdGlhbGl6ZVByaWNpbmcoXG4gICAgICAnUmlnaHRzIE1hbmFnZWQnLFxuICAgICAgdGhpcy5wcm9qZWN0UHJpY2luZ09wdGlvbnMocHJlZmVyZW5jZXMsIHByb2plY3QpXG4gICAgKSk7XG4gIH1cblxuICBwcml2YXRlIHByb2plY3RQcmljaW5nT3B0aW9ucyhwcmVmZXJlbmNlczogUG9qbywgcHJvamVjdDogUHJvamVjdCk6IERlZmF1bHRDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50VHlwZTogV3pQcmljaW5nQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogcHJlZmVyZW5jZXMsXG4gICAgICAgIHVzZXJDYW5DdXN0b21pemVSaWdodHM6IHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKClcbiAgICAgIH0sXG4gICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgY2FsbGJhY2s6IChldmVudDogV3pFdmVudCwgZGlhbG9nUmVmOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcm9qZWN0UHJpY2luZyhldmVudCwgZGlhbG9nUmVmLCBwcm9qZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93UHJpY2luZ0RpYWxvZyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIGxldCBwcmVmZXJlbmNlczogUG9qbyA9IGxpbmVJdGVtLmF0dHJpYnV0ZXMgPyB0aGlzLm1hcEF0dHJpYnV0ZXNUb1ByZWZlcmVuY2VzKGxpbmVJdGVtLmF0dHJpYnV0ZXMpIDogdGhpcy5wcmljaW5nUHJlZmVyZW5jZXM7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5pbml0aWFsaXplUHJpY2luZyhcbiAgICAgICdSaWdodHMgTWFuYWdlZCcsXG4gICAgICB0aGlzLmxpbmVpdGVtUHJpY2luZ09wdGlvbnMocHJlZmVyZW5jZXMsIGxpbmVJdGVtKVxuICAgICkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaW5laXRlbVByaWNpbmdPcHRpb25zKHByZWZlcmVuY2VzOiBQb2pvLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IERlZmF1bHRDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50VHlwZTogV3pQcmljaW5nQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogcHJlZmVyZW5jZXMsXG4gICAgICAgIHVzZXJDYW5DdXN0b21pemVSaWdodHM6IHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKClcbiAgICAgIH0sXG4gICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgY2FsbGJhY2s6IChldmVudDogV3pFdmVudCwgZGlhbG9nUmVmOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcmljaW5nKGV2ZW50LCBkaWFsb2dSZWYsIGxpbmVJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuUHJvamVjdFByaWNpbmdEaWFsb2cocHJpY2VBdHRyaWJ1dGVzOiBBcnJheTxQcmljZUF0dHJpYnV0ZT4sIHByZWZlcmVuY2VzOiBQb2pvLCBwcm9qZWN0OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgIHtcbiAgICAgICAgY29tcG9uZW50VHlwZTogV3pQcmljaW5nQ29tcG9uZW50LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBwcmljZUF0dHJpYnV0ZXMsXG4gICAgICAgICAgcHJpY2luZ1ByZWZlcmVuY2VzOiBwcmVmZXJlbmNlcyxcbiAgICAgICAgICB1c2FnZVByaWNlOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgICBjYWxsYmFjazogKGV2ZW50OiBXekV2ZW50LCBkaWFsb2dSZWY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFwcGx5UHJvamVjdFByaWNpbmcoZXZlbnQsIGRpYWxvZ1JlZiwgcHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlQcm9qZWN0UHJpY2luZyhldmVudDogV3pFdmVudCwgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8V3pQcmljaW5nQ29tcG9uZW50PiwgcHJvamVjdDogUHJvamVjdCkge1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnQVBQTFlfUFJJQ0UnOlxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT5cbiAgICAgICAgICBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVQcm9qZWN0UHJpY2VBdHRyaWJ1dGVzKGV2ZW50LnBheWxvYWQuYXR0cmlidXRlcywgcHJvamVjdClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGV2ZW50LnBheWxvYWQudXBkYXRlUHJlZnMpIHtcbiAgICAgICAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnVwZGF0ZVByaWNpbmdQcmVmZXJlbmNlcyhldmVudC5wYXlsb2FkLnByZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFUlJPUic6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZUN1c3RvbUVycm9yKGV2ZW50LnBheWxvYWQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuXG4gIHByaXZhdGUgYXBwbHlQcmljaW5nKGV2ZW50OiBXekV2ZW50LCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxXelByaWNpbmdDb21wb25lbnQ+LCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkge1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnQ0FMQ1VMQVRFX1BSSUNFJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5jYWxjdWxhdGVQcmljZShcbiAgICAgICAgICBldmVudC5wYXlsb2FkLFxuICAgICAgICAgIGxpbmVJdGVtLmFzc2V0LmFzc2V0SWQsXG4gICAgICAgICAgdGhpcy5tYXJrZXJzRnJvbShsaW5lSXRlbS5hc3NldCBhcyBFbmhhbmNlZEFzc2V0KVxuICAgICAgICApKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBUFBMWV9QUklDRSc6XG4gICAgICAgIGlmIChldmVudC5wYXlsb2FkLnVwZGF0ZVByZWZzKSB7XG4gICAgICAgICAgdGhpcy51c2VyUHJlZmVyZW5jZS51cGRhdGVQcmljaW5nUHJlZmVyZW5jZXMoZXZlbnQucGF5bG9hZC5wcmVmZXJlbmNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmVkaXRMaW5lSXRlbShsaW5lSXRlbSwgeyBwcmljaW5nQXR0cmlidXRlczogZXZlbnQucGF5bG9hZC5hdHRyaWJ1dGVzIH0pKTtcbiAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRVJST1InOlxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGVDdXN0b21FcnJvcihldmVudC5wYXlsb2FkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIG1hcEF0dHJpYnV0ZXNUb1ByZWZlcmVuY2VzKGF0dHJpYnV0ZXM6IGFueSk6IFBvam8ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAvLyBpZiB0aGUgYXR0cmlidXRlcyBjYW1lIGZyb20gYSBsaW5lSXRlbSwgdGhleSBhcmUgYW4gQXJyYXkgb2YgU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZXNcbiAgICAgIC8vIHdlIG5lZWQgdG8gbWFwIHRoZW0gdG8gYSBQb2pvIHRvIHBhc3Mgb24gdG8gdGhlIHByaWNpbmcgY29tcG9uZW50XG4gICAgICBsZXQgbWFwcGVkOiBhbnkgPSB7fTtcbiAgICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cjogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSkgPT4ge1xuICAgICAgICBtYXBwZWRbYXR0ci5wcmljZUF0dHJpYnV0ZU5hbWVdID0gYXR0ci5zZWxlY3RlZEF0dHJpYnV0ZVZhbHVlO1xuICAgICAgfSk7XG4gICAgICBkZWxldGUgbWFwcGVkWydzaXRlTmFtZSddO1xuICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgdGhlIGF0dHJpYnV0ZXMgY2FtZSBmcm9tIGEgcHJvamVjdCwgdGhleSBhcmUgYSBQb2pvLlxuICAgICAgLy8gd2UgZG8gbm90IG5lZWQgdG8gbWFwIHRoZW0gYmVmb3JlIHBhc3NpbmcgdGhlbSB0byB0aGUgcHJpY2luZyBjb21wb25lbnRcbiAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydzaXRlTmFtZSddO1xuICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuQ29zdE11bHRpcGxpZXJEaWFsb2cobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2coXG4gICAgICB0aGlzLmNvc3RNdWx0aXBsaWVyRm9ybUl0ZW1zKGxpbmVJdGVtKSxcbiAgICAgIHsgdGl0bGU6IHRoaXMuY29zdE11bHRpcGxpZXJGb3JtVGl0bGUobGluZUl0ZW0pLCBzdWJtaXRMYWJlbDogdGhpcy5jb3N0TXVsdGlwbGllckZvcm1TdWJtaXRMYWJlbChsaW5lSXRlbSkgfSxcbiAgICAgIChyZXN1bHQ6IHsgbXVsdGlwbGllcjogc3RyaW5nIH0pOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmVkaXRMaW5lSXRlbShsaW5lSXRlbSwgcmVzdWx0KSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29zdE11bHRpcGxpZXJGb3JtSXRlbXMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBBcnJheTxGb3JtRmllbGRzPiB7XG4gICAgcmV0dXJuIGxpbmVJdGVtLm11bHRpcGxpZXIgPiAxID9cbiAgICAgIFtPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZy5hZGRDb3N0TXVsdGlwbGllci5pdGVtc1swXSwgeyB2YWx1ZTogbGluZUl0ZW0ubXVsdGlwbGllciB9KV0gOlxuICAgICAgdGhpcy5jb25maWcuYWRkQ29zdE11bHRpcGxpZXIuaXRlbXM7XG4gIH1cblxuICBwcml2YXRlIGNvc3RNdWx0aXBsaWVyRm9ybVRpdGxlKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbGluZUl0ZW0ubXVsdGlwbGllciA+IDEgPyAnUVVPVEUuRURJVF9NVUxUSVBMSUVSX1RJVExFJyA6ICdRVU9URS5BRERfTVVMVElQTElFUl9USVRMRSc7XG4gIH1cblxuICBwcml2YXRlIGNvc3RNdWx0aXBsaWVyRm9ybVN1Ym1pdExhYmVsKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbGluZUl0ZW0ubXVsdGlwbGllciA+IDEgPyAnUVVPVEUuRURJVF9NVUxUSVBMSUVSX0ZPUk1fU1VCTUlUJyA6ICdRVU9URS5BRERfTVVMVElQTElFUl9GT1JNX1NVQk1JVCc7XG4gIH1cblxuICBwcml2YXRlIG1hcmtlcnNGcm9tKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnMge1xuICAgIHJldHVybiBhc3NldC5pc1N1YmNsaXBwZWQgPyB7XG4gICAgICBpbjogYXNzZXQuaW5NYXJrZXJGcmFtZSxcbiAgICAgIG91dDogYXNzZXQub3V0TWFya2VyRnJhbWVcbiAgICB9IDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUHJpY2UoYXR0cmlidXRlczogUG9qbywgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICBjb25zdCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2VycyA9IHRoaXMubWFya2Vyc0Zyb20obGluZUl0ZW0uYXNzZXQgYXMgRW5oYW5jZWRBc3NldCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5jYWxjdWxhdGVQcmljZShhdHRyaWJ1dGVzLCBsaW5lSXRlbS5hc3NldC5hc3NldElkLCBtYXJrZXJzKSk7XG4gIH1cblxuICBwcml2YXRlIG9wZW5Ob3RlRGlhbG9nKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgY29uc3QgaGFzTm90ZTogYm9vbGVhbiA9IGxpbmVJdGVtLmhhc093blByb3BlcnR5KCdub3RlcycpICYmXG4gICAgICBsaW5lSXRlbS5ub3Rlcy5sZW5ndGggPiAwICYmXG4gICAgICBsaW5lSXRlbS5ub3Rlc1swXS5oYXNPd25Qcm9wZXJ0eSgnbm90ZXMnKSAmJlxuICAgICAgbGluZUl0ZW0ubm90ZXNbMF0ubm90ZXMubGVuZ3RoID4gMDtcblxuICAgIGNvbnN0IHRpdGxlOiBzdHJpbmcgPSBoYXNOb3RlID8gJ1FVT1RFLkVESVRfTk9URScgOiAnUVVPVEUuQUREX05PVEUnO1xuICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSBoYXNOb3RlID8gJ1FVT1RFLkVESVRfTk9URScgOiAnUVVPVEUuQUREX05PVEUnO1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSBoYXNOb3RlID8gbGluZUl0ZW0ubm90ZXNbMF0ubm90ZXNbMF0gOiAnJztcblxuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIFt7IG5hbWU6ICdub3RlJywgdHlwZTogJ3RleHRhcmVhJywgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJywgbGFiZWwsIHZhbHVlIH1dLFxuICAgICAgeyB0aXRsZSB9LFxuICAgICAgKGZvcm0pID0+IHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5hZGROb3RlKGZvcm0ubm90ZSwgbGluZUl0ZW0pKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU5vdGVGcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2coe1xuICAgICAgdGl0bGU6ICdRVU9URS5ERUxFVEVfTk9URVMuVElUTEUnLFxuICAgICAgbWVzc2FnZTogJ1FVT1RFLkRFTEVURV9OT1RFUy5NRVNTQUdFJyxcbiAgICAgIGFjY2VwdDogJ1FVT1RFLkRFTEVURV9OT1RFUy5BQ0NFUFQnLFxuICAgICAgZGVjbGluZTogJ1FVT1RFLkRFTEVURV9OT1RFUy5ERUNMSU5FJ1xuICAgIH0sICgpID0+IHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5yZW1vdmVOb3RlRnJvbShsaW5lSXRlbSkpKTtcbiAgfVxufVxuIl19
