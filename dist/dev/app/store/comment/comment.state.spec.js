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
var CommentState = require("./comment.state");
var CommentActions = require("./comment.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
var common_functions_1 = require("../../shared/utilities/common.functions");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Comment Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: CommentActions,
            state: CommentState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['ChangeFormModeToEdit'],
            customTests: [
                {
                    it: 'changes formMode to \'EDIT\', commentBeingEdited to the action\'s commentBeingEdited, and the formSubmitLabel',
                    actionParameters: { commentBeingEdited: { some: 'comment' } },
                    previousState: CommentState.initialState,
                    expectedNextState: __assign({}, CommentState.initialState, { formMode: 'EDIT', commentBeingEdited: { some: 'comment' }, formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL' })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['ChangeFormModeToAdd'],
            mutationTestData: {
                previousState: { formMode: 'ADD' }
            },
            customTests: [
                {
                    it: 'changes formMode to  \'ADD\', commentBeingEdited to null, and the formSubmitLabel',
                    previousState: __assign({}, CommentState.initialState, { formMode: 'EDIT', commentBeingEdited: { some: 'comment' }, formSubmitLabel: 'COMMENTS.SAVE_BTN_LABEL' }),
                    expectedNextState: __assign({}, CommentState.initialState, { formMode: 'ADD', commentBeingEdited: null, formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL' })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['Remove', 'Load'],
            mutationTestData: {
                actionParameters: { parentObject: { objectType: 'collection', objectId: 1 } }
            },
            customTests: [
                {
                    it: 'changes the activeObjectType to the action\'s objectType for a regular object type',
                    actionParameters: { parentObject: { objectType: 'collection', objectId: 1 } },
                    previousState: { activeObjectType: null },
                    expectedNextState: { activeObjectType: 'collection' }
                },
                {
                    it: 'changes the activeObjectType to the action\'s objectType for a nested object type',
                    actionParameters: {
                        parentObject: { objectType: 'collection', objectId: 1, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123' }
                    },
                    previousState: { activeObjectType: null },
                    expectedNextState: { activeObjectType: 'lineItem' }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['FormSubmitSuccess', 'RemoveSuccess', 'LoadSuccess'],
            mutationTestData: {
                actionParameters: { comments: { items: [{ some: 'collection' }], pagination: {} } }
            },
            customTests: [
                {
                    it: 'adds the comments to the right part of the store and sets activeObjectType back to null',
                    actionParameters: { comments: { items: [{ some: 'collection' }], pagination: {} } },
                    previousState: { activeObjectType: 'collection' },
                    expectedNextState: {
                        activeObjectType: 'collection',
                        formMode: 'ADD',
                        formSubmitLabel: 'COMMENTS.SUBMIT_BTN_LABEL',
                        commentBeingEdited: null,
                        collection: { items: [{ some: 'collection' }], pagination: {} }
                    }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['GetCountsSuccess'],
            customTests: [
                {
                    it: 'merges the counts into the state',
                    actionParameters: { counts: { 'abc': 4, 'def': 2 } },
                    previousState: CommentState.initialState,
                    expectedNextState: __assign({}, common_functions_1.Common.clone(CommentState.initialState), { counts: { 'abc': 4, 'def': 2 } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['FormSubmit'],
            customTests: [
                {
                    it: 'merges the commentBeingEdited',
                    actionParameters: { comment: { the: 'newComment' } },
                    previousState: { commentBeingEdited: { some: 'comment' } },
                    expectedNextState: { commentBeingEdited: { some: 'comment', the: 'newComment' } }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQWdEO0FBQ2hELGtEQUFvRDtBQUVwRCx1RUFBb0U7QUFDcEUsNEVBQWlFO0FBRWpFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsS0FBSyxFQUFFLFlBQVk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ3pDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsK0dBQStHO29CQUNuSCxnQkFBZ0IsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFO29CQUM3RCxhQUFhLEVBQUUsWUFBWSxDQUFDLFlBQVk7b0JBQ3hDLGlCQUFpQixlQUNaLFlBQVksQ0FBQyxZQUFZLElBQzVCLFFBQVEsRUFBRSxNQUFNLEVBQ2hCLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUN2QyxlQUFlLEVBQUUseUJBQXlCLEdBQzNDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDeEMsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7YUFDbkM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLG1GQUFtRjtvQkFDdkYsYUFBYSxlQUNSLFlBQVksQ0FBQyxZQUFZLElBQzVCLFFBQVEsRUFBRSxNQUFNLEVBQ2hCLGtC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QUFZLENBQUMsSUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRTtpQkFDbEc7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDL0IsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwrQkFBK0I7b0JBQ25DLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFO29CQUNwRCxhQUFhLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTtvQkFDMUQsaUJBQWlCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFO2lCQUNsRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEhELG9CQXNIQyIsImZpbGUiOiJhcHAvc3RvcmUvY29tbWVudC9jb21tZW50LnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDb21tZW50U3RhdGUgZnJvbSAnLi9jb21tZW50LnN0YXRlJztcbmltcG9ydCAqIGFzIENvbW1lbnRBY3Rpb25zIGZyb20gJy4vY29tbWVudC5hY3Rpb25zJztcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdDb21tZW50IFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBDb21tZW50QWN0aW9ucyxcbiAgICAgIHN0YXRlOiBDb21tZW50U3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnQ2hhbmdlRm9ybU1vZGVUb0VkaXQnXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ2NoYW5nZXMgZm9ybU1vZGUgdG8gXFwnRURJVFxcJywgY29tbWVudEJlaW5nRWRpdGVkIHRvIHRoZSBhY3Rpb25cXCdzIGNvbW1lbnRCZWluZ0VkaXRlZCwgYW5kIHRoZSBmb3JtU3VibWl0TGFiZWwnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY29tbWVudEJlaW5nRWRpdGVkOiB7IHNvbWU6ICdjb21tZW50JyB9IH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogQ29tbWVudFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uQ29tbWVudFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIGZvcm1Nb2RlOiAnRURJVCcsXG4gICAgICAgICAgICBjb21tZW50QmVpbmdFZGl0ZWQ6IHsgc29tZTogJ2NvbW1lbnQnIH0sXG4gICAgICAgICAgICBmb3JtU3VibWl0TGFiZWw6ICdDT01NRU5UUy5TQVZFX0JUTl9MQUJFTCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydDaGFuZ2VGb3JtTW9kZVRvQWRkJ10sXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgZm9ybU1vZGU6ICdBREQnIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdjaGFuZ2VzIGZvcm1Nb2RlIHRvICBcXCdBRERcXCcsIGNvbW1lbnRCZWluZ0VkaXRlZCB0byBudWxsLCBhbmQgdGhlIGZvcm1TdWJtaXRMYWJlbCcsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgLi4uQ29tbWVudFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIGZvcm1Nb2RlOiAnRURJVCcsXG4gICAgICAgICAgICBjb21tZW50QmVpbmdFZGl0ZWQ6IHsgc29tZTogJ2NvbW1lbnQnIH0sXG4gICAgICAgICAgICBmb3JtU3VibWl0TGFiZWw6ICdDT01NRU5UUy5TQVZFX0JUTl9MQUJFTCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5Db21tZW50U3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgZm9ybU1vZGU6ICdBREQnLFxuICAgICAgICAgICAgY29tbWVudEJlaW5nRWRpdGVkOiBudWxsLFxuICAgICAgICAgICAgZm9ybVN1Ym1pdExhYmVsOiAnQ09NTUVOVFMuU1VCTUlUX0JUTl9MQUJFTCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydSZW1vdmUnLCAnTG9hZCddLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ2NoYW5nZXMgdGhlIGFjdGl2ZU9iamVjdFR5cGUgdG8gdGhlIGFjdGlvblxcJ3Mgb2JqZWN0VHlwZSBmb3IgYSByZWd1bGFyIG9iamVjdCB0eXBlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0gfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGFjdGl2ZU9iamVjdFR5cGU6IG51bGwgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBhY3RpdmVPYmplY3RUeXBlOiAnY29sbGVjdGlvbicgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdjaGFuZ2VzIHRoZSBhY3RpdmVPYmplY3RUeXBlIHRvIHRoZSBhY3Rpb25cXCdzIG9iamVjdFR5cGUgZm9yIGEgbmVzdGVkIG9iamVjdCB0eXBlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICBwYXJlbnRPYmplY3Q6IHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSwgbmVzdGVkT2JqZWN0VHlwZTogJ2xpbmVJdGVtJywgbmVzdGVkT2JqZWN0SWQ6ICdhYmMtMTIzJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGFjdGl2ZU9iamVjdFR5cGU6IG51bGwgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBhY3RpdmVPYmplY3RUeXBlOiAnbGluZUl0ZW0nIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0Zvcm1TdWJtaXRTdWNjZXNzJywgJ1JlbW92ZVN1Y2Nlc3MnLCAnTG9hZFN1Y2Nlc3MnXSxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjb21tZW50czogeyBpdGVtczogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH1dLCBwYWdpbmF0aW9uOiB7fSB9IH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdhZGRzIHRoZSBjb21tZW50cyB0byB0aGUgcmlnaHQgcGFydCBvZiB0aGUgc3RvcmUgYW5kIHNldHMgYWN0aXZlT2JqZWN0VHlwZSBiYWNrIHRvIG51bGwnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY29tbWVudHM6IHsgaXRlbXM6IFt7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XSwgcGFnaW5hdGlvbjoge30gfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgYWN0aXZlT2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIGFjdGl2ZU9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGZvcm1Nb2RlOiAnQUREJyxcbiAgICAgICAgICAgIGZvcm1TdWJtaXRMYWJlbDogJ0NPTU1FTlRTLlNVQk1JVF9CVE5fTEFCRUwnLFxuICAgICAgICAgICAgY29tbWVudEJlaW5nRWRpdGVkOiBudWxsLFxuICAgICAgICAgICAgY29sbGVjdGlvbjogeyBpdGVtczogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH1dLCBwYWdpbmF0aW9uOiB7fSB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnR2V0Q291bnRzU3VjY2VzcyddLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbWVyZ2VzIHRoZSBjb3VudHMgaW50byB0aGUgc3RhdGUnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY291bnRzOiB7ICdhYmMnOiA0LCAnZGVmJzogMiB9IH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogQ29tbWVudFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5Db21tb24uY2xvbmUoQ29tbWVudFN0YXRlLmluaXRpYWxTdGF0ZSksIGNvdW50czogeyAnYWJjJzogNCwgJ2RlZic6IDIgfSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydGb3JtU3VibWl0J10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdtZXJnZXMgdGhlIGNvbW1lbnRCZWluZ0VkaXRlZCcsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjb21tZW50OiB7IHRoZTogJ25ld0NvbW1lbnQnIH0gfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGNvbW1lbnRCZWluZ0VkaXRlZDogeyBzb21lOiAnY29tbWVudCcgfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGNvbW1lbnRCZWluZ0VkaXRlZDogeyBzb21lOiAnY29tbWVudCcsIHRoZTogJ25ld0NvbW1lbnQnIH0gfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
