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
var current_user_service_1 = require("../../shared/services/current-user.service");
var router_1 = require("@angular/router");
var AssetCapabilities = (function () {
    function AssetCapabilities(currentUser, route) {
        this.currentUser = currentUser;
        this.route = route;
    }
    AssetCapabilities.prototype.viewAssetDetails = function () {
        return this.userHas('ViewClips');
    };
    AssetCapabilities.prototype.downloadWatermarkComps = function (hasComp) {
        return this.userHas('DownloadWatermarkComps') && hasComp;
    };
    AssetCapabilities.prototype.downloadCleanComps = function (hasComp) {
        return this.userHas('DownloadCleanComps') && hasComp;
    };
    AssetCapabilities.prototype.downloadFullComps = function (hasComp) {
        return this.userHas('DownloadFullComps') && hasComp;
    };
    AssetCapabilities.prototype.createAccessInfo = function () {
        return this.userHas('CreateAccessInfo');
    };
    AssetCapabilities.prototype.createSubclips = function (asset) {
        return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
    };
    AssetCapabilities.prototype.viewAdvancedPlayer = function (asset, isShared) {
        return this.createSubclips(asset) || isShared;
    };
    AssetCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    AssetCapabilities.prototype.findMetadataValueFor = function (metadataName, object) {
        if (object !== Object(object))
            return null;
        var keys = Object.keys(object);
        if (keys.length === 2 && keys.sort().join('|') === 'name|value' && object.name === metadataName) {
            return object.value;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = this.findMetadataValueFor(metadataName, object[key]);
            if (value)
                return value;
        }
        return null;
    };
    AssetCapabilities = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService, router_1.Router])
    ], AssetCapabilities);
    return AssetCapabilities;
}());
exports.AssetCapabilities = AssetCapabilities;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvc2VydmljZXMvYXNzZXQuY2FwYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLG1GQUFnRjtBQUNoRiwwQ0FBeUM7QUFLekM7SUFDRSwyQkFBbUIsV0FBK0IsRUFBUyxLQUFhO1FBQXJELGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBSSxDQUFDO0lBRXRFLDRDQUFnQixHQUF2QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxrREFBc0IsR0FBN0IsVUFBOEIsT0FBZ0I7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsSUFBSSxPQUFPLENBQUM7SUFDM0QsQ0FBQztJQUVNLDhDQUFrQixHQUF6QixVQUEwQixPQUFnQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQztJQUN2RCxDQUFDO0lBRU0sNkNBQWlCLEdBQXhCLFVBQXlCLE9BQWdCO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksT0FBTyxDQUFDO0lBQ3RELENBQUM7SUFFTSw0Q0FBZ0IsR0FBdkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSwwQ0FBYyxHQUFyQixVQUFzQixLQUFvQjtRQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxLQUFLLFFBQVEsQ0FBQztJQUNwSCxDQUFDO0lBRU0sOENBQWtCLEdBQXpCLFVBQTBCLEtBQW9CLEVBQUUsUUFBaUI7UUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDO0lBQ2hELENBQUM7SUFFTSxtQ0FBTyxHQUFkLFVBQWUsVUFBa0I7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsWUFBb0IsRUFBRSxNQUFXO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRTNDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBWSxVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSTtZQUFmLElBQUksR0FBRyxhQUFBO1lBQ1YsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN6QjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBbkRVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUVxQix5Q0FBa0IsRUFBZ0IsZUFBTTtPQUQ3RCxpQkFBaUIsQ0FvRDdCO0lBQUQsd0JBQUM7Q0FwREQsQUFvREMsSUFBQTtBQXBEWSw4Q0FBaUIiLCJmaWxlIjoiYXBwLythc3NldC9zZXJ2aWNlcy9hc3NldC5jYXBhYmlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgRW5oYW5jZWRBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzc2V0Q2FwYWJpbGl0aWVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsIHB1YmxpYyByb3V0ZTogUm91dGVyKSB7IH1cblxuICBwdWJsaWMgdmlld0Fzc2V0RGV0YWlscygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VySGFzKCdWaWV3Q2xpcHMnKTtcbiAgfVxuXG4gIHB1YmxpYyBkb3dubG9hZFdhdGVybWFya0NvbXBzKGhhc0NvbXA6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VySGFzKCdEb3dubG9hZFdhdGVybWFya0NvbXBzJykgJiYgaGFzQ29tcDtcbiAgfVxuXG4gIHB1YmxpYyBkb3dubG9hZENsZWFuQ29tcHMoaGFzQ29tcDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJIYXMoJ0Rvd25sb2FkQ2xlYW5Db21wcycpICYmIGhhc0NvbXA7XG4gIH1cblxuICBwdWJsaWMgZG93bmxvYWRGdWxsQ29tcHMoaGFzQ29tcDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJIYXMoJ0Rvd25sb2FkRnVsbENvbXBzJykgJiYgaGFzQ29tcDtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVBY2Nlc3NJbmZvKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJIYXMoJ0NyZWF0ZUFjY2Vzc0luZm8nKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVTdWJjbGlwcyhhc3NldDogRW5oYW5jZWRBc3NldCk6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE86IFVuaXQgdGVzdCB0aGlzIGlmL3doZW4gaXQgaGFzIG1vcmUgZnVuY3Rpb25hbGl0eSB0aGFuIGp1c3QgYSBzaW1wbGUgYm9vbGVhbiFcbiAgICByZXR1cm4gdGhpcy51c2VySGFzKCdDcmVhdGVTdWJjbGlwcycpICYmIHR5cGVvZiB0aGlzLmZpbmRNZXRhZGF0YVZhbHVlRm9yKCdGb3JtYXQuRnJhbWVSYXRlJywgYXNzZXQpID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIHB1YmxpYyB2aWV3QWR2YW5jZWRQbGF5ZXIoYXNzZXQ6IEVuaGFuY2VkQXNzZXQsIGlzU2hhcmVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlU3ViY2xpcHMoYXNzZXQpIHx8IGlzU2hhcmVkO1xuICB9XG5cbiAgcHVibGljIHVzZXJIYXMocGVybWlzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIuaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kTWV0YWRhdGFWYWx1ZUZvcihtZXRhZGF0YU5hbWU6IHN0cmluZywgb2JqZWN0OiBhbnkpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAob2JqZWN0ICE9PSBPYmplY3Qob2JqZWN0KSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMiAmJiBrZXlzLnNvcnQoKS5qb2luKCd8JykgPT09ICduYW1lfHZhbHVlJyAmJiBvYmplY3QubmFtZSA9PT0gbWV0YWRhdGFOYW1lKSB7XG4gICAgICByZXR1cm4gb2JqZWN0LnZhbHVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZmluZE1ldGFkYXRhVmFsdWVGb3IobWV0YWRhdGFOYW1lLCBvYmplY3Rba2V5XSk7XG4gICAgICBpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19
