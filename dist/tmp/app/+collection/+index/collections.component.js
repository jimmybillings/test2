"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_share_component_1 = require("../components/collection-share.component");
var core_1 = require("@angular/core");
var collections_service_1 = require("../../shared/services/collections.service");
var router_1 = require("@angular/router");
var current_user_service_1 = require("../../shared/services/current-user.service");
var collection_context_service_1 = require("../../shared/services/collection-context.service");
var collection_link_component_1 = require("../components/collection-link.component");
var collection_form_component_1 = require("../../application/collection-tray/components/collection-form.component");
var collection_share_members_component_1 = require("../components/collection-share-members.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../app.store");
var common_functions_1 = require("../../shared/utilities/common.functions");
var CollectionsComponent = (function () {
    function CollectionsComponent(router, collections, collectionContext, currentUser, dialogService, store) {
        this.router = router;
        this.collections = collections;
        this.collectionContext = collectionContext;
        this.currentUser = currentUser;
        this.dialogService = dialogService;
        this.store = store;
        this.collectionSearchIsShowing = false;
        this.filterOptions = [];
        this.sortOptions = [];
        this.filterOptions = [
            {
                'first': {
                    'id': 0, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL', 'value': 'all',
                    'access': { 'accessLevel': 'all' }
                },
                'second': {
                    'id': 1, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.OWNER',
                    'value': 'owner',
                    'access': { 'accessLevel': 'owner' }
                }
            },
            {
                'first': {
                    'id': 2, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.EDITOR',
                    'value': 'editor',
                    'access': { 'accessLevel': 'editor' }
                },
                'second': {
                    'id': 3, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.VIEWER',
                    'value': 'viewer',
                    'access': { 'accessLevel': 'viewer' }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.RESEARCHER',
                    'value': 'researcher',
                    'access': { 'accessLevel': 'researcher' }
                }
            }
        ];
        this.sortOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
                    'value': 'modNewest',
                    'sort': { 's': 'lastUpdated', 'd': true }
                },
                'second': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_OLDEST',
                    'value': 'modOldest',
                    'sort': {
                        's': 'lastUpdated', 'd': false
                    }
                }
            },
            {
                'first': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_NEWEST',
                    'value': 'createNewest',
                    'sort': {
                        's': 'createdOn', 'd': true
                    }
                },
                'second': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_OLDEST',
                    'value': 'createOldest',
                    'sort': { 's': 'createdOn', 'd': false }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_ASC',
                    'value': 'alphaAsc',
                    'sort': { 's': 'name', 'd': false }
                },
                'second': {
                    'id': 5,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_DESC',
                    'value': 'alphaDesc',
                    'sort': { 's': 'name', 'd': true }
                }
            }
        ];
    }
    Object.defineProperty(CollectionsComponent.prototype, "collectionContextData", {
        get: function () {
            return this.collectionContext.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionsComponent.prototype, "activeCollection", {
        get: function () {
            return this.store.select(function (state) { return state.activeCollection.collection; });
        },
        enumerable: true,
        configurable: true
    });
    CollectionsComponent.prototype.toggleCollectionSearch = function () {
        this.collectionSearchIsShowing = !this.collectionSearchIsShowing;
    };
    CollectionsComponent.prototype.selectActiveCollection = function (id) {
        this.store.dispatch(function (factory) { return factory.activeCollection.set(id); });
    };
    CollectionsComponent.prototype.setCollectionForDelete = function (collection) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.dialog.showConfirmation({
            title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: collection.name } },
            message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: collection.name } },
            decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
            accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE',
        }, function () { return _this.deleteCollection(collection.id); }); });
    };
    CollectionsComponent.prototype.deleteCollection = function (id) {
        this.collections.delete(id, true).subscribe();
    };
    CollectionsComponent.prototype.search = function (query) {
        this.collectionContext.updateCollectionOptions({ currentSearchQuery: query });
        this.collections.load(query, true).subscribe();
    };
    CollectionsComponent.prototype.onFilterCollections = function (filter) {
        this.collectionContext.updateCollectionOptions({ currentFilter: filter });
        this.collections.load(filter.access, true).subscribe();
    };
    CollectionsComponent.prototype.onSortCollections = function (sort) {
        this.collectionContext.updateCollectionOptions({ currentSort: sort });
        this.collections.load(sort.sort, true).subscribe();
    };
    CollectionsComponent.prototype.isActiveCollection = function (collectionId) {
        return this.store.match(collectionId, function (state) { return state.activeCollection.collection.id; });
    };
    CollectionsComponent.prototype.getAssetsForLink = function (collectionId) {
        var _this = this;
        this.collections.getItems(collectionId).subscribe(function (data) {
            _this.dialogService.openComponentInDialog({
                componentType: collection_link_component_1.CollectionLinkComponent,
                inputOptions: { assets: data.items }
            });
        });
    };
    CollectionsComponent.prototype.editCollection = function (collection) {
        this.dialogService.openComponentInDialog(this.collectionFormComponentOptions('edit', common_functions_1.Common.clone(collection)));
    };
    CollectionsComponent.prototype.showShareMembers = function (collection) {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_members_component_1.CollectionShareMembersComponent,
            dialogConfig: { position: { top: '12%' } },
            inputOptions: {
                collection: common_functions_1.Common.clone(collection),
            },
            outputOptions: [{
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionsComponent.prototype.createCollection = function () {
        this.dialogService.openComponentInDialog(this.collectionFormComponentOptions('create'));
    };
    CollectionsComponent.prototype.onDuplicateCollection = function (collectionId) {
        var _this = this;
        this.collections.getByIdAndDuplicate(collectionId)
            .subscribe(function (collection) {
            _this.dialogService.openComponentInDialog(_this.collectionFormComponentOptions('duplicate', collection));
        });
    };
    CollectionsComponent.prototype.onCreateShareDialog = function (collection) {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_component_1.CollectionShareComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
            inputOptions: {
                reloadType: 'collections',
                collection: common_functions_1.Common.clone(collection),
            },
            outputOptions: [{
                    event: 'closeRequest',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionsComponent.prototype.collectionFormComponentOptions = function (actionType, collection) {
        if (collection === void 0) { collection = false; }
        return {
            componentType: collection_form_component_1.CollectionFormComponent,
            inputOptions: {
                collection: collection,
                fields: this.formFields,
                collectionActionType: actionType
            },
            outputOptions: [{
                    event: 'collectionSaved',
                    callback: function (event) { return true; },
                    closeOnEvent: true
                }]
        };
    };
    Object.defineProperty(CollectionsComponent.prototype, "formFields", {
        get: function () {
            return this.store.snapshotCloned(function (state) { return state.uiConfig.components.collection.config; });
        },
        enumerable: true,
        configurable: true
    });
    CollectionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collections-component',
                    templateUrl: 'collections.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionsComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: collections_service_1.CollectionsService, },
        { type: collection_context_service_1.CollectionContextService, },
        { type: current_user_service_1.CurrentUserService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionsComponent;
}());
exports.CollectionsComponent = CollectionsComponent;
//# sourceMappingURL=collections.component.js.map