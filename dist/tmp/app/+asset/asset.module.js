"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var asset_component_1 = require("./asset.component");
var shared_module_1 = require("../shared/shared.module");
var asset_detail_component_1 = require("./components/asset-detail.component");
var asset_data_component_1 = require("./components/asset-data.component");
var asset_share_component_1 = require("./components/asset-share.component");
var asset_save_subclip_component_1 = require("./components/asset-save-subclip.component");
var AssetModule = (function () {
    function AssetModule() {
    }
    AssetModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule],
                    declarations: [
                        asset_component_1.AssetComponent,
                        asset_detail_component_1.AssetDetailComponent,
                        asset_data_component_1.AssetDataComponent,
                        asset_share_component_1.AssetShareComponent,
                        asset_save_subclip_component_1.AssetSaveSubclipComponent
                    ],
                    exports: [asset_component_1.AssetComponent],
                    entryComponents: [asset_share_component_1.AssetShareComponent]
                },] },
    ];
    AssetModule.ctorParameters = function () { return []; };
    return AssetModule;
}());
exports.AssetModule = AssetModule;
//# sourceMappingURL=asset.module.js.map