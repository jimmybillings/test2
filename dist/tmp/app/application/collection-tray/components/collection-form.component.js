"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collections_service_1 = require("../../../shared/services/collections.service");
var collection_context_service_1 = require("../../../shared/services/collection-context.service");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var CollectionFormComponent = (function () {
    function CollectionFormComponent(collectionsService, detector, collectionContext, store) {
        this.collectionsService = collectionsService;
        this.detector = detector;
        this.collectionContext = collectionContext;
        this.store = store;
        this.collection = null;
        this.collectionActionType = 'create';
        this.collectionSaved = new core_1.EventEmitter();
        this.formItems = [];
        this.defaultCollectionParams = {
            q: '',
            accessLevel: 'all',
            s: '',
            d: '',
            i: 0,
            n: 200
        };
    }
    CollectionFormComponent.prototype.ngOnInit = function () {
        this.formItems = this.setForm();
        switch (this.collectionActionType) {
            case 'create':
                this.tr = {
                    title: 'COLLECTION.NEW_TITLE',
                    submitLabel: 'COLLECTION.FORM.SUBMIT_LABEL'
                };
                break;
            case 'edit':
                this.tr = {
                    title: 'COLLECTION.EDIT.TITLE',
                    submitLabel: 'COLLECTION.EDIT.SUBMIT_LABEL'
                };
                break;
            case 'duplicate':
                this.tr = {
                    title: 'COLLECTION.DUPLICATE.TITLE',
                    submitLabel: 'COLLECTION.DUPLICATE.SUBMIT_LABEL'
                };
                break;
        }
        this.tr.close = 'COLLECTION.FORM.CLOSE_HOVER_TITLE';
    };
    CollectionFormComponent.prototype.collectionAction = function (collection) {
        switch (this.collectionActionType) {
            case 'create':
                this.createCollection(collection);
                break;
            case 'edit':
                this.editCollection(collection);
                break;
            case 'duplicate':
                this.duplicateCollection(collection);
                break;
        }
    };
    CollectionFormComponent.prototype.createCollection = function (collection) {
        var _this = this;
        collection.tags = collection.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; });
        this.collectionsService.create(collection).subscribe(function (collection) {
            _this.collectionSaved.emit({ collectionId: collection.id });
            _this.refreshCollections();
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.editCollection = function (collectionUpdates) {
        var _this = this;
        var backEndReadyCollectionUpdates = __assign({}, collectionUpdates, { tags: collectionUpdates.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; }) });
        this.collectionsService.update(this.collection.id, backEndReadyCollectionUpdates)
            .subscribe(function () {
            _this.collectionSaved.emit({ collectionId: _this.collection.id });
            _this.loadCollections();
            if (_this.store.match(_this.collection.id, function (state) { return state.activeCollection.collection.id; })) {
                _this.getActiveCollection();
            }
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.duplicateCollection = function (collection) {
        var _this = this;
        collection = Object.assign({}, this.collection, collection, {
            tags: collection.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; })
        });
        this.collectionsService.duplicate(collection)
            .subscribe(function (collection) {
            _this.refreshCollections();
            _this.collectionSaved.emit({ collectionId: collection.id });
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.loadCollections = function () {
        this.collectionsService.load(this.defaultCollectionParams).subscribe();
    };
    CollectionFormComponent.prototype.getActiveCollection = function () {
        this.store.dispatch(function (factory) { return factory.activeCollection.load(); });
    };
    CollectionFormComponent.prototype.error = function (error) {
        this.serverErrors = error.json();
        this.detector.markForCheck();
    };
    CollectionFormComponent.prototype.refreshCollections = function () {
        this.collectionContext.resetCollectionOptions();
        this.getActiveCollection();
        this.loadCollections();
    };
    CollectionFormComponent.prototype.setForm = function () {
        var _this = this;
        this.fields = common_functions_1.Common.clone(this.fields);
        return this.fields.form.items.map(function (item) {
            if (item.name === 'name' && _this.collection) {
                item.value = _this.collection.name;
                if (_this.collectionActionType === 'duplicate') {
                    item.value = "Copy - " + item.value;
                }
            }
            if (item.type === 'tags') {
                item.tags = (_this.collection && _this.collection.tags)
                    ? _this.collection.tags.filter(function (tag) { return tag !== ''; }) : [];
                item.value = (_this.collection && _this.collection.tags)
                    ? _this.collection.tags.toString() : '';
            }
            return item;
        });
    };
    CollectionFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-form',
                    templateUrl: 'collection-form.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionFormComponent.ctorParameters = function () { return [
        { type: collections_service_1.CollectionsService, },
        { type: core_1.ChangeDetectorRef, },
        { type: collection_context_service_1.CollectionContextService, },
        { type: app_store_1.AppStore, },
    ]; };
    CollectionFormComponent.propDecorators = {
        'fields': [{ type: core_1.Input },],
        'collection': [{ type: core_1.Input },],
        'collectionActionType': [{ type: core_1.Input },],
        'collectionSaved': [{ type: core_1.Output },],
    };
    return CollectionFormComponent;
}());
exports.CollectionFormComponent = CollectionFormComponent;
//# sourceMappingURL=collection-form.component.js.map