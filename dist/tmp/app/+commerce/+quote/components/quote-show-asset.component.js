"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteShowAssetComponent = (function () {
    function QuoteShowAssetComponent(store) {
        this.store = store;
    }
    QuoteShowAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
    };
    QuoteShowAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-show-asset',
                    template: "\n  <asset-component \n    [assetType]=\"'quoteShow'\"\n    [commentFormConfig]=\"commentFormConfig\">\n  </asset-component>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteShowAssetComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteShowAssetComponent;
}());
exports.QuoteShowAssetComponent = QuoteShowAssetComponent;
//# sourceMappingURL=quote-show-asset.component.js.map