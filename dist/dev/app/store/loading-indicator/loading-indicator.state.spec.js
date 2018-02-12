"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingIndicatorActions = require("./loading-indicator.actions");
var LoadingIndicatorState = require("./loading-indicator.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Loading Indicator Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: LoadingIndicatorActions,
            state: LoadingIndicatorState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Show',
            mutationTestData: {
                previousState: { show: false }
            },
            customTests: [
                {
                    it: 'returns state with show: true',
                    previousState: { show: false },
                    expectedNextState: { show: true }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Hide',
            mutationTestData: {
                previousState: { show: true }
            },
            customTests: [
                {
                    it: 'returns state with show: false',
                    previousState: { show: true },
                    expectedNextState: { show: false }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQXVFO0FBQ3ZFLGlFQUFtRTtBQUNuRSx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLEtBQUssRUFBRSxxQkFBcUI7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO2FBQy9CO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwrQkFBK0I7b0JBQ25DLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7b0JBQzlCLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtpQkFDbEM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsTUFBTTtZQUN2QixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTthQUM5QjtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsZ0NBQWdDO29CQUNwQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUM3QixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7aUJBQ25DO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQ0Qsb0JBcUNDIiwiZmlsZSI6ImFwcC9zdG9yZS9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTG9hZGluZ0luZGljYXRvckFjdGlvbnMgZnJvbSAnLi9sb2FkaW5nLWluZGljYXRvci5hY3Rpb25zJztcbmltcG9ydCAqIGFzIExvYWRpbmdJbmRpY2F0b3JTdGF0ZSBmcm9tICcuL2xvYWRpbmctaW5kaWNhdG9yLnN0YXRlJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnTG9hZGluZyBJbmRpY2F0b3IgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IExvYWRpbmdJbmRpY2F0b3JBY3Rpb25zLFxuICAgICAgc3RhdGU6IExvYWRpbmdJbmRpY2F0b3JTdGF0ZSxcbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ1Nob3cnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiB7IHNob3c6IGZhbHNlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHN0YXRlIHdpdGggc2hvdzogdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHNob3c6IHRydWUgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdIaWRlJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBzaG93OiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHN0YXRlIHdpdGggc2hvdzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgc2hvdzogdHJ1ZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHNob3c6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
