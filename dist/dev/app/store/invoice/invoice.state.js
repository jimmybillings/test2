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
var InvoiceActions = require("./invoice.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    loading: false,
    invoice: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case InvoiceActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case InvoiceActions.LoadSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { invoice: action.invoice, loading: false });
        }
        case InvoiceActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtEQUFvRDtBQUNwRCw0RUFBaUU7QUFNaEUsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFVO0lBQ2pDLE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBMEI7SUFBdkQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLE9BQU8sRUFBRSxJQUFJLElBQUc7UUFDbkQsQ0FBQztRQUVELEtBQUssY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSTtRQUM5RSxDQUFDO1FBRUQsS0FBSyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JDLE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxPQUFPLEVBQUUsS0FBSyxJQUFHO1FBQ3BELENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBcEJELDBCQW9CQyIsImZpbGUiOiJhcHAvc3RvcmUvaW52b2ljZS9pbnZvaWNlLnN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW52b2ljZUFjdGlvbnMgZnJvbSAnLi9pbnZvaWNlLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IEludm9pY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVhZG9ubHkgbG9hZGluZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgaW52b2ljZTogSW52b2ljZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBsb2FkaW5nOiBmYWxzZSxcbiAgaW52b2ljZTogbnVsbFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEludm9pY2VBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBJbnZvaWNlQWN0aW9ucy5Mb2FkLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIEludm9pY2VBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGludm9pY2U6IGFjdGlvbi5pbnZvaWNlLCBsb2FkaW5nOiBmYWxzZSwgfTtcbiAgICB9XG5cbiAgICBjYXNlIEludm9pY2VBY3Rpb25zLkxvYWRGYWlsdXJlLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuIl19
