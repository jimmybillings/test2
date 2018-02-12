"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchAssetComponent = (function () {
    function SearchAssetComponent() {
    }
    SearchAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'search-asset',
                    template: "<asset-component [assetType]=\"'search'\"></asset-component>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    SearchAssetComponent.ctorParameters = function () { return []; };
    return SearchAssetComponent;
}());
exports.SearchAssetComponent = SearchAssetComponent;
//# sourceMappingURL=search-asset.component.js.map