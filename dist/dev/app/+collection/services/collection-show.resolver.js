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
var app_store_1 = require("../../app.store");
var CollectionShowResolver = (function () {
    function CollectionShowResolver(store) {
        this.store = store;
    }
    CollectionShowResolver.prototype.resolve = function (route) {
        var _this = this;
        this.store.dispatch(function (factory) { return _this.createAppropriateActionFor(route.params, factory); });
        return this.store.blockUntil(function (state) { return !state.activeCollection.loading; });
    };
    CollectionShowResolver.prototype.createAppropriateActionFor = function (routeParameters, factory) {
        var state = this.store.snapshot(function (state) { return state.activeCollection; });
        var routeId = Number(routeParameters['id']);
        var actionParameters = {
            currentPage: routeParameters['i'], pageSize: routeParameters['n']
        };
        if (!state.loading) {
            if (state.collection.id === routeId) {
                return factory.activeCollection.loadPage(actionParameters);
            }
            return factory.activeCollection.set(routeId, actionParameters);
        }
        return factory.activeCollection.load(actionParameters);
    };
    CollectionShowResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CollectionShowResolver);
    return CollectionShowResolver;
}());
exports.CollectionShowResolver = CollectionShowResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLXNob3cucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFNM0MsNkNBQWlGO0FBR2pGO0lBQ0UsZ0NBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUVqQyx3Q0FBTyxHQUFkLFVBQWUsS0FBNkI7UUFBNUMsaUJBSUM7UUFIQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUF0RCxDQUFzRCxDQUFDLENBQUM7UUFFdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLDJEQUEwQixHQUFsQyxVQUFtQyxlQUF1QyxFQUFFLE9BQXNCO1FBQ2hHLElBQU0sS0FBSyxHQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzFGLElBQU0sT0FBTyxHQUFXLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFNLGdCQUFnQixHQUFtQztZQUN2RCxXQUFXLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDO1NBQ2xFLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUF6QlUsc0JBQXNCO1FBRGxDLGlCQUFVLEVBQUU7eUNBRWdCLG9CQUFRO09BRHhCLHNCQUFzQixDQTBCbEM7SUFBRCw2QkFBQztDQTFCRCxBQTBCQyxJQUFBO0FBMUJZLHdEQUFzQiIsImZpbGUiOiJhcHAvK2NvbGxlY3Rpb24vc2VydmljZXMvY29sbGVjdGlvbi1zaG93LnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvblBhZ2luYXRpb25QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUsIEFjdGlvbkZhY3RvcnksIEFjdGl2ZUNvbGxlY3Rpb25TdGF0ZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU2hvd1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IHRoaXMuY3JlYXRlQXBwcm9wcmlhdGVBY3Rpb25Gb3Iocm91dGUucGFyYW1zLCBmYWN0b3J5KSk7XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5ibG9ja1VudGlsKHN0YXRlID0+ICFzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmxvYWRpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBcHByb3ByaWF0ZUFjdGlvbkZvcihyb3V0ZVBhcmFtZXRlcnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGZhY3Rvcnk6IEFjdGlvbkZhY3RvcnkpOiBBY3Rpb24ge1xuICAgIGNvbnN0IHN0YXRlOiBBY3RpdmVDb2xsZWN0aW9uU3RhdGUgPSB0aGlzLnN0b3JlLnNuYXBzaG90KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IHJvdXRlSWQ6IG51bWJlciA9IE51bWJlcihyb3V0ZVBhcmFtZXRlcnNbJ2lkJ10pO1xuICAgIGNvbnN0IGFjdGlvblBhcmFtZXRlcnM6IENvbGxlY3Rpb25QYWdpbmF0aW9uUGFyYW1ldGVycyA9IHtcbiAgICAgIGN1cnJlbnRQYWdlOiByb3V0ZVBhcmFtZXRlcnNbJ2knXSwgcGFnZVNpemU6IHJvdXRlUGFyYW1ldGVyc1snbiddXG4gICAgfTtcblxuICAgIGlmICghc3RhdGUubG9hZGluZykge1xuICAgICAgaWYgKHN0YXRlLmNvbGxlY3Rpb24uaWQgPT09IHJvdXRlSWQpIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5sb2FkUGFnZShhY3Rpb25QYXJhbWV0ZXJzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5zZXQocm91dGVJZCwgYWN0aW9uUGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5sb2FkKGFjdGlvblBhcmFtZXRlcnMpO1xuICB9XG59XG4iXX0=
