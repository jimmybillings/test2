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
var CommentActions = require("./comment.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
var defaultCommentPagination = { pageSize: 100, currentPage: 1, hasNextPage: false, hasPreviousPage: false };
exports.initialState = {
    formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
    commentBeingEdited: null,
    activeObjectType: null,
    formMode: 'ADD',
    cart: { items: [], pagination: defaultCommentPagination },
    collection: { items: [], pagination: defaultCommentPagination },
    quote: { items: [], pagination: defaultCommentPagination },
    lineItem: { items: [], pagination: defaultCommentPagination },
    counts: {}
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case CommentActions.ChangeFormModeToEdit.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { formMode: 'EDIT', formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL', commentBeingEdited: action.commentBeingEdited });
        }
        case CommentActions.ChangeFormModeToAdd.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { formMode: 'ADD', formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL', commentBeingEdited: null });
        }
        case CommentActions.Load.Type:
        case CommentActions.Remove.Type: {
            var activeObjectType = action.parentObject.nestedObjectId
                ? 'lineItem'
                : action.parentObject.objectType;
            return __assign({}, common_functions_1.Common.clone(state), { activeObjectType: activeObjectType });
        }
        case CommentActions.FormSubmitSuccess.Type:
        case CommentActions.RemoveSuccess.Type:
        case CommentActions.LoadSuccess.Type: {
            var stateClone = common_functions_1.Common.clone(state);
            return __assign({}, stateClone, (_a = {}, _a[stateClone.activeObjectType] = __assign({}, action.comments), _a.formMode = 'ADD', _a.formSubmitLabel = 'COMMENTS.SUBMIT_BTN_LABEL', _a.commentBeingEdited = null, _a));
        }
        case CommentActions.GetCountsSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { counts: action.counts });
        }
        case CommentActions.FormSubmit.Type: {
            var stateClone = common_functions_1.Common.clone(state);
            return __assign({}, stateClone, { commentBeingEdited: __assign({}, stateClone.commentBeingEdited, action.comment) });
        }
        default: {
            return state;
        }
    }
    var _a;
}
exports.reducer = reducer;
//# sourceMappingURL=comment.state.js.map