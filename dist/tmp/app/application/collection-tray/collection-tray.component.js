"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collection_link_component_1 = require("../../+collection/components/collection-link.component");
var collection_form_component_1 = require("./components/collection-form.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var enhanced_asset_1 = require("../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../app.store");
var common_functions_1 = require("../../shared/utilities/common.functions");
var collections_list_dd_component_1 = require("./components/collections-list-dd.component");
var CollectionTrayComponent = (function () {
    function CollectionTrayComponent(dialogService, store, detector) {
        this.dialogService = dialogService;
        this.store = store;
        this.detector = detector;
        this.enhancedAssets = {};
    }
    CollectionTrayComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.activeCollection.loadIfNeeded(); });
        this.collectionSubscription = this.setCollection();
        var config = this.store.snapshotCloned(function (state) { return state.uiConfig.components; });
        this.collectionFormConfig = config.collection.config;
    };
    CollectionTrayComponent.prototype.ngOnDestroy = function () {
        this.collectionSubscription.unsubscribe();
    };
    CollectionTrayComponent.prototype.toggleCollectionTray = function () {
        this.userPreference.toggleCollectionTray();
    };
    CollectionTrayComponent.prototype.hasId = function (asset) {
        return !!asset && !!(asset.assetId);
    };
    CollectionTrayComponent.prototype.routerLinkFor = function (asset) {
        return asset.routerLink;
    };
    CollectionTrayComponent.prototype.hasThumbnail = function (asset) {
        return !!asset.thumbnailUrl;
    };
    CollectionTrayComponent.prototype.thumbnailUrlFor = function (asset) {
        return asset.thumbnailUrl;
    };
    CollectionTrayComponent.prototype.getAssetsForLink = function () {
        this.dialogService.openComponentInDialog({
            componentType: collection_link_component_1.CollectionLinkComponent,
            inputOptions: { assets: this.collection.assets.items }
        });
    };
    CollectionTrayComponent.prototype.createCollectionlistDialog = function () {
        var focusedCollection;
        this.dialogService.openComponentInDialog({
            componentType: collections_list_dd_component_1.CollectionListDdComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
            inputOptions: {
                focusedCollection: this.collection
            },
            outputOptions: [{
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionTrayComponent.prototype.createCollection = function () {
        var _this = this;
        this.dialogService.openComponentInDialog({
            componentType: collection_form_component_1.CollectionFormComponent,
            dialogConfig: { position: { top: '10%' } },
            inputOptions: {
                fields: this.collectionFormConfig,
                collectionActionType: 'create'
            },
            outputOptions: [{
                    event: 'collectionSaved',
                    callback: function (event) {
                        if (_this.urlPath.includes('/collections/')) {
                            _this.store.dispatch(function (factory) { return factory.router.goToCollection(event.collectionId); });
                        }
                        else {
                            _this.store.dispatch(function (factory) { return factory.snackbar.display('COLLECTION.COLLECTION_CREATED'); });
                        }
                    },
                    closeOnEvent: true
                }]
        });
    };
    CollectionTrayComponent.prototype.setCollection = function () {
        var _this = this;
        return this.store.select(function (state) { return state.activeCollection; })
            .filter(function (state) { return state.collection !== undefined; })
            .map(function (state) {
            var collection = common_functions_1.Common.clone(state.collection);
            if (collection.assets && collection.assets.items) {
                collection.assets.items = collection.assets.items
                    .map(function (item) { return enhanced_asset_1.enhanceAsset(item, 'collection', collection.id); });
            }
            return collection;
        }).subscribe(function (collection) {
            _this.collection = collection;
            _this.detector.markForCheck();
        });
    };
    CollectionTrayComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-tray',
                    templateUrl: 'collection-tray.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    CollectionTrayComponent.ctorParameters = function () { return [
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    CollectionTrayComponent.propDecorators = {
        'userPreference': [{ type: core_1.Input },],
        'urlPath': [{ type: core_1.Input },],
    };
    return CollectionTrayComponent;
}());
exports.CollectionTrayComponent = CollectionTrayComponent;
//# sourceMappingURL=collection-tray.component.js.map