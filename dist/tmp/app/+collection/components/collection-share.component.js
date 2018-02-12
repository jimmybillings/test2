"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var CollectionShareComponent = (function () {
    function CollectionShareComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    CollectionShareComponent.prototype.ngOnInit = function () {
        this.formFields = this.store.snapshotCloned(function (state) { return state.uiConfig.components.collectionSharing.config.form.items; });
    };
    Object.defineProperty(CollectionShareComponent.prototype, "collectionName", {
        get: function () {
            return this.collection.name;
        },
        enumerable: true,
        configurable: true
    });
    CollectionShareComponent.prototype.onCloseRequest = function () {
        this.closeRequest.emit();
    };
    CollectionShareComponent.prototype.onFormSubmit = function (shareParameters) {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.sharing.emailCollectionShareLink(_this.collection.id, shareParameters, _this.reloadType);
        });
    };
    CollectionShareComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-share',
                    templateUrl: 'collection-share.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionShareComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    CollectionShareComponent.propDecorators = {
        'collection': [{ type: core_1.Input },],
        'reloadType': [{ type: core_1.Input },],
        'closeRequest': [{ type: core_1.Output },],
    };
    return CollectionShareComponent;
}());
exports.CollectionShareComponent = CollectionShareComponent;
//# sourceMappingURL=collection-share.component.js.map