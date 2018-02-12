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
//# sourceMappingURL=privacy-policy.state.js.map