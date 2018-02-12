"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrivacyPolicyActions = require("./privacy-policy.actions");
exports.initialState = {
    document: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case PrivacyPolicyActions.LoadSuccess.Type: {
            return { document: action.document };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFpRTtBQU1wRCxRQUFBLFlBQVksR0FBVTtJQUNqQyxRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixpQkFBd0IsS0FBMkIsRUFBRSxNQUFnQztJQUE3RCxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXBCLEtBQUssb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELFNBQVMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBRUgsQ0FBQztBQUNILENBQUM7QUFkRCwwQkFjQyIsImZpbGUiOiJhcHAvc3RvcmUvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQcml2YWN5UG9saWN5QWN0aW9ucyBmcm9tICcuL3ByaXZhY3ktcG9saWN5LmFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgZG9jdW1lbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIGRvY3VtZW50OiBudWxsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogUHJpdmFjeVBvbGljeUFjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgUHJpdmFjeVBvbGljeUFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZToge1xuICAgICAgcmV0dXJuIHsgZG9jdW1lbnQ6IGFjdGlvbi5kb2N1bWVudCB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgfVxufVxuIl19
