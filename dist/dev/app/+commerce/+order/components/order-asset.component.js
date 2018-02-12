"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var OrderAssetComponent = (function () {
    function OrderAssetComponent(store) {
        this.store = store;
    }
    OrderAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
    };
    OrderAssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order-asset',
            template: "\n    <asset-component\n      [commentFormConfig]=\"commentFormConfig\"\n      [assetType]=\"'order'\">\n    </asset-component>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], OrderAssetComponent);
    return OrderAssetComponent;
}());
exports.OrderAssetComponent = OrderAssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL2NvbXBvbmVudHMvb3JkZXItYXNzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJFO0FBRTNFLGdEQUEyRDtBQWMzRDtJQUdFLDZCQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMsc0NBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBdkQsQ0FBdUQsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFQVSxtQkFBbUI7UUFWL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsaUlBSVc7WUFDckIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJMkIsb0JBQVE7T0FIeEIsbUJBQW1CLENBUS9CO0lBQUQsMEJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSxrREFBbUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rb3JkZXIvY29tcG9uZW50cy9vcmRlci1hc3NldC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3RhdGVNYXBwZXIsIEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnb3JkZXItYXNzZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhc3NldC1jb21wb25lbnRcbiAgICAgIFtjb21tZW50Rm9ybUNvbmZpZ109XCJjb21tZW50Rm9ybUNvbmZpZ1wiXG4gICAgICBbYXNzZXRUeXBlXT1cIidvcmRlcidcIj5cbiAgICA8L2Fzc2V0LWNvbXBvbmVudD5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckFzc2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGNvbW1lbnRGb3JtQ29uZmlnOiBGb3JtRmllbGRzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb21tZW50Rm9ybUNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5jYXJ0Q29tbWVudC5jb25maWcuZm9ybS5pdGVtcyk7XG4gIH1cbn1cbiJdfQ==
