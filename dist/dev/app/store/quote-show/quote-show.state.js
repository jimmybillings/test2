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
var QuoteShowActions = require("./quote-show.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    data: {
        id: 0,
        total: 0,
        createdUserId: 0,
        ownerUserId: 0,
        quoteStatus: 'PENDING'
    },
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case QuoteShowActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case QuoteShowActions.LoadSuccess.Type: {
            return {
                loading: false,
                data: __assign({}, action.quote)
            };
        }
        case QuoteShowActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVEQUF5RDtBQUN6RCw0RUFBaUU7QUFRcEQsUUFBQSxZQUFZLEdBQVU7SUFDakMsSUFBSSxFQUFFO1FBQ0osRUFBRSxFQUFFLENBQUM7UUFDTCxLQUFLLEVBQUUsQ0FBQztRQUNSLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsV0FBVyxFQUFFLFNBQVM7S0FDdkI7SUFDRCxPQUFPLEVBQUUsS0FBSztDQUNmLENBQUM7QUFFRixpQkFBd0IsS0FBMkIsRUFBRSxNQUE0QjtJQUF6RCxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLE1BQU0sY0FDRCx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFDdEIsT0FBTyxFQUFFLElBQUksSUFDYjtRQUNKLENBQUM7UUFFRCxLQUFLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxNQUFNLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsSUFBSSxlQUNDLE1BQU0sQ0FBQyxLQUFLLENBQ2hCO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxLQUFLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxNQUFNLGNBQ0QseUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQ3RCLE9BQU8sRUFBRSxLQUFLLElBQ2Q7UUFDSixDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQS9CRCwwQkErQkMiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLXNob3cvcXVvdGUtc2hvdy5zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFF1b3RlU2hvd0FjdGlvbnMgZnJvbSAnLi9xdW90ZS1zaG93LmFjdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IFF1b3RlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIGRhdGE6IFF1b3RlO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgZGF0YToge1xuICAgIGlkOiAwLFxuICAgIHRvdGFsOiAwLFxuICAgIGNyZWF0ZWRVc2VySWQ6IDAsXG4gICAgb3duZXJVc2VySWQ6IDAsXG4gICAgcXVvdGVTdGF0dXM6ICdQRU5ESU5HJ1xuICB9LFxuICBsb2FkaW5nOiBmYWxzZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IFF1b3RlU2hvd0FjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFF1b3RlU2hvd0FjdGlvbnMuTG9hZC5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5Db21tb24uY2xvbmUoc3RhdGUpLFxuICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgUXVvdGVTaG93QWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIC4uLmFjdGlvbi5xdW90ZVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgUXVvdGVTaG93QWN0aW9ucy5Mb2FkRmFpbHVyZS5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5Db21tb24uY2xvbmUoc3RhdGUpLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=
