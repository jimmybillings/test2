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
    CartTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-tab-component',
            templateUrl: 'cart-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            cart_service_1.CartService,
            wz_dialog_service_1.WzDialogService,
            window_ref_service_1.WindowRef,
            user_preference_service_1.UserPreferenceService, Object, app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], CartTabComponent);
    return CartTabComponent;
}(tab_1.Tab));
exports.CartTabComponent = CartTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBaUg7QUFDakgsOERBQXFEO0FBR3JELG9EQUFtRDtBQUNuRCxzR0FBbUc7QUFHbkcseUVBQXVFO0FBQ3ZFLHFHQUFrRztBQUNsRyxpRkFBK0U7QUFDL0UsK0ZBQTRGO0FBQzVGLHFGQUEyRTtBQUUzRSxpSEFBOEc7QUFDOUcsa0ZBQXVFO0FBR3ZFLDJIQUF1SDtBQUV2SCxtREFBaUQ7QUFTakQ7SUFBc0Msb0NBQUc7SUFPdkMsMEJBQ1MsT0FBNkIsRUFDN0IsV0FBd0IsRUFDeEIsYUFBOEIsRUFDOUIsTUFBaUIsRUFDakIsY0FBcUMsRUFDbkIsUUFBYSxFQUM5QixLQUFlLEVBQ2YsUUFBMkI7UUFSckMsWUFVRSxpQkFBTyxTQUNSO1FBVlEsYUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLFlBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsb0JBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ25CLGNBQVEsR0FBUixRQUFRLENBQUs7UUFDOUIsV0FBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLGNBQVEsR0FBUixRQUFRLENBQW1COztJQUdyQyxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVM7WUFDMUUsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFT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dUJBQUM7Q0FwV0QsQUFvV0MsQ0FwV3FDLFNBQUcsR0FvV3hDO0FBcFdZLDRDQUFnQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytjYXJ0L2NvbXBvbmVudHMvdGFicy9jYXJ0LXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25EZXN0cm95LCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBUYWIgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvdGFiJztcbmltcG9ydCB7IFd6UHJpY2luZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3d6LXByaWNpbmcvd3oucHJpY2luZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0TGluZUl0ZW0sIExpY2Vuc2VBZ3JlZW1lbnRzLCBQcm9qZWN0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbWVyY2VDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb21tZXJjZS5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItcHJlZmVyZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2ZlYXR1cmUuaW50ZXJmYWNlJztcbmltcG9ydCB7IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xpY2Vuc2UtYWdyZWVtZW50L2xpY2Vuc2UtYWdyZWVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgUG9qbywgU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSwgV3pFdmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UgZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IFd6U3ViY2xpcEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3d6LXN1YmNsaXAtZWRpdG9yL3d6LnN1YmNsaXAtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjYXJ0LXRhYi1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NhcnQtdGFiLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENhcnRUYWJDb21wb25lbnQgZXh0ZW5kcyBUYWIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdO1xuICBwdWJsaWMgY29uZmlnOiBhbnk7XG4gIHB1YmxpYyBwcmljaW5nUHJlZmVyZW5jZXM6IFBvam87XG4gIHB1YmxpYyBwcmVmZXJlbmNlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHByb2plY3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHVibGljIGNhcnRTZXJ2aWNlOiBDYXJ0U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nU2VydmljZTogV3pEaWFsb2dTZXJ2aWNlLFxuICAgIHB1YmxpYyB3aW5kb3c6IFdpbmRvd1JlZixcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwdWJsaWMgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucHJlZmVyZW5jZXNTdWJzY3JpcHRpb24gPSB0aGlzLnVzZXJQcmVmZXJlbmNlLmRhdGEuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucHJpY2luZ1ByZWZlcmVuY2VzID0gZGF0YS5wcmljaW5nUHJlZmVyZW5jZXM7XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2plY3RTdWJzY3JpcHRpb24gPSB0aGlzLmNhcnRTZXJ2aWNlLnByb2plY3RzLnN1YnNjcmliZShwcm9qZWN0cyA9PiB7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gICAgICB0aGlzLmRldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMuY2FydC5jb25maWcpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucHJvamVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucHJlZmVyZW5jZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk5vdGlmaWNhdGlvbihtZXNzYWdlOiBXekV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ0FERF9QUk9KRUNUJzoge1xuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLmFkZFByb2plY3QoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdSRU1PVkVfUFJPSkVDVCc6IHtcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVQcm9qZWN0KG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnVVBEQVRFX1BST0pFQ1QnOiB7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvamVjdChtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ01PVkVfTElORV9JVEVNJzoge1xuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLm1vdmVMaW5lSXRlbVRvKG1lc3NhZ2UucGF5bG9hZC5vdGhlclByb2plY3QsIG1lc3NhZ2UucGF5bG9hZC5saW5lSXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnQ0xPTkVfTElORV9JVEVNJzoge1xuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLmNsb25lTGluZUl0ZW0obWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdSRU1PVkVfTElORV9JVEVNJzoge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LnJlbW92ZUFzc2V0KG1lc3NhZ2UucGF5bG9hZC5hc3NldCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0VESVRfTElORV9JVEVNJzoge1xuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLmVkaXRMaW5lSXRlbShtZXNzYWdlLnBheWxvYWQubGluZUl0ZW0sIG1lc3NhZ2UucGF5bG9hZC5maWVsZFRvRWRpdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRURJVF9MSU5FX0lURU1fTUFSS0VSUyc6IHtcbiAgICAgICAgdGhpcy5lZGl0QXNzZXQobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdTSE9XX1BSSUNJTkdfRElBTE9HJzoge1xuICAgICAgICB0aGlzLnNob3dQcmljaW5nRGlhbG9nKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRURJVF9QUk9KRUNUX1BSSUNJTkcnOiB7XG4gICAgICAgIHRoaXMuZWRpdFByb2plY3RQcmljaW5nKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnQUREX05PVEUnOiB7XG4gICAgICAgIHRoaXMub3Blbk5vdGVEaWFsb2cobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdSRU1PVkVfTk9URSc6IHtcbiAgICAgICAgdGhpcy5yZW1vdmVOb3RlRnJvbShtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGNoZWNrb3V0KCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub05leHRUYWIoKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLmdldFBheW1lbnRPcHRpb25zKCk7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJDYW4udmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uKHRoaXMuY2FydFNlcnZpY2UuaGFzQXNzZXRMaW5lSXRlbXMpO1xuICB9XG5cbiAgcHVibGljIGdldCB0b3RhbCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmNhcnRTZXJ2aWNlLnRvdGFsO1xuICB9XG5cbiAgcHVibGljIHNob3dMaWNlbnNlQWdyZWVtZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJldHJpZXZlTGljZW5zZUFncmVlbWVudHMoKS50YWtlKDEpLnN1YnNjcmliZSgoYWdyZWVtZW50czogTGljZW5zZUFncmVlbWVudHMpID0+IHtcbiAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICAgIHtcbiAgICAgICAgICBjb21wb25lbnRUeXBlOiBMaWNlbnNlQWdyZWVtZW50Q29tcG9uZW50LFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwYW5lbENsYXNzOiAnbGljZW5zZS1wYW5lJywgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9IH0sXG4gICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICBhc3NldFR5cGU6ICdjYXJ0JyxcbiAgICAgICAgICAgIGxpY2Vuc2VzOiBDb21tb24uY2xvbmUoYWdyZWVtZW50cylcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVzZXJDYW5Qcm9jZWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJtQXNzZXRzSGF2ZUF0dHJpYnV0ZXMgJiYgIXRoaXMuY2FydENvbnRhaW5zTm9Bc3NldHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJtQXNzZXRzSGF2ZUF0dHJpYnV0ZXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FydFNlcnZpY2Uuc3RhdGUuZGF0YS5pdGVtQ291bnQgPT09IDApIHJldHVybiB0cnVlO1xuXG4gICAgbGV0IHZhbGlkQXNzZXRzOiBib29sZWFuW10gPSBbXTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2Uuc3RhdGUuZGF0YS5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0OiBQcm9qZWN0KSA9PiB7XG4gICAgICBpZiAocHJvamVjdC5saW5lSXRlbXMpIHtcbiAgICAgICAgcHJvamVjdC5saW5lSXRlbXMuZm9yRWFjaCgobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pID0+IHtcbiAgICAgICAgICB2YWxpZEFzc2V0cy5wdXNoKGxpbmVJdGVtLnJpZ2h0c01hbmFnZWQgPT09ICdSaWdodHMgTWFuYWdlZCcgPyAhIWxpbmVJdGVtLmF0dHJpYnV0ZXMgOiB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbGlkQXNzZXRzLmluZGV4T2YoZmFsc2UpID09PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1RvdGFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNuYXBzaG90KGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmRhdGEudG90YWwgPiAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FydENvbnRhaW5zTm9Bc3NldHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmNhcnRTZXJ2aWNlLnN0YXRlLmRhdGEuaXRlbUNvdW50ID09PSAwKSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1VzYWdlV2FybmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuY2FydENvbnRhaW5zTm9Bc3NldHMgJiYgIXRoaXMucm1Bc3NldHNIYXZlQXR0cmlidXRlcztcbiAgfVxuXG4gIHByaXZhdGUgZWRpdFByb2plY3RQcmljaW5nKHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBsZXQgcHJlZmVyZW5jZXM6IFBvam8gPSBwcm9qZWN0LmF0dHJpYnV0ZXMgPyB0aGlzLm1hcEF0dHJpYnV0ZXNUb1ByZWZlcmVuY2VzKHByb2plY3QuYXR0cmlidXRlcykgOiB0aGlzLnByaWNpbmdQcmVmZXJlbmNlcztcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLnNldFByaWNlRm9yRGlhbG9nKG51bGwpKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLmluaXRpYWxpemVQcmljaW5nKFxuICAgICAgJ1JpZ2h0cyBNYW5hZ2VkJyxcbiAgICAgIHRoaXMucHJvamVjdFByaWNpbmdPcHRpb25zKHByZWZlcmVuY2VzLCBwcm9qZWN0KVxuICAgICkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93UHJpY2luZ0RpYWxvZyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIGxldCBwcmVmZXJlbmNlczogUG9qbyA9IGxpbmVJdGVtLmF0dHJpYnV0ZXMgPyB0aGlzLm1hcEF0dHJpYnV0ZXNUb1ByZWZlcmVuY2VzKGxpbmVJdGVtLmF0dHJpYnV0ZXMpIDogdGhpcy5wcmljaW5nUHJlZmVyZW5jZXM7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5pbml0aWFsaXplUHJpY2luZyhcbiAgICAgICdSaWdodHMgTWFuYWdlZCcsXG4gICAgICB0aGlzLmxpbmVpdGVtUHJpY2luZ09wdGlvbnMocHJlZmVyZW5jZXMsIGxpbmVJdGVtKVxuICAgICkpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBBdHRyaWJ1dGVzVG9QcmVmZXJlbmNlcyhhdHRyaWJ1dGVzOiBhbnkpOiBQb2pvIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhdHRyaWJ1dGVzKSkge1xuICAgICAgLy8gaWYgdGhlIGF0dHJpYnV0ZXMgY2FtZSBmcm9tIGEgbGluZUl0ZW0sIHRoZXkgYXJlIGFuIEFycmF5IG9mIFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVzXG4gICAgICAvLyB3ZSBuZWVkIHRvIG1hcCB0aGVtIHRvIGEgUG9qbyB0byBwYXNzIG9uIHRvIHRoZSBwcmljaW5nIGNvbXBvbmVudFxuICAgICAgbGV0IG1hcHBlZDogYW55ID0ge307XG4gICAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHI6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgbWFwcGVkW2F0dHIucHJpY2VBdHRyaWJ1dGVOYW1lXSA9IGF0dHIuc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZTtcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIG1hcHBlZFsnc2l0ZU5hbWUnXTtcbiAgICAgIHJldHVybiBtYXBwZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHRoZSBhdHRyaWJ1dGVzIGNhbWUgZnJvbSBhIHByb2plY3QsIHRoZXkgYXJlIGEgUG9qby5cbiAgICAgIC8vIHdlIGRvIG5vdCBuZWVkIHRvIG1hcCB0aGVtIGJlZm9yZSBwYXNzaW5nIHRoZW0gdG8gdGhlIHByaWNpbmcgY29tcG9uZW50XG4gICAgICBkZWxldGUgYXR0cmlidXRlc1snc2l0ZU5hbWUnXTtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvamVjdFByaWNpbmdPcHRpb25zKHByZWZlcmVuY2VzOiBQb2pvLCBwcm9qZWN0OiBQcm9qZWN0KTogRGVmYXVsdENvbXBvbmVudE9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBjb21wb25lbnRUeXBlOiBXelByaWNpbmdDb21wb25lbnQsXG4gICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgcHJpY2luZ1ByZWZlcmVuY2VzOiBwcmVmZXJlbmNlcyxcbiAgICAgICAgdXNlckNhbkN1c3RvbWl6ZVJpZ2h0czogdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKVxuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGV2ZW50OiAncHJpY2luZ0V2ZW50JyxcbiAgICAgICAgICBjYWxsYmFjazogKGV2ZW50OiBXekV2ZW50LCBkaWFsb2dSZWY6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBseVByb2plY3RQcmljaW5nKGV2ZW50LCBkaWFsb2dSZWYsIHByb2plY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFwcGx5UHJvamVjdFByaWNpbmcoZXZlbnQ6IFd6RXZlbnQsIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6UHJpY2luZ0NvbXBvbmVudD4sIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ0FQUExZX1BSSUNFJzpcbiAgICAgICAgaWYgKGV2ZW50LnBheWxvYWQudXBkYXRlUHJlZnMpIHtcbiAgICAgICAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnVwZGF0ZVByaWNpbmdQcmVmZXJlbmNlcyhldmVudC5wYXlsb2FkLnByZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMoZXZlbnQucGF5bG9hZC5hdHRyaWJ1dGVzLCBwcm9qZWN0KTtcbiAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRVJST1InOlxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGVDdXN0b21FcnJvcihldmVudC5wYXlsb2FkKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsaW5laXRlbVByaWNpbmdPcHRpb25zKHByZWZlcmVuY2VzOiBQb2pvLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IERlZmF1bHRDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50VHlwZTogV3pQcmljaW5nQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogcHJlZmVyZW5jZXMsXG4gICAgICAgIHVzZXJDYW5DdXN0b21pemVSaWdodHM6IHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKClcbiAgICAgIH0sXG4gICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgY2FsbGJhY2s6IChldmVudDogV3pFdmVudCwgZGlhbG9nUmVmOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcmljaW5nKGV2ZW50LCBkaWFsb2dSZWYsIGxpbmVJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVByaWNpbmcoZXZlbnQ6IFd6RXZlbnQsIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6UHJpY2luZ0NvbXBvbmVudD4sIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSB7XG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlICdDQUxDVUxBVEVfUFJJQ0UnOlxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLmNhbGN1bGF0ZVByaWNlKFxuICAgICAgICAgIGV2ZW50LnBheWxvYWQsXG4gICAgICAgICAgbGluZUl0ZW0uYXNzZXQuYXNzZXRJZCxcbiAgICAgICAgICB0aGlzLm1hcmtlcnNGcm9tKGxpbmVJdGVtLmFzc2V0IGFzIEVuaGFuY2VkQXNzZXQpXG4gICAgICAgICkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FQUExZX1BSSUNFJzpcbiAgICAgICAgaWYgKGV2ZW50LnBheWxvYWQudXBkYXRlUHJlZnMpIHtcbiAgICAgICAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnVwZGF0ZVByaWNpbmdQcmVmZXJlbmNlcyhldmVudC5wYXlsb2FkLnByZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLmVkaXRMaW5lSXRlbShsaW5lSXRlbSwgeyBwcmljaW5nQXR0cmlidXRlczogZXZlbnQucGF5bG9hZC5hdHRyaWJ1dGVzIH0pO1xuICAgICAgICBkaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFUlJPUic6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZUN1c3RvbUVycm9yKGV2ZW50LnBheWxvYWQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVkaXRBc3NldChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkge1xuICAgIHRoaXMuc3RvcmUuY2FsbExlZ2FjeVNlcnZpY2VNZXRob2Qoc2VydmljZSA9PiBzZXJ2aWNlLmFzc2V0LmdldENsaXBQcmV2aWV3RGF0YShsaW5lSXRlbS5hc3NldC5hc3NldElkKSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzdWJjbGlwcGluZy1lZGl0LW9wZW4nKTtcbiAgICAgICAgbGluZUl0ZW0uYXNzZXQuY2xpcFVybCA9IGRhdGEudXJsO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IFd6U3ViY2xpcEVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyB3aWR0aDogJzUzMHB4JywgcG9zaXRpb246IHsgdG9wOiAnMTQlJyB9IH0sXG4gICAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgd2luZG93OiB0aGlzLndpbmRvdy5uYXRpdmVXaW5kb3csXG4gICAgICAgICAgICAgIGVuaGFuY2VkQXNzZXQ6IGxpbmVJdGVtLmFzc2V0LFxuICAgICAgICAgICAgICB1c2FnZVByaWNlOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnc2F2ZScsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChuZXdNYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2VycykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5lZGl0TGluZUl0ZW1NYXJrZXJzKGxpbmVJdGVtLCBuZXdNYXJrZXJzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3N1YmNsaXBwaW5nLWVkaXQtb3BlbicpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQcm9qZWN0KHByb2plY3Q6IFByb2plY3QpIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2coXG4gICAgICBwcm9qZWN0Lml0ZW1zLFxuICAgICAge1xuICAgICAgICBkaWFsb2dDb25maWc6IHsgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9LCBkaXNhYmxlQ2xvc2U6IGZhbHNlIH0sXG4gICAgICAgIHRpdGxlOiAnQ0FSVC5QUk9KRUNUUy5GT1JNLlRJVExFJyxcbiAgICAgICAgc3VibWl0TGFiZWw6ICdDQVJULlBST0pFQ1RTLkZPUk0uU1VCTUlUX0xBQkVMJyxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJ1xuICAgICAgfSxcbiAgICAgIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS51cGRhdGVQcm9qZWN0KE9iamVjdC5hc3NpZ24ocHJvamVjdC5wcm9qZWN0LCBkYXRhKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUHJpY2UoYXR0cmlidXRlczogUG9qbywgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICBjb25zdCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2VycyA9IHRoaXMubWFya2Vyc0Zyb20obGluZUl0ZW0uYXNzZXQgYXMgRW5oYW5jZWRBc3NldCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5jYWxjdWxhdGVQcmljZShhdHRyaWJ1dGVzLCBsaW5lSXRlbS5hc3NldC5hc3NldElkLCBtYXJrZXJzKSk7XG4gIH1cblxuICBwcml2YXRlIG1hcmtlcnNGcm9tKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnMge1xuICAgIHJldHVybiBhc3NldC5pc1N1YmNsaXBwZWQgPyB7XG4gICAgICBpbjogYXNzZXQuaW5NYXJrZXJGcmFtZSxcbiAgICAgIG91dDogYXNzZXQub3V0TWFya2VyRnJhbWVcbiAgICB9IDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbk5vdGVEaWFsb2cobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICBjb25zdCBoYXNOb3RlOiBib29sZWFuID0gbGluZUl0ZW0uaGFzT3duUHJvcGVydHkoJ25vdGVzJykgJiZcbiAgICAgIGxpbmVJdGVtLm5vdGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgIGxpbmVJdGVtLm5vdGVzWzBdLmhhc093blByb3BlcnR5KCdub3RlcycpICYmXG4gICAgICBsaW5lSXRlbS5ub3Rlc1swXS5ub3Rlcy5sZW5ndGggPiAwO1xuXG4gICAgY29uc3QgdGl0bGU6IHN0cmluZyA9IGhhc05vdGUgPyAnUVVPVEUuRURJVF9OT1RFJyA6ICdRVU9URS5BRERfTk9URSc7XG4gICAgY29uc3QgbGFiZWw6IHN0cmluZyA9IGhhc05vdGUgPyAnUVVPVEUuRURJVF9OT1RFJyA6ICdRVU9URS5BRERfTk9URSc7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGhhc05vdGUgPyBsaW5lSXRlbS5ub3Rlc1swXS5ub3Rlc1swXSA6ICcnO1xuXG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKFxuICAgICAgW3sgbmFtZTogJ25vdGUnLCB0eXBlOiAndGV4dGFyZWEnLCB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLCBsYWJlbCwgdmFsdWUgfV0sXG4gICAgICB7IHRpdGxlIH0sXG4gICAgICAoZm9ybSkgPT4gdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2FydC5hZGROb3RlKGZvcm0ubm90ZSwgbGluZUl0ZW0pKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU5vdGVGcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2coe1xuICAgICAgdGl0bGU6ICdDQVJULkRFTEVURV9OT1RFUy5USVRMRScsXG4gICAgICBtZXNzYWdlOiAnQ0FSVC5ERUxFVEVfTk9URVMuTUVTU0FHRScsXG4gICAgICBhY2NlcHQ6ICdDQVJULkRFTEVURV9OT1RFUy5BQ0NFUFQnLFxuICAgICAgZGVjbGluZTogJ0NBUlQuREVMRVRFX05PVEVTLkRFQ0xJTkUnXG4gICAgfSwgKCkgPT4gdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2FydC5yZW1vdmVOb3RlRnJvbShsaW5lSXRlbSkpKTtcbiAgfVxufVxuIl19
