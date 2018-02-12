"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrivacyPolicyState = require("./privacy-policy.state");
var PrivacyPolicyActions = require("./privacy-policy.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Privacy Policy Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: PrivacyPolicyActions,
            state: PrivacyPolicyState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            customTests: [
                {
                    it: 'returns the state with the document propopulated',
                    actionParameters: { document: 'some doc' },
                    previousState: PrivacyPolicyState.initialState,
                    expectedNextState: { document: 'some doc' }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTZEO0FBQzdELCtEQUFpRTtBQUNqRSx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsa0RBQWtEO29CQUN0RCxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7b0JBQzFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUM5QyxpQkFBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7aUJBQzVDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQkQsb0JBcUJDIiwiZmlsZSI6ImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUHJpdmFjeVBvbGljeVN0YXRlIGZyb20gJy4vcHJpdmFjeS1wb2xpY3kuc3RhdGUnO1xuaW1wb3J0ICogYXMgUHJpdmFjeVBvbGljeUFjdGlvbnMgZnJvbSAnLi9wcml2YWN5LXBvbGljeS5hY3Rpb25zJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnUHJpdmFjeSBQb2xpY3kgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IFByaXZhY3lQb2xpY3lBY3Rpb25zLFxuICAgICAgc3RhdGU6IFByaXZhY3lQb2xpY3lTdGF0ZSxcbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggdGhlIGRvY3VtZW50IHByb3BvcHVsYXRlZCcsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBkb2N1bWVudDogJ3NvbWUgZG9jJyB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IFByaXZhY3lQb2xpY3lTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgZG9jdW1lbnQ6ICdzb21lIGRvYycgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
