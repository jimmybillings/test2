"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    WzAssetModule = __decorate([
        core_1.NgModule({
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
        })
    ], WzAssetModule);
    return WzAssetModule;
}());
exports.WzAssetModule = WzAssetModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1hc3NldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsMENBQStDO0FBQy9DLGtFQUErRDtBQUMvRCw0Q0FBc0Q7QUFDdEQsMENBQStDO0FBQy9DLGtFQUErRDtBQUUvRCxtRkFBK0U7QUFDL0UsbUZBQStFO0FBQy9FLGdGQUE2RTtBQUM3RSxnRkFBNkU7QUFDN0UsMkdBQTBHO0FBQzFHLG9IQUFnSDtBQTJCaEg7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUF6QnpCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxxQkFBWTtnQkFDWixpQ0FBYztnQkFDZCxzQkFBZTtnQkFDZixxQkFBWTtnQkFDWixpQ0FBYzthQUNmO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDhDQUFvQjtnQkFDcEIsOENBQW9CO2dCQUNwQiw2Q0FBb0I7Z0JBQ3BCLDZDQUFvQjtnQkFDcEIsMERBQTBCO2dCQUMxQixxREFBeUI7YUFDMUI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNkNBQW9CO2dCQUNwQiw4Q0FBb0I7Z0JBQ3BCLDhDQUFvQjtnQkFDcEIsMERBQTBCO2dCQUMxQixxREFBeUI7YUFDMUI7WUFDRCxlQUFlLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztTQUN4QyxDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBOUIsQUFBOEIsSUFBQTtBQUFqQixzQ0FBYSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otYXNzZXQubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL3d6LWRlc2lnbi93ei5kZXNpZ24ubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFd6UGxheWVyTW9kdWxlIH0gZnJvbSAnLi4vd3otcGxheWVyL3d6LnBsYXllci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBXekFzc2V0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vd3otYXNzZXQtZ3JpZC93ei5hc3NldC1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekFzc2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vd3otYXNzZXQtbGlzdC93ei5hc3NldC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelNwZWVkdmlld0NvbXBvbmVudCB9IGZyb20gJy4vd3otc3BlZWR2aWV3L3d6LnNwZWVkdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pTcGVlZHZpZXdEaXJlY3RpdmUgfSBmcm9tICcuL3d6LXNwZWVkdmlldy93ei5zcGVlZHZpZXcuZGlyZWN0aXZlJztcbmltcG9ydCB7IFd6QXNwZXJhRG93bmxvYWREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3d6LWFzcGVyYS1kb3dubG9hZC9hc3BlcmEtZG93bmxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFd6RGVsaXZlcnlPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy93ei1kZWxpdmVyeS1vcHRpb25zL3d6LmRlbGl2ZXJ5LW9wdGlvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFd6UGxheWVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFd6QXNzZXRHcmlkQ29tcG9uZW50LFxuICAgIFd6QXNzZXRMaXN0Q29tcG9uZW50LFxuICAgIFd6U3BlZWR2aWV3Q29tcG9uZW50LFxuICAgIFd6U3BlZWR2aWV3RGlyZWN0aXZlLFxuICAgIFd6RGVsaXZlcnlPcHRpb25zQ29tcG9uZW50LFxuICAgIFd6QXNwZXJhRG93bmxvYWREaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFd6U3BlZWR2aWV3Q29tcG9uZW50LFxuICAgIFd6QXNzZXRHcmlkQ29tcG9uZW50LFxuICAgIFd6QXNzZXRMaXN0Q29tcG9uZW50LFxuICAgIFd6RGVsaXZlcnlPcHRpb25zQ29tcG9uZW50LFxuICAgIFd6QXNwZXJhRG93bmxvYWREaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbV3pTcGVlZHZpZXdDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFd6QXNzZXRNb2R1bGUgeyB9XG4iXX0=
