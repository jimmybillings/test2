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
var CartActions = require("./cart.actions");
var CartState = require("./cart.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Cart Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: CartActions,
            state: CartState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['Load'],
            customTests: [
                {
                    it: 'returns a clone of the state with the loading flag as true',
                    previousState: CartState.initialState,
                    expectedNextState: __assign({}, CartState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: [
                'LoadSuccess', 'EditLineItemFromDetailsSuccess', 'RemoveAssetSuccess', 'AddNoteSuccess', 'RemoveNoteSuccess'
            ],
            customTests: [
                {
                    it: 'returns a the cart with the loading flag as false',
                    actionParameters: { cart: { some: 'cart' } },
                    previousState: __assign({}, CartState.initialState, { loading: true }),
                    expectedNextState: { data: { some: 'cart' }, loading: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFailure'],
            mutationTestData: {
                previousState: __assign({}, CartState.initialState, { loading: true })
            },
            customTests: [
                {
                    it: 'returns a clone of the state with the loading flag as false',
                    actionParameters: { error: { some: 'error' } },
                    previousState: __assign({}, CartState.initialState, { loading: true }),
                    expectedNextState: __assign({}, CartState.initialState, { loading: false })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQThDO0FBQzlDLHdDQUEwQztBQUMxQyx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN2QixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLFdBQVc7WUFDcEIsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDREQUE0RDtvQkFDaEUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxZQUFZO29CQUNyQyxpQkFBaUIsZUFBTyxTQUFTLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7aUJBQ2hFO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFO2dCQUNmLGFBQWEsRUFBRSxnQ0FBZ0MsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUI7YUFDN0c7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLG1EQUFtRDtvQkFDdkQsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQzVDLGFBQWEsZUFBTyxTQUFTLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7b0JBQzNELGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7aUJBQzlEO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ2hDLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLGVBQU8sU0FBUyxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO2FBQzVEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSw2REFBNkQ7b0JBQ2pFLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUM5QyxhQUFhLGVBQU8sU0FBUyxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO29CQUMzRCxpQkFBaUIsZUFBTyxTQUFTLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUU7aUJBQ2pFO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqREQsb0JBaURDIiwiZmlsZSI6ImFwcC9zdG9yZS9jYXJ0L2NhcnQuc3RhdGUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENhcnRBY3Rpb25zIGZyb20gJy4vY2FydC5hY3Rpb25zJztcbmltcG9ydCAqIGFzIENhcnRTdGF0ZSBmcm9tICcuL2NhcnQuc3RhdGUnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdDYXJ0IFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBDYXJ0QWN0aW9ucyxcbiAgICAgIHN0YXRlOiBDYXJ0U3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnTG9hZCddLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyBhIGNsb25lIG9mIHRoZSBzdGF0ZSB3aXRoIHRoZSBsb2FkaW5nIGZsYWcgYXMgdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogQ2FydFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5DYXJ0U3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbXG4gICAgICAgICdMb2FkU3VjY2VzcycsICdFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MnLCAnUmVtb3ZlQXNzZXRTdWNjZXNzJywgJ0FkZE5vdGVTdWNjZXNzJywgJ1JlbW92ZU5vdGVTdWNjZXNzJ1xuICAgICAgXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgYSB0aGUgY2FydCB3aXRoIHRoZSBsb2FkaW5nIGZsYWcgYXMgZmFsc2UnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY2FydDogeyBzb21lOiAnY2FydCcgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uQ2FydFN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGRhdGE6IHsgc29tZTogJ2NhcnQnIH0sIGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0xvYWRGYWlsdXJlJ10sXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uQ2FydFN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyBhIGNsb25lIG9mIHRoZSBzdGF0ZSB3aXRoIHRoZSBsb2FkaW5nIGZsYWcgYXMgZmFsc2UnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9IH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyAuLi5DYXJ0U3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uQ2FydFN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
