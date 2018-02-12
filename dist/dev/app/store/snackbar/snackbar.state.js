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
var SnackbarActions = require("./snackbar.actions");
;
exports.initialState = {
    messageKey: '',
    messageParameters: {},
    translatedMessage: ''
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case SnackbarActions.Display.Type: {
            return {
                messageKey: action.messageKey,
                messageParameters: action.messageParameters,
                translatedMessage: ''
            };
        }
        case SnackbarActions.DisplaySuccess.Type: {
            return {
                messageKey: state.messageKey,
                messageParameters: __assign({}, state.messageParameters),
                translatedMessage: action.translatedMessage
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0RBQXNEO0FBT3JELENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUMxQixVQUFVLEVBQUUsRUFBRTtJQUNkLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsaUJBQWlCLEVBQUUsRUFBRTtDQUN0QixDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBMkI7SUFBeEQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsTUFBTSxDQUFDO2dCQUNMLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtnQkFDN0IsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtnQkFDM0MsaUJBQWlCLEVBQUUsRUFBRTthQUN0QixDQUFDO1FBQ0osQ0FBQztRQUVELEtBQUssZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxNQUFNLENBQUM7Z0JBQ0wsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixpQkFBaUIsZUFBTyxLQUFLLENBQUMsaUJBQWlCLENBQUU7Z0JBQ2pELGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7YUFDNUMsQ0FBQztRQUNKLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBeEJELDBCQXdCQyIsImZpbGUiOiJhcHAvc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTbmFja2JhckFjdGlvbnMgZnJvbSAnLi9zbmFja2Jhci5hY3Rpb25zJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIHJlYWRvbmx5IG1lc3NhZ2VLZXk6IHN0cmluZztcbiAgcmVhZG9ubHkgbWVzc2FnZVBhcmFtZXRlcnM6IFBvam87XG4gIHJlYWRvbmx5IHRyYW5zbGF0ZWRNZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBtZXNzYWdlS2V5OiAnJyxcbiAgbWVzc2FnZVBhcmFtZXRlcnM6IHt9LFxuICB0cmFuc2xhdGVkTWVzc2FnZTogJydcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBTbmFja2JhckFjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFNuYWNrYmFyQWN0aW9ucy5EaXNwbGF5LlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lc3NhZ2VLZXk6IGFjdGlvbi5tZXNzYWdlS2V5LFxuICAgICAgICBtZXNzYWdlUGFyYW1ldGVyczogYWN0aW9uLm1lc3NhZ2VQYXJhbWV0ZXJzLFxuICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZTogJydcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBTbmFja2JhckFjdGlvbnMuRGlzcGxheVN1Y2Nlc3MuVHlwZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZUtleTogc3RhdGUubWVzc2FnZUtleSxcbiAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgLi4uc3RhdGUubWVzc2FnZVBhcmFtZXRlcnMgfSxcbiAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2U6IGFjdGlvbi50cmFuc2xhdGVkTWVzc2FnZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=
