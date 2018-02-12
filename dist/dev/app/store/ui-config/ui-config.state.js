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
var UiConfigActions = require("./ui-config.actions");
;
exports.initialState = { loaded: false, components: null };
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case UiConfigActions.LoadSuccess.Type: {
            return __assign({}, state, action.config, { loaded: true });
        }
        case UiConfigActions.InitializeSuccess.Type: {
            return __assign({}, state, action.config);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxREFBdUQ7QUFNdEQsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFFdkUsaUJBQXdCLEtBQTJCLEVBQUUsTUFBMkI7SUFBeEQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVwQixLQUFLLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsTUFBTSxjQUNELEtBQUssRUFDTCxNQUFNLENBQUMsTUFBTSxJQUNoQixNQUFNLEVBQUUsSUFBSSxJQUNaO1FBQ0osQ0FBQztRQUVELEtBQUssZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVDLE1BQU0sY0FDRCxLQUFLLEVBQ0wsTUFBTSxDQUFDLE1BQU0sRUFDaEI7UUFDSixDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFFSCxDQUFDO0FBQ0gsQ0FBQztBQXpCRCwwQkF5QkMiLCJmaWxlIjoiYXBwL3N0b3JlL3VpLWNvbmZpZy91aS1jb25maWcuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVaUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi91aS1jb25maWcuYWN0aW9ucyc7XG5pbXBvcnQgeyBDb21tb24sIFVpQ29uZmlnU2VnbWVudCwgVWlDb25maWdDb21wb25lbnRzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUgZXh0ZW5kcyBDb21tb24ge1xuICBsb2FkZWQ6IGJvb2xlYW47XG4gIGNvbXBvbmVudHM6IFVpQ29uZmlnQ29tcG9uZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0geyBsb2FkZWQ6IGZhbHNlLCBjb21wb25lbnRzOiBudWxsIH07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBVaUNvbmZpZ0FjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgVWlDb25maWdBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24uY29uZmlnLFxuICAgICAgICBsb2FkZWQ6IHRydWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBVaUNvbmZpZ0FjdGlvbnMuSW5pdGlhbGl6ZVN1Y2Nlc3MuVHlwZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC4uLmFjdGlvbi5jb25maWdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICB9XG59XG4iXX0=
