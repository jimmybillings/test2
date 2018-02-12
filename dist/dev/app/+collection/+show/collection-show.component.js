"use strict";
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
    CollectionShowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-show',
            templateUrl: 'collection-show.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(8, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            router_1.Router,
            collections_service_1.CollectionsService,
            cart_service_1.CartService,
            user_preference_service_1.UserPreferenceService,
            router_1.ActivatedRoute,
            window_ref_service_1.WindowRef,
            wz_dialog_service_1.WzDialogService, Object, app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], CollectionShowComponent);
    return CollectionShowComponent;
}());
exports.CollectionShowComponent = CollectionShowComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi8rc2hvdy9jb2xsZWN0aW9uLXNob3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBRXVCO0FBQ3ZCLDhEQUFxRDtBQUVyRCxpRkFBK0U7QUFJL0UsMENBQXlEO0FBQ3pELG1GQUEwRTtBQUMxRSxtRUFBaUU7QUFDakUseUZBQXNGO0FBQ3RGLHFGQUFrRjtBQUNsRixvSEFBaUg7QUFDakgscUhBQWlIO0FBQ2pILHVHQUFtRztBQUNuRywrRUFBcUU7QUFJckUsK0ZBQTRGO0FBRzVGLDZDQUEyQztBQUMzQyx5RUFBcUY7QUFDckYsNEVBQWlFO0FBQ2pFLHVGQUFvRjtBQUNwRiw0SEFBdUg7QUFTdkg7SUFVRSxpQ0FDUyxPQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBK0IsRUFDL0IsSUFBaUIsRUFDakIsY0FBcUMsRUFDcEMsS0FBcUIsRUFDckIsTUFBaUIsRUFDakIsYUFBOEIsRUFDWixRQUFjLEVBQ2hDLEtBQWUsRUFDZixpQkFBb0M7UUFWckMsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3BDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQ1osYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWhCdkMsaUJBQVksR0FBWSxJQUFJLENBQUM7SUFpQnBDLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksQ0FBQyw0QkFBNEI7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxN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RCwrQ0FBcUI7WUFDN0IsdUJBQWM7WUFDYiw4QkFBUztZQUNGLG1DQUFlLFVBRXZCLG9CQUFRO1lBQ0ksd0JBQWlCO09BckJuQyx1QkFBdUIsQ0E2UW5DO0lBQUQsOEJBQUM7Q0E3UUQsQUE2UUMsSUFBQTtBQTdRWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uLytzaG93L2NvbGxlY3Rpb24tc2hvdy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IENvbGxlY3Rpb24sIENvbGxlY3Rpb25BY3Rpb25UeXBlLCBDb2xsZWN0aW9uRm9ybUV2ZW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUHJlZmVyZW5jZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkxpbmtDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkZvcm1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9uLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFd6U3ViY2xpcEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3d6LXN1YmNsaXAtZWRpdG9yL3d6LnN1YmNsaXAtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2hhcmVNZW1iZXJzQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb2xsZWN0aW9uLXNoYXJlLW1lbWJlcnMuY29tcG9uZW50JztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgQWRkQXNzZXRQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1lbnRQYXJlbnRPYmplY3QgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3pFdmVudCwgQ29vcmRzLCBQb2pvLCBBc3NldCwgVWlDb25maWdDb21wb25lbnRzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQsIGVuaGFuY2VBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2hhcmVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tc2hhcmUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25MaXN0RGRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9ucy1saXN0LWRkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NvbGxlY3Rpb24tc2hvdycsXG4gIHRlbXBsYXRlVXJsOiAnY29sbGVjdGlvbi1zaG93Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25TaG93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgYWN0aXZlQ29sbGVjdGlvbjogQ29sbGVjdGlvbjtcbiAgcHVibGljIGNvbW1lbnRGb3JtQ29uZmlnOiBGb3JtRmllbGRzO1xuICBwdWJsaWMgbmV3Q29sbGVjdGlvbkZvcm1Db25maWc6IGFueTtcbiAgcHVibGljIGNvbW1lbnRQYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3Q7XG4gIHB1YmxpYyBzaG93Q29tbWVudHM6IGJvb2xlYW4gPSBudWxsO1xuICBwcml2YXRlIGFjdGl2ZUNvbGxlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByb3V0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJvdXRlUGFyYW1zOiBQb2pvO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDYXBhYmlsaXRpZXMsXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxuICAgIHB1YmxpYyBjb2xsZWN0aW9uczogQ29sbGVjdGlvbnNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjYXJ0OiBDYXJ0U2VydmljZSxcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93UmVmLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogV3pEaWFsb2dTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IFBvam8sXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZlQ29sbGVjdGlvblN1YnNjcmlwdGlvbiA9XG4gICAgICB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uKVxuICAgICAgICAuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZS5sb2FkaW5nKVxuICAgICAgICAubWFwKHN0YXRlID0+IHtcbiAgICAgICAgICBsZXQgY29sbGVjdGlvbjogQ29sbGVjdGlvbiA9IENvbW1vbi5jbG9uZShzdGF0ZS5jb2xsZWN0aW9uKTtcbiAgICAgICAgICBpZiAoY29sbGVjdGlvbi5hc3NldHMgJiYgY29sbGVjdGlvbi5hc3NldHMuaXRlbXMpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uYXNzZXRzLml0ZW1zID0gY29sbGVjdGlvbi5hc3NldHMuaXRlbXNcbiAgICAgICAgICAgICAgLm1hcChpdGVtID0+IGVuaGFuY2VBc3NldChpdGVtLCAnY29sbGVjdGlvbicsIGNvbGxlY3Rpb24uaWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoY29sbGVjdGlvbiA9PiB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICAgICAgICBpZiAoY29sbGVjdGlvbi5pZCkgeyAvLyBXZSBvbmx5IHdhbnQgdG8gZG8gdGhlc2UgdGhpbmdzIHdoZW4gdGhlcmUgaXMgYSB2YWxpZCBhY3RpdmUgY29sbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5jb21tZW50UGFyZW50T2JqZWN0ID0geyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiBjb2xsZWN0aW9uLmlkIH07XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21tZW50LmdldENvdW50cyh0aGlzLmNvbW1lbnRQYXJlbnRPYmplY3QpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVGhlIHZpZXcgbmVlZHMgdG8gdXBkYXRlIHdoZW5ldmVyIHRoZSBhY3RpdmVDb2xsZWN0aW9uIGNoYW5nZXMgKGluY2x1ZGluZyBpbmRpdmlkdWFsIGFzc2V0cykuICBUaGlzIGlzXG4gICAgICAgICAgLy8gYSBkaXJlY3Qgc3RvcmUgc3Vic2NyaXB0aW9uLCBub3QgYW4gQElucHV0KCksIHNvIHdlIGhhdmUgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG91cnNlbHZlcy5cbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcblxuICAgIHRoaXMucm91dGVTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyhwYXJhbXMpKTtcblxuICAgIGNvbnN0IGNvbmZpZzogVWlDb25maWdDb21wb25lbnRzID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzKTtcbiAgICB0aGlzLmNvbW1lbnRGb3JtQ29uZmlnID0gY29uZmlnLmNvbGxlY3Rpb25Db21tZW50LmNvbmZpZy5mb3JtLml0ZW1zO1xuICAgIHRoaXMubmV3Q29sbGVjdGlvbkZvcm1Db25maWcgPSBjb25maWcuY29sbGVjdGlvbi5jb25maWc7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZUNvbGxlY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnJvdXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlUGFnZShpOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmJ1aWxkUm91dGVQYXJhbXMoeyBpIH0pO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvbGxlY3Rpb25zLycgKyB0aGlzLmFjdGl2ZUNvbGxlY3Rpb24uaWQsIHRoaXMucm91dGVQYXJhbXNdKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb2xsZWN0aW9uRm9yRGVsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmRpYWxvZy5zaG93Q29uZmlybWF0aW9uKHtcbiAgICAgIHRpdGxlOiB7IGtleTogJ0NPTExFQ1RJT04uSU5ERVguQ09ORklSTUFUSU9OX1RJVExFJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lOiB0aGlzLmFjdGl2ZUNvbGxlY3Rpb24ubmFtZSB9IH0sXG4gICAgICBtZXNzYWdlOiB7IGtleTogJ0NPTExFQ1RJT04uSU5ERVguQ09ORklSTUFUSU9OX1NVQlRJVExFJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lOiB0aGlzLmFjdGl2ZUNvbGxlY3Rpb24ubmFtZSB9IH0sXG4gICAgICBkZWNsaW5lOiAnQ09MTEVDVElPTi5JTkRFWC5DT05GSVJNQVRJT05fQ0FOQ0VMX0JUTl9USVRMRScsXG4gICAgICBhY2NlcHQ6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9ERUxFVEVfQlROX1RJVExFJ1xuICAgIH0sICgpID0+IHRoaXMuZGVsZXRlQ29sbGVjdGlvbih0aGlzLmFjdGl2ZUNvbGxlY3Rpb24uaWQpKSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlQ29sbGVjdGlvbihpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY29sbGVjdGlvbnMnXSk7XG4gICAgdGhpcy5jb2xsZWN0aW9ucy5kZWxldGUoaWQpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdDT0xMRUNUSU9OLklOREVYLkRFTEVURV9TVUNDRVNTX1RPQVNUJykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZEFzc2V0VG9DYXJ0T3JRdW90ZShhc3NldDogQXNzZXQpOiB2b2lkIHtcbiAgICBsZXQgcGFyYW1zOiBBZGRBc3NldFBhcmFtZXRlcnMgPSB7IGxpbmVJdGVtOiB7IGFzc2V0OiBhc3NldCB9IH07XG5cbiAgICBpZiAodGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZShwYXJhbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYXJ0LmFkZEFzc2V0VG9Qcm9qZWN0SW5DYXJ0KHBhcmFtcyk7XG4gICAgfVxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PlxuICAgICAgZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KFxuICAgICAgICB0aGlzLnVzZXJDYW4uYWRtaW5pc3RlclF1b3RlcygpID8gJ0FTU0VULkFERF9UT19RVU9URV9UT0FTVCcgOiAnQVNTRVQuQUREX1RPX0NBUlRfVE9BU1QnLFxuICAgICAgICB7IGFzc2V0SWQ6IGFzc2V0Lm5hbWUgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYWRkVG9EaWZmZXJlbnRDb2xsZWN0aW9uKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogdm9pZCB7XG4gICAgbGV0IGZvY3VzZWRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coe1xuICAgICAgY29tcG9uZW50VHlwZTogQ29sbGVjdGlvbkxpc3REZENvbXBvbmVudCxcbiAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ2NvbGxlY3Rpb24tbGlzdC1kZC1jb21wb25lbnQnIH0sXG4gICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgZm9jdXNlZENvbGxlY3Rpb246IHRoaXMuYWN0aXZlQ29sbGVjdGlvbixcbiAgICAgICAgcm9sZUZpbHRlcjogWydvd25lcicsICdlZGl0b3InXSxcbiAgICAgICAgZWRpdE1vZGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICBldmVudDogJ2Nsb3NlJyxcbiAgICAgICAgY2FsbGJhY2s6IChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PlxuICAgICAgICAgICAgICBmYWN0b3J5LmNvbGxlY3Rpb25zLmFkZEFzc2V0VG9Db2xsZWN0aW9uKGNvbGxlY3Rpb24sIGFzc2V0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBc3NldHNGb3JMaW5rKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25MaW5rQ29tcG9uZW50LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHsgYXNzZXRzOiB0aGlzLmFjdGl2ZUNvbGxlY3Rpb24uYXNzZXRzLml0ZW1zIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGVkaXRBc3NldChhc3NldDogRW5oYW5jZWRBc3NldCkge1xuICAgIHRoaXMuc3RvcmUuY2FsbExlZ2FjeVNlcnZpY2VNZXRob2Qoc2VydmljZSA9PiBzZXJ2aWNlLmFzc2V0LmdldENsaXBQcmV2aWV3RGF0YShhc3NldC5hc3NldElkKSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzdWJjbGlwcGluZy1lZGl0LW9wZW4nKTtcbiAgICAgICAgYXNzZXQuY2xpcFVybCA9IGRhdGEudXJsO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IFd6U3ViY2xpcEVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyB3aWR0aDogJzU0NHB4JyB9LFxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHdpbmRvdzogdGhpcy53aW5kb3cubmF0aXZlV2luZG93LFxuICAgICAgICAgICAgICBlbmhhbmNlZEFzc2V0OiBhc3NldCxcbiAgICAgICAgICAgICAgYWxyZWFkeVVzZWRNYXJrZXJzTGlzdDogdGhpcy5nZXRBbHJlYWR5VXNlZE1hcmtlcnNMaXN0Rm9yKGFzc2V0KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogKGV2ZW50OiBQb2pvKSA9PiB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdzYXZlJyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogKHVwZGF0ZWRNYXJrZXJzOiBTdWJjbGlwTWFya2VycykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi51cGRhdGVBc3NldE1hcmtlcnMoYXNzZXQsIHVwZGF0ZWRNYXJrZXJzKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3N1YmNsaXBwaW5nLWVkaXQtb3BlbicpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGVkaXRDb2xsZWN0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB0aGlzLmNvbGxlY3Rpb25Gb3JtQ29tcG9uZW50T3B0aW9ucygnZWRpdCcsIENvbW1vbi5jbG9uZSh0aGlzLmFjdGl2ZUNvbGxlY3Rpb24pKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZHVwbGljYXRlQ29sbGVjdGlvbigpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25zLmdldEJ5SWRBbmREdXBsaWNhdGUodGhpcy5hY3RpdmVDb2xsZWN0aW9uLmlkKVxuICAgICAgLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25Gb3JtQ29tcG9uZW50T3B0aW9ucygnZHVwbGljYXRlJywgY29sbGVjdGlvbilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlQXNzZXRWaWV3KGFzc2V0Vmlldzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VyUHJlZmVyZW5jZS51cGRhdGVBc3NldFZpZXdQcmVmZXJlbmNlKGFzc2V0Vmlldyk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0NvbW1lbnRzID0gIXRoaXMuc2hvd0NvbW1lbnRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjb21tZW50Q291bnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY29tbWVudC5jb2xsZWN0aW9uLnBhZ2luYXRpb24udG90YWxDb3VudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVzZXJDYW5FZGl0Q29sbGVjdGlvbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmVkaXRDb2xsZWN0aW9uKHRoaXMuYWN0aXZlQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxlY3Rpb25Jc1NoYXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmFjdGl2ZUNvbGxlY3Rpb24uZWRpdG9ycyB8fCAhIXRoaXMuYWN0aXZlQ29sbGVjdGlvbi52aWV3ZXJzID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNob3dTaGFyZU1lbWJlcnMoKSB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgIHtcbiAgICAgICAgY29tcG9uZW50VHlwZTogQ29sbGVjdGlvblNoYXJlTWVtYmVyc0NvbXBvbmVudCxcbiAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzEyJScgfSB9LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICBjb2xsZWN0aW9uOiB0aGlzLmFjdGl2ZUNvbGxlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRydWUsXG4gICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGVjdGlvblZpZXdlcklzT3duZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ29sbGVjdGlvbi51c2VyUm9sZSA9PT0gJ293bmVyJztcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVTaGFyZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAge1xuICAgICAgICBjb21wb25lbnRUeXBlOiBDb2xsZWN0aW9uU2hhcmVDb21wb25lbnQsXG4gICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ3d6LXNoYXJlLWRpYWxvZycgfSxcbiAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgcmVsb2FkVHlwZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIGNvbGxlY3Rpb246IENvbW1vbi5jbG9uZSh0aGlzLmFjdGl2ZUNvbGxlY3Rpb24pLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgIGV2ZW50OiAnY2xvc2VSZXF1ZXN0JyxcbiAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFJvdXRlUGFyYW1zKHBhcmFtczogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMucm91dGVQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlUGFyYW1zLCBwYXJhbXMpO1xuICAgIGRlbGV0ZSB0aGlzLnJvdXRlUGFyYW1zWydpZCddO1xuICB9XG5cbiAgcHJpdmF0ZSBjb2xsZWN0aW9uRm9ybUNvbXBvbmVudE9wdGlvbnMoYWN0aW9uVHlwZTogQ29sbGVjdGlvbkFjdGlvblR5cGUsIGNvbGxlY3Rpb246IFBvam8pIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50VHlwZTogQ29sbGVjdGlvbkZvcm1Db21wb25lbnQsXG4gICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgZmllbGRzOiB0aGlzLm5ld0NvbGxlY3Rpb25Gb3JtQ29uZmlnLFxuICAgICAgICBjb2xsZWN0aW9uQWN0aW9uVHlwZTogYWN0aW9uVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgIGV2ZW50OiAnY29sbGVjdGlvblNhdmVkJyxcbiAgICAgICAgY2FsbGJhY2s6IChldmVudDogQ29sbGVjdGlvbkZvcm1FdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvQ29sbGVjdGlvbihldmVudC5jb2xsZWN0aW9uSWQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICB9XVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldEFscmVhZHlVc2VkTWFya2Vyc0xpc3RGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBTdWJjbGlwTWFya2Vyc1tdIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDb2xsZWN0aW9uLmFzc2V0cy5pdGVtc1xuICAgICAgLmZpbHRlcigoY29sbGVjdGlvbkFzc2V0OiBFbmhhbmNlZEFzc2V0KSA9PlxuICAgICAgICBjb2xsZWN0aW9uQXNzZXQuYXNzZXRJZCA9PT0gYXNzZXQuYXNzZXRJZCAmJiBjb2xsZWN0aW9uQXNzZXQudXVpZCAhPT0gYXNzZXQudXVpZFxuICAgICAgKS5tYXAoKGNvbGxlY3Rpb25Bc3NldDogRW5oYW5jZWRBc3NldCkgPT5cbiAgICAgICAgY29sbGVjdGlvbkFzc2V0LnN1YmNsaXBNYXJrZXJzXG4gICAgICApO1xuICB9XG59XG4iXX0=
