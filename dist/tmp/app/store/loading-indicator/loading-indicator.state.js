"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingIndicatorActions = require("./loading-indicator.actions");
exports.initialState = {
    show: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case LoadingIndicatorActions.Show.Type: {
            return { show: true };
        }
        case LoadingIndicatorActions.Hide.Type: {
            return { show: false };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=loading-indicator.state.js.map