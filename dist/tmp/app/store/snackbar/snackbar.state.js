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
//# sourceMappingURL=snackbar.state.js.map