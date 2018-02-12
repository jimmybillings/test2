"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CheckoutActions = require("./checkout.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    purchaseOrderId: '',
    paymentOptions: null,
    selectedPaymentType: null,
    addresses: [],
    selectedAddress: {
        type: null,
        name: '',
        defaultAddress: null,
        addressEntityId: null,
        address: {
            address: '',
            state: '',
            city: '',
            country: '',
            zipcode: '',
            phone: ''
        }
    },
    authorization: {
        card: {
            brand: '',
            last4: '',
            exp_month: '',
            exp_year: ''
        }
    }
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case CheckoutActions.SetPurchaseOrderId.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { purchaseOrderId: action.purchaseOrderId });
        }
        case CheckoutActions.SetAvailablePaymentOptions.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { paymentOptions: action.paymentOptions });
        }
        case CheckoutActions.SetSelectedPaymentType.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedPaymentType: action.selectedPaymentType });
        }
        case CheckoutActions.SetAvailableAddresses.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { addresses: action.addresses });
        }
        case CheckoutActions.SetSelectedAddress.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedAddress: action.selectedAddress });
        }
        case CheckoutActions.SetCreditCardAuthorization.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { authorization: action.authorization });
        }
        case CheckoutActions.Reset.Type: {
            return __assign({}, exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jaGVja291dC9jaGVja291dC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQXNEO0FBR3RELDRFQUFpRTtBQVdwRCxRQUFBLFlBQVksR0FBVTtJQUNqQyxlQUFlLEVBQUUsRUFBRTtJQUNuQixjQUFjLEVBQUUsSUFBSTtJQUNwQixtQkFBbUIsRUFBRSxJQUFJO0lBQ3pCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNWO0tBQ0Y7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBMkI7SUFBeEQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVwQixLQUFLLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlLElBQUc7UUFDN0UsQ0FBQztRQUVELEtBQUssZUFBZSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JELE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWMsSUFBRztRQUMzRSxDQUFDO1FBRUQsS0FBSyxlQUFlLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsSUFBRztRQUNyRixDQUFDO1FBRUQsS0FBSyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEQsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxJQUFHO1FBQ2pFLENBQUM7UUFFRCxLQUFLLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlLElBQUc7UUFDN0UsQ0FBQztRQUVELEtBQUssZUFBZSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JELE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWEsSUFBRztRQUN6RSxDQUFDO1FBRUQsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLE1BQU0sY0FBTSxvQkFBWSxFQUFHO1FBQzdCLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUVILENBQUM7QUFDSCxDQUFDO0FBdENELDBCQXNDQyIsImZpbGUiOiJhcHAvc3RvcmUvY2hlY2tvdXQvY2hlY2tvdXQuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDaGVja291dEFjdGlvbnMgZnJvbSAnLi9jaGVja291dC5hY3Rpb25zJztcbmltcG9ydCB7IFBheW1lbnRPcHRpb25zLCBQYXltZW50T3B0aW9uLCBDcmVkaXRDYXJkQXV0aG9yaXphdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBWaWV3QWRkcmVzcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBwdXJjaGFzZU9yZGVySWQ6IHN0cmluZztcbiAgcGF5bWVudE9wdGlvbnM6IFBheW1lbnRPcHRpb25zO1xuICBzZWxlY3RlZFBheW1lbnRUeXBlOiBQYXltZW50T3B0aW9uO1xuICBhZGRyZXNzZXM6IFZpZXdBZGRyZXNzW107XG4gIHNlbGVjdGVkQWRkcmVzczogVmlld0FkZHJlc3M7XG4gIGF1dGhvcml6YXRpb246IENyZWRpdENhcmRBdXRob3JpemF0aW9uO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgcHVyY2hhc2VPcmRlcklkOiAnJyxcbiAgcGF5bWVudE9wdGlvbnM6IG51bGwsXG4gIHNlbGVjdGVkUGF5bWVudFR5cGU6IG51bGwsXG4gIGFkZHJlc3NlczogW10sXG4gIHNlbGVjdGVkQWRkcmVzczoge1xuICAgIHR5cGU6IG51bGwsXG4gICAgbmFtZTogJycsXG4gICAgZGVmYXVsdEFkZHJlc3M6IG51bGwsXG4gICAgYWRkcmVzc0VudGl0eUlkOiBudWxsLFxuICAgIGFkZHJlc3M6IHtcbiAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgc3RhdGU6ICcnLFxuICAgICAgY2l0eTogJycsXG4gICAgICBjb3VudHJ5OiAnJyxcbiAgICAgIHppcGNvZGU6ICcnLFxuICAgICAgcGhvbmU6ICcnXG4gICAgfVxuICB9LFxuICBhdXRob3JpemF0aW9uOiB7XG4gICAgY2FyZDoge1xuICAgICAgYnJhbmQ6ICcnLFxuICAgICAgbGFzdDQ6ICcnLFxuICAgICAgZXhwX21vbnRoOiAnJyxcbiAgICAgIGV4cF95ZWFyOiAnJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IENoZWNrb3V0QWN0aW9ucy5BbnkpOiBTdGF0ZSB7XG4gIGlmIChzdGF0ZSA9PT0gbnVsbCkgc3RhdGUgPSBpbml0aWFsU3RhdGU7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgY2FzZSBDaGVja291dEFjdGlvbnMuU2V0UHVyY2hhc2VPcmRlcklkLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIHB1cmNoYXNlT3JkZXJJZDogYWN0aW9uLnB1cmNoYXNlT3JkZXJJZCB9O1xuICAgIH1cblxuICAgIGNhc2UgQ2hlY2tvdXRBY3Rpb25zLlNldEF2YWlsYWJsZVBheW1lbnRPcHRpb25zLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIHBheW1lbnRPcHRpb25zOiBhY3Rpb24ucGF5bWVudE9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICBjYXNlIENoZWNrb3V0QWN0aW9ucy5TZXRTZWxlY3RlZFBheW1lbnRUeXBlLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIHNlbGVjdGVkUGF5bWVudFR5cGU6IGFjdGlvbi5zZWxlY3RlZFBheW1lbnRUeXBlIH07XG4gICAgfVxuXG4gICAgY2FzZSBDaGVja291dEFjdGlvbnMuU2V0QXZhaWxhYmxlQWRkcmVzc2VzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGFkZHJlc3NlczogYWN0aW9uLmFkZHJlc3NlcyB9O1xuICAgIH1cblxuICAgIGNhc2UgQ2hlY2tvdXRBY3Rpb25zLlNldFNlbGVjdGVkQWRkcmVzcy5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5Db21tb24uY2xvbmUoc3RhdGUpLCBzZWxlY3RlZEFkZHJlc3M6IGFjdGlvbi5zZWxlY3RlZEFkZHJlc3MgfTtcbiAgICB9XG5cbiAgICBjYXNlIENoZWNrb3V0QWN0aW9ucy5TZXRDcmVkaXRDYXJkQXV0aG9yaXphdGlvbi5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5Db21tb24uY2xvbmUoc3RhdGUpLCBhdXRob3JpemF0aW9uOiBhY3Rpb24uYXV0aG9yaXphdGlvbiB9O1xuICAgIH1cblxuICAgIGNhc2UgQ2hlY2tvdXRBY3Rpb25zLlJlc2V0LlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLmluaXRpYWxTdGF0ZSB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgfVxufVxuIl19
