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
var CartActions = require("./cart.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    data: {
        id: null,
        userId: null,
        total: null
    },
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case CartActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case CartActions.EditLineItemFromDetailsSuccess.Type:
        case CartActions.LoadSuccess.Type:
        case CartActions.AddNoteSuccess.Type:
        case CartActions.RemoveNoteSuccess.Type:
        case CartActions.RemoveAssetSuccess.Type: {
            return {
                loading: false,
                data: __assign({}, action.cart)
            };
        }
        case CartActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRDQUE4QztBQUM5Qyw0RUFBaUU7QUFRcEQsUUFBQSxZQUFZLEdBQVU7SUFDakMsSUFBSSxFQUFFO1FBQ0osRUFBRSxFQUFFLElBQUk7UUFDUixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxPQUFPLEVBQUUsS0FBSztDQUNmLENBQUM7QUFFRixpQkFBd0IsS0FBMkIsRUFBRSxNQUF1QjtJQUFwRCxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixNQUFNLGNBQ0QseUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQ3RCLE9BQU8sRUFBRSxJQUFJLElBQ2I7UUFDSixDQUFDO1FBRUQsS0FBSyxXQUFXLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDO1FBQ3JELEtBQUssV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbEMsS0FBSyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztRQUNyQyxLQUFLLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDeEMsS0FBSyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekMsTUFBTSxDQUFDO2dCQUNMLE9BQU8sRUFBRSxLQUFLO2dCQUNkLElBQUksZUFDQyxNQUFNLENBQUMsSUFBSSxDQUNmO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsTUFBTSxjQUNELHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUN0QixPQUFPLEVBQUUsS0FBSyxJQUNkO1FBQ0osQ0FBQztRQUVELFNBQVMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBRUgsQ0FBQztBQUNILENBQUM7QUFwQ0QsMEJBb0NDIiwiZmlsZSI6ImFwcC9zdG9yZS9jYXJ0L2NhcnQuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDYXJ0QWN0aW9ucyBmcm9tICcuL2NhcnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBkYXRhOiBDYXJ0O1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgZGF0YToge1xuICAgIGlkOiBudWxsLFxuICAgIHVzZXJJZDogbnVsbCxcbiAgICB0b3RhbDogbnVsbFxuICB9LFxuICBsb2FkaW5nOiBmYWxzZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IENhcnRBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBDYXJ0QWN0aW9ucy5Mb2FkLlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksXG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBDYXJ0QWN0aW9ucy5FZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MuVHlwZTpcbiAgICBjYXNlIENhcnRBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGU6XG4gICAgY2FzZSBDYXJ0QWN0aW9ucy5BZGROb3RlU3VjY2Vzcy5UeXBlOlxuICAgIGNhc2UgQ2FydEFjdGlvbnMuUmVtb3ZlTm90ZVN1Y2Nlc3MuVHlwZTpcbiAgICBjYXNlIENhcnRBY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2Vzcy5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIC4uLmFjdGlvbi5jYXJ0XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBDYXJ0QWN0aW9ucy5Mb2FkRmFpbHVyZS5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5Db21tb24uY2xvbmUoc3RhdGUpLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gIH1cbn1cbiJdfQ==
