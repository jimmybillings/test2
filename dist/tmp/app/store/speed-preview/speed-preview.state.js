"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpeedPreviewActions = require("./speed-preview.actions");
;
exports.initialState = {};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case SpeedPreviewActions.LoadSuccess.Type: {
            return Object.assign({}, state, (_a = {}, _a[action.assetId] = action.speedViewData, _a));
        }
        case SpeedPreviewActions.LoadFailure.Type: {
            return Object.assign({}, state, (_b = {}, _b[action.assetId] = { noData: true }, _b));
        }
        default: {
            return state;
        }
    }
    var _a, _b;
}
exports.reducer = reducer;
//# sourceMappingURL=speed-preview.state.js.map