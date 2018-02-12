"use strict";
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
    OrdersStore.decorators = [
        { type: core_1.Injectable },
    ];
    OrdersStore.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return OrdersStore;
}());
exports.OrdersStore = OrdersStore;
//# sourceMappingURL=orders.store.js.map