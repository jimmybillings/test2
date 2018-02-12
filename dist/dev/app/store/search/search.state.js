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
var SearchActions = require("./search.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    loading: false,
    results: {
        items: [],
        pagination: {
            totalCount: 0,
            pageSize: 100,
            currentPage: 1,
            numberOfPages: 0,
            hasNextPage: false,
            hasPreviousPage: false
        }
    }
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case SearchActions.LoadResults.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { loading: true });
        }
        case SearchActions.LoadResultsSuccess.Type: {
            return {
                loading: false,
                results: {
                    items: action.results.items,
                    pagination: action.results.pagination
                },
            };
        }
        case SearchActions.LoadResultsFailure.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { loading: false });
        }
        case SearchActions.Reset.Type: {
            return common_functions_1.Common.clone(exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxnREFBa0Q7QUFHbEQsNEVBQWlFO0FBT3BELFFBQUEsWUFBWSxHQUFVO0lBQ2pDLE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUU7WUFDVixVQUFVLEVBQUUsQ0FBQztZQUNiLFFBQVEsRUFBRSxHQUFHO1lBQ2IsV0FBVyxFQUFFLENBQUM7WUFDZCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsS0FBSztZQUNsQixlQUFlLEVBQUUsS0FBSztTQUN2QjtLQUNGO0NBQ0YsQ0FBQztBQUVGLGlCQUF3QixLQUEyQixFQUFFLE1BQXlCO0lBQXRELHNCQUFBLEVBQUEsUUFBZSxvQkFBWTtJQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQUMsS0FBSyxHQUFHLG9CQUFZLENBQUM7SUFFekMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFcEIsS0FBSyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLElBQU0sV0FBVyxHQUFVLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9DLE1BQU0sY0FDRCxXQUFXLElBQ2QsT0FBTyxFQUFFLElBQUksSUFDYjtRQUNKLENBQUM7UUFFRCxLQUFLLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxNQUFNLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUs7b0JBQzNCLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7aUJBQ3RDO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxLQUFLLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxJQUFNLFdBQVcsR0FBVSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLGNBQ0QsV0FBVyxJQUNkLE9BQU8sRUFBRSxLQUFLLElBQ2Q7UUFDSixDQUFDO1FBRUQsS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELFNBQVMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBRUgsQ0FBQztBQUNILENBQUM7QUF6Q0QsMEJBeUNDIiwiZmlsZSI6ImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VhcmNoQWN0aW9ucyBmcm9tICcuL3NlYXJjaC5hY3Rpb25zJztcbmltcG9ydCB7IEFzc2V0LCBQYWdpbmF0aW9uLCBTdG9yZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3NlYXJjaC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIHJlc3VsdHM6IFNlYXJjaFJlc3VsdHM7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBsb2FkaW5nOiBmYWxzZSxcbiAgcmVzdWx0czoge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgcGFnZVNpemU6IDEwMCxcbiAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgbnVtYmVyT2ZQYWdlczogMCxcbiAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2VcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBTZWFyY2hBY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHMuVHlwZToge1xuICAgICAgY29uc3QgY2xvbmVkU3RhdGU6IFN0YXRlID0gQ29tbW9uLmNsb25lKHN0YXRlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uY2xvbmVkU3RhdGUsXG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBTZWFyY2hBY3Rpb25zLkxvYWRSZXN1bHRzU3VjY2Vzcy5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgIGl0ZW1zOiBhY3Rpb24ucmVzdWx0cy5pdGVtcyxcbiAgICAgICAgICBwYWdpbmF0aW9uOiBhY3Rpb24ucmVzdWx0cy5wYWdpbmF0aW9uXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgU2VhcmNoQWN0aW9ucy5Mb2FkUmVzdWx0c0ZhaWx1cmUuVHlwZToge1xuICAgICAgY29uc3QgY2xvbmVkU3RhdGU6IFN0YXRlID0gQ29tbW9uLmNsb25lKHN0YXRlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNsb25lZFN0YXRlLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIFNlYXJjaEFjdGlvbnMuUmVzZXQuVHlwZToge1xuICAgICAgcmV0dXJuIENvbW1vbi5jbG9uZShpbml0aWFsU3RhdGUpO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgfVxufVxuIl19
