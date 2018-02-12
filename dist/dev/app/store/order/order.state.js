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
var OrderActions = require("./order.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    activeOrder: {
        id: 0,
        paymentTerms: '',
        paymentType: null,
        poNumber: '',
        discount: 0,
        bulkOrderId: '',
        createdUserId: 0,
        ownerUserId: 0,
        orderStatus: null,
        orderType: null,
        quoteId: 0,
        taxAmount: 0,
        licenseAgreementId: '',
        refundAmount: 0,
        salesVertical: '',
        oldCommerceId: 0,
        salesForceId: '',
        createdByIntegration: false,
        salesForceSyncedError: false,
        paymentBalance: 0,
        creditMemoForOrderId: 0,
        projects: []
    },
    loading: false,
    checkingOut: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case OrderActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case OrderActions.LoadSuccess.Type: {
            return { activeOrder: action.activeOrder, loading: false, checkingOut: state.checkingOut };
        }
        case OrderActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        case OrderActions.SetCheckoutState.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { checkingOut: action.checkingOut });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQWdEO0FBRWhELDRFQUFpRTtBQU9oRSxDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQVU7SUFDakMsV0FBVyxFQUFFO1FBQ1gsRUFBRSxFQUFFLENBQUM7UUFDTCxZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsSUFBSTtRQUNqQixRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxDQUFDO1FBQ1gsV0FBVyxFQUFFLEVBQUU7UUFDZixhQUFhLEVBQUUsQ0FBQztRQUNoQixXQUFXLEVBQUUsQ0FBQztRQUNkLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsT0FBTyxFQUFFLENBQUM7UUFDVixTQUFTLEVBQUUsQ0FBQztRQUNaLGtCQUFrQixFQUFFLEVBQUU7UUFDdEIsWUFBWSxFQUFFLENBQUM7UUFDZixhQUFhLEVBQUUsRUFBRTtRQUNqQixhQUFhLEVBQUUsQ0FBQztRQUNoQixZQUFZLEVBQUUsRUFBRTtRQUNoQixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsY0FBYyxFQUFFLENBQUM7UUFDakIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixRQUFRLEVBQUUsRUFBRTtLQUNiO0lBQ0QsT0FBTyxFQUFFLEtBQUs7SUFDZCxXQUFXLEVBQUUsS0FBSztDQUNuQixDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBd0I7SUFBckQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLE9BQU8sRUFBRSxJQUFJLElBQUc7UUFDbkQsQ0FBQztRQUVELEtBQUssWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0YsQ0FBQztRQUVELEtBQUssWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsT0FBTyxFQUFFLEtBQUssSUFBRztRQUNwRCxDQUFDO1FBRUQsS0FBSyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFHO1FBQ3JFLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBeEJELDBCQXdCQyIsImZpbGUiOiJhcHAvc3RvcmUvb3JkZXIvb3JkZXIuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBPcmRlckFjdGlvbnMgZnJvbSAnLi9vcmRlci5hY3Rpb25zJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVhZG9ubHkgYWN0aXZlT3JkZXI6IE9yZGVyO1xuICByZWFkb25seSBsb2FkaW5nOiBib29sZWFuO1xuICByZWFkb25seSBjaGVja2luZ091dDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBhY3RpdmVPcmRlcjoge1xuICAgIGlkOiAwLFxuICAgIHBheW1lbnRUZXJtczogJycsXG4gICAgcGF5bWVudFR5cGU6IG51bGwsXG4gICAgcG9OdW1iZXI6ICcnLFxuICAgIGRpc2NvdW50OiAwLFxuICAgIGJ1bGtPcmRlcklkOiAnJyxcbiAgICBjcmVhdGVkVXNlcklkOiAwLFxuICAgIG93bmVyVXNlcklkOiAwLFxuICAgIG9yZGVyU3RhdHVzOiBudWxsLFxuICAgIG9yZGVyVHlwZTogbnVsbCxcbiAgICBxdW90ZUlkOiAwLFxuICAgIHRheEFtb3VudDogMCxcbiAgICBsaWNlbnNlQWdyZWVtZW50SWQ6ICcnLFxuICAgIHJlZnVuZEFtb3VudDogMCxcbiAgICBzYWxlc1ZlcnRpY2FsOiAnJyxcbiAgICBvbGRDb21tZXJjZUlkOiAwLFxuICAgIHNhbGVzRm9yY2VJZDogJycsXG4gICAgY3JlYXRlZEJ5SW50ZWdyYXRpb246IGZhbHNlLFxuICAgIHNhbGVzRm9yY2VTeW5jZWRFcnJvcjogZmFsc2UsXG4gICAgcGF5bWVudEJhbGFuY2U6IDAsXG4gICAgY3JlZGl0TWVtb0Zvck9yZGVySWQ6IDAsXG4gICAgcHJvamVjdHM6IFtdXG4gIH0sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBjaGVja2luZ091dDogZmFsc2Vcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBPcmRlckFjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIE9yZGVyQWN0aW9ucy5Mb2FkLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIE9yZGVyQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlOiB7XG4gICAgICByZXR1cm4geyBhY3RpdmVPcmRlcjogYWN0aW9uLmFjdGl2ZU9yZGVyLCBsb2FkaW5nOiBmYWxzZSwgY2hlY2tpbmdPdXQ6IHN0YXRlLmNoZWNraW5nT3V0IH07XG4gICAgfVxuXG4gICAgY2FzZSBPcmRlckFjdGlvbnMuTG9hZEZhaWx1cmUuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uQ29tbW9uLmNsb25lKHN0YXRlKSwgbG9hZGluZzogZmFsc2UgfTtcbiAgICB9XG5cbiAgICBjYXNlIE9yZGVyQWN0aW9ucy5TZXRDaGVja291dFN0YXRlLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGNoZWNraW5nT3V0OiBhY3Rpb24uY2hlY2tpbmdPdXQgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=
