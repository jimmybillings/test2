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
var CollectionCapabilities = (function () {
    function CollectionCapabilities(currentUser, store, feature) {
        this.currentUser = currentUser;
        this.store = store;
        this.feature = feature;
    }
    CollectionCapabilities.prototype.haveCollections = function () {
        return this.feature.isAvailable('disableCollectionAccess');
    };
    CollectionCapabilities.prototype.viewCollections = function () {
        return this.haveCollections() && this.userHas('ViewCollections');
    };
    CollectionCapabilities.prototype.editCollections = function () {
        return this.haveCollections() && this.userHas('EditCollections');
    };
    CollectionCapabilities.prototype.viewCollectionTray = function () {
        return this.store.snapshot(function (state) { return state.headerDisplayOptions.canBeFixed; }) &&
            this.haveCollections() &&
            this.userHas('ViewCollections');
    };
    CollectionCapabilities.prototype.editCollection = function (collection) {
        return this.currentUser.data.map(function (user) {
            return (user.id !== 0 && collection.owner !== 0) && ((user.id === collection.owner) ||
                (user.editableCollections && user.editableCollections.includes(collection.id)) ||
                (collection.editors && collection.editors.map(function (editor) { return editor.id; }).includes(user.id)) ||
                (collection.userRole === 'editor' || collection.userRole === 'owner'));
        });
    };
    CollectionCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    CollectionCapabilities = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService, app_store_1.AppStore, feature_store_1.FeatureStore])
    ], CollectionCapabilities);
    return CollectionCapabilities;
}());
exports.CollectionCapabilities = CollectionCapabilities;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLmNhcGFiaWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxtRkFBZ0Y7QUFDaEYsNkNBQTJDO0FBQzNDLG1FQUFpRTtBQU9qRTtJQUNFLGdDQUFtQixXQUErQixFQUFTLEtBQWUsRUFBUyxPQUFxQjtRQUFyRixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBYztJQUFJLENBQUM7SUFFdEcsZ0RBQWUsR0FBdEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sZ0RBQWUsR0FBdEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sZ0RBQWUsR0FBdEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sbURBQWtCLEdBQXpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBckMsQ0FBcUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sK0NBQWMsR0FBckIsVUFBc0IsVUFBc0I7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVU7WUFJMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNsRCxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDOUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlFLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxFQUFFLEVBQVQsQ0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckYsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUN0RSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQU8sR0FBZCxVQUFlLFVBQWtCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBckNVLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQUVxQix5Q0FBa0IsRUFBZ0Isb0JBQVEsRUFBa0IsNEJBQVk7T0FEN0Ysc0JBQXNCLENBc0NsQztJQUFELDZCQUFDO0NBdENELEFBc0NDLElBQUE7QUF0Q1ksd0RBQXNCIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLmNhcGFiaWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RvcmVzL2ZlYXR1cmUuc3RvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2ZlYXR1cmUuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQ2FwYWJpbGl0aWVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsIHB1YmxpYyBzdG9yZTogQXBwU3RvcmUsIHB1YmxpYyBmZWF0dXJlOiBGZWF0dXJlU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBoYXZlQ29sbGVjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZS5pc0F2YWlsYWJsZSgnZGlzYWJsZUNvbGxlY3Rpb25BY2Nlc3MnKTtcbiAgfVxuXG4gIHB1YmxpYyB2aWV3Q29sbGVjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUNvbGxlY3Rpb25zKCkgJiYgdGhpcy51c2VySGFzKCdWaWV3Q29sbGVjdGlvbnMnKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0Q29sbGVjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUNvbGxlY3Rpb25zKCkgJiYgdGhpcy51c2VySGFzKCdFZGl0Q29sbGVjdGlvbnMnKTtcbiAgfVxuXG4gIHB1YmxpYyB2aWV3Q29sbGVjdGlvblRyYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUuaGVhZGVyRGlzcGxheU9wdGlvbnMuY2FuQmVGaXhlZCkgJiZcbiAgICAgIHRoaXMuaGF2ZUNvbGxlY3Rpb25zKCkgJiZcbiAgICAgIHRoaXMudXNlckhhcygnVmlld0NvbGxlY3Rpb25zJyk7XG4gIH1cblxuICBwdWJsaWMgZWRpdENvbGxlY3Rpb24oY29sbGVjdGlvbjogQ29sbGVjdGlvbik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLmRhdGEubWFwKCh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAvLyBBIG1heWZseSB1c2VyIGhhcyBhbiBpZCBvZiAwIGFuZCB0aGUgY29sbGVjdGlvbiBpbml0aWFsU3RhdGUgaGFzIGFuIG93bmVyIGlkIG9mIDAsXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoZWNrIHRoYXQgdGhleSBhcmUgYm90aCB0cnV0aHkgdmFsdWVzIGJlZm9yZSBwcm9jZWVkaW5nIHRvIHRoZSBvdGhlciBsb2dpYyxcbiAgICAgIC8vIG90aGVyd2lzZSB0aGUgZmlyc3QgY29uZGl0aW9uIHdvdWxkIGJlIG1ldCwgYW5kIGl0IHdvdWxkIHJldHVybiBhIGZhbHNlIFwidHJ1ZVwiXG4gICAgICByZXR1cm4gKHVzZXIuaWQgIT09IDAgJiYgY29sbGVjdGlvbi5vd25lciAhPT0gMCkgJiYgKFxuICAgICAgICAodXNlci5pZCA9PT0gY29sbGVjdGlvbi5vd25lcikgfHxcbiAgICAgICAgKHVzZXIuZWRpdGFibGVDb2xsZWN0aW9ucyAmJiB1c2VyLmVkaXRhYmxlQ29sbGVjdGlvbnMuaW5jbHVkZXMoY29sbGVjdGlvbi5pZCkpIHx8XG4gICAgICAgIChjb2xsZWN0aW9uLmVkaXRvcnMgJiYgY29sbGVjdGlvbi5lZGl0b3JzLm1hcChlZGl0b3IgPT4gZWRpdG9yLmlkKS5pbmNsdWRlcyh1c2VyLmlkKSkgfHxcbiAgICAgICAgKGNvbGxlY3Rpb24udXNlclJvbGUgPT09ICdlZGl0b3InIHx8IGNvbGxlY3Rpb24udXNlclJvbGUgPT09ICdvd25lcicpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVzZXJIYXMocGVybWlzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIuaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uKTtcbiAgfVxufVxuIl19
