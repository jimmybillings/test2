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
var HeaderDisplayOptionsActions = require("./header-display-options.actions");
exports.initialState = {
    canBeFixed: false,
    isFixed: false,
    filtersAreAvailable: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case HeaderDisplayOptionsActions.EnableFix.Type: {
            return __assign({}, state, { canBeFixed: true });
        }
        case HeaderDisplayOptionsActions.DisableFix.Type: {
            return __assign({}, state, { canBeFixed: false });
        }
        case HeaderDisplayOptionsActions.EnableFilters.Type: {
            return __assign({}, state, { filtersAreAvailable: true });
        }
        case HeaderDisplayOptionsActions.DisableFilters.Type: {
            return __assign({}, state, { filtersAreAvailable: false });
        }
        case HeaderDisplayOptionsActions.Fix.Type: {
            return __assign({}, state, { isFixed: true });
        }
        case HeaderDisplayOptionsActions.Unfix.Type: {
            return __assign({}, state, { isFixed: false });
        }
        case HeaderDisplayOptionsActions.Reset.Type: {
            return __assign({}, exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhFQUFnRjtBQVFuRSxRQUFBLFlBQVksR0FBVTtJQUNqQyxVQUFVLEVBQUUsS0FBSztJQUNqQixPQUFPLEVBQUUsS0FBSztJQUNkLG1CQUFtQixFQUFFLEtBQUs7Q0FDM0IsQ0FBQztBQUVGLGlCQUF3QixLQUEyQixFQUFFLE1BQXVDO0lBQXBFLHNCQUFBLEVBQUEsUUFBZSxvQkFBWTtJQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQUMsS0FBSyxHQUFHLG9CQUFZLENBQUM7SUFFekMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFcEIsS0FBSywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEQsTUFBTSxjQUFNLEtBQUssSUFBRSxVQUFVLEVBQUUsSUFBSSxJQUFHO1FBQ3hDLENBQUM7UUFFRCxLQUFLLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqRCxNQUFNLGNBQU0sS0FBSyxJQUFFLFVBQVUsRUFBRSxLQUFLLElBQUc7UUFDekMsQ0FBQztRQUVELEtBQUssMkJBQTJCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELE1BQU0sY0FBTSxLQUFLLElBQUUsbUJBQW1CLEVBQUUsSUFBSSxJQUFHO1FBQ2pELENBQUM7UUFFRCxLQUFLLDJCQUEyQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRCxNQUFNLGNBQU0sS0FBSyxJQUFFLG1CQUFtQixFQUFFLEtBQUssSUFBRztRQUNsRCxDQUFDO1FBRUQsS0FBSywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUMsTUFBTSxjQUFNLEtBQUssSUFBRSxPQUFPLEVBQUUsSUFBSSxJQUFHO1FBQ3JDLENBQUM7UUFFRCxLQUFLLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxNQUFNLGNBQU0sS0FBSyxJQUFFLE9BQU8sRUFBRSxLQUFLLElBQUc7UUFDdEMsQ0FBQztRQUVELEtBQUssMkJBQTJCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVDLE1BQU0sY0FBTSxvQkFBWSxFQUFHO1FBQzdCLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUVILENBQUM7QUFDSCxDQUFDO0FBdENELDBCQXNDQyIsImZpbGUiOiJhcHAvc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLnN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSGVhZGVyRGlzcGxheU9wdGlvbnNBY3Rpb25zIGZyb20gJy4vaGVhZGVyLWRpc3BsYXktb3B0aW9ucy5hY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIGNhbkJlRml4ZWQ6IGJvb2xlYW47XG4gIGlzRml4ZWQ6IGJvb2xlYW47XG4gIGZpbHRlcnNBcmVBdmFpbGFibGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBjYW5CZUZpeGVkOiBmYWxzZSxcbiAgaXNGaXhlZDogZmFsc2UsXG4gIGZpbHRlcnNBcmVBdmFpbGFibGU6IGZhbHNlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogSGVhZGVyRGlzcGxheU9wdGlvbnNBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5FbmFibGVGaXguVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGNhbkJlRml4ZWQ6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5EaXNhYmxlRml4LlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBjYW5CZUZpeGVkOiBmYWxzZSB9O1xuICAgIH1cblxuICAgIGNhc2UgSGVhZGVyRGlzcGxheU9wdGlvbnNBY3Rpb25zLkVuYWJsZUZpbHRlcnMuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZpbHRlcnNBcmVBdmFpbGFibGU6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5EaXNhYmxlRmlsdGVycy5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZmlsdGVyc0FyZUF2YWlsYWJsZTogZmFsc2UgfTtcbiAgICB9XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5GaXguVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGlzRml4ZWQ6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5VbmZpeC5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgaXNGaXhlZDogZmFsc2UgfTtcbiAgICB9XG5cbiAgICBjYXNlIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5SZXNldC5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5pbml0aWFsU3RhdGUgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gIH1cbn1cbiJdfQ==
