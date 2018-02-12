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
var app_store_1 = require("../../app.store");
var feature_store_1 = require("../../shared/stores/feature.store");
var CommerceCapabilities = (function () {
    function CommerceCapabilities(currentUser, store, feature) {
        this.currentUser = currentUser;
        this.store = store;
        this.feature = feature;
    }
    CommerceCapabilities.prototype.haveCart = function () {
        return this.feature.isAvailable('disableCartAccess');
    };
    CommerceCapabilities.prototype.viewCartIcon = function () {
        return this.store.snapshot(function (state) { return state.headerDisplayOptions.canBeFixed; }) && this.haveCart() && this.addToCart();
    };
    CommerceCapabilities.prototype.addToCart = function () {
        return this.haveCart() && this.currentUser.loggedIn();
    };
    CommerceCapabilities.prototype.purchaseOnCredit = function () {
        return this.haveCart() && this.currentUser.hasPurchaseOnCredit();
    };
    CommerceCapabilities.prototype.editAddress = function (address) {
        return address.type === 'User' && !!address.address;
    };
    CommerceCapabilities.prototype.addAddress = function (address) {
        return address.type === 'User' && !address.address;
    };
    CommerceCapabilities.prototype.editAccountAddress = function (address) {
        return address.type === 'Account' && this.userHas('EditAccounts') && !!address.address;
    };
    CommerceCapabilities.prototype.addAccountAddress = function (address) {
        return address.type === 'Account' && this.userHas('EditAccounts') && !address.address;
    };
    CommerceCapabilities.prototype.administerQuotes = function () {
        return this.userHas('AdministerQuotes');
    };
    CommerceCapabilities.prototype.editClips = function () {
        return this.userHas('EditClips');
    };
    CommerceCapabilities.prototype.cloneQuote = function (quoteObservable) {
        var _this = this;
        return quoteObservable.map(function (quoteState) {
            var quote = quoteState.data;
            if (quote.projects) {
                return quote.projects
                    .filter(function (project) { return project.lineItems || project.feeLineItems; })
                    .length > 0 && _this.administerQuotes();
            }
            else {
                return false;
            }
        });
    };
    CommerceCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    CommerceCapabilities.prototype.createSubclips = function (asset) {
        return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
    };
    CommerceCapabilities.prototype.calculatePrice = function () {
        return this.userHas('ViewPriceAttributes');
    };
    CommerceCapabilities.prototype.findMetadataValueFor = function (metadataName, object) {
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
    CommerceCapabilities.prototype.viewLicenseAgreementsButton = function (cartHasAssets) {
        var hasAssets;
        cartHasAssets.take(1).subscribe(function (has) { return hasAssets = has; });
        return this.feature.isAvailable('disableCommerceAgreements') && hasAssets;
    };
    CommerceCapabilities = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService, app_store_1.AppStore, feature_store_1.FeatureStore])
    ], CommerceCapabilities);
    return CommerceCapabilities;
}());
exports.CommerceCapabilities = CommerceCapabilities;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2Uvc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLG1GQUFnRjtBQUVoRiw2Q0FBMkM7QUFDM0MsbUVBQWlFO0FBTWpFO0lBQ0UsOEJBQW1CLFdBQStCLEVBQVMsS0FBZSxFQUFTLE9BQXFCO1FBQXJGLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFjO0lBQUksQ0FBQztJQUV0Ryx1Q0FBUSxHQUFmO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLDJDQUFZLEdBQW5CO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBckMsQ0FBcUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEgsQ0FBQztJQUVNLHdDQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFTSwrQ0FBZ0IsR0FBdkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRU0sMENBQVcsR0FBbEIsVUFBbUIsT0FBb0I7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3RELENBQUM7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QUcsYUFBQTtZQUNWLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDekI7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLDBEQUEyQixHQUFsQyxVQUFtQyxhQUFrQztRQUNuRSxJQUFJLFNBQWtCLENBQUM7UUFDdkIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZLElBQUssT0FBQSxTQUFTLEdBQUcsR0FBRyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUM1RSxDQUFDO0lBdkZVLG9CQUFvQjtRQURoQyxpQkFBVSxFQUFFO3lDQUVxQix5Q0FBa0IsRUFBZ0Isb0JBQVEsRUFBa0IsNEJBQVk7T0FEN0Ysb0JBQW9CLENBd0ZoQztJQUFELDJCQUFDO0NBeEZELEFBd0ZDLElBQUE7QUF4Rlksb0RBQW9CIiwiZmlsZSI6ImFwcC8rY29tbWVyY2Uvc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3Jlcy9mZWF0dXJlLnN0b3JlJztcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mZWF0dXJlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBZGRyZXNzLCBWaWV3QWRkcmVzcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByb2plY3QsIFF1b3RlLCBRdW90ZVN0YXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbW1lcmNlQ2FwYWJpbGl0aWVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsIHB1YmxpYyBzdG9yZTogQXBwU3RvcmUsIHB1YmxpYyBmZWF0dXJlOiBGZWF0dXJlU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBoYXZlQ2FydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mZWF0dXJlLmlzQXZhaWxhYmxlKCdkaXNhYmxlQ2FydEFjY2VzcycpO1xuICB9XG5cbiAgcHVibGljIHZpZXdDYXJ0SWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5jYW5CZUZpeGVkKSAmJiB0aGlzLmhhdmVDYXJ0KCkgJiYgdGhpcy5hZGRUb0NhcnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUb0NhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUNhcnQoKSAmJiB0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCk7XG4gIH1cblxuICBwdWJsaWMgcHVyY2hhc2VPbkNyZWRpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXZlQ2FydCgpICYmIHRoaXMuY3VycmVudFVzZXIuaGFzUHVyY2hhc2VPbkNyZWRpdCgpO1xuICB9XG5cbiAgcHVibGljIGVkaXRBZGRyZXNzKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFkZHJlc3MudHlwZSA9PT0gJ1VzZXInICYmICEhYWRkcmVzcy5hZGRyZXNzO1xuICB9XG5cbiAgcHVibGljIGFkZEFkZHJlc3MoYWRkcmVzczogVmlld0FkZHJlc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYWRkcmVzcy50eXBlID09PSAnVXNlcicgJiYgIWFkZHJlc3MuYWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyBlZGl0QWNjb3VudEFkZHJlc3MoYWRkcmVzczogVmlld0FkZHJlc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYWRkcmVzcy50eXBlID09PSAnQWNjb3VudCcgJiYgdGhpcy51c2VySGFzKCdFZGl0QWNjb3VudHMnKSAmJiAhIWFkZHJlc3MuYWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyBhZGRBY2NvdW50QWRkcmVzcyhhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhZGRyZXNzLnR5cGUgPT09ICdBY2NvdW50JyAmJiB0aGlzLnVzZXJIYXMoJ0VkaXRBY2NvdW50cycpICYmICFhZGRyZXNzLmFkZHJlc3M7XG4gIH1cblxuICBwdWJsaWMgYWRtaW5pc3RlclF1b3RlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VySGFzKCdBZG1pbmlzdGVyUXVvdGVzJyk7XG4gIH1cblxuICBwdWJsaWMgZWRpdENsaXBzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJIYXMoJ0VkaXRDbGlwcycpO1xuICB9XG5cbiAgcHVibGljIGNsb25lUXVvdGUocXVvdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFF1b3RlU3RhdGU+KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHF1b3RlT2JzZXJ2YWJsZS5tYXAoKHF1b3RlU3RhdGU6IFF1b3RlU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHF1b3RlOiBRdW90ZSA9IHF1b3RlU3RhdGUuZGF0YTtcbiAgICAgIGlmIChxdW90ZS5wcm9qZWN0cykge1xuICAgICAgICByZXR1cm4gcXVvdGUucHJvamVjdHNcbiAgICAgICAgICAuZmlsdGVyKChwcm9qZWN0OiBQcm9qZWN0KSA9PiBwcm9qZWN0LmxpbmVJdGVtcyB8fCBwcm9qZWN0LmZlZUxpbmVJdGVtcylcbiAgICAgICAgICAubGVuZ3RoID4gMCAmJiB0aGlzLmFkbWluaXN0ZXJRdW90ZXMoKTtcbiAgICAgIH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVzZXJIYXMocGVybWlzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIuaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVTdWJjbGlwcyhhc3NldDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckhhcygnQ3JlYXRlU3ViY2xpcHMnKSAmJiB0eXBlb2YgdGhpcy5maW5kTWV0YWRhdGFWYWx1ZUZvcignRm9ybWF0LkZyYW1lUmF0ZScsIGFzc2V0KSA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlUHJpY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckhhcygnVmlld1ByaWNlQXR0cmlidXRlcycpO1xuICB9XG5cbiAgcHVibGljIGZpbmRNZXRhZGF0YVZhbHVlRm9yKG1ldGFkYXRhTmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChvYmplY3QgIT09IE9iamVjdChvYmplY3QpKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAyICYmIGtleXMuc29ydCgpLmpvaW4oJ3wnKSA9PT0gJ25hbWV8dmFsdWUnICYmIG9iamVjdC5uYW1lID09PSBtZXRhZGF0YU5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3QudmFsdWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maW5kTWV0YWRhdGFWYWx1ZUZvcihtZXRhZGF0YU5hbWUsIG9iamVjdFtrZXldKTtcbiAgICAgIGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbihjYXJ0SGFzQXNzZXRzOiBPYnNlcnZhYmxlPGJvb2xlYW4+KTogYm9vbGVhbiB7XG4gICAgbGV0IGhhc0Fzc2V0czogYm9vbGVhbjtcbiAgICBjYXJ0SGFzQXNzZXRzLnRha2UoMSkuc3Vic2NyaWJlKChoYXM6IGJvb2xlYW4pID0+IGhhc0Fzc2V0cyA9IGhhcyk7XG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZS5pc0F2YWlsYWJsZSgnZGlzYWJsZUNvbW1lcmNlQWdyZWVtZW50cycpICYmIGhhc0Fzc2V0cztcbiAgfVxufVxuIl19
