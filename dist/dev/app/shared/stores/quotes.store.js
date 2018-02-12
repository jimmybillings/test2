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
    items: null,
    pagination: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        hasNextPage: false,
        hasPreviousPage: false,
        numberOfPages: 0
    }
};
function quotes(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case 'QUOTES.SET_QUOTES':
            return Object.assign({}, action.payload);
        case 'QUOTES.UPDATE_QUOTES':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.quotes = quotes;
;
var QuotesStore = (function () {
    function QuotesStore(store) {
        this.store = store;
    }
    Object.defineProperty(QuotesStore.prototype, "data", {
        get: function () {
            return this.store.select('quotes');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotesStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (quotes) { return s = quotes; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    QuotesStore.prototype.updateQuotes = function (payload) {
        this.store.dispatch({ type: 'QUOTES.UPDATE_QUOTES', payload: payload });
    };
    QuotesStore.prototype.setQuotes = function (payload) {
        this.store.dispatch({
            type: 'QUOTES.SET_QUOTES', payload: {
                'items': payload.items,
                'pagination': {
                    'totalCount': payload.totalCount,
                    'currentPage': payload.currentPage + 1,
                    'hasNextPage': payload.hasNextPage,
                    'hasPreviousPage': payload.hasPreviousPage,
                    'numberOfPages': payload.numberOfPages,
                    'pageSize': payload.pageSize
                }
            }
        });
    };
    QuotesStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], QuotesStore);
    return QuotesStore;
}());
exports.QuotesStore = QuotesStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL3F1b3Rlcy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxxQ0FBb0M7QUFLcEMsSUFBTSxTQUFTLEdBQVc7SUFDeEIsS0FBSyxFQUFFLElBQUk7SUFDWCxVQUFVLEVBQUU7UUFDVixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO1FBQ2QsUUFBUSxFQUFFLEVBQUU7UUFDWixXQUFXLEVBQUUsS0FBSztRQUNsQixlQUFlLEVBQUUsS0FBSztRQUN0QixhQUFhLEVBQUUsQ0FBQztLQUNqQjtDQUNGLENBQUM7QUFFRixnQkFBdUIsS0FBc0IsRUFBRSxNQUFvQjtJQUE1QyxzQkFBQSxFQUFBLGlCQUFzQjtJQUMzQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLG1CQUFtQjtZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLEtBQUssc0JBQXNCO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xEO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQVRELHdCQVNDO0FBQUEsQ0FBQztBQUdGO0lBQ0UscUJBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7SUFBSSxDQUFDO0lBRTFDLHNCQUFXLDZCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4QkFBSzthQUFoQjtZQUNFLElBQUksQ0FBUyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsQ0FBQyxHQUFHLE1BQU0sRUFBVixDQUFVLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQzs7O09BQUE7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixPQUEyQjtRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsT0FBWTtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsQixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFO2dCQUNsQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3RCLFlBQVksRUFBRTtvQkFDWixZQUFZLEVBQUUsT0FBTyxDQUFDLFVBQVU7b0JBQ2hDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUM7b0JBQ3RDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVztvQkFDbEMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGVBQWU7b0JBQzFDLGVBQWUsRUFBRSxPQUFPLENBQUMsYUFBYTtvQkFDdEMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lCQUM3QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQS9CVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBRWdCLGFBQUs7T0FEckIsV0FBVyxDQWdDdkI7SUFBRCxrQkFBQztDQWhDRCxBQWdDQyxJQUFBO0FBaENZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvc3RvcmVzL3F1b3Rlcy5zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBRdW90ZSwgUXVvdGVzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTGVnYWN5QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuY29uc3QgaW5pdFN0YXRlOiBRdW90ZXMgPSB7XG4gIGl0ZW1zOiBudWxsLFxuICBwYWdpbmF0aW9uOiB7XG4gICAgdG90YWxDb3VudDogMCxcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgbnVtYmVyT2ZQYWdlczogMFxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcXVvdGVzKHN0YXRlOiBhbnkgPSBpbml0U3RhdGUsIGFjdGlvbjogTGVnYWN5QWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdRVU9URVMuU0VUX1FVT1RFUyc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWN0aW9uLnBheWxvYWQpO1xuICAgIGNhc2UgJ1FVT1RFUy5VUERBVEVfUVVPVEVTJzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdW90ZXNTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHsgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPFF1b3Rlcz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdCgncXVvdGVzJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFF1b3RlcyB7XG4gICAgbGV0IHM6IFF1b3RlcztcbiAgICB0aGlzLmRhdGEudGFrZSgxKS5zdWJzY3JpYmUoKHF1b3RlczogUXVvdGVzKSA9PiBzID0gcXVvdGVzKTtcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVRdW90ZXMocGF5bG9hZDogeyBpdGVtczogUXVvdGVbXSB9KTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdRVU9URVMuVVBEQVRFX1FVT1RFUycsIHBheWxvYWQ6IHBheWxvYWQgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UXVvdGVzKHBheWxvYWQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ1FVT1RFUy5TRVRfUVVPVEVTJywgcGF5bG9hZDoge1xuICAgICAgICAnaXRlbXMnOiBwYXlsb2FkLml0ZW1zLFxuICAgICAgICAncGFnaW5hdGlvbic6IHtcbiAgICAgICAgICAndG90YWxDb3VudCc6IHBheWxvYWQudG90YWxDb3VudCxcbiAgICAgICAgICAnY3VycmVudFBhZ2UnOiBwYXlsb2FkLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgICAnaGFzTmV4dFBhZ2UnOiBwYXlsb2FkLmhhc05leHRQYWdlLFxuICAgICAgICAgICdoYXNQcmV2aW91c1BhZ2UnOiBwYXlsb2FkLmhhc1ByZXZpb3VzUGFnZSxcbiAgICAgICAgICAnbnVtYmVyT2ZQYWdlcyc6IHBheWxvYWQubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICAncGFnZVNpemUnOiBwYXlsb2FkLnBhZ2VTaXplXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19
