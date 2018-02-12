"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var wz_design_module_1 = require("../wz-design/wz.design.module");
var core_2 = require("@ngx-translate/core");
var router_1 = require("@angular/router");
var wz_player_module_1 = require("../wz-player/wz.player.module");
var wz_asset_grid_component_1 = require("./wz-asset-grid/wz.asset-grid.component");
var wz_asset_list_component_1 = require("./wz-asset-list/wz.asset-list.component");
var wz_speedview_component_1 = require("./wz-speedview/wz.speedview.component");
var wz_speedview_directive_1 = require("./wz-speedview/wz.speedview.directive");
var aspera_download_directive_1 = require("../../components/wz-aspera-download/aspera-download.directive");
var wz_delivery_options_component_1 = require("../../components/wz-delivery-options/wz.delivery-options.component");
var WzAssetModule = (function () {
    function WzAssetModule() {
    }
    WzAssetModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        wz_design_module_1.MaterialModule,
                        core_2.TranslateModule,
                        router_1.RouterModule,
                        wz_player_module_1.WzPlayerModule
                    ],
                    declarations: [
                        wz_asset_grid_component_1.WzAssetGridComponent,
                        wz_asset_list_component_1.WzAssetListComponent,
                        wz_speedview_component_1.WzSpeedviewComponent,
                        wz_speedview_directive_1.WzSpeedviewDirective,
                        wz_delivery_options_component_1.WzDeliveryOptionsComponent,
                        aspera_download_directive_1.WzAsperaDownloadDirective
                    ],
                    exports: [
                        wz_speedview_component_1.WzSpeedviewComponent,
                        wz_asset_grid_component_1.WzAssetGridComponent,
                        wz_asset_list_component_1.WzAssetListComponent,
                        wz_delivery_options_component_1.WzDeliveryOptionsComponent,
                        aspera_download_directive_1.WzAsperaDownloadDirective
                    ],
                    entryComponents: [wz_speedview_component_1.WzSpeedviewComponent]
                },] },
    ];
    WzAssetModule.ctorParameters = function () { return []; };
    return WzAssetModule;
}());
exports.WzAssetModule = WzAssetModule;
//# sourceMappingURL=wz-asset.module.js.map