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
var PricingActions = require("./pricing.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    priceForDetails: null,
    priceForDialog: null,
    attributes: null,
    appliedAttributes: null,
    selectedAttributes: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case PricingActions.ResetPricing.Type: {
            return common_functions_1.Common.clone(exports.initialState);
        }
        case PricingActions.CalculatePrice.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedAttributes: action.selectedAttributes });
        }
        case PricingActions.SetAppliedAttributes.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { appliedAttributes: action.appliedAttributes });
        }
        case PricingActions.GetAttributesSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { attributes: action.attributes });
        }
        case PricingActions.SetPriceForDetails.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { priceForDetails: action.price });
        }
        case PricingActions.SetPriceForDialog.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { priceForDialog: action.price });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtEQUFvRDtBQUVwRCw0RUFBaUU7QUFXcEQsUUFBQSxZQUFZLEdBQVU7SUFDakMsZUFBZSxFQUFFLElBQUk7SUFDckIsY0FBYyxFQUFFLElBQUk7SUFDcEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixrQkFBa0IsRUFBRSxJQUFJO0NBQ3pCLENBQUM7QUFFRixpQkFBd0IsS0FBMkIsRUFBRSxNQUEwQjtJQUF2RCxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXBCLEtBQUssY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMseUJBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQVksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxLQUFLLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsSUFBRztRQUNuRixDQUFDO1FBRUQsS0FBSyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsSUFBRztRQUNqRixDQUFDO1FBRUQsS0FBSyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFHO1FBQ25FLENBQUM7UUFFRCxLQUFLLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUc7UUFDbkUsQ0FBQztRQUVELEtBQUssY0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBRztRQUNsRSxDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFFSCxDQUFDO0FBQ0gsQ0FBQztBQWxDRCwwQkFrQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL3ByaWNpbmcvcHJpY2luZy5zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFByaWNpbmdBY3Rpb25zIGZyb20gJy4vcHJpY2luZy5hY3Rpb25zJztcbmltcG9ydCB7IFByaWNlQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBQb2pvLCBTZWxlY3RlZFByaWNlQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBwcmljZUZvckRldGFpbHM6IG51bWJlcjtcbiAgcHJpY2VGb3JEaWFsb2c6IG51bWJlcjtcbiAgYXR0cmlidXRlczogUHJpY2VBdHRyaWJ1dGVbXTtcbiAgYXBwbGllZEF0dHJpYnV0ZXM6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXTtcbiAgc2VsZWN0ZWRBdHRyaWJ1dGVzOiBQb2pvO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgcHJpY2VGb3JEZXRhaWxzOiBudWxsLFxuICBwcmljZUZvckRpYWxvZzogbnVsbCxcbiAgYXR0cmlidXRlczogbnVsbCxcbiAgYXBwbGllZEF0dHJpYnV0ZXM6IG51bGwsXG4gIHNlbGVjdGVkQXR0cmlidXRlczogbnVsbFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IFByaWNpbmdBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIFByaWNpbmdBY3Rpb25zLlJlc2V0UHJpY2luZy5UeXBlOiB7XG4gICAgICByZXR1cm4gQ29tbW9uLmNsb25lKGluaXRpYWxTdGF0ZSk7XG4gICAgfVxuXG4gICAgY2FzZSBQcmljaW5nQWN0aW9ucy5DYWxjdWxhdGVQcmljZS5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5Db21tb24uY2xvbmUoc3RhdGUpLCBzZWxlY3RlZEF0dHJpYnV0ZXM6IGFjdGlvbi5zZWxlY3RlZEF0dHJpYnV0ZXMgfTtcbiAgICB9XG5cbiAgICBjYXNlIFByaWNpbmdBY3Rpb25zLlNldEFwcGxpZWRBdHRyaWJ1dGVzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGFwcGxpZWRBdHRyaWJ1dGVzOiBhY3Rpb24uYXBwbGllZEF0dHJpYnV0ZXMgfTtcbiAgICB9XG5cbiAgICBjYXNlIFByaWNpbmdBY3Rpb25zLkdldEF0dHJpYnV0ZXNTdWNjZXNzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGF0dHJpYnV0ZXM6IGFjdGlvbi5hdHRyaWJ1dGVzIH07XG4gICAgfVxuXG4gICAgY2FzZSBQcmljaW5nQWN0aW9ucy5TZXRQcmljZUZvckRldGFpbHMuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uQ29tbW9uLmNsb25lKHN0YXRlKSwgcHJpY2VGb3JEZXRhaWxzOiBhY3Rpb24ucHJpY2UgfTtcbiAgICB9XG5cbiAgICBjYXNlIFByaWNpbmdBY3Rpb25zLlNldFByaWNlRm9yRGlhbG9nLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIHByaWNlRm9yRGlhbG9nOiBhY3Rpb24ucHJpY2UgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gIH1cbn1cbiJdfQ==
