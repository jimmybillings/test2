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
var initState = {
    disableCartAccess: false,
    disableCollectionAccess: false,
    disableCommerceAgreements: false
};
function features(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case 'FEATURE.SET_STATE':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.features = features;
;
var FeatureStore = (function () {
    function FeatureStore(store) {
        this.store = store;
        if (localStorage.getItem('siteFeatures')) {
            this.set(JSON.parse(localStorage.getItem('siteFeatures')));
        }
    }
    FeatureStore.prototype.isAvailable = function (feature) {
        return !this.state[feature];
    };
    FeatureStore.prototype.set = function (data) {
        this.setInLocalStorage(data);
        this.store.dispatch({ type: 'FEATURE.SET_STATE', payload: this.format(data) });
    };
    Object.defineProperty(FeatureStore.prototype, "data", {
        get: function () {
            return this.store.select('features');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    FeatureStore.prototype.setInLocalStorage = function (data) {
        localStorage.setItem('siteFeatures', JSON.stringify(this.format(data)));
    };
    FeatureStore.prototype.format = function (data) {
        for (var key in data) {
            try {
                data[key] = JSON.parse(data[key]);
            }
            catch (error) {
                data[key] = data[key];
            }
        }
        return data;
    };
    FeatureStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], FeatureStore);
    return FeatureStore;
}());
exports.FeatureStore = FeatureStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL2ZlYXR1cmUuc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MscUNBQW9DO0FBS3BDLElBQU0sU0FBUyxHQUFhO0lBQzFCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsdUJBQXVCLEVBQUUsS0FBSztJQUM5Qix5QkFBeUIsRUFBRSxLQUFLO0NBQ2pDLENBQUM7QUFFRixrQkFBeUIsS0FBMkIsRUFBRSxNQUFvQjtJQUFqRCxzQkFBQSxFQUFBLGlCQUEyQjtJQUNsRCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLG1CQUFtQjtZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRDtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFQRCw0QkFPQztBQUFBLENBQUM7QUFHRjtJQUNFLHNCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGtDQUFXLEdBQWxCLFVBQW1CLE9BQWdCO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLDBCQUFHLEdBQVYsVUFBVyxJQUFTO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELHNCQUFXLDhCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSzthQUFoQjtZQUNFLElBQUksQ0FBVyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWUsSUFBSyxPQUFBLENBQUMsR0FBRyxLQUFLLEVBQVQsQ0FBUyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7OztPQUFBO0lBRU8sd0NBQWlCLEdBQXpCLFVBQTBCLElBQVM7UUFDakMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8sNkJBQU0sR0FBZCxVQUFlLElBQVM7UUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdkNVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FFZ0IsYUFBSztPQURyQixZQUFZLENBd0N4QjtJQUFELG1CQUFDO0NBeENELEFBd0NDLElBQUE7QUF4Q1ksb0NBQVkiLCJmaWxlIjoiYXBwL3NoYXJlZC9zdG9yZXMvZmVhdHVyZS5zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGZWF0dXJlLCBGZWF0dXJlcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmVhdHVyZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTGVnYWN5QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuY29uc3QgaW5pdFN0YXRlOiBGZWF0dXJlcyA9IHtcbiAgZGlzYWJsZUNhcnRBY2Nlc3M6IGZhbHNlLFxuICBkaXNhYmxlQ29sbGVjdGlvbkFjY2VzczogZmFsc2UsXG4gIGRpc2FibGVDb21tZXJjZUFncmVlbWVudHM6IGZhbHNlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXMoc3RhdGU6IEZlYXR1cmVzID0gaW5pdFN0YXRlLCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnRkVBVFVSRS5TRVRfU1RBVEUnOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpdGVGZWF0dXJlcycpKSB7XG4gICAgICB0aGlzLnNldChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXRlRmVhdHVyZXMnKSkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0F2YWlsYWJsZShmZWF0dXJlOiBGZWF0dXJlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlW2ZlYXR1cmVdO1xuICB9XG5cbiAgcHVibGljIHNldChkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldEluTG9jYWxTdG9yYWdlKGRhdGEpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnRkVBVFVSRS5TRVRfU1RBVEUnLCBwYXlsb2FkOiB0aGlzLmZvcm1hdChkYXRhKSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPEZlYXR1cmVzPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KCdmZWF0dXJlcycpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBGZWF0dXJlcyB7XG4gICAgbGV0IHM6IEZlYXR1cmVzO1xuICAgIHRoaXMuZGF0YS50YWtlKDEpLnN1YnNjcmliZSgoc3RhdGU6IEZlYXR1cmVzKSA9PiBzID0gc3RhdGUpO1xuICAgIHJldHVybiBzO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbkxvY2FsU3RvcmFnZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2l0ZUZlYXR1cmVzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5mb3JtYXQoZGF0YSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0KGRhdGE6IGFueSk6IEZlYXR1cmVzIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YVtrZXldID0gSlNPTi5wYXJzZShkYXRhW2tleV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19
