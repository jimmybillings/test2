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
var store_1 = require("@ngrx/store");
function gallery(state, action) {
    if (state === void 0) { state = initialState(); }
    switch (action.type) {
        case 'REPLACE_GALLERY':
            return Object.assign({}, action.payload ? action.payload : initialState());
        default:
            return state;
    }
}
exports.gallery = gallery;
;
var GalleryViewStore = (function () {
    function GalleryViewStore(store) {
        this.store = store;
    }
    Object.defineProperty(GalleryViewStore.prototype, "data", {
        get: function () {
            return this.store.select('gallery');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryViewStore.prototype, "state", {
        get: function () {
            var state;
            this.data.take(1).subscribe(function (galleryData) { return state = galleryData; });
            return state;
        },
        enumerable: true,
        configurable: true
    });
    GalleryViewStore.prototype.replaceWith = function (results, path) {
        this.store.dispatch({
            type: 'REPLACE_GALLERY',
            payload: { results: results, numberOfLevels: this.numberOfLevelsIn(results), path: path }
        });
    };
    GalleryViewStore.prototype.numberOfLevelsIn = function (results) {
        var _this = this;
        return results ? 1 + Math.max.apply(Math, results.map(function (result) { return _this.numberOfLevelsIn(result.children); })) : 0;
    };
    GalleryViewStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], GalleryViewStore);
    return GalleryViewStore;
}());
exports.GalleryViewStore = GalleryViewStore;
function initialState() {
    return {
        results: [],
        numberOfLevels: 0,
        path: []
    };
}
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL2dhbGxlcnktdmlldy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyxxQ0FBb0M7QUFLcEMsaUJBQXdCLEtBQStCLEVBQUUsTUFBb0I7SUFBckQsc0JBQUEsRUFBQSxRQUFpQixZQUFZLEVBQUU7SUFDckQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxpQkFBaUI7WUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFN0U7WUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7QUFDSCxDQUFDO0FBUkQsMEJBUUM7QUFBQSxDQUFDO0FBR0Y7SUFDRSwwQkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUFJLENBQUM7SUFFMUMsc0JBQVcsa0NBQUk7YUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFLO2FBQWhCO1lBQ0UsSUFBSSxLQUFjLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsV0FBVyxJQUFJLE9BQUEsS0FBSyxHQUFHLFdBQVcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQUVNLHNDQUFXLEdBQWxCLFVBQW1CLE9BQXVCLEVBQUUsSUFBaUI7UUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbEIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtTQUMxRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sMkNBQWdCLEdBQXhCLFVBQXlCLE9BQXVCO1FBQWhELGlCQUVDO1FBREMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxFQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUF0QlUsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBRWdCLGFBQUs7T0FEckIsZ0JBQWdCLENBdUI1QjtJQUFELHVCQUFDO0NBdkJELEFBdUJDLElBQUE7QUF2QlksNENBQWdCO0FBeUI3QjtJQUNFLE1BQU0sQ0FBQztRQUNMLE9BQU8sRUFBRSxFQUFFO1FBQ1gsY0FBYyxFQUFFLENBQUM7UUFDakIsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDO0FBQ0osQ0FBQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zdG9yZXMvZ2FsbGVyeS12aWV3LnN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgR2FsbGVyeSwgR2FsbGVyeVJlc3VsdHMsIEdhbGxlcnlQYXRoIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9nYWxsZXJ5LXZpZXcuaW50ZXJmYWNlJztcbmltcG9ydCB7IExlZ2FjeUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYWxsZXJ5KHN0YXRlOiBHYWxsZXJ5ID0gaW5pdGlhbFN0YXRlKCksIGFjdGlvbjogTGVnYWN5QWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdSRVBMQUNFX0dBTExFUlknOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbi5wYXlsb2FkID8gYWN0aW9uLnBheWxvYWQgOiBpbml0aWFsU3RhdGUoKSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2FsbGVyeVZpZXdTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHsgfSAgLy8gV2FzIFN0b3JlPEdhbGxlcnk+IGJlZm9yZSBuZ3J4IHVwZ3JhZGUuXG5cbiAgcHVibGljIGdldCBkYXRhKCk6IE9ic2VydmFibGU8R2FsbGVyeT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdCgnZ2FsbGVyeScpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBHYWxsZXJ5IHtcbiAgICBsZXQgc3RhdGU6IEdhbGxlcnk7XG4gICAgdGhpcy5kYXRhLnRha2UoMSkuc3Vic2NyaWJlKGdhbGxlcnlEYXRhID0+IHN0YXRlID0gZ2FsbGVyeURhdGEpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyByZXBsYWNlV2l0aChyZXN1bHRzOiBHYWxsZXJ5UmVzdWx0cywgcGF0aDogR2FsbGVyeVBhdGgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdSRVBMQUNFX0dBTExFUlknLFxuICAgICAgcGF5bG9hZDogeyByZXN1bHRzOiByZXN1bHRzLCBudW1iZXJPZkxldmVsczogdGhpcy5udW1iZXJPZkxldmVsc0luKHJlc3VsdHMpLCBwYXRoOiBwYXRoIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbnVtYmVyT2ZMZXZlbHNJbihyZXN1bHRzOiBHYWxsZXJ5UmVzdWx0cyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHJlc3VsdHMgPyAxICsgTWF0aC5tYXgoLi4ucmVzdWx0cy5tYXAocmVzdWx0ID0+IHRoaXMubnVtYmVyT2ZMZXZlbHNJbihyZXN1bHQuY2hpbGRyZW4pKSkgOiAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxTdGF0ZSgpOiBHYWxsZXJ5IHtcbiAgcmV0dXJuIHtcbiAgICByZXN1bHRzOiBbXSxcbiAgICBudW1iZXJPZkxldmVsczogMCxcbiAgICBwYXRoOiBbXVxuICB9O1xufTtcbiJdfQ==
