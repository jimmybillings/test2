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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBK0Q7QUFNbEQsUUFBQSxZQUFZLEdBQVU7SUFDakMsSUFBSSxFQUFFLElBQUk7Q0FDWCxDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBK0I7SUFBNUQsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUN6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVwQixLQUFLLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUxQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBYkQsMEJBYUMiLCJmaWxlIjoiYXBwL3N0b3JlL211bHRpLWxpbmd1YWwvbXVsdGktbGluZ3VhbC5zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE11bHRpTGluZ3VhbEFjdGlvbnMgZnJvbSAnLi9tdWx0aS1saW5ndWFsLmFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgbGFuZzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgbGFuZzogJ2VuJ1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IE11bHRpTGluZ3VhbEFjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIE11bHRpTGluZ3VhbEFjdGlvbnMuU2V0TGFuZ3VhZ2UuVHlwZToge1xuXG4gICAgICByZXR1cm4geyBsYW5nOiBhY3Rpb24ubGFuZyB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
