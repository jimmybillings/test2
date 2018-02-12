"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiLingualActions = require("./multi-lingual.actions");
exports.initialState = {
    lang: 'en'
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case MultiLingualActions.SetLanguage.Type: {
            return { lang: action.lang };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=multi-lingual.state.js.map