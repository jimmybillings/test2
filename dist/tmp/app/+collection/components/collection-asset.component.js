"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var CollectionAssetComponent = (function () {
    function CollectionAssetComponent(store) {
        this.store = store;
    }
    CollectionAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.collectionComment.config.form.items; });
    };
    CollectionAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-asset',
                    template: "\n    <asset-component\n      [assetType]=\"'collection'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionAssetComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionAssetComponent;
}());
exports.CollectionAssetComponent = CollectionAssetComponent;
//# sourceMappingURL=collection-asset.component.js.map