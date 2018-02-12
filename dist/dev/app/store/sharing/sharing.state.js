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
var SharingActions = require("./sharing.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    assetLink: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case SharingActions.CreateAssetShareLinkSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { assetLink: action.link });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtEQUFvRDtBQUNwRCw0RUFBaUU7QUFNcEQsUUFBQSxZQUFZLEdBQVU7SUFDakMsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQztBQUVGLGlCQUF3QixLQUEyQixFQUFFLE1BQTBCO0lBQXZELHNCQUFBLEVBQUEsUUFBZSxvQkFBWTtJQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQUMsS0FBSyxHQUFHLG9CQUFZLENBQUM7SUFFekMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxjQUFjLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckQsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFHO1FBQzVELENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBWkQsMEJBWUMiLCJmaWxlIjoiYXBwL3N0b3JlL3NoYXJpbmcvc2hhcmluZy5zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNoYXJpbmdBY3Rpb25zIGZyb20gJy4vc2hhcmluZy5hY3Rpb25zJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBhc3NldExpbms6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIGFzc2V0TGluazogbnVsbFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IFNoYXJpbmdBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBTaGFyaW5nQWN0aW9ucy5DcmVhdGVBc3NldFNoYXJlTGlua1N1Y2Nlc3MuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uQ29tbW9uLmNsb25lKHN0YXRlKSwgYXNzZXRMaW5rOiBhY3Rpb24ubGluayB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
