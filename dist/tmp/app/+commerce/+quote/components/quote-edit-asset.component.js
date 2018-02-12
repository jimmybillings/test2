"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteEditAssetComponent = (function () {
    function QuoteEditAssetComponent(store) {
        this.store = store;
    }
    QuoteEditAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
    };
    QuoteEditAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-asset',
                    template: "\n    <asset-component \n      [assetType]=\"'quoteEdit'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteEditAssetComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteEditAssetComponent;
}());
exports.QuoteEditAssetComponent = QuoteEditAssetComponent;
//# sourceMappingURL=quote-edit-asset.component.js.map