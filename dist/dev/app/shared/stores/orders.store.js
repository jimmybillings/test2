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
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
var ordersState = {
    items: [],
    pagination: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 100,
        hasNextPage: false,
        hasPreviousPage: false,
        numberOfPages: 0
    }
};
function orders(state, action) {
    if (state === void 0) { state = ordersState; }
    switch (action.type) {
        case 'ORDERS.GET_ORDERS':
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}
exports.orders = orders;
;
var OrdersStore = (function () {
    function OrdersStore(store) {
        this.store = store;
    }
    Object.defineProperty(OrdersStore.prototype, "data", {
        get: function () {
            return this.store.select('orders');
        },
        enumerable: true,
        configurable: true
    });
    OrdersStore.prototype.storeOrders = function (payload) {
        payload.items = payload.items === undefined ? [] : payload.items;
        this.store.dispatch({
            type: 'ORDERS.GET_ORDERS', payload: {
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
    OrdersStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], OrdersStore);
    return OrdersStore;
}());
exports.OrdersStore = OrdersStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL29yZGVycy5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUNwQyxzQ0FBMkM7QUFRM0MsSUFBTSxXQUFXLEdBQVc7SUFDMUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxVQUFVLEVBQUU7UUFDVixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO1FBQ2QsUUFBUSxFQUFFLEdBQUc7UUFDYixXQUFXLEVBQUUsS0FBSztRQUNsQixlQUFlLEVBQUUsS0FBSztRQUN0QixhQUFhLEVBQUUsQ0FBQztLQUNqQjtDQUNGLENBQUM7QUFFRixnQkFBdUIsS0FBMkIsRUFBRSxNQUFvQjtJQUFqRCxzQkFBQSxFQUFBLG1CQUEyQjtJQUNoRCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLG1CQUFtQjtZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQVBELHdCQU9DO0FBQUEsQ0FBQztBQUlGO0lBQ0UscUJBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7SUFBSSxDQUFDO0lBRTFDLHNCQUFXLDZCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBVyxHQUFsQixVQUFtQixPQUFZO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsQixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFO2dCQUNsQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3RCLFlBQVksRUFBRTtvQkFDWixZQUFZLEVBQUUsT0FBTyxDQUFDLFVBQVU7b0JBQ2hDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUM7b0JBQ3RDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVztvQkFDbEMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGVBQWU7b0JBQzFDLGVBQWUsRUFBRSxPQUFPLENBQUMsYUFBYTtvQkFDdEMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lCQUM3QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXRCVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBRWdCLGFBQUs7T0FEckIsV0FBVyxDQXVCdkI7SUFBRCxrQkFBQztDQXZCRCxBQXVCQyxJQUFBO0FBdkJZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvc3RvcmVzL29yZGVycy5zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcmRlcnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMZWdhY3lBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIE9yZGVycyBzdG9yZSAtXG4gKi9cbmNvbnN0IG9yZGVyc1N0YXRlOiBPcmRlcnMgPSB7XG4gIGl0ZW1zOiBbXSxcbiAgcGFnaW5hdGlvbjoge1xuICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgY3VycmVudFBhZ2U6IDEsXG4gICAgcGFnZVNpemU6IDEwMCxcbiAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICBudW1iZXJPZlBhZ2VzOiAwXG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlcnMoc3RhdGU6IE9yZGVycyA9IG9yZGVyc1N0YXRlLCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT1JERVJTLkdFVF9PUkRFUlMnOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbi5wYXlsb2FkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlcnNTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHsgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdCgnb3JkZXJzJyk7XG4gIH1cblxuICBwdWJsaWMgc3RvcmVPcmRlcnMocGF5bG9hZDogYW55KTogdm9pZCB7XG4gICAgcGF5bG9hZC5pdGVtcyA9IHBheWxvYWQuaXRlbXMgPT09IHVuZGVmaW5lZCA/IFtdIDogcGF5bG9hZC5pdGVtcztcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPUkRFUlMuR0VUX09SREVSUycsIHBheWxvYWQ6IHtcbiAgICAgICAgJ2l0ZW1zJzogcGF5bG9hZC5pdGVtcyxcbiAgICAgICAgJ3BhZ2luYXRpb24nOiB7XG4gICAgICAgICAgJ3RvdGFsQ291bnQnOiBwYXlsb2FkLnRvdGFsQ291bnQsXG4gICAgICAgICAgJ2N1cnJlbnRQYWdlJzogcGF5bG9hZC5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgICAgJ2hhc05leHRQYWdlJzogcGF5bG9hZC5oYXNOZXh0UGFnZSxcbiAgICAgICAgICAnaGFzUHJldmlvdXNQYWdlJzogcGF5bG9hZC5oYXNQcmV2aW91c1BhZ2UsXG4gICAgICAgICAgJ251bWJlck9mUGFnZXMnOiBwYXlsb2FkLm51bWJlck9mUGFnZXMsXG4gICAgICAgICAgJ3BhZ2VTaXplJzogcGF5bG9hZC5wYWdlU2l6ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
