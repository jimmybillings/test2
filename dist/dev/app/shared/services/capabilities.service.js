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
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../+commerce/services/commerce.capabilities");
var asset_capabilities_1 = require("../../+asset/services/asset.capabilities");
var collection_capabilities_1 = require("../../+collection/services/collection.capabilities");
var search_capabilities_1 = require("../../+search/services/search.capabilities");
var current_user_service_1 = require("./current-user.service");
var app_store_1 = require("../../app.store");
var feature_store_1 = require("../stores/feature.store");
var Capabilities = (function () {
    function Capabilities(currentUser, route, store, feature) {
        this.currentUser = currentUser;
        this.route = route;
        this.store = store;
        this.feature = feature;
        this.applyMixins(Capabilities_1, [
            commerce_capabilities_1.CommerceCapabilities,
            collection_capabilities_1.CollectionCapabilities,
            asset_capabilities_1.AssetCapabilities,
            search_capabilities_1.SearchCapabilities
        ]);
    }
    Capabilities_1 = Capabilities;
    Capabilities.prototype.viewAll = function () {
        return this.userHas('Root');
    };
    Capabilities.prototype.default = function () {
        return this.currentUser.loggedIn();
    };
    Capabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    Capabilities.prototype.applyMixins = function (derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
    Capabilities = Capabilities_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            router_1.Router,
            app_store_1.AppStore,
            feature_store_1.FeatureStore])
    ], Capabilities);
    return Capabilities;
    var Capabilities_1;
}());
exports.Capabilities = Capabilities;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MsMENBQXlDO0FBRXpDLHdGQUFzRjtBQUN0RiwrRUFBNkU7QUFDN0UsOEZBQTRGO0FBQzVGLGtGQUFnRjtBQUtoRiwrREFBNEQ7QUFDNUQsNkNBQTJDO0FBQzNDLHlEQUF1RDtBQUd2RDtJQThCRSxzQkFDUyxXQUErQixFQUMvQixLQUFhLEVBQ2IsS0FBZSxFQUNmLE9BQXFCO1FBSHJCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFZLEVBQUU7WUFDN0IsNENBQW9CO1lBQ3BCLGdEQUFzQjtZQUN0QixzQ0FBaUI7WUFDakIsd0NBQWtCO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7cUJBekNVLFlBQVk7SUEyQ2hCLDhCQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sOEJBQU8sR0FBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSw4QkFBTyxHQUFkLFVBQWUsVUFBa0I7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTyxrQ0FBVyxHQUFuQixVQUFvQixXQUFnQixFQUFFLFNBQWdCO1FBQ3BELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQ3hCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDekQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBN0RVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FnQ1cseUNBQWtCO1lBQ3hCLGVBQU07WUFDTixvQkFBUTtZQUNOLDRCQUFZO09BbENuQixZQUFZLENBK0R4QjtJQUFELG1CQUFDOztDQS9ERCxBQStEQyxJQUFBO0FBL0RZLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IENvbW1lcmNlQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vK2NvbW1lcmNlL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBBc3NldENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLythc3NldC9zZXJ2aWNlcy9hc3NldC5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb24uY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IFNlYXJjaENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLytzZWFyY2gvc2VydmljZXMvc2VhcmNoLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBRdW90ZVN0YXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5cbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4vY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmVzL2ZlYXR1cmUuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FwYWJpbGl0aWVzIGltcGxlbWVudHMgQ29tbWVyY2VDYXBhYmlsaXRpZXMsIENvbGxlY3Rpb25DYXBhYmlsaXRpZXMsIEFzc2V0Q2FwYWJpbGl0aWVzLCBTZWFyY2hDYXBhYmlsaXRpZXMge1xuICBoYXZlQ29sbGVjdGlvbnM6ICgpID0+IGJvb2xlYW47XG4gIHZpZXdDb2xsZWN0aW9uczogKCkgPT4gYm9vbGVhbjtcbiAgZWRpdENvbGxlY3Rpb25zOiAoKSA9PiBib29sZWFuO1xuICBlZGl0Q29sbGVjdGlvbjogKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHZpZXdBc3NldERldGFpbHM6ICgpID0+IGJvb2xlYW47XG4gIGRvd25sb2FkV2F0ZXJtYXJrQ29tcHM6IChoYXNDb21wOiBib29sZWFuKSA9PiBib29sZWFuO1xuICBkb3dubG9hZENsZWFuQ29tcHM6IChoYXNDb21wOiBib29sZWFuKSA9PiBib29sZWFuO1xuICBkb3dubG9hZEZ1bGxDb21wczogKGhhc0NvbXA6IGJvb2xlYW4pID0+IGJvb2xlYW47XG4gIGNyZWF0ZUFjY2Vzc0luZm86ICgpID0+IGJvb2xlYW47XG4gIGNyZWF0ZVN1YmNsaXBzOiAoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpID0+IGJvb2xlYW47XG4gIHZpZXdBZHZhbmNlZFBsYXllcjogKGFzc2V0OiBFbmhhbmNlZEFzc2V0LCBpc1NoYXJlZDogYm9vbGVhbikgPT4gYm9vbGVhbjtcbiAgdmlld0NvbGxlY3Rpb25UcmF5OiAoKSA9PiBib29sZWFuO1xuICB2aWV3U2VhcmNoQmFyOiAoKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICB2aWV3Q2FydEljb246ICgpID0+IGJvb2xlYW47XG4gIHB1cmNoYXNlT25DcmVkaXQ6ICgpID0+IGJvb2xlYW47XG4gIGFkZFRvQ2FydDogKCkgPT4gYm9vbGVhbjtcbiAgYWNjZXNzQ2FydDogKCkgPT4gYm9vbGVhbjtcbiAgaGF2ZUNhcnQ6ICgpID0+IGJvb2xlYW47XG4gIGVkaXRBZGRyZXNzOiAoKSA9PiBib29sZWFuO1xuICBhZGRBZGRyZXNzOiAoKSA9PiBib29sZWFuO1xuICBlZGl0QWNjb3VudEFkZHJlc3M6ICgpID0+IGJvb2xlYW47XG4gIGFkZEFjY291bnRBZGRyZXNzOiAoKSA9PiBib29sZWFuO1xuICBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBib29sZWFuO1xuICBlZGl0Q2xpcHM6ICgpID0+IGJvb2xlYW47XG4gIGNsb25lUXVvdGU6IChxdW90ZU9ic2VydmFibGU6IE9ic2VydmFibGU8UXVvdGVTdGF0ZT4pID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbjogKCkgPT4gYm9vbGVhbjtcbiAgY2FsY3VsYXRlUHJpY2U6ICgpID0+IGJvb2xlYW47XG4gIGZpbmRNZXRhZGF0YVZhbHVlRm9yOiAobWV0YWRhdGFOYW1lOiBzdHJpbmcsIG9iamVjdDogYW55KSA9PiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyByb3V0ZTogUm91dGVyLFxuICAgIHB1YmxpYyBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHVibGljIGZlYXR1cmU6IEZlYXR1cmVTdG9yZSkge1xuICAgIHRoaXMuYXBwbHlNaXhpbnMoQ2FwYWJpbGl0aWVzLCBbXG4gICAgICBDb21tZXJjZUNhcGFiaWxpdGllcyxcbiAgICAgIENvbGxlY3Rpb25DYXBhYmlsaXRpZXMsXG4gICAgICBBc3NldENhcGFiaWxpdGllcyxcbiAgICAgIFNlYXJjaENhcGFiaWxpdGllc1xuICAgIF0pO1xuICB9XG5cbiAgcHVibGljIHZpZXdBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlckhhcygnUm9vdCcpO1xuICB9XG5cbiAgcHVibGljIGRlZmF1bHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VySGFzKHBlcm1pc3Npb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLmhhc1Blcm1pc3Npb24ocGVybWlzc2lvbik7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5TWl4aW5zKGRlcml2ZWRDdG9yOiBhbnksIGJhc2VDdG9yczogYW55W10pIHtcbiAgICBiYXNlQ3RvcnMuZm9yRWFjaChiYXNlQ3RvciA9PiB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG5cblxuIl19
