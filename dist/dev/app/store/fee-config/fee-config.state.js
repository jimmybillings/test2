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
var common_functions_1 = require("../../shared/utilities/common.functions");
var FeeConfigActions = require("./fee-config.actions");
exports.initialState = {
    initialized: null,
    feeConfig: { items: [] },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case FeeConfigActions.LoadFeeConfig.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { initialized: false });
        }
        case FeeConfigActions.LoadFeeConfigSuccess.Type: {
            return {
                initialized: true,
                feeConfig: action.feeConfig ? action.feeConfig : { items: [] }
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRFQUFpRTtBQUVqRSx1REFBeUQ7QUFPNUMsUUFBQSxZQUFZLEdBQVU7SUFDakMsV0FBVyxFQUFFLElBQUk7SUFDakIsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtDQUN6QixDQUFDO0FBR0YsaUJBQXdCLEtBQTJCLEVBQUUsTUFBNEI7SUFBekQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxNQUFNLGNBQ0QseUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQ3RCLFdBQVcsRUFBRSxLQUFLLElBQ2xCO1FBQ0osQ0FBQztRQUVELEtBQUssZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEQsTUFBTSxDQUFDO2dCQUNMLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2FBQy9ELENBQUM7UUFDSixDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQXRCRCwwQkFzQkMiLCJmaWxlIjoiYXBwL3N0b3JlL2ZlZS1jb25maWcvZmVlLWNvbmZpZy5zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBGZWVDb25maWcgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgRmVlQ29uZmlnQWN0aW9ucyBmcm9tICcuL2ZlZS1jb25maWcuYWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgZmVlQ29uZmlnOiBGZWVDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBpbml0aWFsaXplZDogbnVsbCxcbiAgZmVlQ29uZmlnOiB7IGl0ZW1zOiBbXSB9LFxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogRmVlQ29uZmlnQWN0aW9ucy5BbnkpOiBTdGF0ZSB7XG4gIGlmIChzdGF0ZSA9PT0gbnVsbCkgc3RhdGUgPSBpbml0aWFsU3RhdGU7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgRmVlQ29uZmlnQWN0aW9ucy5Mb2FkRmVlQ29uZmlnLlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksXG4gICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBGZWVDb25maWdBY3Rpb25zLkxvYWRGZWVDb25maWdTdWNjZXNzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICBmZWVDb25maWc6IGFjdGlvbi5mZWVDb25maWcgPyBhY3Rpb24uZmVlQ29uZmlnIDogeyBpdGVtczogW10gfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=
