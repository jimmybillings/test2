"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    AssetModule = __decorate([
        core_1.NgModule({
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
        })
    ], AssetModule);
    return AssetModule;
}());
exports.AssetModule = AssetModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvYXNzZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLHFEQUFtRDtBQUNuRCx5REFBdUQ7QUFDdkQsOEVBQTJFO0FBQzNFLDBFQUF1RTtBQUN2RSw0RUFBeUU7QUFDekUsMEZBQXNGO0FBZ0J0RjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBYnZCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFO2dCQUNaLGdDQUFjO2dCQUNkLDZDQUFvQjtnQkFDcEIseUNBQWtCO2dCQUNsQiwyQ0FBbUI7Z0JBQ25CLHdEQUF5QjthQUMxQjtZQUNELE9BQU8sRUFBRSxDQUFDLGdDQUFjLENBQUM7WUFDekIsZUFBZSxFQUFFLENBQUMsMkNBQW1CLENBQUM7U0FDdkMsQ0FBQztPQUVXLFdBQVcsQ0FBSTtJQUFELGtCQUFDO0NBQTVCLEFBQTRCLElBQUE7QUFBZixrQ0FBVyIsImZpbGUiOiJhcHAvK2Fzc2V0L2Fzc2V0Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBc3NldENvbXBvbmVudCB9IGZyb20gJy4vYXNzZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEFzc2V0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Fzc2V0LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzZXREYXRhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Fzc2V0LWRhdGEuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0U2hhcmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXNzZXQtc2hhcmUuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0U2F2ZVN1YmNsaXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXNzZXQtc2F2ZS1zdWJjbGlwLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFzc2V0Q29tcG9uZW50LFxuICAgIEFzc2V0RGV0YWlsQ29tcG9uZW50LFxuICAgIEFzc2V0RGF0YUNvbXBvbmVudCxcbiAgICBBc3NldFNoYXJlQ29tcG9uZW50LFxuICAgIEFzc2V0U2F2ZVN1YmNsaXBDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW0Fzc2V0Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbQXNzZXRTaGFyZUNvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBc3NldE1vZHVsZSB7IH1cbiJdfQ==
