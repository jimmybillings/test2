"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var WzCollectionItemListComponent = (function () {
    function WzCollectionItemListComponent(userCan) {
        this.userCan = userCan;
        this.editCollection = new core_1.EventEmitter();
        this.showShareMembers = new core_1.EventEmitter();
        this.setActiveCollection = new core_1.EventEmitter();
        this.deleteCollection = new core_1.EventEmitter();
        this.generateCollectionLink = new core_1.EventEmitter();
        this.duplicateCollection = new core_1.EventEmitter();
        this.createShareDialog = new core_1.EventEmitter();
    }
    WzCollectionItemListComponent.prototype.selectActiveCollection = function (collectionId) {
        this.setActiveCollection.emit(collectionId);
    };
    WzCollectionItemListComponent.prototype.thumbnail = function (thumbnail) {
        return (thumbnail && thumbnail.urls && thumbnail.urls.https) ? thumbnail.urls.https : '/assets/img/tbn_missing.jpg';
    };
    WzCollectionItemListComponent.prototype.setCurrentCollection = function (collection) {
        this.currentCollection = collection;
    };
    WzCollectionItemListComponent.prototype.collectionIsShared = function (collection) {
        return !!collection.editors || !!collection.viewers ? true : false;
    };
    WzCollectionItemListComponent.prototype.edit = function (collection) {
        this.editCollection.emit(collection);
    };
    WzCollectionItemListComponent.prototype.sharedMembers = function (collection) {
        this.showShareMembers.emit(collection);
    };
    WzCollectionItemListComponent.prototype.userCanEditCollection = function (collection) {
        return this.userCan.editCollection(collection);
    };
    WzCollectionItemListComponent.prototype.collectionViewerIsOwner = function (collection) {
        return collection.userRole === 'owner';
    };
    WzCollectionItemListComponent.prototype.delete = function (collection) {
        this.deleteCollection.emit(collection);
    };
    WzCollectionItemListComponent.prototype.duplicate = function () {
        this.duplicateCollection.emit(this.currentCollection.id);
    };
    WzCollectionItemListComponent.prototype.generateLegacyLink = function () {
        this.generateCollectionLink.emit(this.currentCollection.id);
    };
    WzCollectionItemListComponent.prototype.notOwnerOf = function (collection) {
        return collection.userRole !== 'owner';
    };
    WzCollectionItemListComponent.prototype.onCreateShareDialog = function (collection) {
        this.createShareDialog.emit(collection);
    };
    WzCollectionItemListComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-collection-item-list',
                    templateUrl: 'wz.collection-item-list.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzCollectionItemListComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
    ]; };
    WzCollectionItemListComponent.propDecorators = {
        'collections': [{ type: core_1.Input },],
        'activeCollection': [{ type: core_1.Input },],
        'editCollection': [{ type: core_1.Output },],
        'showShareMembers': [{ type: core_1.Output },],
        'setActiveCollection': [{ type: core_1.Output },],
        'deleteCollection': [{ type: core_1.Output },],
        'generateCollectionLink': [{ type: core_1.Output },],
        'duplicateCollection': [{ type: core_1.Output },],
        'createShareDialog': [{ type: core_1.Output },],
    };
    return WzCollectionItemListComponent;
}());
exports.WzCollectionItemListComponent = WzCollectionItemListComponent;
//# sourceMappingURL=wz.collection-item-list.component.js.map