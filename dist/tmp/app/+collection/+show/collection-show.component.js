"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var collections_service_1 = require("../../shared/services/collections.service");
var router_1 = require("@angular/router");
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var cart_service_1 = require("../../shared/services/cart.service");
var user_preference_service_1 = require("../../shared/services/user-preference.service");
var collection_link_component_1 = require("../components/collection-link.component");
var collection_form_component_1 = require("../../application/collection-tray/components/collection-form.component");
var wz_subclip_editor_component_1 = require("../../shared/components/wz-subclip-editor/wz.subclip-editor.component");
var collection_share_members_component_1 = require("../components/collection-share-members.component");
var window_ref_service_1 = require("../../shared/services/window-ref.service");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../app.store");
var enhanced_asset_1 = require("../../shared/interfaces/enhanced-asset");
var common_functions_1 = require("../../shared/utilities/common.functions");
var collection_share_component_1 = require("../components/collection-share.component");
var collections_list_dd_component_1 = require("../../application/collection-tray/components/collections-list-dd.component");
var CollectionShowComponent = (function () {
    function CollectionShowComponent(userCan, router, collections, cart, userPreference, route, window, dialogService, document, store, changeDetectorRef) {
        this.userCan = userCan;
        this.router = router;
        this.collections = collections;
        this.cart = cart;
        this.userPreference = userPreference;
        this.route = route;
        this.window = window;
        this.dialogService = dialogService;
        this.document = document;
        this.store = store;
        this.changeDetectorRef = changeDetectorRef;
        this.showComments = null;
    }
    CollectionShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeCollectionSubscription =
            this.store.select(function (state) { return state.activeCollection; })
                .filter(function (state) { return !state.loading; })
                .map(function (state) {
                var collection = common_functions_1.Common.clone(state.collection);
                if (collection.assets && collection.assets.items) {
                    collection.assets.items = collection.assets.items
                        .map(function (item) { return enhanced_asset_1.enhanceAsset(item, 'collection', collection.id); });
                }
                return collection;
            })
                .subscribe(function (collection) {
                _this.activeCollection = collection;
                if (collection.id) {
                    _this.commentParentObject = { objectType: 'collection', objectId: collection.id };
                    _this.store.dispatch(function (factory) { return factory.comment.getCounts(_this.commentParentObject); });
                }
                _this.changeDetectorRef.markForCheck();
            });
        this.routeSubscription = this.route.params.subscribe(function (params) { return _this.buildRouteParams(params); });
        var config = this.store.snapshotCloned(function (state) { return state.uiConfig.components; });
        this.commentFormConfig = config.collectionComment.config.form.items;
        this.newCollectionFormConfig = config.collection.config;
    };
    CollectionShowComponent.prototype.ngOnDestroy = function () {
        this.activeCollectionSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    };
    CollectionShowComponent.prototype.changePage = function (i) {
        this.buildRouteParams({ i: i });
        this.router.navigate(['/collections/' + this.activeCollection.id, this.routeParams]);
    };
    CollectionShowComponent.prototype.setCollectionForDelete = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.dialog.showConfirmation({
            title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: _this.activeCollection.name } },
            message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: _this.activeCollection.name } },
            decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
            accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE'
        }, function () { return _this.deleteCollection(_this.activeCollection.id); }); });
    };
    CollectionShowComponent.prototype.deleteCollection = function (id) {
        var _this = this;
        this.router.navigate(['/collections']);
        this.collections.delete(id).subscribe(function (response) {
            _this.store.dispatch(function (factory) { return factory.snackbar.display('COLLECTION.INDEX.DELETE_SUCCESS_TOAST'); });
        });
    };
    CollectionShowComponent.prototype.addAssetToCartOrQuote = function (asset) {
        var _this = this;
        var params = { lineItem: { asset: asset } };
        if (this.userCan.administerQuotes()) {
            this.store.dispatch(function (factory) { return factory.quoteEdit.addAssetToProjectInQuote(params); });
        }
        else {
            this.cart.addAssetToProjectInCart(params);
        }
        this.store.dispatch(function (factory) {
            return factory.snackbar.display(_this.userCan.administerQuotes() ? 'ASSET.ADD_TO_QUOTE_TOAST' : 'ASSET.ADD_TO_CART_TOAST', { assetId: asset.name });
        });
    };
    CollectionShowComponent.prototype.addToDifferentCollection = function (asset) {
        var _this = this;
        var focusedCollection;
        this.dialogService.openComponentInDialog({
            componentType: collections_list_dd_component_1.CollectionListDdComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
            inputOptions: {
                focusedCollection: this.activeCollection,
                roleFilter: ['owner', 'editor'],
                editMode: true
            },
            outputOptions: [{
                    event: 'close',
                    callback: function (collection) {
                        if (collection) {
                            _this.store.dispatch(function (factory) {
                                return factory.collections.addAssetToCollection(collection, asset);
                            });
                        }
                    },
                    closeOnEvent: true
                }]
        });
    };
    CollectionShowComponent.prototype.getAssetsForLink = function () {
        this.dialogService.openComponentInDialog({
            componentType: collection_link_component_1.CollectionLinkComponent,
            inputOptions: { assets: this.activeCollection.assets.items }
        });
    };
    CollectionShowComponent.prototype.editAsset = function (asset) {
        var _this = this;
        this.store.callLegacyServiceMethod(function (service) { return service.asset.getClipPreviewData(asset.assetId); })
            .subscribe(function (data) {
            _this.document.body.classList.add('subclipping-edit-open');
            asset.clipUrl = data.url;
            _this.dialogService.openComponentInDialog({
                componentType: wz_subclip_editor_component_1.WzSubclipEditorComponent,
                dialogConfig: { width: '544px' },
                inputOptions: {
                    window: _this.window.nativeWindow,
                    enhancedAsset: asset,
                    alreadyUsedMarkersList: _this.getAlreadyUsedMarkersListFor(asset)
                },
                outputOptions: [
                    {
                        event: 'cancel',
                        callback: function (event) { return true; },
                        closeOnEvent: true
                    },
                    {
                        event: 'save',
                        callback: function (updatedMarkers) {
                            _this.store.dispatch(function (factory) { return factory.activeCollection.updateAssetMarkers(asset, updatedMarkers); });
                        },
                        closeOnEvent: true
                    }
                ]
            }).subscribe(function (_) {
                _this.document.body.classList.remove('subclipping-edit-open');
            });
        });
    };
    CollectionShowComponent.prototype.editCollection = function () {
        this.dialogService.openComponentInDialog(this.collectionFormComponentOptions('edit', common_functions_1.Common.clone(this.activeCollection)));
    };
    CollectionShowComponent.prototype.duplicateCollection = function () {
        var _this = this;
        this.collections.getByIdAndDuplicate(this.activeCollection.id)
            .subscribe(function (collection) {
            _this.dialogService.openComponentInDialog(_this.collectionFormComponentOptions('duplicate', collection));
        });
    };
    CollectionShowComponent.prototype.onChangeAssetView = function (assetView) {
        this.userPreference.updateAssetViewPreference(assetView);
    };
    CollectionShowComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(CollectionShowComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.collection.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionShowComponent.prototype, "userCanEditCollection", {
        get: function () {
            return this.userCan.editCollection(this.activeCollection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionShowComponent.prototype, "collectionIsShared", {
        get: function () {
            return !!this.activeCollection.editors || !!this.activeCollection.viewers ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    CollectionShowComponent.prototype.showShareMembers = function () {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_members_component_1.CollectionShareMembersComponent,
            dialogConfig: { position: { top: '12%' } },
            inputOptions: {
                collection: this.activeCollection,
            },
            outputOptions: [{
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    Object.defineProperty(CollectionShowComponent.prototype, "collectionViewerIsOwner", {
        get: function () {
            return this.activeCollection.userRole === 'owner';
        },
        enumerable: true,
        configurable: true
    });
    CollectionShowComponent.prototype.createShareDialog = function () {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_component_1.CollectionShareComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
            inputOptions: {
                reloadType: 'activeCollection',
                collection: common_functions_1.Common.clone(this.activeCollection),
            },
            outputOptions: [{
                    event: 'closeRequest',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionShowComponent.prototype.buildRouteParams = function (params) {
        this.routeParams = Object.assign({}, this.routeParams, params);
        delete this.routeParams['id'];
    };
    CollectionShowComponent.prototype.collectionFormComponentOptions = function (actionType, collection) {
        var _this = this;
        return {
            componentType: collection_form_component_1.CollectionFormComponent,
            inputOptions: {
                collection: collection,
                fields: this.newCollectionFormConfig,
                collectionActionType: actionType
            },
            outputOptions: [{
                    event: 'collectionSaved',
                    callback: function (event) {
                        _this.store.dispatch(function (factory) { return factory.router.goToCollection(event.collectionId); });
                    },
                    closeOnEvent: true
                }]
        };
    };
    CollectionShowComponent.prototype.getAlreadyUsedMarkersListFor = function (asset) {
        return this.activeCollection.assets.items
            .filter(function (collectionAsset) {
            return collectionAsset.assetId === asset.assetId && collectionAsset.uuid !== asset.uuid;
        }).map(function (collectionAsset) {
            return collectionAsset.subclipMarkers;
        });
    };
    CollectionShowComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-show',
                    templateUrl: 'collection-show.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionShowComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: router_1.Router, },
        { type: collections_service_1.CollectionsService, },
        { type: cart_service_1.CartService, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: router_1.ActivatedRoute, },
        { type: window_ref_service_1.WindowRef, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return CollectionShowComponent;
}());
exports.CollectionShowComponent = CollectionShowComponent;
//# sourceMappingURL=collection-show.component.js.map